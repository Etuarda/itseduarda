import React from "react";

export default function HeroIdentity() {
  return (
    <div className="flex flex-col gap-[clamp(0.4rem,1.2svh,0.75rem)] select-text">
      <h1
        id="hero-title"
        className="font-black tracking-tight text-[#23241F] uppercase leading-[0.95]"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(1.9rem, min(4.6vw, 6svh), 4.6rem)",
          letterSpacing: "-0.02em",
        }}
      >
        Eduarda Silva Santos
      </h1>

      {/* Fio editorial que conduz o wipe do posicionamento */}
      <span
        aria-hidden="true"
        className="block h-px w-24 sm:w-32 bg-[#58644B]/60 origin-left"
      />

      <p
        className="text-[#4B4B44] font-medium max-w-2xl"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(0.9rem, min(1.3vw, 2svh), 1.2rem)",
          lineHeight: 1.5,
        }}
      >
        Desenvolvedora de Software Full Stack, criando soluções com Engenharia de Dados e aplicações de IA.
      </p>
    </div>
  );
}
