import React from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { LaceFrameAsset, PhotoFrame, BotanicalFlourishAsset } from "@/components/ui/AssetSlots";
import aboutPortraitImg from "@/components/assets/about-portrait-editorial.png";
import { ArrowRight, Compass, HeartHandshake, ShieldCheck } from "lucide-react";

export default function AboutSection() {
  return (
    <section
      id="sobre"
      aria-label="Sobre Eduarda Silva Santos e Filosofia de Engenharia"
      className="w-full py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto scroll-mt-20 relative select-text"
    >
      {/* 1. Título Editorial Puro (Sem caixa de fundo, sem traços ----) */}
      <div className="mb-12 sm:mb-16 md:mb-20">
        <SectionTitle
          index="01"
          title="Sobre"
          scriptAccent="como eu penso"
          align="left"
          subtitle="Antes de escolher a tecnologia, procuro entender o problema: contexto operacional, regras do negócio e impacto nas pessoas."
        />
      </div>

      {/* 2. Prancha Editorial Assimétrica de Página Dupla */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        {/* COLUNA ESQUERDA: RETRATO EDITORIAL + METÁFORA DO BEIJA-FLOR (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start gap-8">
          
          {/* Retrato Editorial com Moldura de Renda (Foto SOBRE a renda: z-10 sobre z-0) */}
          <div className="relative w-full max-w-[320px] sm:max-w-[360px] mx-auto lg:mx-0">
            <LaceFrameAsset className="w-full">
              <PhotoFrame className="w-full bg-[#FAF8F5]">
                <img
                  src={aboutPortraitImg}
                  alt="Eduarda Silva Santos em registro editorial de trabalho e estudo"
                  loading="lazy"
                  className="w-full h-auto object-cover aspect-[4/5] filter contrast-[1.03] sepia-[0.08]"
                />
              </PhotoFrame>
            </LaceFrameAsset>

            {/* Acento Botânico em Aquarela Delicada */}
            <BotanicalFlourishAsset
              variant="flowers-mauve"
              className="absolute -bottom-8 -right-8 w-24 h-24 opacity-80"
            />
          </div>

          {/* Legenda Editorial e Assinatura de Princípio */}
          <div className="w-full max-w-[340px] text-center lg:text-left">
            <span
              className="font-script text-2xl sm:text-3xl text-[#9E6761] block leading-tight"
            >
              precisão em cada conexão
            </span>
            <p className="font-mono text-[11px] text-[#4E4A45] mt-1 uppercase tracking-wider">
              Eduarda Silva Santos • Salvador / Remoto
            </p>
          </div>

          {/* O Símbolo do Beija-Flor: Conectar Disciplinas */}
          <div className="w-full max-w-[380px] pt-4 flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-[#465B20]">
              <Compass className="w-4 h-4" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest">
                O Símbolo do Beija-Flor
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed">
              O beija-flor não carrega excesso de bagagem: ele acessa a flor certa com leveza, velocidade e exatidão milimétrica. Na engenharia de software, adoto a mesma postura: foco na essência, contratos enxutos e integração harmônica entre back-end, front-end, dados e IA.
            </p>
          </div>
        </div>

        {/* COLUNA DIREITA: OS 3 EIXOS NARRATIVOS EDITORIALMENTE COMPILADOS (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-10 sm:gap-12">
          
          {/* Citação Editorial em Cormorant Garamond (Manifesto Principal) */}
          <blockquote className="pl-4 sm:pl-6 border-l-2 border-[#465B20] text-[#1C1A18]">
            <p className="font-serif text-xl sm:text-2xl md:text-3xl italic leading-snug">
              “Uma interface pode ser atraente e ainda confundir quem usa. Uma API pode compilar e ainda ser inviável de manter. Meu compromisso é alinhar rigor arquitetural às restrições do mundo real.”
            </p>
          </blockquote>

          {/* Os 3 Eixos Estratégicos com Diagramação Editorial Limpa (Sem caixas de fundo nem divisores ----) */}
          <div className="flex flex-col gap-8 sm:gap-10">
            
            {/* Eixo 1: Engenharia Orientada a Regras de Negócio */}
            <article className="flex flex-col gap-2">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs font-bold text-[#465B20] select-none">
                  01
                </span>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1C1A18]">
                  Engenharia Orientada a Regras de Negócio
                </h3>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed pl-7">
                Minha formação e prática têm no <strong className="font-semibold text-[#1C1A18]">Back-end estruturado (Node.js, TypeScript e PostgreSQL)</strong> o seu eixo central. Antes de adotar bibliotecas ou padrões complexos, modelo as entidades do domínio, garanto transações atômicas, desenho contratos com validação estrita (Zod) e escrevo testes para que o sistema seja sustentável por anos, não apenas na entrega inicial.
              </p>
            </article>

            {/* Eixo 2: Visão de Usuário e Contexto Operacional */}
            <article className="flex flex-col gap-2">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs font-bold text-[#465B20] select-none">
                  02
                </span>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1C1A18]">
                  Visão de Usuário e Contexto Operacional
                </h3>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed pl-7">
                Minha trajetória começou lidando diretamente com o atendimento ao cliente e resolução de problemas operacionais na <strong className="font-semibold text-[#1C1A18]">AeC Centro de Contatos</strong>. Essa vivência moldou minha capacidade de escuta ativa: sei traduzir frustrações reais de quem usa em requisitos claros de engenharia, antecipar cenários de erro e projetar sistemas acessíveis (WCAG 2.2) que eliminam barreiras operacionais.
              </p>
            </article>

            {/* Eixo 3: Conexão Entre Disciplinas — Software, Dados e IA */}
            <article className="flex flex-col gap-2">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs font-bold text-[#465B20] select-none">
                  03
                </span>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1C1A18]">
                  Conexão Entre Disciplinas: Software, Dados e IA
                </h3>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed pl-7">
                Não vejo fronteiras artificiais entre desenvolvimento de aplicações, engenharia de dados e inteligência artificial. Integro interfaces fluidas em React a pipelines analíticos em Python/SQL e fluxos de IA generativa (RAG) baseados em evidências verificáveis. Essa polinização multidisciplinar me permite participar desde a concepção até a orquestração completa da solução.
              </p>
            </article>
          </div>

          {/* Chamada para Exploração de Competências */}
          <div className="pt-2 pl-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="font-mono text-xs text-[#4E4A45]">
              Próximo passo: conheça os pilares técnicos e projetos aplicados.
            </span>
            <a
              href="#competencias"
              className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#465B20] hover:text-[#1E2713] transition-colors cursor-pointer group"
            >
              <span>Ver competências e projetos</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
