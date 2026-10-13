import React from "react";
import { CONTACT } from "@/content/contactInfo";
import flowers from "@/components/assets/botanical-flowers-ivory-01.png";

const sans = { fontFamily: "'DM Sans', sans-serif" };
const display = { fontFamily: "'Playfair Display', Georgia, serif" };

const link =
  "inline-flex items-center gap-1.5 py-1 hover:text-[#3E2A6B] underline-offset-4 hover:underline outline-none focus-visible:ring-2 focus-visible:ring-[#3E2A6B]";

/** Rodapé editorial: assinatura e canais. Encaixa no fim da página (scroll-snap end). */
export default function Footer() {
  return (
    <footer className="site-footer relative overflow-hidden bg-[#F5F2E9] text-[#23241F]" style={sans}>
      <img src={flowers} alt="" aria-hidden="true" loading="lazy" className="pointer-events-none select-none absolute -right-[6vw] -bottom-[10%] w-[min(42vw,26rem)] opacity-25 -rotate-12" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-[clamp(3.5rem,9svh,6rem)] pb-6 flex flex-col gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8">
          <div className="lg:col-span-8 flex flex-col gap-3">
            <p className="text-[clamp(2.6rem,7vw,5.5rem)] font-bold leading-[0.92] tracking-tight" style={display}>
              Eduarda <em className="font-normal italic text-[#44503A]">Santos</em>
            </p>
            <p className="max-w-md text-[0.95rem] leading-relaxed text-[#3A3A34]">
              Desenvolvedora Full Stack. Software, dados e inteligência artificial aplicados a problemas reais.
            </p>
          </div>

          <div className="lg:col-span-4 lg:justify-self-end">
            <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#44503A] mb-2">Canais</p>
            <ul className="flex flex-col text-sm">
              {CONTACT.links.map((l) => (
                <li key={l.id}>
                  <a
                    href={l.href}
                    {...(l.download
                      ? { download: "Eduarda-Silva-Santos-Curriculo.pdf" }
                      : l.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    className={link}
                  >
                    {l.label}
                    {l.href.startsWith("http") && <span className="sr-only">(abre em nova aba)</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-[#4B4B44]">
          <p>© {new Date().getFullYear()} Eduarda Silva Santos · Brasil, disponível para atuação remota</p>
        </div>
      </div>
    </footer>
  );
}
