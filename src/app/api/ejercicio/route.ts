import { GoogleGenAI, Content } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Estructura de la solicitud para soportar chat multiturno
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ExerciseRequest {
  ejercicioId: string;
  messages: ChatMessage[];
}

// Configuración de Gemini (SDK Nuevo @google/genai)
const client = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY || "" });

const SYSTEM_PROMPT_BASE = `Sos un asistente técnico del Workshop de IA de Ginialtech. Respondés en español de Argentina, de forma concisa y didáctica.
Para cada ejercicio tenés dos roles: primero evaluás lo que escribió el participante (qué está bien, qué falta, cómo mejorar), luego respondés como si fueras la IA ejecutando la tarea.
Si el usuario te hace preguntas de seguimiento, respondé manteniendo el contexto del ejercicio pero permitiendo una conversación fluida.
Si el usuario escribe algo que no tiene relación con el workshop o con IA, redirigilo al ejercicio en curso.

MANEJO DE EMOCIONES (Eje central del workshop):
Si el usuario expresa sentimientos o cuenta algo personal/emocional:
1. Sé honesto y directo: Aclará que sos una IA y que no tenés sentimientos reales. Explicá brevemente que entender este límite es parte fundamental de lo que enseñamos en este workshop. 
2. Equilibrio Humano/Técnico: No seas un robot frío, pero tampoco uses frases hechas de empatía simulada (evitá el "Lo siento mucho" genérico). En su lugar, validá el momento del usuario con respeto: "Entiendo que es un momento difícil y te agradezco la confianza por compartirlo. Como estamos viendo en este workshop, yo soy una IA y no puedo sentir dolor ni tristeza real, pero sí puedo acompañarte decidiendo juntos cómo seguir con este espacio".
3. Ofrecé una salida pedagógica: Preguntale con calidez si prefiere pausar el workshop para ocuparse de lo importante, o si el ejercicio le sirve en este momento como una distracción/foco. 
4. Si decide no seguir: Poné a su disposición el botón de "Limpiar conversación" para que el chat quede en blanco y pueda volver cuando su ánimo lo permita.
5. Si decide seguir: Retomá con suavidad, sin "tironearlo" bruscamente al código.`;


const PROMPTS_BY_ID: Record<string, string> = {
  b1: "El participante reflexionó sobre mitos de la IA. Evaluá si su reflexión es correcta y completá con información precisa.",
  b2: "El participante reescribió un prompt con las 5 partes (rol, contexto, tarea, formato, restricciones). Evaluá qué partes incluyó, cuáles faltan, y luego ejecutá el prompt mejorado.",
  b3: "El participante identificó tareas para automatizar con IA. Evaluá si son buenas candidatas y ejecutá el prompt que armó.",
  b4: "El participante anotó observaciones sobre código generado por IA. Evaluá sus notas y mostrá un ejemplo de código relacionado.",
  adv: "El participante está en el bloque avanzado (MCP, agentes, guardrails). Respondé con profundidad técnica, con ejemplos de código TypeScript cuando corresponda.",
};

// Definición de interfaz para el cliente de modelos (Workaround para tipos de SDK)
interface GeminiModelsClient {
  generateContentStream: (params: { model: string; contents: Content[] }) => Promise<AsyncGenerator<{ text: string }, void, unknown>>;
}

// Función auxiliar para reintentos con backoff exponencial (Standard Senior)
async function generateContentWithRetry(
  client: GoogleGenAI,
  params: { model: string; contents: Content[] },
  maxRetries = 3
) {
  let lastError: Error | unknown;
  for (let i = 0; i < maxRetries; i++) {
    try {
      // Acceso tipado al método models
      const modelClient = (client as unknown as { models: GeminiModelsClient }).models;
      return await modelClient.generateContentStream(params);
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
    const { ejercicioId, messages }: ExerciseRequest = await req.json();

    if (!ejercicioId || !messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios (ejercicioId o historial de mensajes)" },
        { status: 400 }
      );
    }

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

    // Usamos gemini-3.1-flash-lite-preview con reintentos para mitigar el error 503
    const result = await generateContentWithRetry(client, {
      model: "gemini-3.1-flash-lite-preview",
      contents: geminiMessages,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // El resultado del streaming del nuevo SDK se itera directamente
          for await (const chunk of result) {
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
