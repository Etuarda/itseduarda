import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Layers,
  Cpu,
  BarChart3,
  AlertCircle,
  HelpCircle,
  Lightbulb,
  BookOpen,
  Info,
  Mail,
  Code2,
} from "lucide-react";
import type { Project } from "@/types/portfolio";
import ProjectArtwork from "@/components/ui/ProjectArtwork";

type ProjectModalProps = {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const caseStudy = project.caseStudy;
  const hasDemo = Boolean(project.demoUrl && project.demoUrl !== "#");
  const hasGithub = Boolean(project.githubUrl && project.githubUrl !== "#");

  const handleContactNavigate = () => {
    onClose();
    setTimeout(() => {
      const contactEl = document.getElementById("contato");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6">
          {/* Backdrop Transparente Suave */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#2B2927]/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Card com Animação Editorial */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[92dvh] sm:max-h-[90dvh] bg-[#F7F6F2] border-t sm:border-2 border-[#465B20]/40 shadow-[0_25px_60px_-15px_rgba(28,26,24,0.35)] flex flex-col overflow-hidden z-10"
          >
            {/* Top Bar Editorial (Seção 53 & 54 do Guia Mestre) */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-[#465B20]/20 bg-[#FAF8F5] shrink-0">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <span className="font-mono text-xs uppercase tracking-[0.20em] text-[#465B20] font-bold">
                  ESTUDO DE CASO
                </span>
                <span className="text-[#4E4A45] text-xs">•</span>
                <span className="text-[10px] uppercase tracking-[0.14em] text-[#383531] font-semibold font-sans">
                  {project.categoryLabel || project.category.toUpperCase()}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 min-w-[36px] min-h-[36px] border border-[#465B20]/30 text-[#383531] hover:text-[#1C1A18] hover:border-[#465B20]/60 flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Corpo com Scroll Isolado */}
            <div className="overflow-y-auto p-4 sm:p-6 md:p-8 flex flex-col gap-5 sm:gap-6 no-scrollbar">
              {/* Cabeçalho do Projeto */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 bg-[#465B20]/15 text-[#2A3614] border border-[#465B20]/25">
                    {project.categoryLabel || project.category.toUpperCase()}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 bg-white border border-[#465B20]/25 text-[#2A3614] font-semibold shadow-2xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h3
                  id="modal-title"
                  className="text-3xl sm:text-5xl md:text-6xl text-[#1C1A18] tracking-tight mt-1 leading-none select-none drop-shadow-2xs"
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                >
                  {project.title}
                </h3>
                {project.headline && (
                  <p className="font-sans text-xs sm:text-sm text-[#465B20] font-semibold mt-1">
                    {project.headline}
                  </p>
                )}
                {project.subtitle && !project.headline && (
                  <p className="font-sans italic text-xs sm:text-sm text-[#465B20] font-semibold mt-1">
                    {project.subtitle}
                  </p>
                )}
                <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed mt-1 font-normal">
                  {project.longDescription}
                </p>
              </div>

              {/* Preview Visual Representativo - Prancha Emoldurada */}
              <div className="relative w-full h-52 sm:h-64 overflow-hidden border border-[#465B20]/25 shadow-xs bg-[#FAF8F5]">
                <ProjectArtwork projectId={project.id} category={project.category} variant="modal" />
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-[#2A3614] text-xs font-sans px-3 py-1.5 bg-white/95 backdrop-blur-md border border-[#465B20]/25 shadow-2xs">
                  <span className="font-serif font-bold text-sm text-[#465B20]">
                    Arquitetura em Produção
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#465B20]">
                    Eduarda Silva Santos
                  </span>
                </div>
              </div>

              {/* Deep Dive: Estrutura SPIN (Seções 53 & 54 do Guia Mestre) */}
              {caseStudy && (
                <div className="flex flex-col gap-4">
                  {/* Grid 1: Contexto & Problema */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 01. Contexto */}
                    <div className="border border-[#465B20]/25 bg-[#FAF8F5]/80 p-4 sm:p-5 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[#465B20]">
                        <Layers className="w-4 h-4 text-[#465B20]" />
                        <h4 className="font-serif font-bold text-sm sm:text-base text-[#1C1A18]">
                          Contexto
                        </h4>
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed font-normal">
                        {caseStudy.situation || caseStudy.context}
                      </p>
                    </div>

                    {/* 02. Problema */}
                    <div className="border border-[#465B20]/25 bg-[#FAF8F5]/80 p-4 sm:p-5 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[#465B20]">
                        <AlertCircle className="w-4 h-4 text-[#465B20]" />
                        <h4 className="font-serif font-bold text-sm sm:text-base text-[#1C1A18]">
                          Problema
                        </h4>
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed font-normal">
                        {caseStudy.problem}
                      </p>
                    </div>
                  </div>

                  {/* Grid 2: Por que isso importava & Solução */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 03. Por que isso importava */}
                    {caseStudy.implication && (
                      <div className="border border-[#465B20]/25 bg-[#F4F1EA]/80 p-4 sm:p-5 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-[#465B20]">
                          <HelpCircle className="w-4 h-4 text-[#465B20]" />
                          <h4 className="font-serif font-bold text-sm sm:text-base text-[#1C1A18]">
                            Por que isso importava
                          </h4>
                        </div>
                        <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed font-normal">
                          {caseStudy.implication}
                        </p>
                      </div>
                    )}

                    {/* 04. Solução */}
                    <div className={`border border-[#465B20]/25 bg-[#FAF8F5]/80 p-4 sm:p-5 flex flex-col gap-2 ${caseStudy.implication ? "" : "md:col-span-2"}`}>
                      <div className="flex items-center gap-2 text-[#465B20]">
                        <Cpu className="w-4 h-4 text-[#465B20]" />
                        <h4 className="font-serif font-bold text-sm sm:text-base text-[#1C1A18]">
                          Solução
                        </h4>
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed font-normal">
                        {caseStudy.solution}
                      </p>
                    </div>
                  </div>

                  {/* 05. Decisão técnica */}
                  {caseStudy.technicalDecision && (
                    <div className="p-4 sm:p-5 bg-[#465B20]/10 border-l-3 border-l-[#465B20] border-y border-r border-[#465B20]/25 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[#2A3614]">
                        <Lightbulb className="w-4 h-4 text-[#465B20]" />
                        <span className="font-mono text-xs uppercase tracking-wider text-[#2A3614] font-bold">
                          Decisão técnica
                        </span>
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-[#1C1A18] font-medium leading-relaxed">
                        {caseStudy.technicalDecision}
                      </p>
                    </div>
                  )}

                  {/* 06. Arquitetura */}
                  <div className="border border-[#465B20]/25 bg-[#FAF8F5] p-5 sm:p-6 flex flex-col gap-3">
                    <div className="flex items-center justify-between border-b border-[#465B20]/20 pb-2">
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#1C1A18] flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#465B20]" />
                        Arquitetura
                      </h4>
                      <span className="font-mono text-xs text-[#465B20] font-semibold">
                        Decisões estruturais
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {(caseStudy.architecture || project.features).map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs font-sans text-[#1C1A18] p-2.5 bg-white border border-[#465B20]/20 shadow-2xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#465B20] shrink-0 mt-0.5" />
                          <span className="font-normal">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 07. Evidências */}
                  {(caseStudy.evidence || caseStudy.metrics) && (
                    <div className="p-4 sm:p-5 bg-white border border-[#465B20]/25 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <div className="w-9 h-9 bg-[#465B20]/15 flex items-center justify-center shrink-0 text-[#465B20]">
                        <BarChart3 className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-mono text-xs uppercase tracking-wider text-[#2A3614] font-bold block">
                          Evidências & Métricas
                        </span>
                        <p className="font-sans text-xs sm:text-sm text-[#383531] font-semibold mt-0.5">
                          {caseStudy.evidence || caseStudy.metrics}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 08. Aprendizados */}
                  {caseStudy.learning && (
                    <div className="p-4 sm:p-5 bg-[#FAF8F5] flex flex-col gap-2 border-l-3 border-l-[#465B20] border-y border-r border-[#465B20]/20">
                      <div className="flex items-center gap-2 text-[#465B20]">
                        <BookOpen className="w-4 h-4 text-[#465B20]" />
                        <h4 className="font-serif font-bold text-xs sm:text-sm uppercase tracking-wider text-[#1C1A18]">
                          Aprendizados
                        </h4>
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed font-normal italic">
                        "{caseStudy.learning}"
                      </p>
                    </div>
                  )}

                  {/* 09. Tecnologias (Seção 54) */}
                  <div className="p-4 bg-[#FAF8F5] border border-[#465B20]/20 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[#465B20]">
                      <Code2 className="w-4 h-4" />
                      <span className="font-mono text-xs uppercase tracking-wider text-[#1C1A18] font-bold">
                        Tecnologias
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono px-2.5 py-1 bg-white border border-[#465B20]/25 text-[#2A3614] font-semibold shadow-2xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Avisos de Estado Vazio para Demo / Repositório */}
              {(!hasDemo || !hasGithub) && (
                <div className="flex flex-col gap-3 pt-2">
                  {!hasDemo && (
                    <div className="p-3.5 sm:p-4 bg-[#F0EFEA] border border-[#465B20]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <Info className="w-4 h-4 text-[#465B20] shrink-0 mt-0.5" />
                        <p className="font-sans text-xs text-[#383531] leading-relaxed">
                          Aplicação em ambiente de testes ou restrita a ambiente corporativo. Solicite uma demonstração.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleContactNavigate}
                        className="text-xs font-mono font-bold text-[#465B20] hover:text-[#2A3614] underline underline-offset-2 shrink-0 cursor-pointer"
                      >
                        Solicitar demonstração →
                      </button>
                    </div>
                  )}

                  {!hasGithub && (
                    <div className="p-3.5 sm:p-4 bg-[#F0EFEA] border border-[#465B20]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <Info className="w-4 h-4 text-[#465B20] shrink-0 mt-0.5" />
                        <p className="font-sans text-xs text-[#383531] leading-relaxed">
                          Repositório com código proprietário ou sob confidencialidade. Entre em contato para ver trechos de código ou arquitetura.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleContactNavigate}
                        className="text-xs font-mono font-bold text-[#465B20] hover:text-[#2A3614] underline underline-offset-2 shrink-0 cursor-pointer"
                      >
                        Conversar sobre este projeto →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 10. Rodapé de Ações / CTA (Seções 54 & 92 do Guia Mestre) */}
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 pb-[calc(1.2rem+env(safe-area-inset-bottom))] sm:pb-4 border-t border-[#465B20]/20 bg-[#FAF8F5] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <span className="font-sans text-[11px] text-[#4E4A45] font-medium text-center sm:text-left">
                Código-fonte e arquitetura desenvolvidos por Eduarda Silva Santos
              </span>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
                {hasGithub && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] border border-[#465B20]/35 bg-white text-[#1C1A18] hover:bg-[#1C1A18] hover:text-[#F7F6F2] transition-all text-xs font-sans font-semibold cursor-pointer shadow-xs active:scale-98"
                  >
                    <Github className="w-3.5 h-3.5" /> Ver código no GitHub
                  </a>
                )}

                {hasDemo && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] bg-[#465B20] text-[#F7F6F2] hover:bg-[#2A3614] transition-all text-xs font-sans font-semibold cursor-pointer shadow-xs active:scale-98"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Acessar aplicação
                  </a>
                )}

                {!hasDemo && !hasGithub && (
                  <button
                    type="button"
                    onClick={handleContactNavigate}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] bg-[#465B20] text-[#F7F6F2] hover:bg-[#2A3614] transition-all text-xs font-sans font-semibold cursor-pointer shadow-xs active:scale-98"
                  >
                    <Mail className="w-3.5 h-3.5" /> Conversar sobre este projeto
                  </button>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center px-4 py-2.5 min-h-[44px] border border-[#465B20]/30 text-[#383531] hover:text-[#1C1A18] hover:border-[#465B20]/60 transition-all text-xs font-sans font-medium cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
