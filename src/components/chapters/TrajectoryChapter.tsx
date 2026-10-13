import React, { useState } from "react";
import ChapterShell, { ChapterHeading } from "./ChapterShell";
import { TRAJECTORY, type Lane } from "@/content/trajectory";
import paperWarm from "@/components/assets/texture-paper-ivory-warm.png";

const sans = { fontFamily: "'DM Sans', sans-serif" };
const display = { fontFamily: "'Playfair Display', Georgia, serif" };

/** 05 — Trajetória · pergaminho, três linhas paralelas. */
export default function TrajectoryChapter() {
  const [lane, setLane] = useState<Lane["id"]>("dev");

  return (
    <ChapterShell
      id="trajetoria"
      className="bg-[#EDE4CF] text-[#23241F]"
      innerClassName="pt-[max(5.5rem,12svh)] pb-[max(4.5rem,10svh)] justify-center-safe gap-[clamp(0.9rem,2.6svh,2rem)]"
      decor={<div className="absolute inset-0 opacity-50 mix-blend-multiply" style={{ backgroundImage: `url(${paperWarm})`, backgroundSize: "cover" }} />}
    >
      <ChapterHeading
        id="trajetoria"
        kicker={TRAJECTORY.kicker}
        title={TRAJECTORY.title}
        accentClass="text-[#44503A]"
        kickerClass="text-[#44503A]"
      />

      {/* Mobile: escolha da linha (no desktop as três ficam lado a lado) */}
      <div className="flex lg:hidden gap-1 border-b border-[#23241F]/20" role="group" aria-label="Escolher linha da trajetória" style={sans}>
        {TRAJECTORY.lanes.map((l) => (
          <button
            key={l.id}
            type="button"
            aria-pressed={lane === l.id}
            onClick={() => setLane(l.id)}
            className={`relative px-3 py-2.5 text-[11px] uppercase tracking-[0.18em] font-semibold cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#44503A] ${
              lane === l.id ? "text-[#23241F]" : "text-[#23241F]/60"
            }`}
          >
            {l.label}
            <span aria-hidden="true" className={`absolute left-0 right-0 -bottom-px h-[3px] ${lane === l.id ? "bg-[#44503A]" : "bg-transparent"}`} />
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 min-h-0">
        {TRAJECTORY.lanes.map((l) => (
          <section key={l.id} aria-label={l.label} className={`${lane === l.id ? "block" : "hidden"} lg:block min-h-0`} style={sans}>
            <h3 className="hidden lg:block text-[11px] uppercase tracking-[0.22em] font-semibold text-[#44503A] mb-3">{l.label}</h3>
            <ol className="relative flex flex-col border-l border-[#44503A]/35 ml-1.5">
              {l.items.map((m, i) => (
                <li
                  key={`${m.when}-${m.what}`}
                  className="group chapter-rise relative pl-5 py-[clamp(0.3rem,0.9svh,0.6rem)]"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-[5px] top-[clamp(0.65rem,1.6svh,0.95rem)] w-[9px] h-[9px] rounded-full border border-[#44503A] bg-[#EDE4CF] group-hover:bg-[#8A6BB8] group-hover:border-[#8A6BB8] transition-colors"
                  />
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-[11px] uppercase tracking-[0.14em] tabular-nums text-[#4B4B44]">{m.when}</p>
                    {m.hours && (
                      <p className="text-[0.95rem] font-bold tabular-nums text-[#44503A] leading-none" style={display}>
                        {m.hours}
                      </p>
                    )}
                  </div>
                  <p className="text-[0.88rem] leading-snug">
                    <span className="font-semibold">{m.where}</span>
                    <span className="text-[#3B3A35]"> · {m.what}</span>
                  </p>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <p className="italic text-[clamp(1.05rem,1.6vw,1.35rem)] text-[#23241F] max-w-3xl" style={display}>
        {TRAJECTORY.closing}
      </p>
    </ChapterShell>
  );
}
