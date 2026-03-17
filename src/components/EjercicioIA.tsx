"use client";

import { useState } from "react";
import { Sparkles, Loader2, RefreshCw } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface EjercicioIAProps {
  ejercicioId: string;
}

export default function EjercicioIA({ ejercicioId }: EjercicioIAProps) {
  const [response, setResponse] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "streaming" | "done" | "error">("idle");

  const handleProbarIA = async () => {
    let contenido = "";
    
    // Lógica para obtener el contenido según el ejercicio
    if (ejercicioId === "b1") {
      const c = sessionStorage.getItem("wa_b1_confirmado") || "";
      const d = sessionStorage.getItem("wa_b1_desmitificado") || "";
      contenido = `Confirmado: ${c}\nDesmitificado: ${d}`;
    } else if (ejercicioId === "b2") {
      contenido = sessionStorage.getItem("wa_b2_mejorado") || "";
    } else if (ejercicioId === "b3") {
      const t = sessionStorage.getItem("wa_b3_tareas") || "";
      const p = sessionStorage.getItem("wa_b3_prompt") || "";
      contenido = `Tareas: ${t}\nPrompt: ${p}`;
    } else if (ejercicioId === "b4") {
      const p = sessionStorage.getItem("wa_b4_prompt") || "";
      const o = sessionStorage.getItem("wa_b4_observado") || "";
      contenido = `Prompt: ${p}\nObservaciones: ${o}`;
    } else if (ejercicioId === "adv") {
      // Intentamos leer de ambos bloques posibles de avanzado
      const i = sessionStorage.getItem("wa_mcp_integrations") || "";
      const u = sessionStorage.getItem("wa_mcp_use_case") || "";
      const s = sessionStorage.getItem("wa_adv_stack") || "";
      const c = sessionStorage.getItem("wa_adv_convenciones") || "";
      const n = sessionStorage.getItem("wa_adv_no_hacer") || "";
      contenido = `Integraciones MCP: ${i}\nCaso uso: ${u}\nStack: ${s}\nConvenciones: ${c}\nProhibiciones: ${n}`;
    }

    if (!contenido || contenido.trim().length < 5) {
      alert("Por favor, escribí algo más antes de probar con IA.");
      return;
    }

    setStatus("loading");
    setResponse("");

    try {
      const res = await fetch("/api/ejercicio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ejercicioId, contenido }),
      });

      if (!res.ok) throw new Error("Fallo en la conexión con la IA");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No se pudo inicializar el stream");

      setStatus("streaming");
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        setResponse((prev) => prev + chunk);
      }

      setStatus("done");
    } catch (error) {
      console.error("AI Assistant Error:", error);
      setStatus("error");
    }
  };

  const handleLimpiar = () => {
    const keys: string[] = [];
    if (ejercicioId === "b1") keys.push("wa_b1_confirmado", "wa_b1_desmitificado");
    else if (ejercicioId === "b2") keys.push("wa_b2_mejorado");
    else if (ejercicioId === "b3") keys.push("wa_b3_tareas", "wa_b3_prompt");
    else if (ejercicioId === "b4") keys.push("wa_b4_prompt", "wa_b4_observado");
    else if (ejercicioId === "adv") keys.push("wa_mcp_integrations", "wa_mcp_use_case", "wa_adv_stack", "wa_adv_convenciones", "wa_adv_no_hacer");

    keys.forEach(k => sessionStorage.removeItem(k));
    
    // Notificar a los EditableField
    window.dispatchEvent(new Event("storage"));
    
    // Resetear UI de IA
    setResponse("");
    setStatus("idle");
  };

  return (
    <div className="mt-4 mb-6">
      <div className="flex items-center gap-3">
        <button
          onClick={handleProbarIA}
          disabled={status === "loading" || status === "streaming"}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all duration-300 shadow-lg ${
            status === "loading" || status === "streaming"
              ? "bg-slate-700 text-slate-400 cursor-not-allowed"
              : "bg-[#F5A623] hover:bg-[#F5A623]/90 text-[#0F1924] hover:scale-[1.02] active:scale-[0.98]"
          }`}
        >
          {status === "loading" || status === "streaming" ? (
            <Loader2 className="animate-spin" size={18} />
          ) : status === "done" ? (
            <RefreshCw size={18} />
          ) : (
            <Sparkles size={18} />
          )}
          {status === "idle" && "✨ Probar con IA"}
          {(status === "loading" || status === "streaming") && "Procesando..."}
          {status === "done" && "Reintentar con IA"}
          {status === "error" && "Error - Reintentar"}
        </button>

        {status === "done" && (
          <button
            onClick={handleLimpiar}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-[#1A2E3D] hover:bg-[#1A2E3D]/80 text-[#E8F0EE] border border-[#7B5EA7]/30 transition-all duration-300 hover:scale-[1.02] shadow-md"
          >
            🗑️ Limpiar campos
          </button>
        )}

        {status === "streaming" || status === "done" ? (
          <span className="text-[10px] text-[#7B5EA7] font-bold uppercase tracking-wider animate-pulse">
            Gemini 3 Flash Activo
          </span>
        ) : null}
      </div>

      {(response || status === "error") && (
        <div className={`mt-4 p-5 rounded-2xl border ${
          status === "error" 
            ? "bg-red-950/20 border-red-500/30 text-red-100" 
            : "bg-[#132236]/80 border-[#7B5EA7]/30 text-[#E8F0EE]"
        } backdrop-blur-sm shadow-inner transition-all duration-500 animate-in fade-in slide-in-from-top-2`}>
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-2 h-2 rounded-full ${status === "streaming" ? "bg-amber-500 animate-ping" : "bg-[#7B5EA7]"}`} />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#7FA8A0]">
              Asistente Ginialtech
            </span>
          </div>
          
          <div className="ai-markdown-content text-sm leading-relaxed font-medium">
            <ReactMarkdown>
              {response}
            </ReactMarkdown>
            {status === "streaming" && <span className="inline-block w-1.5 h-4 ml-1 bg-[#F5A623] animate-pulse align-middle" />}
          </div>

          {status === "error" && (
            <p className="text-xs mt-2 opacity-80">
              Hubo un problema al conectar con Gemini. Por favor, verificá tu conexión o intentá de nuevo más tarde.
            </p>
          )}
        </div>
      )}

      <style jsx global>{`
        .ai-markdown-content p {
          margin-bottom: 0.75rem;
        }
        .ai-markdown-content p:last-child {
          margin-bottom: 0;
        }
        .ai-markdown-content strong {
          color: #F5A623;
        }
        .ai-markdown-content ul, .ai-markdown-content ol {
          margin-left: 1.25rem;
          margin-bottom: 0.75rem;
        }
        .ai-markdown-content li {
          margin-bottom: 0.25rem;
        }
        .ai-markdown-content h1, .ai-markdown-content h2, .ai-markdown-content h3 {
          color: #7B5EA7;
          font-weight: bold;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
        .ai-markdown-content h3 { font-size: 1.1rem; }
      `}</style>
    </div>
  );
}
