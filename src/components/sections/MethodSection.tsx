import {
  Compass,
  Layers,
  Code2,
  CheckCircle2,
  FileText,
  Clock,
  Database,
  TestTube2,
  Cpu,
  Accessibility,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Entender",
    icon: Compass,
    description:
      "Nenhum problema técnico é isolado do negócio. Começo entendendo o que precisa acontecer antes de escolher como construir.",
    tag: "Contexto & Regras",
  },
  {
    number: "02",
    title: "Estruturar",
    icon: Layers,
    description:
      "Desenho a arquitetura, modelo os dados e defino as integrações antes de escrever código. Isso evita retrabalho e decisões precipitadas.",
    tag: "Modelagem & Contratos",
  },
  {
    number: "03",
    title: "Desenvolver",
    icon: Code2,
    description:
      "Implemento em camadas com separação clara de responsabilidades, tipagem forte e validação contínua de contratos entre partes do sistema.",
    tag: "Clean Architecture",
  },
  {
    number: "04",
    title: "Validar",
    icon: CheckCircle2,
    description:
      "Testes automatizados, validação de edge cases e verificação de acessibilidade e performance antes de considerar a entrega pronta.",
    tag: "Qualidade & Testes",
  },
  {
    number: "05",
    title: "Documentar",
    icon: FileText,
    description:
      "Código que outra pessoa não entende é débito técnico. Documento decisões, contratos de API e instruções de execução.",
    tag: "Sustentabilidade",
  },
];

const proofs = [
  {
    metric: "+720 horas",
    icon: Clock,
    label: "Formação imersiva em Engenharia de Software e IA Aplicada",
    context: "Residência técnica e projetos full stack",
  },
  {
    metric: "+360 horas",
    icon: Database,
    label: "Especialização prática em Ciência de Dados e Analytics",
    context: "PUC-Rio — EDA, modelagem e pipelines",
  },
  {
    metric: "95 testes",
    icon: TestTube2,
    label: "Cobertura de testes automatizados com Jest no projeto OnVagas",
    context: "Testes unitários e de integração",
  },
  {
    metric: "5.714 chunks",
    icon: Cpu,
    label: "Base vetorial indexada com ChromaDB no projeto VendeFácil RAG",
    context: "Recuperação contextual e guardrails",
  },
  {
    metric: "WCAG 2.2",
    icon: Accessibility,
    label: "Conformidade com diretrizes de acessibilidade no projeto a11y.io",
    context: "Padrão internacional de inclusão digital",
  },
];

export default function MethodSection() {
  return (
    <section
      id="metodo"
      className="w-full py-8 sm:py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20 relative"
    >
      {/* Cabeçalho Editorial */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 relative z-20">
        <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-white border border-[#465B20]/30 shadow-2xs">
          <span className="text-[#465B20] text-xs">✦</span>
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#2A3614] font-bold">
            COMO EU TRABALHO
          </span>
          <span className="text-[#9E6761] text-xs">✦</span>
        </div>

        <h2
          className="font-serif font-black text-2xl sm:text-4xl lg:text-5xl text-[#1C1A18] tracking-tight leading-tight mt-1"
          style={{ textWrap: "balance" }}
        >
          Código faz parte da entrega. Processo também.
        </h2>

        <p
          className="font-sans text-xs sm:text-sm md:text-base text-[#383531] mt-3 leading-relaxed max-w-2xl mx-auto"
          style={{ textWrap: "balance" }}
        >
          Construir software não é apenas escrever linhas de código. É entender o problema antes de começar, estruturar com clareza e garantir que o resultado seja confiável e sustentável.
        </p>
      </div>

      {/* Grid com os 5 Passos Metodológicos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 mb-10 sm:mb-12">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className={`botanical-card texture-paper p-5 sm:p-6 rounded-2xl bg-white border border-[#465B20]/25 shadow-xs flex flex-col justify-between relative group hover:border-[#465B20]/60 transition-all ${
                idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div>
                {/* Header do Card */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-[#465B20] px-2 py-0.5 rounded-md bg-[#465B20]/10 border border-[#465B20]/20">
                    {step.number}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#4E4A45]">
                    {step.tag}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#465B20]/20 flex items-center justify-center text-[#465B20] mb-3 group-hover:bg-[#465B20] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="font-serif font-bold text-lg text-[#1C1A18] mb-2">
                  {step.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#465B20]/15 flex items-center justify-between text-[11px] font-handwriting text-base text-[#465B20]">
                <span>Etapa {step.number}</span>
                <span className="text-[#9E6761]">✦</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Frase de Fechamento Editorial */}
      <div className="text-center mb-12 sm:mb-14">
        <blockquote className="inline-block p-4 sm:p-5 px-6 sm:px-8 rounded-2xl bg-[#F7F6F2] border border-[#465B20]/25 shadow-2xs">
          <p className="font-serif italic font-bold text-sm sm:text-base md:text-lg text-[#1C1A18]">
            "Software confiável não é acidente. É resultado de método."
          </p>
          <span className="font-handwriting text-sm sm:text-base text-[#465B20] block mt-1">
            Eduarda Silva Santos
          </span>
        </blockquote>
      </div>

      {/* EPIC 19: Bloco de Provas Rápidas (Em Números / Evidências de Prática) */}
      <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#FAF8F5] border border-[#465B20]/25 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-6 border-b border-[#465B20]/20">
          <div>
            <div className="inline-flex items-center gap-1.5 mb-2 text-[#465B20]">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold">
                EVIDÊNCIAS DE PRÁTICA
              </span>
            </div>
            <h3 className="font-serif font-black text-xl sm:text-2xl md:text-3xl text-[#1C1A18]">
              Evidências concretas de dedicação técnica.
            </h3>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#4E4A45] max-w-md">
            Números que representam horas de estudo prático, linhas de teste escritas e decisões de engenharia documentadas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {proofs.map((proof, idx) => {
            const Icon = proof.icon;
            return (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-[#465B20]/20 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-8 h-8 rounded-lg bg-[#465B20]/10 flex items-center justify-center text-[#465B20]">
                      <Icon className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="font-serif font-black text-2xl sm:text-3xl text-[#1C1A18] tracking-tight mb-1.5">
                    {proof.metric}
                  </div>
                  <p className="font-sans text-xs text-[#1C1A18] font-semibold leading-snug mb-2">
                    {proof.label}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#465B20]/10 text-[11px] font-mono text-[#4E4A45]">
                  {proof.context}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
