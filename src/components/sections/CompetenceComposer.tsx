import React, { useState, useMemo } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { domainsMetadata, skillsContent, type DomainMetadata } from "@/content/skills";
import { projectsContent } from "@/content/projects";
import type { Domain, SkillItem } from "@/types/content";
import {
  Server,
  Layout,
  Database,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Layers,
  Code2,
} from "lucide-react";

const DOMAIN_ICONS: Record<Domain, React.ElementType> = {
  backend: Server,
  frontend: Layout,
  data: Database,
  ai: Sparkles,
};

export default function CompetenceComposer() {
  const [activeDomain, setActiveDomain] = useState<Domain>("backend");
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>("nodejs");

  // Filtra as competências do domínio ativo
  const currentSkills = useMemo(() => {
    return skillsContent.filter((s) => s.domain === activeDomain);
  }, [activeDomain]);

  // Competência selecionada atualmente (ou a primeira do domínio)
  const activeSkill = useMemo(() => {
    return (
      skillsContent.find((s) => s.id === selectedSkillId) ||
      currentSkills[0] ||
      skillsContent[0]
    );
  }, [selectedSkillId, currentSkills]);

  // Projetos onde a competência ativa foi comprovadamente aplicada
  const appliedProjects = useMemo(() => {
    if (!activeSkill) return [];
    return projectsContent.filter((p) => activeSkill.projectIds.includes(p.id));
  }, [activeSkill]);

  const currentDomainMeta = domainsMetadata[activeDomain];

  return (
    <section
      id="competencias"
      aria-label="Competências Técnicas e Pilares de Engenharia"
      className="w-full py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto scroll-mt-20 relative select-text"
    >
      {/* 1. Título Editorial Limpo */}
      <div className="mb-12 sm:mb-16">
        <SectionTitle
          index="02"
          title="Competências"
          scriptAccent="pilares técnicos"
          align="left"
          subtitle="Back-end como pilar estrutural seguro, integrado organicamente a interfaces reativas, inteligência analítica e sistemas RAG ancorados."
        />
      </div>

      {/* 2. Seletor de Domínios em Abas Editoriais (Acessível, sem cards genéricos) */}
      <div
        role="tablist"
        aria-label="Domínios de competência"
        className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-10 sm:mb-12"
      >
        {(["backend", "frontend", "data", "ai"] as Domain[]).map((domId) => {
          const meta = domainsMetadata[domId];
          const Icon = DOMAIN_ICONS[domId];
          const isActive = activeDomain === domId;

          return (
            <button
              key={domId}
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setActiveDomain(domId);
                const first = skillsContent.find((s) => s.domain === domId);
                if (first) setSelectedSkillId(first.id);
              }}
              className={`text-left p-3.5 sm:p-4 transition-all duration-300 border ${
                isActive
                  ? "bg-[#FAF8F5] border-[#465B20] text-[#1C1A18] shadow-xs"
                  : "bg-transparent border-[#465B20]/20 text-[#4E4A45] hover:border-[#465B20]/45 hover:text-[#1C1A18]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] sm:text-xs font-bold text-[#465B20]">
                  {meta.number}
                </span>
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-[#465B20]" : "text-[#4E4A45]/60"
                  }`}
                />
              </div>
              <h3 className="font-serif font-bold text-sm sm:text-base leading-tight">
                {meta.title}
              </h3>
              {domId === "backend" && (
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#465B20] font-bold block mt-1">
                  Eixo Central
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Painel Principal: Detalhamento do Domínio & Interação com Projetos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
        
        {/* COLUNA ESQUERDA: LISTA DE COMPETÊNCIAS DO DOMÍNIO (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-xs uppercase tracking-widest text-[#465B20] font-bold">
              {currentDomainMeta.tagline}
            </span>
            <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed">
              {currentDomainMeta.description}
            </p>
          </div>

          {/* Lista de Competências Interativas */}
          <div className="flex flex-col border-t border-[#465B20]/20">
            {currentSkills.map((skill) => {
              const isSelected = skill.id === activeSkill?.id;

              return (
                <button
                  key={skill.id}
                  onClick={() => setSelectedSkillId(skill.id)}
                  className={`text-left py-3.5 px-3 border-b border-[#465B20]/15 transition-all flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 ${
                    isSelected
                      ? "bg-[#465B20]/10 pl-4 border-l-2 border-l-[#465B20]"
                      : "hover:bg-[#465B20]/5"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? "bg-[#465B20]" : "bg-[#465B20]/40"
                      }`}
                    />
                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#1C1A18]">
                      {skill.label}
                    </h4>
                  </div>
                  <span className="font-mono text-[11px] text-[#4E4A45] sm:text-right shrink-0">
                    {skill.projectIds.length} {skill.projectIds.length === 1 ? "projeto" : "projetos"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* COLUNA DIREITA: EVIDÊNCIA DE APLICAÇÃO EM PROJETOS (5 cols) */}
        <div className="lg:col-span-5 p-5 sm:p-6 bg-[#FAF8F5]/90 border border-[#465B20]/30 shadow-xs flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#465B20] font-bold">
              Evidência de Aplicação
            </span>
            <h4 className="font-serif font-bold text-xl text-[#1C1A18]">
              {activeSkill.label}
            </h4>
            <p className="font-sans text-xs sm:text-sm text-[#4E4A45] leading-relaxed mt-1">
              {activeSkill.context}
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#1C1A18] font-bold">
              Onde esta competência foi aplicada:
            </span>

            {appliedProjects.length > 0 ? (
              appliedProjects.map((proj) => (
                <a
                  key={proj.id}
                  href={`#projetos`}
                  className="p-3 border border-[#465B20]/20 bg-white hover:border-[#465B20] hover:bg-[#FAF8F5] transition-all flex items-start justify-between gap-3 group"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-serif font-bold text-sm text-[#1C1A18] group-hover:text-[#465B20] transition-colors">
                      {proj.title}
                    </span>
                    <span className="font-sans text-xs text-[#4E4A45] line-clamp-1">
                      {proj.headline}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#465B20] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ))
            ) : (
              <p className="font-sans text-xs text-[#4E4A45] italic">
                Competência aplicada em bases acadêmicas e especializações em andamento.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 4. MAPA DE APLICAÇÃO DE COMPETÊNCIAS (Matriz de Evidências Verificáveis) */}
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#465B20]" />
            <h4 className="font-serif font-bold text-lg sm:text-xl text-[#1C1A18]">
              Mapa de Aplicação de Competências
            </h4>
          </div>
          <span className="font-mono text-xs text-[#4E4A45]">
            Matriz verificável de competências por projeto e produto autoral
          </span>
        </div>

        {/* Tabela Editorial Transparente */}
        <div className="w-full overflow-x-auto border border-[#465B20]/20 bg-[#FAF8F5]/60">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#465B20]/20 bg-[#465B20]/10 font-mono text-[10px] sm:text-xs uppercase text-[#1C1A18]">
                <th className="py-3 px-4 font-bold">Projeto / Produto</th>
                <th className="py-3 px-4 font-bold">Domínio Principal</th>
                <th className="py-3 px-4 font-bold">Competências Centrais</th>
                <th className="py-3 px-4 font-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#465B20]/15 font-sans text-[#383531]">
              {projectsContent.slice(0, 4).map((proj) => (
                <tr key={proj.id} className="hover:bg-[#465B20]/5 transition-colors">
                  <td className="py-3 px-4 font-serif font-bold text-[#1C1A18]">
                    {proj.title}
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-[#465B20]">
                    {proj.categoryLabel}
                  </td>
                  <td className="py-3 px-4 text-xs text-[#4E4A45]">
                    {proj.technologies.slice(0, 4).join(" • ")}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#465B20] font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verificado</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
