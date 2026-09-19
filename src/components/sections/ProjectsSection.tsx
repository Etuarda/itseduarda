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


type CategoryFilter = "all" | "fullstack" | "backend" | "dados" | "ia";

interface CategoryOption {
  id: CategoryFilter;
  label: string;
  icon: typeof Leaf;
}

const CATEGORIES: CategoryOption[] = [
  { id: "all", label: "Todos", icon: Sparkles },
  { id: "fullstack", label: "Full Stack", icon: Leaf },
  { id: "backend", label: "Back-end", icon: Sprout },
  { id: "dados", label: "Dados", icon: Database },
  { id: "ia", label: "IA", icon: Flower2 },
];

// Gatilhos de curiosidade técnica por projeto
const CURIOSITY_HOOKS: Record<
  string,
  { question: string; metricTag: string; secretTeaser: string; stampText: string }
> = {
  onvagas: {
    question: "Como organizar candidaturas sem transformar o processo em mais uma tarefa manual?",
    metricTag: "Matching estruturado & < 45ms",
    secretTeaser: "Lógica auditável antes de IA generativa com Zod e PostgreSQL.",
    stampText: "FULL STACK • SAAS",
  },
  vendefacil: {
    question: "Como fazer uma IA responder com base em evidências, e não apenas em probabilidade?",
    metricTag: "5.714 chunks & 95 testes",
    secretTeaser: "Recuperação híbrida FAISS + BM25, fusão por RRF e guardrails.",
    stampText: "IA GENERATIVA • RAG",
  },
  "controle-planos": {
    question: "Sistemas desacoplados para responsabilidades que precisam evoluir separadamente.",
    metricTag: "Comunicação por RabbitMQ",
    secretTeaser: "Desacoplamento assíncrono com Redis, PostgreSQL e Docker Compose.",
    stampText: "BACK-END • ARQUITETURA",
  },
  "a11y-io": {
    question: "E se acessibilidade entrasse no requisito antes de chegar à interface?",
    metricTag: "Critérios WCAG 2.2 & BDD",
    secretTeaser: "Clean Architecture para tratar acessibilidade como requisito de qualidade.",
    stampText: "ACESSIBILIDADE • ENGENHARIA",
  },
  "roadmap-planner": {
    question: "Estudar mais não significa necessariamente estudar o que falta.",
    metricTag: "Diagnóstico por regras claras",
    secretTeaser: "Motor de recomendação determinístico e validação compartilhada com Zod.",
    stampText: "FULL STACK • REGRAS",
  },
  "residencia-dados": {
    question: "Uma análise confiável começa antes do dashboard.",
    metricTag: "Python + Pandas + SQL",
    secretTeaser: "Pipelines de ETL de higienização prévia para tomadas de decisão seguras.",
    stampText: "DADOS • ETL",
  },
  "capacitacao-ia": {
    question: "Antes de trabalhar com IA generativa, eu quis entender outras formas de aprendizado de máquina.",
    metricTag: "360h de imersão técnica",
    secretTeaser: "Experimentos práticos em Classificação, Regressão, Visão e Reinforcement Learning.",
    stampText: "MACHINE LEARNING • IA",
  },
  vemari: {
    question: "Tecnologia precisa conversar com a operação real da empresa.",
    metricTag: "Operação & DNS corporativo",
    secretTeaser: "Conectando sistemas, processos e comunicação à rotina real de negócio.",
    stampText: "WEB • NEGÓCIO",
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
    <section id="projetos" className="w-full py-8 sm:py-12 md:py-16 px-3 sm:px-6 md:px-8 max-w-7xl mx-auto scroll-mt-20 overflow-hidden">
      {/* Cabeçalho Editorial (EPIC 07) */}
      <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8 relative z-20">
        <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-white border border-[#465B20]/30 shadow-2xs">
          <span className="text-[#465B20] text-xs">✦</span>
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#2A3614] font-bold">
            PROJETOS & ESTUDOS DE CASO
          </span>
          <span className="text-[#9E6761] text-xs">✦</span>
        </div>

        <h2
          className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-[#1C1A18] tracking-tight leading-tight"
          style={{ textWrap: "balance" }}
        >
          O código mostra o que foi construído. O estudo de caso mostra como cheguei até lá.
        </h2>

        <p className="font-sans text-xs sm:text-sm md:text-base text-[#383531] mt-3 max-w-2xl mx-auto leading-relaxed">
          Aqui você encontra problemas diferentes que exigiram decisões diferentes. Cada projeto apresenta{" "}
          <strong className="text-[#1C1A18] font-semibold">
            contexto, desafio, implicações e solução
          </strong>, além das tecnologias utilizadas.
        </p>
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

      {/* Controles de Navegação no Topo do Trilho */}
      <div className="flex items-center justify-between gap-2 mb-2 px-2">
        {/* Botão de Controle do Movimento */}
        <button
          type="button"
          onClick={() => setIsPausedManual((prev) => !prev)}
          className="px-3.5 py-2 min-h-[38px] rounded-full border border-[#465B20]/35 bg-[#FAF8F5] hover:bg-[#465B20] hover:text-[#F7F6F2] text-[#2A3614] text-xs font-sans font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
          aria-label={isPausedManual ? "Retomar movimento" : "Pausar movimento"}
        >
          {isPausedManual ? (
            <>
              <Play className="w-3.5 h-3.5 ml-0.5" />
              <span>Retomar movimento</span>
            </>
          ) : (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>Pausar movimento</span>
            </>
          )}
        </button>

        {/* Setas de Transição (Anterior / Próximo) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-[#465B20]/35 bg-[#FAF8F5] hover:bg-[#465B20] hover:text-[#F7F6F2] text-[#1C1A18] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            aria-label="Projeto anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-[#465B20]/35 bg-[#FAF8F5] hover:bg-[#465B20] hover:text-[#F7F6F2] text-[#1C1A18] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            aria-label="Próximo projeto"
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
                      <span>Ver estudo de caso</span>
                    </button>

                    {project.githubUrl && project.githubUrl !== "#" && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[#465B20]/30 bg-white hover:bg-[#1C1A18] hover:text-[#F7F6F2] text-[#1C1A18] transition-all cursor-pointer shadow-2xs flex items-center justify-center active:scale-95"
                        title="Ver código"
                        aria-label={`Ver código do projeto ${project.title} no GitHub`}
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
                        title="Abrir aplicação"
                        aria-label={`Abrir demonstração do projeto ${project.title}`}
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

      {/* Empty State (EPIC 39) */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12 px-6 rounded-3xl bg-white border border-[#465B20]/25 my-6 max-w-md mx-auto shadow-xs">
          <h3 className="font-serif font-bold text-lg text-[#1C1A18] mb-2">
            Nenhum projeto nesta categoria ainda.
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#383531] mb-5 leading-relaxed">
            Você pode explorar as outras áreas do portfólio.
          </p>
          <button
            type="button"
            onClick={() => handleCategoryChange("all")}
            className="px-5 py-2.5 rounded-full bg-[#465B20] hover:bg-[#2A3614] text-[#F7F6F2] text-xs font-sans font-semibold uppercase tracking-wider cursor-pointer transition-colors shadow-xs"
          >
            Ver todos os projetos
          </button>
        </div>
      )}

      {/* Modal de Estudo de Caso (Deep Dive) */}
      <ProjectModal
        project={selectedProjectForModal}
        isOpen={Boolean(selectedProjectForModal)}
        onClose={() => setSelectedProjectForModal(null)}
      />
    </section>
  );
}
