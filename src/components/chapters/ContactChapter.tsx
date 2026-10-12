import React, { useState } from "react";
import ChapterShell, { ChapterHeading } from "./ChapterShell";
import ContactForm from "./ContactForm";
import { CONTACT } from "@/content/contactInfo";
import flowers from "@/components/assets/botanical-flowers-mauve-01.png";

const sans = { fontFamily: "'DM Sans', sans-serif" };
const display = { fontFamily: "'Playfair Display', Georgia, serif" };

/** 06 — Contato · noite botânica: caixa de mensagem + canais diretos. */
export default function ContactChapter() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  };

  return (
    <ChapterShell
      id="contato"
      className="bg-[#161B12] text-[#F5F2E9]"
      innerClassName="pt-[max(5rem,10svh)] pb-[max(1.25rem,3svh)] justify-center-safe gap-[clamp(0.9rem,2.6svh,2rem)]"
      decor={
        <>
          <img src={flowers} alt="" className="absolute -right-[8vw] -top-[4svh] w-[min(46vw,34rem)] opacity-20 rotate-12" loading="lazy" />
          <img src={flowers} alt="" className="absolute -left-[10vw] -bottom-[8svh] w-[min(40vw,28rem)] opacity-15 -rotate-[160deg]" loading="lazy" />
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-[clamp(0.9rem,2.6svh,2rem)] items-start">
        <div className="lg:col-span-6 flex flex-col gap-[clamp(0.75rem,2svh,1.5rem)]">
          <ChapterHeading
            id="contato"
            number="06"
            kicker={CONTACT.kicker}
            title={CONTACT.title}
            accentClass="text-[#C9B3E6]"
            kickerClass="text-[#B5C29C]"
          />
          <p className="hidden sm:block text-[#DAD6CA] text-[clamp(0.95rem,1.15vw,1.08rem)] leading-relaxed max-w-lg" style={sans}>
            {CONTACT.text}
          </p>

          {/* Canais diretos */}
          <ul className="flex flex-wrap lg:flex-col gap-x-5 gap-y-1 lg:gap-0 lg:border-t lg:border-[#F5F2E9]/20" style={sans}>
            {CONTACT.links.map((l) => (
              <li key={l.id} className="lg:border-b lg:border-[#F5F2E9]/20">
                <a
                  href={l.href}
                  {...(l.download
                    ? { download: "Eduarda-Silva-Santos-Curriculo.pdf" }
                    : l.href.startsWith("http")
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  className="group flex items-baseline gap-3 py-1.5 lg:py-[clamp(0.45rem,1.3svh,0.8rem)] outline-none focus-visible:ring-2 focus-visible:ring-[#C9B3E6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161B12]"
                >
                  <span className="hidden lg:inline text-[11px] uppercase tracking-[0.22em] font-semibold text-[#B5C29C] w-24 shrink-0">{l.label}</span>
                  <span className="lg:hidden text-[11px] uppercase tracking-[0.2em] font-semibold text-[#F5F2E9] underline underline-offset-4 decoration-[#C9B3E6]/60">
                    {l.label}
                  </span>
                  <span className="hidden lg:inline flex-1 text-[clamp(1rem,1.6vw,1.35rem)] text-[#F5F2E9] group-hover:text-[#C9B3E6] group-hover:italic transition-colors truncate" style={display}>
                    {l.value}
                  </span>
                  <span aria-hidden="true" className="text-[#C9B3E6] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    {l.download ? "↓" : "↗"}
                  </span>
                  {l.href.startsWith("http") && <span className="sr-only">(abre em nova aba)</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Caixa de mensagem */}
        <section aria-labelledby="contato-form-title" className="lg:col-span-6 lg:mt-[clamp(1.5rem,6svh,4rem)] p-[clamp(1rem,2.6svh,1.75rem)] border border-[#F5F2E9]/20 bg-[#F5F2E9]/[0.03]">
          <h3 id="contato-form-title" className="text-[clamp(1.2rem,1.8vw,1.6rem)] font-bold mb-3" style={display}>
            Mande uma mensagem
          </h3>
          <ContactForm />
        </section>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#DAD6CA]/80" style={sans}>
        <button
          type="button"
          onClick={copyEmail}
          className="underline underline-offset-4 decoration-[#C9B3E6]/60 hover:text-[#F5F2E9] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#C9B3E6]"
        >
          {copied ? "E-mail copiado" : `Copiar ${CONTACT.email}`}
        </button>
        <span role="status" className="sr-only">
          {copied ? "E-mail copiado para a área de transferência" : ""}
        </span>
        <p>© {new Date().getFullYear()} Eduarda Silva Santos · Software, dados e IA</p>
      </div>
    </ChapterShell>
  );
}
