import React, { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { experiencesContent } from "@/content/experience";
import type { ExperienceLane, ExperienceItem } from "@/types/content";
import { Briefcase, FolderGit2, Sparkles, CheckCircle2 } from "lucide-react";

const LANES: { id: ExperienceLane; title: string; subtitle: string; icon: React.ElementType }[] = [
  {
    id: "work",
    title: "Atuação Corporativa",
    subtitle: "Rotina operacional, governança e contato direto com pessoas",
    icon: Briefcase,
  },
  {
    id: "projects",
    title: "Engenharia de Software",
    subtitle: "Concepção, arquitetura e entrega de produtos digitais",
    icon: FolderGit2,
  },
  {
    id: "data-ai",
    title: "Especialização em Dados & IA",
    subtitle: "Residências imersivas em pipelines RAG e analytics",
    icon: Sparkles,
  },
];

export default function ExperienceTimeline() {
  const [activeLaneFilter, setActiveLaneFilter] = useState<ExperienceLane | "all">("all");

  const filteredExperiences = experiencesContent.filter((exp) =>
    activeLaneFilter === "all" ? true : exp.lane === activeLaneFilter
  );

  return (
    <section
      id="experiencia"
      aria-label="Trajetória e Experiência Profissional"
      className="w-full py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto scroll-mt-20 relative select-text"
    >
      {/* 1. Título Editorial Puro (Sem caixa de fundo, sem traços ----) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
        <SectionTitle
          index="04"
          title="Experiência"
          scriptAccent="trajetória técnica"
          align="left"
          subtitle="Atuação estruturada em 3 raias complementares: da vivência operacional à engenharia de software e pesquisa aplicada em IA."
        />

        {/* Filtro Rápido de Raias */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-end">
          <button
            onClick={() => setActiveLaneFilter("all")}
            className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-all border ${
              activeLaneFilter === "all"
                ? "bg-[#465B20] text-[#FAF8F5] border-[#465B20]"
                : "bg-transparent text-[#4E4A45] border-[#465B20]/25 hover:border-[#465B20]"
            }`}
          >
            Todas as Raias
          </button>
          {LANES.map((lane) => (
            <button
              key={lane.id}
              onClick={() => setActiveLaneFilter(lane.id)}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-all border ${
                activeLaneFilter === lane.id
                  ? "bg-[#465B20] text-[#FAF8F5] border-[#465B20]"
                  : "bg-transparent text-[#4E4A45] border-[#465B20]/25 hover:border-[#465B20]"
              }`}
            >
              {lane.title.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Grid de Experiências em Pranchas Editoriais (Sem cards genéricos arredondados) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {filteredExperiences.map((item) => {
          const laneMeta = LANES.find((l) => l.id === item.lane);
          const Icon = laneMeta?.icon || Briefcase;

          return (
            <article
              key={item.id}
              className="p-6 sm:p-7 bg-[#FAF8F5]/85 border border-[#465B20]/25 shadow-xs flex flex-col justify-between gap-6 hover:border-[#465B20]/50 transition-all duration-300"
            >
              <div className="flex flex-col gap-4">
                {/* Metadados da Raia e Período */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[#465B20]">
                    <Icon className="w-3.5 h-3.5" />
                    <span className="font-mono text-[10px] uppercase tracking-widest font-bold">
                      {laneMeta?.title}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#1C1A18]">
                    {item.period}
                  </span>
                </div>

                {/* Cargo e Empresa */}
                <div className="flex flex-col gap-0.5">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1C1A18] leading-tight">
                    {item.role}
                  </h3>
                  <span className="font-mono text-xs text-[#465B20] font-semibold">
                    {item.company}
                  </span>
                </div>

                {/* Nota Síntese em Itálico Editorial */}
                {item.note && (
                  <p className="font-serif italic text-xs sm:text-sm text-[#4E4A45] border-l-2 border-[#465B20]/40 pl-3">
                    “{item.note}”
                  </p>
                )}

                {/* Descrição Narrativa */}
                <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed">
                  {item.description}
                </p>

                {/* Realizações / Evidências */}
                <div className="flex flex-col gap-2 pt-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#465B20] font-bold">
                    Entregas e Responsabilidades:
                  </span>
                  <ul className="flex flex-col gap-1.5 font-sans text-xs text-[#4E4A45]">
                    {item.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#465B20] mt-0.5">•</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Status de Verificação */}
              <div className="pt-4 border-t border-[#465B20]/15 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#4E4A45]">
                  Percurso Verificado
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-[#465B20] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Documentado</span>
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
