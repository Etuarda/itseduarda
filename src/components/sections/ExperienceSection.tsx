import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Briefcase,
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  Check,
  Sparkles,
  ArrowUpDown,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import type { Education, Experience } from "@/types/portfolio";
import {
  TornPaperEdge,
} from "@/components/ui/HandDrawnElements";

type TabType = "work" | "education" | "specializations" | "courses";

type TimelineEntry = {
  id: string;
  yearDisplay: string;
  title: string;
  institution: string;
  period: string;
  description: string;
  items: string[];
  note?: string;
  rawYear: number;
};

// Paleta Editorial Específica para Cada Categoria com Alto Contraste
const CATEGORY_PALETTES = {
  work: {
    accent: "#465B20",
    cardBorder: "border-[#465B20]/35",
    activeBadge: "bg-[#465B20] text-[#F7F6F2]",
    tagBg: "bg-[#465B20]/15 border-[#465B20]/30 text-[#2A3614]",
  },
  education: {
    accent: "#3B5B44",
    cardBorder: "border-[#3B5B44]/35",
    activeBadge: "bg-[#3B5B44] text-[#F7F6F2]",
    tagBg: "bg-[#3B5B44]/15 border-[#3B5B44]/30 text-[#1F3D28]",
  },
  specializations: {
    accent: "#9E6761",
    cardBorder: "border-[#9E6761]/40",
    activeBadge: "bg-[#9E6761] text-[#F7F6F2]",
    tagBg: "bg-[#9E6761]/20 border-[#9E6761]/40 text-[#2E221E]",
  },
  courses: {
    accent: "#9E4A28",
    cardBorder: "border-[#9E4A28]/35",
    activeBadge: "bg-[#9E4A28] text-[#F7F6F2]",
    tagBg: "bg-[#9E4A28]/15 border-[#9E4A28]/35 text-[#4A1E0D]",
  },
};

const tabs = [
  { id: "work", label: "Experiência", icon: Briefcase },
  { id: "education", label: "Formação", icon: GraduationCap },
  { id: "specializations", label: "Especializações", icon: Award },
  { id: "courses", label: "Cursos", icon: BookOpen },
] as const;

// Extrai o ano numérico para ordenação
function extractYear(period: string): number {
  const match = period.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : 2024;
}

function processEntries(
  rawList: (Experience | Education)[],
  isExp: boolean
): TimelineEntry[] {
  // Ordena cronologicamente por ano
  const sorted = [...rawList].sort((a, b) => {
    const periodA = "period" in a ? a.period : a.year;
    const periodB = "period" in b ? b.period : b.year;
    return extractYear(periodA) - extractYear(periodB);
  });

  return sorted.map((item) => {
    const period = "period" in item ? item.period : item.year;
    const match = period.match(/\d{4}/);
    const yearDisplay = match ? match[0] : period;

    if (isExp) {
      const exp = item as Experience;
      return {
        id: exp.id,
        yearDisplay,
        title: exp.role,
        institution: exp.company,
        period: exp.period,
        description: exp.description,
        items: exp.achievements,
        note: exp.note,
        rawYear: extractYear(period),
      };
    }

    const edu = item as Education;
    return {
      id: edu.id,
      yearDisplay,
      title: edu.title,
      institution: edu.institution,
      period: edu.year,
      description: edu.description,
      items: edu.skills,
      note: edu.note,
      rawYear: extractYear(period),
    };
  });
}

/**
 * Cartão Editorial da Linha do Tempo
 */
function TimelineCard({
  entry,
  isWork,
  palette,
}: {
  entry: TimelineEntry;
  isWork: boolean;
  palette: typeof CATEGORY_PALETTES.work;
}) {
  return (
    <article
      className={`botanical-card texture-archive rounded-2xl p-4 sm:p-6 md:p-7 relative overflow-hidden transition-all border ${palette.cardBorder} shadow-xs group hover:shadow-md bg-[#FAF8F5] min-w-0 break-words`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 relative z-10">
        {/* Coluna 1: Ano e Período (3 cols) */}
        <div className="md:col-span-3 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-2 pb-3 md:pb-0 md:border-r border-[#556B2F]/15 md:pr-4">
          <div className="flex flex-col">
            <span
              className="font-serif font-black text-3xl sm:text-4xl tracking-tight leading-none"
              style={{ color: palette.accent }}
            >
              {entry.yearDisplay}
            </span>

            <span className="font-sans text-[11px] text-[#4E4A45] font-semibold mt-1.5 flex items-center gap-1">
              <Calendar className="w-3 h-3" style={{ color: palette.accent }} />
              {entry.period}
            </span>

            {entry.note && (
              <span
                className="font-sans text-xs mt-2 leading-tight font-medium"
                style={{ color: palette.accent }}
              >
                • {entry.note}
              </span>
            )}
          </div>
        </div>

        {/* Coluna 2: Conteúdo Técnico & Competências (9 cols) */}
        <div className="md:col-span-9 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1C1A18] tracking-tight min-w-0 break-words">
                {entry.title}
              </h3>
            </div>

            <p className="font-sans text-xs sm:text-sm font-bold mb-2.5 min-w-0 break-words" style={{ color: palette.accent }}>
              {entry.institution}
            </p>

            <p className="font-sans text-xs sm:text-sm text-[#383531] font-normal leading-relaxed mb-3.5 min-w-0 break-words">
              {entry.description}
            </p>

            {isWork ? (
              <div>
                <h4 className="font-sans text-[10px] uppercase tracking-wider text-[#4E4A45] font-bold mb-1.5 flex items-center gap-1">
                  <span>Atribuições & Resultados Chave:</span>
                </h4>
                <ul className="flex flex-col gap-1.5 text-xs text-[#1C1A18] font-normal">
                  {entry.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 p-2 rounded-lg bg-white border border-[#465B20]/20 hover:bg-[#FAF8F5] transition-colors shadow-2xs"
                    >
                      <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: palette.accent }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <h4 className="font-sans text-[10px] uppercase tracking-wider text-[#4E4A45] font-bold mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#9E6761]" />
                  <span>Competências Adquiridas:</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {entry.items.map((item) => (
                    <span
                      key={item}
                      className="bg-white border border-[#465B20]/30 font-sans text-[11px] text-[#2A3614] font-semibold px-2.5 py-0.5 rounded-full shadow-2xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState<TabType>("work");
  const [isChronological, setIsChronological] = useState(true);

  const palette = CATEGORY_PALETTES[activeTab];

  const workEntries = useMemo(() => processEntries(portfolioData.experiences, true), []);
  const educationEntries = useMemo(() => processEntries(portfolioData.education, false), []);
  const specializationsEntries = useMemo(
    () => processEntries(portfolioData.complementaryEducation, false),
    []
  );
  const courseEntries = useMemo(
    () => processEntries(portfolioData.courses || [], false),
    []
  );

  const currentList = useMemo(() => {
    let list: TimelineEntry[] = [];
    if (activeTab === "work") list = workEntries;
    else if (activeTab === "education") list = educationEntries;
    else if (activeTab === "specializations") list = specializationsEntries;
    else if (activeTab === "courses") list = courseEntries;

    return isChronological ? list : [...list].reverse();
  }, [activeTab, isChronological, workEntries, educationEntries, specializationsEntries, courseEntries]);

  return (
    <section id="trajetoria" className="w-full py-4 md:py-6 px-3 sm:px-6 md:px-8 max-w-5xl mx-auto scroll-mt-20 relative">
      {/* Âncora de compatibilidade para experiencia e trajetória */}
      <div id="experiencia" className="absolute -top-20" />

      {/* Cabeçalho Editorial (Seções 18 & 66 do Guia Mestre) */}
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 relative z-20">
        <div className="inline-flex items-center mb-2 px-3.5 py-1 rounded-full bg-white border border-[#465B20]/30 shadow-2xs">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.20em] text-[#2A3614] font-bold">
            TRAJETÓRIA
          </span>
        </div>

        <h2
          className="font-serif font-black text-2xl sm:text-4xl lg:text-5xl text-[#1C1A18] tracking-tight leading-tight mt-1"
          style={{ textWrap: "balance" }}
        >
          Minha formação técnica foi construída em camadas.
        </h2>

        <p
          className="font-sans text-xs sm:text-sm md:text-base text-[#383531] mt-3 leading-relaxed max-w-2xl mx-auto"
          style={{ textWrap: "balance" }}
        >
          Atendimento me ensinou a escutar e organizar problemas. Desenvolvimento me ensinou a transformá-los em sistemas. Dados ampliaram minha capacidade de investigar informações e encontrar padrões. IA me levou a estudar sistemas capazes de trabalhar com contexto, recuperação e evidências. Hoje, essas experiências se encontram na forma como desenvolvo software.
        </p>
      </div>

      {/* Barra de Controles: Abas de Categoria + Alternador de Ordem */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 max-w-5xl mx-auto w-full">
        {/* Abas de Categoria com Scroll Horizontal no Mobile */}
        <div className="w-full sm:w-auto overflow-x-auto no-scrollbar py-1">
          <div className="flex flex-nowrap sm:flex-wrap justify-start gap-1.5 sm:gap-2 min-w-max sm:min-w-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 sm:px-4 py-2 min-h-[44px] rounded-full text-xs font-sans transition-all duration-300 cursor-pointer flex items-center gap-1.5 justify-center whitespace-nowrap active:scale-95 ${
                    isActive
                      ? `${palette.activeBadge} shadow-xs font-semibold`
                      : "bg-white border border-[#465B20]/25 text-[#383531] hover:bg-[#FAF8F5] hover:text-[#1C1A18] font-medium shadow-xs"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#F7F6F2]" : "text-[#465B20]"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Alternador de Ordenação */}
        <button
          type="button"
          onClick={() => setIsChronological((prev) => !prev)}
          className="w-full sm:w-auto text-[11px] font-sans font-semibold px-4 py-2 min-h-[44px] rounded-full border border-[#465B20]/30 bg-white hover:bg-[#FAF8F5] text-[#2A3614] flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-xs shrink-0 active:scale-95"
        >
          <ArrowUpDown className="w-3.5 h-3.5 text-[#465B20]" />
          <span>{isChronological ? "Mais Antigos Primeiro" : "Mais Recentes Primeiro"}</span>
        </button>
      </div>

      {/* Borda Rasgada Superior de Caderno de Campo */}
      <TornPaperEdge position="top" fillColor="#FAF8F2" className="opacity-70" />

      {/* Lista de Linha do Tempo */}
      <div className="flex flex-col gap-4 py-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${isChronological ? "asc" : "desc"}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4 w-full"
          >
            {currentList.map((entry) => (
              <TimelineCard
                key={entry.id}
                entry={entry}
                isWork={activeTab === "work"}
                palette={palette}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Borda Rasgada Inferior */}
      <TornPaperEdge position="bottom" fillColor="#FAF8F2" className="opacity-70" />
    </section>
  );
}
