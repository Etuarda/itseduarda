import type { Project } from "./portfolioProjects";
import nexoDesktop from "@/components/assets/projects/nexo-rj-desktop.webp";
import nexoMobile from "@/components/assets/projects/nexo-rj-mobile.webp";
import nexoLogo from "@/components/assets/projects/nexo-rj-logo.png";
import onvagasDesktop from "@/components/assets/projects/onvagas-desktop.webp";
import onvagasMobile from "@/components/assets/projects/onvagas-mobile.webp";
import a11yDesktop from "@/components/assets/projects/a11y-desktop.webp";
import a11yMobile from "@/components/assets/projects/a11y-mobile.webp";
import dadosCover from "@/components/assets/projects/analise-dados-cover.webp";
import roadmapDesktop from "@/components/assets/projects/roadmap-desktop.webp";
import roadmapMobile from "@/components/assets/projects/roadmap-mobile.webp";
import caminhoDesktop from "@/components/assets/projects/caminho-seguro-desktop.webp";
import caminhoMobile from "@/components/assets/projects/caminho-seguro-mobile.webp";

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

export const PROJECT_IDENTITY: Record<Project["slug"], ProjectIdentity> = {
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
  // Repositório privado e sem deploy: identidade não verificável.
  // Usa a tinta do portfólio para não inventar uma marca.
  vendefacil: { bg: "#23241F", surface: "#2F3029", ink: "#F5F2E9", accent: "#C9B3E6" },
  // /assets/css/styles.css — mesmos tokens tinta/papel do OnVagas
  a11y: {
    bg: "#F7F5F2",
    surface: "#FFFFFF",
    ink: "#12100E",
    accent: "#6B645E",
    font: "'Instrument Serif', Georgia, serif",
    desktop: a11yDesktop,
    mobile: a11yMobile,
  },
  // capa do relatório Looker/Data Studio (as páginas de gráficos estão com erro de dataset)
  "analise-dados": { bg: "#000000", surface: "#171717", ink: "#FFFFFF", accent: "#0233FF", desktop: dadosCover },
};


/** Projetos compactos: mesma regra — identidade do produto quando ela existe. */
export const OTHER_IDENTITY: Record<string, ProjectIdentity> = {
  // backend puro, sem interface: neutro do portfólio
  planos: { bg: "#23241F", surface: "#2F3029", ink: "#F5F2E9", accent: "#B5C29C" },
  // App.tsx (Tailwind): marrons + Playfair Display
  roadmap: {
    bg: "#FAF8F6",
    surface: "#FFFCF9",
    ink: "#3E2723",
    accent: "#5D4037",
    font: "'Playfair Display', Georgia, serif",
    desktop: roadmapDesktop,
    mobile: roadmapMobile,
  },
  // src/theme.js (MUI dark): vermelho cinema + dourado
  "serie-journal": { bg: "#1A0505", surface: "#2D0A0A", ink: "#FDFBF7", accent: "#E50914" },
  // notebooks: neutro do portfólio
  "lab-ia": { bg: "#EDE4CF", surface: "#F5EEDD", ink: "#23241F", accent: "#44503A" },
  // global.css: rosas; abre como calculadora disfarçada
  "caminho-seguro": { bg: "#FADADD", surface: "#FFF5F8", ink: "#333333", accent: "#E59AB2", desktop: caminhoDesktop, mobile: caminhoMobile },
};
