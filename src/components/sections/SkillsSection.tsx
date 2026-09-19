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
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 relative z-20">
        <div className="inline-flex items-center mb-2 px-3.5 py-1 rounded-full bg-white border border-[#465B20]/30 shadow-2xs">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.20em] text-[#2A3614] font-bold">
            REPERTÓRIO TÉCNICO
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
          Meu objetivo não é aumentar uma lista de tecnologias. Procuro entender quando utilizar cada ferramenta, quais problemas ela resolve e quais trade-offs introduz.
        </p>
      </div>

      {/* Barra de Filtros */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-4 md:mb-5">
        {(["TODAS", "PRODUÇÃO", "PROJETO", "PESQUISA", "EXPLORANDO"] as FilterStatus[]).map((st) => {
          const isSelected = activeFilter === st;
          return (
            <button
              key={st}
              type="button"
              onClick={() => setActiveFilter(st)}
              className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-[#465B20] text-[#F7F6F2] font-semibold shadow-xs"
                  : "bg-[#FAF8F5] border border-[#465B20]/25 text-[#383531] hover:text-[#1C1A18] hover:bg-white font-medium"
              }`}
            >
              {st}
            </button>
          );
        })}
      </div>

      {/* ARCHITECTURE PLAYGROUND */}
      <div className="relative rounded-3xl bg-[#FAF8F5] border-2 border-[#465B20]/35 p-4 sm:p-6 md:p-7 shadow-md texture-paper mb-6 md:mb-8">

        {/* Topo do Playground: Título & Status da Combinação */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#465B20]/20 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#465B20] text-[#F7F6F2]">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-black text-xl sm:text-2xl text-[#1C1A18] tracking-tight">
                  Architecture Playground
                </h3>
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#465B20] text-[#F7F6F2] shadow-xs">
                  {selectedSkillIds.size} selecionadas
                </span>
              </div>
              <p className="font-sans text-xs text-[#2A3614] mt-0.5 font-semibold">
                {architectureDiagnosis}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClearAll}
            className="px-3 py-1.5 rounded-full border border-[#465B20]/30 bg-white hover:bg-[#FAF8F5] text-[#383531] hover:text-[#1C1A18] text-xs font-sans font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            title="Desmarcar todas as tecnologias"
          >
            <RotateCcw className="w-3 h-3 text-[#465B20]" />
            <span>Limpar Seleção</span>
          </button>
        </div>

        {/* 4 Blocos de Camadas com Tecnologias Selecionadas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {/* Camada 1: Frontend */}
          <div className="p-3 rounded-2xl bg-white border border-[#465B20]/30 flex flex-col justify-between shadow-xs min-h-[105px]">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#2A3614] font-bold pb-1 border-b border-[#465B20]/15 mb-2">
              <span className="flex items-center gap-1">
                <Layers className="w-3 h-3 text-[#465B20]" />
                <span>01 FRONTEND</span>
              </span>
              <span className="text-[#465B20] font-bold">{selectedByColumn.frontend.length}</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {selectedByColumn.frontend.map((s) => (
                <span
                  key={s.id}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#465B20]/15 border border-[#465B20]/35 text-[#2A3614] text-xs font-sans font-semibold"
                >
                  <span>{s.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(s.id)}
                    className="hover:text-red-700 cursor-pointer ml-0.5"
                    title="Remover"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {selectedByColumn.frontend.length === 0 && (
                <span className="text-xs text-[#4E4A45] italic py-1 font-medium">
                  + Clique nos cards da coluna 01
                </span>
              )}
            </div>
          </div>

          {/* Camada 2: Backend */}
          <div className="p-3 rounded-2xl bg-white border border-[#465B20]/30 flex flex-col justify-between shadow-xs min-h-[105px]">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#2A3614] font-bold pb-1 border-b border-[#465B20]/15 mb-2">
              <span className="flex items-center gap-1">
                <Cpu className="w-3 h-3 text-[#465B20]" />
                <span>02 BACKEND & APIS</span>
              </span>
              <span className="text-[#465B20] font-bold">{selectedByColumn.backend.length}</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {selectedByColumn.backend.map((s) => (
                <span
                  key={s.id}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#465B20]/15 border border-[#465B20]/35 text-[#2A3614] text-xs font-sans font-semibold"
                >
                  <span>{s.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(s.id)}
                    className="hover:text-red-700 cursor-pointer ml-0.5"
                    title="Remover"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {selectedByColumn.backend.length === 0 && (
                <span className="text-xs text-[#4E4A45] italic py-1 font-medium">
                  + Clique nos cards da coluna 02
                </span>
              )}
            </div>
          </div>

          {/* Camada 3: Data */}
          <div className="p-3 rounded-2xl bg-white border border-[#465B20]/30 flex flex-col justify-between shadow-xs min-h-[105px]">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#2A3614] font-bold pb-1 border-b border-[#465B20]/15 mb-2">
              <span className="flex items-center gap-1">
                <Database className="w-3 h-3 text-[#465B20]" />
                <span>03 DATA & PERSISTÊNCIA</span>
              </span>
              <span className="text-[#465B20] font-bold">{selectedByColumn.data.length}</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {selectedByColumn.data.map((s) => (
                <span
                  key={s.id}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#465B20]/15 border border-[#465B20]/35 text-[#2A3614] text-xs font-sans font-semibold"
                >
                  <span>{s.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(s.id)}
                    className="hover:text-red-700 cursor-pointer ml-0.5"
                    title="Remover"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {selectedByColumn.data.length === 0 && (
                <span className="text-xs text-[#4E4A45] italic py-1 font-medium">
                  + Clique nos cards da coluna 03
                </span>
              )}
            </div>
          </div>

          {/* Camada 4: AI & RAG */}
          <div className="p-3 rounded-2xl bg-white border border-[#465B20]/30 flex flex-col justify-between shadow-xs min-h-[105px]">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#2A3614] font-bold pb-1 border-b border-[#465B20]/15 mb-2">
              <span className="flex items-center gap-1">
                <BrainCircuit className="w-3 h-3 text-[#9E6761]" />
                <span>04 AI & RAG</span>
              </span>
              <span className="text-[#9E6761] font-bold">{selectedByColumn.ai.length}</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {selectedByColumn.ai.map((s) => (
                <span
                  key={s.id}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#9E6761]/20 border border-[#9E6761]/45 text-[#2E221E] text-xs font-sans font-semibold"
                >
                  <span>{s.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(s.id)}
                    className="hover:text-red-700 cursor-pointer ml-0.5"
                    title="Remover"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {selectedByColumn.ai.length === 0 && (
                <span className="text-xs text-[#4E4A45] italic py-1 font-medium">
                  + Clique nos cards da coluna 04
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Projetos do Portfólio Correspondentes à Combinação Atual */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#465B20]/25 flex flex-col gap-2.5 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-mono font-bold text-[#2A3614] uppercase tracking-wider">
              Projetos compatíveis com esta combinação ({matchingProjects.length}):
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {matchingProjects.slice(0, 4).map(({ project, score, matchedSkills }) => (
              <button
                key={project.id}
                type="button"
                onClick={() => setSelectedProjectForModal(project)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#465B20] hover:bg-[#2A3614] text-[#F7F6F2] text-xs font-sans font-semibold transition-all shadow-xs cursor-pointer hover:scale-[1.02]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E6DAC8]" />
                <span className="font-semibold">{project.title}</span>
                <span className="text-[10px] opacity-85 font-mono">
                  ({score} techs em comum)
                </span>
              </button>
            ))}

            {matchingProjects.length === 0 && (
              <span className="text-xs text-[#8C8780] italic py-1">
                Nenhum projeto encontrado com a combinação atual. Experimente selecionar React, Node.js ou PostgreSQL!
              </span>
            )}
          </div>
        </div>

        {/* Presets de Combinações Reais de Projetos */}
        <div className="mt-3.5 pt-3 border-t border-[#556B2F]/15 flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#8C8780] mr-1">
            Combinar Stacks Prontas:
          </span>
          {PRESET_STACKS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className="px-2.5 py-1 rounded-full bg-white border border-[#465B20]/30 hover:bg-[#465B20] hover:text-[#F7F6F2] text-[#2A3614] text-[11px] font-sans transition-all cursor-pointer shadow-xs font-medium"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Seletor Mobile de Colunas (visível apenas em telas pequenas) */}
      <div className="flex sm:hidden items-center justify-center gap-1.5 mb-3 p-1 rounded-2xl bg-[#FAF8F5] border border-[#465B20]/25 shadow-2xs">
        {SKILLS_BOARD_COLUMNS.map((col) => {
          const isSelected = mobileActiveColumn === col.id;
          return (
            <button
              key={col.id}
              type="button"
              onClick={() => handleSelectMobileColumn(col.id)}
              className={`flex-1 py-2 px-1 min-h-[44px] rounded-xl text-[11px] font-sans font-semibold transition-all flex flex-col items-center justify-center text-center leading-tight active:scale-95 cursor-pointer ${
                isSelected
                  ? "bg-[#465B20] text-[#F7F6F2] shadow-xs font-bold"
                  : "bg-white/80 text-[#383531] hover:bg-white border border-[#465B20]/15"
              }`}
            >
              <span className="font-mono text-[9px] opacity-85">{col.number}</span>
              <span className="truncate w-full">{col.title}</span>
            </button>
          );
        })}
      </div>

      {/* ==========================================================================
          QUADRO KANBAN DE COMPETÊNCIAS (4 COLUNAS INTERATIVAS)
          No mobile: trilho com swipe horizontal fluido snap-x snap-mandatory
          No desktop: grid com 4 colunas distribuídas
          ========================================================================== */}
      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory sm:snap-none no-scrollbar pb-2 px-1">
        {SKILLS_BOARD_COLUMNS.map((col) => {
          const Icon = COLUMN_ICONS[col.id];
          const filteredSkills =
            activeFilter === "TODAS"
              ? col.skills
              : col.skills.filter((s) => s.status === activeFilter);

          return (
            <div
              key={col.id}
              ref={(el) => {
                columnRefs.current[col.id] = el;
              }}
              className="flex flex-col w-[85vw] max-w-[340px] sm:w-auto shrink-0 sm:shrink snap-center sm:snap-align-none rounded-3xl bg-[#FAF8F5] border border-[#465B20]/25 p-3 sm:p-4 shadow-xs texture-paper"
            >
              {/* Cabeçalho da Coluna Kanban */}
              <div className="flex items-center justify-between pb-2.5 border-b border-[#465B20]/20 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white border border-[#465B20]/25 text-[#465B20] shadow-2xs">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-serif font-black text-xs text-[#465B20]">
                        {col.number}
                      </span>
                      <h3 className="font-serif font-bold text-sm text-[#1C1A18] tracking-tight">
                        {col.title}
                      </h3>
                    </div>
                    <p className="font-sans text-[10px] text-[#383531] font-medium line-clamp-1">
                      {col.tagline}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#2A3614] bg-white px-2 py-0.5 rounded-full border border-[#465B20]/20 shadow-2xs">
                  {filteredSkills.length}
                </span>
              </div>

              {/* Lista de Cards da Coluna com Seleção Direta */}
              <div className="flex flex-col gap-2.5 min-h-[280px]">
                {filteredSkills.map((skill) => {
                  const isSelected = selectedSkillIds.has(skill.id);
                  const statusStyle = STATUS_STYLES[skill.status];

                  return (
                    <div
                      key={skill.id}
                      onClick={() => handleToggleSkill(skill)}
                      className={`group p-3 sm:p-3.5 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between relative ${
                        isSelected
                          ? "bg-[#F1F5E8] border-2 border-[#465B20] shadow-md ring-2 ring-[#465B20]/20 -translate-y-0.5"
                          : "bg-white border border-[#465B20]/20 hover:border-[#465B20]/50 shadow-xs hover:shadow-sm"
                      }`}
                    >
                      <div>
                        {/* Linha Superior: Código, Status & Botão de Seleção */}
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[9px] text-[#4E4A45] font-semibold">
                              {skill.code}
                            </span>
                            <span
                              className={`inline-flex items-center gap-1 text-[8px] font-mono px-2 py-0.2 rounded-full border font-bold uppercase ${statusStyle.bg} ${statusStyle.border} ${statusStyle.text}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                              {skill.status}
                            </span>
                          </div>

                          {/* Badge de Seleção Ativa */}
                          {isSelected ? (
                            <span className="inline-flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#465B20] text-[#F7F6F2] font-bold shadow-xs">
                              <Check className="w-2.5 h-2.5" /> Combinada
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-0.5 text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#465B20]/15 text-[#2A3614] font-semibold opacity-85 group-hover:opacity-100 transition-opacity">
                              <Plus className="w-2.5 h-2.5" /> Selecionar
                            </span>
                          )}
                        </div>

                        {/* Nome da Tecnologia */}
                        <h4
                          className={`font-serif font-bold text-base leading-tight transition-colors ${
                            isSelected ? "text-[#2A3614]" : "text-[#1C1A18] group-hover:text-[#465B20]"
                          }`}
                        >
                          {skill.name}
                        </h4>

                        {/* Tag de Contexto */}
                        <span className="font-sans text-[10px] uppercase font-bold text-[#465B20] block mt-0.5 tracking-wider">
                          {skill.shortTag}
                        </span>

                        {/* Descrição Concisa */}
                        <p className="font-sans text-[11px] text-[#383531] font-normal leading-relaxed mt-1 line-clamp-2">
                          {skill.description}
                        </p>
                      </div>

                      {/* Rodapé do Card: Ação de Ficha Técnica */}
                      <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#465B20]/15 text-[10px] font-sans">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setInspectingSkill(skill);
                          }}
                          className="text-[#465B20] hover:text-[#1C1A18] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                          title="Ver evidências e projetos de aplicação"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Ficha técnica</span>
                        </button>
                      </div>
                    </div>
                  );
                })}

                {filteredSkills.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-6 text-center text-[11px] text-[#4E4A45] font-sans italic border border-dashed border-[#465B20]/30 rounded-2xl">
                    <span>Nenhuma tecnologia com status "{activeFilter}" nesta coluna.</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
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
              className="relative w-full max-w-lg max-h-[90dvh] pb-[calc(1.5rem+env(safe-area-inset-bottom))] overflow-y-auto no-scrollbar rounded-3xl bg-[#FAF8F5] border border-[#556B2F]/30 p-5 sm:p-8 shadow-2xl texture-paper z-10"
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
                        className="flex items-start gap-2 p-2 rounded-xl bg-white border border-[#465B20]/20 shadow-2xs"
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
