import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { sectionIds, sectionLinks } from "@/data/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function Header() {
  const { activeSection, isScrolled } = useActiveSection(sectionIds);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Trava scroll do body de forma segura quando o drawer mobile estiver aberto
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[70] w-full transition-all duration-300 pointer-events-none">
        {/* Main Navigation Bar */}
        <div
          className={`w-full transition-all duration-300 pointer-events-auto ${
            isScrolled
              ? "bg-[#F7F6F2]/85 backdrop-blur-md shadow-xs border-b border-[#465B20]/20 py-2.5 sm:py-3"
              : "bg-transparent py-3 sm:py-4"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
            {/* Botão de Menu Mobile (visível apenas em telas menores que md) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden flex items-center gap-2 px-3.5 py-2 min-h-[40px] rounded-full bg-white/80 border border-[#465B20]/30 text-[#2A3614] hover:bg-white transition-all shadow-2xs cursor-pointer active:scale-95"
              aria-label="Abrir menu de navegação"
            >
              <Menu className="w-4 h-4 text-[#465B20]" />
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider">Menu</span>
            </button>

            {/* Logo Editorial no Desktop / Início */}
            <a
              href="#hero"
              className="hidden md:flex items-center gap-2 group text-[#1C1A18] hover:text-[#465B20] transition-colors"
              aria-label="Ir para o início"
            >
              <span className="w-7 h-7 rounded-full bg-[#465B20]/15 border border-[#465B20]/30 flex items-center justify-center font-serif font-black text-sm text-[#465B20] group-hover:bg-[#465B20] group-hover:text-[#F7F6F2] transition-all">
                E
              </span>
              <span className="font-serif font-bold text-sm tracking-wide">
                Eduarda
              </span>
            </a>

            {/* Navigation Links Desktop */}
            <nav className="hidden md:flex items-center gap-6" aria-label="Navegação principal">
              {sectionLinks
                .filter((item) => item.id !== "contato")
                .map((item) => {
                  const isActive = activeSection === item.id;

                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`relative font-sans text-xs uppercase tracking-[0.15em] transition-colors py-1 ${
                        isActive
                          ? "text-[#465B20] font-bold"
                          : "text-[#383531] hover:text-[#1C1A18] font-semibold"
                      }`}
                      aria-label={`Ir para seção ${item.label}`}
                    >
                      {item.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#465B20] rounded-full" />
                      )}
                    </a>
                  );
                })}
            </nav>

            {/* Botão de Ação: Falar Comigo */}
            <a
              href="#contato"
              className="px-4 py-2 min-h-[40px] rounded-full bg-[#465B20] hover:bg-[#2A3614] text-[#F7F6F2] font-sans font-semibold text-xs uppercase tracking-[0.12em] sm:tracking-[0.14em] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
            >
              <span>Falar comigo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Drawer Editorial de Navegação Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[80] md:hidden flex flex-col justify-end pointer-events-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#1C1A18]/50 backdrop-blur-xs"
              aria-hidden="true"
            />

            {/* Painel do Menu Mobile */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="relative w-full max-h-[85dvh] bg-[#FAF8F5] border-t-2 border-[#465B20]/40 rounded-t-3xl shadow-2xl p-5 sm:p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] flex flex-col justify-between overflow-y-auto z-10 texture-paper"
            >
              {/* Topo do Menu */}
              <div className="flex items-center justify-between pb-4 border-b border-[#465B20]/20 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#465B20]" />
                  <span className="font-serif font-bold text-lg text-[#1C1A18]">
                    Menu
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-white border border-[#465B20]/25 flex items-center justify-center text-[#1C1A18] hover:bg-[#FAF8F5] transition-colors cursor-pointer shadow-2xs active:scale-95"
                  aria-label="Fechar menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Lista de Seções */}
              <nav className="flex flex-col gap-2 mb-6">
                {sectionLinks.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#465B20] text-[#F7F6F2] font-bold shadow-xs"
                          : "bg-white/80 border border-[#465B20]/15 text-[#1C1A18] hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`font-mono text-xs ${isActive ? "text-white/80" : "text-[#465B20]"}`}>
                          0{idx + 1}.
                        </span>
                        <span className="font-serif text-base font-semibold">
                          {item.label}
                        </span>
                      </div>
                      <ArrowUpRight className={`w-4 h-4 ${isActive ? "text-white" : "text-[#465B20]"}`} />
                    </button>
                  );
                })}
              </nav>

              {/* Ação de Contratação / Currículo no Mobile */}
              <div className="mb-4 pt-1">
                <a
                  href="/Eduarda- Curriculo-Full-Stack(6).pdf"
                  download="Eduarda- Curriculo-Full-Stack(6).pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl border border-[#465B20]/30 bg-white text-[#2A3614] hover:bg-[#FAF8F5] text-xs font-mono font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-2xs cursor-pointer active:scale-98"
                >
                  <Download className="w-3.5 h-3.5 text-[#465B20]" />
                  <span>Baixar currículo (PDF)</span>
                </a>
              </div>

              {/* Rodapé do Menu Mobile */}
              <div className="pt-4 border-t border-[#465B20]/15 flex items-center justify-between text-xs text-[#4E4A45]">
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider">
                  Eduarda Silva Santos
                </span>
                <span className="font-serif italic text-xs text-[#465B20]">
                  Full-Stack & IA
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
