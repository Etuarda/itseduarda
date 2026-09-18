import { motion } from "motion/react";
import SplashIntro from "@/components/layout/SplashIntro";
import Header from "@/components/layout/Header";
import FooterSection from "@/components/layout/FooterSection";
import HeroSection from "@/components/sections/HeroSection";
import SpecialtiesCarousel from "@/components/sections/SpecialtiesCarousel";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import BotanicalCanvas from "@/components/ui/BotanicalCanvas";
import ConnectingLineArt from "@/components/ui/ConnectingLineArt";
import HummingbirdGuide from "@/components/ui/HummingbirdGuide";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { LaceDivider } from "@/components/ui/CssLace";

export default function App() {
  return (
    <div className="relative min-h-[100svh] w-full max-w-full bg-[#F7F6F2] text-[#1C1A18] font-sans antialiased overflow-x-clip selection:bg-[#465B20]/25 selection:text-[#1C1A18]">
      {/* 1. Canvas Interativo de Fundo (Épico 2: Rede de Partículas Botânicas) */}
      <BotanicalCanvas />

      {/* 2. Fio Condutor Contínuo & Desenho Sem Nome (Conexão Orgânica entre Seções) */}
      <ConnectingLineArt />

      {/* 3. O Guia Interativo Autônomo (Épico 3: Beija-Flor Inteligente) */}
      <HummingbirdGuide />

      {/* 3. Splash Intro Editorial & Header */}
      <SplashIntro />
      <Header />

      {/* 4. Fluxo Principal de Seções Editoriais */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="relative z-10 w-full flex flex-col"
      >
        {/* Seção 1: Hero & Manifesto Editorial */}
        <SectionReveal>
          <HeroSection />
        </SectionReveal>

        <LaceDivider />

        {/* Seção 2: Stacks Accordion Carousel */}
        <SectionReveal>
          <SpecialtiesCarousel />
        </SectionReveal>

        <LaceDivider />

        {/* Seção 3: Carrossel de Projetos */}
        <SectionReveal>
          <ProjectsSection />
        </SectionReveal>

        <LaceDivider />

        {/* Seção 4: Repositório de Competências */}
        <SectionReveal>
          <SkillsSection />
        </SectionReveal>

        <LaceDivider />

        {/* Seção 5: Trajetória & Formação */}
        <SectionReveal>
          <ExperienceSection />
        </SectionReveal>
      </motion.main>

      {/* 5. Rodapé com Contato Direto e Toast Notification */}
      <FooterSection />
    </div>
  );
}
