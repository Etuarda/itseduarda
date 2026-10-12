import { LOGOS, type InstitutionLogo } from "@/components/sections/hero/heroData";

// 02 — Conexão + Autoridade: provas visuais curtas (instituição · período · carga · especialidades)

export type Credential = {
  institution: string;
  logo?: InstitutionLogo;
  name: string;
  period: string;
  /** carga horária exibida como prova; omitida quando não há valor oficial confirmado */
  hours?: string;
  tags: string[];
};

export type AuthorityAxis = {
  id: "software" | "dados" | "ia";
  label: string;
  credentials: Credential[];
};

export const AUTHORITY = {
  kicker: "Conexão + Autoridade",
  title: { lead: "Conhecimento que virou ", accent: "prática", tail: "." },
  text:
    "Minha trajetória começou no desenvolvimento de software e evoluiu para dados e inteligência artificial. Cada formação adicionou uma nova camada ao modo como analiso problemas e construo soluções.",
  axes: [
    {
      id: "software",
      label: "Software",
      credentials: [
        {
          institution: "PUCRS",
          logo: LOGOS.pucrs,
          name: "ADS · Análise e Desenvolvimento de Sistemas",
          period: "2024–2027 · Em andamento",
          tags: ["Engenharia de Software", "Sistemas Web", "Banco de Dados", "APIs", "Modelagem"],
        },
        {
          institution: "Cubos Academy",
          logo: LOGOS.cubos,
          name: "Desenvolvimento Back-end",
          period: "2023–2024",
          hours: "~600h",
          tags: ["JavaScript", "Node.js", "Express", "REST", "PostgreSQL", "SQL"],
        },
        {
          institution: "Cubos Academy",
          logo: LOGOS.cubos,
          name: "TypeScript Avançado",
          period: "2024",
          hours: "77h",
          tags: ["Tipagem", "Interfaces", "Generics", "DTOs"],
        },
        {
          institution: "Cubos Academy",
          logo: LOGOS.cubos,
          name: "Desenvolvimento Front-end",
          period: "2024–2025",
          hours: "492h",
          tags: ["React", "TypeScript", "Vite", "APIs", "Componentização"],
        },
        {
          institution: "Programadores do Amanhã",
          logo: LOGOS.pda,
          name: "Formação Full Stack",
          period: "2025–jul/2026",
          hours: "720h",
          tags: ["React", "Node.js", "Express", "MySQL", "Squad"],
        },
      ],
    },
    {
      id: "dados",
      label: "Dados",
      credentials: [
        {
          institution: "Instituto ECOA / PUC-Rio",
          logo: LOGOS.ecoa,
          name: "Residência em Análise de Dados",
          period: "ago–nov/2025",
          hours: "320h",
          tags: ["Python", "Pandas", "SQL", "ETL", "Métricas", "Looker Studio"],
        },
      ],
    },
    {
      id: "ia",
      label: "Inteligência Artificial",
      credentials: [
        {
          institution: "FDTE / USP",
          logo: LOGOS.fdte,
          name: "Capacitação Técnica e Empreendedora em IA",
          period: "out/2025–fev/2026",
          hours: "360h",
          tags: ["Machine Learning", "NLP", "Visão Computacional", "Deep Learning", "Reinforcement Learning"],
        },
        {
          institution: "Instituto ECOA / PUC-Rio",
          logo: LOGOS.ecoa,
          name: "Residência em IA & RAG",
          period: "2026–atual",
          hours: "284h",
          tags: ["RAG", "Embeddings", "Recuperação híbrida", "FAISS", "Avaliação", "Guardrails"],
        },
      ],
    },
  ] as AuthorityAxis[],
  /** faixa menor de qualidade e backend */
  extras: [
    { name: "Fundamentos de Teste de Software", meta: "Instituto Eldorado · 2026 · 24h" },
    // instituição a confirmar antes de citar (registros divergem): por isso só a carga
    { name: "Trilha Node.js", meta: "2026 · 110h no total (30h + 50h + 30h)" },
  ],
  closing: "Formação constrói repertório. Projeto é onde esse repertório precisa funcionar.",
};
