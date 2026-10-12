// Utilitários de geometria compartilhados entre a palavra gráfica e a coreografia.
// Medem a "tinta" real de um glifo (e não a caixa de linha), para que o círculo
// da animação encaixe exatamente na letra-âncora da palavra gráfica.

export type InkBox = {
  left: number;
  top: number;
  width: number;
  height: number;
  cx: number;
  cy: number;
};

let measureCanvas: HTMLCanvasElement | null = null;

/** Caixa da tinta do glifo em coordenadas de viewport (inclui transforms). */
export function glyphInkBox(el: HTMLElement): InkBox {
  // Range mede a área de conteúdo do texto, mesmo em elementos inline-block
  const range = document.createRange();
  range.selectNodeContents(el);
  const rect = range.getBoundingClientRect();
  const cs = getComputedStyle(el);
  measureCanvas ??= document.createElement("canvas");
  const ctx = measureCanvas.getContext("2d");

  let left = rect.left;
  let top = rect.top + rect.height * 0.15;
  let width = rect.width;
  let height = rect.height * 0.7;

  if (ctx) {
    ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    const m = ctx.measureText(el.textContent || "A");
    const ascent = m.fontBoundingBoxAscent ?? rect.height * 0.8;
    left = rect.left - m.actualBoundingBoxLeft;
    top = rect.top + ascent - m.actualBoundingBoxAscent;
    width = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
    height = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
  }

  return { left, top, width, height, cx: left + width / 2, cy: top + height / 2 };
}

/** Translada `word` para que o centro da tinta de `anchor` caia no centro de `target`. */
export function alignAnchorTo(word: HTMLElement, anchor: HTMLElement, target: HTMLElement) {
  word.style.transform = "none";
  const ink = glyphInkBox(anchor);
  const t = target.getBoundingClientRect();
  // Delta entre dois pontos medidos no mesmo instante: independe do scroll
  const dx = t.left + t.width / 2 - ink.cx;
  const dy = t.top + t.height / 2 - ink.cy;
  word.style.transform = `translate3d(${Math.round(dx)}px, ${Math.round(dy)}px, 0)`;
}

/** Centro de um elemento em coordenadas relativas a `root`. */
export function centerWithin(el: Element, root: Element) {
  const r = el.getBoundingClientRect();
  const rr = root.getBoundingClientRect();
  return {
    x: r.left - rr.left + r.width / 2,
    y: r.top - rr.top + r.height / 2,
    width: r.width,
    height: r.height,
  };
}

/** Aguarda as fontes editoriais, com teto para nunca segurar a coreografia. */
export function fontsReady(timeoutMs = 900): Promise<void> {
  if (!("fonts" in document)) return Promise.resolve();
  return Promise.race([
    document.fonts.ready.then(() => undefined),
    new Promise<void>((resolve) => setTimeout(resolve, timeoutMs)),
  ]);
}

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
