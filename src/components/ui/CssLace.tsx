import React from "react";

type LaceTrimProps = {
  position?: "top" | "bottom";
  className?: string;
};

/**
 * Bico de Renda Botânico em CSS Puro (Alabaste & Oliva)
 */
export function LaceTrim({ position = "bottom", className = "" }: LaceTrimProps) {
  const isTop = position === "top";
  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden select-none pointer-events-none h-2 relative z-10 ${className}`}
      style={{
        backgroundImage: isTop
          ? `radial-gradient(circle at 8px 8px, transparent 2.5px, #F7F6F2 2.5px, #F7F6F2 8px, transparent 8px),
             radial-gradient(circle at 8px 6px, transparent 1px, #556B2F 1px, #556B2F 1.6px, transparent 1.6px)`
          : `radial-gradient(circle at 8px 0px, transparent 2.5px, #F7F6F2 2.5px, #F7F6F2 8px, transparent 8px),
             radial-gradient(circle at 8px 2px, transparent 1px, #556B2F 1px, #556B2F 1.6px, transparent 1.6px)`,
        backgroundSize: "16px 8px",
        backgroundRepeat: "repeat-x",
      }}
    />
  );
}

/**
 * Fita de Entremeio Botânica em CSS Puro
 */
export function LaceRibbon({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`h-3 w-full select-none pointer-events-none ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(circle at 6px 3px, rgba(85, 107, 47, 0.4) 1px, transparent 1.4px)",
        backgroundSize: "12px 6px",
        backgroundRepeat: "repeat-x",
      }}
    />
  );
}

/**
 * Divisor Editorial Minimalista e Limpo
 */
export function LaceDivider({
  title,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`w-full max-w-5xl mx-auto my-3 md:my-4 px-4 flex items-center justify-center select-none ${className}`}>
      <div className="w-full flex items-center justify-center gap-3 opacity-35">
        <div className="flex-1 h-[1px] bg-[#556B2F]" />
        {title ? (
          <span className="font-serif text-[10px] tracking-[0.2em] uppercase text-[#556B2F] font-semibold">
            {title}
          </span>
        ) : (
          <span className="text-[#556B2F] text-[10px]">✦</span>
        )}
        <div className="flex-1 h-[1px] bg-[#556B2F]" />
      </div>
    </div>
  );
}
