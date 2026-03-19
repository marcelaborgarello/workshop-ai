"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import FeedbackForm from "./FeedbackForm";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl bg-[#0F1924]/80 animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] bg-[#132236] border border-[#7B5EA7]/30 rounded-3xl shadow-2xl overflow-y-auto animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        
        {/* Decoración */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#7B5EA7] to-transparent opacity-50" />
        
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full md:hover:bg-white/5 text-slate-400 hover:text-white transition-colors z-10 bg-[#0F1924]/50 md:bg-transparent"
          aria-label="Cerrar modal de feedback"
        >
          <X size={24} />
        </button>

        <div className="p-6 sm:p-10">
          <FeedbackForm onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
