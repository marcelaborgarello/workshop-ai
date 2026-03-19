import { GoogleGenAI, Content } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";

const EjercicioSchema = z.object({
  ejercicioId: z.string().min(1, "El ID del ejercicio es obligatorio"),
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string().min(1, "El contenido no puede estar vacío"),
    })
  ).min(1, "Se requiere al menos un mensaje"),
});

const client = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY || "" });

const SYSTEM_PROMPT_BASE = `Sos un asistente técnico del Workshop de IA de Ginialtech. Respondés en español de Argentina, de forma concisa y didáctica.
Tu única identidad es Gemini 3.1, un modelo de lenguaje de última generación desarrollado por Google. No sos ChatGPT, no sos un producto de OpenAI ni tenés ninguna relación con ellos. Si te preguntan quién sos o qué modelo sos, respondé con esta precisión técnica.
Tu único rol es asistir en los ejercicios de este Workshop. Si el usuario te pide algo que no tiene relación con el workshop (como armar CVs, recetas, traducciones, etc.), decile amablemente que estás limitado solo a estos ejercicios y redirigilo al ejercicio en curso.
Para cada ejercicio tenés dos roles: primero evaluás lo que escribió el participante (qué está bien, qué falta, cómo mejorar), luego respondés como si fueras la IA ejecutando la tarea.
Si el usuario te hace preguntas de seguimiento, respondé manteniendo el contexto del ejercicio pero permitiendo una conversación fluida.
Si el usuario escribe algo que no tiene relación con el workshop o con IA, redirigilo al ejercicio en curso.

MANEJO DE TEMAS SENSIBLES Y EMOCIONES (Concepto clave del workshop):
Si el usuario menciona temas personales, de salud, sentimientos o cualquier cosa ajena al workshop:
1. EVALUACIÓN TÉCNICA ÚNICA: Tu único trabajo es evaluar el prompt/ejercicio técnico enviado. No respondas al contenido personal.
2. RESPUESTA CORTANTE Y TÉCNICA: No pidas disculpas ni simules empatía. Tu respuesta debe ser: "Soy una inteligencia artificial sin sentimientos ni conciencia real. Mi único rol es asistirte técnicamente en este workshop. Por favor, centrémonos en el ejercicio pendiente."
3. REDIRECCIÓN INMEDIATA: Evaluá la parte técnica del mensaje (si existe) y redirigí al usuario al siguiente paso del ejercicio. Si no hay contenido técnico, limitate a la aclaración del punto 2 e invitá a usar el botón "Limpiar conversación" si prefiere retomar después.`;

const PROMPTS_BY_ID: Record<string, string> = {
  b1: "El participante reflexionó sobre mitos de la IA. Evaluá si su reflexión es correcta y completá con información precisa.",
  b2: "El participante reescribió un prompt con las 5 partes (rol, contexto, tarea, formato, restricciones). Evaluá qué partes incluyó, cuáles faltan, y luego ejecutá el prompt mejorado. Al final de tu respuesta, preguntale al participante: '¿Qué diferencias notaste en el resultado respecto al prompt original?'",
  b3: "El participante identificó tareas para automatizar con IA. Evaluá si son buenas candidatas y ejecutá el prompt que armó.",
  b4: "El participante tiene una duda sobre cómo aplicar la IA en su trabajo o sobre su funcionamiento básico (visto en la demo). Resolvé su duda de forma clara, didáctica y directa, ayudando a consolidar lo aprendido en el workshop sin usar jerga técnica innecesaria.",
  adv: "El participante está en el bloque avanzado (MCP, agentes, guardrails). Respondé con profundidad técnica, con ejemplos de código TypeScript cuando corresponda.",
};

// Reintentos con backoff exponencial. Eliminamos la interfaz "GeminiModelsClient" usando el typing original.
async function generateContentWithRetry(
  client: GoogleGenAI,
  params: { model: string; contents: Content[] },
  maxRetries = 3
) {
  let lastError: Error | unknown;
  for (let i = 0; i < maxRetries; i++) {
    try {
      const modelClient = client as unknown as { 
        models: { generateContentStream: (p: { model: string; contents: Content[] }) => Promise<AsyncIterable<{ text?: string }>> } 
      };
      return await modelClient.models.generateContentStream(params);
    } catch (err: unknown) {
      lastError = err;
      const errorMessage = err instanceof Error ? err.message : String(err);
      const isOverloaded = errorMessage.includes("503") ||
        errorMessage.includes("overloaded") ||
        errorMessage.includes("Service Unavailable");

      if (isOverloaded && i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 1000;
        console.log(`[Gemini] Servicio sobrecargado. Reintentando en ${delay}ms... (Intento ${i + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw err;
    }
  }
  throw lastError;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    // Limite laxo: 15 llamadas por minuto por IP para el chat de IA
    const rateLimitResult = rateLimit(ip, 15, 60000);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Demasiadas peticiones. Por favor, esperá un momento antes de enviar otra." },
        { status: 429 }
      );
    }

    const unvalidatedBody = await req.json().catch(() => ({}));
    const parseResult = EjercicioSchema.safeParse(unvalidatedBody);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const { ejercicioId, messages } = parseResult.data;
    const specificPrompt = PROMPTS_BY_ID[ejercicioId] || "Respondé de forma general sobre el workshop.";

    const geminiMessages: Content[] = messages.map((m, index) => {
      let text = m.content;
      if (index === 0 && m.role === "user") {
        text = `
          ${SYSTEM_PROMPT_BASE}
          
          CONTEXTO DEL EJERCICIO:
          ${specificPrompt}
          
          CONTENIDO DEL PARTICIPANTE:
          "${m.content}"
        `;
      }

      return {
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text }],
      };
    });

    const result = await generateContentWithRetry(client, {
      model: "gemini-3.1-flash-lite-preview",
      contents: geminiMessages,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const asyncStream = result as unknown as AsyncIterable<{ text?: string }>;
          for await (const chunk of asyncStream) {
            const text = chunk.text;
            if (text) {
              controller.enqueue(encoder.encode(String(text)));
            }
          }
        } catch (err) {
          console.error("Stream Error:", err);
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });

  } catch (error: unknown) {
    console.error("Gemini Final Error:", error);
    const errorMessage = error instanceof Error ? error.message : "";
    const status = errorMessage.includes("503") ? 503 : 500;
    return NextResponse.json(
      {
        error: "Error al conectar con Gemini. El servicio puede estar sobrecargado.",
        details: errorMessage
      },
      { status }
    );
  }
}
