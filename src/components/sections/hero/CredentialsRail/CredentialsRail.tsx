import React, { useCallback, useEffect, useRef, useState } from "react";
import { CREDENTIAL_HUBS, type CredentialHub } from "../heroData";
import CredentialItem from "./CredentialItem";
import CredentialExpanded from "./CredentialExpanded";
import { prefersReducedMotion } from "../heroGeometry";

const SPEED_PX_PER_S = 16;
const RESUME_AFTER_TOUCH_MS = 2600;

export default function CredentialsRail() {
  const [activeHubId, setActiveHubId] = useState<CredentialHub["id"] | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const firstSetRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // Motivos de pausa acumulados sem re-render (hover, foco, toque, aba, viewport…)
  const pauseRef = useRef(new Set<string>());
  const pause = (reason: string) => pauseRef.current.add(reason);
  const resume = (reason: string) => pauseRef.current.delete(reason);

  const activeHub = CREDENTIAL_HUBS.find((h) => h.id === activeHubId) ?? null;

  useEffect(() => {
    if (activeHubId) pause("expanded");
    else resume("expanded");
  }, [activeHubId]);

  // Loop horizontal contínuo e sem emenda sobre um scroller nativo (swipe livre no mobile)
  useEffect(() => {
    const el = scrollerRef.current;
    const firstSet = firstSetRef.current;
    if (!el || !firstSet || prefersReducedMotion()) return;

    let raf = 0;
    let last = performance.now();
    let pos = el.scrollLeft;
    let touchTimer: number | undefined;

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      const loopWidth = firstSet.offsetWidth;
      if (pauseRef.current.size === 0 && loopWidth > 0) {
        pos += SPEED_PX_PER_S * dt;
        if (pos >= loopWidth) pos -= loopWidth;
        el.scrollLeft = pos;
      } else {
        pos = el.scrollLeft;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Gesto do usuário: pausa e retoma depois de um respiro
    const onUserScrollIntent = () => {
      pause("touch");
      window.clearTimeout(touchTimer);
      touchTimer = window.setTimeout(() => resume("touch"), RESUME_AFTER_TOUCH_MS);
    };
    // Mantém a emenda invisível também quando a pessoa arrasta manualmente
    const onScroll = () => {
      const loopWidth = firstSet.offsetWidth;
      if (pauseRef.current.has("touch") && el.scrollLeft >= loopWidth) {
        el.scrollLeft -= loopWidth;
      }
    };
    const onVisibility = () => (document.hidden ? pause("hidden") : resume("hidden"));
    const io = new IntersectionObserver(([entry]) =>
      entry.isIntersecting ? resume("offscreen") : pause("offscreen"),
    );

    el.addEventListener("pointerdown", onUserScrollIntent, { passive: true });
    el.addEventListener("wheel", onUserScrollIntent, { passive: true });
    el.addEventListener("touchmove", onUserScrollIntent, { passive: true });
    el.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(touchTimer);
      el.removeEventListener("pointerdown", onUserScrollIntent);
      el.removeEventListener("wheel", onUserScrollIntent);
      el.removeEventListener("touchmove", onUserScrollIntent);
      el.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
    };
  }, []);

  const handleSelect = (hub: CredentialHub, trigger: HTMLButtonElement) => {
    triggerRef.current =
      document.querySelector<HTMLButtonElement>(`[data-hub-trigger="${hub.id}"]`) ?? trigger;
    setActiveHubId((current) => (current === hub.id ? null : hub.id));
  };

  const handleClose = useCallback(() => {
    setActiveHubId(null);
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  const renderSet = (isClone: boolean) =>
    CREDENTIAL_HUBS.map((hub) => (
      <CredentialItem
        key={hub.id}
        hub={hub}
        isClone={isClone}
        isActive={activeHubId === hub.id}
        isDimmed={activeHubId !== null && activeHubId !== hub.id}
        onSelect={(trigger) => handleSelect(hub, trigger)}
      />
    ));

  return (
    <div
      className="w-full flex flex-col relative z-20"
      onMouseEnter={() => pause("hover")}
      onMouseLeave={() => resume("hover")}
      // Só foco de teclado pausa: após fechar com o mouse o foco volta ao gatilho e o loop deve retomar
      onFocus={(e) => {
        if (e.target.matches(":focus-visible")) pause("focus");
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) resume("focus");
      }}
    >
      <div
        className="flex items-center justify-between gap-4 mb-3 text-[11px] sm:text-xs uppercase tracking-[0.2em]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <span className="text-[#58644B] font-semibold">Formação & prática</span>
        <span className="text-[#4B4B44] normal-case tracking-normal text-xs">
          {activeHubId ? "Núcleo aberto" : "Toque em um núcleo para detalhar"}
        </span>
      </div>

      <div
        ref={scrollerRef}
        role="region"
        aria-label="Núcleos de formação e programas aplicados"
        className="w-full overflow-x-auto no-scrollbar touch-pan-x border-y border-[#58644B]/15"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 4%, #000 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 4%, #000 92%, transparent)",
        }}
      >
        <div className="flex w-max">
          <div ref={firstSetRef} className="flex">
            {renderSet(false)}
          </div>
          {/* Cópias suficientes para cobrir loop + largura visível sem travar no fim do scroll */}
          {[0, 1].map((i) => (
            <div key={i} aria-hidden="true" className="flex">
              {renderSet(true)}
            </div>
          ))}
        </div>
      </div>

      {activeHub && <CredentialExpanded hub={activeHub} onClose={handleClose} />}
    </div>
  );
}
