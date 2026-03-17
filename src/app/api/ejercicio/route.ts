import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Estructura de la solicitud
interface ExerciseRequest {
  ejercicioId: string;
  contenido: string;
}

// Configuración de Gemini (SDK Nuevo @google/genai)
const client = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY || "" });

const SYSTEM_PROMPT_BASE = `Sos un asistente del Workshop de IA de Ginialtech. Respondés en español de Argentina, de forma concisa y didáctica. 
Para cada ejercicio tenés dos roles: primero evaluás lo que escribió el participante (qué está bien, qué falta, cómo mejorar), luego respondés como si fueras la IA ejecutando la tarea.`;

const PROMPTS_BY_ID: Record<string, string> = {
  b1: "El participante reflexionó sobre mitos de la IA. Evaluá si su reflexión es correcta y completá con información precisa.",
  b2: "El participante reescribió un prompt con las 5 partes (rol, contexto, tarea, formato, restricciones). Evaluá qué partes incluyó, cuáles faltan, y luego ejecutá el prompt mejorado.",
  b3: "El participante identificó tareas para automatizar con IA. Evaluá si son buenas candidatas y ejecutá el prompt que armó.",
  b4: "El participante anotó observaciones sobre código generado por IA. Evaluá sus notas y mostrá un ejemplo de código relacionado.",
  adv: "El participante está en el bloque avanzado (MCP, agentes, guardrails). Respondé con profundidad técnica, con ejemplos de código TypeScript cuando corresponda.",
};

export async function POST(req: NextRequest) {
  try {
    const { ejercicioId, contenido }: ExerciseRequest = await req.json();

    if (!ejercicioId || !contenido) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios (ejercicioId o contenido)" },
        { status: 400 }
      );
    }

    const specificPrompt = PROMPTS_BY_ID[ejercicioId] || "Respondé de forma general sobre el workshop.";
    
    const fullPrompt = `
      ${SYSTEM_PROMPT_BASE}
      
      CONTEXTO DEL EJERCICIO:
      ${specificPrompt}
      
      CONTENIDO DEL PARTICIPANTE:
      "${contenido}"
    `;

    const result = await client.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        // En @google/genai, generateContentStream devuelve directamente el generador
        for await (const chunk of result) {
          const text = chunk.text;
          if (text) {
            controller.enqueue(encoder.encode(String(text)));
          }
        }
        controller.close();
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
