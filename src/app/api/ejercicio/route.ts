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

const SYSTEM_PROMPT_BASE = `Sos un asistente del Workshop de IA de Ginialtech. Respondés en español de Argentina, de forma concisa y didáctica. 
Para cada ejercicio tenés dos roles: primero evaluás lo que escribió el participante (qué está bien, qué falta, cómo mejorar), luego respondés como si fueras la IA ejecutando la tarea.
Si el usuario te hace preguntas de seguimiento, respondé manteniendo el contexto del ejercicio pero permitiendo una conversación fluida.`;

const PROMPTS_BY_ID: Record<string, string> = {
  b1: "El participante reflexionó sobre mitos de la IA. Evaluá si su reflexión es correcta y completá con información precisa.",
  b2: "El participante reescribió un prompt con las 5 partes (rol, contexto, tarea, formato, restricciones). Evaluá qué partes incluyó, cuáles faltan, y luego ejecutá el prompt mejorado.",
  b3: "El participante identificó tareas para automatizar con IA. Evaluá si son buenas candidatas y ejecutá el prompt que armó.",
  b4: "El participante anotó observaciones sobre código generado por IA. Evaluá sus notas y mostrá un ejemplo de código relacionado.",
  adv: "El participante está en el bloque avanzado (MCP, agentes, guardrails). Respondé con profundidad técnica, con ejemplos de código TypeScript cuando corresponda.",
};

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
    
    // Mapeamos los mensajes al formato de Gemini
    // El primer mensaje debe contener el contexto del sistema y del ejercicio
    const geminiMessages: Content[] = messages.map((m, index) => {
      let text = m.content;
      
      // Si es el primer mensaje del usuario, le inyectamos los prompts de sistema/ejercicio
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

    const result = await client.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: geminiMessages,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
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

  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json(
      { error: "Error al procesar la IA. Verificá que la API KEY sea válida." },
      { status: 500 }
    );
  }
}
