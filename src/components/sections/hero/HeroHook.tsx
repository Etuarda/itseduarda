import React from "react";
import { HERO_COPY } from "./heroData";

/** Gancho narrativo: ponte para a Seção 02 (fluxo natural do scroll). */
export default function HeroHook() {
  return (
    <a
      href="#sobre"
      className="group inline-flex items-center gap-2 pt-3 text-[#4B4B44] hover:text-[#23241F] text-sm sm:text-base font-medium tracking-tight transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#B69AD9] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F5F2E9]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {HERO_COPY.hook}
    </a>
  );
}
