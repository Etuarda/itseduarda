import React from "react";
import laceTop from "@/components/assets/lace-border-top-01.png";
import laceRibbon from "@/components/assets/rendalaco.png";
import laceRibbon2 from "@/components/assets/rendalaco2.png";

const LACES = { medallion: laceTop, ribbon: laceRibbon, ribbon2: laceRibbon2 } as const;

/**
 * Costura de renda entre dois capítulos: ocupa toda a largura da tela, centrada na
 * fronteira (altura zero no fluxo, então não altera o 100svh de nenhum capítulo).
 * A renda desliza com o scroll/cursor (--lace-shift, ver useLaceDrift).
 */
export default function LaceSeam({ variant = "medallion" }: { variant?: keyof typeof LACES }) {
  return (
    <div aria-hidden="true" className="relative h-0 z-30">
      <div
        className="lace-seam absolute left-0 right-0 top-0 -translate-y-1/2 h-[clamp(52px,8vw,104px)] pointer-events-none select-none"
        style={{ backgroundImage: `url(${LACES[variant]})` }}
      />
    </div>
  );
}
