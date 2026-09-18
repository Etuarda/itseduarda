import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon?: ReactNode;
};

export function SectionHeading({ eyebrow, title, description, icon }: SectionHeadingProps) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-8">
      <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#2A3614] font-bold bg-[#FAF8F5] px-4 py-1.5 rounded-full border border-[#465B20]/35 shadow-xs inline-flex items-center gap-2">
        {icon}
        {eyebrow}
      </span>
      <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#1C1A18] tracking-tight mt-3">
        {title}
      </h2>
      <p className="font-sans text-xs sm:text-sm text-[#383531] mt-2 font-normal leading-relaxed">
        {description}
      </p>
    </div>
  );
}
