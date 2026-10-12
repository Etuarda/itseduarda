import type { ProjectCategory } from "@/types/portfolio";

// Derivado dos capítulos (src/content/chapters.ts): o menu segue a arquitetura macro 01–06
export const sectionLinks = [
  { id: "sobre", label: "Formação", number: "02" },
  { id: "projetos", label: "Projetos", number: "03" },
  { id: "processo", label: "Processo", number: "04" },
  { id: "trajetoria", label: "Trajetória", number: "05" },
  { id: "contato", label: "Contato", number: "06" },
] as const;

export type SectionId = (typeof sectionLinks)[number]["id"];

export const sectionIds = ["hero", "sobre", "projetos", "processo", "trajetoria", "contato"] as const;

export const projectCategories = [
  { id: "all", label: "Todos" },
  { id: "fullstack", label: "Full Stack" },
  { id: "backend", label: "Back-end" },
  { id: "dados", label: "Dados" },
  { id: "ia", label: "IA" },
] as const;

export type ProjectFilter = (typeof projectCategories)[number]["id"];
