import React from "react";

/**
 * Sublinhado Ondulado Manuscrito (Wavy Underline)
 * Desenhado à mão com curva Bézier fluida
 */
export function WavyUnderline({
  className = "",
  color = "#556B2F",
  strokeWidth = 2.5,
}: {
  className?: string;
  color?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 240 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full overflow-visible pointer-events-none select-none ${className}`}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M 2 9 Q 30 16 60 8 T 120 9 T 180 8 T 238 10"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Sublinhado Duplo Delicado em Rabisco
 */
export function ScribbleUnderline({
  className = "",
  color = "#556B2F",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 180 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full overflow-visible pointer-events-none select-none ${className}`}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M 2 5 C 45 2, 95 8, 178 4"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 12 10 C 60 7, 120 12, 168 8"
        stroke={color}
        strokeWidth="1.2"
        strokeOpacity="0.65"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Círculo Manuscrito Imperfeito para Enfatizar Métricas e Destaques
 */
export function DoodleCircle({
  className = "",
  color = "#556B2F",
  children,
}: {
  className?: string;
  color?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {children}
      <svg
        viewBox="0 0 100 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -inset-2.5 w-[calc(100%+20px)] h-[calc(100%+20px)] pointer-events-none select-none overflow-visible"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path
          d="M 8 24 C 10 9, 88 5, 94 22 C 98 38, 16 46, 5 26 C 2 18, 22 10, 48 8"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/**
 * Estrela Rabiscada à Mão (4 pontas e 5 pontas)
 */
export function DoodleStar({
  className = "",
  color = "#556B2F",
  size = 18,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <path
        d="M 12 2 Q 12 10 2 12 Q 12 12 12 22 Q 12 14 22 12 Q 14 12 12 2 Z"
        fill={color}
        fillOpacity="0.8"
      />
    </svg>
  );
}

/**
 * Coração Rabiscado Manuscrito ("♡" romântico editorial do Reference 2)
 */
export function DoodleHeart({
  className = "",
  color = "#728464",
  size = 20,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <path
        d="M 12 21 C 12 21 3 14 3 8.5 C 3 5.5 5.5 3 8.5 3 C 10.3 3 11.5 4 12 5 C 12.5 4 13.7 3 15.5 3 C 18.5 3 21 5.5 21 8.5 C 21 14 12 21 12 21 Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Seta Rabiscada com Curva Orgânica
 */
export function DoodleArrow({
  className = "",
  color = "#556B2F",
  direction = "right",
}: {
  className?: string;
  color?: string;
  direction?: "right" | "left" | "down";
}) {
  const transform =
    direction === "left"
      ? "scaleX(-1)"
      : direction === "down"
      ? "rotate(90deg)"
      : "none";

  return (
    <svg
      width="44"
      height="24"
      viewBox="0 0 50 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform }}
      className={`inline-block pointer-events-none select-none overflow-visible ${className}`}
      aria-hidden="true"
    >
      <path
        d="M 4 18 C 18 20, 32 14, 46 8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 36 3 C 41 5, 45 7, 47 9 C 43 13, 38 18, 35 21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Ramo Botânico Delicado (Botanical Sprig do Scrapbook)
 */
export function BotanicalSprig({
  className = "",
  color = "#6B7B4B",
  size = 32,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Haste Central */}
      <path
        d="M 6 32 C 12 24, 22 14, 30 4"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Folha 1 (Esquerda) */}
      <path
        d="M 14 22 C 10 20, 8 16, 9 13 C 12 14, 15 17, 16 20"
        fill={color}
        fillOpacity="0.55"
        stroke={color}
        strokeWidth="0.8"
      />
      {/* Folha 2 (Direita) */}
      <path
        d="M 18 18 C 22 16, 26 17, 27 20 C 24 21, 20 21, 19 19"
        fill={color}
        fillOpacity="0.55"
        stroke={color}
        strokeWidth="0.8"
      />
      {/* Folha 3 (Esquerda Alta) */}
      <path
        d="M 23 12 C 19 10, 18 6, 20 4 C 22 6, 24 9, 25 11"
        fill={color}
        fillOpacity="0.55"
        stroke={color}
        strokeWidth="0.8"
      />
      {/* Broto Superior */}
      <circle cx="30" cy="4" r="1.8" fill={color} />
    </svg>
  );
}

/**
 * Fita Adesiva Washi Tape Transtranslúcida (Scrapbook Tape)
 * Inspirada na fita de mascaramento de livros e cadernos de campo
 */
export function ScrapbookTape({
  className = "",
  variant = "olive",
  rotate = "-2deg",
}: {
  className?: string;
  variant?: "olive" | "rose" | "kraft" | "pearl";
  rotate?: string;
}) {
  const bgStyles = {
    olive: "bg-[#728464]/30 border-t border-b border-[#556B2F]/40 shadow-xs",
    rose: "bg-[#D8AFA9]/35 border-t border-b border-[#B69794]/40 shadow-xs",
    kraft: "bg-[#D9CDB8]/45 border-t border-b border-[#A6977F]/40 shadow-xs",
    pearl: "bg-[#F7F6F2]/75 border-t border-b border-[#2B2927]/15 shadow-xs backdrop-blur-xs",
  }[variant];

  return (
    <div
      aria-hidden="true"
      style={{ transform: `rotate(${rotate})` }}
      className={`h-6 w-24 sm:w-28 relative pointer-events-none select-none ${bgStyles} ${className}`}
    >
      {/* Borda Esquerda Picotada / Rasgada */}
      <div
        className="absolute left-0 top-0 bottom-0 w-2"
        style={{
          clipPath: "polygon(100% 0%, 0% 20%, 100% 40%, 0% 60%, 100% 80%, 0% 100%)",
          backgroundColor: "rgba(247, 246, 242, 0.9)",
        }}
      />
      {/* Borda Direita Picotada / Rasgada */}
      <div
        className="absolute right-0 top-0 bottom-0 w-2"
        style={{
          clipPath: "polygon(0% 0%, 100% 20%, 0% 40%, 100% 60%, 0% 80%, 100% 100%)",
          backgroundColor: "rgba(247, 246, 242, 0.9)",
        }}
      />
      {/* Textura sutil interna da fita */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2B2927_1px,transparent_1px)] [background-size:6px_6px]" />
    </div>
  );
}

/**
 * Cantoneira Fotográfica de Álbum / Scrapbook (Photo Corner)
 */
export function PhotoCorner({
  position = "top-left",
  color = "#556B2F",
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color?: string;
}) {
  const rotation = {
    "top-left": "rotate(0deg)",
    "top-right": "rotate(90deg)",
    "bottom-right": "rotate(180deg)",
    "bottom-left": "rotate(270deg)",
  }[position];

  return (
    <div
      aria-hidden="true"
      style={{ transform: rotation }}
      className="absolute w-4 h-4 pointer-events-none select-none z-20"
    >
      <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
        <polygon
          points="0,0 20,0 0,20"
          fill={color}
          fillOpacity="0.45"
        />
        <line x1="0" y1="0" x2="20" y2="0" stroke={color} strokeWidth="1.5" />
        <line x1="0" y1="0" x2="0" y2="20" stroke={color} strokeWidth="1.5" />
      </svg>
    </div>
  );
}

/**
 * Selo Monograma Oval Nobre (Inspirado no Reference 1: "Estéticamente Legal")
 * Oval fina com o monograma "ES" e anos "20" e "26"
 */
export function OvalMonogramSeal({
  className = "",
  yearLeft = "20",
  yearRight = "26",
  initials = "ES",
  variant = "light",
}: {
  className?: string;
  yearLeft?: string;
  yearRight?: string;
  initials?: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  const textColor = isDark ? "text-[#F7F6F2]" : "text-[#2B2927]";
  const borderColor = isDark ? "border-[#F7F6F2]/60" : "border-[#556B2F]/45";
  const mutedTextColor = isDark ? "text-[#E8ECE0]/70" : "text-[#5C5854]";

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <span className={`font-serif text-xs sm:text-sm tracking-widest ${mutedTextColor}`}>
        {yearLeft}
      </span>

      <div
        className={`w-11 h-14 sm:w-12 sm:h-16 rounded-[50%] border ${borderColor} flex items-center justify-center relative p-1 transition-transform duration-300 hover:scale-105`}
        style={{
          boxShadow: isDark
            ? "inset 0 0 8px rgba(247, 246, 242, 0.15), 0 2px 10px rgba(0,0,0,0.2)"
            : "inset 0 0 6px rgba(85, 107, 47, 0.12)",
        }}
      >
        <span
          className={`font-serif italic font-light text-base sm:text-lg tracking-wider ${textColor}`}
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {initials}
        </span>
      </div>

      <span className={`font-serif text-xs sm:text-sm tracking-widest ${mutedTextColor}`}>
        {yearRight}
      </span>
    </div>
  );
}

/**
 * Borda Rasgada de Papel Deckled Edge (SVG realista de folha de papel recortada)
 */
export function TornPaperEdge({
  position = "top",
  className = "",
  fillColor = "#F7F6F2",
}: {
  position?: "top" | "bottom";
  className?: string;
  fillColor?: string;
}) {
  const isTop = position === "top";
  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden select-none pointer-events-none relative z-10 leading-none ${className}`}
    >
      <svg
        viewBox="0 0 1200 24"
        fill="none"
        preserveAspectRatio="none"
        className={`w-full h-4 sm:h-6 block ${isTop ? "" : "rotate-180"}`}
      >
        {/* Sombra de dobra do rasgo */}
        <path
          d="M 0 0 Q 50 18 100 8 T 200 16 T 300 6 T 400 18 T 500 10 T 600 19 T 700 8 T 800 17 T 900 7 T 1000 18 T 1100 9 T 1200 16 L 1200 24 L 0 24 Z"
          fill="rgba(43, 41, 39, 0.05)"
        />
        {/* Massa de papel principal rasgada */}
        <path
          d="M 0 2 Q 45 15 95 6 T 195 14 T 295 4 T 395 15 T 495 7 T 595 16 T 695 5 T 795 14 T 895 5 T 995 15 T 1095 6 T 1200 13 L 1200 24 L 0 24 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}
