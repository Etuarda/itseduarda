import { ArrowRight, HeartHandshake, Compass } from "lucide-react";

export default function AboutSection() {
  return (
    <section
      id="sobre"
      className="w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto scroll-mt-20 relative select-text"
      aria-label="Como eu penso - Filosofia Técnica e de Produto"
    >
      {/* ========================================================================= */}
      {/* CABEÇALHO DA SEÇÃO (Editorial Assimétrico)                                */}
      {/* ========================================================================= */}
      <header className="mb-12 sm:mb-16 border-b border-[#465B20]/20 pb-8 sm:pb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.20em] text-[#465B20] font-bold">
            COMO EU PENSO
          </span>
          <span className="h-px w-12 bg-[#465B20]/25" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#4E4A45]">
            02 / MANIFESTO TÉCNICO
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
          <div className="lg:col-span-8">
            <h2 className="font-serif font-semibold text-3xl sm:text-5xl lg:text-6xl text-[#1C1A18] tracking-tight leading-[1.08]">
              Antes de escolher a tecnologia,
              <br />
              <span className="text-[#2A3614]">eu procuro entender o problema.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 lg:text-right pb-1">
            <span className="font-script text-2xl sm:text-3xl text-[#9E6761] block leading-none">
              escutar, estruturar e construir
            </span>
            <p className="font-sans text-xs text-[#4E4A45] mt-1.5 font-normal">
              Engenharia a serviço do contexto de negócio.
            </p>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* COMPOSIÇÃO DE PÁGINA DUPLA: MANIFESTO EDITORIAL + PERFIL DE VALOR         */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
        {/* COLUNA 1: MANIFESTO DE ENGENHARIA & OS 4 PONTOS CRÍTICOS (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#465B20] font-bold">
                DIREÇÃO TÉCNICA
              </span>
              <span className="h-px flex-1 bg-[#465B20]/15" />
            </div>

            {/* Lead com abertura editorial */}
            <div className="border-l-2 border-[#465B20] pl-5 sm:pl-6 py-2 mb-8 bg-[#FAF8F5]/80 rounded-r-lg">
              <p className="font-serif text-base sm:text-lg text-[#1C1A18] leading-relaxed italic">
                “Meu trabalho não começa pela ferramenta. Procuro entender o contexto, as pessoas envolvidas, as regras do negócio e o que realmente precisa melhorar antes de escrever a primeira linha de código.”
              </p>
            </div>

            {/* Os 4 Pontos Críticos em Diagramação Editorial */}
            <div className="flex flex-col divide-y divide-[#465B20]/15 mb-8">
              {/* 01. INTERFACE */}
              <div className="py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                <div className="flex items-baseline gap-2 shrink-0">
                  <span className="font-mono text-[10px] text-[#465B20] font-bold">01</span>
                  <h3 className="font-sans font-bold text-xs uppercase tracking-[0.14em] text-[#2A3614]">
                    INTERFACE
                  </h3>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed sm:text-right">
                  Uma interface pode estar bonita e ainda confundir quem usa.
                </p>
              </div>

              {/* 02. ARQUITETURA */}
              <div className="py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                <div className="flex items-baseline gap-2 shrink-0">
                  <span className="font-mono text-[10px] text-[#465B20] font-bold">02</span>
                  <h3 className="font-sans font-bold text-xs uppercase tracking-[0.14em] text-[#2A3614]">
                    ARQUITETURA
                  </h3>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed sm:text-right">
                  Uma API pode funcionar e continuar difícil de manter.
                </p>
              </div>

              {/* 03. DADOS */}
              <div className="py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                <div className="flex items-baseline gap-2 shrink-0">
                  <span className="font-mono text-[10px] text-[#465B20] font-bold">03</span>
                  <h3 className="font-sans font-bold text-xs uppercase tracking-[0.14em] text-[#2A3614]">
                    DADOS
                  </h3>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed sm:text-right">
                  Dados podem existir sem gerar informação útil.
                </p>
              </div>

              {/* 04. IA APLICADA */}
              <div className="py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                <div className="flex items-baseline gap-2 shrink-0">
                  <span className="font-mono text-[10px] text-[#465B20] font-bold">04</span>
                  <h3 className="font-sans font-bold text-xs uppercase tracking-[0.14em] text-[#2A3614]">
                    IA APLICADA
                  </h3>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed sm:text-right">
                  Uma IA pode responder com segurança aparente sem ter evidência para sustentar o que diz.
                </p>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed">
              Transformo essas percepções em soluções técnicas claras para quem usa e compreensíveis para quem vai continuar desenvolvendo e mantendo a aplicação.
            </p>
          </div>

          {/* Destaque: Ciclo de Pensamento (Seção 42) */}
          <div className="mt-8 pt-4 border-t border-[#465B20]/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-[#2A3614]">
              <span className="px-2.5 py-1 bg-[#465B20]/10 border border-[#465B20]/25 rounded">Entender</span>
              <span className="text-[#465B20]">→</span>
              <span className="px-2.5 py-1 bg-[#465B20]/10 border border-[#465B20]/25 rounded">Estruturar</span>
              <span className="text-[#465B20]">→</span>
              <span className="px-2.5 py-1 bg-[#465B20]/10 border border-[#465B20]/25 rounded">Desenvolver</span>
              <span className="text-[#465B20]">→</span>
              <span className="px-2.5 py-1 bg-[#465B20]/10 border border-[#465B20]/25 rounded">Validar</span>
            </div>

            <a
              href="#stacks"
              className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#465B20] hover:text-[#2A3614] transition-colors border-b border-[#465B20]/30 pb-0.5"
            >
              Ver base técnica <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* COLUNA 2: EXPERIÊNCIA HUMANA & CONEXÃO (5 cols no desktop, filete vertical) */}
        <aside className="lg:col-span-5 lg:border-l lg:border-[#465B20]/20 lg:pl-8 flex flex-col justify-between gap-8">
          {/* Bloco: Experiência Humana (Seção 43) */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b border-[#465B20]/20 pb-2 mb-4">
              <div className="flex items-center gap-2 text-[#465B20]">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] uppercase tracking-[0.20em] font-bold">
                  EXPERIÊNCIA HUMANA
                </span>
              </div>
              <span className="font-script text-lg text-[#9E6761]">
                escutar antes de construir
              </span>
            </div>

            <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1C1A18] mb-2.5 leading-snug">
              Tecnologia também começa sabendo ouvir.
            </h3>

            <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed mb-3">
              Antes de aprofundar minha atuação em desenvolvimento, trabalhei diretamente com atendimento e resolução de problemas operacionais.
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed">
              Essa experiência continua presente na forma como trabalho hoje: ouvir, identificar o que realmente está sendo pedido, organizar informações e buscar uma solução objetiva sem retrabalho.
            </p>
          </div>

          {/* Bloco: Significado do Beija-Flor (Seção 44) */}
          <div className="flex flex-col border-t border-[#465B20]/20 pt-6">
            <div className="flex items-center justify-between border-b border-[#465B20]/20 pb-2 mb-4">
              <div className="flex items-center gap-2 text-[#465B20]">
                <Compass className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] uppercase tracking-[0.20em] font-bold">
                  SÍMBOLO & PROPÓSITO
                </span>
              </div>
              <span className="font-script text-lg text-[#9E6761]">
                precisão em cada conexão
              </span>
            </div>

            <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1C1A18] mb-2.5 leading-snug">
              Por que um beija-flor?
            </h3>

            <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed mb-2">
              O beija-flor representa uma ideia simples que orienta minha entrega:
              <strong className="text-[#1C1A18] font-semibold block mt-1">
                conectar diferentes pontos com precisão.
              </strong>
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#4E4A45] leading-relaxed">
              Front-end, back-end, dados e IA podem ser áreas diferentes. O valor para a equipe está em fazê-las trabalhar juntas para resolver o problema certo.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
