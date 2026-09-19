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
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Entender",
    icon: Compass,
    headline: "Primeiro, contexto.",
    description:
      "Entendo o problema, quem será afetado, as regras envolvidas e o resultado esperado.",
    result: "Problema e objetivo mais claros.",
  },
  {
    number: "02",
    title: "Estruturar",
    icon: Layers,
    headline: "Depois, decisões.",
    description:
      "Organizo requisitos, dados, responsabilidades, integrações e restrições.",
    result: "Direção técnica mais previsível.",
  },
  {
    number: "03",
    title: "Desenvolver",
    icon: Code2,
    headline: "Implementar em partes verificáveis.",
    description:
      "Desenvolvo incrementalmente, mantendo responsabilidades separadas, validação e versionamento.",
    result: "Código mais simples de revisar e evoluir.",
  },
  {
    number: "04",
    title: "Validar",
    icon: CheckCircle2,
    headline: "Funcionou tecnicamente. Agora precisa funcionar no contexto.",
    description:
      "Valido fluxos principais, regras críticas e cenários de erro.",
    result: "Menos surpresa depois da entrega.",
  },
  {
    number: "05",
    title: "Documentar",
    icon: FileText,
    headline: "O sistema precisa continuar compreensível.",
    description:
      "Registro configurações, decisões relevantes e informações necessárias para continuidade.",
    result: "Conhecimento que não depende apenas de quem implementou.",
  },
];

const proofs = [
  {
    metric: "720h",
    icon: Clock,
    label: "Formação Full Stack — Programadores do Amanhã",
    context: "Residência técnica imersiva",
  },
  {
    metric: "360h",
    icon: Database,
    label: "Capacitação Técnica em IA — FDTE/USP",
    context: "Pesquisa prática & modelos aplicados",
  },
  {
    metric: "95",
    icon: TestTube2,
    label: "Testes automatizados aprovados no VendeFácil",
    context: "Testes com Jest e cobertura de fluxos",
  },
  {
    metric: "5.714",
    icon: Cpu,
    label: "Chunks indexados no pipeline RAG",
    context: "Base vetorial FAISS & ChromaDB",
  },
];

export default function MethodSection() {
  return (
    <section
      id="metodo"
      className="w-full py-8 sm:py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20 relative"
    >
      {/* Cabeçalho Editorial (Seção 18 & 55 do Guia Mestre) */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 relative z-20">
        <div className="inline-flex items-center mb-2 px-3.5 py-1 rounded-full bg-white border border-[#465B20]/30 shadow-2xs">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.20em] text-[#2A3614] font-bold">
            COMO EU TRABALHO
          </span>
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
          Cada problema exige decisões diferentes. Ainda assim, procuro manter um processo claro para reduzir retrabalho, tornar decisões mais compreensíveis e validar o que está sendo construído antes de aumentar a complexidade.
        </p>
      </div>

      {/* Grid com os 5 Passos Metodológicos (Seções 56 a 60 do Guia Mestre) */}
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
                    Etapa {step.number}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#465B20]/20 flex items-center justify-center text-[#465B20] mb-3 group-hover:bg-[#465B20] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="font-serif font-bold text-lg text-[#1C1A18] mb-1">
                  {step.title}
                </h3>

                <p className="font-sans text-xs font-semibold text-[#465B20] mb-2 leading-snug">
                  {step.headline}
                </p>

                <p className="font-sans text-xs text-[#383531] leading-relaxed font-normal mb-3">
                  {step.description}
                </p>
              </div>

              <div className="pt-2.5 border-t border-[#465B20]/15 text-[11px] font-sans text-[#4E4A45]">
                <strong className="text-[#1C1A18] font-semibold">Resultado:</strong> {step.result}
              </div>
            </div>
          );
        })}
      </div>

      {/* Frase de Método (Seção 61 do Guia Mestre: Sem assinatura manuscrita abaixo) */}
      <div className="text-center mb-12 sm:mb-14">
        <blockquote className="inline-block p-4 sm:p-5 px-6 sm:px-8 rounded-2xl bg-[#F7F6F2] border border-[#465B20]/25 shadow-2xs">
          <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#1C1A18] font-normal">
            “Software confiável não acontece por acaso. É resultado de processo.”
          </p>
        </blockquote>
      </div>

      {/* Bloco de Provas Rápidas (Seções 62 & 63 do Guia Mestre) */}
      <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#FAF8F5] border border-[#465B20]/25 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-6 border-b border-[#465B20]/20">
          <div>
            <div className="inline-flex items-center mb-2 px-3.5 py-1 rounded-full bg-white border border-[#465B20]/30 shadow-2xs">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.20em] text-[#2A3614] font-bold">
                EVIDÊNCIAS DE PRÁTICA
              </span>
            </div>
            <h3 className="font-serif font-black text-xl sm:text-2xl md:text-3xl text-[#1C1A18]">
              Números que ajudam a colocar a trajetória em perspectiva.
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {proofs.map((proof, idx) => {
            const Icon = proof.icon;
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-[#465B20]/20 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-9 h-9 rounded-xl bg-[#465B20]/10 flex items-center justify-center text-[#465B20]">
                      <Icon className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="font-serif font-black text-3xl sm:text-4xl text-[#1C1A18] tracking-tight mb-2">
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
