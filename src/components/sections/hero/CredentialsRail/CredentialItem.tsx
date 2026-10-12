import React from "react";
import type { CredentialHub } from "../heroData";

const PROOF: Record<CredentialHub["id"], React.ReactNode> = {
  formacao: <>2024–2027 · Em andamento</>,
  residencias: <>Dados 320h · IA 360h · RAG 284h</>,
  intensivas: <>PDA · 720h · Cubos · 600h+ · 492h</>,
};

export default function CredentialItem({
  hub,
  isActive,
  isDimmed,
  isClone = false,
  onSelect,
}: {
  hub: CredentialHub;
  isActive: boolean;
  isDimmed: boolean;
  /** cópia visual do loop contínuo: fora da árvore de acessibilidade e do tab */
  isClone?: boolean;
  onSelect: (trigger: HTMLButtonElement) => void;
}) {
  return (
    <button
      type="button"
      data-hub-trigger={isClone ? undefined : hub.id}
      aria-expanded={isClone ? undefined : isActive}
      aria-controls={isClone ? undefined : `credential-expanded-${hub.id}`}
      tabIndex={isClone ? -1 : undefined}
      onClick={(e) => onSelect(e.currentTarget)}
      className={`text-left px-5 py-3 sm:px-6 sm:py-[clamp(0.75rem,1.6svh,1.25rem)] border-l w-[78vw] max-w-[300px] sm:w-[300px] shrink-0 cursor-pointer select-none relative group transition-[opacity,border-color,background-color] duration-500 outline-none focus-visible:ring-2 focus-visible:ring-[#B69AD9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F2E9] ${
        isActive
          ? "border-[#58644B] bg-[rgba(88,100,75,0.08)]"
          : isDimmed
            ? "border-[#58644B]/20 opacity-45"
            : "border-[#58644B]/35 hover:border-[#58644B] hover:bg-[rgba(88,100,75,0.05)]"
      }`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <span className="block">
        <span className="flex items-center justify-between gap-3 mb-2 text-[11px] uppercase tracking-[0.18em] text-[#58644B] font-semibold">
          <span>
            {hub.index} — {hub.title}
          </span>
          {/* Estado em texto, não só em cor */}
          <span aria-hidden="true" className="text-[#44503A] text-sm leading-none">
            {isActive ? "−" : "+"}
          </span>
        </span>

        <span
          className="block font-black text-[clamp(1.15rem,min(1.8vw,2.8svh),1.5rem)] text-[#23241F] leading-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {hub.surfaceHighlight}
        </span>

        <span className="block mt-2 text-xs text-[#4B4B44] leading-relaxed">{PROOF[hub.id]}</span>
      </span>
    </button>
  );
}
