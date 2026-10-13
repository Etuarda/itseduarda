import type { OtherSlug, ProjectSlug } from "./portfolioProjects";
import nexoDesktop from "@/components/assets/projects/nexo-rj-desktop.webp";
import nexoMobile from "@/components/assets/projects/nexo-rj-mobile.webp";
import nexoLogo from "@/components/assets/projects/nexo-rj-logo.png";
import onvagasDesktop from "@/components/assets/projects/onvagas-desktop.webp";
import onvagasMobile from "@/components/assets/projects/onvagas-mobile.webp";
import a11yDesktop from "@/components/assets/projects/a11y-desktop.webp";
import a11yMobile from "@/components/assets/projects/a11y-mobile.webp";
import dadosCover from "@/components/assets/projects/analise-dados-cover.webp";
import vemariDesktop from "@/components/assets/projects/vemari-desktop.webp";
import vemariMobile from "@/components/assets/projects/vemari-mobile.webp";

// Identidade visual real de cada projeto, levantada do próprio produto em 2026-10-12:
// paleta das variáveis CSS do deploy, tipografia computada e capturas reais.

export type ProjectIdentity = {
  bg: string;
  surface: string;
  ink: string;
  accent: string;
  /** fonte de títulos do próprio produto (fallback: serif editorial do portfólio) */
  font?: string;
  desktop?: string;
  mobile?: string;
  logo?: string;
};

export const PROJECT_IDENTITY: Record<ProjectSlug, ProjectIdentity> = {
  // :root do bundle publicado — marfim + dourado, Inter
  "nexo-rj": {
    bg: "#F7F5EF",
    surface: "#FBFAF6",
    ink: "#252525",
    accent: "#D6B84D",
    font: "Inter, system-ui, sans-serif",
    desktop: nexoDesktop,
    mobile: nexoMobile,
    logo: nexoLogo,
  },
  // backend puro, sem interface: composição tipográfica no neutro do portfólio.
  // (project-plans-system-cover.png não é usado: é uma colagem ilustrativa com telas
  // e métricas que o projeto não tem.)
  planos: { bg: "#23241F", surface: "#2F3029", ink: "#F5F2E9", accent: "#B5C29C" },
  // /assets/css/styles.css — tokens tinta/papel, Instrument Serif
  a11y: {
    bg: "#F7F5F2",
    surface: "#FFFFFF",
    ink: "#12100E",
    accent: "#6B645E",
    font: "'Instrument Serif', Georgia, serif",
    desktop: a11yDesktop,
    mobile: a11yMobile,
  },
  // :root do site — papel + tinta, Instrument Serif (wordmark em itálico)
  onvagas: {
    bg: "#F7F5F2",
    surface: "#FFFFFF",
    ink: "#12100E",
    accent: "#064F9E",
    font: "'Instrument Serif', Georgia, serif",
    desktop: onvagasDesktop,
    mobile: onvagasMobile,
  },
  // capturas do deploy (GitHub Pages): areia + azul-marinho + dourado
  vemari: {
    bg: "#F7F2E8",
    surface: "#FFFFFF",
    ink: "#273147",
    accent: "#C99A3E",
    desktop: vemariDesktop,
    mobile: vemariMobile,
  },
  // capa do relatório Looker/Data Studio
  "analise-dados": { bg: "#000000", surface: "#171717", ink: "#FFFFFF", accent: "#0233FF", desktop: dadosCover },
};

/** Projetos compactos: só a cor de destaque do produto (o card continua compacto). */
export const OTHER_IDENTITY: Record<OtherSlug, Pick<ProjectIdentity, "accent">> = {
  // sem identidade levantada do produto: tons do próprio portfólio (oliva / lilás-tinta)
  "arquivo-literario": { accent: "#44503A" },
  healthhub: { accent: "#3E2A6B" },
  // App.tsx (Tailwind): marrons
  roadmap: { accent: "#5D4037" },
  // src/theme.js (MUI dark): vermelho cinema
  "series-journal": { accent: "#E50914" },
  "laboratorio-rag": { accent: "#44503A" },
  "chatbot-pln": { accent: "#3E2A6B" },
  "classificacao-tumores": { accent: "#44503A" },
  // global.css: rosas
  "caminho-seguro": { accent: "#E59AB2" },
  "pokemon-card-battle": { accent: "#3E2A6B" },
};
