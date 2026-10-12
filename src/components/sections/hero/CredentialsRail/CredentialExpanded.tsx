import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { X } from "lucide-react";
import type { CredentialHub } from "../heroData";
import { prefersReducedMotion } from "../heroGeometry";
import InstitutionLogo from "../InstitutionLogo";

export default function CredentialExpanded({
  hub,
  onClose,
}: {
  hub: CredentialHub;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Fragmentação: macro área → especialidades → detalhes
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.from(el, { opacity: 0, duration: 0.25 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(el, { clipPath: "inset(0 0 100% 0)", duration: 0.55, ease: "power3.inOut", clearProps: "clipPath" })
        .from("[data-frag='head']", { opacity: 0, y: 8, duration: 0.4 }, 0.15)
        .from("[data-frag='item']", { opacity: 0, y: 14, duration: 0.5, stagger: 0.09 }, 0.25)
        .from("[data-frag='skill']", { opacity: 0, y: 6, duration: 0.35, stagger: 0.018 }, 0.45);
    }, el);

    return () => ctx.revert();
  }, [hub.id]);

  return (
    <div
      ref={ref}
      id={`credential-expanded-${hub.id}`}
      role="region"
      aria-label={`Detalhes: ${hub.title}`}
      className="w-full mt-4 p-5 sm:p-7 bg-[#F4F1E8] border-t border-[#58644B]/40 relative select-text"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div data-frag="head" className="flex items-start justify-between gap-4 border-b border-[#58644B]/20 pb-4 mb-5">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] uppercase font-semibold text-[#58644B] tracking-[0.18em]">
            {hub.index} — {hub.title}
          </span>
          <h3
            className="font-black text-2xl sm:text-3xl text-[#23241F]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {hub.surfaceHighlight}
          </h3>
          <p className="text-sm text-[#4B4B44] mt-0.5">{hub.summary}</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label={`Fechar detalhes de ${hub.title}`}
          className="p-2 border border-[#58644B]/30 hover:border-[#58644B] hover:bg-[#58644B] hover:text-[#F5F2E9] text-[#23241F] transition-colors cursor-pointer shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#B69AD9]"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        {hub.items.map((item) => (
          <li key={item.title} data-frag="item" className="flex flex-col gap-3 border-l border-[#58644B]/25 pl-4">
            <div className="flex flex-col gap-1.5">
              {item.logo && <InstitutionLogo logo={item.logo} size="sm" className="mb-2" />}
              <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.14em] text-[#58644B] font-semibold">
                <span>{item.institution}</span>
                {item.hours && <span className="text-[#23241F] tabular-nums">{item.hours}</span>}
              </div>
              <h4
                className="font-bold text-lg text-[#23241F] leading-snug"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {item.title}
              </h4>
              {item.period && <p className="text-xs text-[#4B4B44]">{item.period}</p>}
              {item.note && <p className="text-xs text-[#44503A] font-medium">{item.note}</p>}
            </div>

            {item.skills.length > 0 && (
              <ul className="flex flex-wrap gap-x-3 gap-y-1.5 pt-2 border-t border-[#58644B]/15" aria-label="Eixos e tecnologias">
                {item.skills.map((skill) => (
                  <li key={skill} data-frag="skill" className="text-xs text-[#44503A]">
                    {skill}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
