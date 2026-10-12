import React from "react";
import type { InstitutionLogo as Logo } from "./heroData";

/**
 * Logo institucional em PNG transparente, sem moldura.
 * tone="color": cores oficiais (fundo claro). tone="light": monocromático creme,
 * para o painel oliva, onde as cores oficiais perderiam contraste.
 */
export default function InstitutionLogo({
  logo,
  size = "md",
  tone = "color",
  className = "",
  ...rest
}: { logo: Logo; size?: "sm" | "md"; tone?: "color" | "light" } & React.HTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src={logo.src}
      alt={logo.alt}
      decoding="async"
      className={`block w-auto object-contain ${
        size === "sm" ? "h-9 max-w-[11rem]" : "h-10 sm:h-12 lg:h-14 max-w-[14rem]"
      } ${className}`}
      style={tone === "light" ? { filter: "brightness(0) invert(0.96) sepia(0.12)" } : undefined}
      {...rest}
    />
  );
}
