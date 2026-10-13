import { useCallback, useEffect, useRef, useState, type FocusEvent, type PointerEvent, type RefObject } from "react";

const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Autoplay acessível para carrosséis: só anima com o carrossel em tela, a aba visível
 * e ninguém interagindo (hover na área de leitura, foco de teclado, arraste).
 * Com prefers-reduced-motion, nada anda sozinho. `onTick` roda a cada `interval` ms; com
 * `interval` 0 o hook só informa se pode animar (para animações contínuas via rAF).
 */
export function useCarouselAutoplay(
  ref: RefObject<HTMLElement | null>,
  { interval = 0, onTick }: { interval?: number; onTick?: () => void } = {},
) {
  const [reduced, setReduced] = useState(prefersReduced);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const holdUntil = useRef(0);
  const tick = useRef(onTick);
  tick.current = onTick;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  const running = !reduced && !paused && !hover && !focused && visible;

  useEffect(() => {
    if (!running || !interval) return;
    const id = window.setInterval(() => {
      if (document.hidden || Date.now() < holdUntil.current) return;
      tick.current?.();
    }, interval);
    return () => window.clearInterval(id);
  }, [running, interval]);

  /** Depois de uma interação manual, espera um pouco antes de voltar a animar. */
  const hold = useCallback((ms = 6000) => {
    holdUntil.current = Date.now() + ms;
  }, []);

  /** hover pausa: aplicar só na área de leitura (cartão/slide), não no carrossel inteiro */
  const hoverHandlers = {
    onPointerEnter: (e: PointerEvent) => e.pointerType === "mouse" && setHover(true),
    onPointerLeave: (e: PointerEvent) => e.pointerType === "mouse" && setHover(false),
  };

  /** foco de teclado dentro do carrossel pausa */
  const handlers = {
    // só o foco de teclado pausa; clique já chama hold() e não deve travar o giro
    onFocus: (e: FocusEvent) => {
      if ((e.target as HTMLElement).matches?.(":focus-visible")) setFocused(true);
    },
    onBlur: (e: FocusEvent) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
    },
  };

  return {
    /** pode animar agora */
    running,
    reduced,
    paused,
    togglePause: () => setPaused((p) => !p),
    hold,
    /** "agora mesmo" só para animações contínuas: respeita o hold */
    isHeld: () => Date.now() < holdUntil.current,
    handlers,
    hoverHandlers,
  };
}
