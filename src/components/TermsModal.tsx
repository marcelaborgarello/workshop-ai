"use client";

import { useState, useEffect } from "react";
import { Info, ChevronRight } from "lucide-react";

export default function TermsModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpenManual = () => {
      setIsOpen(true);
      document.body.style.overflow = "hidden";
    };

    window.addEventListener("open-terms", handleOpenManual);
    return () => window.removeEventListener("open-terms", handleOpenManual);
  }, []);

  const handleAccept = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl bg-[#0F1924]/80 animate-in fade-in duration-500">
      <div className="relative w-full max-w-2xl max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] bg-[#132236] border border-[#7B5EA7]/30 rounded-3xl shadow-2xl overflow-y-auto overflow-x-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">

        {/* Decorative header line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#7B5EA7] to-transparent opacity-50" />

        <div className="p-6 sm:p-10">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-[#7B5EA7]/20 rounded-2xl border border-[#7B5EA7]/30">
              <Info className="text-[#7B5EA7]" size={32} />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#E8F0EE] tracking-tight">
                👋 Antes de empezar
              </h2>
              <p className="text-[#7FA8A0] text-sm font-bold uppercase tracking-widest">
                TRES COSITAS IMPORTANTES
              </p>
            </div>
          </div>

          <p className="text-slate-300 text-sm sm:text-base mb-8 leading-relaxed">
            Este es un workshop <strong>gratuito y a tu ritmo</strong> para explorar la IA de forma
            práctica. Queremos que lo disfrutes con confianza, así que te contamos cómo funciona.
          </p>

          <div className="space-y-4 mb-10">
            {/* Personal data */}
            <div className="flex gap-4 p-4 rounded-2xl bg-[#7B5EA7]/5 border border-[#7B5EA7]/20">
              <div className="shrink-0 mt-0.5 text-xl">🔒</div>
              <div>
                <h4 className="text-[#E8F0EE] font-bold text-sm mb-1">
                  Cuidá tu información personal
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  El asistente usa IA de Google (Gemini). No ingreses contraseñas, datos bancarios,
                  documentos ni información confidencial. Tratá este chat como una conversación
                  pública.
                </p>
              </div>
            </div>

            {/* IA Limits */}
            <div className="flex gap-4 p-4 rounded-2xl bg-[#7B5EA7]/5 border border-[#7B5EA7]/20">
              <div className="shrink-0 mt-0.5 text-xl">🤖</div>
              <div>
                <h4 className="text-[#E8F0EE] font-bold text-sm mb-1">
                  La IA tiene límites (importante saberlo)
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">
                  <strong>Puede equivocarse:</strong> Las respuestas las genera Gemini y, aunque suelen ser útiles, pueden contener errores o información incorrecta (lo que se llama &quot;alucinación&quot;). Verificá siempre lo importante.
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  <strong>No piensa ni siente:</strong> Es un modelo de lenguaje: predice texto de forma sofisticada. No tiene conciencia ni emociones propias.
                </p>
              </div>
            </div>

            {/* Privacy */}
            <div className="flex gap-4 p-4 rounded-2xl bg-[#7B5EA7]/5 border border-[#7B5EA7]/20">
              <div className="shrink-0 mt-0.5 text-xl">🗂️</div>
              <div>
                <h4 className="text-[#E8F0EE] font-bold text-sm mb-1">
                  Tus datos quedan en tu navegador
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Tu progreso se guarda solo en tu dispositivo. Ginialtech no almacena ni accede
                  a tu historial.
                </p>
              </div>
            </div>
          </div>

          {/* CTA button */}
          <button
            onClick={handleAccept}
            className="w-full flex items-center justify-center gap-2 py-4 bg-[#F5A623] hover:bg-[#F5A623]/90 text-[#0F1924] font-black rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl group"
          >
            Aceptar y Empezar
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-center text-slate-500 text-[11px] mt-4">
            Al continuar, confirmás que leíste y entendiste estas condiciones de uso.
          </p>
        </div>
      </div>
    </div>
  );
}
