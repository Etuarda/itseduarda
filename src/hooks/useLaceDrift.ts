import { useEffect } from "react";

/**
 * Faz as rendas das costuras deslizarem como um fio contínuo: o scroll puxa a renda
 * e o cursor (desktop) a desloca levemente. Escreve --lace-shift no <html>.
 */
export function useLaceDrift() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    let pointer = 0;
    let raf = 0;

    const write = () => {
      raf = 0;
      root.style.setProperty("--lace-shift", `${(window.scrollY * 0.35 + pointer).toFixed(1)}px`);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(write);
    };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer = (e.clientX / window.innerWidth - 0.5) * 40;
      schedule();
    };

    write();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);
}
