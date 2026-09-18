import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, BarChart3, AlertCircle } from "lucide-react";
import type { Project } from "@/types/portfolio";

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

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const caseStudy = project.caseStudy;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
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

          {/* Modal Card com Animação de Escala 95 -> 100 */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#F7F6F2] border border-[#465B20]/35 rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(28,26,24,0.35)] flex flex-col overflow-hidden z-10"
          >
            {/* Top Bar Editorial */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#465B20]/20 bg-[#FAF8F5]">
              <div className="flex items-center gap-2.5">
                <span className="font-handwriting text-xl text-[#465B20] font-bold">
                  Dossiê Arquitetural
                </span>
                <span className="text-[#4E4A45] text-xs">✦</span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#383531] font-bold font-sans">
                  Estudo de Caso Técnico
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-[#465B20]/30 text-[#383531] hover:text-[#1C1A18] hover:border-[#465B20]/60 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Fechar modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Corpo com Scroll Isolado */}
            <div className="overflow-y-auto p-6 sm:p-8 flex flex-col gap-6 no-scrollbar">
              {/* Cabeçalho do Projeto */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#465B20]/15 text-[#2A3614] border border-[#465B20]/25">
                    {project.category.toUpperCase()}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white border border-[#465B20]/25 text-[#2A3614] font-semibold shadow-2xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 id="modal-title" className="font-serif font-black text-2xl sm:text-4xl text-[#1C1A18] tracking-tight mt-1">
                  {project.title}
                </h3>
                {project.subtitle && (
                  <p className="font-sans italic text-sm text-[#465B20] font-semibold">
                    {project.subtitle}
                  </p>
                )}
                <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed mt-1 font-normal">
                  {project.longDescription}
                </p>
              </div>

              {/* Preview Visual */}
              <div className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden border border-[#556B2F]/20 shadow-xs">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2927]/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-white text-xs font-sans">
                  <span className="font-handwriting text-lg drop-shadow">
                    Arquitetura em Produção
                  </span>
                  <span className="text-[11px] opacity-90 drop-shadow">
                    Eduarda Silva Santos
                  </span>
                </div>
              </div>

              {/* Deep Dive: Contexto, Desafio, Solução */}
              {caseStudy && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Contexto & Motivação */}
                  <div className="botanical-card p-5 rounded-2xl flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[#465B20]">
                      <Layers className="w-4 h-4 text-[#465B20]" />
                      <h4 className="font-serif font-bold text-base text-[#1C1A18]">
                        01. Contexto & Motivação
                      </h4>
                    </div>
                    <p className="font-sans text-xs text-[#383531] leading-relaxed font-normal">
                      {caseStudy.context}
                    </p>
                  </div>

                  {/* O Desafio de Engenharia */}
                  <div className="botanical-card p-5 rounded-2xl flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[#465B20]">
                      <AlertCircle className="w-4 h-4 text-[#465B20]" />
                      <h4 className="font-serif font-bold text-base text-[#1C1A18]">
                        02. O Desafio Técnico
                      </h4>
                    </div>
                    <p className="font-sans text-xs text-[#383531] leading-relaxed font-normal">
                      {caseStudy.problem}
                    </p>
                  </div>

                  {/* Solução Implementada */}
                  <div className="botanical-card p-5 rounded-2xl flex flex-col gap-2 md:col-span-2">
                    <div className="flex items-center gap-2 text-[#465B20]">
                      <Cpu className="w-4 h-4 text-[#465B20]" />
                      <h4 className="font-serif font-bold text-base text-[#1C1A18]">
                        03. Solução Arquitetural
                      </h4>
                    </div>
                    <p className="font-sans text-xs text-[#383531] leading-relaxed font-normal">
                      {caseStudy.solution}
                    </p>
                  </div>
                </div>
              )}

              {/* Decisões de Arquitetura & Código */}
              <div className="botanical-card p-5 sm:p-6 rounded-2xl flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-[#465B20]/20 pb-2">
                  <h4 className="font-serif font-bold text-base text-[#1C1A18] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#465B20]" />
                    Decisões Chave de Arquitetura
                  </h4>
                  <span className="font-handwriting text-base text-[#465B20] font-semibold">
                    Clean Code & Robustez
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(caseStudy?.architecture || project.features).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs font-sans text-[#1C1A18] p-2.5 rounded-lg bg-white border border-[#465B20]/20 shadow-2xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#465B20] shrink-0 mt-0.5" />
                      <span className="font-normal">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Métricas de Impacto */}
              {caseStudy?.metrics && (
                <div className="p-4 rounded-xl bg-[#465B20]/15 border border-[#465B20]/30 flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-[#465B20] shrink-0" />
                  <div>
                    <span className="font-serif font-bold text-xs text-[#2A3614] block">
                      Resultado & Eficiência Aferida:
                    </span>
                    <p className="font-sans text-xs text-[#383531] font-semibold">
                      {caseStudy.metrics}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Rodapé de Ações com Links Diretos */}
            <div className="px-6 py-4 border-t border-[#465B20]/20 bg-[#FAF8F5] flex flex-wrap items-center justify-between gap-3">
              <span className="font-sans text-[11px] text-[#4E4A45] font-medium">
                Código-fonte e arquitetura desenvolvidos por Eduarda Silva Santos
              </span>

              <div className="flex items-center gap-2.5">
                {project.githubUrl && project.githubUrl !== "#" && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#465B20]/35 bg-white text-[#1C1A18] hover:bg-[#1C1A18] hover:text-[#F7F6F2] transition-all text-xs font-sans font-semibold cursor-pointer shadow-xs"
                  >
                    <Github className="w-3.5 h-3.5" /> Ver no GitHub
                  </a>
                )}

                {project.demoUrl && project.demoUrl !== "#" && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#465B20] text-[#F7F6F2] hover:bg-[#2A3614] transition-all text-xs font-sans font-semibold cursor-pointer shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Acessar Aplicação
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

