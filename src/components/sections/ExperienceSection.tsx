import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpDown, Calendar, Check, ArrowRight, Download } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import type { Education, Experience } from "@/types/portfolio";

const resumeUrl = "/Eduarda- Curriculo-Full-Stack(6).pdf";

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

const tabs = [
  { id: "work", num: "01", label: "Experiência" },
  { id: "education", num: "02", label: "Formação" },
  { id: "specializations", num: "03", label: "Especializações" },
  { id: "courses", num: "04", label: "Cursos" },
] as const;

// Extrai o ano numérico para ordenação cronológica
function extractYear(period: string): number {
  const match = period.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : 2024;
}

function processEntries(
  rawList: (Experience | Education)[],
  isExp: boolean
): TimelineEntry[] {
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
        yearDisplay: exp.period.includes("Presente") || exp.period.includes("Atual")
          ? `${yearDisplay} — ATUAL`
          : exp.period,
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
      yearDisplay: edu.year.includes("andamento")
        ? `${yearDisplay} — ANDAMENTO`
        : edu.year,
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

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState<TabType>("work");
  const [isChronological, setIsChronological] = useState(false); // Mais recentes primeiro por padrão

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
    <section
      id="trajetoria"
      className="w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto scroll-mt-20 relative select-text"
      aria-label="Trajetória e Formação Técnica"
    >
      {/* Âncora de compatibilidade para links externos */}
      <div id="experiencia" className="absolute -top-20" />

      {/* ========================================================================= */}
      {/* 01. CABEÇALHO DA SEÇÃO (Composição Editorial Assimétrica)                  */}
      {/* ========================================================================= */}
      <header className="mb-12 sm:mb-16 border-b border-[#465B20]/20 pb-8 sm:pb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.20em] text-[#465B20] font-bold">
            TRAJETÓRIA
          </span>
          <span className="h-px w-12 bg-[#465B20]/25" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#4E4A45]">
            06 / REGISTRO EDITORIAL
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
          <div className="lg:col-span-8">
            <h2 className="font-serif font-semibold text-3xl sm:text-5xl lg:text-6xl text-[#1C1A18] tracking-tight leading-[1.08]">
              Minha formação técnica
              <br />
              <span className="text-[#2A3614]">foi construída em camadas.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 lg:text-right pb-1">
            <span className="font-script text-2xl sm:text-3xl text-[#9E6761] block leading-none">
              prática, estudo e construção
            </span>
            <p className="font-sans text-xs text-[#4E4A45] mt-1.5 font-normal">
              Percurso técnico orientado a problemas reais.
            </p>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 02 & 03 & 04. PÁGINA DUPLA: INTRODUÇÃO EDITORIAL + COLUNA "EM PERSPECTIVA" */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 sm:mb-20">
        {/* COLUNA PRINCIPAL: OS 4 PILARES + LEAD DE MATÉRIA (8 cols no desktop) */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#465B20] font-bold">
                MATÉRIA PRINCIPAL
              </span>
              <span className="h-px flex-1 bg-[#465B20]/15" />
            </div>

            {/* Os 4 Pilares estruturados com tipografia, numeração e linhas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
              {/* 01. ATENDIMENTO */}
              <div className="border-t border-[#465B20]/20 pt-3 flex flex-col">
                <div className="flex items-baseline justify-between mb-1.5">
                  <h3 className="font-sans font-bold text-xs uppercase tracking-[0.14em] text-[#2A3614]">
                    ATENDIMENTO
                  </h3>
                  <span className="font-mono text-[10px] text-[#465B20] font-semibold">
                    01
                  </span>
                </div>
                <p className="font-sans text-sm text-[#383531] leading-relaxed">
                  me ensinou a escutar e organizar problemas.
                </p>
              </div>

              {/* 02. DESENVOLVIMENTO */}
              <div className="border-t border-[#465B20]/20 pt-3 flex flex-col">
                <div className="flex items-baseline justify-between mb-1.5">
                  <h3 className="font-sans font-bold text-xs uppercase tracking-[0.14em] text-[#2A3614]">
                    DESENVOLVIMENTO
                  </h3>
                  <span className="font-mono text-[10px] text-[#465B20] font-semibold">
                    02
                  </span>
                </div>
                <p className="font-sans text-sm text-[#383531] leading-relaxed">
                  me ensinou a transformá-los em sistemas.
                </p>
              </div>

              {/* 03. DADOS */}
              <div className="border-t border-[#465B20]/20 pt-3 flex flex-col">
                <div className="flex items-baseline justify-between mb-1.5">
                  <h3 className="font-sans font-bold text-xs uppercase tracking-[0.14em] text-[#2A3614]">
                    DADOS
                  </h3>
                  <span className="font-mono text-[10px] text-[#465B20] font-semibold">
                    03
                  </span>
                </div>
                <p className="font-sans text-sm text-[#383531] leading-relaxed">
                  ampliaram minha capacidade de investigar informações e encontrar padrões.
                </p>
              </div>

              {/* 04. IA */}
              <div className="border-t border-[#465B20]/20 pt-3 flex flex-col">
                <div className="flex items-baseline justify-between mb-1.5">
                  <h3 className="font-sans font-bold text-xs uppercase tracking-[0.14em] text-[#2A3614]">
                    IA
                  </h3>
                  <span className="font-mono text-[10px] text-[#465B20] font-semibold">
                    04
                  </span>
                </div>
                <p className="font-sans text-sm text-[#383531] leading-relaxed">
                  me levou a estudar sistemas capazes de trabalhar com contexto, recuperação e evidências.
                </p>
              </div>
            </div>
          </div>

          {/* Lead Editorial de Matéria com Capitular */}
          <div className="border-l-2 border-[#465B20] pl-5 sm:pl-6 py-2.5 bg-[#FAF8F5]/80">
            <p className="font-serif text-base sm:text-lg md:text-xl text-[#1C1A18] leading-relaxed italic">
              <span className="font-serif font-bold text-3xl sm:text-4xl text-[#465B20] float-left mr-2.5 leading-none mt-1">H</span>
              oje, essas experiências se encontram na forma como desenvolvo software: com mais clareza de problema, responsabilidade técnica e atenção ao que acontece depois da primeira entrega.
            </p>
          </div>
        </div>

        {/* COLUNA DE APOIO: "EM PERSPECTIVA" (4 cols no desktop, filete vertical) */}
        <aside className="lg:col-span-4 lg:border-l lg:border-[#465B20]/20 lg:pl-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#465B20]/20 pb-2 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.20em] text-[#465B20] font-bold">
                EM PERSPECTIVA
              </span>
              <span className="font-script text-lg text-[#9E6761]">
                em perspectiva
              </span>
            </div>

            {/* Lista contínua de números editoriais (sem formato de cards) */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-5">
              {/* 720h */}
              <div className="flex flex-col">
                <span className="font-serif font-bold text-4xl sm:text-5xl text-[#2A3614] leading-none tracking-tight">
                  720h
                </span>
                <span className="font-sans text-xs font-bold text-[#1C1A18] mt-1.5">
                  Formação Full Stack
                </span>
                <span className="font-sans text-[11px] text-[#4E4A45]">
                  Programadores do Amanhã
                </span>
              </div>

              {/* 360h */}
              <div className="flex flex-col lg:border-t lg:border-[#465B20]/15 lg:pt-4">
                <span className="font-serif font-bold text-4xl sm:text-5xl text-[#2A3614] leading-none tracking-tight">
                  360h
                </span>
                <span className="font-sans text-xs font-bold text-[#1C1A18] mt-1.5">
                  Capacitação Técnica em IA
                </span>
                <span className="font-sans text-[11px] text-[#4E4A45]">
                  FDTE / USP
                </span>
              </div>

              {/* 95 */}
              <div className="flex flex-col border-t border-[#465B20]/15 pt-4">
                <span className="font-serif font-bold text-4xl sm:text-5xl text-[#2A3614] leading-none tracking-tight">
                  95
                </span>
                <span className="font-sans text-xs font-bold text-[#1C1A18] mt-1.5">
                  Testes automatizados aprovados
                </span>
                <span className="font-sans text-[11px] text-[#4E4A45]">
                  VendeFácil
                </span>
              </div>

              {/* 5.714 */}
              <div className="flex flex-col border-t border-[#465B20]/15 pt-4">
                <span className="font-serif font-bold text-4xl sm:text-5xl text-[#2A3614] leading-none tracking-tight">
                  5.714
                </span>
                <span className="font-sans text-xs font-bold text-[#1C1A18] mt-1.5">
                  Chunks indexados
                </span>
                <span className="font-sans text-[11px] text-[#4E4A45]">
                  Pipeline RAG VendeFácil
                </span>
              </div>
            </div>
          </div>

          {/* Nota Discreta de Esclarecimento Técnico */}
          <p className="font-sans text-[11px] text-[#4E4A45] italic leading-relaxed mt-6 pt-4 border-t border-[#465B20]/15">
            Os números acima representam formação e profundidade técnica dos projetos, não impacto comercial.
          </p>
        </aside>
      </div>

      {/* ========================================================================= */}
      {/* 05. BLOCO EDITORIAL: "O QUE ESSA TRAJETÓRIA ME ENSINOU A CONSTRUIR"        */}
      {/* ========================================================================= */}
      <div className="mb-16 sm:mb-20">
        <div className="border-t-2 border-[#465B20] pt-6 sm:pt-8 mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.20em] text-[#465B20] font-bold">
              COMPETÊNCIAS NA PRÁTICA
            </span>
            <span className="h-px w-10 bg-[#465B20]/25" />
          </div>
          <h3 className="font-serif font-semibold text-2xl sm:text-3xl lg:text-4xl text-[#1C1A18] tracking-tight">
            O que essa trajetória me ensinou a construir.
          </h3>
        </div>

        {/* Diagramação Assimétrica em 3 Linhas (Desktop) */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {/* LINHA 1: Back-end (58%) + IA (42%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* BACK-END COM ESTRUTURA */}
            <article className="lg:col-span-7 border-t border-[#465B20]/20 pt-4 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="font-serif font-bold text-lg sm:text-xl text-[#1C1A18]">
                    Back-end com estrutura
                  </h4>
                  <span className="font-mono text-[10px] text-[#465B20] font-bold">
                    01 / ARQUITETURA
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed mb-4">
                  “Já trabalhei com APIs, autenticação, validação, bancos relacionais, cache e mensageria, buscando separar responsabilidades e manter regras de negócio compreensíveis.”
                </p>
              </div>
              <div className="pt-2 border-t border-[#465B20]/10 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#465B20] font-bold">
                  Na prática:
                </span>
                <span className="font-sans text-xs text-[#2A3614] font-medium">
                  Node.js, TypeScript, PostgreSQL, Redis e RabbitMQ.
                </span>
              </div>
            </article>

            {/* IA COM CONTEXTO E EVIDÊNCIA */}
            <article className="lg:col-span-5 border-t border-[#465B20]/20 pt-4 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="font-serif font-bold text-lg sm:text-xl text-[#1C1A18]">
                    IA com contexto e evidência
                  </h4>
                  <span className="font-mono text-[10px] text-[#465B20] font-bold">
                    02 / RAG & LLMs
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed mb-4">
                  “No VendeFácil, trabalhei com recuperação híbrida, filtros, evidências, guardrails e respostas estruturadas para reduzir a dependência da geração livre do LLM.”
                </p>
              </div>
              <div className="pt-2 border-t border-[#465B20]/10 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#465B20] font-bold">
                  Na prática:
                </span>
                <span className="font-sans text-xs text-[#2A3614] font-medium">
                  FAISS, BM25, RRF, embeddings, Pydantic e avaliação.
                </span>
              </div>
            </article>
          </div>

          {/* LINHA 2: Dados (42%) + Produto e Operação (58%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* DADOS ANTES DA CONCLUSÃO */}
            <article className="lg:col-span-5 border-t border-[#465B20]/20 pt-4 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="font-serif font-bold text-lg sm:text-xl text-[#1C1A18]">
                    Dados antes da conclusão
                  </h4>
                  <span className="font-mono text-[10px] text-[#465B20] font-bold">
                    03 / ANALYTICS
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed mb-4">
                  “Em projetos de dados, trabalhei com limpeza, transformação, análise e visualização, entendendo que uma boa conclusão depende primeiro da qualidade da informação utilizada.”
                </p>
              </div>
              <div className="pt-2 border-t border-[#465B20]/10 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#465B20] font-bold">
                  Na prática:
                </span>
                <span className="font-sans text-xs text-[#2A3614] font-medium">
                  Python, Pandas, SQL, ETL e Looker Studio.
                </span>
              </div>
            </article>

            {/* PRODUTO E OPERAÇÃO REAL */}
            <article className="lg:col-span-7 border-t border-[#465B20]/20 pt-4 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="font-serif font-bold text-lg sm:text-xl text-[#1C1A18]">
                    Produto e operação real
                  </h4>
                  <span className="font-mono text-[10px] text-[#465B20] font-bold">
                    04 / NEGÓCIO
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed mb-4">
                  “Projetos como OnVagas e a experiência na Vemari partiram de problemas observados no uso e na operação, não apenas de exercícios técnicos.”
                </p>
              </div>
              <div className="pt-2 border-t border-[#465B20]/10 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#465B20] font-bold">
                  Na prática:
                </span>
                <span className="font-sans text-xs text-[#2A3614] font-medium">
                  levantamento de necessidades, organização de requisitos, definição de fluxo e implementação.
                </span>
              </div>
            </article>
          </div>

          {/* LINHA 3: Qualidade como parte da entrega (100% largura) */}
          <article className="border-t border-[#465B20]/20 pt-4 flex flex-col justify-between bg-[#FAF8F5]/60 p-4 sm:p-5 rounded-lg">
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <h4 className="font-serif font-bold text-lg sm:text-xl text-[#1C1A18]">
                  Qualidade como parte da entrega
                </h4>
                <span className="font-mono text-[10px] text-[#465B20] font-bold">
                  05 / ENGENHARIA
                </span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed mb-4 max-w-4xl">
                “Tenho incorporado testes, validação, tratamento de erros, documentação e acessibilidade como parte da implementação, e não como acabamento posterior.”
              </p>
            </div>
            <div className="pt-2 border-t border-[#465B20]/10 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#465B20] font-bold">
                Na prática:
              </span>
              <span className="font-sans text-xs text-[#2A3614] font-medium">
                Jest, Vitest, Zod, WCAG 2.2 e documentação técnica.
              </span>
            </div>
          </article>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 06. TABS REDESENHADAS (Estilo Editorial de Publicação Impressa)           */}
      {/* ========================================================================= */}
      <div className="border-t-2 border-[#465B20] pt-6 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Navegação por Abas em Tipografia Editorial */}
          <nav
            aria-label="Categorias da Trajetória"
            className="flex items-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar w-full sm:w-auto pb-2 sm:pb-0"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative pb-2 text-left cursor-pointer transition-colors whitespace-nowrap ${
                    isActive ? "text-[#465B20]" : "text-[#4E4A45] hover:text-[#1C1A18]"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] font-semibold text-[#465B20]/80">
                      {tab.num}
                    </span>
                    <span className={`font-sans text-xs sm:text-sm tracking-wide ${isActive ? "font-bold" : "font-medium"}`}>
                      {tab.label}
                    </span>
                  </div>

                  {/* Underline fino de estado ativo */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#465B20]"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Alternador Cronológico Discreto */}
          <button
            type="button"
            onClick={() => setIsChronological((prev) => !prev)}
            className="text-[11px] font-mono text-[#465B20] hover:text-[#2A3614] border-b border-[#465B20]/30 pb-0.5 flex items-center gap-1.5 cursor-pointer transition-colors shrink-0"
            title="Alternar ordem de leitura"
          >
            <ArrowUpDown className="w-3 h-3" />
            <span>{isChronological ? "Mais antigos primeiro" : "Mais recentes primeiro"}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 07. TIMELINE EDITORIAL (Coluna de Ano + Coluna de Conteúdo Técnico)       */}
      {/* ========================================================================= */}
      <div className="divide-y divide-[#465B20]/15 mb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${isChronological ? "asc" : "desc"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col divide-y divide-[#465B20]/15"
          >
            {currentList.map((entry) => (
              <article
                key={entry.id}
                className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-start"
              >
                {/* COLUNA ESQUERDA: ÂNCORA TEMPORAL (3 cols) */}
                <div className="md:col-span-3 flex flex-col pr-2">
                  <span className="font-serif font-bold text-2xl sm:text-3xl text-[#465B20] leading-none">
                    {entry.yearDisplay}
                  </span>

                  <span className="font-mono text-[11px] text-[#4E4A45] mt-1.5 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#465B20]/70 shrink-0" />
                    <span>{entry.period}</span>
                  </span>

                  {entry.note && (
                    <span className="font-sans text-xs text-[#9E6761] mt-2 font-medium leading-tight">
                      • {entry.note}
                    </span>
                  )}
                </div>

                {/* COLUNA DIREITA: CONTEÚDO TÉCNICO & ATRIBUIÇÕES (9 cols) */}
                <div className="md:col-span-9 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1C1A18] tracking-tight mb-1">
                      {entry.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm font-semibold text-[#465B20] mb-3">
                      {entry.institution}
                    </p>

                    <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed mb-4">
                      {entry.description}
                    </p>

                    {/* Lista de Atribuições / Competências */}
                    {activeTab === "work" ? (
                      <div>
                        <h4 className="font-mono text-[10px] uppercase tracking-wider text-[#4E4A45] font-bold mb-2">
                          Atribuições & entregas:
                        </h4>
                        <ul className="flex flex-col gap-1.5">
                          {entry.items.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs sm:text-[13px] text-[#1C1A18] leading-relaxed"
                            >
                              <Check className="w-3.5 h-3.5 text-[#465B20] shrink-0 mt-1" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div>
                        <h4 className="font-mono text-[10px] uppercase tracking-wider text-[#4E4A45] font-bold mb-2">
                          Competências desenvolvidas:
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {entry.items.map((skill, idx) => (
                            <span
                              key={idx}
                              className="font-sans text-[11px] text-[#2A3614] bg-[#FAF8F5] border border-[#465B20]/25 px-2.5 py-0.5 rounded-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ========================================================================= */}
      {/* 08. TRANSIÇÃO EDITORIAL PARA A PRÓXIMA SEÇÃO (CONTATO)                    */}
      {/* ========================================================================= */}
      <footer className="pt-8 border-t border-[#465B20]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#465B20]" />
          <p className="font-serif text-sm text-[#383531] italic">
            Bases sólidas primeiro. Especialização contínua depois.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4">
          <a
            href={resumeUrl}
            download="Eduarda- Curriculo-Full-Stack(6).pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#4E4A45] hover:text-[#1C1A18] transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#465B20]" />
            <span>Baixar currículo (PDF)</span>
          </a>

          <span className="text-[#465B20]/30 hidden sm:inline">•</span>

          <a
            href="#contato"
            className="inline-flex items-center gap-1.5 font-sans text-xs font-bold text-[#465B20] hover:text-[#2A3614] border-b border-[#465B20]/30 pb-0.5 transition-colors cursor-pointer"
          >
            <span>Falar sobre contratação</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </footer>
    </section>
  );
}
