import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Sparkles,
  Layers,
  Cpu,
  Database,
  BrainCircuit,
  ArrowRight,
  Plus,
  RotateCcw,
  Eye,
  Check,
  CheckCircle2,
  Filter,
} from "lucide-react";
import {
  SKILLS_BOARD_COLUMNS,
  PRESET_STACKS,
  type SkillItem,
  type SkillStatus,
  type SkillColumnId,
  type PresetStack,
} from "@/data/skillsBoard";
import { portfolioData } from "@/data/portfolio";
import type { Project } from "@/types/portfolio";
import ProjectModal from "@/components/ui/ProjectModal";

type FilterStatus = "TODAS" | "PRODUÇÃO" | "PROJETO" | "PESQUISA" | "EXPLORANDO";

const COLUMN_ICONS: Record<SkillColumnId, typeof Layers> = {
  frontend: Layers,
  backend: Cpu,
  data: Database,
  ai: BrainCircuit,
};

const STATUS_STYLES: Record<
  SkillStatus,
  { bg: string; border: string; text: string; dot: string }
> = {
  PRODUÇÃO: {
    bg: "bg-[#465B20]/15",
    border: "border-[#465B20]/45",
    text: "text-[#2A3614]",
    dot: "bg-[#465B20]",
  },
  PROJETO: {
    bg: "bg-[#5C6E50]/15",
    border: "border-[#5C6E50]/40",
    text: "text-[#243B2B]",
    dot: "bg-[#5C6E50]",
  },
  PESQUISA: {
    bg: "bg-[#9E6761]/20",
    border: "border-[#9E6761]/45",
    text: "text-[#2E221E]",
    dot: "bg-[#9E6761]",
  },
  EXPLORANDO: {
    bg: "bg-[#9E4A28]/15",
    border: "border-[#9E4A28]/40",
    text: "text-[#4A1E0D]",
    dot: "bg-[#9E4A28]",
  },
};

// Todas as skills achatadas para busca rápida
const ALL_SKILLS = SKILLS_BOARD_COLUMNS.flatMap((c) => c.skills);

export default function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("TODAS");
  const [mobileActiveColumn, setMobileActiveColumn] = useState<SkillColumnId>("frontend");

  // Referências para rolagem horizontal suave no Kanban mobile
  const columnRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleSelectMobileColumn = (colId: SkillColumnId) => {
    setMobileActiveColumn(colId);
    const target = columnRefs.current[colId];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  // Estado das tecnologias SELECIONADAS para combinação (Set de IDs)
  const [selectedSkillIds, setSelectedSkillIds] = useState<Set<string>>(
    () => new Set(["react", "typescript", "nodejs", "postgresql", "rag"])
  );

  // Modal de "Verso Técnico"
  const [inspectingSkill, setInspectingSkill] = useState<SkillItem | null>(null);

  // Trava scroll do body quando a ficha técnica estiver aberta
  useEffect(() => {
    if (!inspectingSkill) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setInspectingSkill(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inspectingSkill]);

  // Modal de Estudo de Caso (Deep Dive de Projeto)
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<Project | null>(null);

  // Alternar seleção da tecnologia ao clicar no card
  const handleToggleSkill = useCallback((skill: SkillItem) => {
    setSelectedSkillIds((prev) => {
      const next = new Set(prev);
      if (next.has(skill.id)) {
        next.delete(skill.id);
      } else {
        next.add(skill.id);
      }
      return next;
    });
  }, []);

  // Remover uma tecnologia específica da combinação
  const handleRemoveSkill = useCallback((skillId: string) => {
    setSelectedSkillIds((prev) => {
      const next = new Set(prev);
      next.delete(skillId);
      return next;
    });
  }, []);

  // Limpar todas as seleções
  const handleClearAll = useCallback(() => {
    setSelectedSkillIds(new Set());
  }, []);

  // Aplicar Preset de Arquitetura pré-definido
  const handleApplyPreset = useCallback((preset: PresetStack) => {
    const ids = [preset.frontendId, preset.backendId, preset.dataId];
    if (preset.aiId) ids.push(preset.aiId);

    // Adiciona tecnologias complementares baseadas no preset
    if (preset.relatedProjectId === "onvagas") {
      ids.push("typescript", "express", "prisma", "redis", "jwt-zod");
    } else if (preset.relatedProjectId === "vendefacil") {
      ids.push("react", "prisma", "jwt-zod", "redis");
    } else if (preset.relatedProjectId === "controle-planos") {
      ids.push("nodejs", "postgresql", "docker");
    } else if (preset.relatedProjectId === "capacitacao-ia") {
      ids.push("python", "scikit-learn", "faiss", "agentes-ia");
    } else if (preset.relatedProjectId === "a11y-io") {
      ids.push("react", "nodejs", "express");
    }

    setSelectedSkillIds(new Set(ids));
  }, []);

  // Tecnologias selecionadas separadas por camada
  const selectedSkillsList = useMemo(() => {
    return ALL_SKILLS.filter((s) => selectedSkillIds.has(s.id));
  }, [selectedSkillIds]);

  const selectedByColumn = useMemo(() => {
    return {
      frontend: selectedSkillsList.filter((s) => s.columnId === "frontend"),
      backend: selectedSkillsList.filter((s) => s.columnId === "backend"),
      data: selectedSkillsList.filter((s) => s.columnId === "data"),
      ai: selectedSkillsList.filter((s) => s.columnId === "ai"),
    };
  }, [selectedSkillsList]);

  // Inteligência de Correspondência de Projetos com a Stack Selecionada
  const matchingProjects = useMemo(() => {
    if (selectedSkillsList.length === 0) return [];

    const scores: Record<
      string,
      { score: number; matchedSkills: string[]; project: Project }
    > = {};

    portfolioData.projects.forEach((proj) => {
      scores[proj.id] = { score: 0, matchedSkills: [], project: proj };

      // Normaliza tags do projeto
      const projTags = proj.tags.map((t) => t.toLowerCase());

      selectedSkillsList.forEach((skill) => {
        const skillNameLower = skill.name.toLowerCase();
        const skillIdLower = skill.id.toLowerCase();

        // Verifica se a tecnologia está associada diretamente ao projeto
        const isExplicitlyUsed = skill.usedInProjects.some((p) => p.id === proj.id);
        const isTagMatch = projTags.some(
          (t) => t.includes(skillNameLower) || skillNameLower.includes(t) || t.includes(skillIdLower)
        );

        if (isExplicitlyUsed || isTagMatch) {
          scores[proj.id].score += 1;
          scores[proj.id].matchedSkills.push(skill.name);
        }
      });
    });

    return Object.values(scores)
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [selectedSkillsList]);

  // Diagnóstico da Arquitetura Combinada
  const architectureDiagnosis = useMemo(() => {
    const hasFe = selectedByColumn.frontend.length > 0;
    const hasBe = selectedByColumn.backend.length > 0;
    const hasData = selectedByColumn.data.length > 0;
    const hasAi = selectedByColumn.ai.length > 0;

    const parts: string[] = [];
    if (hasFe && hasBe && hasData) {
      parts.push("Arquitetura Full-Stack Completa");
    } else if (hasBe && hasData) {
      parts.push("Ecossistema Back-End & Persistência");
    } else if (hasFe) {
      parts.push("Interface Reativa & Client-Side");
    }

    if (hasAi) {
      parts.push("Camada Cognitiva de IA Generativa & RAG");
    }

    if (selectedSkillIds.has("redis") || selectedSkillIds.has("rabbitmq")) {
      parts.push("Alta Concorrência & Mensageria");
    }

    if (selectedSkillIds.has("clean-arch")) {
      parts.push("Clean Architecture & DDD");
    }

    return parts.join(" • ") || "Selecione tecnologias nas colunas abaixo para combinar";
  }, [selectedByColumn, selectedSkillIds]);

  return (
    <section id="skills" className="w-full py-4 md:py-6 px-3 sm:px-6 md:px-8 max-w-7xl mx-auto scroll-mt-20 relative">
      {/* Âncora de compatibilidade para competências e skills */}
      <div id="competencias" className="absolute -top-20" />

      {/* Cabeçalho Editorial (Seções 18 & 64 do Guia Mestre) */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 relative z-20">
        <div className="inline-flex items-center mb-2 px-3.5 py-1 rounded-full bg-white border border-[#465B20]/30 shadow-2xs">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.20em] text-[#2A3614] font-bold">
            COMPÊNDIO TÉCNICO • DISCIPLINA & MATURIDADE
          </span>
        </div>

        <h2
          className="font-serif font-black text-2xl sm:text-4xl lg:text-5xl text-[#1C1A18] tracking-tight leading-tight mt-1"
          style={{ textWrap: "balance" }}
        >
          Ferramentas mudam. A capacidade de tomar boas decisões precisa permanecer.
        </h2>

        <p
          className="font-sans text-xs sm:text-sm md:text-base text-[#383531] mt-3 leading-relaxed max-w-2xl mx-auto"
          style={{ textWrap: "balance" }}
        >
          Não organizo tecnologias como uma lista genérica de palavras-chave. Cada competência abaixo possui nível de maturidade técnica, contexto de uso documentado e evidências em projetos reais.
        </p>
      </div>

      {/* Barra de Filtros Editoriais & Stacks Predefinidas */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-[#465B20]/20">
        {/* Filtro por Nível de Maturidade */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#4E4A45] mr-1 font-semibold hidden sm:inline">
            Maturidade:
          </span>
          {(["TODAS", "PRODUÇÃO", "PROJETO", "PESQUISA", "EXPLORANDO"] as FilterStatus[]).map((st) => {
            const isSelected = activeFilter === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => setActiveFilter(st)}
                className={`px-3 py-1 text-xs font-sans tracking-wide transition-all cursor-pointer border-b-2 ${
                  isSelected
                    ? "border-[#465B20] text-[#2A3614] font-bold"
                    : "border-transparent text-[#4E4A45] hover:text-[#1C1A18] hover:border-[#465B20]/40"
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>

        {/* Stacks Rápidas de Referência */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#4E4A45] mr-1 font-semibold hidden sm:inline">
            Composições:
          </span>
          {PRESET_STACKS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className="px-2.5 py-1 text-[11px] font-sans text-[#2A3614] bg-white/80 border border-[#465B20]/25 hover:bg-[#465B20] hover:text-[#F7F6F2] transition-all cursor-pointer shadow-2xs font-medium"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* ==========================================================================
          O COMPÊNDIO EDITORIAL (4 DISCIPLINAS TÉCNICAS EM PRANCHAS DE CATÁLOGO)
          Eliminação de cards arredondados genéricos. Estrutura pura de imprensa cultural.
          ========================================================================== */}
      <div className="w-full border-t border-b border-[#465B20]/25 bg-white/60 backdrop-blur-xs mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#465B20]/20">
          {SKILLS_BOARD_COLUMNS.map((col) => {
            const Icon = COLUMN_ICONS[col.id];
            const filteredSkills =
              activeFilter === "TODAS"
                ? col.skills
                : col.skills.filter((s) => s.status === activeFilter);

            return (
              <div key={col.id} className="flex flex-col">
                {/* Cabeçalho Editorial da Disciplina */}
                <div className="p-4 sm:p-5 border-b border-[#465B20]/20 bg-[#FAF8F5]/90">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-black text-2xl text-[#465B20]">
                        {col.number}
                      </span>
                      <h3 className="font-serif font-bold text-base text-[#1C1A18] tracking-tight">
                        {col.title}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-[#465B20] font-bold">
                      [{filteredSkills.length}]
                    </span>
                  </div>
                  <p className="font-sans text-[11px] text-[#4E4A45] italic">
                    {col.tagline}
                  </p>
                </div>

                {/* Lista de Espécimes Técnicos da Coluna */}
                <div className="flex flex-col divide-y divide-[#465B20]/10">
                  {filteredSkills.map((skill) => {
                    const isSelected = selectedSkillIds.has(skill.id);
                    const statusStyle = STATUS_STYLES[skill.status];

                    return (
                      <article
                        key={skill.id}
                        onClick={() => handleToggleSkill(skill)}
                        className={`p-3.5 sm:p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between group relative ${
                          isSelected
                            ? "bg-[#F1F5E8] border-l-2 border-l-[#465B20]"
                            : "hover:bg-white/80 border-l-2 border-l-transparent"
                        }`}
                      >
                        <div>
                          {/* Metadados: Código & Status Pill */}
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-[9px] text-[#4E4A45] font-semibold">
                              #{skill.code}
                            </span>
                            <span
                              className={`inline-flex items-center gap-1 text-[8px] font-mono px-2 py-0.5 border font-bold uppercase ${statusStyle.bg} ${statusStyle.border} ${statusStyle.text}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                              {skill.status}
                            </span>
                          </div>

                          {/* Nome da Tecnologia */}
                          <h4 className="font-serif font-bold text-base text-[#1C1A18] group-hover:text-[#465B20] transition-colors leading-tight">
                            {skill.name}
                          </h4>

                          {/* Tag de Contexto de Aplicação */}
                          <span className="font-sans text-[9px] uppercase font-bold text-[#465B20] block mt-0.5 tracking-wider">
                            {skill.shortTag}
                          </span>

                          {/* Descrição Concisa */}
                          <p className="font-sans text-[11px] text-[#383531] font-normal leading-relaxed mt-1.5 line-clamp-2">
                            {skill.description}
                          </p>
                        </div>

                        {/* Ações Integradas */}
                        <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-[#465B20]/10 text-[10px] font-sans">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setInspectingSkill(skill);
                            }}
                            className="text-[#465B20] hover:text-[#1C1A18] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Ficha técnica</span>
                          </button>

                          <span className="font-mono text-[9px] text-[#4E4A45] font-medium">
                            {isSelected ? "● Combinada" : "○ Selecionar"}
                          </span>
                        </div>
                      </article>
                    );
                  })}

                  {filteredSkills.length === 0 && (
                    <div className="p-8 text-center text-xs text-[#4E4A45] italic font-sans">
                      Nenhuma tecnologia com status "{activeFilter}" nesta disciplina.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ==========================================================================
          BANCADA TÉCNICA: SÍNTESE ARQUITETURAL & PROJETOS CONECTADOS
          Prancha arquitetural sem cards arredondados genéricos.
          ========================================================================== */}
      <div className="border border-[#465B20]/25 bg-[#FAF8F5]/90 p-4 sm:p-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#465B20]/20 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#465B20] text-[#F7F6F2]">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1C1A18] tracking-tight">
                  Bancada de Combinação Técnica
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#465B20]/15 text-[#2A3614] border border-[#465B20]/30">
                  {selectedSkillIds.size} selecionadas
                </span>
              </div>
              <p className="font-sans text-xs text-[#2A3614] font-medium mt-0.5">
                {architectureDiagnosis}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClearAll}
            className="px-3 py-1 border border-[#465B20]/30 bg-white hover:bg-[#FAF8F5] text-[#383531] hover:text-[#1C1A18] text-xs font-sans font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <RotateCcw className="w-3 h-3 text-[#465B20]" />
            <span>Limpar seleção</span>
          </button>
        </div>

        {/* Projetos Correspondentes */}
        <div className="pt-2">
          <span className="text-[10px] font-mono font-bold text-[#2A3614] uppercase tracking-wider block mb-2">
            Estudos de caso que comprovam essa combinação ({matchingProjects.length}):
          </span>

          <div className="flex flex-wrap items-center gap-2">
            {matchingProjects.slice(0, 4).map(({ project, score }) => (
              <button
                key={project.id}
                type="button"
                onClick={() => setSelectedProjectForModal(project)}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#465B20] hover:bg-[#2A3614] text-[#F7F6F2] text-xs font-sans font-semibold transition-all shadow-xs cursor-pointer active:scale-98"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5D9A5]" />
                <span>{project.title}</span>
                <span className="text-[10px] opacity-85 font-mono">
                  ({score} techs em comum)
                </span>
              </button>
            ))}

            {matchingProjects.length === 0 && (
              <span className="text-xs text-[#4E4A45] italic py-1">
                Nenhum projeto específico encontrado com a combinação atual. Experimente selecionar React, Node.js ou PostgreSQL!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ==========================================================================
          MODAL: VERSO TÉCNICO (FICHA DE EVIDÊNCIA DE ENGENHARIA)
          ========================================================================== */}
      <AnimatePresence>
        {inspectingSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInspectingSkill(null)}
              className="fixed inset-0 bg-[#2B2927]/40 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-lg max-h-[90dvh] pb-[calc(1.5rem+env(safe-area-inset-bottom))] overflow-y-auto no-scrollbar border border-[#465B20]/40 bg-[#FAF8F5] p-6 sm:p-8 shadow-2xl z-10"
            >

              {/* Botão Fechar */}
              <button
                type="button"
                onClick={() => setInspectingSkill(null)}
                className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-white hover:bg-[#465B20] hover:text-[#F7F6F2] text-[#1C1A18] border border-[#465B20]/30 flex items-center justify-center transition-colors cursor-pointer shadow-xs active:scale-95 z-20"
                aria-label="Fechar ficha técnica"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Cabeçalho do Verso Técnico */}
              <div className="pb-3 border-b border-[#556B2F]/15 mb-4">
                <div className="flex items-center justify-between text-[9px] font-mono text-[#556B2F] font-bold tracking-widest uppercase mb-1">
                  <span>FICHA TÉCNICA // {inspectingSkill.code}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full border ${
                      STATUS_STYLES[inspectingSkill.status].bg
                    } ${STATUS_STYLES[inspectingSkill.status].border} ${
                      STATUS_STYLES[inspectingSkill.status].text
                    }`}
                  >
                    {inspectingSkill.status}
                  </span>
                </div>

                <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#2B2927] tracking-tight">
                  {inspectingSkill.name}
                </h3>
                <span className="font-sans text-xs uppercase tracking-wider text-[#556B2F] font-bold block mt-0.5">
                  {inspectingSkill.shortTag} • Eixo {inspectingSkill.columnName}
                </span>
              </div>

              {/* Descrição & Aplicações */}
              <div className="flex flex-col gap-4">
                <p className="font-sans text-xs sm:text-sm text-[#5C5854] font-light leading-relaxed">
                  {inspectingSkill.description}
                </p>

                {/* Projetos em que foi usada */}
                <div>
                  <h4 className="font-sans text-[10px] uppercase font-bold text-[#8C8780] tracking-wider mb-2">
                    Onde Eduarda aplicou na prática:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {inspectingSkill.usedInProjects.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          const proj = portfolioData.projects.find((pr) => pr.id === p.id);
                          if (proj) {
                            setInspectingSkill(null);
                            setSelectedProjectForModal(proj);
                          }
                        }}
                        className="px-3 py-1 rounded-full bg-white border border-[#556B2F]/20 hover:bg-[#556B2F] hover:text-[#F7F6F2] text-[#2B2927] text-xs font-sans font-medium transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                      >
                        <span>{p.name}</span>
                        <ArrowRight className="w-3 h-3 opacity-60" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Aplicações e Competências de Engenharia */}
                <div>
                  <h4 className="font-sans text-[10px] uppercase font-bold text-[#8C8780] tracking-wider mb-2">
                    Evidências & Competências de Engenharia:
                  </h4>
                  <ul className="flex flex-col gap-1.5 text-xs text-[#2B2927] font-light">
                    {inspectingSkill.applications.map((app, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 p-2.5 bg-white/80 border-l-2 border-[#465B20] border-t border-r border-b border-[#465B20]/15"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#465B20] shrink-0 mt-0.5" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Ações na Base do Verso */}
              <div className="mt-6 pt-4 border-t border-[#556B2F]/15 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleToggleSkill(inspectingSkill);
                    setInspectingSkill(null);
                  }}
                  className={`flex-1 py-2.5 px-4 rounded-full text-xs font-sans font-semibold tracking-wider transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer ${
                    selectedSkillIds.has(inspectingSkill.id)
                      ? "bg-white border border-red-300 text-red-600 hover:bg-red-50"
                      : "bg-[#556B2F] hover:bg-[#3A4423] text-[#F7F6F2]"
                  }`}
                >
                  {selectedSkillIds.has(inspectingSkill.id) ? (
                    <>
                      <X className="w-3.5 h-3.5" />
                      <span>Remover do Architecture Playground</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Combinar no Architecture Playground</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal de Estudo de Caso de Projeto (Deep Dive) */}
      <ProjectModal
        project={selectedProjectForModal}
        isOpen={Boolean(selectedProjectForModal)}
        onClose={() => setSelectedProjectForModal(null)}
      />
    </section>
  );
}
