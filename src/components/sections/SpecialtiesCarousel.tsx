import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, Layers, Cpu, Database, BrainCircuit, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import frontenderImg from "@/components/assets/frontender.png";
import backendImg from "@/components/assets/backend.png";
import dadosImg from "@/components/assets/dados.png";
import iaImg from "@/components/assets/ia.png";

type StackPillar = {
  id: string;
  number: string;
  shortTitle: string;
  fullTitle: string;
  tagline: string;
  image: string;
  tools: string[];
  concepts: string[];
  description: string;
  closingQuote: string;
  icon: React.ReactNode;
};

const stackPillars: StackPillar[] = [
  {
    id: "frontend",
    number: "01",
    shortTitle: "Front-End",
    fullTitle: "Interfaces claras para quem usa e para quem mantém.",
    tagline: "“A interface é onde a arquitetura encontra o usuário.”",
    image: frontenderImg,
    tools: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "React Router"],
    concepts: ["Componentização", "Responsividade", "Acessibilidade", "WCAG 2.2", "Integração com APIs"],
    description:
      "Interfaces confusas aumentam esforço, erros e abandono. Por isso, trabalho com componentização, responsividade, estados previsíveis, integração com APIs e acessibilidade desde o início.",
    closingQuote: "A interface é onde a arquitetura encontra o usuário.",
    icon: <Layers className="w-4 h-4 text-[#465B20]" />,
  },
  {
    id: "backend",
    number: "02",
    shortTitle: "Back-End",
    fullTitle: "APIs que continuam compreensíveis quando o sistema cresce.",
    tagline: "“A próxima mudança também precisa ser segura.”",
    image: backendImg,
    tools: ["Node.js", "TypeScript", "Express", "Fastify", "PostgreSQL", "Prisma", "Redis", "RabbitMQ", "Docker"],
    concepts: ["REST APIs", "Clean Architecture", "SOLID", "JWT", "Zod", "Swagger"],
    description:
      "À medida que um produto evolui, surgem novas regras, validações, integrações e dependências. Sem organização, cada nova funcionalidade aumenta o risco de afetar outras partes do sistema. Por isso, estruturo o back-end com responsabilidades bem definidas, contratos claros, validação e tratamento consistente de erros.",
    closingQuote: "A próxima mudança também precisa ser segura.",
    icon: <Cpu className="w-4 h-4 text-[#465B20]" />,
  },
  {
    id: "dados",
    number: "03",
    shortTitle: "Dados",
    fullTitle: "Dados só ajudam quando conseguimos transformá-los em informação.",
    tagline: "“Organizar primeiro. Perguntar melhor depois.”",
    image: dadosImg,
    tools: ["Python", "Pandas", "SQL", "PostgreSQL", "Jupyter", "Looker Studio"],
    concepts: ["ETL", "Limpeza de dados", "Análise exploratória", "KPIs", "Visualização", "Storytelling com dados"],
    description:
      "Dados inconsistentes ou mal organizados comprometem qualquer análise posterior. Trabalho com tratamento, exploração, transformação e visualização para tornar informações mais confiáveis e úteis.",
    closingQuote: "Organizar primeiro. Perguntar melhor depois.",
    icon: <Database className="w-4 h-4 text-[#465B20]" />,
  },
  {
    id: "ia",
    number: "04",
    shortTitle: "IA Aplicada",
    fullTitle: "Uma resposta convincente não basta. Ela precisa ter fundamento.",
    tagline: "“Mais capacidade sem abrir mão de controle.”",
    image: iaImg,
    tools: ["Python", "FAISS", "BM25", "RRF", "Pydantic", "LLMs"],
    concepts: ["RAG", "Embeddings", "Recuperação híbrida", "Filtros por metadados", "Guardrails", "Avaliação"],
    description:
      "Modelos generativos podem errar, extrapolar contexto ou responder algo que nunca esteve na fonte. Por isso, meu interesse também está na engenharia ao redor do modelo: recuperação, contexto, avaliação, guardrails e rastreabilidade.",
    closingQuote: "Mais capacidade sem abrir mão de controle.",
    icon: <BrainCircuit className="w-4 h-4 text-[#465B20]" />,
  },
];

export default function SpecialtiesCarousel() {
  const [activePillar, setActivePillar] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const touchStartXRef = useRef<number>(0);
  const touchEndXRef = useRef<number>(0);
  const pauseTimerRef = useRef<number | null>(null);

  // Auto-avanço contínuo do carrossel de stacks (a cada 4.8s quando não interagido)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActivePillar((prev) => (prev + 1) % stackPillars.length);
    }, 4800);

    return () => clearInterval(interval);
  }, [isPaused]);

  const pauseTemporarily = (duration = 5000) => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = window.setTimeout(() => {
      setIsPaused(false);
    }, duration);
  };

  const goToNext = () => {
    pauseTemporarily(6000);
    setActivePillar((prev) => (prev + 1) % stackPillars.length);
  };

  const goToPrev = () => {
    pauseTemporarily(6000);
    setActivePillar((prev) => (prev - 1 + stackPillars.length) % stackPillars.length);
  };

  // Suporte a swipe de toque no mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    pauseTemporarily(6000);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (diff > 40) {
      goToNext();
    } else if (diff < -40) {
      goToPrev();
    }
  };

  return (
    <section id="stacks" className="w-full py-8 sm:py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20 relative">
      {/* Alias de navegação retrocompatível */}
      <div id="the-edits" className="absolute -top-20" />

      {/* Cabeçalho Editorial (Seção 18 & 45 do Guia Mestre) */}
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 relative z-20">
        <div className="inline-flex items-center mb-2 px-3.5 py-1 rounded-full bg-white border border-[#465B20]/30 shadow-2xs">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.20em] text-[#2A3614] font-bold">
            BASE TÉCNICA
          </span>
        </div>

        <h2
          className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-[#1C1A18] tracking-tight leading-tight"
          style={{ textWrap: "balance" }}
        >
          Tecnologias diferentes. Um mesmo objetivo: construir melhor.
        </h2>

        <p className="font-sans text-xs sm:text-sm md:text-base text-[#383531] mt-3 max-w-2xl mx-auto leading-relaxed">
          Não escolho uma ferramenta apenas porque ela está em alta. Procuro entender{" "}
          <strong className="text-[#1C1A18] font-semibold">
            qual responsabilidade ela assume dentro da solução, quais problemas resolve e quais impactos essa escolha pode trazer depois.
          </strong>
        </p>
      </div>

      {/* Controles do Carrossel de Stacks (Navegação Rápida & Gestos) */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-5 max-w-5xl mx-auto px-1">
        {/* Pills de Seleção Rápida */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
          {stackPillars.map((pillar, idx) => {
            const isActive = activePillar === idx;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => {
                  pauseTemporarily(6000);
                  setActivePillar(idx);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-sans font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#465B20] text-[#F7F6F2] shadow-xs"
                    : "bg-[#FAF8F5] border border-[#465B20]/25 text-[#4E4A45] hover:border-[#465B20]/45 hover:text-[#1C1A18]"
                }`}
                aria-label={`Ver especialidade ${pillar.shortTitle}`}
              >
                <span className="font-mono text-[10px] font-bold opacity-80">{pillar.number}</span>
                <span>{pillar.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Controles de Navegação (Setas Anterior/Próximo e Contador) */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="font-mono text-xs font-bold text-[#465B20]">
            0{activePillar + 1} / 0{stackPillars.length}
          </span>
          <button
            type="button"
            onClick={goToPrev}
            className="w-8 h-8 rounded-full border border-[#465B20]/30 bg-[#FAF8F5] hover:bg-[#465B20] hover:text-[#F7F6F2] text-[#1C1A18] flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
            aria-label="Especialidade anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="w-8 h-8 rounded-full border border-[#465B20]/30 bg-[#FAF8F5] hover:bg-[#465B20] hover:text-[#F7F6F2] text-[#1C1A18] flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
            aria-label="Próxima especialidade"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Carrossel em Acordeão */}
      <div
        className="flex flex-col md:flex-row gap-3 md:gap-3.5 w-full h-auto md:h-[560px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {stackPillars.map((pillar, index) => {
          const isExpanded = activePillar === index;

          return (
            <div
              key={pillar.id}
              className={`relative rounded-2xl md:rounded-3xl border border-[#465B20]/30 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
                isExpanded
                  ? "w-full md:w-auto md:flex-[4.2] flex-none h-auto md:h-full bg-[#FAF8F5] shadow-[0_15px_35px_-10px_rgba(70,91,32,0.18)] border-[#465B20]/50 texture-scanner"
                  : "w-full md:w-auto md:flex-1 flex-none h-[58px] sm:h-[62px] md:h-full bg-[#FAF8F5] hover:bg-white hover:border-[#465B20]/45"
              }`}
              onMouseEnter={() => {
                if (typeof window !== "undefined" && window.innerWidth >= 768 && window.matchMedia("(hover: hover)").matches) {
                  setActivePillar(index);
                }
              }}
            >
              {/* FACHADA RECOLHIDA */}
              {!isExpanded && (
                <button
                  type="button"
                  id={`stack-trigger-${pillar.id}`}
                  aria-expanded={false}
                  aria-controls={`stack-panel-${pillar.id}`}
                  aria-label={`Expandir stack ${pillar.fullTitle}`}
                  onClick={() => {
                    pauseTemporarily(6000);
                    setActivePillar(index);
                  }}
                  className="w-full h-full min-h-[58px] sm:min-h-[62px] flex md:flex-col items-center justify-between p-3.5 sm:p-5 select-none relative overflow-hidden group cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#465B20] active:bg-white/80"
                >
                  <img
                    src={pillar.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover opacity-25 grayscale group-hover:opacity-40 group-hover:scale-105 transition-all duration-500 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-[#FAF8F5]/80 group-hover:bg-[#FAF8F5]/70 transition-colors pointer-events-none" />

                  {/* Número */}
                  <div className="relative z-10 flex items-center gap-2 md:flex-col">
                    <span className="font-serif font-black text-xl sm:text-2xl text-[#465B20]">
                      {pillar.number}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#465B20]/45 hidden md:block" />
                  </div>

                  {/* Título Rotacionado no Desktop */}
                  <div className="relative z-10 hidden md:flex flex-1 items-center justify-center my-4">
                    <span className="[writing-mode:vertical-rl] rotate-180 font-serif font-bold text-base text-[#1C1A18] tracking-widest uppercase">
                      {pillar.shortTitle}
                    </span>
                  </div>

                  {/* Título Horizontal no Mobile */}
                  <div className="relative z-10 md:hidden flex items-center gap-2">
                    <span className="font-serif font-bold text-sm text-[#1C1A18]">
                      {pillar.shortTitle}
                    </span>
                  </div>

                  {/* Ícone */}
                  <div className="relative z-10 flex items-center gap-1.5 text-[#465B20]">
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-wider hidden md:block opacity-75">
                      Expandir
                    </span>
                    <Maximize2 className="w-4 h-4 text-[#465B20] group-hover:scale-110 transition-transform" />
                  </div>
                </button>
              )}

              {/* CONTEÚDO EXPANDIDO */}
              {isExpanded && (
                <motion.div
                  id={`stack-panel-${pillar.id}`}
                  role="region"
                  aria-labelledby={`stack-trigger-${pillar.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-auto md:h-full flex flex-col lg:flex-row overflow-hidden relative"
                >
                  <div className="scanner-beam" />

                  {/* Foto da Especialidade: Imagem limpa sem distorções */}
                  <div className="w-full lg:w-[42%] h-auto max-h-[55svh] lg:max-h-none lg:h-full shrink-0 relative overflow-hidden bg-[#FAF8F5] flex items-center justify-center p-2 sm:p-3 lg:p-0">
                    <img
                      src={pillar.image}
                      alt={pillar.fullTitle}
                      className="w-full h-auto max-h-[55svh] lg:h-full lg:max-h-none object-contain lg:object-cover object-center group-hover:scale-102 transition-transform duration-700"
                    />
                  </div>

                  {/* Especificações Técnicas e Conceitos */}
                  <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col justify-between md:overflow-y-auto no-scrollbar relative z-10">
                    <div>
                      {/* Tag e Número */}
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="font-serif font-black text-2xl sm:text-3xl text-[#465B20]">
                          {pillar.number}
                        </span>
                        <span className="text-[#4E4A45] text-xs">•</span>
                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#2A3614] font-bold px-2.5 py-0.5 rounded-full bg-[#465B20]/15 border border-[#465B20]/25">
                          {pillar.shortTitle}
                        </span>
                      </div>

                      {/* Título */}
                      <h3 className="font-serif font-bold text-lg sm:text-xl md:text-2xl text-[#1C1A18] tracking-tight leading-snug">
                        {pillar.fullTitle}
                      </h3>

                      <p className="font-sans text-xs sm:text-sm text-[#383531] font-normal leading-relaxed my-3">
                        {pillar.description}
                      </p>

                      {/* Práticas / Conceitos */}
                      <div className="mb-3">
                        <span className="font-sans text-[10px] uppercase tracking-wider text-[#4E4A45] font-bold block mb-1.5">
                          Práticas & Arquitetura:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {pillar.concepts.map((concept) => (
                            <span
                              key={concept}
                              className="bg-white border border-[#465B20]/25 text-[#1C1A18] font-sans text-[11px] font-medium px-2.5 py-0.5 rounded-md shadow-2xs"
                            >
                              {concept}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Stack / Ferramentas */}
                      <div>
                        <span className="font-sans text-[10px] uppercase tracking-wider text-[#4E4A45] font-bold block mb-1.5">
                          Tecnologias:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {pillar.tools.map((tool) => (
                            <span
                              key={tool}
                              className="bg-white border border-[#465B20]/30 text-[#2A3614] font-mono text-[10px] px-2 py-0.5 rounded-md font-semibold shadow-2xs"
                            >
                              #{tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Fechamento do Card */}
                    <div className="mt-4 pt-3 border-t border-[#465B20]/20 flex flex-wrap items-center justify-between gap-2.5 text-xs font-sans text-[#4E4A45]">
                      <span className="font-serif italic text-xs sm:text-sm text-[#465B20] font-semibold">
                        “{pillar.closingQuote}”
                      </span>

                      <span className="font-mono text-[10px] text-[#4E4A45] shrink-0 font-bold">
                        FAIXA {pillar.number} / 04
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA Final de Stacks (EPIC 06) */}
      <div className="mt-8 text-center">
        <a
          href="#projetos"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#465B20] hover:bg-[#2A3614] text-[#F7F6F2] font-sans font-semibold text-xs sm:text-sm uppercase tracking-[0.14em] transition-all shadow-xs active:scale-98 cursor-pointer"
        >
          Ver essas tecnologias em projetos reais <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
