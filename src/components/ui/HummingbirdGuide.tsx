import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX, Sparkles, X, Compass, MessageSquare } from "lucide-react";
import {
  useBirdRoute,
  zoneClasses,
  EDITORIAL_GUIDE_HINTS,
  type Zone,
  type SectionId,
  SECTION_IDS,
  getSide,
} from "@/lib/hummingbirdRoute";

export type HummingbirdGuideProps = {
  zone?: Zone;
  hint?: string;
  className?: string;
};

/**
 * Ilustração Vetorial Autêntica do Beija-Flor em SVG
 */
function HummingbirdSvg({
  facingInward = 1,
  bubbleDismissed = false,
  onReopenBubble,
  onClick,
}: {
  facingInward?: number;
  bubbleDismissed?: boolean;
  onReopenBubble?: () => void;
  onClick?: () => void;
}) {
  return (
    <div
      className="relative w-11 sm:w-14 md:w-16 h-11 sm:h-14 md:h-16 pointer-events-auto cursor-pointer group"
      onClick={onClick}
      title="Clique para eu alternar para a próxima borda da narrativa!"
      style={{
        transform: `scaleX(${facingInward})`,
        transition: "transform 0.3s ease-out",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_4px_10px_rgba(43,41,39,0.22)] animate-bird-float"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Asa Esquerda (Traseira) */}
        <g className="animate-wing-left">
          <path
            d="M 45 42 C 35 15, 20 8, 12 18 C 8 26, 25 38, 42 45 Z"
            fill="url(#wingGradient)"
            opacity="0.85"
          />
          <path
            d="M 40 40 C 30 20, 22 14, 16 22"
            stroke="#6B7B4B"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.7"
          />
        </g>

        {/* Cauda */}
        <path
          d="M 32 58 C 24 66, 12 76, 8 86 C 14 84, 25 74, 36 64 Z"
          fill="#3A4423"
        />
        <path
          d="M 34 59 C 28 68, 18 80, 14 90 C 20 86, 30 76, 38 65 Z"
          fill="#556B2F"
          opacity="0.9"
        />

        {/* Corpo */}
        <ellipse
          cx="46"
          cy="50"
          rx="16"
          ry="11"
          transform="rotate(-24 46 50)"
          fill="url(#bodyGradient)"
        />

        {/* Peito e Garganta */}
        <path
          d="M 46 44 C 54 44, 58 52, 54 58 C 48 60, 44 54, 46 44 Z"
          fill="url(#throatGradient)"
        />

        {/* Cabeça */}
        <circle cx="62" cy="40" r="9.5" fill="#3A4423" />
        <circle cx="62" cy="40" r="8" fill="url(#headGradient)" />

        {/* Olho com Ponto de Luz */}
        <circle cx="65" cy="38.5" r="2.2" fill="#1C1A18" />
        <circle cx="65.7" cy="37.8" r="0.8" fill="#FFFFFF" />

        {/* Bico Fino Alongado */}
        <path
          d="M 70 41 Q 84 43 96 46 Q 84 45 69 43 Z"
          fill="#2B2927"
        />

        {/* Asa Direita (Frontal) */}
        <g className="animate-wing-right">
          <path
            d="M 48 44 C 42 16, 30 8, 22 16 C 16 24, 32 38, 46 48 Z"
            fill="url(#wingGradientFront)"
            opacity="0.9"
          />
          <path
            d="M 44 42 C 36 22, 28 15, 24 22"
            stroke="#8A9A68"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.8"
          />
        </g>

        {/* Gradientes */}
        <defs>
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#556B2F" />
            <stop offset="60%" stopColor="#3A4423" />
            <stop offset="100%" stopColor="#283618" />
          </linearGradient>

          <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A9A68" />
            <stop offset="60%" stopColor="#556B2F" />
            <stop offset="100%" stopColor="#3A4423" />
          </linearGradient>

          <linearGradient id="throatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4CEBF" />
            <stop offset="40%" stopColor="#8A9A68" />
            <stop offset="100%" stopColor="#556B2F" />
          </linearGradient>

          <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A9A68" />
            <stop offset="50%" stopColor="#6B7B4B" />
            <stop offset="100%" stopColor="#3A4423" />
          </linearGradient>

          <linearGradient id="wingGradientFront" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A4B384" />
            <stop offset="50%" stopColor="#7B8B5B" />
            <stop offset="100%" stopColor="#4A562D" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function HummingbirdGuide({
  zone: explicitZone,
  hint: explicitHint,
  className = "",
}: HummingbirdGuideProps) {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  // Mapeamento determinístico alternado (D → E → D → E → D → E → D)
  const birdRoute = useBirdRoute(isMobile);

  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [bubbleDismissed, setBubbleDismissed] = useState<boolean>(true);
  const [isCinematicIntro, setIsCinematicIntro] = useState<boolean>(true);
  const [transitionState, setTransitionState] = useState<"idle" | "leaving" | "arriving">("idle");
  const [manualSectionIndex, setManualSectionIndex] = useState<number | null>(null);

  // Zona ativa calculada determinística pela seção atual
  const effectiveSection: SectionId = useMemo(() => {
    if (manualSectionIndex !== null) {
      return SECTION_IDS[manualSectionIndex % SECTION_IDS.length];
    }
    return activeSection;
  }, [manualSectionIndex, activeSection]);

  const currentZone: Zone = useMemo(() => {
    if (explicitZone) return explicitZone;
    return birdRoute[effectiveSection] || "right-top";
  }, [explicitZone, birdRoute, effectiveSection]);

  // Pensamento poético editorial da seção
  const currentThought = useMemo(() => {
    if (explicitHint) {
      return {
        tag: "Guia Editorial",
        title: "Dossiê Narrativo",
        text: explicitHint,
      };
    }
    return EDITORIAL_GUIDE_HINTS[effectiveSection] || EDITORIAL_GUIDE_HINTS["hero"];
  }, [explicitHint, effectiveSection]);

  const isLeftSide = getSide(currentZone) === "left";
  // O beija-flor DEVE olhar para dentro:
  // Quando na esquerda: olha para a direita (scaleX = 1) -> 🐦 → conteúdo
  // Quando na direita: olha para a esquerda (scaleX = -1) -> conteúdo ← 🐦
  const facingInward = isLeftSide ? 1 : -1;

  // Atualiza detecção mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Voo inicial cinematográfico breve na tela inicial (2.0s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCinematicIntro(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll Spy com requestAnimationFrame para detectar com 100% de precisão todas as seções (incluindo competências e trajetória)
  useEffect(() => {
    if (explicitZone) return;

    let ticking = false;

    const computeCurrentSection = (): SectionId => {
      const scrollY = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Topo da tela: Início no Hero
      if (scrollY < 80) return "hero";

      // Fim da página: Contato / Rodapé
      if (scrollY + winHeight >= docHeight - 80) return "contato";

      // Ponto focal de leitura na viewport (40% da altura da janela)
      const focalPoint = scrollY + winHeight * 0.4;

      // Lista ordenada de seções com seus respectivos elementos no DOM
      const candidateSections: { id: SectionId; element: HTMLElement | null }[] = [
        { id: "hero", element: document.getElementById("hero") },
        { id: "stacks", element: document.getElementById("stacks") || document.getElementById("the-edits") },
        { id: "projetos", element: document.getElementById("projetos") },
        { id: "skills", element: document.getElementById("skills") || document.getElementById("competencias") },
        { id: "experiencia", element: document.getElementById("trajetoria") || document.getElementById("experiencia") },
        { id: "contato", element: document.getElementById("contato") },
      ];

      // Busca reversa pela seção que envolve o ponto focal
      for (let i = candidateSections.length - 1; i >= 0; i--) {
        const item = candidateSections[i];
        if (!item.element) continue;

        const top = item.element.offsetTop;
        const height = item.element.offsetHeight;

        if (focalPoint >= top && focalPoint < top + height) {
          return item.id;
        }
      }

      // Fallback para a seção visível mais próxima
      let closestId: SectionId = "hero";
      let minDistance = Infinity;

      for (const item of candidateSections) {
        if (!item.element) continue;
        const dist = Math.abs(item.element.offsetTop - focalPoint);
        if (dist < minDistance) {
          minDistance = dist;
          closestId = item.id;
        }
      }

      return closestId;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const detected = computeCurrentSection();
          setActiveSection((prev) => {
            if (detected !== prev) {
              // Voo fluido do beija-flor para a nova seção
              setTransitionState("leaving");

              setTimeout(() => {
                setActiveSection(detected);
                setManualSectionIndex(null);
                setBubbleDismissed(false); // Revela o balão poético na nova seção
                setTransitionState("arriving");

                setTimeout(() => {
                  setTransitionState("idle");
                }, 320);
              }, 200);
            }
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [explicitZone]);

  // Alternância manual ao clicar no pássaro
  const handleNextSectionPerch = () => {
    setTransitionState("leaving");
    setTimeout(() => {
      setManualSectionIndex((prev) => (prev === null ? 1 : prev + 1));
      setBubbleDismissed(false);
      setTransitionState("arriving");
      setTimeout(() => setTransitionState("idle"), 320);
    }, 200);
  };

  // A dica só aparece quando pousado em repouso (idle)
  const isSpeechVisible = !isMuted && !bubbleDismissed && transitionState === "idle";

  // =========================================================================
  // FASE 1: VOO INICIAL CINEMATOGRÁFICO NA TELA INICIAL (SPLASH / HERO)
  // z-[70] para ser 100% visível sobre o carregamento inicial
  // =========================================================================
  if (isCinematicIntro) {
    const screenW = typeof window !== "undefined" ? window.innerWidth : 1024;
    const finalX = screenW - (isMobile ? 65 : 85);
    const finalY = isMobile ? 78 : 84;

    return (
      <aside
        aria-label="Guia Beija-Flor - Voo de Entrada"
        className={`fixed inset-0 pointer-events-none z-[70] select-none overflow-hidden ${className}`}
      >
        <motion.div
          initial={{
            x: -80,
            y: 20,
            scale: 0.8,
            opacity: 0,
            rotate: 15,
          }}
          animate={{
            x: [-80, screenW * 0.28, screenW * 0.68, finalX],
            y: [20, isMobile ? 50 : 45, isMobile ? 65 : 60, finalY],
            scale: [0.8, 1.05, 1, 1],
            opacity: [0, 1, 1, 1],
            rotate: [15, -4, 6, 0],
          }}
          transition={{
            duration: 1.9,
            times: [0, 0.3, 0.7, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute top-0 left-0"
        >
          <div className="relative flex items-center">
            <HummingbirdSvg
              facingInward={-1}
              bubbleDismissed={false}
              onClick={handleNextSectionPerch}
            />

            {/* Balão inicial: "Comece por aqui. Engenharia, dados e IA aplicada." */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              className="absolute right-full mr-3 w-56 sm:w-64 max-w-[calc(100vw-4.5rem)] bg-[#FAF8F5] border border-[#465B20]/35 rounded-2xl p-3 shadow-[0_12px_32px_-6px_rgba(28,26,24,0.22)] text-[#1C1A18]"
            >
              <div className="flex items-center gap-1.5 pb-1 mb-1 border-b border-[#465B20]/20">
                <Sparkles className="w-3 h-3 text-[#465B20]" />
                <span className="font-handwriting text-base text-[#465B20] font-bold leading-none">
                  Guia Beija-Flor
                </span>
                <span className="text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#465B20]/15 text-[#2A3614] font-bold ml-auto">
                  Abertura
                </span>
              </div>
              <h4 className="font-serif font-bold text-xs text-[#1C1A18] leading-tight mb-1">
                Início do Dossiê
              </h4>
              <p className="font-sans text-[11px] text-[#383531] font-normal leading-snug">
                Comece por aqui. Engenharia, dados e IA aplicada.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </aside>
    );
  }

  // =========================================================================
  // FASE 2: GUIA NARRADOR EDITORIAL ALTERNADO (D → E → D → E → D → E → D)
  // Deslocamento curto de voo ao entrar, recuo para fora ao sair
  // =========================================================================
  const travelDirectionOffset = isLeftSide ? -35 : 35;

  return (
    <aside
      aria-label="Guia Beija-Flor do Portfólio"
      className={`fixed inset-0 pointer-events-none z-[60] select-none overflow-hidden ${className}`}
    >
      {/* Posição calculada com clamp nas bordas perimétricas seguras */}
      <div
        className={`absolute ${zoneClasses[currentZone]} transition-all duration-300 ease-out`}
      >
        <div className="relative flex items-center">
          {/* Micro-deslocamento curto na borda: sai da tela / surge da margem */}
          <motion.div
            key={`${currentZone}-${effectiveSection}`}
            initial={{
              x: travelDirectionOffset,
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              x: transitionState === "leaving" ? travelDirectionOffset : 0,
              opacity: transitionState === "leaving" ? 0 : 1,
              scale: transitionState === "leaving" ? 0.88 : 1,
            }}
            transition={{
              duration: transitionState === "leaving" ? 0.2 : 0.32,
              ease: "easeOut",
            }}
            className="relative flex items-center"
          >
            {/* Balão Editorial Poético (Abre sempre voltado para o conteúdo interior) */}
            <AnimatePresence>
              {isSpeechVisible && (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    x: isLeftSide ? -10 : 10,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.85,
                    x: isLeftSide ? -8 : 8,
                  }}
                  transition={{ duration: 0.26, ease: "easeOut" }}
                  className={`absolute pointer-events-auto w-56 sm:w-64 md:w-72 max-w-[calc(100vw-4.5rem)] bg-[#FAF8F5] border border-[#465B20]/40 rounded-2xl p-3 sm:p-3.5 shadow-[0_12px_32px_-6px_rgba(28,26,24,0.25)] text-[#1C1A18] z-50 ${
                    isLeftSide
                      ? "left-full ml-3"
                      : "right-full mr-3"
                  }`}
                  style={{
                    top: currentZone.endsWith("bottom")
                      ? "auto"
                      : currentZone.endsWith("top")
                      ? "0"
                      : "50%",
                    bottom: currentZone.endsWith("bottom") ? "0" : "auto",
                    transform: currentZone.endsWith("middle")
                      ? "translateY(-50%)"
                      : "none",
                  }}
                >
                  {/* Cabeçalho do Balão */}
                  <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#465B20]/20">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#465B20]" />
                      <span className="font-handwriting text-base sm:text-lg text-[#465B20] font-bold leading-none">
                        Guia Beija-Flor
                      </span>
                      <span className="text-[8px] sm:text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#465B20]/15 text-[#2A3614] font-bold">
                        {currentThought.tag}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-1 rounded-md text-[#383531] hover:text-[#1C1A18] hover:bg-[#E5E2D8] transition-colors cursor-pointer"
                        title={isMuted ? "Ativar dicas" : "Silenciar dicas"}
                        aria-label={isMuted ? "Ativar som e dicas" : "Silenciar dicas"}
                      >
                        {isMuted ? (
                          <VolumeX className="w-3 h-3 text-[#9E6761]" />
                        ) : (
                          <Volume2 className="w-3 h-3" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setBubbleDismissed(true)}
                        className="p-1 rounded-md text-[#383531] hover:text-[#1C1A18] hover:bg-[#E5E2D8] transition-colors cursor-pointer"
                        title="Fechar dica"
                        aria-label="Fechar dica"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Título & Mensagem Narrativa Poética */}
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-[#1C1A18] leading-tight mb-1">
                    {currentThought.title}
                  </h4>
                  <p className="font-sans text-[11px] sm:text-xs text-[#383531] font-normal leading-relaxed mb-2">
                    “{currentThought.text}”
                  </p>

                  {/* Ação de avançar percurso editorial */}
                  <button
                    type="button"
                    onClick={handleNextSectionPerch}
                    className="w-full flex items-center justify-between pt-1.5 border-t border-[#465B20]/20 text-[10px] font-sans font-bold text-[#465B20] hover:text-[#2A3614] cursor-pointer"
                  >
                    <span className="flex items-center gap-1">
                      <Compass className="w-3 h-3" /> Continuar percurso editorial
                    </span>
                    <span className="font-mono text-[9px] text-[#4E4A45] font-semibold">
                      {effectiveSection} ({isLeftSide ? "E" : "D"}) ↗
                    </span>
                  </button>

                  {/* Seta do Balão */}
                  <div
                    className={`absolute top-4 w-0 h-0 border-solid ${
                      isLeftSide
                        ? "right-full border-r-8 border-r-[#F7F6F2] border-y-6 border-y-transparent border-l-0"
                        : "left-full border-l-8 border-l-[#F7F6F2] border-y-6 border-y-transparent border-r-0"
                    }`}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pássaro voltado para dentro: scaleX(1) na esquerda, scaleX(-1) na direita */}
            <HummingbirdSvg
              facingInward={facingInward}
              bubbleDismissed={bubbleDismissed}
              onReopenBubble={() => setBubbleDismissed(false)}
              onClick={handleNextSectionPerch}
            />
          </motion.div>
        </div>
      </div>
    </aside>
  );
}
