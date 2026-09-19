import type { ProjectCategory } from "@/types/portfolio";

export const sectionLinks = [
  { id: "sobre", label: "Sobre" },
  { id: "stacks", label: "Stacks" },
  { id: "projetos", label: "Projetos" },
  { id: "metodo", label: "Método" },
  { id: "competencias", label: "Competências" },
  { id: "trajetoria", label: "Trajetória" },
  { id: "contato", label: "Contato" },
] as const;

export type SectionId = (typeof sectionLinks)[number]["id"];

export const sectionIds = [
  "hero",
  "sobre",
  "stacks",
  "projetos",
  "metodo",
  "competencias",
  "skills", // retrocompatível
  "trajetoria",
  "experiencia", // retrocompatível
  "contato",
] as const;

export const projectCategories = [
  { id: "all", label: "Todos" },
  { id: "fullstack", label: "Full Stack" },
  { id: "backend", label: "Back-end" },
  { id: "dados", label: "Dados" },
  { id: "ia", label: "IA" },
] as const;

export type ProjectFilter = (typeof projectCategories)[number]["id"];
