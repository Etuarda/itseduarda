import { ArrowRight, Download, Layers, Cpu, Database, BrainCircuit } from "lucide-react";
import eduardaPhoto from "@/components/assets/Eduardadev.png";
import rendaHero from "@/components/assets/renda.png";

export default function HeroSection() {
  const resumeUrl = "/Eduarda- Curriculo-Full-Stack(6).pdf";

  return (
    <section
      id="hero"
      className="w-full min-h-[100svh] h-auto relative bg-[#FAF8F5] texture-paper flex flex-col justify-between overflow-x-clip px-3.5 sm:px-8 md:px-12 lg:px-16 pt-16 sm:pt-20 lg:pt-22 pb-4 sm:pb-5 scroll-mt-0"
    >
      {/* 1. O Grande Masthead Editorial (Nome em Destaque na Capa) */}
      <div className="w-full pt-1 sm:pt-3 pb-2.5 sm:pb-4 text-center border-b border-[#465B20]/15 select-none">
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 mb-1.5 sm:mb-2 text-[10px] sm:text-xs md:text-sm font-sans font-semibold tracking-[0.16em] sm:tracking-[0.20em] text-[#465B20] uppercase">
          <span>FULL STACK</span>
          <span className="text-[#4E4A45]">•</span>
          <span>BACK-END</span>
          <span className="text-[#4E4A45]">•</span>
          <span>DADOS</span>
          <span className="text-[#4E4A45]">•</span>
          <span>IA APLICADA</span>
        </div>

        <h1
          className="font-serif font-black text-[clamp(1.65rem,6.8vw,4.5rem)] lg:text-7xl xl:text-8xl tracking-tight sm:tracking-[0.05em] lg:tracking-[0.08em] text-[#1C1A18] uppercase leading-none break-words"
          style={{ textWrap: "balance" }}
        >
          Eduarda Silva Santos
        </h1>
      </div>

      {/* 2. Corpo Principal da Capa: Composição com Foto em Moldura de Renda e Bloco Textual */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-10 items-center flex-1 my-auto py-2 sm:py-4">
        {/* Bloco da Foto da Capa com Moldura de Renda: ORDEM 1 NO MOBILE, ORDEM 2 NO DESKTOP */}
        <div className="order-1 lg:order-2 lg:col-span-5 relative flex flex-col justify-center items-center w-full my-1 sm:my-0">
          <div className="relative w-full max-w-[min(84vw,320px)] sm:max-w-[360px] lg:max-w-[420px] aspect-[1122/1402] flex items-center justify-center group select-none">
            {/* Foto de Eduarda ajustada na área interna da renda */}
            <div className="absolute inset-[10%] sm:inset-[10.5%] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#FAF8F5] flex items-center justify-center shadow-inner">
              <img
                src={eduardaPhoto}
                alt="Eduarda Silva Santos, desenvolvedora Full Stack com foco em Back-end, Dados e IA Aplicada"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* A Moldura de Renda Nobre em Overlay */}
            <img
              src={rendaHero}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_12px_28px_rgba(43,41,39,0.22)] z-10"
            />
          </div>

          {/* Assinatura Editorial e Selos na Base da Foto */}
          <div className="w-full max-w-[min(84vw,320px)] sm:max-w-[360px] lg:max-w-[420px] mt-2 sm:mt-2.5 px-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-xs select-none">
            <span
              className="text-2xl sm:text-3xl text-[#465B20] leading-none"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              Eduarda Silva Santos
            </span>
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[9px] sm:text-[11px] font-mono text-[#383531] font-semibold">
              <span>PUCRS</span>
              <span className="text-[#4E4A45]">•</span>
              <span>USP / FDTE</span>
              <span className="text-[#4E4A45]">•</span>
              <span>PUC-Rio</span>
            </div>
          </div>
        </div>

        {/* Bloco Textual: ORDEM 2 NO MOBILE, ORDEM 1 NO DESKTOP */}
        <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-center gap-3 sm:gap-4">
          {/* Headline Principal de Capa (Seção 40 do Guia Mestre) */}
          <div className="flex flex-col">
            <h2
              className="font-serif font-black text-[clamp(1.45rem,4.5vw,2.75rem)] text-[#1C1A18] tracking-tight leading-tight"
              style={{ textWrap: "balance" }}
            >
              Construindo software a partir de{" "}
              <span
                className="text-[clamp(2rem,5.5vw,3.5rem)] text-[#465B20] select-none inline-block font-normal"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                problemas reais
              </span>{" "}
              que merecem ser bem entendidos.
            </h2>
          </div>

          {/* Descrição Profissional Editorial (Seção 39 do Guia Mestre) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#465B20]/20 shadow-2xs">
            <p className="font-sans text-xs sm:text-sm md:text-base text-[#1C1A18] font-normal leading-relaxed mb-3">
              Sou desenvolvedora Full Stack com foco em Back-end, Dados e IA Aplicada.
            </p>
            <p className="font-sans text-xs sm:text-sm md:text-base text-[#383531] font-normal leading-relaxed">
              Transformo necessidades de produto e operação em{" "}
              <strong className="text-[#1C1A18] font-semibold">
                interfaces claras, APIs bem estruturadas, dados organizados e soluções com IA fundamentadas em contexto.
              </strong>
            </p>

            {/* Linha Técnica em Destaque (Seção 39) */}
            <div className="mt-3.5 pt-3 border-t border-[#465B20]/15 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono font-semibold text-[#2A3614]">
              <span className="px-2 py-0.5 rounded-md bg-[#465B20]/10 border border-[#465B20]/25">React</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded-md bg-[#465B20]/10 border border-[#465B20]/25">TypeScript</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded-md bg-[#465B20]/10 border border-[#465B20]/25">Node.js</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded-md bg-[#465B20]/10 border border-[#465B20]/25">PostgreSQL</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded-md bg-[#465B20]/10 border border-[#465B20]/25">Python</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded-md bg-[#465B20]/10 border border-[#465B20]/25">RAG</span>
            </div>
          </div>

          {/* Provas Rápidas da Capa: 4 Cards (Seção 41 do Guia Mestre) */}
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 w-full">
              {/* Card 01 - Full Stack */}
              <div className="p-3 rounded-xl bg-white border border-[#465B20]/20 shadow-2xs flex flex-col justify-between gap-1">
                <div>
                  <div className="flex items-center gap-1.5 text-[#465B20] mb-0.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-mono font-bold tracking-wider uppercase">01</span>
                  </div>
                  <span className="font-serif font-bold text-xs sm:text-sm text-[#1C1A18] block leading-tight">
                    Full Stack
                  </span>
                  <p className="font-sans text-[10px] text-[#4E4A45] leading-snug mt-0.5">
                    Da interface à regra de negócio.
                  </p>
                </div>
                <span className="font-mono text-[9px] text-[#465B20] font-bold tracking-tight">
                  React + TypeScript
                </span>
              </div>

              {/* Card 02 - Back-end */}
              <div className="p-3 rounded-xl bg-white border border-[#465B20]/20 shadow-2xs flex flex-col justify-between gap-1">
                <div>
                  <div className="flex items-center gap-1.5 text-[#465B20] mb-0.5">
                    <Cpu className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-mono font-bold tracking-wider uppercase">02</span>
                  </div>
                  <span className="font-serif font-bold text-xs sm:text-sm text-[#1C1A18] block leading-tight">
                    Back-end
                  </span>
                  <p className="font-sans text-[10px] text-[#4E4A45] leading-snug mt-0.5">
                    APIs preparadas para evoluir.
                  </p>
                </div>
                <span className="font-mono text-[9px] text-[#465B20] font-bold tracking-tight">
                  Node.js + PostgreSQL
                </span>
              </div>

              {/* Card 03 - Dados */}
              <div className="p-3 rounded-xl bg-white border border-[#465B20]/20 shadow-2xs flex flex-col justify-between gap-1">
                <div>
                  <div className="flex items-center gap-1.5 text-[#465B20] mb-0.5">
                    <Database className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-mono font-bold tracking-wider uppercase">03</span>
                  </div>
                  <span className="font-serif font-bold text-xs sm:text-sm text-[#1C1A18] block leading-tight">
                    Dados
                  </span>
                  <p className="font-sans text-[10px] text-[#4E4A45] leading-snug mt-0.5">
                    Informação organizada para apoiar decisões.
                  </p>
                </div>
                <span className="font-mono text-[9px] text-[#465B20] font-bold tracking-tight">
                  Python + SQL
                </span>
              </div>

              {/* Card 04 - IA Aplicada */}
              <div className="p-3 rounded-xl bg-white border border-[#465B20]/20 shadow-2xs flex flex-col justify-between gap-1">
                <div>
                  <div className="flex items-center gap-1.5 text-[#465B20] mb-0.5">
                    <BrainCircuit className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-mono font-bold tracking-wider uppercase">04</span>
                  </div>
                  <span className="font-serif font-bold text-xs sm:text-sm text-[#1C1A18] block leading-tight">
                    IA Aplicada
                  </span>
                  <p className="font-sans text-[10px] text-[#4E4A45] leading-snug mt-0.5">
                    Contexto, recuperação e controle.
                  </p>
                </div>
                <span className="font-mono text-[9px] text-[#465B20] font-bold tracking-tight">
                  RAG + Recuperação Híbrida
                </span>
              </div>
            </div>
          </div>

          {/* Botões de Ação na Capa (Seção 39 do Guia Mestre) */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-2.5 pt-1 w-full sm:w-auto">
            <a
              href="#projetos"
              className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 min-h-[44px] rounded-full bg-[#465B20] hover:bg-[#2A3614] text-[#F7F6F2] font-sans font-semibold text-xs uppercase tracking-[0.12em] sm:tracking-[0.14em] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98"
            >
              Conhecer meus projetos <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="#metodo"
              className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 min-h-[44px] rounded-full border border-[#465B20]/40 bg-white hover:bg-[#FAF8F5] text-[#1C1A18] font-sans font-semibold text-xs uppercase tracking-[0.10em] sm:tracking-[0.12em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
            >
              Ver como eu trabalho
            </a>

            <a
              href={resumeUrl}
              download="Eduarda- Curriculo-Full-Stack(6).pdf"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 sm:py-3 min-h-[44px] rounded-full border border-[#465B20]/35 text-[#383531] hover:text-[#1C1A18] hover:border-[#465B20]/60 bg-white hover:bg-[#FAF8F5] transition-all flex items-center justify-center gap-1.5 text-xs font-sans font-medium cursor-pointer shadow-xs active:scale-98"
              title="Baixar currículo em PDF"
            >
              <Download className="w-3.5 h-3.5 text-[#465B20]" /> Baixar currículo
            </a>
          </div>
        </div>
      </div>

      {/* 3. Rodapé da Capa Editorial (PORTFÓLIO • EDIÇÃO 2026) */}
      <div className="w-full pt-2.5 sm:pt-3 border-t border-[#465B20]/20 flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-[#4E4A45] select-none">
        <div className="flex items-center gap-2.5">
          <div className="flex items-end gap-[2px] h-5 px-1.5 py-0.5 bg-white border border-[#465B20]/20 rounded shadow-2xs">
            {[3, 6, 2, 8, 4, 7, 3, 5, 8, 2, 6, 4, 7, 3, 8, 5].map((h, i) => (
              <span
                key={i}
                className="w-[1.5px] bg-[#2A3614] rounded-xs"
                style={{ height: `${h * 2}px` }}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] sm:text-xs text-[#2A3614] font-bold tracking-wider">
            PORTFÓLIO • EDIÇÃO 2026
          </span>
        </div>

        <a
          href="#sobre"
          className="inline-flex items-center gap-1.5 text-[11px] font-sans font-semibold text-[#465B20] hover:text-[#2A3614] transition-colors"
        >
          <span>Continuar explorando</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </section>
  );
}
