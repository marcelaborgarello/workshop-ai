import WorkshopGuide from "@/components/WorkshopGuide";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./workshop.css";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0F1924] font-sans">
      <Header />
      
      <main className="flex-grow">
        <WorkshopGuide />
      </main>

      <Footer />
    </div>
  );
}
