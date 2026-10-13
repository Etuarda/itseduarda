import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { sectionIds, sectionLinks } from "@/data/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { CONTACT } from "@/content/contactInfo";

const sans = { fontFamily: "'DM Sans', sans-serif" };
const display = { fontFamily: "'Playfair Display', Georgia, serif" };

/** O header assume a paleta do capítulo em tela: papel, oliva, lilás, carvão, pergaminho e noite. */
const THEME: Record<string, { bg: string; ink: string; accent: string; dark: boolean }> = {
  hero: { bg: "245,242,233", ink: "#23241F", accent: "#44503A", dark: false },
  sobre: { bg: "43,53,36", ink: "#F5F2E9", accent: "#D4C2EE", dark: true },
  projetos: { bg: "214,198,241", ink: "#23241F", accent: "#3E2A6B", dark: false },
  processo: { bg: "30,31,27", ink: "#F5F2E9", accent: "#C9B3E6", dark: true },
  trajetoria: { bg: "237,228,207", ink: "#23241F", accent: "#44503A", dark: false },
  contato: { bg: "22,27,18", ink: "#F5F2E9", accent: "#C9B3E6", dark: true },
};

const cv = CONTACT.links.find((l) => l.id === "cv");

export default function Header() {
  const { activeSection, isScrolled } = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = THEME[activeSection] ?? THEME.hero;

  // Drawer mobile: trava o scroll do body e fecha com Esc
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  const ring = t.dark ? "focus-visible:ring-[#D4C2EE]" : "focus-visible:ring-[#3E2A6B]";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[70] w-full transition-[background-color,color,border-color] duration-500"
        style={{
          ...sans,
          color: t.ink,
          backgroundColor: `rgba(${t.bg},${isScrolled ? 0.88 : 0.6})`,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: `1px solid ${t.dark ? "rgba(245,242,233,0.14)" : "rgba(35,36,31,0.12)"}`,
        }}
      >
        <div className="max-w-7xl mx-auto h-14 sm:h-16 px-4 sm:px-8 lg:px-16 flex items-center justify-between gap-4">
          {/* Menu (mobile) */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu de navegação"
            aria-expanded={menuOpen}
            className={`lg:hidden flex items-center gap-2.5 h-10 px-3 border border-current/30 text-[11px] uppercase tracking-[0.2em] font-semibold cursor-pointer outline-none focus-visible:ring-2 ${ring}`}
          >
            <span aria-hidden="true" className="flex flex-col gap-[3px]">
              <span className="block w-4 h-px bg-current" />
              <span className="block w-4 h-px bg-current" />
              <span className="block w-2.5 h-px bg-current" />
            </span>
            Menu
          </button>

          {/* Assinatura editorial */}
          <a href="#hero" aria-label="Eduarda Silva Santos, ir para o início" className={`hidden lg:flex items-baseline gap-3 group outline-none focus-visible:ring-2 ${ring}`}>
            <span className="text-[1.15rem] font-bold leading-none tracking-tight" style={display}>
              Eduarda <em className="font-normal italic" style={{ color: t.accent }}>Santos</em>
            </span>
            <span className="hidden xl:inline text-[10px] uppercase tracking-[0.22em] opacity-70">Software · Dados · IA</span>
          </a>

          {/* Capítulos (desktop) */}
          <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-6 xl:gap-8">
            {sectionLinks
              .filter((l) => l.id !== "contato")
              .map((l) => {
                const active = activeSection === l.id;
                return (
                  <a
                    key={l.id}
                    href={`#${l.id}`}
                    aria-current={active ? "true" : undefined}
                    className={`group relative py-2 text-[11px] uppercase tracking-[0.2em] font-semibold transition-opacity outline-none focus-visible:ring-2 ${ring} ${active ? "opacity-100" : "opacity-70 hover:opacity-100"}`}
                  >
                    {l.label}
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 right-0 bottom-0 h-[2px] origin-left transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                      style={{ background: t.accent }}
                    />
                  </a>
                );
              })}
          </nav>

          {/* Ação */}
          <a
            href="#contato"
            className={`group inline-flex items-center gap-2 h-10 px-4 border text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors outline-none focus-visible:ring-2 ${ring}`}
            style={{ borderColor: t.ink, background: t.ink, color: `rgb(${t.bg})` }}
          >
            Falar comigo
          </a>
        </div>

      </header>

      {/* Menu mobile: folha editorial em papel */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-[80] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu de navegação">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-[#23241F]/55 backdrop-blur-xs"
              aria-hidden="true"
            />
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full bg-[#F5F2E9] text-[#23241F] border-b border-[#23241F]/20 px-5 pt-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]"
              style={sans}
            >
              <div className="flex items-center justify-between pb-3">
                <span className="text-lg font-bold" style={display}>
                  Eduarda <em className="font-normal italic text-[#44503A]">Santos</em>
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Fechar menu"
                  className="grid place-items-center size-10 border border-[#23241F]/30 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#3E2A6B]"
                >
                  <X aria-hidden="true" className="w-4 h-4" />
                </button>
              </div>

              <nav aria-label="Capítulos" className="flex flex-col">
                {sectionLinks.map((l) => {
                  const active = activeSection === l.id;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => go(l.id)}
                      aria-current={active ? "true" : undefined}
                      className="flex items-baseline gap-4 py-2.5 text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#3E2A6B]"
                    >
                      <span className={`text-[1.6rem] leading-none ${active ? "italic text-[#3E2A6B]" : ""}`} style={display}>
                        {l.label}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {cv && (
                <a
                  href={cv.href}
                  download="Eduarda-Silva-Santos-Curriculo.pdf"
                  className="mt-4 inline-flex items-center gap-2 h-11 px-4 border border-[#23241F]/30 text-[11px] uppercase tracking-[0.2em] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#3E2A6B]"
                >
                  <Download aria-hidden="true" className="w-3.5 h-3.5" /> Baixar currículo (PDF)
                </a>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
