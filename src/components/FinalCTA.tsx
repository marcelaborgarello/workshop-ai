"use client";

import { useState } from "react";
import FeedbackModal from "./FeedbackModal";

export default function FinalCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* ── CADA VISITA CUENTA ────────────────────────────── */}
      <div className="bloque-header">
        <div className="bloque-num bg-pink">♥</div>
        <div>
          <h2>¿Te sirvió el workshop?</h2>
          <span className="tiempo">Nos ayuda un montón saber tu opinión</span>
        </div>
      </div>

      <div className="card text-center p-6 sm:p-10 border-pink/30 bg-[#0F1924]/50">
        <p className="text-slate-300 mb-8 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
          Si te sirvió, podés dejar feedback para ayudar a mejorarlo 🙌 <br className="hidden sm:block" />
          Y si querés apoyar el proyecto, hay un cafecito ☕
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-6 py-3 bg-[#7B5EA7] hover:bg-[#7B5EA7]/90 text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg"
          >
            📝 Dejar feedback
          </button>
          <a 
            href="https://cafecito.app/ginialtech" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-[#F5A623] hover:bg-[#F5A623]/90 text-[#0F1924] font-black rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
          >
            ☕ Invitar un cafecito
          </a>
        </div>
      </div>

      <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
