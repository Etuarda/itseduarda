import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, Layers, Cpu, Database, BrainCircuit, Maximize2 } from "lucide-react";
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
      <div className="text-center max-w-2xl mx-auto mb-3 md:mb-5">
        <h2 className="font-serif font-light text-2xl sm:text-3xl lg:text-4xl text-[#1C1A18] tracking-tight">
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
      <div className="flex flex-col md:flex-row gap-2.5 sm:gap-3.5 w-full min-h-[500px] md:h-[530px]">
        {stackPillars.map((pillar, index) => {
          const isExpanded = activePillar === index;

          return (
            <div
              key={pillar.id}
              onClick={() => setActivePillar(index)}
              onMouseEnter={() => setActivePillar(index)}
              className={`relative rounded-2xl md:rounded-3xl border border-[#465B20]/30 overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
                isExpanded
                  ? "flex-[4.2] bg-[#FAF8F5] shadow-[0_15px_35px_-10px_rgba(70,91,32,0.18)] border-[#465B20]/50 texture-scanner"
                  : "flex-1 bg-[#FAF8F5] hover:bg-white hover:border-[#465B20]/45"
              }`}
            >
              {/* FACHADA RECOLHIDA (GOMO ESTREITO - DESKTOP & MOBILE) */}
              {!isExpanded && (
                <div className="w-full h-full flex md:flex-col items-center justify-between p-3.5 sm:p-5 select-none relative overflow-hidden group">
                  {/* Fundo com foto ocupando toda a altura do card */}
                  <img
                    src={pillar.image}
                    alt={pillar.shortTitle}
                    className="absolute inset-0 w-full h-full object-cover opacity-25 grayscale group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-[#FAF8F5]/80 group-hover:bg-[#FAF8F5]/70 transition-colors" />

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
                    <Maximize2 className="w-3.5 h-3.5 text-[#465B20] group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              )}

              {/* CONTEÚDO EXPANDIDO (PAINEL ABERTO COM FOTO NA ALTURA DO CARD E DETALHES) */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full flex flex-col lg:flex-row overflow-hidden relative"
                >
                  {/* Linha de feixe de luz de scanner animada */}
                  <div className="scanner-beam" />

                  {/* Foto da Especialidade: Altura Completa do Card (h-full), Sem Moldura, 100% Enquadrada */}
                  <div className="w-full lg:w-[42%] h-[260px] sm:h-[300px] lg:h-full shrink-0 relative overflow-hidden group/img">
                    <img
                      src={pillar.image}
                      alt={pillar.fullTitle}
                      className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden pointer-events-none" />
                  </div>

                  {/* Especificações Técnicas e Conceitos (Coluna Direita) */}
                  <div className="flex-1 p-5 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto no-scrollbar relative z-10">
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

                    {/* Rodapé do Painel Aberto */}
                    <div className="mt-4 pt-2.5 border-t border-[#465B20]/20 flex items-center justify-between text-xs font-sans text-[#4E4A45]">
                      <a
                        href="#skills"
                        className="inline-flex items-center gap-1 font-sans text-xs uppercase tracking-wider text-[#465B20] font-bold hover:text-[#2A3614] transition-colors"
                      >
                        Ver ferramentas no repositório <ArrowRight className="w-3 h-3" />
                      </a>

                      <span className="font-handwriting text-sm text-[#465B20] font-semibold">
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
