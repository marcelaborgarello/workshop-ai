"use client";

import Image from "next/image";
import { Download } from "lucide-react";

export default function Header() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 w-full bg-[#132236]/95 backdrop-blur-md border-b border-[#7B5EA7]/20 px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl z-50">
      <div className="flex items-center gap-4">
        <a 
          href="#" 
          className="hover:opacity-90 transition-opacity"
          onClick={scrollToTop}
        >
          <Image 
            src="/logo-con-texto.png" 
            alt="Ginialtech" 
            width={160} 
            height={36} 
            priority
            className="h-6 sm:h-8 w-auto"
          />
        </a>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <a
          href="https://docs.google.com/presentation/d/1EQJMABWgpFVWX_DKW7GusNiH_vJSOwaY/preview?slide=id.p1"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-[#00B4A6] hover:bg-[#00B4A6]/90 text-[#0F1924] rounded-lg transition-all duration-200 font-bold shadow-sm"
        >
          <span className="text-[11px] sm:text-xs">
            ▶ Ver slides
          </span>
        </a>

        <a
          href="/downloads/workshop-ia.pptx"
          download
          className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-[#1A2E3D] hover:bg-[#1A2E3D]/80 border border-[#F5A623]/30 hover:border-[#F5A623] rounded-lg transition-all duration-200"
        >
          <Download size={14} className="text-[#F5A623]" />
          <span className="text-[11px] sm:text-xs font-semibold text-[#E8F0EE]">
            .pptx
          </span>
        </a>

        <a
          href="/downloads/workshop-ia.pdf"
          download
          className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-[#7B5EA7] hover:bg-[#8A6DB8] text-white rounded-lg transition-all duration-200"
        >
          <Download size={14} className="text-white" />
          <span className="text-[11px] sm:text-xs font-semibold">
            .pdf
          </span>
        </a>
      </div>
    </header>
  );
}
