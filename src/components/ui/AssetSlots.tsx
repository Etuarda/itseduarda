import React from "react";

// Assets de Renda
import laceFrameImg from "@/components/assets/lace-frame-portrait-4x5.png";
import laceTopBorderImg from "@/components/assets/lace-border-top-01.png";
import laceBottomBorderImg from "@/components/assets/lace-border-bottom-01.png";
import laceBowRibbonImg from "@/components/assets/rendalaco.png";
import laceBowRibbon2Img from "@/components/assets/rendalaco2.png";
import laceOrganicEdgeImg from "@/components/assets/lace-organic-edge-01.png";

// Assets Botânicos em Aquarela
import botanicalBranchLongImg from "@/components/assets/botanical-branch-long-01.png";
import botanicalCornerLargeImg from "@/components/assets/botanical-corner-large-01.png";
import botanicalFlowersMauveImg from "@/components/assets/botanical-flowers-mauve-01.png";
import botanicalFlowersIvoryImg from "@/components/assets/botanical-flowers-ivory-01.png";

/**
 * Moldura de Renda Ornamental para Retratos
 * Regra obrigatória: a foto fica POR CIMA da moldura (z-10 sobre z-0),
 * permitindo que a renda forme uma borda rendada que surge por trás do retrato.
 */
export function LaceFrameAsset({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Moldura de Renda atrás (z-0) */}
      <div
        aria-hidden="true"
        className="absolute -inset-3 sm:-inset-5 md:-inset-7 pointer-events-none select-none z-0 overflow-visible"
      >
        <img
          src={laceFrameImg}
          alt=""
          loading="lazy"
          className="w-full h-full object-fill opacity-90 drop-shadow-[0_4px_16px_rgba(42,54,20,0.12)]"
        />
      </div>

      {/* Conteúdo / Foto sobreposta (z-10) */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/**
 * Barra de Renda para Costura e Composição Entre Seções
 */
export function LaceBorderAsset({
  variant = "top",
  className = "",
}: {
  variant?: "top" | "bottom" | "bow" | "bow-alt" | "organic";
  className?: string;
}) {
  const images = {
    top: laceTopBorderImg,
    bottom: laceBottomBorderImg,
    bow: laceBowRibbonImg,
    "bow-alt": laceBowRibbon2Img,
    organic: laceOrganicEdgeImg,
  };

  const selectedImg = images[variant];

  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden select-none pointer-events-none flex items-center justify-center ${className}`}
    >
      <img
        src={selectedImg}
        alt=""
        loading="lazy"
        className="max-w-full h-auto object-contain opacity-85"
      />
    </div>
  );
}

/**
 * Elemento Botânico em Aquarela para Acidentes Geográficos e Transições
 */
export function BotanicalFlourishAsset({
  variant = "branch-long",
  className = "",
}: {
  variant?: "branch-long" | "corner-large" | "flowers-mauve" | "flowers-ivory";
  className?: string;
}) {
  const botanicals = {
    "branch-long": botanicalBranchLongImg,
    "corner-large": botanicalCornerLargeImg,
    "flowers-mauve": botanicalFlowersMauveImg,
    "flowers-ivory": botanicalFlowersIvoryImg,
  };

  const selectedImg = botanicals[variant];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-visible ${className}`}
    >
      <img
        src={selectedImg}
        alt=""
        loading="lazy"
        className="w-full h-full object-contain drop-shadow-[0_6px_20px_rgba(30,39,19,0.08)]"
      />
    </div>
  );
}

/**
 * Passe-partout e Moldura Editorial com Borda Fina de 1px
 */
export function PhotoFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative p-2 sm:p-2.5 bg-white border border-[#465B20]/25 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
