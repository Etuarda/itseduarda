import { motion } from "motion/react";
import SplashIntro from "@/components/layout/SplashIntro";
import Header from "@/components/layout/Header";
import FooterSection from "@/components/layout/FooterSection";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SpecialtiesCarousel from "@/components/sections/SpecialtiesCarousel";
import ProjectsSection from "@/components/sections/ProjectsSection";
import MethodSection from "@/components/sections/MethodSection";
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
      {/* 1. Canvas Interativo de Fundo (Rede de Partículas Botânicas) */}
      <BotanicalCanvas />

      {/* 2. Fio Condutor Contínuo (Conexão Orgânica entre Seções) */}
      <ConnectingLineArt />

      {/* 3. O Guia Interativo Autônomo (Beija-Flor Inteligente) */}
      <HummingbirdGuide />

      {/* 4. Splash Intro Editorial & Header */}
      <SplashIntro />
      <Header />

      {/* 5. Fluxo Principal de Seções Editoriais com Atmosferas Táteis Contínuas */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="relative z-10 w-full flex flex-col"
      >
        {/* Seção 1: Hero & Capa Editorial (Alabastro Imperial & Linho Fino) */}
        <div className="w-full texture-ivory-linen transition-colors duration-700">
          <SectionReveal>
            <HeroSection />
          </SectionReveal>
          <div className="h-12 sm:h-16 w-full transition-to-parchment pointer-events-none select-none" />
        </div>

        {/* Seção 2: Sobre & Como Eu Penso (Pergaminho Quente Táctil) */}
        <div className="w-full texture-warm-parchment transition-colors duration-700">
          <LaceDivider title="Capítulo I • Filosofia" />
          <SectionReveal>
            <AboutSection />
          </SectionReveal>
          <div className="h-12 sm:h-16 w-full transition-to-atelier pointer-events-none select-none" />
        </div>

        {/* Seção 3: Stacks & Base Técnica (Ateliê de Engenharia) */}
        <div className="w-full texture-atelier-paper transition-colors duration-700">
          <LaceDivider title="Capítulo II • Disciplinas" />
          <SectionReveal>
            <SpecialtiesCarousel />
          </SectionReveal>
          {/* Transição monumental para a atmosfera escura de Projetos */}
          <div className="h-16 sm:h-24 w-full transition-to-forest pointer-events-none select-none" />
        </div>

        {/* Seção 4: Projetos & Estudos de Caso (O Grande Contraste: Verde Oliva Floresta Veludado) */}
        <div className="w-full texture-forest-velvet transition-colors duration-700 relative">
          <LaceDivider title="Capítulo III • Estudos de Caso" className="opacity-60" />
          <SectionReveal>
            <ProjectsSection />
          </SectionReveal>
          {/* Transição luminosa de volta para o papel de estúdio */}
          <div className="h-16 sm:h-24 w-full transition-from-forest pointer-events-none select-none" />
        </div>

        {/* Seção 5: Método de Trabalho & Previsibilidade (Papel de Estúdio Editorial) */}
        <div className="w-full texture-studio-pure transition-colors duration-700">
          <LaceDivider title="Capítulo IV • Processo" />
          <SectionReveal>
            <MethodSection />
          </SectionReveal>
          <div className="h-12 sm:h-16 w-full transition-to-gazette pointer-events-none select-none" />
        </div>

        {/* Seção 6: Competências Técnicas (Compêndio & Gazeta Cultural) */}
        <div className="w-full texture-gazette-index transition-colors duration-700">
          <LaceDivider title="Capítulo V • Compêndio" />
          <SectionReveal>
            <SkillsSection />
          </SectionReveal>
          <div className="h-12 sm:h-16 w-full transition-to-folio pointer-events-none select-none" />
        </div>

        {/* Seção 7: Trajetória & Formação (Arquivo Monográfico) */}
        <div className="w-full texture-archival-folio transition-colors duration-700">
          <LaceDivider title="Capítulo VI • Trajetória" />
          <SectionReveal>
            <ExperienceSection />
          </SectionReveal>
          <div className="h-14 sm:h-20 w-full transition-to-night pointer-events-none select-none" />
        </div>
      </motion.main>

      {/* 6. Rodapé com Contato Direto e Toast Notification */}
      <FooterSection />
    </div>
  );
}
