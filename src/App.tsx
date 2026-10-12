import React from "react";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import HummingbirdGuide from "@/components/ui/HummingbirdGuide";
import LaceSeam from "@/components/chapters/LaceSeam";
import AuthorityChapter from "@/components/chapters/AuthorityChapter";
import ProjectsChapter from "@/components/chapters/ProjectsChapter";
import BuildChapter from "@/components/chapters/BuildChapter";
import TrajectoryChapter from "@/components/chapters/TrajectoryChapter";
import ContactChapter from "@/components/chapters/ContactChapter";
import { useLaceDrift } from "@/hooks/useLaceDrift";


/**
 * Seis capítulos, uma tela cada, costurados por renda em toda a largura.
 * O beija-flor sobrevoa entre eles em posições alternadas (ver content/chapters.ts).
 */
export default function App() {
  useLaceDrift();

  return (
    <div className="relative w-full max-w-full bg-[#F5F2E9] text-[#23241F] font-sans antialiased overflow-x-clip selection:bg-[#B69AD9]/40 selection:text-[#23241F]">
      <a
        href="#sobre"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:px-4 focus:py-2 focus:bg-[#23241F] focus:text-[#F5F2E9]"
      >
        Pular para o conteúdo
      </a>

      <HummingbirdGuide />
      <Header />

      <main className="relative z-10 w-full flex flex-col">
        <HeroSection />
        <LaceSeam variant="medallion" />
        <AuthorityChapter />
        <LaceSeam variant="ribbon" />
        <ProjectsChapter />
        <LaceSeam variant="medallion" />
        <BuildChapter />
        <LaceSeam variant="ribbon2" />
        <TrajectoryChapter />
        <LaceSeam variant="medallion" />
        <ContactChapter />
      </main>
    </div>
  );
}
