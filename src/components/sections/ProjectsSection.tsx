import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  BookOpen,
  Layers,
  Sparkles,
  Database,
  Cpu,
  Leaf,
  Flower2,
  Sprout,
  Wind,
  Play,
  Pause,
  Lock,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import type { Project } from "@/types/portfolio";
import ProjectModal from "@/components/ui/ProjectModal";
import ProjectArtwork from "@/components/ui/ProjectArtwork";


type CategoryFilter = "all" | "fullstack" | "backend" | "data_ai";

interface CategoryOption {
  id: CategoryFilter;
  label: string;
  icon: typeof Leaf;
}

const CATEGORIES: CategoryOption[] = [
  { id: "all", label: "Todos os Espécimes", icon: Sparkles },
  { id: "fullstack", label: "Full-Stack & SaaS", icon: Leaf },
  { id: "backend", label: "APIs & Microsserviços", icon: Sprout },
  { id: "data_ai", label: "Dados & IA", icon: Flower2 },
];

// Gatilhos de curiosidade botânica: O néctar de arquitetura que atrai o beija-flor em cada projeto
const CURIOSITY_HOOKS: Record<
  string,
  { question: string; metricTag: string; secretTeaser: string; stampText: string }
> = {
  onvagas: {
    question: "Como cruzar centenas de requisitos de vagas e perfis em menos de 45ms sem latência?",
    metricTag: "Resposta < 45ms & -70% tempo",
    secretTeaser: "Validação cruzada Zod compartilhada e índices btree no PostgreSQL.",
    stampText: "LATÊNCIA & ESCALA",
  },
  vendefacil: {
    question: "Como blindar o inventário contra compras simultâneas concorrentes sem travar o banco?",
    metricTag: "0 divergências sob 100 req/s",
    secretTeaser: "Clean Architecture com transações atômicas de bloqueio pessimista calibrado.",
    stampText: "CONCORRÊNCIA ATÔMICA",
  },
  "controle-planos": {
    question: "O que acontece quando o gateway de pagamento falha no meio de 10.000 cobranças recorrentes?",
    metricTag: "100% resiliência via RabbitMQ",
    secretTeaser: "Mensageria desacoplada com filas de retry e Dead-Letter Exchange (DLX).",
    stampText: "MICROSSERVIÇOS RESILIENTES",
  },
  "a11y-io": {
    question: "Como traduzir 50+ critérios da WCAG 2.2 em cenários BDD prontos para testes antes do primeiro código?",
    metricTag: "Testes BDD em minutos",
    secretTeaser: "Motor de inferência de acessibilidade digital com Clean Architecture pura.",
    stampText: "ENGENHARIA DE ACESSIBILIDADE",
  },
  "roadmap-planner": {
    question: "Como diagnosticar defasagens técnicas de um desenvolvedor e traçar a rota exata em 3 segundos?",
    metricTag: "Scoring ponderado",
    secretTeaser: "Algoritmo de scoring multicritério com arquitetura em 3 camadas modulares.",
    stampText: "ALGORITMO DE RECOMENDAÇÃO",
  },
  "capacitacao-ia": {
    question: "Como um agente autônomo de IA aprende a tomar decisões explorando um lab na USP?",
    metricTag: "Q-Learning + NLP + Visão",
    secretTeaser: "Convergência matemática de funções de recompensa e processamento multimodal.",
    stampText: "INTELIGÊNCIA ARTIFICIAL USP",
  },
  "residencia-dados": {
    question: "Como transformar bases de dados caóticas e dispersas em decisões corporativas estratégicas na PUC-Rio?",
    metricTag: "Pipelines ETL + Star Schema",
    secretTeaser: "Storytelling com dados limpos via Pandas e dashboards no Looker Studio.",
    stampText: "DATA WAREHOUSE PUC-RIO",
  },
};

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<Project | null>(null);

  // Estados de controle de movimento contínuo da brisa
  const [isPausedManual, setIsPausedManual] = useState(false);
  const [isHoveredCard, setIsHoveredCard] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Referência do trilho de rolagem contínua
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Detecção de toque para otimizar swipe nativo sem interferência da brisa contínua
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(isTouch);
    }
  }, []);

  // Filtragem dinâmica por categoria
  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return portfolioData.projects;
    return portfolioData.projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Lista duplicada para loop infinito perfeito e ininterrupto
  const duplicatedProjects = useMemo(() => {
    if (filteredProjects.length === 0) return [];
    // Duplicamos 3 vezes para garantir fluxo contínuo infinito sem gaps visuais
    return [...filteredProjects, ...filteredProjects, ...filteredProjects];
  }, [filteredProjects]);

  // Troca de categoria com reset do trilho
  const handleCategoryChange = (catId: CategoryFilter) => {
    if (catId === activeCategory) return;
    setActiveCategory(catId);
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  };

  // Movimento contínuo suave (60/120fps via requestAnimationFrame)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Desativa auto-scroll em dispositivos móveis/touch ou quando preferência de movimento reduzido está ativa
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouchDevice || prefersReducedMotion) return;

    let animationFrameId: number;
    const speed = 0.75; // velocidade contínua orgânica (brisa suave)

    const step = () => {
      const isPaused = isPausedManual || isHoveredCard || isDragging || Boolean(selectedProjectForModal);
      if (!isPaused && container) {
        container.scrollLeft += speed;

        // Loop infinito contínuo sem solavancos
        const halfWidth = container.scrollWidth / 2;
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPausedManual, isHoveredCard, isDragging, selectedProjectForModal, isTouchDevice]);

  // Cálculo dinâmico do passo de scroll (largura do card + gap real)
  const getStepWidth = useCallback(() => {
    if (!scrollRef.current) return 320;
    const firstCard = scrollRef.current.querySelector<HTMLElement>('[data-project-card="true"]');
    if (firstCard) {
      const style = window.getComputedStyle(scrollRef.current);
      const gap = parseFloat(style.columnGap || style.gap) || 16;
      return firstCard.offsetWidth + gap;
    }
    return scrollRef.current.clientWidth * 0.85;
  }, []);

  // Transições manuais 100% funcionais (botões Próximo / Anterior)
  const handleNext = useCallback(() => {
    if (scrollRef.current) {
      const step = getStepWidth();
      scrollRef.current.scrollBy({ left: step, behavior: "smooth" });
    }
  }, [getStepWidth]);

  const handlePrev = useCallback(() => {
    if (scrollRef.current) {
      const step = getStepWidth();
      scrollRef.current.scrollBy({ left: -step, behavior: "smooth" });
    }
  }, [getStepWidth]);

  // Atalhos de teclado (setas ← / →)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProjectForModal || document.activeElement?.tagName === "INPUT") return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, selectedProjectForModal]);

  // Drag & Swipe com mouse para transição livre
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isMouseDownRef.current = true;
    setIsDragging(true);
    startXRef.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDownRef.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.4;
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (isMouseDownRef.current) {
      isMouseDownRef.current = false;
      setIsDragging(false);
    }
  };

  return (
    <section id="projetos" className="w-full py-4 md:py-6 px-3 sm:px-6 md:px-8 max-w-7xl mx-auto scroll-mt-20 overflow-hidden">
      {/* Cabeçalho Editorial */}
      <div className="text-center max-w-2xl mx-auto mb-4 md:mb-6 relative z-20">
        <h2 className="font-serif font-light text-2xl sm:text-3xl lg:text-4xl text-[#1C1A18] tracking-tight inline-block bg-[#F7F6F2] px-6 py-1 rounded-full">
          Projetos em{" "}
          <span
            className="text-3xl sm:text-4xl lg:text-5xl text-[#9E6761] select-none inline-block ml-1"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Produção
          </span>
        </h2>
      </div>

      {/* Seletor de Categorias com Scroll Suave no Mobile */}
      <div className="w-full flex items-center justify-center mb-4 md:mb-5">
        <div className="max-w-full overflow-x-auto no-scrollbar py-1 px-1">
          <div className="inline-flex items-center p-1.5 rounded-full bg-[#FAF8F5] border border-[#465B20]/30 shadow-xs gap-1 sm:gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const count =
                cat.id === "all"
                  ? portfolioData.projects.length
                  : portfolioData.projects.filter((p) => p.category === cat.id).length;
              const isSelected = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`relative px-3 sm:px-4 py-1.5 min-h-[38px] rounded-full text-xs font-sans transition-all duration-300 cursor-pointer flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
                    isSelected
                      ? "bg-[#465B20] text-[#F7F6F2] font-semibold shadow-xs"
                      : "text-[#383531] hover:text-[#1C1A18] hover:bg-[#465B20]/15 font-medium"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-[#F7F6F2]" : "text-[#465B20]"}`} />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isSelected ? "bg-white/25 text-[#F7F6F2]" : "bg-[#465B20]/15 text-[#2A3614] font-semibold"
                    }`}
                  >
                    {String(count).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Controles Florais de Navegação no Topo do Trilho */}
      <div className="flex items-center justify-between gap-2 mb-2 px-2">
        {/* Botão de Controle da Brisa Contínua */}
        <button
          type="button"
          onClick={() => setIsPausedManual((prev) => !prev)}
          className="px-3.5 py-2 min-h-[38px] rounded-full border border-[#465B20]/35 bg-[#FAF8F5] hover:bg-[#465B20] hover:text-[#F7F6F2] text-[#2A3614] text-xs font-sans font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
        >
          {isPausedManual ? (
            <>
              <Play className="w-3.5 h-3.5 ml-0.5" />
              <span>Retomar Brisa</span>
            </>
          ) : (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>Pausar Brisa</span>
            </>
          )}
        </button>

        {/* Setas de Transição Imediata (Próximo / Anterior) */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#2A3614] font-semibold hidden sm:inline">
            Transição rápida:
          </span>
          <button
            type="button"
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-[#465B20]/35 bg-[#FAF8F5] hover:bg-[#465B20] hover:text-[#F7F6F2] text-[#1C1A18] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            aria-label="Transicionar prancha anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-[#465B20]/35 bg-[#FAF8F5] hover:bg-[#465B20] hover:text-[#F7F6F2] text-[#1C1A18] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            aria-label="Transicionar próxima prancha"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Trilho de Movimento Contínuo & Arrasto Livre */}
      <div className="relative w-full py-2">
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto no-scrollbar py-3 px-2 cursor-grab active:cursor-grabbing select-none snap-x snap-mandatory md:snap-none"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {duplicatedProjects.map((project, idx) => {
            const hook = CURIOSITY_HOOKS[project.id] || {
              question: "Como este software desabrochou uma solução de alta performance?",
              metricTag: "Alta Performance & Clean Architecture",
              secretTeaser: "Decisões de engenharia documentadas em detalhes.",
              stampText: "ESTUDO DE CASO",
            };

            return (
              <div
                key={`${project.id}-card-${idx}`}
                data-project-card="true"
                onMouseEnter={() => setIsHoveredCard(true)}
                onMouseLeave={() => setIsHoveredCard(false)}
                onClick={() => setSelectedProjectForModal(project)}
                className="relative w-[86vw] max-w-[340px] sm:w-[350px] md:w-[380px] h-auto min-h-[490px] sm:min-h-[520px] shrink-0 snap-center md:snap-align-none rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#465B20]/30 hover:border-[#465B20]/60 bg-[#FAF8F5] texture-paper shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between p-4 sm:p-5 group cursor-pointer"
              >
                {/* Topo do Card: Tag de Categoria e Numeração */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-1.5 bg-white border border-[#465B20]/30 px-3 py-1 rounded-full text-[9px] font-sans text-[#2A3614] font-bold uppercase tracking-wider shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#465B20]" />
                    {project.category.toUpperCase()}
                  </div>

                  <span className="font-mono text-xs font-bold text-[#465B20] bg-white border border-[#465B20]/25 px-2.5 py-0.5 rounded-full shadow-2xs">
                    #0{(idx % filteredProjects.length) + 1}
                  </span>
                </div>

                {/* Área de Arte & Desenhos Representativos do Projeto */}
                <div className="w-full h-40 sm:h-48 my-2 rounded-2xl overflow-hidden border border-[#465B20]/20 shadow-2xs relative group-hover:scale-[1.02] transition-transform duration-500 shrink-0">
                  <ProjectArtwork projectId={project.id} category={project.category} />
                </div>

                {/* Informações Editoriais: Nome Cursivo, Subtítulo, Desafio & Tags */}
                <div className="flex flex-col gap-2 z-10 flex-1 justify-between">
                  {/* Título em Fonte Cursiva e Subtítulo */}
                  <div className="flex flex-col">
                    <h3
                      className="text-3xl sm:text-4xl text-[#1C1A18] tracking-normal leading-none group-hover:text-[#465B20] transition-colors select-none line-clamp-1 drop-shadow-2xs"
                      style={{ fontFamily: "'Great Vibes', cursive" }}
                    >
                      {project.title}
                    </h3>
                    {project.subtitle && (
                      <p className="font-sans text-[11px] sm:text-xs text-[#556B2F] font-bold line-clamp-1 mt-1">
                        {project.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Caixa de Desafio Técnico */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProjectForModal(project);
                    }}
                    className="p-2 sm:p-2.5 rounded-xl bg-white border border-[#465B20]/20 hover:border-[#465B20]/45 transition-colors group/hook shadow-2xs"
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#465B20] font-bold">
                        // DESAFIO TÉCNICO
                      </span>
                      <span className="text-[9px] font-sans font-semibold text-[#2A3614] bg-[#465B20]/15 border border-[#465B20]/25 px-2 py-0.2 rounded-full">
                        Destaque
                      </span>
                    </div>

                    <p className="font-serif italic text-xs text-[#1C1A18] font-semibold leading-snug line-clamp-2">
                      "{hook.question}"
                    </p>

                    <div className="flex items-center justify-between gap-2 mt-1.5 pt-1 border-t border-[#465B20]/15 text-[10px] font-sans text-[#383531]">
                      <span className="font-semibold truncate text-[#465B20]">{hook.metricTag}</span>
                      <span className="font-sans font-bold text-xs text-[#9E6761] shrink-0 group-hover/hook:translate-x-1 transition-transform">
                        Ver detalhes ➜
                      </span>
                    </div>
                  </div>

                  {/* Tags Tecnológicas */}
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-white border border-[#465B20]/25 text-[#2A3614] font-semibold shadow-2xs"
                      >
                        #{tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-md text-[#465B20] font-bold">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Botões de Ação na Base */}
                  <div className="pt-2 border-t border-[#465B20]/20 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProjectForModal(project);
                      }}
                      className="flex-1 py-2.5 px-3 min-h-[44px] rounded-full bg-[#465B20] hover:bg-[#344516] text-[#F7F6F2] font-sans font-semibold text-xs tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-98"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Ver Estudo de Caso</span>
                    </button>

                    {project.githubUrl && project.githubUrl !== "#" && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[#465B20]/30 bg-white hover:bg-[#1C1A18] hover:text-[#F7F6F2] text-[#1C1A18] transition-all cursor-pointer shadow-2xs flex items-center justify-center active:scale-95"
                        title="Repositório GitHub"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {project.demoUrl && project.demoUrl !== "#" && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[#465B20]/30 bg-white hover:bg-[#465B20] hover:text-[#F7F6F2] text-[#465B20] transition-all cursor-pointer shadow-2xs flex items-center justify-center active:scale-95"
                        title="Acessar Aplicação"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal de Estudo de Caso (Deep Dive) */}
      <ProjectModal
        project={selectedProjectForModal}
        isOpen={Boolean(selectedProjectForModal)}
        onClose={() => setSelectedProjectForModal(null)}
      />
    </section>
  );
}
