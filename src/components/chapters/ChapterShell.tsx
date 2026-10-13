import React, { useEffect, useRef } from "react";
import type { ChapterId } from "@/content/chapters";

/**
 * Casca de um capítulo: ocupa exatamente uma tela (100svh) em telas com altura
 * suficiente — abaixo disso cresce com o conteúdo para nunca cortar informação.
 * O visual (cor/textura) vem de `className`; o conteúdo fica centralizado no grid editorial.
 */
export default function ChapterShell({
  id,
  className = "",
  innerClassName = "",
  children,
  decor,
  domId,
}: {
  id: ChapterId;
  /** id do elemento quando a âncora do capítulo fica num wrapper (ex.: 03 com duas telas) */
  domId?: string;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  /** camada decorativa atrás do conteúdo (texturas, grafismos) */
  decor?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);

  // Marca o capítulo como visto na primeira entrada em tela: libera as animações .chapter-rise
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.seen = "true";
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={domId ?? id}
      data-chapter={id}
      aria-labelledby={`${id}-title`}
      className={`chapter relative w-full overflow-hidden ${className}`}
    >
      {decor && (
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none">
          {decor}
        </div>
      )}
      <div
        className={`chapter-inner relative z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col ${innerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}

/** Título de capítulo: nome editorial + h2 com uma palavra de destaque em itálico. */
export function ChapterHeading({
  id,
  kicker,
  title,
  accentClass,
  kickerClass = "",
  className = "",
}: {
  id: ChapterId;
  kicker: string;
  title: { lead: string; accent: string; tail: string };
  accentClass: string;
  kickerClass?: string;
  className?: string;
}) {
  return (
    <header className={`flex flex-col gap-2 sm:gap-3 ${className}`}>
      <p className={`text-[11px] sm:text-xs uppercase tracking-[0.24em] font-semibold ${kickerClass}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {kicker}
      </p>
      <h2
        id={`${id}-title`}
        className="font-bold tracking-tight leading-[1.02] text-[clamp(1.9rem,min(5.2vw,6.4svh),4.4rem)]"
        style={{ fontFamily: "'Playfair Display', Georgia, serif", textWrap: "balance" }}
      >
        {title.lead}
        <em className={`italic font-normal ${accentClass}`}>{title.accent}</em>
        {title.tail}
      </h2>
    </header>
  );
}
