export type HeroVersionId = "standard" | "creative" | "engine";

export type HeroVersion = {
  title: string;
  editionName: string;
  rarity: string;
  badgeText: string;
  badgeColor: string;
  subtitle: string;
  description: string;
  price: string;
  specs: string[];
};

export const heroVersions: Record<HeroVersionId, HeroVersion> = {
  standard: {
    title: "Desenvolvimento Full-Stack",
    editionName: "Foco Principal: Engenharia Web & Core Stacks",
    rarity: "Aplicações de Alta Performance",
    badgeText: "Core Full-Stack",
    badgeColor: "bg-[#E11D48] text-white",
    subtitle: "Construção de aplicações web de ponta a ponta com arquitetura limpa e alta usabilidade.",
    description: "Foco em projetar, codificar e implantar sistemas escaláveis. Combina a especificação de requisitos acessíveis alinhados à WCAG 2.2 com interfaces dinâmicas e reativas em React, tipagem robusta com TypeScript, validações estritas via Zod e persistência de dados estruturada em PostgreSQL.",
    price: "Análise & Dev. de Sistemas (PUCRS)",
    specs: ["React / Vite / TS", "Node.js / Express", "PostgreSQL / Prisma", "Acessibilidade WCAG 2.2"],
  },
  creative: {
    title: "Dados & Inteligência Artificial",
    editionName: "Especialidade: Ciência de Dados & Modelagem Preditiva",
    rarity: "Capacitação USP/FDTE & PUC-Rio",
    badgeText: "Dados & IA",
    badgeColor: "bg-[#064E3B] text-white",
    subtitle: "Processamento analítico, pipelines de ETL e aplicação experimental de modelos inteligentes.",
    description: "Foco em modelagem preditiva e inteligência de negócios. Capacitada no tratamento, saneamento e visualização de volumes de dados complexos com Python (Pandas/Jupyter), criação de relatórios interativos com Looker Studio e implementação prática de regressões, NLP e visão computacional (OpenCV).",
    price: "Formação Técnica em IA (FDTE)",
    specs: ["Python / Pandas / Colab", "Scikit-Learn (ML)", "NLP & Visão (OpenCV)", "Looker Studio / Power BI"],
  },
  engine: {
    title: "Arquitetura Back-End",
    editionName: "Especialidade: APIs Escaláveis & Sistemas Distribuídos",
    rarity: "Modularidade & Fluxos Assíncronos",
    badgeText: "APIs & Microsserviços",
    badgeColor: "bg-[#047857] text-white",
    subtitle: "Concepção de ecossistemas backend resilientes, mensageria e alto rendimento.",
    description: "Foco no design de microsserviços integrados e arquitetura limpa. Preparada para projetar pipelines de faturamento, orquestração de containers com Docker Compose, comunicação assíncrona robusta utilizando RabbitMQ, gerenciamento de filas e cache de baixa latência em Redis.",
    price: "Programadores do Amanhã",
    specs: ["Node.js / TypeScript", "RabbitMQ / Mensageria", "Redis / Cache", "Docker & Compose"],
  },
};
