import { useMemo } from "react";

export type Zone =
  | "left-top"
  | "left-middle"
  | "left-bottom"
  | "right-top"
  | "right-middle"
  | "right-bottom";

export type SectionId =
  | "hero"
  | "sobre"
  | "stacks"
  | "projetos"
  | "skills"
  | "competencias"
  | "experiencia"
  | "trajetoria"
  | "contato";

export const DESKTOP_ZONES: Zone[] = [
  "left-top",
  "left-middle",
  "left-bottom",
  "right-top",
  "right-middle",
  "right-bottom",
];

export const MOBILE_ZONES: Zone[] = [
  "left-top",
  "right-top",
  "left-bottom",
  "right-bottom",
];

export const SECTION_IDS: SectionId[] = [
  "hero",
  "sobre",
  "stacks",
  "projetos",
  "skills",
  "competencias",
  "experiencia",
  "trajetoria",
  "contato",
];

/**
 * Classes utilitárias com clamp para manter o beija-flor fixado nas bordas
 * seguras da viewport, sem jamais invadir o miolo de texto ou componentes centrais.
 */
export const zoneClasses: Record<Zone, string> = {
  "left-top":
    "left-[clamp(8px,2vw,24px)] top-[clamp(72px,9vh,88px)]",
  "left-middle":
    "left-[clamp(8px,2vw,24px)] top-1/2 -translate-y-1/2",
  "left-bottom":
    "left-[clamp(8px,2vw,24px)] bottom-[calc(clamp(16px,4vh,40px)+env(safe-area-inset-bottom))]",

  "right-top":
    "right-[clamp(8px,2vw,24px)] top-[clamp(72px,9vh,88px)]",
  "right-middle":
    "right-[clamp(8px,2vw,24px)] top-1/2 -translate-y-1/2",
  "right-bottom":
    "right-[clamp(8px,2vw,24px)] bottom-[calc(clamp(16px,4vh,40px)+env(safe-area-inset-bottom))]",
};

/**
 * Rota Determinística Editorial por Seção (Desktop & Tablet)
 * Padrão rígido de alternância de lados:
 * Direita → Esquerda → Direita → Esquerda → Direita → Esquerda → Direita
 * Alturas variáveis (topo, meio, inferior) para máxima organicidade.
 */
export const DESKTOP_SECTION_ZONES: Record<SectionId, Zone> = {
  hero: "right-top",         // Direita + Topo
  sobre: "left-middle",      // Esquerda + Meio
  stacks: "right-bottom",    // Direita + Inferior
  projetos: "left-top",      // Esquerda + Topo
  skills: "right-middle",    // Direita + Meio
  competencias: "right-middle", // Direita + Meio (Competências)
  experiencia: "left-bottom",// Esquerda + Inferior
  trajetoria: "left-bottom", // Esquerda + Inferior (Trajetória)
  contato: "right-top",      // Direita + Topo
};

/**
 * Rota Determinística Editorial para Telas Estreitas (Mobile)
 * Mantém a alternância estrita de lados (D → E → D → E → D → E → D),
 * evitando as posições centrais (meio) para não colidir com textos e cards.
 */
export const MOBILE_SECTION_ZONES: Record<SectionId, Zone> = {
  hero: "right-top",         // Direita / Topo
  sobre: "left-bottom",      // Esquerda / Inferior
  stacks: "right-top",       // Direita / Topo
  projetos: "left-top",      // Esquerda / Topo
  skills: "right-bottom",    // Direita / Inferior
  competencias: "right-bottom", // Direita / Inferior (Competências)
  experiencia: "left-top",   // Esquerda / Topo
  trajetoria: "left-top",    // Esquerda / Topo (Trajetória)
  contato: "right-bottom",   // Direita / Inferior
};

export function getSide(zone: Zone): "left" | "right" {
  return zone.startsWith("left") ? "left" : "right";
}

export function getVertical(zone: Zone): "top" | "middle" | "bottom" {
  if (zone.endsWith("top")) return "top";
  if (zone.endsWith("middle")) return "middle";
  return "bottom";
}

/**
 * Hook memorizado para fornecer o mapeamento determinístico de rota
 */
export function useBirdRoute(isMobile: boolean): Record<SectionId, Zone> {
  return useMemo(() => {
    return isMobile ? MOBILE_SECTION_ZONES : DESKTOP_SECTION_ZONES;
  }, [isMobile]);
}

/**
 * Dicas e pensamentos poéticos narrativos do Beija-Flor por seção
 * Atua como o narrador silencioso do dossiê editorial.
 */
export type SectionThought = {
  tag: string;
  title: string;
  text: string;
};

export const EDITORIAL_GUIDE_HINTS: Record<SectionId, SectionThought> = {
  hero: {
    tag: "Abertura Editorial",
    title: "Início do Dossiê",
    text: "Comece por aqui. Engenharia, dados e IA aplicada.",
  },
  sobre: {
    tag: "Contexto & Intenção",
    title: "Filosofia de Software",
    text: "Antes da tecnologia, existe contexto, intenção e usuário.",
  },
  stacks: {
    tag: "Acordeão Interativo",
    title: "Engenharia & Pilares",
    text: "Explore cada faixa para abrir o dossiê técnico.",
  },
  projetos: {
    tag: "Casos em Produção",
    title: "Arquitetura Real",
    text: "É aqui que arquitetura deixa de ser conceito e vira produto.",
  },
  skills: {
    tag: "Repositório Técnico",
    title: "Eixos de Competência",
    text: "Ferramentas evoluem. Fundamentos permanecem.",
  },
  competencias: {
    tag: "Repositório Técnico",
    title: "Eixos de Competência",
    text: "Ferramentas evoluem. Fundamentos permanecem.",
  },
  experiencia: {
    tag: "Trajetória & Pesquisa",
    title: "Linha de Carreira",
    text: "Cada experiência adicionou uma nova camada ao repertório.",
  },
  trajetoria: {
    tag: "Trajetória & Pesquisa",
    title: "Linha de Carreira",
    text: "Cada experiência adicionou uma nova camada ao repertório.",
  },
  contato: {
    tag: "Encerramento do Dossiê",
    title: "Próximo Passo",
    text: "Chegamos ao fim do dossiê. Talvez seja o começo de uma conversa.",
  },
};

// Aliases para compatibilidade retroativa
export const SECTION_THOUGHTS = EDITORIAL_GUIDE_HINTS;
