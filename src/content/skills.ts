import type { Domain, SkillItem } from "@/types/content";

export type DomainMetadata = {
  id: Domain;
  title: string;
  tagline: string;
  number: string;
  description: string;
};

export const domainsMetadata: Record<Domain, DomainMetadata> = {
  backend: {
    id: "backend",
    title: "Back-end & Arquitetura",
    tagline: "Eixo Principal: APIs, Microsserviços e Persistência",
    number: "01",
    description: "Design de APIs resilientes, desacoplamento com Clean Architecture, mensageria assíncrona e modelagem relacional.",
  },
  frontend: {
    id: "frontend",
    title: "Front-end & Acessibilidade",
    tagline: "Interfaces Claras, Reativas e Inclusivas",
    number: "02",
    description: "Componentização modular em React e TypeScript, conformidade estrita com a WCAG 2.2 e interfaces contemporâneas.",
  },
  data: {
    id: "data",
    title: "Dados & Inteligência",
    tagline: "Pipelines de ETL e Informação para Decisão",
    number: "03",
    description: "Higienização e saneamento com Python e Pandas, consultas analíticas estruturadas em SQL e visualização executiva.",
  },
  ai: {
    id: "ai",
    title: "IA Generativa & RAG",
    tagline: "Recuperação Híbrida, Contexto e Guardrails",
    number: "04",
    description: "Pipelines RAG ancorados em evidências, recuperação vetorial e lexical balanceada por RRF e esquemas estritos com Pydantic.",
  },
};

export const skillsContent: SkillItem[] = [
  // BACKEND
  {
    id: "nodejs",
    label: "Node.js & Express",
    domain: "backend",
    projectIds: ["onvagas", "controle-planos", "a11y-io", "roadmap-planner"],
    context: "Serviços e APIs REST com injeção de dependências e tratamento consistente de erros.",
    status: "verified",
  },
  {
    id: "typescript-backend",
    label: "TypeScript (Back-end)",
    domain: "backend",
    projectIds: ["onvagas", "controle-planos", "roadmap-planner"],
    context: "Contratos de dados rígidos, tipos genéricos e integração segura com bancos e brokers.",
    status: "verified",
  },
  {
    id: "postgresql",
    label: "PostgreSQL & Prisma",
    domain: "backend",
    projectIds: ["onvagas", "controle-planos"],
    context: "Modelagem relacional normalizada, migrações determinísticas e integridade referencial.",
    status: "verified",
  },
  {
    id: "clean-architecture",
    label: "Clean Architecture & SOLID",
    domain: "backend",
    projectIds: ["onvagas", "controle-planos", "a11y-io"],
    context: "Isolamento rigoroso de regras de negócio em Domain, Use Cases e Repositórios independentes.",
    status: "verified",
  },
  {
    id: "rabbitmq",
    label: "RabbitMQ & Mensageria",
    domain: "backend",
    projectIds: ["controle-planos"],
    context: "Filas assíncronas, dead-letter exchanges (DLX) e processamento resiliente de faturamento.",
    status: "verified",
  },
  {
    id: "redis",
    label: "Redis Cache",
    domain: "backend",
    projectIds: ["onvagas", "controle-planos"],
    context: "Estratégia de cache em memória para endpoints de alta frequência e sessões distribuídas.",
    status: "verified",
  },
  {
    id: "docker",
    label: "Docker & Compose",
    domain: "backend",
    projectIds: ["controle-planos"],
    context: "Padronização de contêineres para microsserviços, bancos e message brokers.",
    status: "verified",
  },
  {
    id: "zod-backend",
    label: "Zod & Validação de Contratos",
    domain: "backend",
    projectIds: ["onvagas", "roadmap-planner"],
    context: "Validação rigorosa de esquemas de entrada e saída na borda da aplicação.",
    status: "verified",
  },

  // FRONTEND
  {
    id: "react",
    label: "React 19 & Next.js",
    domain: "frontend",
    projectIds: ["onvagas", "a11y-io", "roadmap-planner"],
    context: "Componentes modulares com estados previsíveis, hooks especializados e rendering eficiente.",
    status: "verified",
  },
  {
    id: "typescript-frontend",
    label: "TypeScript (Front-end)",
    domain: "frontend",
    projectIds: ["onvagas", "roadmap-planner"],
    context: "Tipagem estrita de props, eventos e sincronização de contratos de API com o cliente.",
    status: "verified",
  },
  {
    id: "wcag",
    label: "Acessibilidade (WCAG 2.2)",
    domain: "frontend",
    projectIds: ["a11y-io", "onvagas"],
    context: "Navegação completa por teclado, contrastes AA/AAA, ARIA attributes e leitores de tela.",
    status: "verified",
  },
  {
    id: "tailwind",
    label: "Tailwind CSS & Design Tokens",
    domain: "frontend",
    projectIds: ["onvagas", "roadmap-planner"],
    context: "Composições editoriais fluidas com design tokens semânticos e sem poluição de estilos.",
    status: "verified",
  },

  // DADOS
  {
    id: "python-data",
    label: "Python & Pandas",
    domain: "data",
    projectIds: ["residencia-dados", "vendefacil", "capacitacao-ia"],
    context: "Saneamento de bases inconsistentes, transformação, pipelines de ETL e agrupamentos analíticos.",
    status: "verified",
  },
  {
    id: "sql-analitico",
    label: "SQL Analítico",
    domain: "data",
    projectIds: ["residencia-dados", "onvagas"],
    context: "Consultas analíticas complexas com joins, agregações e extração de métricas de negócio.",
    status: "verified",
  },
  {
    id: "looker-studio",
    label: "Looker Studio & Storytelling",
    domain: "data",
    projectIds: ["residencia-dados"],
    context: "Apresentação visual de indicadores e storytelling de dados conectado a decisões executivas.",
    status: "verified",
  },

  // IA & RAG
  {
    id: "rag-hibrido",
    label: "RAG & Recuperação Híbrida",
    domain: "ai",
    projectIds: ["vendefacil"],
    context: "Combinação de busca vetorial densa (FAISS) e lexical esparsa (BM25) fusionadas por RRF.",
    status: "verified",
  },
  {
    id: "guardrails",
    label: "Guardrails & Avaliação de IA",
    domain: "ai",
    projectIds: ["vendefacil"],
    context: "Contenção determinística de alucinações e suite de 95 testes automatizados.",
    status: "verified",
  },
  {
    id: "pydantic",
    label: "Pydantic & Esquemas Estruturados",
    domain: "ai",
    projectIds: ["vendefacil"],
    context: "Contratos rígidos de dados para respostas de LLMs, garantindo validação em tempo de execução.",
    status: "verified",
  },
  {
    id: "scikit-learn",
    label: "Scikit-Learn & Machine Learning",
    domain: "ai",
    projectIds: ["capacitacao-ia"],
    context: "Classificação, regressão, engenharia de atributos e métricas de desempenho supervisionadas.",
    status: "verified",
  },
];
