import React, { useRef, useState } from "react";
import ChapterShell, { ChapterHeading } from "./ChapterShell";
import { useCarouselAutoplay } from "@/hooks/useCarouselAutoplay";
import InstitutionLogo from "@/components/sections/hero/InstitutionLogo";
import { AUTHORITY, type AuthorityAxis, type Credential } from "@/content/authority";
import textureGrain from "@/components/assets/texture-grain-soft.png";

const sans = { fontFamily: "'DM Sans', sans-serif" };
const display = { fontFamily: "'Playfair Display', Georgia, serif" };

type Item = Credential & { axis: AuthorityAxis["id"]; axisLabel: string };

/** Todas as formações numa sequência só; o eixo vira marcador e atalho. */
const ITEMS: Item[] = AUTHORITY.axes.flatMap((a) => a.credentials.map((c) => ({ ...c, axis: a.id, axisLabel: a.label })));

/** Anterior/próximo só para teclado e leitores de tela: aparecem ao receber foco. */
const srNav =
  "sr-only focus:not-sr-only focus:absolute focus:z-20 focus:top-1/2 focus:-translate-y-1/2 focus:px-3 focus:py-2 focus:bg-[#F5F2E9] focus:text-[#23241F] text-xs uppercase tracking-[0.18em] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#D4C2EE]";

/** Conexão + Autoridade: oliva profundo, formações num carrossel 3D que gira sozinho (coverflow). */
export default function AuthorityChapter() {
  const [active, setActive] = useState(0);
  const drag = useRef<{ x: number; id: number } | null>(null);
  const swiped = useRef(false);
  const region = useRef<HTMLDivElement | null>(null);
  const total = ITEMS.length;
  const current = ITEMS[active];

  const go = (i: number) => setActive(((i % total) + total) % total);
  // gira para a próxima formação a cada 4,2 s; qualquer interação segura o giro por alguns segundos
  const auto = useCarouselAutoplay(region, { interval: 4200, onTick: () => setActive((a) => (a + 1) % total) });
  const goManual = (i: number) => {
    auto.hold();
    go(i);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goManual(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goManual(active - 1);
    }
  };

  // arrastar/deslizar: 40px já troca de formação
  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, id: e.pointerId };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 40) {
      goManual(active + (dx < 0 ? 1 : -1));
      // o clique que o navegador dispara após o arraste não deve focar a vizinha
      swiped.current = true;
      window.setTimeout(() => (swiped.current = false), 0);
    }
  };

  return (
    <ChapterShell
      id="sobre"
      className="bg-[#2B3524] text-[#F5F2E9]"
      innerClassName="pt-[max(5.5rem,12svh)] pb-[max(4rem,9svh)] justify-center-safe gap-[clamp(0.7rem,2svh,1.6rem)]"
      decor={
        <>
          <div className="absolute inset-0 opacity-[0.18] mix-blend-soft-light" style={{ backgroundImage: `url(${textureGrain})` }} />
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-3 items-end">
        <ChapterHeading
          id="sobre"
          kicker={AUTHORITY.kicker}
          title={AUTHORITY.title}
          accentClass="text-[#D4C2EE]"
          kickerClass="text-[#C9D3B4]"
          className="lg:col-span-7"
        />
        <p
          className="lg:col-span-5 text-[#E7E3D6] text-[clamp(0.95rem,1.15vw,1.08rem)] leading-relaxed max-w-xl max-sm:hidden [@media(max-height:760px)]:max-lg:hidden"
          style={sans}
        >
          {AUTHORITY.text}
        </p>
      </div>

      <div
        role="region"
        aria-roledescription="carrossel"
        aria-label="Formações"
        ref={region}
        tabIndex={0}
        onKeyDown={onKeyDown}
        {...auto.handlers}
        className="relative flex-1 min-h-0 flex flex-col gap-[clamp(0.6rem,1.6svh,1rem)] outline-none focus-visible:ring-2 focus-visible:ring-[#D4C2EE]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#2B3524]"
        style={sans}
      >
        {/* Eixos: mostram onde a formação atual está e levam direto ao eixo */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0">
          {AUTHORITY.axes.map((a) => {
            const on = current.axis === a.id;
            const first = ITEMS.findIndex((it) => it.axis === a.id);
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => goManual(first)}
                aria-pressed={on}
                className={`shrink-0 h-9 px-3 text-[11px] uppercase tracking-[0.2em] font-semibold border transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#D4C2EE] ${
                  on ? "bg-[#D4C2EE] text-[#23241F] border-[#D4C2EE]" : "border-[#F5F2E9]/30 text-[#F5F2E9]/80 hover:text-[#F5F2E9] hover:border-[#F5F2E9]/70"
                }`}
              >
                {a.label}
              </button>
            );
          })}
        </div>

        {/* Palco em perspectiva: a formação atual no centro, vizinhas inclinadas nas laterais */}
        <div
          className="relative flex-1 min-h-[16rem] [perspective:1400px] touch-pan-y select-none"
          {...auto.hoverHandlers}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (drag.current = null)}
        >
          <ul className="absolute inset-0 [transform-style:preserve-3d]">
            {ITEMS.map((c, i) => {
              // distância circular até a ativa, para o carrossel girar sem fim
              let d = i - active;
              if (d > total / 2) d -= total;
              if (d < -total / 2) d += total;
              const ad = Math.abs(d);
              const visible = ad <= 2;
              return (
                <li
                  key={`${c.axis}-${c.name}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={c.name}
                  aria-hidden={d !== 0}
                  inert={d !== 0}
                  onClick={() => !swiped.current && d !== 0 && goManual(i)}
                  className={`coverflow-card absolute left-1/2 top-1/2 w-[min(78vw,27rem)] h-full max-h-[22rem] ${d !== 0 ? "cursor-pointer" : ""}`}
                  style={{
                    transform: `translate(-50%,-50%) translateX(${d * 62}%) translateZ(${-ad * 160}px) rotateY(${-d * 28}deg)`,
                    opacity: visible ? 1 - ad * 0.36 : 0,
                    zIndex: 10 - ad,
                    pointerEvents: visible ? "auto" : "none",
                  }}
                >
                  <article
                    className={`h-full flex flex-col gap-2 p-[clamp(1rem,2.4svh,1.6rem)] border transition-colors ${
                      d === 0 ? `bg-[#F5F2E9] text-[#23241F] border-[#F5F2E9] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] ${auto.running ? "coverflow-float" : ""}` : "bg-[#36422D] text-[#F5F2E9]/70 border-[#F5F2E9]/20 [&_*]:!opacity-80"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      {c.logo ? (
                        <InstitutionLogo logo={c.logo} size="sm" tone={d === 0 ? "color" : "light"} className="!h-8 sm:!h-9" />
                      ) : (
                        <span className="text-xs uppercase tracking-[0.16em]">{c.institution}</span>
                      )}
                      <span className={`text-[10px] uppercase tracking-[0.2em] font-semibold ${d === 0 ? "text-[#44503A]" : "text-[#C9D3B4]"}`}>{c.axisLabel}</span>
                    </div>
                    <div className="mt-auto flex flex-col gap-1.5">
                      {c.hours && (
                        <span className={`text-[clamp(2.2rem,min(5vw,7svh),3.6rem)] leading-none tabular-nums ${d === 0 ? "text-[#3E2A6B]" : "text-[#D4C2EE]"}`} style={display}>
                          {c.hours}
                        </span>
                      )}
                      <h3 className="font-bold text-[clamp(1.1rem,1.7vw,1.4rem)] leading-snug" style={display}>
                        {c.name}
                      </h3>
                      <p className="text-xs uppercase tracking-[0.14em] opacity-80">
                        {c.institution} · {c.period}
                      </p>
                      <p className="text-[0.82rem] leading-relaxed opacity-90 line-clamp-2">{c.tags.join(" · ")}</p>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>

        {/* anterior/próximo só aparecem para quem navega por teclado */}
        <div className="relative h-0">
          <button type="button" onClick={() => goManual(active - 1)} className={`${srNav} focus:left-0`}>
            Formação anterior
          </button>
          <button type="button" onClick={() => goManual(active + 1)} className={`${srNav} focus:right-0`}>
            Próxima formação
          </button>
        </div>
        <p aria-live="polite" className="sr-only">
          {current.name}, {current.institution}
        </p>
      </div>

      {/* Qualidade e backend: faixa menor */}
      <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-1 text-[0.82rem] text-[#E7E3D6] [@media(max-height:700px)]:hidden" style={sans}>
        {AUTHORITY.extras.map((x) => (
          <li key={x.name}>
            <span className="font-semibold text-[#F5F2E9]">{x.name}</span> · {x.meta}
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="hidden sm:block italic text-[clamp(1rem,1.5vw,1.3rem)] text-[#F5F2E9] max-w-2xl" style={display}>
          {AUTHORITY.closing}
        </p>
        <a
          href="#projetos"
          className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-3 bg-[#D4C2EE] text-[#23241F] text-xs uppercase tracking-[0.18em] font-semibold hover:bg-[#F5F2E9] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#F5F2E9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B3524]"
          style={sans}
        >
          Ver projetos
        </a>
      </div>
    </ChapterShell>
  );
}
