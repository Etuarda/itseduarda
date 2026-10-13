import { useEffect, useState, useId, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { CHAPTERS, birdZoneCoords, nextChapter, zoneFacing, type ChapterId } from "@/content/chapters";

gsap.registerPlugin(MotionPathPlugin);

export type HummingbirdGuideProps = {
  className?: string;
};

const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Eventos de coordenação com a apresentação do Hero (HeroMotionController). */
export const HUMMINGBIRD_INTRO_DONE = "hummingbird:intro-done";
export const HERO_INTRO_PLAY = "hero-intro:play";
export const HERO_INTRO_DONE = "hero-intro:done";

declare global {
  interface Window {
    __hummingbirdIntroDone?: boolean;
  }
}

/**
 * Ilustração Vetorial Autêntica do Beija-Flor em SVG
 */
export function HummingbirdSvg({
  facingInward = 1,
  bubbleDismissed = false,
  onReopenBubble,
  onClick,
  interactive = true,
  perch = false,
}: {
  facingInward?: number;
  bubbleDismissed?: boolean;
  onReopenBubble?: () => void;
  onClick?: () => void;
  /** false quando usado como ator decorativo (palco do Hero) */
  interactive?: boolean;
  /** marca o pássaro pousado, usado como destino do voo de volta do Hero */
  perch?: boolean;
}) {
  // IDs únicos: há mais de um beija-flor no documento e url(#id) resolve o primeiro
  const uid = useId().replace(/:/g, "");
  const id = (name: string) => `${name}-${uid}`;
  return (
    <div
      data-hummingbird={perch ? "perch" : undefined}
      className={`relative w-11 sm:w-14 md:w-16 h-11 sm:h-14 md:h-16 group ${interactive ? "pointer-events-auto cursor-pointer" : "pointer-events-none"}`}
      onClick={() => {
        if (bubbleDismissed && onReopenBubble) {
          onReopenBubble();
        } else if (onClick) {
          onClick();
        }
      }}
      title={interactive ? (bubbleDismissed ? "Ver dica" : "Seguir para a próxima seção") : undefined}
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
            fill={`url(#${id("wingGradient")})`}
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
          fill={`url(#${id("bodyGradient")})`}
        />

        {/* Peito e Garganta */}
        <path
          d="M 46 44 C 54 44, 58 52, 54 58 C 48 60, 44 54, 46 44 Z"
          fill={`url(#${id("throatGradient")})`}
        />

        {/* Cabeça */}
        <circle cx="62" cy="40" r="9.5" fill="#3A4423" />
        <circle cx="62" cy="40" r="8" fill={`url(#${id("headGradient")})`} />

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
            fill={`url(#${id("wingGradientFront")})`}
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
          <linearGradient id={id("bodyGradient")} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#556B2F" />
            <stop offset="60%" stopColor="#3A4423" />
            <stop offset="100%" stopColor="#283618" />
          </linearGradient>

          <linearGradient id={id("headGradient")} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A9A68" />
            <stop offset="60%" stopColor="#556B2F" />
            <stop offset="100%" stopColor="#3A4423" />
          </linearGradient>

          <linearGradient id={id("throatGradient")} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4CEBF" />
            <stop offset="40%" stopColor="#8A9A68" />
            <stop offset="100%" stopColor="#556B2F" />
          </linearGradient>

          <linearGradient id={id("wingGradient")} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A9A68" />
            <stop offset="50%" stopColor="#6B7B4B" />
            <stop offset="100%" stopColor="#3A4423" />
          </linearGradient>

          <linearGradient id={id("wingGradientFront")} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A4B384" />
            <stop offset="50%" stopColor="#7B8B5B" />
            <stop offset="100%" stopColor="#4A562D" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function HummingbirdGuide({ className = "" }: HummingbirdGuideProps) {
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );
  const [isCinematicIntro, setIsCinematicIntro] = useState<boolean>(true);
  // Durante a apresentação do Hero, o "ator" é a cópia do pássaro no palco
  const [yieldToHero, setYieldToHero] = useState(false);
  const [chapter, setChapter] = useState<ChapterId>("hero");
  const [hintOpen, setHintOpen] = useState(false);
  const [resting, setResting] = useState(true);

  const birdRef = useRef<HTMLDivElement | null>(null);
  const faceRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef<{ x: number; y: number } | null>(null);
  const landedFromHero = useRef(false);

  const current = CHAPTERS.find((c) => c.id === chapter) ?? CHAPTERS[0];
  const next = nextChapter(chapter);
  const isLeftSide = current.bird.startsWith("left");

  function goToNext() {
    setHintOpen(false);
    const target = next ?? CHAPTERS[0];
    document.getElementById(target.id)?.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth" });
  }

  // usados pelo voo de entrada (bloco preservado)
  const setBubbleDismissed = (dismissed: boolean) => setHintOpen(!dismissed);
  const handleNextSectionPerch = () => goToNext();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Voo inicial cinematográfico breve na tela inicial (2.0s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCinematicIntro(false);
      // Libera a apresentação do Hero, que começa a partir deste poleiro
      window.__hummingbirdIntroDone = true;
      window.dispatchEvent(new Event(HUMMINGBIRD_INTRO_DONE));
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onPlay = () => setYieldToHero(true);
    const onDone = (e: Event) => {
      // fim natural: o pássaro do palco já pousou na zona do Hero
      landedFromHero.current = Boolean((e as CustomEvent<{ landed?: boolean }>).detail?.landed);
      setYieldToHero(false);
    };
    window.addEventListener(HERO_INTRO_PLAY, onPlay);
    window.addEventListener(HERO_INTRO_DONE, onDone);
    return () => {
      window.removeEventListener(HERO_INTRO_PLAY, onPlay);
      window.removeEventListener(HERO_INTRO_DONE, onDone);
    };
  }, []);

  // Capítulo ativo: o que contém o centro da viewport
  useEffect(() => {
    let raf = 0;
    const detect = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      for (const c of CHAPTERS) {
        const el = document.getElementById(c.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) {
          setChapter((prev) => (prev === c.id ? prev : c.id));
          return;
        }
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(detect);
    };
    detect();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Voo entre zonas: arco que sobrevoa a tela, olhando na direção do voo
  useEffect(() => {
    const bird = birdRef.current;
    const face = faceRef.current;
    if (isCinematicIntro || !bird || !face) return;

    const W = document.documentElement.clientWidth;
    const H = window.innerHeight;
    const target = birdZoneCoords(current.bird, W, H);
    const restFacing = zoneFacing(current.bird);
    setHintOpen(false);

    // primeira posição: onde o voo de entrada pousou (canto superior direito)
    if (!pos.current) {
      pos.current = { x: W - (W < 768 ? 65 : 85), y: W < 768 ? 78 : 84 };
      gsap.set(bird, pos.current);
      gsap.set(face, { scaleX: -1 });
    }
    if (yieldToHero) return;

    // parte da posição REAL (um voo pode ter sido interrompido no meio pela apresentação do Hero)
    const from = { x: Number(gsap.getProperty(bird, "x")), y: Number(gsap.getProperty(bird, "y")) };
    pos.current = { x: target.x, y: target.y };

    if (landedFromHero.current || prefersReduced()) {
      landedFromHero.current = false;
      gsap.set(bird, { x: target.x, y: target.y, rotate: 0 });
      gsap.set(face, { scaleX: restFacing });
      return;
    }

    const dx = target.x - from.x;
    const dy = target.y - from.y;
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
      gsap.set(face, { scaleX: restFacing });
      return;
    }
    const travelFacing: 1 | -1 = dx === 0 ? restFacing : dx > 0 ? 1 : -1;
    // ponto de controle: atravessa o miolo da tela, como quem sobrevoa o conteúdo
    const mid = {
      x: gsap.utils.clamp(0, W - target.size, (from.x + target.x) / 2 + (Math.abs(dx) < W * 0.3 ? (W / 2 - from.x) * 0.5 : 0)),
      y: gsap.utils.clamp(70, H - target.size, Math.min(from.y, target.y) - H * 0.12 + (Math.abs(dy) > H * 0.4 ? H * 0.18 : 0)),
    };

    setResting(false);
    const tl = gsap.timeline({ onComplete: () => setResting(true) });
    tl.to(face, { scaleX: travelFacing, duration: 0.2, ease: "power2.out" }, 0)
      .to(bird, { rotate: travelFacing * -8, duration: 0.35, ease: "power2.out" }, 0)
      .to(bird, { motionPath: { path: [mid, { x: target.x, y: target.y }], curviness: 1.4 }, duration: 1.6, ease: "power1.inOut" }, 0)
      .to(bird, { rotate: 0, duration: 0.4, ease: "power2.inOut" }, 1.25)
      .to(face, { scaleX: restFacing, duration: 0.25, ease: "power2.out" }, 1.45);
    return () => {
      tl.kill();
    };
  }, [current.bird, isCinematicIntro, yieldToHero]);

  // Resize: reposiciona sem voo
  useEffect(() => {
    const onResize = () => {
      const bird = birdRef.current;
      if (!bird || !pos.current) return;
      const t = birdZoneCoords(current.bird, document.documentElement.clientWidth, window.innerHeight);
      pos.current = { x: t.x, y: t.y };
      gsap.set(bird, pos.current);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [current.bird]);

  // =========================================================================
  // FASE 1: VOO INICIAL CINEMATOGRÁFICO NA TELA INICIAL (preservado)
  // =========================================================================
  if (isCinematicIntro) {
    const screenW = typeof window !== "undefined" ? window.innerWidth : 1024;
    const finalX = screenW - (isMobile ? 65 : 85);
    const finalY = isMobile ? 78 : 84;

    return (
      <aside
        aria-label="Guia beija-flor, voo de entrada"
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

            {/* Balão inicial (Seção 81 do Guia Mestre) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              className="absolute right-full mr-3 w-64 sm:w-72 max-w-[calc(100vw-4.5rem)] bg-[#FAF8F5] border border-[#465B20]/35 rounded-2xl p-3 sm:p-3.5 shadow-[0_12px_32px_-6px_rgba(28,26,24,0.22)] text-[#1C1A18] pointer-events-auto"
            >
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#465B20]/20">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#465B20] font-bold">
                  GUIA EDITORIAL
                </span>
                <button
                  type="button"
                  onClick={() => setBubbleDismissed(true)}
                  className="p-1 rounded-md text-[#4E4A45] hover:text-[#1C1A18] transition-colors cursor-pointer"
                  title="Fechar"
                  aria-label="Fechar"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <p className="font-sans text-xs text-[#383531] font-normal leading-relaxed mb-2.5">
                Quer começar pelas provas? Posso te levar aos projetos que melhor mostram como eu trabalho.
              </p>
              <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-[#465B20]/15">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("projetos");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-[11px] font-sans font-bold text-[#465B20] hover:text-[#2A3614] cursor-pointer"
                >
                  Ver projetos
                </button>
                <button
                  type="button"
                  onClick={() => setBubbleDismissed(true)}
                  className="text-[10px] font-sans text-[#4E4A45] hover:text-[#1C1A18] cursor-pointer"
                >
                  Continuar explorando
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </aside>
    );
  }


  // =========================================================================
  // FASE 2: SOBREVOO ENTRE CAPÍTULOS (posições alternadas por capítulo)
  // =========================================================================
  return (
    <aside
      aria-label="Guia beija-flor do portfólio"
      className={`fixed inset-0 pointer-events-none z-[60] select-none overflow-hidden transition-opacity duration-300 ${className}`}
      // visibility (e não display) mantém o pássaro mensurável durante a apresentação do Hero
      style={yieldToHero ? { opacity: 0, visibility: "hidden" } : undefined}
    >
      <div ref={birdRef} className="absolute left-0 top-0 will-change-transform">
        <div className="relative">
          <div ref={faceRef}>
            <HummingbirdSvg
              facingInward={1}
              bubbleDismissed={!hintOpen}
              onReopenBubble={() => setHintOpen(true)}
              onClick={() => setHintOpen((o) => !o)}
              perch
            />
          </div>

          <AnimatePresence>
            {hintOpen && resting && (
              <motion.div
                role="dialog"
                aria-label={`Dica: ${current.title}`}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className={`absolute pointer-events-auto w-64 max-w-[calc(100vw-5rem)] bg-[#FBF9F4] text-[#23241F] border border-[#23241F]/20 p-3.5 shadow-[0_14px_36px_-10px_rgba(35,36,31,0.45)] ${
                  isLeftSide ? "left-full ml-3" : "right-full mr-3"
                } ${current.bird.endsWith("bottom") ? "bottom-0" : current.bird.endsWith("top") ? "top-0" : "top-1/2 -translate-y-1/2"}`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#23241F]/15">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#44503A]">
                    {current.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => setHintOpen(false)}
                    aria-label="Fechar dica"
                    className="p-1 text-[#4B4B44] hover:text-[#23241F] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#B69AD9]"
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
                <p className="text-xs leading-relaxed text-[#3B3A35] mb-3">{current.hint}</p>
                {next && (
                  <button
                    type="button"
                    onClick={goToNext}
                    className="w-full flex items-center justify-between text-[11px] uppercase tracking-[0.16em] font-semibold text-[#23241F] hover:text-[#5B4A86] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#B69AD9]"
                  >
                    <span>Próximo: {next.nav}</span>
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </aside>
  );
}
