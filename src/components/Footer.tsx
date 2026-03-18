"use client";

import { useState } from "react";
import { Mail, X, Send, Loader2, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al enviar el mensaje");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error: unknown) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <footer className="w-full bg-[#132236] border-t border-[#7B5EA7]/20 py-8 mt-12">
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4 sm:gap-8">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-white/5 text-[#7FA8A0] hover:text-teal border border-[#7FA8A0]/30 hover:border-teal rounded-lg transition-all duration-300 text-sm font-medium"
          >
            <Mail size={16} />
            Contacto
          </button>
          <button 
            onClick={() => window.dispatchEvent(new Event("open-terms"))}
            className="text-[#7FA8A0] hover:text-white text-xs font-medium underline underline-offset-4 decoration-[#7FA8A0]/30 hover:decoration-white transition-all duration-300"
          >
            Términos y Condiciones
          </button>
        </div>

        <div className="text-center md:text-right text-[#7FA8A0] text-[11px] leading-relaxed opacity-70">
          <p>Recurso de uso libre con atribución · Marzo 2026</p>
          <p>© Ginialtech · Advanced Agentic Coding</p>
        </div>
      </div>

      {/* MODAL DE CONTACTO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md max-h-[calc(100vh-2rem)] bg-[#132236] border border-[#7B5EA7]/30 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-y-auto animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => { setIsModalOpen(false); setStatus("idle"); }}
              className="absolute top-4 right-4 text-muted hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {status === "success" ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <CheckCircle2 size={48} className="text-teal" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">¡Mensaje enviado!</h3>
                <p className="text-[#7FA8A0] text-sm mb-6">Tu mensaje ha sido enviado. Te contactaremos pronto.</p>
                
                <div className="mb-8 p-6 bg-[#F5A623]/5 border border-[#F5A623]/20 rounded-xl">
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    ¡Gracias por ayudarme a mejorar! 🚀 Si te gusta lo que estoy armando en <strong>Ginialtech</strong>, podés invitarme un cafecito para que las APIs sigan encendidas.
                  </p>
                  <a 
                    href="https://cafecito.app/ginialtech" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F5A623] hover:bg-[#F5A623]/90 text-[#0F1924] font-black rounded-lg transition-all duration-300 hover:scale-[1.05] shadow-md text-xs"
                  >
                    ☕ Invitar un Cafecito
                  </a>
                </div>

                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 text-[#7FA8A0] hover:text-white text-[11px] font-bold uppercase tracking-widest transition-colors"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <Mail className="text-teal" /> Contáctanos
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-muted uppercase tracking-widest mb-1.5">Nombre completo</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-teal outline-none transition-all"
                      placeholder="Tu nombre..."
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-muted uppercase tracking-widest mb-1.5">Email</label>
                    <input 
                      required
                      type="email" 
                      className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-teal outline-none transition-all"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-muted uppercase tracking-widest mb-1.5">Mensaje</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-teal outline-none transition-all resize-none"
                      placeholder="¿En qué podemos ayudarte?"
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>
                  <button 
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-teal text-dark font-bold rounded-xl hover:bg-tealL transition-all disabled:opacity-50"
                  >
                    {status === "loading" ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                    {status === "loading" ? "Procesando..." : "Enviar mensaje"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
