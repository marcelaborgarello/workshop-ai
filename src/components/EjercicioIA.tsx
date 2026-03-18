"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Loader2, RefreshCw, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface EjercicioIAProps {
  ejercicioId: string;
}

export default function EjercicioIA({ ejercicioId }: EjercicioIAProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "streaming" | "done" | "error">("idle");
  const [currentResponse, setCurrentResponse] = useState<string>("");
  const [followUp, setFollowUp] = useState("");
  const [expandedMessages, setExpandedMessages] = useState<Record<number, boolean>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll inteligente (Standard Senior): 
  // Solo scrolleamos si el usuario ya está cerca del fondo.
  useEffect(() => {
    if (scrollRef.current && (status === "streaming" || status === "loading")) {
      const container = scrollRef.current.parentElement;
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
        
        if (isNearBottom) {
          scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [currentResponse, messages, status]);

  const toggleExpand = (idx: number) => {
    setExpandedMessages(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const obtenerContenidoInicial = () => {
    if (ejercicioId === "b1") {
      const c = sessionStorage.getItem("wa_b1_confirmado") || "";
      const d = sessionStorage.getItem("wa_b1_desmitificado") || "";
      return `Confirmado: ${c}\nDesmitificado: ${d}`;
    }
    if (ejercicioId === "b2") return sessionStorage.getItem("wa_b2_mejorado") || "";
    if (ejercicioId === "b3") {
      const t = sessionStorage.getItem("wa_b3_tareas") || "";
      const p = sessionStorage.getItem("wa_b3_prompt") || "";
      return `Tareas: ${t}\nPrompt: ${p}`;
    }
    if (ejercicioId === "b4") {
      const p = sessionStorage.getItem("wa_b4_prompt") || "";
      const o = sessionStorage.getItem("wa_b4_observado") || "";
      return `Prompt: ${p}\nObservaciones: ${o}`;
    }
    if (ejercicioId === "adv") {
      const i = sessionStorage.getItem("wa_mcp_integrations") || "";
      const u = sessionStorage.getItem("wa_mcp_use_case") || "";
      const s = sessionStorage.getItem("wa_adv_stack") || "";
      const c = sessionStorage.getItem("wa_adv_convenciones") || "";
      const n = sessionStorage.getItem("wa_adv_no_hacer") || "";
      return `Integraciones MCP: ${i}\nCaso uso: ${u}\nStack: ${s}\nConvenciones: ${c}\nProhibiciones: ${n}`;
    }
    return "";
  };

  const executeQuery = async (history: Message[]) => {
    setStatus("loading");
    setCurrentResponse("");

    try {
      const res = await fetch("/api/ejercicio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ejercicioId, messages: history }),
      });

      if (!res.ok) throw new Error("Fallo en la conexión con la IA");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No se pudo inicializar el stream");

      setStatus("streaming");
      const decoder = new TextDecoder();
      let fullText = "";
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        setCurrentResponse(fullText);
      }

      setMessages((prev) => [...prev, { role: "assistant", content: fullText }]);
      setCurrentResponse("");
      setStatus("done");
    } catch (error) {
      console.error("AI Assistant Error:", error);
      setStatus("error");
    }
  };

  const handleProbarIA = () => {
    const contenido = obtenerContenidoInicial();
    if (!contenido || contenido.trim().length < 5) {
      alert("Por favor, escribí algo más antes de probar con IA.");
      return;
    }
    const internalHistory: Message[] = [{ role: "user", content: contenido }];
    setMessages(internalHistory);
    executeQuery(internalHistory);
  };

  const handleFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUp.trim() || status === "streaming" || status === "loading") return;

    const newMessages: Message[] = [...messages, { role: "user", content: followUp }];
    setMessages(newMessages);
    setFollowUp("");
    executeQuery(newMessages);
  };

  const handleLimpiar = () => {
    const keys: string[] = [];
    if (ejercicioId === "b1") keys.push("wa_b1_confirmado", "wa_b1_desmitificado");
    else if (ejercicioId === "b2") keys.push("wa_b2_mejorado");
    else if (ejercicioId === "b3") keys.push("wa_b3_tareas", "wa_b3_prompt");
    else if (ejercicioId === "b4") keys.push("wa_b4_prompt", "wa_b4_observado");
    else if (ejercicioId === "adv") keys.push("wa_mcp_integrations", "wa_mcp_use_case", "wa_adv_stack", "wa_adv_convenciones", "wa_adv_no_hacer");

    keys.forEach(k => sessionStorage.removeItem(k));
    window.dispatchEvent(new Event("storage"));
    
    setMessages([]);
    setExpandedMessages({});
    setCurrentResponse("");
    setStatus("idle");
  };

  return (
    <div className="mt-4 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={handleProbarIA}
          disabled={status === "loading" || status === "streaming"}
          className={`flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold transition-all duration-300 shadow-lg ${
            status === "loading" || status === "streaming"
              ? "bg-slate-700 text-slate-400 cursor-not-allowed"
              : "bg-[#F5A623] hover:bg-[#F5A623]/90 text-[#0F1924] hover:scale-[1.02] active:scale-[0.98]"
          }`}
        >
          {status === "loading" || status === "streaming" ? (
            <Loader2 className="animate-spin" size={18} />
          ) : messages.length > 0 ? (
            <RefreshCw size={18} />
          ) : (
            <Sparkles size={18} />
          )}
          {status === "idle" && "✨ Probar con IA"}
          {(status === "loading" || status === "streaming") && "Procesando..."}
          {status === "done" && messages.length === 1 && "Reintentar inicial"}
          {messages.length > 1 && status === "done" && "Reiniciar charla"}
          {status === "error" && "Error - Reintentar"}
        </button>

        {messages.length > 0 && status === "done" && (
          <button
            onClick={handleLimpiar}
            className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold bg-[#1A2E3D] hover:bg-[#1A2E3D]/80 text-[#E8F0EE] border border-[#7B5EA7]/30 transition-all duration-300 hover:scale-[1.02] shadow-md"
          >
            🗑️ Limpiar campos
          </button>
        )}

        {(status === "streaming" || status === "done") && (
          <span className="text-[10px] text-[#7B5EA7] font-bold uppercase tracking-wider animate-pulse">
            Gemini 3 Flash Activo
          </span>
        )}
      </div>

      <div className="space-y-4">
        {messages.map((m, idx) => {
          const isExpanded = expandedMessages[idx];
          const isAssistant = m.role === "assistant";

          return (
            <div 
              key={idx} 
              className={`p-4 sm:p-5 rounded-2xl border backdrop-blur-sm shadow-sm animate-in fade-in slide-in-from-top-2 ${
                isAssistant
                  ? "bg-[#132236]/80 border-[#7B5EA7]/30 text-[#E8F0EE]" 
                  : "bg-[#1A2E3D]/50 border-white/5 text-[#7FA8A0] ml-3 sm:ml-8"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-2 h-2 rounded-full ${isAssistant ? "bg-[#7B5EA7]" : "bg-[#F5A623]"}`} />
                <span className="text-[11px] font-bold uppercase tracking-widest opacity-80">
                  {isAssistant ? "Asistente Ginialtech" : "Tu contenido / pregunta"}
                </span>
              </div>
              <div className={`ai-markdown-content text-sm leading-relaxed font-medium transition-all duration-300 ${isAssistant && !isExpanded ? "line-clamp-3 overflow-hidden" : ""}`}>
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
              
              {isAssistant && (
                <button
                  onClick={() => toggleExpand(idx)}
                  className="mt-3 text-[10px] font-bold text-[#F5A623] hover:text-[#F5A623]/80 uppercase tracking-widest flex items-center gap-1 transition-colors"
                >
                  {isExpanded ? "Ver menos ↑" : "Ver más ↓"}
                </button>
              )}
            </div>
          );
        })}

        {status === "loading" && (
          <div className="p-4 sm:p-5 rounded-2xl border bg-[#132236]/80 border-[#7B5EA7]/30 text-[#E8F0EE] backdrop-blur-sm shadow-inner animate-in fade-in">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-3 flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-[#F5A623] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-[#F5A623] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-[#F5A623] rounded-full animate-bounce"></span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#7FA8A0]">
                Gemini pensando...
              </span>
            </div>
            <div className="h-4 w-2/3 bg-slate-700/30 rounded animate-pulse" />
          </div>
        )}

        {currentResponse && (
          <div className="p-4 sm:p-5 rounded-2xl border bg-[#132236]/80 border-[#7B5EA7]/30 text-[#E8F0EE] backdrop-blur-sm shadow-inner animate-in fade-in">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#7FA8A0]">
                Escribiendo...
              </span>
            </div>
            <div className="ai-markdown-content text-sm leading-relaxed font-medium">
              <ReactMarkdown>{currentResponse}</ReactMarkdown>
              <span className="inline-block w-1.5 h-4 ml-1 bg-[#F5A623] animate-pulse align-middle" />
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 text-red-100 text-xs shadow-lg animate-shake">
            ⚠️ Hubo un problema al conectar con Gemini (posible error 503). Por favor, intentá de nuevo.
          </div>
        )}

        {(status === "done" || status === "error") && messages.length > 0 && (
          <div className="mt-8 border-t border-[#7B5EA7]/20 pt-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex justify-end mb-4">
              <button
                onClick={handleLimpiar}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-[#1A2E3D]/40 hover:bg-[#1A2E3D]/80 text-[#7FA8A0] border border-[#7B5EA7]/20 transition-all duration-300 hover:scale-[1.02]"
              >
                🗑️ Limpiar historial
              </button>
            </div>
            
            <form onSubmit={handleFollowUp} className="flex gap-2">
              <input
                type="text"
                placeholder="Hacé una pregunta de seguimiento..."
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
                className="flex-1 bg-[#1A2E3D]/50 border border-[#7B5EA7]/30 rounded-xl px-4 py-3 text-sm text-white focus:border-[#F5A623] outline-none transition-all placeholder:text-slate-500 shadow-inner"
              />
              <button
                type="submit"
                disabled={!followUp.trim()}
                className="bg-[#F5A623] hover:bg-[#F5A623]/90 text-[#0F1924] font-bold rounded-xl px-6 flex items-center justify-center transition-all hover:scale-[1.05] active:scale-[0.95] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        )}
        <div ref={scrollRef} className="h-4" />
      </div>

      <style jsx global>{`
        .ai-markdown-content p { margin-bottom: 0.75rem; }
        .ai-markdown-content p:last-child { margin-bottom: 0; }
        .ai-markdown-content strong { color: #F5A623; }
        .ai-markdown-content ul, .ai-markdown-content ol { margin-left: 1.25rem; margin-bottom: 0.75rem; }
        .ai-markdown-content li { margin-bottom: 0.25rem; }
        .ai-markdown-content h1, .ai-markdown-content h2, .ai-markdown-content h3 {
          color: #7B5EA7; font-weight: bold; margin-top: 1rem; margin-bottom: 0.5rem;
        }
        .ai-markdown-content h3 { font-size: 1.1rem; }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      `}</style>
    </div>
  );
}
