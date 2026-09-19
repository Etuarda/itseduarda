import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, Layers, Cpu, Database, BrainCircuit, Maximize2 } from "lucide-react";
import frontenderImg from "@/components/assets/frontender.png";
import backendImg from "@/components/assets/backend.png";
import dadosImg from "@/components/assets/dados.png";
import iaImg from "@/components/assets/ia.png";
import renda1 from "@/components/assets/renda.png";
import renda2 from "@/components/assets/renda2.png";
import renda3 from "@/components/assets/renda3.png";
import renda4 from "@/components/assets/renda4.png";

type StackPillar = {
  id: string;
  number: string;
  shortTitle: string;
  fullTitle: string;
  tagline: string;
  image: string;
  frame: string;
  isOval?: boolean;
  tools: string[];
  concepts: string[];
  description: string;
  icon: React.ReactNode;
};

const stackPillars: StackPillar[] = [
  {
    id: "frontend",
    number: "01",
    shortTitle: "Front-End",
    fullTitle: "Front-End & UI/UX Design",
    tagline: "“Interfaces acessíveis, reativas e com estética editorial”",
    image: frontenderImg,
    frame: renda1,
    isOval: false,
    tools: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Zod", "Framer Motion"],
    concepts: ["Design Systems", "Acessibilidade WCAG 2.2", "Componentização Modular", "Clean UI"],
    description:
      "Construção de SPAs dinâmicas e de alto desempenho combinando arquitetura modular, tipagem estrita de ponta a ponta e aderência rigorosa a padrões de usabilidade.",
    icon: <Layers className="w-4 h-4 text-[#556B2F]" />,
  },
  {
    id: "backend",
    number: "02",
    shortTitle: "Back-End",
    fullTitle: "Back-End & Microsserviços",
    tagline: "“Sistemas distribuídos resilientes e fluxos assíncronos”",
    image: backendImg,
    frame: renda2,
    isOval: false,
    tools: ["Node.js", "Express", "TypeScript", "PostgreSQL", "Docker", "RabbitMQ", "Redis"],
    concepts: ["Clean Architecture", "Mensageria Assíncrona", "Autenticação JWT", "Prisma ORM"],
    description:
      "Engenharia de APIs RESTful escaláveis, orquestração de containers com Docker Compose, filas com RabbitMQ e cache de baixa latência em Redis.",
    icon: <Cpu className="w-4 h-4 text-[#556B2F]" />,
  },
  {
    id: "dados",
    number: "03",
    shortTitle: "Dados",
    fullTitle: "Engenharia & Ciência de Dados",
    tagline: "“Saneamento, pipelines de ETL e decisões inteligentes”",
    image: dadosImg,
    frame: renda3,
    isOval: false,
    tools: ["Python", "Pandas", "PostgreSQL", "Looker Studio", "Jupyter", "ETL Pipelines"],
    concepts: ["Tratamento de Dados", "Storytelling com Dados", "Modelagem Star Schema", "Dashboards"],
    description:
      "Extração, saneamento e consolidação de grandes bases de dados dispersas. Criação de métricas de negócio e relatórios de inteligência no Looker Studio.",
    icon: <Database className="w-4 h-4 text-[#556B2F]" />,
  },
  {
    id: "ia",
    number: "04",
    shortTitle: "IA & RAG",
    fullTitle: "Inteligência Artificial & Agentes",
    tagline: "“Modelos preditivos, agentes autônomos e busca semântica”",
    image: iaImg,
    frame: renda4,
    isOval: true,
    tools: ["Python", "Scikit-Learn", "OpenCV", "LangChain/RAG", "IBM SkillsBuild", "Colab"],
    concepts: ["RAG (Busca Semântica)", "Agentes Autônomos", "Classificação Supervisionada", "PLN & Visão"],
    description:
      "Capacitação técnica nacional de 360 horas pela USP/FDTE e imersão em Agentes de IA pela IBM, focada em aplicar IA generativa para resolver gargalos reais.",
    icon: <BrainCircuit className="w-4 h-4 text-[#556B2F]" />,
  },
];

export default function SpecialtiesCarousel() {
  const [activePillar, setActivePillar] = useState<number>(0);

  return (
    <section id="stacks" className="w-full py-4 md:py-6 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20 relative">
      {/* Alias de navegação retrocompatível */}
      <div id="the-edits" className="absolute -top-20" />

      {/* Cabeçalho Editorial Limpo com Contraste Tipográfico Cruzado */}
      <div className="text-center max-w-2xl mx-auto mb-3 md:mb-5 relative z-20">
        <h2 className="font-serif font-light text-2xl sm:text-3xl lg:text-4xl text-[#1C1A18] tracking-tight inline-block bg-[#F7F6F2] px-6 py-1 rounded-full">
          Stacks &{" "}
          <span
            className="text-3xl sm:text-4xl lg:text-5xl text-[#9E6761] select-none inline-block ml-1"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Arquitetura
          </span>
        </h2>
      </div>

      {/* Carrossel em Acordeão (Accordion Carousel / Accordion Slider) */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-3.5 w-full h-auto md:h-[540px]">
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
              {/* FACHADA RECOLHIDA (GOMO ESTREITO - DESKTOP & MOBILE BUTTON ACIONÁVEL) */}
              {!isExpanded && (
                <button
                  type="button"
                  id={`stack-trigger-${pillar.id}`}
                  aria-expanded={false}
                  aria-controls={`stack-panel-${pillar.id}`}
                  onClick={() => setActivePillar(index)}
                  className="w-full h-full min-h-[58px] sm:min-h-[62px] flex md:flex-col items-center justify-between p-3.5 sm:p-5 select-none relative overflow-hidden group cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#465B20] active:bg-white/80"
                >
                  {/* Fundo com foto ocupando toda a altura do card */}
                  <img
                    src={pillar.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover opacity-25 grayscale group-hover:opacity-40 group-hover:scale-105 transition-all duration-500 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-[#FAF8F5]/80 group-hover:bg-[#FAF8F5]/70 transition-colors pointer-events-none" />

                  {/* Número no Topo */}
                  <div className="relative z-10 flex items-center gap-2 md:flex-col">
                    <span className="font-serif font-black text-xl sm:text-2xl text-[#465B20]">
                      {pillar.number}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#465B20]/45 hidden md:block" />
                  </div>

                  {/* Título Rotacionado Verticalmente no Desktop */}
                  <div className="relative z-10 hidden md:flex flex-1 items-center justify-center my-4">
                    <span className="[writing-mode:vertical-rl] rotate-180 font-serif font-bold text-base text-[#1C1A18] tracking-widest uppercase">
                      {pillar.shortTitle}
                    </span>
                  </div>

                  {/* Título Horizontal no Mobile */}
                  <div className="relative z-10 md:hidden flex items-center gap-2">
                    <span className="font-serif font-bold text-sm text-[#1C1A18]">
                      {pillar.fullTitle}
                    </span>
                  </div>

                  {/* Ícone e Botão de Expansão */}
                  <div className="relative z-10 flex items-center gap-1.5 text-[#465B20]">
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-wider hidden md:block opacity-75">
                      Expandir
                    </span>
                    <Maximize2 className="w-4 h-4 text-[#465B20] group-hover:scale-110 transition-transform" />
                  </div>
                </button>
              )}

              {/* CONTEÚDO EXPANDIDO (PAINEL ABERTO COM FOTO 100% VISÍVEL E FLUXO NATURAL) */}
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
                  {/* Linha de feixe de luz de scanner animada */}
                  <div className="scanner-beam" />

                  {/* Foto da Especialidade com Moldura de Renda Botânica */}
                  <div className="w-full lg:w-[42%] h-auto max-h-[50svh] lg:max-h-none lg:h-full shrink-0 relative flex items-center justify-center p-3 sm:p-4 lg:p-4">
                    <div className="relative aspect-[1122/1402] w-auto h-full max-h-[44svh] lg:max-h-[480px] max-w-full flex items-center justify-center group/frame select-none">
                      {/* Imagem interna sob a renda */}
                      <div
                        className={`absolute ${
                          pillar.isOval
                            ? "inset-[11%] rounded-full"
                            : "inset-[9%] sm:inset-[10%] rounded-2xl sm:rounded-3xl"
                        } overflow-hidden bg-[#FAF8F5] flex items-center justify-center shadow-inner`}
                      >
                        <img
                          src={pillar.image}
                          alt={pillar.fullTitle}
                          className="w-full h-full object-cover object-center group-hover/frame:scale-105 transition-transform duration-700 ease-out"
                        />
                      </div>

                      {/* Moldura de Renda sobreposta com transparência central */}
                      <img
                        src={pillar.frame}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_10px_25px_rgba(43,41,39,0.20)] z-10"
                      />
                    </div>
                  </div>

                  {/* Especificações Técnicas e Conceitos (Coluna Direita - Cresce naturalmente no Mobile) */}
                  <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col justify-between md:overflow-y-auto no-scrollbar relative z-10">
                    <div>
                      {/* Tag e Número */}
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="font-serif font-black text-2xl sm:text-3xl text-[#465B20]">
                          {pillar.number}
                        </span>
                        <span className="text-[#4E4A45] text-xs">✦</span>
                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#2A3614] font-bold px-2.5 py-0.5 rounded-full bg-[#465B20]/15 border border-[#465B20]/25">
                          Pilar de Especialização
                        </span>
                      </div>

                      {/* Título e Tagline */}
                      <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1C1A18] tracking-tight">
                        {pillar.fullTitle}
                      </h3>
                      <p className="font-handwriting text-base sm:text-lg text-[#465B20] font-medium mt-0.5 mb-2.5">
                        {pillar.tagline}
                      </p>

                      <p className="font-sans text-xs text-[#383531] font-normal leading-relaxed mb-3">
                        {pillar.description}
                      </p>

                      {/* Conceitos */}
                      <div className="mb-3">
                        <span className="font-sans text-[10px] uppercase tracking-wider text-[#4E4A45] font-bold block mb-1.5">
                          Conceitos Centrais:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {pillar.concepts.map((concept) => (
                            <span
                              key={concept}
                              className="bg-white border border-[#465B20]/25 text-[#1C1A18] font-sans text-[11px] font-medium px-2.5 py-0.5 rounded-md shadow-2xs"
                            >
                              ✦ {concept}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Ferramentas */}
                      <div>
                        <span className="font-sans text-[10px] uppercase tracking-wider text-[#4E4A45] font-bold block mb-1.5">
                          Ferramentas & Tecnologias:
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

                    {/* Rodapé do Painel Aberto com Wrap Seguro */}
                    <div className="mt-4 pt-2.5 border-t border-[#465B20]/20 flex flex-wrap items-center justify-between gap-2.5 text-xs font-sans text-[#4E4A45]">
                      <a
                        href="#skills"
                        className="inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-wider text-[#465B20] font-bold hover:text-[#2A3614] transition-colors min-h-[44px]"
                      >
                        Ver ferramentas no repositório <ArrowRight className="w-3.5 h-3.5" />
                      </a>

                      <span className="font-handwriting text-sm sm:text-base text-[#465B20] font-semibold shrink-0">
                        Faixa {pillar.number} de 04
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
