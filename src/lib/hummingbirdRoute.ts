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
  | "metodo"
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
  "metodo",
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
 */
export const DESKTOP_SECTION_ZONES: Record<SectionId, Zone> = {
  hero: "right-top",
  sobre: "left-middle",
  stacks: "right-bottom",
  projetos: "left-top",
  metodo: "right-middle",
  skills: "left-middle",
  competencias: "left-middle",
  experiencia: "right-bottom",
  trajetoria: "right-bottom",
  contato: "right-top",
};

/**
 * Rota Determinística Editorial para Telas Estreitas (Mobile)
 */
export const MOBILE_SECTION_ZONES: Record<SectionId, Zone> = {
  hero: "right-top",
  sobre: "left-bottom",
  stacks: "right-top",
  projetos: "left-top",
  metodo: "right-bottom",
  skills: "left-bottom",
  competencias: "left-bottom",
  experiencia: "left-top",
  trajetoria: "left-top",
  contato: "right-bottom",
};

export function getSide(zone: Zone): "left" | "right" {
  return zone.startsWith("left") ? "left" : "right";
}

export function getVertical(zone: Zone): "top" | "middle" | "bottom" {
  if (zone.endsWith("top")) return "top";
  if (zone.endsWith("middle")) return "middle";
  return "bottom";
}

export function useBirdRoute(isMobile: boolean): Record<SectionId, Zone> {
  return useMemo(() => {
    return isMobile ? MOBILE_SECTION_ZONES : DESKTOP_SECTION_ZONES;
  }, [isMobile]);
}

/**
 * Dicas e pensamentos do Guia Beija-Flor conforme EPIC 29 do Backlog de Copywriting
 */
export type SectionThought = {
  tag: string;
  title: string;
  text: string;
  actionText: string;
  targetId: string;
};

export const EDITORIAL_GUIDE_HINTS: Record<SectionId, SectionThought> = {
  hero: {
    tag: "Comece aqui",
    title: "Visão geral",
    text: "Desenvolvimento, dados e IA fazem parte da mesma história. Aqui você conhece primeiro o que conecta tudo isso.",
    actionText: "Seguir para a próxima seção",
    targetId: "sobre",
  },
  sobre: {
    tag: "Como eu penso",
    title: "Antes do código",
    text: "Antes da stack, vem a pergunta certa: qual problema precisa ser resolvido?",
    actionText: "Conhecer as stacks",
    targetId: "stacks",
  },
  stacks: {
    tag: "Base técnica",
    title: "Quatro frentes conectadas",
    text: "Front-end, back-end, dados e IA. Áreas diferentes, unidas pela mesma preocupação com clareza e qualidade.",
    actionText: "Ver projetos",
    targetId: "projetos",
  },
  projetos: {
    tag: "Provas",
    title: "Da ideia à implementação",
    text: "Aqui estão as provas. Abra os projetos para ver problemas, decisões técnicas e o que foi construído.",
    actionText: "Ver método",
    targetId: "metodo",
  },
  metodo: {
    tag: "Como eu trabalho",
    title: "Código faz parte da entrega",
    text: "Cada problema exige decisões diferentes. Manter um processo previsível reduz retrabalho e dá clareza.",
    actionText: "Ver competências",
    targetId: "competencias",
  },
  skills: {
    tag: "Repertório técnico",
    title: "O que sustenta as entregas",
    text: "Ferramentas mudam. Fundamentos fortes fazem o software continuar bom depois da primeira versão.",
    actionText: "Conhecer a trajetória",
    targetId: "trajetoria",
  },
  competencias: {
    tag: "Repertório técnico",
    title: "O que sustenta as entregas",
    text: "Ferramentas mudam. Fundamentos fortes fazem o software continuar bom depois da primeira versão.",
    actionText: "Conhecer a trajetória",
    targetId: "trajetoria",
  },
  experiencia: {
    tag: "Caminho",
    title: "Como esse repertório foi construído",
    text: "Cada etapa acrescentou uma camada: comunicação, desenvolvimento, dados, acessibilidade e IA aplicada.",
    actionText: "Ir para contato",
    targetId: "contato",
  },
  trajetoria: {
    tag: "Caminho",
    title: "Como esse repertório foi construído",
    text: "Cada etapa acrescentou uma camada: comunicação, desenvolvimento, dados, acessibilidade e IA aplicada.",
    actionText: "Ir para contato",
    targetId: "contato",
  },
  contato: {
    tag: "Próximo passo",
    title: "Podemos conversar",
    text: "Você já viu como Eduarda pensa, o que constrói e como trabalha. Se isso fizer sentido para sua equipe, o próximo passo é uma conversa.",
    actionText: "Entrar em contato",
    targetId: "contato",
  },
};

export const SECTION_THOUGHTS = EDITORIAL_GUIDE_HINTS;
