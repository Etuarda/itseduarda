// 03 — Problemas + Projetos
// Camada visível (card) + case completo (diálogo). Identidade visual de cada projeto
// vem do próprio produto (paleta, tipografia, capturas) — ver projectIdentity.ts.

export type ProjectLinks = {
  deploy?: string;
  github?: string;
  backend?: string;
  dashboard?: string;
};

export type Project = {
  slug: "nexo-rj" | "onvagas" | "vendefacil" | "a11y" | "analise-dados";
  name: string;
  /** natureza · ano */
  kind: string;
  context: string;
  problem: string;
  origin?: string;
  solution: string;
  role?: string;
  /** etapas do fluxo/processo, exibidas como trilha */
  flow?: string[];
  proofs?: { value: string; label: string }[];
  stack: string[];
  /** stack curta para a camada visível */
  highlight: string[];
  links: ProjectLinks;
};

export const PROJECTS: Project[] = [
  {
    slug: "nexo-rj",
    name: "Nexo RJ",
    kind: "Adaptive RAG · 2026",
    context: "Residência em IA & RAG · Instituto ECOA / PUC-Rio",
    problem:
      "Como consultar diferentes fontes de contratações públicas e recuperar a informação adequada para cada tipo de pergunta?",
    solution:
      "Adaptive RAG com análise da consulta, recuperação híbrida, filtros, reranking, geração, avaliação e guardrails.",
    role: "Frontend React/TypeScript, integração com backend, histórico, feedback, rastreabilidade, avaliação e observabilidade.",
    flow: ["Query", "Análise", "Retrieval", "RRF", "Rerank", "Geração", "Validação"],
    stack: ["React", "TypeScript", "Python", "FastAPI", "FAISS", "BM25", "RRF", "LLMs"],
    highlight: ["React", "TypeScript", "Python", "FAISS", "BM25", "RRF"],
    links: {
      deploy: "https://etuarda.github.io/frontendRAG/",
      github: "https://github.com/Etuarda/frontendRAG",
      backend: "https://github.com/Diogooliveira10/rag-grande-desafio-grupo04-cenario01",
    },
  },
  {
    slug: "onvagas",
    name: "OnVagas",
    kind: "Produto Full Stack · desde mai/2026",
    context: "Clube de Programação",
    problem:
      "Como reduzir o trabalho repetitivo de adaptar currículo e organizar candidaturas para diferentes vagas?",
    origin: "O projeto nasceu de uma dor real durante a busca pela primeira oportunidade profissional.",
    solution:
      "Perfil profissional centralizado + matching com vagas + currículo personalizado + histórico de candidaturas.",
    stack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma", "JWT", "Zod", "Redis"],
    highlight: ["React", "TypeScript", "Node.js", "PostgreSQL", "Prisma"],
    links: {
      deploy: "https://onvagas.com.br/",
      github: "https://github.com/Etuarda/vagasrepo",
    },
  },
  {
    slug: "vendefacil",
    name: "VendeFácil",
    kind: "IA Generativa / RAG · set/2026",
    context: "Residência em IA & RAG · Instituto ECOA / PUC-Rio",
    problem:
      "Como consultar conhecimento interno sem permitir que o LLM invente respostas ou exponha informações inadequadas?",
    solution: "Recuperação híbrida com FAISS + BM25 + RRF, filtros, grounding e guardrails.",
    proofs: [
      { value: "5.714", label: "chunks" },
      { value: "1.536", label: "dimensões de embedding" },
      { value: "95", label: "testes aprovados" },
    ],
    stack: ["Python", "PostgreSQL", "FAISS", "BM25", "RRF", "Pydantic", "OpenRouter"],
    highlight: ["Python", "FAISS", "BM25", "RRF", "Pydantic"],
    // sem deploy público: nada de botão de deploy
    links: { github: "https://github.com/residencia-ia-rag-puc-time12/mini-desafio-rag-vendefacil" },
  },
  {
    slug: "a11y",
    name: "a11y.io",
    kind: "Engenharia de Requisitos + Acessibilidade · 2025–2026",
    context: "Pesquisa/prática em Acessibilidade Digital · PUCRS",
    problem: "Por que esperar o software ficar pronto para pensar em acessibilidade?",
    solution: "Transformar requisitos em User Stories e critérios de aceite já considerando WCAG 2.2.",
    stack: ["React", "Node.js", "Express", "Clean Architecture", "WCAG 2.2", "BDD"],
    highlight: ["React", "Node.js", "WCAG 2.2", "BDD"],
    links: {
      deploy: "https://a11y-6cvv.onrender.com/",
      github: "https://github.com/Etuarda/a11y",
    },
  },
  {
    slug: "analise-dados",
    name: "Análise de Dados",
    kind: "Dados · ago–nov/2025 · 320h",
    context: "Residência · Instituto ECOA / PUC-Rio",
    problem: "Como transformar dados brutos em informação útil para interpretação e decisão?",
    solution: "Pipeline de análise do dado bruto ao dashboard interpretável.",
    flow: ["Limpeza", "Transformação", "Análise", "Métricas", "Dashboard", "Interpretação"],
    stack: ["Python", "Pandas", "SQL", "ETL", "Matplotlib", "Looker Studio"],
    highlight: ["Python", "Pandas", "SQL", "Looker Studio"],
    links: { dashboard: "https://datastudio.google.com/s/rhrnbLbiyq4" },
  },
];

export type OtherProject = {
  slug: string;
  name: string;
  meta: string;
  links: ProjectLinks;
};

export const OTHER_PROJECTS: OtherProject[] = [
  {
    slug: "planos",
    name: "Sistema de Controle de Planos",
    meta: "Backend · Microsserviços · Node.js · RabbitMQ · Redis · Docker",
    links: { github: "https://github.com/Etuarda/backend" },
  },
  {
    slug: "roadmap",
    name: "Backend Roadmap Planner",
    meta: "Full Stack · React · Node.js · Express · Zod",
    links: { deploy: "https://miniprojetopda4-1.onrender.com/", github: "https://github.com/Etuarda/miniProjetoPda4" },
  },
  {
    slug: "serie-journal",
    name: "Série Journal",
    // repositório é JavaScript (.jsx) + Material UI, conforme a API de linguagens do GitHub
    meta: "Frontend · React · Material UI · Vitest",
    links: { github: "https://github.com/Etuarda/Series-Journal" },
  },
  {
    slug: "lab-ia",
    name: "Laboratório de IA · FDTE/USP",
    meta: "2025–2026 · parte da formação de 360h · ML · NLP · Computer Vision · Deep Learning · RL",
    links: { github: "https://github.com/Etuarda/capacitacao-tecnica-em-IA--FDTE_USP" },
  },
  {
    slug: "caminho-seguro",
    name: "Caminho Seguro",
    meta: "Frontend · Impacto Social",
    links: {
      deploy: "https://etuarda.github.io/mulhersegura/src/html/calculadora.html",
      github: "https://github.com/Etuarda/mulhersegura",
    },
  },
];

export const PROJECTS_COPY = {
  kicker: "Problemas + Projetos",
  title: { lead: "Cada projeto começa por um ", accent: "problema", tail: "." },
  othersTitle: "Outros projetos",
};
