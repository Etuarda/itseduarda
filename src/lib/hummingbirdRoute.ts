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
    "left-[clamp(8px,2vw,24px)] bottom-[clamp(16px,4vh,36px)]",
  "right-top":
    "right-[clamp(8px,2vw,24px)] top-[clamp(72px,9vh,88px)]",
  "right-middle":
    "right-[clamp(8px,2vw,24px)] top-1/2 -translate-y-1/2",
  "right-bottom":
    "right-[clamp(8px,2vw,24px)] bottom-[clamp(16px,4vh,36px)]",
};

/**
 * Rota Determinística Editorial para Desktop
 * Alternância estrita entre as margens da página
 */
export const DESKTOP_SECTION_ZONES: Record<SectionId, Zone> = {
  hero: "right-top",
  sobre: "left-top",
  stacks: "right-middle",
  projetos: "left-middle",
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
 * Dicas e pensamentos do Guia Beija-Flor conforme Seções 78 a 87 do Guia Mestre de Copywriting
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
    tag: "Início",
    title: "Começar pelas provas",
    text: "Quer começar pelas provas? Posso te levar aos projetos que melhor mostram como eu trabalho.",
    actionText: "Ver projetos",
    targetId: "projetos",
  },
  sobre: {
    tag: "Como eu penso",
    title: "Antes do código",
    text: "Antes da stack, vem a pergunta certa: qual problema precisa ser resolvido?",
    actionText: "Ver base técnica",
    targetId: "stacks",
  },
  stacks: {
    tag: "Base técnica",
    title: "Ferramentas & aplicação",
    text: "Aqui estão as ferramentas. Nos projetos você consegue ver por que e onde cada uma foi utilizada.",
    actionText: "Ver projetos",
    targetId: "projetos",
  },
  projetos: {
    tag: "Estudos de caso",
    title: "Provas de engenharia",
    text: "Aqui estão as principais provas do meu trabalho. Abra um projeto para conhecer o problema e as decisões por trás da solução.",
    actionText: "Abrir estudo de caso",
    targetId: "projetos",
  },
  metodo: {
    tag: "Como eu trabalho",
    title: "Processo & previsibilidade",
    text: "Você já viu algumas entregas. Quer conhecer agora o processo que utilizo para transformar problema em implementação?",
    actionText: "Ver método",
    targetId: "metodo",
  },
  skills: {
    tag: "Repertório técnico",
    title: "Fundamentos que permanecem",
    text: "Ferramentas mudam. A capacidade de tomar boas decisões técnicas precisa permanecer.",
    actionText: "Ver trajetória",
    targetId: "trajetoria",
  },
  competencias: {
    tag: "Repertório técnico",
    title: "Fundamentos que permanecem",
    text: "Ferramentas mudam. A capacidade de tomar boas decisões técnicas precisa permanecer.",
    actionText: "Ver trajetória",
    targetId: "trajetoria",
  },
  experiencia: {
    tag: "Trajetória",
    title: "Trajetória técnica",
    text: "Cada etapa acrescentou uma forma diferente de enxergar e resolver problemas.",
    actionText: "Falar comigo",
    targetId: "contato",
  },
  trajetoria: {
    tag: "Trajetória",
    title: "Trajetória técnica",
    text: "Cada etapa acrescentou uma forma diferente de enxergar e resolver problemas.",
    actionText: "Falar comigo",
    targetId: "contato",
  },
  contato: {
    tag: "Contato",
    title: "Iniciar conversa",
    text: "Se meu perfil fizer sentido para sua equipe, podemos continuar essa conversa.",
    actionText: "Entrar em contato",
    targetId: "contato",
  },
};

export const SECTION_THOUGHTS = EDITORIAL_GUIDE_HINTS;
