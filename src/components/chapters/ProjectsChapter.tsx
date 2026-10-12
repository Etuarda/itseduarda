import React, { useCallback, useRef, useState } from "react";
import ChapterShell, { ChapterHeading } from "./ChapterShell";
import ProjectCaseDialog, { LINK_LABEL } from "./ProjectCaseDialog";
import { OTHER_PROJECTS, PROJECTS, PROJECTS_COPY, type Project, type ProjectLinks } from "@/content/portfolioProjects";
import { OTHER_IDENTITY, PROJECT_IDENTITY, type ProjectIdentity } from "@/content/projectIdentity";

const sans = { fontFamily: "'DM Sans', sans-serif" };
const display = { fontFamily: "'Playfair Display', Georgia, serif" };

/** Um slide por projeto: cases completos primeiro, depois os demais. */
type Slide = {
  key: string;
  name: string;
  kind: string;
  problem?: string;
  solution?: string;
  stack: string[];
  proofs?: Project["proofs"];
  links: ProjectLinks;
  identity: ProjectIdentity;
  project?: Project;
};

const SLIDES: Slide[] = [
  ...PROJECTS.map((p) => ({
    key: p.slug,
    name: p.name,
    kind: p.kind,
    problem: p.problem,
    solution: p.solution,
    stack: p.highlight,
    proofs: p.proofs,
    links: p.links,
    identity: PROJECT_IDENTITY[p.slug],
    project: p,
  })),
  ...OTHER_PROJECTS.map((o) => {
    const [kind, ...stack] = o.meta.split(" · ");
    return { key: o.slug, name: o.name, kind, stack, links: o.links, identity: OTHER_IDENTITY[o.slug] };
  }),
];

/** Host exibido na barra do navegador (só para projetos com deploy). */
const host = (url?: string) => (url ? new URL(url).host : undefined);

/** Celular com a captura mobile real do produto (390×844 @2x). */
function Phone({ src, name }: { src: string; name: string }) {
  return (
    <div className="absolute right-0 bottom-0 w-[21%] p-[3%] rounded-[clamp(0.8rem,2.4cqw,1.6rem)] bg-[#23241F] shadow-[0_16px_30px_-14px_rgba(35,36,31,0.75)]">
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
function Visual({ s }: { s: Slide }) {
  const id = s.identity;
  const url = host(s.links.deploy ?? s.links.dashboard);
  // com celular: janela = 86% do palco, palco ≈ 0,58 × largura de altura
  const stage = id.mobile
    ? "w-[min(100cqw,calc((100cqh-1.75rem)/0.58))] pb-[4%]"
    : "w-[min(100cqw,calc((100cqh-1.75rem)*1.6))]";
  return (
    <div className="w-full h-full grid place-items-center [container-type:size]">
      <div className={`relative ${stage}`}>
        <div
          className={`flex flex-col ${id.mobile ? "w-[86%]" : "w-full"} border border-[#23241F]/30 bg-[#FBF9F4] shadow-[0_14px_32px_-22px_rgba(35,36,31,0.7)]`}
          style={{ color: id.ink }}
        >
          {/* barra do navegador */}
          <div aria-hidden="true" className="h-7 shrink-0 flex items-center gap-1.5 px-2.5 border-b border-[#23241F]/15 bg-[#EFEAF6]" style={sans}>
            <span className="size-2 rounded-full bg-[#23241F]/25" />
            <span className="size-2 rounded-full bg-[#23241F]/25" />
            <span className="size-2 rounded-full bg-[#23241F]/25" />
            <span className="ml-2 flex-1 min-w-0 truncate px-2 h-4 leading-4 text-[10px] text-[#23241F]/60 bg-[#FBF9F4] border border-[#23241F]/10">
              {url ?? s.name}
            </span>
          </div>
          <div className="relative w-full aspect-[16/10] overflow-hidden" style={{ background: id.bg }}>
            {id.desktop ? (
              <img src={id.desktop} alt={`Tela do ${s.name} no desktop`} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-contain" />
            ) : (
              <div className="absolute inset-0 p-[clamp(0.9rem,3cqw,2.5rem)] flex flex-col justify-between">
                <span className="text-[11px] uppercase tracking-[0.22em] font-semibold opacity-70" style={sans}>
                  {s.kind}
                </span>
                <span className="text-[clamp(1.6rem,7cqw,4.5rem)] font-bold leading-[0.95] tracking-tight" style={id.font ? { fontFamily: id.font } : display}>
                  {s.name}
                </span>
                {s.proofs ? (
                  <span className="flex flex-wrap gap-x-6 gap-y-1 text-sm tabular-nums" style={sans}>
                    {s.proofs.map((p) => (
                      <span key={p.label}>
                        <b className="text-[1.4em]" style={{ color: id.accent }}>
                          {p.value}
                        </b>{" "}
                        {p.label}
                      </span>
                    ))}
                  </span>
                ) : (
                  <span aria-hidden="true" />
                )}
              </div>
            )}
            <span aria-hidden="true" className="absolute left-0 right-0 bottom-0 h-1" style={{ background: id.accent }} />
          </div>
        </div>
        {id.mobile && <Phone src={id.mobile} name={s.name} />}
      </div>
    </div>
  );
}

/** 03 — Problemas + Projetos · lilás de destaque, um projeto por vez em carrossel. */
export default function ProjectsChapter() {
  const [open, setOpen] = useState<Project | null>(null);
  const [active, setActive] = useState(0);
  const track = useRef<HTMLUListElement | null>(null);
  const target = useRef(0);
  const total = SLIDES.length;

  const go = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const next = (i + total) % total;
    target.current = next;
    el.scrollTo({
      left: next * el.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [total]);

  // o índice ativo segue o scroll (swipe, trackpad, botões ou foco por teclado)
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
      go(target.current + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(target.current - 1);
    }
  };

  const arrow =
    "grid place-items-center size-11 shrink-0 border border-[#23241F]/40 bg-[#FBF9F4] text-[#23241F] text-lg cursor-pointer transition-colors hover:bg-[#23241F] hover:text-[#FBF9F4] outline-none focus-visible:ring-2 focus-visible:ring-[#3E2A6B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#D6C6F1]";

  return (
    <ChapterShell
      id="projetos"
      className="bg-[#D6C6F1] text-[#23241F]"
      innerClassName="pt-[max(5.5rem,12svh)] pb-[max(3.5rem,8svh)] gap-[clamp(0.75rem,2.2svh,1.5rem)]"
      decor={
        <div
          className="absolute inset-0 opacity-60"
          style={{ backgroundImage: "radial-gradient(rgba(62,42,107,0.16) 1px, transparent 1.2px)", backgroundSize: "14px 14px" }}
        />
      }
    >
      <ChapterHeading
        id="projetos"
        number="03"
        kicker={PROJECTS_COPY.kicker}
        title={PROJECTS_COPY.title}
        accentClass="text-[#3E2A6B]"
        kickerClass="text-[#3E2A6B]"
      />

      <div
        role="region"
        aria-roledescription="carrossel"
        aria-label="Projetos"
        onKeyDown={onKeyDown}
        className="flex-1 min-h-0 flex flex-col gap-[clamp(0.6rem,1.8svh,1.1rem)]"
        style={sans}
      >
        <ul ref={track} onScroll={onScroll} className="flex-1 min-h-0 flex overflow-x-auto snap-x snap-mandatory no-scrollbar overscroll-x-contain">
          {SLIDES.map((s, i) => (
            <li
              key={s.key}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${total}: ${s.name}`}
              className="w-full shrink-0 snap-start snap-always min-h-0 overflow-hidden p-1 flex flex-col lg:grid lg:grid-cols-12 gap-[clamp(0.75rem,2svh,1.25rem)] lg:gap-10"
            >
              <div className="h-[clamp(10rem,27svh,17rem)] lg:h-[max(24rem,calc(100svh-20rem))] lg:self-center lg:col-span-8 min-h-0 shrink-0">
                <Visual s={s} />
              </div>

              <div className="lg:col-span-4 flex-1 min-h-0 flex flex-col justify-center-safe gap-[clamp(0.4rem,1.3svh,0.9rem)] overflow-hidden">
                <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] font-semibold text-[#3E2A6B]">
                  <span className="tabular-nums whitespace-nowrap shrink-0">
                    {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" className="block h-px w-6 bg-current opacity-50" />
                  <span className="line-clamp-1">{s.kind}</span>
                </p>
                <h3 className="text-[clamp(1.6rem,min(3.4vw,5svh),3rem)] font-bold leading-[1.02] tracking-tight" style={display}>
                  {s.name}
                </h3>
                {s.problem && (
                  <p className="italic text-[clamp(0.98rem,min(1.35vw,2.3svh),1.3rem)] leading-snug text-[#2F2E2A] line-clamp-3 lg:line-clamp-4" style={display}>
                    {s.problem}
                  </p>
                )}
                {s.solution && (
                  <p className="hidden sm:block [@media(max-height:720px)]:hidden text-[0.92rem] leading-relaxed text-[#3A3A34] line-clamp-3">{s.solution}</p>
                )}
                {s.stack.length > 0 && (
                  <ul aria-label="Stack" className="flex flex-wrap gap-1.5 max-h-[1.45rem] overflow-hidden lg:max-h-none">
                    {s.stack.map((t) => (
                      <li key={t} className="px-2 py-0.5 text-[11px] font-medium border border-[#23241F]/25 bg-[#FBF9F4]/70">
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-2">
                  {s.project && (
                    <button
                      type="button"
                      onClick={() => setOpen(s.project!)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#23241F] text-[#FBF9F4] text-[11px] uppercase tracking-[0.18em] font-semibold cursor-pointer hover:bg-[#3E2A6B] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#3E2A6B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#D6C6F1]"
                    >
                      Ver case <span aria-hidden="true">→</span>
                    </button>
                  )}
                  {Object.entries(s.links)
                    .filter(([k]) => k !== "backend")
                    .map(([kind, href]) => (
                      <a
                        key={kind}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 py-1 text-[11px] uppercase tracking-[0.16em] font-semibold underline underline-offset-4 decoration-[#3E2A6B]/40 hover:text-[#3E2A6B] hover:decoration-[#3E2A6B] outline-none focus-visible:ring-2 focus-visible:ring-[#3E2A6B]"
                      >
                        {LINK_LABEL[kind]} <span aria-hidden="true">↗</span>
                        <span className="sr-only">de {s.name} (abre em nova aba)</span>
                      </a>
                    ))}
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Controles: anterior · indicadores · próximo */}
        <div className="flex items-center gap-3 sm:gap-5">
          <button type="button" onClick={() => go(target.current - 1)} aria-label="Projeto anterior" className={arrow}>
            <span aria-hidden="true">←</span>
          </button>
          <div className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.key}
                type="button"
                onClick={() => go(i)}
                aria-label={`Ir para ${s.name}`}
                aria-current={i === active ? "true" : undefined}
                className="group h-11 flex items-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#3E2A6B]"
              >
                <span
                  aria-hidden="true"
                  className={`block h-1.5 transition-all duration-300 ${i === active ? "w-7 sm:w-10 bg-[#3E2A6B]" : "w-2.5 sm:w-4 bg-[#3E2A6B]/30 group-hover:bg-[#3E2A6B]/60"}`}
                />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => go(target.current + 1)} aria-label="Próximo projeto" className={arrow}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
        <p aria-live="polite" className="sr-only">
          Projeto {active + 1} de {total}: {SLIDES[active]?.name}
        </p>
      </div>

      <ProjectCaseDialog project={open} onClose={() => setOpen(null)} />
    </ChapterShell>
  );
}
