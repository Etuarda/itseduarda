import React from "react";

export type SectionTitleProps = {
  title: string;
  scriptAccent?: string;
  index?: string;
  align?: "left" | "center" | "right";
  subtitle?: string;
  lightMode?: boolean; // true for dark background surfaces (e.g. olive)
  className?: string;
};

export default function SectionTitle({
  title,
  scriptAccent,
  index,
  align = "center",
  subtitle,
  lightMode = false,
  className = "",
}: SectionTitleProps) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  }[align];

  return (
    <div className={`flex flex-col max-w-3xl mb-8 sm:mb-12 relative z-10 ${alignClasses} ${className}`}>
      {/* Marcador de Capítulo Editorial (Tipografia Pura, sem caixas de fundo) */}
      {index && (
        <div
          className={`flex items-center gap-2 mb-1.5 text-xs font-mono font-bold tracking-[0.25em] uppercase select-none ${
            lightMode ? "text-[#C5D9A5]" : "text-[#465B20]"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
          <span>CAPÍTULO {index}</span>
        </div>
      )}

      {/* Título Principal com Acento Caligráfico */}
      <div className="relative inline-block mt-1">
        <h2
          className={`font-serif font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight relative z-10 ${
            lightMode ? "text-[#FAF8F5]" : "text-[#1C1A18]"
          }`}
          style={{ textWrap: "balance" }}
        >
          {title}
        </h2>

        {scriptAccent && (
          <span
            aria-hidden="true"
            className={`font-script text-3xl sm:text-4xl md:text-5xl font-normal absolute -bottom-2.5 sm:-bottom-3.5 right-0 translate-x-3 sm:translate-x-6 z-20 pointer-events-none select-none opacity-90 ${
              lightMode ? "text-[#C6928B]" : "text-[#9E6761]"
            }`}
          >
            {scriptAccent}
          </span>
        )}
      </div>

      {/* Subtítulo / Questão Norteadora */}
      {subtitle && (
        <p
          className={`font-sans text-xs sm:text-sm md:text-base mt-4 leading-relaxed max-w-2xl ${
            lightMode ? "text-[#E2DFD8]" : "text-[#4E4A45]"
          }`}
          style={{ textWrap: "balance" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
