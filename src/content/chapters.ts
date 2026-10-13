// Arquitetura macro do portfólio: 6 capítulos, cada um ocupa uma tela.
// Fonte única para header, costuras de renda e o voo do beija-flor.

export type BirdZone =
  | "left-top"
  | "left-middle"
  | "left-bottom"
  | "right-top"
  | "right-middle"
  | "right-bottom";

export type ChapterId = "hero" | "sobre" | "projetos" | "processo" | "trajetoria" | "contato";

export type Chapter = {
  id: ChapterId;
  number: string;
  /** rótulo curto do menu */
  nav: string;
  /** nome editorial do capítulo */
  title: string;
  /** onde o beija-flor pousa enquanto o capítulo está na tela (alternando lados e alturas) */
  bird: BirdZone;
  /** dica do guia beija-flor para o capítulo */
  hint: string;
};

export const CHAPTERS: Chapter[] = [
  {
    id: "hero",
    number: "01",
    nav: "Início",
    title: "Apresentação",
    bird: "left-top",
    hint: "Comece pela trajetória que virou prática, ou pule direto para os projetos.",
  },
  {
    id: "sobre",
    number: "02",
    nav: "Formação",
    title: "Conexão + Autoridade",
    bird: "right-bottom",
    hint: "Cada formação aqui tem instituição, período e carga horária. Escolha um eixo.",
  },
  {
    id: "projetos",
    number: "03",
    nav: "Projetos",
    title: "Problemas + Projetos",
    bird: "left-middle",
    hint: "Cada projeto começa por um problema. Abra um case para ver solução, stack e links.",
  },
  {
    id: "processo",
    number: "04",
    nav: "Processo",
    title: "Como eu construo",
    bird: "right-top",
    hint: "Tecnologia escolhida pela função que ela cumpre dentro da solução.",
  },
  {
    id: "trajetoria",
    number: "05",
    nav: "Trajetória",
    title: "Trajetória",
    bird: "left-bottom",
    hint: "Três linhas que se encontram: desenvolvimento, dados & IA e carreira.",
  },
  {
    id: "contato",
    number: "06",
    nav: "Contato",
    title: "Contato",
    bird: "right-middle",
    hint: "Vamos conversar sobre o próximo problema?",
  },
];

export const CHAPTER_IDS = CHAPTERS.map((c) => c.id);

export const nextChapter = (id: ChapterId) => {
  const i = CHAPTERS.findIndex((c) => c.id === id);
  return CHAPTERS[i + 1] ?? null;
};

/** Tamanho do beija-flor por largura (espelha w-11 / sm:w-14 / md:w-16). */
export const birdSize = (w: number) => (w < 640 ? 44 : w < 768 ? 56 : 64);

/**
 * Coordenadas (canto superior esquerdo, em px de viewport) de cada zona.
 * No mobile o pássaro "espia" pela borda (parcialmente fora da tela) para não cobrir texto.
 */
export function birdZoneCoords(zone: BirdZone, w: number, h: number) {
  const b = birdSize(w);
  const mobile = w < 640;
  const margin = Math.min(24, Math.max(8, w * 0.02));
  const left = mobile ? -b * 0.28 : margin;
  const right = mobile ? w - b * 0.72 : w - margin - b;
  const top = mobile ? 66 : Math.min(88, Math.max(72, h * 0.09));
  const bottom = h - b - (mobile ? 18 : Math.min(36, Math.max(16, h * 0.04)));
  const middle = h / 2 - b / 2;
  const [side, v] = zone.split("-") as ["left" | "right", "top" | "middle" | "bottom"];
  return { x: side === "left" ? left : right, y: v === "top" ? top : v === "middle" ? middle : bottom, size: b };
}

/** Lado define para onde o pássaro olha em repouso: sempre para dentro da tela. */
export const zoneFacing = (zone: BirdZone): 1 | -1 => (zone.startsWith("left") ? 1 : -1);
