import { ArrowUpRight, Sparkles } from "lucide-react";
import { sectionIds, sectionLinks } from "@/data/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function Header() {
  const { activeSection, isScrolled } = useActiveSection(sectionIds);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 pointer-events-none">
      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 pointer-events-auto ${
          isScrolled
            ? "bg-[#F7F6F2]/60 backdrop-blur-md shadow-xs border-b border-[#465B20]/20 py-2.5 sm:py-3"
            : "bg-transparent py-3.5 sm:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Espaçador esquerdo invisível para manter equilíbrio editorial da navegação */}
          <div className="hidden md:block w-8" />

          {/* Navigation Links (Sem duplicar o contato) */}
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
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#465B20] rounded-full" />
                    )}
                  </a>
                );
              })}
          </nav>

          {/* Único Botão de Ação de Contato */}
          <a
            href="#contato"
            className="px-4 py-2 rounded-full bg-[#465B20] hover:bg-[#2A3614] text-[#F7F6F2] font-sans font-semibold text-xs uppercase tracking-[0.14em] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span>Contato</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
