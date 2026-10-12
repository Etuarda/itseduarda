import React from "react";

export type SectionSurface =
  | "vellum"
  | "paper"
  | "mauve"
  | "olive"
  | "transparent";

export type SectionShellProps = {
  id: string;
  surface: SectionSurface;
  overlapTop?: boolean;
  overlapBottom?: boolean;
  lace?: "top" | "bottom" | "none";
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

const SURFACE_STYLES: Record<SectionSurface, { section: string; text: string }> = {
  vellum: {
    section: "bg-[#FAF8F5]/95 backdrop-blur-[2px]",
    text: "text-[#1C1A18]",
  },
  paper: {
    section: "bg-[#F4F1EA]",
    text: "text-[#1C1A18]",
  },
  mauve: {
    section: "bg-[#F7F2F0]",
    text: "text-[#1C1A18]",
  },
  olive: {
    section: "bg-[#1E2713] text-[#FAF8F5]",
    text: "text-[#FAF8F5]",
  },
  transparent: {
    section: "bg-transparent",
    text: "text-[#1C1A18]",
  },
};

export default function SectionShell({
  id,
  surface = "paper",
  overlapTop = false,
  overlapBottom = false,
  lace = "none",
  className = "",
  containerClassName = "",
  children,
}: SectionShellProps) {
  const currentSurface = SURFACE_STYLES[surface];

  return (
    <section
      id={id}
      data-surface={surface}
      className={`relative w-full scroll-mt-20 md:scroll-mt-24 transition-colors duration-500 overflow-visible ${currentSurface.section} ${currentSurface.text} ${
        overlapTop ? "-mt-8 sm:-mt-12 md:-mt-16 z-20" : "z-10"
      } ${overlapBottom ? "pb-16 sm:pb-24 md:pb-32" : "py-12 sm:py-16 md:py-24"} ${className}`}
    >
      <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}
