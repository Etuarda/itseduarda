import {
  Compass,
  Layers,
  Code2,
  CheckCircle2,
  FileText,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Entender",
    icon: Compass,
    headline: "Primeiro, contexto.",
    description:
      "Entendo o problema, quem será afetado, as regras envolvidas e o resultado esperado antes de codificar.",
    result: "Problema e objetivo mais claros, sem retrabalho.",
  },
  {
    number: "02",
    title: "Estruturar",
    icon: Layers,
    headline: "Depois, decisões.",
    description:
      "Organizo requisitos, contratos de dados, responsabilidades, integrações e restrições de arquitetura.",
    result: "Direção técnica mais previsível e segura.",
  },
  {
    number: "03",
    title: "Desenvolver",
    icon: Code2,
    headline: "Implementar em partes verificáveis.",
    description:
      "Desenvolvo incrementalmente com TypeScript e boas práticas, mantendo responsabilidades separadas e versionamento limpo.",
    result: "Código mais simples de revisar e evoluir.",
  },
  {
    number: "04",
    title: "Validar",
    icon: CheckCircle2,
    headline: "Funcionou tecnicamente. Agora precisa funcionar no contexto.",
    description:
      "Valido fluxos principais, regras críticas e cenários de erro com testes automatizados e critérios de qualidade.",
    result: "Menos surpresas e chamados depois da entrega.",
  },
  {
    number: "05",
    title: "Documentar",
    icon: FileText,
    headline: "O sistema precisa continuar compreensível.",
    description:
      "Registro configurações, decisões de arquitetura e instruções necessárias para a continuidade do time.",
    result: "Conhecimento que não depende apenas de quem implementou.",
  },
];

export default function MethodSection() {
  return (
    <section
      id="metodo"
      className="w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto scroll-mt-20 relative select-text"
      aria-label="Como eu trabalho - Método e Previsibilidade de Entrega"
    >
      {/* ========================================================================= */}
      {/* CABEÇALHO DA SEÇÃO (Editorial Assimétrico)                                */}
      {/* ========================================================================= */}
      <header className="mb-12 sm:mb-16 border-b border-[#465B20]/20 pb-8 sm:pb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.20em] text-[#465B20] font-bold">
            COMO EU TRABALHO
          </span>
          <span className="h-px w-12 bg-[#465B20]/25" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#4E4A45]">
            04 / PROCESSO & PREVISIBILIDADE
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
          <div className="lg:col-span-8">
            <h2 className="font-serif font-semibold text-3xl sm:text-5xl lg:text-6xl text-[#1C1A18] tracking-tight leading-[1.08]">
              Código faz parte da entrega.
              <br />
              <span className="text-[#2A3614]">Processo também.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 lg:text-right pb-1">
            <span className="font-script text-2xl sm:text-3xl text-[#9E6761] block leading-none">
              método, clareza e validação
            </span>
            <p className="font-sans text-xs text-[#4E4A45] mt-1.5 font-normal">
              Previsibilidade técnica em cada etapa.
            </p>
          </div>
        </div>

        <p className="font-sans text-xs sm:text-sm md:text-base text-[#383531] mt-6 leading-relaxed max-w-3xl">
          Cada problema exige decisões diferentes. Ainda assim, mantenho um processo claro para reduzir retrabalho, tornar decisões mais compreensíveis e validar o que está sendo construído antes de aumentar a complexidade.
        </p>
      </header>

      {/* ========================================================================= */}
      {/* OS 5 PASSOS DO PROCESSO EM DIAGRAMAÇÃO EDITORIAL CONTÍNUA                 */}
      {/* ========================================================================= */}
      <div className="mb-16 sm:mb-20">
        <div className="flex items-center gap-2 mb-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#465B20] font-bold">
            DA DEMANDA À ENTREGA
          </span>
          <span className="h-px flex-1 bg-[#465B20]/15" />
        </div>

        {/* Sequência editorial numerada com filetes finos */}
        <div className="divide-y divide-[#465B20]/15">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <article
                key={step.number}
                className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-start group"
              >
                {/* Coluna de Identificação (3 cols) */}
                <div className="md:col-span-3 flex items-center md:items-start gap-3">
                  <span className="font-serif font-bold text-3xl sm:text-4xl text-[#465B20] leading-none">
                    {step.number}
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5 text-[#2A3614]">
                      <Icon className="w-3.5 h-3.5 text-[#465B20]" />
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1C1A18]">
                        {step.title}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#4E4A45] block mt-0.5">
                      Fase {step.number}
                    </span>
                  </div>
                </div>

                {/* Coluna de Detalhe & Racional Técnico (6 cols) */}
                <div className="md:col-span-6 flex flex-col">
                  <h4 className="font-sans font-semibold text-xs sm:text-sm text-[#2A3614] mb-1.5">
                    {step.headline}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Coluna de Retorno para a Equipe / Resultado (3 cols) */}
                <div className="md:col-span-3 pt-2 md:pt-0 md:border-l md:border-[#465B20]/15 md:pl-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#465B20] font-bold block mb-1">
                    Garantia de entrega:
                  </span>
                  <p className="font-sans text-xs text-[#1C1A18] font-medium leading-snug">
                    {step.result}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PULL QUOTE EDITORIAL (Seção 61 do Guia Mestre)                            */}
      {/* ========================================================================= */}
      <div className="border-y border-[#465B20]/20 py-8 sm:py-10 mb-16 sm:mb-20 text-center">
        <blockquote className="max-w-3xl mx-auto">
          <p className="font-serif italic text-lg sm:text-2xl lg:text-3xl text-[#1C1A18] leading-relaxed">
            “Software confiável não acontece por acaso. É resultado de processo.”
          </p>
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.20em] text-[#465B20] font-bold block mt-3">
            Princípio de Engenharia & Manutenção
          </span>
        </blockquote>
      </div>

      {/* ========================================================================= */}
      {/* EVIDÊNCIAS DE PRÁTICA EM COMPOSIÇÃO EDITORIAL CONTÍNUA                    */}
      {/* ========================================================================= */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8 border-b border-[#465B20]/20 pb-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.20em] text-[#465B20] font-bold block mb-1">
              EVIDÊNCIAS DE PRÁTICA
            </span>
            <h3 className="font-serif font-semibold text-xl sm:text-2xl text-[#1C1A18]">
              Números que ajudam a colocar a trajetória em perspectiva.
            </h3>
          </div>
          <span className="font-sans text-xs text-[#4E4A45] italic">
            Volume e profundidade técnica
          </span>
        </div>

        {/* Grade de Métricas Contínuas (Sem cards brancos pesados) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="border-t border-[#465B20]/20 pt-4 flex flex-col">
            <span className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#2A3614] leading-none">
              720h
            </span>
            <span className="font-sans text-xs font-bold text-[#1C1A18] mt-2">
              Formação Full Stack
            </span>
            <span className="font-sans text-[11px] text-[#4E4A45] mt-0.5">
              Programadores do Amanhã
            </span>
          </div>

          <div className="border-t border-[#465B20]/20 pt-4 flex flex-col">
            <span className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#2A3614] leading-none">
              360h
            </span>
            <span className="font-sans text-xs font-bold text-[#1C1A18] mt-2">
              Capacitação Técnica em IA
            </span>
            <span className="font-sans text-[11px] text-[#4E4A45] mt-0.5">
              FDTE / USP
            </span>
          </div>

          <div className="border-t border-[#465B20]/20 pt-4 flex flex-col">
            <span className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#2A3614] leading-none">
              95
            </span>
            <span className="font-sans text-xs font-bold text-[#1C1A18] mt-2">
              Testes automatizados aprovados
            </span>
            <span className="font-sans text-[11px] text-[#4E4A45] mt-0.5">
              VendeFácil (Jest/Vitest)
            </span>
          </div>

          <div className="border-t border-[#465B20]/20 pt-4 flex flex-col">
            <span className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#2A3614] leading-none">
              5.714
            </span>
            <span className="font-sans text-xs font-bold text-[#1C1A18] mt-2">
              Chunks indexados
            </span>
            <span className="font-sans text-[11px] text-[#4E4A45] mt-0.5">
              Pipeline RAG VendeFácil
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
