import React from "react";
import heroImg from "@/components/assets/heroperfil.png";
import OrbitalText from "../OrbitalText";
import { HummingbirdSvg } from "@/components/ui/HummingbirdGuide";
import { CREDENTIAL_HUBS, HERO_COPY, type CopySegment } from "../heroData";
import { BarsGraphic, GraphGraphic, TimelineGraphic } from "./IntroInfographics";
import InstitutionLogo from "../InstitutionLogo";

/**
 * Palco da apresentação em cenas (só apresentação — a coreografia vive no
 * HeroMotionController). Fica sobre o layout real do Hero, que permanece no DOM
 * e acessível; por isso o palco inteiro é aria-hidden.
 *
 * Ordem de pintura importa: o painel oliva cobre as cenas declaradas antes dele
 * e fica sob as declaradas depois.
 */

export const STAGE_WORD = "EDUARDA";
/** "A" central: o palco é centrado, então EDU ◯ RDA fica simétrico */
export const STAGE_ANCHOR_INDEX = 3;

const display = { fontFamily: "'Playfair Display', Georgia, serif" };
const sans = { fontFamily: "'DM Sans', sans-serif" };

function Segments({ segments, accentClass }: { segments: CopySegment[]; accentClass: string }) {
  return (
    <>
      {segments.map((s, i) =>
        s.accent ? (
          <em key={i} data-intro="accent" className={`italic font-normal ${accentClass}`} style={display}>
            {s.text}
          </em>
        ) : (
          <React.Fragment key={i}>{s.text}</React.Fragment>
        ),
      )}
    </>
  );
}

function HighlightHead({ hubIndex, dark = false }: { hubIndex: number; dark?: boolean }) {
  const hub = CREDENTIAL_HUBS[hubIndex];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline gap-4 overflow-hidden">
        <span
          data-intro="hl-index"
          className={`block italic leading-none text-[clamp(2.6rem,6vw,6rem)] ${dark ? "text-[#C9B3E6]" : "text-[#8A6BB8]"}`}
          style={display}
        >
          {hub.index}
        </span>
        <span
          data-intro="hl-label"
          className={`text-[11px] sm:text-xs uppercase tracking-[0.22em] font-semibold ${dark ? "text-[#F5F2E9]/80" : "text-[#58644B]"}`}
          style={sans}
        >
          {hub.title}
        </span>
      </div>
      <h3
        data-intro="hl-title"
        className={`font-black leading-[0.95] tracking-tight ${
          // títulos longos ("Desenvolvimento de Software") pedem escala menor para caber na coluna
          hub.surfaceHighlight.length > 18 ? "text-[clamp(2.1rem,4.2vw,4.8rem)]" : "text-[clamp(2.3rem,6.4vw,6.8rem)]"
        } ${dark ? "text-[#F5F2E9]" : "text-[#23241F]"}`}
        style={display}
      >
        {hub.surfaceHighlight}
      </h3>
      <p
        data-intro="hl-sub"
        // abaixo de 640px o resumo sai do palco (continua no detalhe do trilho) para caber em telas baixas
        className={`hidden sm:block max-w-md text-sm sm:text-base leading-relaxed ${dark ? "text-[#F5F2E9]/80" : "text-[#4B4B44]"}`}
        style={sans}
      >
        {hub.summary}
      </p>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-3">
        {hub.logos.map((logo) => (
          // alt vazio: o palco é decorativo (aria-hidden); o conteúdo real fica no layout
          <InstitutionLogo key={logo.alt} data-intro="hl-logo" logo={{ ...logo, alt: "" }} tone={dark ? "light" : "color"} />
        ))}
      </div>
    </div>
  );
}

function HighlightScene({
  n,
  hubIndex,
  dark,
  children,
}: {
  n: 1 | 2 | 3;
  hubIndex: number;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div data-intro={`hl-${n}`} className="absolute inset-0 flex items-center px-[7vw] pt-[14svh] pb-[11svh]">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-20 items-center">
        <HighlightHead hubIndex={hubIndex} dark={dark} />
        <div data-intro="hl-graphic" className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function IntroStage() {
  const [beatA, beatB] = HERO_COPY.valueBeats;

  return (
    <div
      data-intro="stage"
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-[100svh] z-30 overflow-hidden select-none"
      style={{ ["--frame-line" as string]: "rgba(88,100,75,0.45)", ["--frame-ink" as string]: "#23241F" }}
    >
      {/* ---------- Cenas sob o painel oliva ---------- */}

      {/* 01 · Palavra que a linha atravessa */}
      <span
        data-intro="word"
        className="absolute left-0 top-0 whitespace-nowrap leading-none font-black text-[clamp(3.4rem,18vw,20rem)] text-[#44503A]"
        style={{ ...display, letterSpacing: "-0.04em" }}
      >
        {STAGE_WORD.split("").map((letter, i) => (
          <span key={i} data-intro="letter" data-index={i} className="inline-block">
            {letter}
          </span>
        ))}
      </span>

      {/* 02 · Retrato que nasce da letra-âncora + posicionamento */}
      <div data-intro="portrait-scene" className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <div data-intro="portrait" className="relative w-[min(40svh,60vw)] aspect-square">
          <div data-intro="orbit" className="absolute -inset-[12%]">
            <OrbitalText />
          </div>
          <div
            data-intro="photo"
            className="absolute inset-0 rounded-full overflow-hidden border-2 border-[#58644B]/35 bg-[#F4F1E8]"
          >
            <img
              data-intro="photo-img"
              src={heroImg}
              alt=""
              className="w-full h-full object-cover object-[center_18%]"
            />
          </div>
        </div>
        <p
          data-intro="role"
          className="mt-[7svh] max-w-[34rem] text-center text-[#4B4B44] text-[clamp(0.95rem,1.3vw,1.2rem)] leading-normal"
          style={sans}
        >
          {HERO_COPY.role}
        </p>
      </div>

      {/* 03a · Primeira frase da proposta de valor */}
      <div data-intro="value-a" className="absolute inset-0 flex items-center px-[7vw]">
        <p
          data-intro="value-text"
          className="w-full max-w-6xl mx-auto font-bold text-[#23241F] tracking-tight leading-[1.02] text-[clamp(2.1rem,5.6vw,6.4rem)]"
          style={{ ...display, textWrap: "balance" }}
        >
          <Segments segments={beatA} accentClass="text-[#8A6BB8]" />
        </p>
      </div>

      {/* 04 · Núcleos 01 e 03 (fundo claro) */}
      <HighlightScene n={1} hubIndex={0}>
        <TimelineGraphic />
      </HighlightScene>
      <HighlightScene n={3} hubIndex={2}>
        <BarsGraphic />
      </HighlightScene>

      {/* 05 · Fecho: foto + nome + gancho */}
      <div data-intro="final" className="absolute inset-0 flex flex-col items-center justify-center gap-[3svh] px-6 pt-[8svh]">
        <div data-intro="final-slot" className="w-[min(30svh,46vw)] aspect-square" />
        <p
          data-intro="final-name"
          className="font-black uppercase text-center text-[#23241F] leading-[0.95] tracking-tight text-[clamp(2.2rem,6vw,6.2rem)]"
          style={display}
        >
          {HERO_COPY.fullName}
        </p>
        <p data-intro="final-hook" className="text-[#4B4B44] text-[clamp(1rem,1.5vw,1.3rem)] text-center" style={sans}>
          {HERO_COPY.hook}{" "}
          <span data-intro="final-arrow" className="inline-block text-[#58644B]">
            ↓
          </span>
        </p>
      </div>

      {/* ---------- Painel oliva (alterna o fundo entre cenas) ---------- */}
      <div data-intro="panel" className="absolute inset-0 bg-[#44503A]" style={{ clipPath: "inset(100% 0% 0% 0%)" }} />

      {/* 03b · Segunda frase, sobre o painel */}
      <div data-intro="value-b" className="absolute inset-0 flex items-center px-[7vw]">
        <p
          data-intro="value-text"
          className="w-full max-w-6xl mx-auto font-bold text-[#F5F2E9] tracking-tight leading-[1.02] text-[clamp(2.1rem,5.6vw,6.4rem)]"
          style={{ ...display, textWrap: "balance" }}
        >
          <Segments segments={beatB} accentClass="text-[#C9B3E6]" />
        </p>
      </div>

      {/* 04 · Núcleo 02 (sobre o painel) */}
      <HighlightScene n={2} hubIndex={1} dark>
        <GraphGraphic />
      </HighlightScene>

      {/* ---------- Moldura editorial (persiste entre cenas) ---------- */}
      <div data-intro="frame" className="absolute inset-0 pointer-events-none" style={sans}>
        <span data-intro="rule" className="absolute left-[6vw] right-[6vw] top-[12svh] h-px bg-[var(--frame-line)] origin-left" />
        <span data-intro="rule" className="absolute left-[6vw] right-[6vw] bottom-[9svh] h-px bg-[var(--frame-line)] origin-right" />
        <span className="absolute left-[6vw] top-[calc(12svh-14px)] flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} data-intro="dot" className="block w-1.5 h-1.5 rounded-full bg-[#B69AD9]" />
          ))}
        </span>
        <span className="absolute right-[6vw] bottom-[calc(9svh-14px)] flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} data-intro="dot" className="block w-1.5 h-1.5 rounded-full bg-[#B69AD9]" />
          ))}
        </span>
        {HERO_COPY.corners.map(([strong, rest], i) => (
          <span
            key={strong}
            data-intro="corner"
            className={`absolute text-[11px] sm:text-sm tracking-[0.08em] text-[var(--frame-ink)] whitespace-nowrap ${
              i === 0
                ? "left-[6vw] top-[calc(12svh+14px)]"
                : i === 1
                  ? "right-[6vw] top-[calc(12svh+14px)]"
                  : i === 2
                    ? "left-[6vw] bottom-[calc(9svh+14px)]"
                    : "right-[6vw] bottom-[calc(9svh+14px)]"
            }`}
          >
            <strong className="font-semibold">{strong}</strong> <span className="font-light">{rest}</span>
          </span>
        ))}
      </div>

      {/* ---------- Beija-flor: conduz cada transição (posição pela timeline) ---------- */}
      <div data-intro="bird" className="absolute left-0 top-0 z-10 pointer-events-none" style={{ visibility: "hidden" }}>
        <div data-intro="bird-face">
          <HummingbirdSvg interactive={false} />
        </div>
      </div>

      {/* ---------- Vetores da Cena 01 (semente, linha, pílula, oval) ---------- */}
      <svg data-intro="svg" className="absolute left-0 top-0 pointer-events-none overflow-visible" width="0" height="0">
        <circle data-intro="seed" cx="0" cy="0" r="0" fill="#58644B" />
        <rect
          data-intro="shape"
          x="0"
          y="0"
          rx="0"
          ry="0"
          width="0"
          height="0"
          fill="none"
          stroke="#58644B"
          strokeWidth="1.5"
          opacity="0"
        />
      </svg>
    </div>
  );
}
