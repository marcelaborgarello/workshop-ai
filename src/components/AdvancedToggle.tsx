"use client";

import { useState } from "react";
import { Hexagon } from "lucide-react";
import AdvancedContent from "./AdvancedContent";

export default function AdvancedToggle() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="mt-12 mb-12">
      {!showAdvanced ? (
        <button
          onClick={() => setShowAdvanced(true)}
          className="group relative flex flex-col items-center justify-center gap-3 w-full p-8 bg-gradient-to-br from-[#1A2E3D] to-[#132236] border-2 border-[#F5A623] rounded-2xl cursor-pointer hover:shadow-[0_0_30px_rgba(245,166,35,0.15)] transition-all duration-500 overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-[#F5A623] opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500" />
          
          <div className="relative flex items-center justify-center w-16 h-16 bg-[#F5A623]/10 rounded-full border border-[#F5A623]/20 group-hover:scale-110 group-hover:bg-[#F5A623]/20 transition-all duration-500">
            <Hexagon size={32} className="text-[#F5A623] animate-pulse" />
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-bold text-[#F5A623] mb-1">Ver bloque avanzado</h3>
            <p className="text-[#C8A060] text-sm font-medium tracking-wide">
              MCP · SKILLS · AGENTES · IA EN PRODUCCIÓN
            </p>
          </div>
          
          <div className="mt-2 flex items-center gap-2 text-[#F5A623]/60 text-xs font-bold uppercase tracking-[2px]">
            <span>Click para desplegar</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-ping" />
          </div>
        </button>
      ) : (
        <AdvancedContent />
      )}
    </div>
  );
}
