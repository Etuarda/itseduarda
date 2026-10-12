import React, { useEffect, useRef, useState } from "react";
import ChapterShell, { ChapterHeading } from "./ChapterShell";
import { BUILD } from "@/content/build";

const sans = { fontFamily: "'DM Sans', sans-serif" };
const display = { fontFamily: "'Playfair Display', Georgia, serif" };

/** 04 — Como eu construo · grafite técnico com grade de planta baixa. */
export default function BuildChapter() {
  const [step, setStep] = useState(0);
  const [touched, setTouched] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // A trilha do processo avança sozinha enquanto o capítulo está na tela
  useEffect(() => {
    if (touched || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = rootRef.current;
    if (!el) return;
    let timer: number | undefined;
    const io = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer);
      if (entry.isIntersecting) {
        timer = window.setInterval(() => setStep((s) => (s + 1) % BUILD.process.length), 1600);
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => {
      window.clearInterval(timer);
      io.disconnect();
    };
  }, [touched]);

  return (
    <ChapterShell
      id="processo"
      className="bg-[#1E1F1B] text-[#F5F2E9]"
      innerClassName="pt-[max(5.5rem,12svh)] pb-[max(4.5rem,10svh)] justify-center-safe gap-[clamp(1rem,3svh,2.25rem)]"
      decor={
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,242,233,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(245,242,233,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      }
    >
      <div ref={rootRef} className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-3 items-end">
        <ChapterHeading
          id="processo"
          number="04"
          kicker={BUILD.kicker}
          title={BUILD.title}
          accentClass="text-[#C9B3E6]"
          kickerClass="text-[#B5C29C]"
          className="lg:col-span-7"
        />
        <p className="lg:col-span-5 text-[#DAD6CA] text-[clamp(0.95rem,1.15vw,1.08rem)] leading-relaxed" style={sans}>
          {BUILD.text}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#F5F2E9]/15 border border-[#F5F2E9]/15">
        {BUILD.blocks.map((b, i) => (
          <article
            key={b.id}
            className="group chapter-rise bg-[#1E1F1B] p-3 sm:p-6 flex flex-col gap-1.5 sm:gap-3 hover:bg-[#262722] transition-colors"
            style={{ ...sans, animationDelay: `${i * 80}ms` }}
          >
            <p className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-[#B5C29C] font-semibold">
              <span>{b.label}</span>
              <span aria-hidden="true" className="tabular-nums text-[#F5F2E9]/40 group-hover:text-[#C9B3E6]">
                0{i + 1}
              </span>
            </p>
            <h3 className="text-[clamp(1rem,1.6vw,1.35rem)] font-bold leading-snug text-[#F5F2E9]" style={display}>
              {b.tools}
            </h3>
            <p className="text-[0.74rem] sm:text-sm text-[#DAD6CA] leading-snug sm:leading-relaxed">{b.practices}</p>
            <span aria-hidden="true" className="hidden sm:block mt-auto h-0.5 w-8 bg-[#C9B3E6] origin-left scale-x-50 group-hover:scale-x-100 transition-transform duration-500" />
          </article>
        ))}
      </div>

      <p className="text-[0.85rem] text-[#DAD6CA]" style={sans}>
        <span className="uppercase tracking-[0.22em] text-[11px] font-semibold text-[#B5C29C] mr-3">{BUILD.engineering.label}</span>
        {BUILD.engineering.items}
      </p>

      {/* Processo: trilha navegável */}
      <div style={sans}>
        <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#B5C29C] mb-3">Processo</p>
        <ol className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-0">
          {BUILD.process.map((s, i) => {
            const active = i === step;
            const past = i < step;
            return (
              <li key={s} className="relative">
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setTouched(true);
                    setStep(i);
                  }}
                  className={`w-full flex flex-col items-start gap-1 sm:gap-2 pt-2 sm:pt-3 text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#C9B3E6] border-t-2 transition-colors ${
                    active ? "border-[#C9B3E6] text-[#F5F2E9]" : past ? "border-[#B5C29C] text-[#DAD6CA]" : "border-[#F5F2E9]/20 text-[#F5F2E9]/60"
                  }`}
                >
                  <span className="text-[11px] tabular-nums tracking-[0.2em]">0{i + 1}</span>
                  <span className={`text-sm sm:text-base font-semibold ${active ? "italic" : ""}`} style={active ? display : undefined}>
                    {s}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </ChapterShell>
  );
}
