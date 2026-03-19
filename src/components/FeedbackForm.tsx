"use client";

import { useState } from "react";
import FeedbackStars from "./FeedbackStars";
import EditableField from "./EditableField";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

export default function FeedbackForm({ onClose }: { onClose?: () => void }) {
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    const valuable = sessionStorage.getItem("wa_valuable") || "";
    const improvements = sessionStorage.getItem("wa_improvements") || "";
    const recommend = sessionStorage.getItem("wa_recommend") || "";
    const pendingTopics = sessionStorage.getItem("wa_pendingTopics") || "";

    if (rating === 0 || !valuable.trim() || !improvements.trim() || !recommend.trim()) {
      setErrorMessage("Por favor, completá todos los campos obligatorios y seleccioná una valoración.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          valuable,
          improvements,
          recommend,
          pendingTopics,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Ocurrió un error al enviar el feedback.");
      }

      setStatus("success");
      // Limpiar sessionStorage tras éxito si se desea
      ["wa_valuable", "wa_improvements", "wa_recommend", "wa_pendingTopics"].forEach(key => 
        sessionStorage.removeItem(key)
      );
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Error de conexión.");
    }
  };

  if (status === "success") {
    return (
      <div className="card text-center p-6 sm:p-12 border-teal">
        <div className="flex justify-center mb-4">
          <CheckCircle2 size={48} className="text-teal" />
        </div>
        <h3 className="text-xl font-bold mb-2">¡Gracias por tu feedback!</h3>
        <p className="text-muted text-sm px-4">Tu opinión es fundamental para que Ginialtech siga mejorando estos workshops.</p>
        
        <div className="mt-8 flex flex-col items-center gap-4">
          {onClose && (
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 bg-[#7FA8A0] hover:bg-[#7FA8A0]/90 text-[#0F1924] font-bold rounded-xl transition-all duration-300 shadow-lg"
            >
              Cerrar
            </button>
          )}
          <button 
            onClick={() => setStatus("idle")}
            className="text-[11px] font-bold text-[#7FA8A0] hover:text-white uppercase tracking-widest transition-colors mt-2"
          >
            Enviar otro comentario
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-pink">
      <h3 className="text-lg font-bold mb-6">¿Cómo estuvo el workshop?</h3>
      
      <div className="mb-6">
        <FeedbackStars onRatingChange={(n) => setRating(n)} currentRating={rating} />
      </div>

      <div className="space-y-4 mb-8">
        <EditableField 
          id="valuable" 
          variant="light" 
          label="¿Qué fue lo más valioso del workshop?" 
          placeholder="Lo que más me llevé..."
        />
        <EditableField 
          id="improvements" 
          variant="light" 
          label="¿Qué mejorarías o agregarías?" 
          placeholder="Sugerencias..."
        />
        <EditableField 
          id="recommend" 
          variant="light" 
          label="¿Recomendarías este workshop? ¿A quién?" 
          placeholder="Sí / No / Tal vez... y por qué"
        />
        <EditableField 
          id="pendingTopics" 
          variant="light" 
          label="¿Hay algún tema que quedó pendiente y te gustaría profundizar?" 
          placeholder="Temas para próximas ediciones..."
        />
      </div>

      {status === "error" && (
        <div className="alert mb-6 flex items-center gap-3 bg-red-50 text-red-800 border-red-200">
          <AlertCircle size={18} />
          <p className="font-medium text-sm">{errorMessage}</p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={status === "loading"}
        className="group relative flex items-center justify-center gap-2 w-full py-3 sm:py-4 bg-navy text-teal font-bold rounded-xl border-2 border-teal hover:bg-teal hover:text-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-teal/20"
      >
        {status === "loading" ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        )}
        <span>{status === "loading" ? "Enviando..." : "Enviar feedback del workshop"}</span>
      </button>
    </div>
  );
}
