import { ArrowDown, ArrowRight, Download, Sparkles, Layers, Cpu, Database, BrainCircuit } from "lucide-react";
import eduardaPhoto from "@/components/assets/Eduardadev.png";

export default function HeroSection() {
  const resumeUrl = "/Eduarda- Curriculo-Full-Stack(6).pdf";

  return (
    <section
      id="hero"
      className="w-full min-h-screen lg:h-screen lg:max-h-screen relative bg-[#FAF8F5] texture-paper flex flex-col justify-between overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16 pt-20 sm:pt-22 pb-5 scroll-mt-0"
    >
     

      {/* 2. O Grande Masthead Editorial (Nome em Destaque na Capa Sem Moldura) */}
      <div className="w-full pt-2 sm:pt-3 pb-3 sm:pb-4 text-center border-b border-[#465B20]/15 select-none">
        <h1 className="font-serif font-black text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight sm:tracking-[0.05em] lg:tracking-[0.08em] text-[#1C1A18] uppercase leading-none break-words">
          Eduarda Silva Santos
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-4 mt-1.5 sm:mt-2.5 text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-mono font-bold tracking-[0.14em] sm:tracking-[0.25em] text-[#465B20] uppercase">
          <span>Dev Full-Stack</span>
          <span className="text-[#9E6761]">✦</span>
          <span>Engenharia de Dados</span>
          <span className="text-[#9E6761]">✦</span>
          <span>Inteligência Artificial</span>
        </div>
      </div>

      {/* 3. Corpo Principal da Capa: Composição Sem Moldura com Foto e Destaques */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center flex-1 my-auto py-3 sm:py-4">
        {/* Coluna Esquerda: Manchetes de Capa & Seção Sobre (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center gap-3 sm:gap-4">
          {/* Manchete Principal de Capa */}
          <div className="flex flex-col">
            <div className="flex flex-wrap items-baseline gap-x-2 sm:gap-x-3 gap-y-1 mb-1">
              <span className="font-serif font-light text-xl sm:text-3xl lg:text-4xl text-[#1C1A18] tracking-tight">
                Desenvolvedora web usando
              </span>
              <span
                className="text-2xl sm:text-4xl lg:text-5xl text-[#9E6761] leading-none select-none drop-shadow-xs"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                dados e ia generativa aplicada.
              </span>
            </div>

            <h2 className="font-serif font-bold text-base sm:text-lg lg:text-xl text-[#1C1A18] tracking-tight leading-snug">
              Soluções que impactam{" "}
              <span className="italic font-light text-[#465B20]">
               pessoas.
              </span>
            </h2>
          </div>

          {/* A SEÇÃO SOBRE (Lead Story / Manifesto da Engenheira) */}
          <div id="sobre" className="w-full scroll-mt-28">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#465B20]/20 shadow-2xs">
              <div className="flex items-center gap-2 mb-1.5 pb-1 border-b border-[#465B20]/15">
                <span className="w-1.5 h-1.5 rounded-full bg-[#465B20]" />
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-[#465B20] font-bold">
                  // EDITORIAL • SOBRE A ENGENHEIRA
                </span>
              </div>
              <p className="font-sans text-xs sm:text-sm md:text-base text-[#1C1A18] font-normal leading-relaxed">
                Construo arquiteturas de software resilientes, conectando ecossistemas{" "}
                <strong>Node.js, TypeScript e React</strong> a pipelines analíticos de dados e
                orquestração de inteligência artificial generativa com RAG. Engenharia com rigor
                técnico, acessibilidade digital (WCAG 2.2) e foco intransigente na experiência do
                usuário final.
              </p>
            </div>
          </div>

          {/* Destaques da Edição (4 Eixos de Competência na Capa) */}
          <div>
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#4E4A45] font-bold block mb-1.5">
              ✦ ARTIGOS & COMPETÊNCIAS CENTRAIS //
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 w-full">
              <div className="p-2.5 rounded-xl bg-white border border-[#465B20]/20 shadow-2xs flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 text-[#465B20]">
                  <Layers className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-mono font-bold tracking-wider uppercase">01. FRONT</span>
                </div>
                <span className="font-serif font-bold text-xs sm:text-sm text-[#1C1A18]">Full-Stack</span>
                <span className="font-sans text-[10px] text-[#4E4A45]">React & TS</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#465B20]/20 shadow-2xs flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 text-[#465B20]">
                  <Cpu className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-mono font-bold tracking-wider uppercase">02. BACK</span>
                </div>
                <span className="font-serif font-bold text-xs sm:text-sm text-[#1C1A18]">Arquitetura</span>
                <span className="font-sans text-[10px] text-[#4E4A45]">Node & APIs</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#465B20]/20 shadow-2xs flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 text-[#465B20]">
                  <Database className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-mono font-bold tracking-wider uppercase">03. DADOS</span>
                </div>
                <span className="font-serif font-bold text-xs sm:text-sm text-[#1C1A18]">Dados & ETL</span>
                <span className="font-sans text-[10px] text-[#4E4A45]">Postgres & Python</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#465B20]/20 shadow-2xs flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 text-[#465B20]">
                  <BrainCircuit className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-mono font-bold tracking-wider uppercase">04. IA</span>
                </div>
                <span className="font-serif font-bold text-xs sm:text-sm text-[#1C1A18]">IA & RAG</span>
                <span className="font-sans text-[10px] text-[#4E4A45]">FDTE / USP</span>
              </div>
            </div>
          </div>

          {/* Botões de Ação na Capa */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-0.5 w-full sm:w-auto">
            <a
              href="#projetos"
              className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 min-h-[44px] rounded-full bg-[#465B20] hover:bg-[#2A3614] text-[#F7F6F2] font-sans font-semibold text-xs uppercase tracking-[0.12em] sm:tracking-[0.14em] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98"
            >
              Explorar Projetos <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="#stacks"
              className="flex-1 sm:flex-none px-3.5 sm:px-5 py-2.5 sm:py-3 min-h-[44px] rounded-full border border-[#465B20]/40 bg-white hover:bg-[#FAF8F5] text-[#1C1A18] font-sans font-semibold text-xs uppercase tracking-[0.10em] sm:tracking-[0.12em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
            >
              Stacks & Arquitetura
            </a>

            <a
              href={resumeUrl}
              download="Eduarda- Curriculo-Full-Stack(6).pdf"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 sm:py-3 min-h-[44px] rounded-full border border-[#465B20]/35 text-[#383531] hover:text-[#1C1A18] hover:border-[#465B20]/60 bg-white hover:bg-[#FAF8F5] transition-all flex items-center justify-center gap-1.5 text-xs font-sans font-medium cursor-pointer shadow-xs active:scale-98"
              title="Baixar Currículo em PDF"
            >
              <Download className="w-3.5 h-3.5 text-[#465B20]" /> Baixar CV
            </a>
          </div>
        </div>

        {/* Coluna Direita: A FOTO NA CAPA (Toda Visível, Bem Enquadrada e Sem Moldura) (5 cols) */}
        <div className="lg:col-span-5 relative flex flex-col justify-center items-center w-full">
          <div className="relative w-full max-w-[300px] xs:max-w-[340px] sm:max-w-[420px] lg:max-w-[490px] aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl group border-0 bg-[#FAF8F5]">
            <img
              src={eduardaPhoto}
              alt="Eduarda Silva Santos — Desenvolvedora Full Stack e Especialista em IA"
              className="w-full h-full object-contain sm:object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
            />
          </div>

          {/* Assinatura Editorial e Selos na Base da Foto (Sem cobrir a foto!) */}
          <div className="w-full max-w-[300px] xs:max-w-[340px] sm:max-w-[420px] lg:max-w-[490px] mt-2.5 px-1 flex flex-wrap items-center justify-between gap-2 text-xs select-none">
            <span
              className="text-2xl sm:text-3xl text-[#465B20] leading-none"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              Eduarda Silva Santos
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[11px] font-mono text-[#383531] font-semibold">
              <span>PUCRS</span>
              <span className="text-[#9E6761]">✦</span>
              <span>USP / FDTE</span>
              <span className="text-[#9E6761]">✦</span>
              <span>PUC-Rio</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Rodapé da Capa Editorial (Código de Barras & Indicador de Leitura) */}
      <div className="w-full pt-2.5 sm:pt-3 border-t border-[#465B20]/20 flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-[#4E4A45] select-none">
        {/* Barcode Simulado de Publicação Editorial */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-end gap-[2px] h-5 px-1.5 py-0.5 bg-white border border-[#465B20]/20 rounded shadow-2xs">
            {[3, 6, 2, 8, 4, 7, 3, 5, 8, 2, 6, 4, 7, 3, 8, 5].map((h, i) => (
              <div
                key={i}
                className="w-[2px] bg-[#1C1A18]"
                style={{ height: `${h * 1.8}px` }}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] text-[#383531] font-bold tracking-widest uppercase">
            ISSUE 01 // 2026-FULLSTACK-AI
          </span>
        </div>

        {/* Indicador de Continuação */}
        <a
          href="#stacks"
          className="inline-flex items-center gap-1.5 text-xs font-sans text-[#383531] hover:text-[#465B20] font-semibold transition-colors group cursor-pointer"
          aria-label="Continuar leitura do dossiê"
        >
          <span className="uppercase tracking-widest text-[10px]">Continuar Lendo o Dossiê</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#465B20] group-hover:translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
}
