import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import heroImg from "@/components/assets/heroperfil.png";
import OrbitalText from "./OrbitalText";
import { prefersReducedMotion } from "./heroGeometry";

/**
 * Estrutura em camadas para separar layout, parallax e coreografia:
 *   portrait (layout, sem transform — usado como âncora geométrica)
 *   ├── [parallax anel ~4px] > [orbit: intro GSAP] > OrbitalText (rotação CSS)
 *   ├── [ring: anel fino]
 *   └── [parallax foto ~2px] > [photo: íris clip-path] > img (escala de lente)
 */
export default function HeroPortrait() {
  const ringLayerRef = useRef<HTMLDivElement | null>(null);
  const photoLayerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    if (!desktop.matches || prefersReducedMotion()) return;
    if (!ringLayerRef.current || !photoLayerRef.current) return;

    const opts = { duration: 1.2, ease: "power3.out" };
    const ringX = gsap.quickTo(ringLayerRef.current, "x", opts);
    const ringY = gsap.quickTo(ringLayerRef.current, "y", opts);
    const photoX = gsap.quickTo(photoLayerRef.current, "x", opts);
    const photoY = gsap.quickTo(photoLayerRef.current, "y", opts);

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      photoX(nx * 2);
      photoY(ny * 2);
      ringX(nx * 4);
      ringY(ny * 4);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      data-hero="portrait"
      // tamanho pela menor dimensão da tela: o Hero inteiro cabe em 100svh
      className="relative flex items-center justify-center select-none w-[min(42vw,21svh)] aspect-square lg:w-[min(30vw,46svh)] shrink-0"
    >
      <div ref={ringLayerRef} className="absolute -inset-[7%]">
        <div className="absolute inset-0">
          <OrbitalText />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-1 rounded-full border border-[#58644B]/20 pointer-events-none"
      />

      <div ref={photoLayerRef} className="relative z-10 w-[78%] aspect-square">
        <div
          className="w-full h-full rounded-full overflow-hidden border-2 border-[#58644B]/35 shadow-[0_12px_36px_-8px_rgba(35,36,31,0.18)] bg-[#F4F1E8]"
        >
          <img
            src={heroImg}
            alt="Retrato de Eduarda Silva Santos sorrindo, com cabelos longos e escuros e blusa clara, em luz natural com folhagens ao fundo"
            width={1122}
            height={1402}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-[center_18%]"
          />
        </div>
      </div>
    </div>
  );
}
