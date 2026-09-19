import { ArrowRight, Sparkles, HeartHandshake, Compass } from "lucide-react";

export default function AboutSection() {
  return (
    <section
      id="sobre"
      className="w-full py-8 sm:py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20 relative"
    >
      {/* Cabeçalho Editorial */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 relative z-20">
        <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-white border border-[#465B20]/30 shadow-2xs">
          <span className="text-[#465B20] text-xs">✦</span>
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#2A3614] font-bold">
            COMO EU PENSO
          </span>
          <span className="text-[#9E6761] text-xs">✦</span>
        </div>

        <h2
          className="font-serif font-black text-2xl sm:text-4xl lg:text-5xl text-[#1C1A18] tracking-tight leading-tight mt-1"
          style={{ textWrap: "balance" }}
        >
          Antes de escolher a tecnologia, eu procuro entender o problema.
        </h2>
      </div>

      {/* Grid Central: Manifesto Editorial + Destaque dos 4 Passos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mb-8">
        {/* Bloco de Filosofia de Software */}
        <div className="lg:col-span-8 botanical-card texture-paper p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-[#465B20]/25 shadow-xs flex flex-col justify-between">
          <div className="space-y-4 font-sans text-sm sm:text-base text-[#383531] leading-relaxed">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4 border-b border-[#465B20]/15">
              <div className="p-3.5 rounded-xl bg-white border border-[#465B20]/20 shadow-2xs">
                <span className="text-[#465B20] text-xs font-mono font-bold block mb-1">01. INTERFACE</span>
                <p className="text-xs text-[#1C1A18]">
                  Uma interface pode estar bonita e ainda confundir quem usa.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#465B20]/20 shadow-2xs">
                <span className="text-[#465B20] text-xs font-mono font-bold block mb-1">02. ARQUITETURA</span>
                <p className="text-xs text-[#1C1A18]">
                  Uma API pode funcionar e continuar difícil de manter.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#465B20]/20 shadow-2xs">
                <span className="text-[#465B20] text-xs font-mono font-bold block mb-1">03. DADOS</span>
                <p className="text-xs text-[#1C1A18]">
                  Dados podem existir sem gerar informação útil.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#465B20]/20 shadow-2xs">
                <span className="text-[#465B20] text-xs font-mono font-bold block mb-1">04. IA APLICADA</span>
                <p className="text-xs text-[#1C1A18]">
                  E uma IA pode responder com segurança aparente sem ter evidência para sustentar o que diz.
                </p>
              </div>
            </div>

            <p className="text-[#1C1A18] font-medium pt-1">
              Por isso, meu trabalho não começa pela ferramenta.
            </p>
            <p>
              Procuro entender{" "}
              <strong className="text-[#1C1A18] font-semibold">
                o contexto, as pessoas envolvidas, as regras do negócio e o que realmente precisa melhorar.
              </strong>
            </p>
            <p>
              Depois transformo isso em uma solução técnica clara para quem usa e compreensível para quem vai continuar desenvolvendo.
            </p>
          </div>

          {/* Destaque: Ciclo de Pensamento */}
          <div className="mt-6 pt-4 border-t border-[#465B20]/20 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono font-bold text-[#2A3614]">
              <span className="px-2.5 py-1 rounded-lg bg-[#465B20]/15 border border-[#465B20]/30">Entender</span>
              <span className="text-[#9E6761]">→</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#465B20]/15 border border-[#465B20]/30">Estruturar</span>
              <span className="text-[#9E6761]">→</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#465B20]/15 border border-[#465B20]/30">Desenvolver</span>
              <span className="text-[#9E6761]">→</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#465B20]/15 border border-[#465B20]/30">Validar</span>
            </div>

            <a
              href="#stacks"
              className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#465B20] hover:text-[#2A3614] transition-colors"
            >
              Ver base técnica <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Coluna Direita: Experiência Humana & Significado do Beija-Flor */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Card: Experiência Humana */}
          <div className="p-6 rounded-3xl bg-white border border-[#465B20]/25 shadow-2xs flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#465B20] mb-2">
                <HeartHandshake className="w-4 h-4 text-[#465B20]" />
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold">
                  EXPERIÊNCIA HUMANA
                </span>
              </div>

              <h3 className="font-serif font-bold text-lg text-[#1C1A18] mb-2 leading-snug">
                Tecnologia também começa sabendo ouvir.
              </h3>

              <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed font-normal">
                Antes de aprofundar minha atuação em desenvolvimento, trabalhei diretamente com atendimento e resolução de problemas.
              </p>
              <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed font-normal mt-2">
                Essa experiência continua presente na forma como trabalho hoje: ouvir, identificar o que realmente está sendo pedido, organizar informações e buscar uma solução objetiva.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#465B20]/15 text-[11px] font-handwriting text-base text-[#465B20] font-semibold">
              Empatia aplicada à engenharia
            </div>
          </div>

          {/* Card: Significado do Beija-Flor (EPIC 05) */}
          <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#465B20]/25 shadow-2xs flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#465B20] mb-2">
                <Sparkles className="w-4 h-4 text-[#465B20]" />
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold">
                  SÍMBOLO & PROPÓSITO
                </span>
              </div>

              <h3 className="font-serif font-bold text-lg text-[#1C1A18] mb-2 leading-snug">
                Por que um beija-flor?
              </h3>

              <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed font-normal">
                O beija-flor representa uma ideia simples que também aparece no meu trabalho:{" "}
                <strong className="text-[#1C1A18] font-semibold">
                  conectar diferentes pontos com precisão.
                </strong>
              </p>
              <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed font-normal mt-2">
                Front-end, back-end, dados e IA podem ser áreas diferentes. O valor está em fazê-las trabalhar juntas para resolver o problema certo.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#465B20]/15 flex items-center justify-between text-[11px] font-sans text-[#4E4A45]">
              <span className="italic">Precisão em cada conexão</span>
              <span className="font-mono text-[#465B20] font-bold">✦ 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
