import React, { useState, useEffect, useRef, useCallback } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { projectsContent } from "@/content/projects";
import type { ProjectCase } from "@/types/content";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  X,
} from "lucide-react";

export default function MosaicProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectCase | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const totalProjects = projectsContent.length;
  const currentProject = projectsContent[currentIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalProjects);
  }, [totalProjects]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  }, [totalProjects]);

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedCaseStudy) {
        if (e.key === "Escape") setSelectedCaseStudy(null);
        return;
      }
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, selectedCaseStudy]);

  // Gestos touch para Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  return (
    <section
      id="projetos"
      aria-label="Projetos e Estudos de Caso de Engenharia"
      className="w-full py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto scroll-mt-20 relative select-text"
    >
      {/* 1. Título Editorial Puro (Sem fundo de texto, sem traços ----) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
        <SectionTitle
          index="03"
          title="Projetos"
          scriptAccent="estudos de caso"
          align="left"
          subtitle="Aplicações completas com decisões arquiteturais documentadas, contratos verificáveis e código em produção."
        />

        {/* Controles de Navegação Rápidos (Desktop & Mobile) */}
        <div className="flex items-center gap-3 shrink-0 self-start sm:self-end">
          <button
            onClick={handlePrev}
            aria-label="Projeto anterior"
            className="w-11 h-11 border border-[#465B20]/30 hover:border-[#465B20] hover:bg-[#465B20] hover:text-[#FAF8F5] transition-all flex items-center justify-center cursor-pointer text-[#1C1A18] active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="font-mono text-xs font-bold text-[#465B20] tracking-widest px-2">
            0{currentIndex + 1} / 0{totalProjects}
          </span>

          <button
            onClick={handleNext}
            aria-label="Próximo projeto"
            className="w-11 h-11 border border-[#465B20]/30 hover:border-[#465B20] hover:bg-[#465B20] hover:text-[#FAF8F5] transition-all flex items-center justify-center cursor-pointer text-[#1C1A18] active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. Prancha de Projeto em Foco (Composição Editorial com Capa em Alta Resolução) */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#FAF8F5]/85 border border-[#465B20]/25 p-6 sm:p-8 md:p-10 shadow-xs transition-all duration-500"
      >
        {/* COLUNA ESQUERDA: CAPA VISUAL EM ALTA RESOLUÇÃO (6 cols) */}
        <div className="lg:col-span-6 relative group overflow-hidden border border-[#465B20]/20 bg-[#1C1A18]/5">
          <img
            src={currentProject.coverImage}
            alt={`Capa do projeto ${currentProject.title}`}
            loading="eager"
            className="w-full h-auto aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-102"
          />

          <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-wider text-[#FAF8F5] bg-[#1C1A18]/80 px-2.5 py-1">
            {currentProject.categoryLabel}
          </div>
        </div>

        {/* COLUNA DIREITA: PERSUASÃO TÉCNICA E DECISÕES ARQUITETURAIS (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs uppercase tracking-widest text-[#465B20] font-bold">
              {currentProject.subtitle}
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1C1A18] tracking-tight">
              {currentProject.title}
            </h3>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#1C1A18] leading-relaxed font-medium">
            {currentProject.headline}
          </p>

          <p className="font-sans text-xs sm:text-sm text-[#4E4A45] leading-relaxed">
            <strong className="text-[#1C1A18] font-semibold">Problema resolvido: </strong>
            {currentProject.problem}
          </p>

          {/* Decisões Técnicas Principais */}
          <div className="flex flex-col gap-2 pt-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#465B20] font-bold">
              Decisões de Engenharia:
            </span>
            <ul className="flex flex-col gap-1.5 font-sans text-xs text-[#383531]">
              {currentProject.decisions.slice(0, 3).map((dec, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#465B20] mt-0.5">•</span>
                  <span>{dec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tecnologias Utilizadas */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {currentProject.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] uppercase px-2 py-0.5 border border-[#465B20]/25 text-[#2A3614] bg-white/70"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Ações de Conversão & Estudo de Caso */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => setSelectedCaseStudy(currentProject)}
              className="px-5 py-2.5 bg-[#465B20] hover:bg-[#1E2713] text-[#FAF8F5] font-sans font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-98"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Ver Estudo de Caso</span>
            </button>

            {currentProject.links.demo && (
              <a
                href={currentProject.links.demo}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 border border-[#465B20]/30 hover:border-[#465B20] bg-white hover:bg-[#FAF8F5] text-[#1C1A18] font-sans font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-98"
              >
                <span>Acessar Produto</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#465B20]" />
              </a>
            )}

            {currentProject.links.github && (
              <a
                href={currentProject.links.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 border border-[#465B20]/30 hover:border-[#465B20] bg-white hover:bg-[#FAF8F5] text-[#1C1A18] transition-all flex items-center justify-center cursor-pointer shadow-2xs active:scale-98"
                title="Ver código no GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 3. Indicadores de Projetos (Clique Direto) */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {projectsContent.map((proj, idx) => (
          <button
            key={proj.id}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Ir para projeto ${proj.title}`}
            className={`transition-all duration-300 ${
              idx === currentIndex
                ? "w-8 h-2 bg-[#465B20]"
                : "w-2 h-2 bg-[#465B20]/25 hover:bg-[#465B20]/50"
            }`}
          />
        ))}
      </div>

      {/* 4. MODAL / PRANCHA PROFUNDA DE ESTUDO DE CASO */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1C1A18]/60 backdrop-blur-xs">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#FAF8F5] border-2 border-[#465B20] p-6 sm:p-8 md:p-10 overflow-y-auto shadow-2xl flex flex-col gap-6">
            
            {/* Header do Estudo de Caso */}
            <div className="flex items-start justify-between gap-4 border-b border-[#465B20]/20 pb-4">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs uppercase tracking-widest text-[#465B20] font-bold">
                  Estudo de Caso Monográfico • {selectedCaseStudy.categoryLabel}
                </span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1C1A18]">
                  {selectedCaseStudy.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedCaseStudy(null)}
                aria-label="Fechar estudo de caso"
                className="p-2 border border-[#465B20]/30 hover:border-[#465B20] hover:bg-[#465B20] hover:text-[#FAF8F5] transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conteúdo Técnico Completo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 font-sans text-xs sm:text-sm text-[#383531] leading-relaxed">
              
              <div className="flex flex-col gap-4">
                <div>
                  <h4 className="font-mono text-xs uppercase font-bold text-[#465B20] mb-1">
                    01. Contexto & Situação
                  </h4>
                  <p>{selectedCaseStudy.caseStudy?.situation || selectedCaseStudy.problem}</p>
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase font-bold text-[#465B20] mb-1">
                    02. O Problema de Negócio
                  </h4>
                  <p>{selectedCaseStudy.caseStudy?.problem || selectedCaseStudy.problem}</p>
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase font-bold text-[#465B20] mb-1">
                    03. Decisão Técnica de Arquitetura
                  </h4>
                  <p>{selectedCaseStudy.caseStudy?.technicalDecision || selectedCaseStudy.decisions.join("; ")}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <h4 className="font-mono text-xs uppercase font-bold text-[#465B20] mb-1">
                    04. Arquitetura da Solução
                  </h4>
                  <ul className="flex flex-col gap-1 list-disc list-inside">
                    {selectedCaseStudy.caseStudy?.architecture.map((arch, i) => (
                      <li key={i}>{arch}</li>
                    )) || selectedCaseStudy.decisions.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase font-bold text-[#465B20] mb-1">
                    05. Evidência & Aprendizado
                  </h4>
                  <p>{selectedCaseStudy.caseStudy?.learning || selectedCaseStudy.evidence.join("; ")}</p>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  {selectedCaseStudy.links.demo && (
                    <a
                      href={selectedCaseStudy.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-[#465B20] hover:bg-[#1E2713] text-[#FAF8F5] font-mono text-xs uppercase font-bold flex items-center gap-1.5"
                    >
                      <span>Deploy do Projeto</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {selectedCaseStudy.links.github && (
                    <a
                      href={selectedCaseStudy.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 border border-[#465B20]/40 hover:border-[#465B20] text-[#1C1A18] font-mono text-xs uppercase font-bold flex items-center gap-1.5"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Ver Repositório</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
