import React, { useId, useRef, useState } from "react";
import ChapterShell, { ChapterHeading } from "./ChapterShell";
import InstitutionLogo from "@/components/sections/hero/InstitutionLogo";
import { AUTHORITY, type AuthorityAxis } from "@/content/authority";
import textureGrain from "@/components/assets/texture-grain-soft.png";

const sans = { fontFamily: "'DM Sans', sans-serif" };
const display = { fontFamily: "'Playfair Display', Georgia, serif" };

/** 02 — Conexão + Autoridade · oliva profundo, eixos em abas, provas curtas. */
export default function AuthorityChapter() {
  const [active, setActive] = useState<AuthorityAxis["id"]>("software");
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const uid = useId();
  const axis = AUTHORITY.axes.find((a) => a.id === active)!;

  // Setas/Home/End movem entre as abas (padrão WAI-ARIA tabs)
  const onKeyDown = (e: React.KeyboardEvent) => {
    const ids = AUTHORITY.axes.map((a) => a.id);
    const i = ids.indexOf(active);
    const next =
      e.key === "ArrowRight" ? ids[(i + 1) % ids.length]
      : e.key === "ArrowLeft" ? ids[(i - 1 + ids.length) % ids.length]
      : e.key === "Home" ? ids[0]
      : e.key === "End" ? ids[ids.length - 1]
      : null;
    if (!next) return;
    e.preventDefault();
    setActive(next);
    tabsRef.current?.querySelector<HTMLButtonElement>(`[data-axis="${next}"]`)?.focus();
  };

  return (
    <ChapterShell
      id="sobre"
      className="bg-[#2B3524] text-[#F5F2E9]"
      innerClassName="pt-[max(5.5rem,12svh)] pb-[max(4.5rem,10svh)] justify-center-safe gap-[clamp(0.8rem,2.3svh,2rem)]"
      decor={
        <>
          <div className="absolute inset-0 opacity-[0.18] mix-blend-soft-light" style={{ backgroundImage: `url(${textureGrain})` }} />
          <span
            className="absolute -right-[4vw] -bottom-[6svh] leading-none font-black text-[clamp(12rem,32vw,30rem)] text-transparent"
            style={{ ...display, WebkitTextStroke: "1px rgba(201,179,230,0.18)" }}
          >
            02
          </span>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-3 items-end">
        <ChapterHeading
          id="sobre"
          number="02"
          kicker={AUTHORITY.kicker}
          title={AUTHORITY.title}
          accentClass="text-[#D4C2EE]"
          kickerClass="text-[#C9D3B4]"
          className="lg:col-span-7"
        />
        <p
          className="lg:col-span-5 text-[#E7E3D6] text-[clamp(0.95rem,1.15vw,1.08rem)] leading-relaxed max-w-xl [@media(max-height:720px)]:max-lg:hidden"
          style={sans}
        >
          {AUTHORITY.text}
        </p>
      </div>

      {/* Eixos de formação */}
      <div
        ref={tabsRef}
        role="tablist"
        aria-label="Eixos de formação"
        onKeyDown={onKeyDown}
        className="flex gap-1 overflow-x-auto no-scrollbar border-b border-[#F5F2E9]/20"
        style={sans}
      >
        {AUTHORITY.axes.map((a) => {
          const selected = a.id === active;
          return (
            <button
              key={a.id}
              type="button"
              role="tab"
              data-axis={a.id}
              id={`${uid}-tab-${a.id}`}
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(a.id)}
              className={`relative shrink-0 px-3 sm:px-4 py-3 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#D4C2EE] cursor-pointer ${
                selected ? "text-[#F5F2E9]" : "text-[#F5F2E9]/60 hover:text-[#F5F2E9]"
              }`}
            >
              {a.label}
              <span className="ml-2 tabular-nums text-[#D4C2EE]">{a.credentials.length}</span>
              {/* estado também por forma, não só cor */}
              <span aria-hidden="true" className={`absolute left-0 right-0 -bottom-px h-[3px] ${selected ? "bg-[#D4C2EE]" : "bg-transparent"}`} />
            </button>
          );
        })}
      </div>

      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${active}`}
        key={active}
        className="-mx-6 px-6 sm:mx-0 sm:px-0 flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory no-scrollbar"
      >
        {axis.credentials.map((c, i) => (
          <article
            key={c.name}
            className="chapter-rise shrink-0 w-[82%] sm:w-auto snap-start flex flex-col gap-1.5 xl:gap-2 p-4 [@media(min-height:860px)]:p-5 bg-[#F5F2E9]/[0.06] border border-[#F5F2E9]/15 hover:border-[#D4C2EE]/70 transition-colors"
            style={{ ...sans, animationDelay: `${i * 70}ms` }}
          >
            <div className="flex items-center justify-between gap-3 min-h-8">
              {c.logo ? (
                <InstitutionLogo logo={c.logo} size="sm" tone="light" className="!h-6 sm:!h-7" />
              ) : (
                <span className="text-xs uppercase tracking-[0.16em] text-[#C9D3B4]">{c.institution}</span>
              )}
              {c.hours && (
                <span className="text-[clamp(1.4rem,2.2vw,1.9rem)] leading-none text-[#D4C2EE] tabular-nums" style={display}>
                  {c.hours}
                </span>
              )}
            </div>
            <h3 className="font-bold text-[1.05rem] sm:text-lg leading-snug text-[#F5F2E9]" style={display}>
              {c.name}
            </h3>
            <p className="text-xs uppercase tracking-[0.14em] text-[#C9D3B4]">
              <span className="sr-only">{c.institution} · </span>
              {c.period}
            </p>
            <p className="text-[0.82rem] text-[#E7E3D6] leading-relaxed">{c.tags.join(" · ")}</p>
          </article>
        ))}
      </div>

      {/* Qualidade e backend: faixa menor */}
      <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-1.5 text-[0.82rem] text-[#E7E3D6]" style={sans}>
        {AUTHORITY.extras.map((x) => (
          <li key={x.name}>
            <span className="font-semibold text-[#F5F2E9]">{x.name}</span> · {x.meta}
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <p className="italic text-[clamp(1.05rem,1.6vw,1.35rem)] text-[#F5F2E9] max-w-2xl" style={display}>
          {AUTHORITY.closing}
        </p>
        <a
          href="#projetos"
          className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-3 bg-[#D4C2EE] text-[#23241F] text-xs uppercase tracking-[0.18em] font-semibold hover:bg-[#F5F2E9] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#F5F2E9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B3524]"
          style={sans}
        >
          Ver projetos <span aria-hidden="true">↓</span>
        </a>
      </div>
    </ChapterShell>
  );
}
