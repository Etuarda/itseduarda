import React, { useCallback, useEffect, useRef, useState } from "react";
import ChapterShell, { ChapterHeading } from "./ChapterShell";
import ProjectCaseDialog from "./ProjectCaseDialog";
import { CardLinks } from "./ProjectLinks";
import { useCarouselAutoplay } from "@/hooks/useCarouselAutoplay";
import { OTHER_PROJECTS, PROJECTS, PROJECTS_COPY, type Project } from "@/content/portfolioProjects";
import { OTHER_IDENTITY, PROJECT_IDENTITY } from "@/content/projectIdentity";

const sans = { fontFamily: "'DM Sans', sans-serif" };
const display = { fontFamily: "'Playfair Display', Georgia, serif" };

const dots = { backgroundImage: "radial-gradient(rgba(62,42,107,0.16) 1px, transparent 1.2px)", backgroundSize: "14px 14px" };

const cardLink =
  "inline-flex items-center gap-1 py-1 text-[11px] uppercase tracking-[0.16em] font-semibold underline underline-offset-4 decoration-[#3E2A6B]/40 hover:text-[#3E2A6B] hover:decoration-[#3E2A6B] outline-none focus-visible:ring-2 focus-visible:ring-[#3E2A6B]";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Host exibido na barra do navegador (só para projetos com deploy). */
const host = (p: Project) => {
  const l = p.links.find((x) => x.kind === "deploy" || x.kind === "dashboard");
  return l ? new URL(l.href).host : undefined;
};

/** Celular com a captura mobile real do produto (390×844 @2x). */
function Phone({ src, name }: { src: string; name: string }) {
  return (
    <div className="case-phone absolute right-0 bottom-0 w-[21%] p-[3%] rounded-[clamp(0.8rem,2.4cqw,1.6rem)] bg-[#23241F] shadow-[0_16px_30px_-14px_rgba(35,36,31,0.75)]">
      <div className="relative w-full aspect-[390/844] overflow-hidden rounded-[clamp(0.5rem,1.6cqw,1.1rem)] bg-white">
        <img src={src} alt={`Versão mobile do ${name}`} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-top" />
      </div>
    </div>
  );
}

/**
 * Demonstração do projeto: janela de desktop em 16:10 (proporção nativa das capturas
 * 1440×900, sem recorte) + celular com a versão mobile quando existe captura real.
 * A caixa tem altura explícita, então o conjunto se encaixa pela largura OU pela altura
 * (container query) em qualquer tela — inclusive com zoom/escala do sistema.
 */
function Visual({ p }: { p: Project }) {
  const id = PROJECT_IDENTITY[p.slug];
  const url = host(p);
  // com celular: janela = 86% do palco, palco ≈ 0,58 × largura de altura
  const stage = id.mobile ? "w-[min(100cqw,calc((100cqh-1.75rem)/0.58))] pb-[4%]" : "w-[min(100cqw,calc((100cqh-1.75rem)*1.6))]";
  return (
    <div className="w-full h-full grid place-items-center [container-type:size]">
      <div className={`relative ${stage}`}>
        <div
          className={`case-window flex flex-col ${id.mobile ? "w-[86%]" : "w-full"} border border-[#23241F]/30 bg-[#FBF9F4] shadow-[0_14px_32px_-22px_rgba(35,36,31,0.7)]`}
          style={{ color: id.ink }}
        >
          {/* barra do navegador */}
          <div aria-hidden="true" className="h-7 shrink-0 flex items-center gap-1.5 px-2.5 border-b border-[#23241F]/15 bg-[#EFEAF6]" style={sans}>
            <span className="size-2 rounded-full bg-[#23241F]/25" />
            <span className="size-2 rounded-full bg-[#23241F]/25" />
            <span className="size-2 rounded-full bg-[#23241F]/25" />
            <span className="ml-2 flex-1 min-w-0 truncate px-2 h-4 leading-4 text-[10px] text-[#23241F]/60 bg-[#FBF9F4] border border-[#23241F]/10">
              {url ?? p.name}
            </span>
          </div>
          <div className="relative w-full aspect-[16/10] overflow-hidden" style={{ background: id.bg }}>
            {id.desktop ? (
              <img src={id.desktop} alt={`Tela do ${p.name} no desktop`} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-contain" />
            ) : (
              <div className="absolute inset-0 p-[clamp(0.9rem,3cqw,2.5rem)] flex flex-col justify-between">
                <span className="text-[11px] uppercase tracking-[0.22em] font-semibold opacity-70" style={sans}>
                  {p.nature}
                </span>
                <span className="text-[clamp(1.6rem,6cqw,4rem)] font-bold leading-[0.98] tracking-tight" style={id.font ? { fontFamily: id.font } : display}>
                  {p.name}
                </span>
                <span className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] uppercase tracking-[0.16em] opacity-80" style={sans}>
                  {p.highlight.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </span>
              </div>
            )}
            <span aria-hidden="true" className="absolute left-0 right-0 bottom-0 h-1" style={{ background: id.accent }} />
          </div>
        </div>
        {id.mobile && <Phone src={id.mobile} name={p.name} />}
      </div>
    </div>
  );
}

/** Rótulo pequeno de bloco ("Problema", "Solução"). */
function Label({ children }: { children: React.ReactNode }) {
  return <span className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#3E2A6B] mb-0.5">{children}</span>;
}

/** Anterior/próximo só para teclado e leitores de tela: aparecem ao receber foco. */
const srNav =
  "sr-only focus:not-sr-only focus:absolute focus:z-20 focus:top-1/2 focus:-translate-y-1/2 focus:px-3 focus:py-2 focus:bg-[#23241F] focus:text-[#FBF9F4] text-xs uppercase tracking-[0.18em] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#3E2A6B]";

/** Bloqueia o clique que o navegador dispara logo depois de um arraste. */
const swallowNextClick = () => {
  const block = (ev: MouseEvent) => ev.preventDefault();
  window.addEventListener("click", block, { capture: true, once: true });
  window.setTimeout(() => window.removeEventListener("click", block, { capture: true }), 0);
};

/** Problemas + Projetos: 6 cases em carrossel de telas + 9 projetos numa película ("Mais no GitHub"). */
export default function ProjectsChapter() {
  const [open, setOpen] = useState<Project | null>(null);
  const [active, setActive] = useState(0);
  const region = useRef<HTMLDivElement | null>(null);
  const track = useRef<HTMLUListElement | null>(null);
  const target = useRef(0);
  const drag = useRef<{ x: number; id: number } | null>(null);
  const total = PROJECTS.length;

  const go = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      const next = (i + total) % total;
      target.current = next;
      el.scrollTo({ left: next * el.clientWidth, behavior: reducedMotion() ? "auto" : "smooth" });
    },
    [total],
  );

  // troca de case a cada 7 s: tempo de ler a dor e a solução
  const auto = useCarouselAutoplay(region, { interval: 7000, onTick: () => go(target.current + 1) });
  const goManual = (i: number) => {
    auto.hold(9000);
    go(i);
  };

  // o índice ativo segue o scroll (swipe, trackpad, autoplay ou foco por teclado)
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (Math.abs(el.scrollLeft - i * el.clientWidth) < 2) target.current = i; // scroll assentou
    if (i !== active) setActive(i);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goManual(target.current + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goManual(target.current - 1);
    }
  };

  // mouse: arrastar para o lado troca de case (no toque, o deslize nativo já faz isso)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button === 0) drag.current = { x: e.clientX, id: e.pointerId };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 50) {
      swallowNextClick();
      goManual(target.current + (dx < 0 ? 1 : -1));
    }
  };

  return (
    // a âncora #projetos cobre as duas telas: menu, beija-flor e links tratam tudo como um capítulo só
    <div id="projetos" className="relative">
      <ChapterShell
        id="projetos"
        domId="projetos-cases"
        className="bg-[#D6C6F1] text-[#23241F]"
        innerClassName="pt-[max(5rem,10svh)] sm:pt-[max(5.5rem,12svh)] pb-[max(2.5rem,6svh)] gap-[clamp(0.75rem,2.2svh,1.5rem)]"
        decor={<div className="absolute inset-0 opacity-60" style={dots} />}
      >
        <ChapterHeading
          id="projetos"
          kicker={PROJECTS_COPY.kicker}
          title={PROJECTS_COPY.title}
          accentClass="text-[#3E2A6B]"
          kickerClass="text-[#3E2A6B]"
        />

        <div
          ref={region}
          role="region"
          aria-roledescription="carrossel"
          aria-label="Cases principais"
          tabIndex={0}
          onKeyDown={onKeyDown}
          {...auto.handlers}
          className="relative flex-1 min-h-0 flex flex-col gap-[clamp(0.6rem,1.8svh,1.1rem)] outline-none focus-visible:ring-2 focus-visible:ring-[#3E2A6B]/50 focus-visible:ring-offset-4 focus-visible:ring-offset-[#D6C6F1]"
          style={sans}
        >
          <ul
            ref={track}
            onScroll={onScroll}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (drag.current = null)}
            {...auto.hoverHandlers}
            className="flex-1 min-h-0 flex overflow-x-auto snap-x snap-mandatory no-scrollbar overscroll-x-contain select-none lg:cursor-grab"
          >
            {PROJECTS.map((p, i) => (
              <li
                key={p.slug}
                role="group"
                aria-roledescription="slide"
                aria-label={p.name}
                data-active={i === active}
                className="case-slide w-full shrink-0 snap-start snap-always min-h-0 overflow-hidden p-1 flex flex-col max-lg:justify-center lg:grid lg:grid-cols-12 gap-[clamp(0.6rem,1.6svh,1.25rem)] lg:gap-10"
              >
                <div className="h-[min(calc((100vw-3rem)*0.6+1.75rem),46svh)] sm:h-[min(calc((100vw-5rem)*0.6+1.75rem),50svh)] lg:h-[max(22rem,calc(100svh-19rem))] lg:self-center lg:col-span-7 min-h-0 shrink-0">
                  <Visual p={p} />
                </div>

                <div className="case-text lg:col-span-5 max-lg:flex-none lg:flex-1 min-h-0 flex flex-col *:shrink-0 justify-start lg:justify-center-safe gap-[clamp(0.3rem,1svh,0.8rem)] overflow-hidden">
                  <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#3E2A6B] line-clamp-1">{p.nature}</p>
                  <h3 className="text-[clamp(1.5rem,min(3vw,4.6svh),2.6rem)] font-bold leading-[1.02] tracking-tight" style={display}>
                    {p.name}
                  </h3>
                  <p className="hidden lg:block text-xs text-[#4B4B44]">
                    <span className="line-clamp-2">{p.context}</span>
                  </p>
                  <div className="hidden lg:block">
                    <Label>Problema</Label>
                    <p className="italic text-[clamp(0.92rem,min(1.2vw,2.1svh),1.15rem)] leading-snug text-[#2F2E2A] line-clamp-4" style={display}>
                      {p.problem}
                    </p>
                  </div>
                  <div className="hidden lg:block">
                    <Label>Solução</Label>
                    <p className="text-[clamp(0.82rem,min(1vw,1.9svh),0.95rem)] leading-snug text-[#3A3A34] line-clamp-3">{p.solution}</p>
                  </div>
                  <ul aria-label="Tecnologias" className="hidden lg:flex flex-wrap gap-1.5">
                    {p.highlight.map((t) => (
                      <li key={t} className="px-2 py-0.5 text-[11px] font-medium border border-[#23241F]/25 bg-[#FBF9F4]/70">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-0.5 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <button
                      type="button"
                      onClick={() => setOpen(p)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#23241F] text-[#FBF9F4] text-[11px] uppercase tracking-[0.18em] font-semibold cursor-pointer hover:bg-[#3E2A6B] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#3E2A6B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#D6C6F1]"
                    >
                      Ver case
                      <span className="sr-only">completo de {p.name}</span>
                    </button>
                    <CardLinks links={p.links} name={p.name} linkClassName={cardLink} />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Índice pelos nomes: mostra onde está e leva direto a qualquer case */}
          <div className="relative flex items-center gap-3">
            <button type="button" onClick={() => goManual(target.current - 1)} className={`${srNav} focus:left-0`}>
              Case anterior
            </button>
            <ul aria-label="Escolher case" className="flex-1 min-w-0 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {PROJECTS.map((p, i) => (
                <li key={p.slug} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => goManual(i)}
                    aria-current={i === active ? "true" : undefined}
                    className={`h-9 px-3 text-[11px] uppercase tracking-[0.16em] font-semibold border transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#3E2A6B] ${
                      i === active ? "bg-[#23241F] text-[#FBF9F4] border-[#23241F]" : "border-[#23241F]/25 text-[#23241F]/75 hover:text-[#23241F] hover:border-[#23241F]/60"
                    }`}
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => goManual(target.current + 1)} className={`${srNav} focus:right-0`}>
              Próximo case
            </button>
          </div>
          <p aria-live="polite" className="sr-only">
            {PROJECTS[active]?.name}
          </p>
        </div>

        <ProjectCaseDialog project={open} onClose={() => setOpen(null)} />
      </ChapterShell>

      <MoreOnGitHub />
    </div>
  );
}

/**
 * Segunda tela do capítulo: os 9 projetos complementares como uma película que corre
 * sozinha em loop. Arraste com o mouse ou deslize no toque; passar o mouse, focar ou
 * arrastar segura a película.
 */
function MoreOnGitHub() {
  const region = useRef<HTMLElement | null>(null);
  const rail = useRef<HTMLUListElement | null>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const pos = useRef(0);
  const speed = useRef(1);
  const auto = useCarouselAutoplay(region);
  const { running, isHeld, hold } = auto;

  // largura de uma volta completa = início da cópia que fecha o loop
  const loopWidth = () => {
    const el = rail.current;
    const clone = el?.querySelector<HTMLElement>("[data-clone]");
    return el && clone ? clone.offsetLeft - (el.firstElementChild as HTMLElement).offsetLeft : 0;
  };

  // deriva contínua (~32 px/s), com posição fracionária acumulada para não "travar" no arredondamento
  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const el = rail.current;
      const dt = Math.min(64, now - last);
      last = now;
      if (el && !drag.current && !isHeld() && !document.hidden) {
        if (Math.abs(el.scrollLeft - pos.current) > 2) pos.current = el.scrollLeft; // usuário rolou
        pos.current += (32 * speed.current * dt) / 1000;
        const w = loopWidth();
        if (w && pos.current >= w) pos.current -= w;
        el.scrollLeft = pos.current;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [running, isHeld]);

  // rolagem manual também dá a volta, nos dois sentidos
  const onScroll = () => {
    const el = rail.current;
    const w = loopWidth();
    if (!el || !w) return;
    if (el.scrollLeft >= w + 1) el.scrollLeft -= w;
    else if (el.scrollLeft <= 0 && drag.current) el.scrollLeft += w;
  };

  const step = (dir: 1 | -1) => {
    const el = rail.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    hold(8000);
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 20), behavior: reducedMotion() ? "auto" : "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !rail.current) return;
    drag.current = { x: e.clientX, left: rail.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const el = rail.current;
    if (!d || !el) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      el.dataset.dragging = "true";
      el.setPointerCapture(e.pointerId);
    }
    if (d.moved) el.scrollLeft = d.left - dx;
  };
  const endDrag = (e: React.PointerEvent) => {
    const el = rail.current;
    if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    if (el) delete el.dataset.dragging;
    if (drag.current?.moved) {
      swallowNextClick();
      hold(5000);
    }
    drag.current = null;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  const card = (o: (typeof OTHER_PROJECTS)[number], i: number, clone = false) => (
    <li
      key={`${clone ? "c-" : ""}${o.slug}`}
      {...(clone ? { "data-clone": i === 0 ? "" : undefined, "aria-hidden": true, inert: true } : {})}
      className="film-card group relative shrink-0 w-[min(78vw,20rem)] lg:w-[21rem] max-h-full flex flex-col gap-1.5 *:shrink-0 p-[clamp(0.85rem,1.8svh,1.15rem)] bg-[#FBF9F4] border border-[#23241F]/15 overflow-hidden"
      style={{ ["--tilt" as string]: `${i % 2 ? 1.2 : -1.2}deg` }}
    >
      <span aria-hidden="true" className="absolute left-0 right-0 top-0 h-1 transition-[height] duration-300 group-hover:h-1.5" style={{ background: OTHER_IDENTITY[o.slug].accent }} />
      <p className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#3E2A6B] line-clamp-1">{o.context}</p>
      <h4 className="text-[1.15rem] font-bold leading-tight line-clamp-2" style={display}>
        {o.name}
      </h4>
      <p className="text-[0.82rem] leading-snug text-[#2F2E2A] line-clamp-3">
        <b className="font-semibold">Dor:</b> {o.problem}
      </p>
      <p className="text-[0.82rem] leading-snug text-[#3A3A34] line-clamp-3">
        <b className="font-semibold">Solução:</b> {o.solution}
      </p>
      <p className="text-[0.72rem] text-[#4B4B44] line-clamp-1">{o.highlight.join(" · ")}</p>
      <CardLinks links={o.links} name={o.name} className="mt-auto pt-1" linkClassName={cardLink} />
    </li>
  );

  return (
    <section
      ref={region}
      aria-labelledby="mais-github-title"
      className="chapter relative w-full overflow-hidden bg-[#D6C6F1] text-[#23241F]"
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-60" style={dots} />
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col pt-[max(5.5rem,12svh)] pb-[max(3.5rem,8svh)] gap-[clamp(0.75rem,2.2svh,1.5rem)]" style={sans}>
        <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div className="flex flex-col gap-2 sm:gap-3">
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.24em] font-semibold text-[#3E2A6B]">Projetos complementares</p>
            <h3 id="mais-github-title" className="font-bold tracking-tight leading-[1.02] text-[clamp(1.8rem,min(4.4vw,5.6svh),3.6rem)]" style={display}>
              Mais no <em className="italic font-normal text-[#3E2A6B]">GitHub</em>.
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <p className="hidden md:block text-xs uppercase tracking-[0.2em] text-[#3E2A6B] font-semibold">Arraste para explorar</p>
          </div>
        </header>

        {/* Película em loop: a lista aparece duas vezes; a cópia é só visual (aria-hidden + inert) */}
        <div
          role="region"
          aria-roledescription="carrossel"
          aria-label="Mais projetos no GitHub"
          tabIndex={0}
          onKeyDown={onKeyDown}
          {...auto.handlers}
          className="relative flex-1 min-h-0 flex outline-none focus-visible:ring-2 focus-visible:ring-[#3E2A6B]/50 focus-visible:ring-offset-4 focus-visible:ring-offset-[#D6C6F1]"
        >
          <button type="button" onClick={() => step(-1)} className={`${srNav} focus:left-0`}>
            Projetos anteriores
          </button>
          <ul
            ref={rail}
            onScroll={onScroll}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerOver={(e) => {
              if (e.pointerType === "mouse") speed.current = (e.target as HTMLElement).closest(".film-card") ? 0 : 0.3;
            }}
            onPointerLeave={() => (speed.current = 1)}
            className="film-strip flex-1 min-h-0 flex items-center gap-5 overflow-x-auto no-scrollbar overscroll-x-contain -mx-6 px-6 sm:-mx-10 sm:px-10 lg:-mx-16 lg:px-16 py-3 cursor-grab"
          >
            {OTHER_PROJECTS.map((o, i) => card(o, i))}
            {OTHER_PROJECTS.map((o, i) => card(o, i, true))}
          </ul>
          <button type="button" onClick={() => step(1)} className={`${srNav} focus:right-0`}>
            Próximos projetos
          </button>
        </div>
      </div>
    </section>
  );
}
