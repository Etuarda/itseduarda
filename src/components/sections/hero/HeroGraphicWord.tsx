import React, { useEffect, useRef } from "react";
import { alignAnchorTo, fontsReady } from "./heroGeometry";

const WORD = "EDUARDA";
/**
 * Letra sobre a qual o círculo da Cena 01 se fecha e que vira a íris do retrato.
 * Mobile: "A" central (EDU◯RDA, palavra centrada). Desktop: "A" final (EDUARD◯),
 * para a palavra correr à esquerda do retrato sem sair da tela.
 */
const ANCHOR_INDEX = { mobile: 3, desktop: 6 };

export function getWordAnchor(root: HTMLElement) {
  const desktop = window.matchMedia("(min-width: 1024px)").matches;
  const index = desktop ? ANCHOR_INDEX.desktop : ANCHOR_INDEX.mobile;
  return root.querySelector<HTMLElement>(`[data-hero="word"] > [data-index="${index}"]`);
}

/** Alinha a letra-âncora da palavra de fundo ao centro do retrato do layout. */
export function alignGraphicWord(root: HTMLElement) {
  const word = root.querySelector<HTMLElement>('[data-hero="word"]');
  const anchor = getWordAnchor(root);
  const portrait = root.querySelector<HTMLElement>('[data-hero="portrait"]');
  if (word && anchor && portrait) alignAnchorTo(word, anchor, portrait);
}

export default function HeroGraphicWord() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>("section");
    if (!root) return;

    const align = () => alignGraphicWord(root);
    align();
    fontsReady().then(align);

    const ro = new ResizeObserver(align);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute left-0 top-0 select-none pointer-events-none z-[1]"
    >
      <span
        data-hero="word"
        className="block whitespace-nowrap leading-none font-black text-[clamp(5rem,22vw,13rem)] lg:text-[clamp(8rem,15.5vw,18rem)] will-change-transform"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          letterSpacing: "-0.04em",
          color: "rgba(68, 80, 58, 0.09)",
        }}
      >
        {WORD.split("").map((letter, i) => (
          // inline (não inline-block): o retângulo medido é a área de conteúdo da fonte,
          // a mesma referência usada por measureGlyphInk
          <span key={i} data-hero="letter" data-index={i}>
            {letter}
          </span>
        ))}
      </span>
    </div>
  );
}
