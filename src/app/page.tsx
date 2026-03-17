import Image from "next/image";
import { Download } from "lucide-react";
import WorkshopGuide from "@/components/WorkshopGuide";
import "./workshop.css";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0F1924] font-sans">
      <header className="sticky top-0 w-full bg-[#132236]/95 backdrop-blur-md border-b border-[#7B5EA7]/20 px-6 py-4 flex items-center justify-between gap-4 shadow-xl z-50">
        <div className="flex items-center gap-4">
          <Image 
            src="/logo-con-texto.png" 
            alt="Ginialtech" 
            width={180} 
            height={40} 
            priority
            className="h-auto w-auto"
          />
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/downloads/workshop-ia.pptx"
            download
            className="flex items-center gap-2 px-4 py-2 bg-[#1A2E3D] hover:bg-[#1A2E3D]/80 border border-[#F5A623]/30 hover:border-[#F5A623] rounded-lg transition-all duration-200"
          >
            <Download size={15} className="text-[#F5A623]" />
            <span className="text-xs font-semibold text-[#E8F0EE]">
              Presentación (.pptx)
            </span>
          </a>

          <a
            href="/downloads/workshop-ia.pdf"
            download
            className="flex items-center gap-2 px-4 py-2 bg-[#7B5EA7] hover:bg-[#8A6DB8] text-white rounded-lg transition-all duration-200"
          >
            <Download size={15} className="text-white" />
            <span className="text-xs font-semibold">
              Guía completa (.pdf)
            </span>
          </a>
        </div>
      </header>

      <main className="flex-grow">
        <WorkshopGuide />
      </main>
    </div>
  );
}
