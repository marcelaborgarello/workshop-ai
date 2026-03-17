"use client";

import { useState, useEffect } from "react";
import { ShieldAlert, Info, Cpu, Database, ChevronRight } from "lucide-react";

export default function TermsModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("wa_terms_accepted");
    if (!hasAccepted) {
      setIsOpen(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("wa_terms_accepted", "true");
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl bg-[#0F1924]/80 animate-in fade-in duration-500">
      <div className="relative w-full max-w-2xl bg-[#132236] border border-[#7B5EA7]/30 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
        
        {/* Header Decorativo */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#7B5EA7] to-transparent opacity-50" />
        
        <div className="p-6 sm:p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-[#7B5EA7]/20 rounded-2xl border border-[#7B5EA7]/30">
              <ShieldAlert className="text-[#F5A623]" size={32} />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#E8F0EE] tracking-tight">Términos y Condiciones</h2>
              <p className="text-[#7FA8A0] text-sm font-bold uppercase tracking-widest">Workshop IA Ginialtech</p>
            </div>
          </div>

          <p className="text-slate-300 text-sm sm:text-base mb-8 leading-relaxed">
            Antes de comenzar, es fundamental que comprendas cómo funciona este asistente y cuáles son tus responsabilidades al usarlo.
          </p>

          <div className="space-y-6 mb-10">
            {/* Cláusula de Datos Sensibles */}
            <div className="flex gap-4 p-4 rounded-2xl bg-red-500/5 border border-red-500/20">
              <div className="shrink-0 mt-1">
                <ShieldAlert className="text-red-400" size={20} />
              </div>
              <div>
                <h4 className="text-red-400 font-black text-xs uppercase tracking-widest mb-1">🛡️ CLÁUSULA DE DATOS SENSIBLES</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Está estrictamente <strong>PROHIBIDO</strong> ingresar contraseñas, secretos comerciales, datos financieros o información personal sensible. Los datos son procesados por Google. Ginialtech no se responsabiliza por el ingreso de información confidencial.
                </p>
              </div>
            </div>

            {/* Responsabilidad Técnica */}
            <div className="flex gap-4 p-4 rounded-2xl bg-[#7B5EA7]/5 border border-[#7B5EA7]/20">
              <div className="shrink-0 mt-1">
                <Cpu className="text-[#7B5EA7]" size={20} />
              </div>
              <div>
                <h4 className="text-[#7B5EA7] font-black text-xs uppercase tracking-widest mb-1">Responsabilidad Técnica</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Las respuestas son generadas por <strong>Gemini 3.1</strong>. Pueden contener errores o {"\""}alucinaciones{"\""}. Verificá siempre la información crítica antes de usarla.
                </p>
              </div>
            </div>

            {/* Naturaleza y Privacidad */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex gap-3 p-4 rounded-2xl bg-[#0F1924]/50 border border-white/5">
                <Info className="text-[#7FA8A0] shrink-0" size={18} />
                <div>
                  <h5 className="text-[#E8F0EE] font-bold text-xs mb-1">Naturaleza de la IA</h5>
                  <p className="text-slate-400 text-xs">Sin conciencia ni sentimientos. Es un motor de procesamiento estadístico.</p>
                </div>
              </div>
              <div className="flex gap-3 p-4 rounded-2xl bg-[#0F1924]/50 border border-white/5">
                <Database className="text-[#7FA8A0] shrink-0" size={18} />
                <div>
                  <h5 className="text-[#E8F0EE] font-bold text-xs mb-1">Privacidad Local</h5>
                  <p className="text-slate-400 text-xs">Tus datos no se guardan en nuestros servidores. Residen en este navegador.</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleAccept}
            className="w-full flex items-center justify-center gap-2 py-4 bg-[#F5A623] hover:bg-[#F5A623]/90 text-[#0F1924] font-black rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl group"
          >
            Aceptar y Comenzar Workshop
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
