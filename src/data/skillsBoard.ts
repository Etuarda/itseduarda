export type SkillStatus = "PRODUÇÃO" | "PROJETO" | "PESQUISA" | "EXPLORANDO";
export type SkillColumnId = "frontend" | "backend" | "data" | "ai";

export interface SkillItem {
  id: string;
  code: string;
  name: string;
  columnId: SkillColumnId;
  columnName: string;
  status: SkillStatus;
  shortTag: string;
  description: string;
  usedInProjects: { id: string; name: string }[];
  applications: string[];
}

export interface SkillColumn {
  id: SkillColumnId;
  number: string;
  title: string;
  tagline: string;
  skills: SkillItem[];
}

export const SKILLS_BOARD_COLUMNS: SkillColumn[] = [
  {
    id: "frontend",
    number: "01",
    title: "FRONTEND",
    tagline: "Interfaces Reativas & Acessíveis",
    skills: [
      {
        id: "react",
        code: "01.01",
        name: "React",
        columnId: "frontend",
        columnName: "Frontend",
        status: "PRODUÇÃO",
        shortTag: "SPAS & COMPONENTIZAÇÃO",
        description: "Construção de SPAs de alta fidelidade com hooks modulares, controle atômico de estados e otimização de renderizações.",
        usedInProjects: [
          { id: "onvagas", name: "OnVagas" },
          { id: "vendefacil", name: "VendeFácil" },
          { id: "a11y-io", name: "a11y.io" },
          { id: "roadmap-planner", name: "Roadmap Planner" },
        ],
        applications: [
          "Arquitetura de componentes funcionais com hooks customizados",
          "Gerenciamento de estado previsível com context e stores locais",
          "Interfaces acessíveis compatíveis com leitores de tela",
          "Renderização condicional e tratamento antecipado de loading states",
        ],
      },
      {
        id: "nextjs",
        code: "01.02",
        name: "Next.js",
        columnId: "frontend",
        columnName: "Frontend",
        status: "PROJETO",
        shortTag: "SSR & SERVER COMPONENTS",
        description: "Desenvolvimento com renderização no servidor (SSR), rotas de API integradas e otimização de imagens e Core Web Vitals.",
        usedInProjects: [
          { id: "onvagas", name: "OnVagas (Módulos)" },
          { id: "portfolio", name: "Portfólio Editorial" },
        ],
        applications: [
          "Server-side rendering e geração estática de páginas (SSG)",
          "Otimização de LCP e imagens com next/image",
          "Integração de rotas dinâmicas e middleware de autenticação",
        ],
      },
      {
        id: "typescript",
        code: "01.03",
        name: "TypeScript",
        columnId: "frontend",
        columnName: "Frontend",
        status: "PRODUÇÃO",
        shortTag: "TIPAGEM ESTRITA & CONTRATOS",
        description: "Contratos de dados estritos de ponta a ponta, redução de bugs em tempo de compilação e tipagem compartilhada entre cliente e servidor.",
        usedInProjects: [
          { id: "onvagas", name: "OnVagas" },
          { id: "vendefacil", name: "VendeFácil" },
          { id: "roadmap-planner", name: "Roadmap Planner" },
        ],
        applications: [
          "Modelagem de tipos genéricos (Generics) reutilizáveis",
          "Validação de contratos com esquemas Zod inferidos",
          "Strict mode ativo prevenindo comportamentos nulos inesperados",
        ],
      },
      {
        id: "tailwind",
        code: "01.04",
        name: "Tailwind CSS",
        columnId: "frontend",
        columnName: "Frontend",
        status: "PRODUÇÃO",
        shortTag: "ESTILIZAÇÃO & DESIGN SYSTEM",
        description: "Design systems refinados, responsividade fluida, variantes customizadas e paleta editorial botânica sem classes legadas.",
        usedInProjects: [
          { id: "onvagas", name: "OnVagas" },
          { id: "vendefacil", name: "VendeFácil" },
          { id: "portfolio", name: "Dossiê Editorial" },
        ],
        applications: [
          "Padronização de temas com CSS variables e design tokens",
          "Adaptação responsiva rigorosa para mobile, tablet e desktop",
          "Animações sutis aceleradas por hardware (transform/opacity)",
        ],
      },
      {
        id: "wcag",
        code: "01.05",
        name: "Acessibilidade (WCAG 2.2)",
        columnId: "frontend",
        columnName: "Frontend",
        status: "PESQUISA",
        shortTag: "PESQUISA PUCRS & INCLUSÃO",
        description: "Pesquisa acadêmica e aplicação prática das diretrizes internacionais WCAG 2.2 (níveis A, AA e AAA), leitor de tela e foco visível.",
        usedInProjects: [
          { id: "a11y-io", name: "a11y.io" },
          { id: "pesquisa-puc", name: "Pesquisa PUCRS" },
        ],
        applications: [
          "Navegação completa assistida exclusivamente por teclado",
          "Atributos ARIA semânticos e sem poluição de marcação",
          "Contraste cromático estrito validado por heurísticas",
        ],
      },
      {
        id: "react-router",
        code: "01.06",
        name: "React Router",
        columnId: "frontend",
        columnName: "Frontend",
        status: "PRODUÇÃO",
        shortTag: "ROTEAMENTO & NAVEGAÇÃO SPA",
        description: "Gerenciamento de rotas protegidas por autenticação, loaders de dados e sincronização fluida com a barra de endereços.",
        usedInProjects: [
          { id: "onvagas", name: "OnVagas" },
          { id: "vendefacil", name: "VendeFácil" },
        ],
        applications: [
          "Rotas protegidas com guards de autenticação JWT",
          "Lazy loading de páginas para carregamento instantâneo",
          "Histórico e deep links consistentes",
        ],
      },
    ],
  },
  {
    id: "backend",
    number: "02",
    title: "BACKEND",
    tagline: "APIs Escaláveis & Arquitetura Limpa",
    skills: [
      {
        id: "nodejs",
        code: "02.01",
        name: "Node.js",
        columnId: "backend",
        columnName: "Backend",
        status: "PRODUÇÃO",
        shortTag: "RUN-TIME & EVENT LOOP",
        description: "Construção de microsserviços e APIs assíncronas de alto desempenho, aproveitando o event-loop para processar requisições concorrentes.",
        usedInProjects: [
          { id: "onvagas", name: "OnVagas" },
          { id: "vendefacil", name: "VendeFácil" },
          { id: "controle-planos", name: "Controle de Planos" },
        ],
        applications: [
          "APIs RESTful estruturadas em camadas desacopladas",
          "Tratamento de streams e processamento assíncrono",
          "Gerenciamento de variáveis de ambiente seguras com dotenv",
        ],
      },
      {
        id: "express",
        code: "02.02",
        name: "Express",
        columnId: "backend",
        columnName: "Backend",
        status: "PRODUÇÃO",
        shortTag: "ROTEAMENTO & MIDDLEWARES",
        description: "Framework robusto para estruturação de rotas HTTP, pipelines de middlewares de validação, tratamento de erros e rate limiting.",
        usedInProjects: [
          { id: "onvagas", name: "OnVagas" },
          { id: "vendefacil", name: "VendeFácil" },
          { id: "roadmap-planner", name: "Roadmap Planner" },
        ],
        applications: [
          "Pipelines de middlewares para autenticação e auditoria",
          "Centralização de tratamento de erros com respostas padronizadas",
          "Configuração de CORS restrito e segurança com helmet",
        ],
      },
      {
        id: "fastify",
        code: "02.03",
        name: "Fastify",
        columnId: "backend",
        columnName: "Backend",
        status: "PROJETO",
        shortTag: "ALTA VAZÃO & LOW OVERHEAD",
        description: "Framework moderno com validação de schemas JSON nativa, foco em latência mínima e arquitetura baseada em plugins.",
        usedInProjects: [
          { id: "controle-planos", name: "Controle de Planos (Protótipo)" },
        ],
        applications: [
          "Compilação de schemas para serialização ultrarrápida",
          "Modularização por plugins isolados de domínio",
          "Logging estruturado com Pino",
        ],
      },
      {
        id: "clean-arch",
        code: "02.04",
        name: "Clean Architecture & DDD",
        columnId: "backend",
        columnName: "Backend",
        status: "PRODUÇÃO",
        shortTag: "DESACOPLAMENTO & TESTABILIDADE",
        description: "Separação estrita entre Domain, Use Cases, Repositories e Controllers, tornando o núcleo de negócio imune a mudanças de frameworks.",
        usedInProjects: [
          { id: "vendefacil", name: "VendeFácil" },
          { id: "a11y-io", name: "a11y.io" },
        ],
        applications: [
          "Inversão de dependência através de interfaces de repositório",
          "Casos de uso com responsabilidade única e isolada",
          "Regras de domínio puras sem dependências externas",
        ],
      },
      {
        id: "prisma",
        code: "02.05",
        name: "Prisma ORM",
        columnId: "backend",
        columnName: "Backend",
        status: "PRODUÇÃO",
        shortTag: "ORM TIPADO & MIGRATIONS",
        description: "Modelagem declarativa de schemas relacionais, migrações automáticas versionadas e queries tipadas com validação estrita.",
        usedInProjects: [
          { id: "onvagas", name: "OnVagas" },
          { id: "vendefacil", name: "VendeFácil" },
        ],
        applications: [
          "Transações atômicas para garantia de integridade financeira e de estoque",
          "Consultas relacionais otimizadas sem o problema N+1",
          "Geração de tipos TypeScript automáticos a partir do schema",
        ],
      },
      {
        id: "jwt-zod",
        code: "02.06",
        name: "JWT & Zod",
        columnId: "backend",
        columnName: "Backend",
        status: "PRODUÇÃO",
        shortTag: "AUTENTICAÇÃO & VALIDAÇÃO",
        description: "Controle de sessão sem estado com tokens assinados (HMAC-SHA256) e validação rigorosa de payloads em tempo de execução.",
        usedInProjects: [
          { id: "onvagas", name: "OnVagas" },
          { id: "vendefacil", name: "VendeFácil" },
          { id: "roadmap-planner", name: "Roadmap Planner" },
        ],
        applications: [
          "Sanitização e parsing antecipado de inputs de usuários",
          "Geração e verificação de access tokens com expiração segura",
          "Padronização de respostas de erro com detalhes específicos por campo",
        ],
      },
      {
        id: "rabbitmq",
        code: "02.07",
        name: "RabbitMQ",
        columnId: "backend",
        columnName: "Backend",
        status: "PROJETO",
        shortTag: "MENSAGERIA ASSÍNCRONA",
        description: "Comunicação orientada a eventos entre serviços, desacoplando tarefas pesadas com filas de retry e Dead-Letter Exchange.",
        usedInProjects: [
          { id: "controle-planos", name: "Controle de Planos" },
        ],
        applications: [
          "Garantia de entrega com confirmações manuais de mensagens (ACK)",
          "Isolamento do faturamento financeiro para tolerância total a falhas",
          "Padrão Publish/Subscribe para múltiplos consumidores",
        ],
      },
    ],
  },
  {
    id: "data",
    number: "03",
    title: "DATA",
    tagline: "Engenharia de Dados & Persistência",
    skills: [
      {
        id: "postgresql",
        code: "03.01",
        name: "PostgreSQL",
        columnId: "data",
        columnName: "Data",
        status: "PRODUÇÃO",
        shortTag: "BANCO RELACIONAL ROBUSTO",
        description: "Modelagem relacional normalizada, índices btree estratégicos, integridade referencial com foreign keys e bloqueios de concorrência.",
        usedInProjects: [
          { id: "onvagas", name: "OnVagas" },
          { id: "vendefacil", name: "VendeFácil" },
          { id: "controle-planos", name: "Controle de Planos" },
        ],
        applications: [
          "Modelagem relacional normalizada com integridade estrita",
          "Índices btree em campos de busca frequente para latência < 45ms",
          "Transações com isolamento de leitura e bloqueio moderado",
          "Integração profunda com Prisma ORM e Node.js",
        ],
      },
      {
        id: "redis",
        code: "03.02",
        name: "Redis",
        columnId: "data",
        columnName: "Data",
        status: "PRODUÇÃO",
        shortTag: "CACHE IN-MEMORY & VELOCIDADE",
        description: "Armazenamento chave-valor em memória para atenuação de picos de carga no banco de dados e controle de taxa de requisições.",
        usedInProjects: [
          { id: "onvagas", name: "OnVagas" },
          { id: "vendefacil", name: "VendeFácil" },
        ],
        applications: [
          "Cache de consultas repetidas com expiração TTL calibrada",
          "Rate limiting protegendo rotas críticas contra abuso",
          "Invalidação cirúrgica de cache em mutações de produtos",
        ],
      },
      {
        id: "python",
        code: "03.03",
        name: "Python",
        columnId: "data",
        columnName: "Data",
        status: "PESQUISA",
        shortTag: "CIÊNCIA DE DADOS & SCRIPTS",
        description: "Scripts analíticos, automação de processamento de dados brutos e experimentação com modelos estatísticos e inteligência artificial.",
        usedInProjects: [
          { id: "residencia-dados", name: "Residência PUC-Rio" },
          { id: "capacitacao-ia", name: "Laboratório IA USP" },
        ],
        applications: [
          "Automação de rotinas de higienização de arquivos tabulares",
          "Implementação de pipelines de pré-processamento de machine learning",
          "Integração com ecossistemas científicos (NumPy, Scikit-Learn)",
        ],
      },
      {
        id: "pandas",
        code: "03.04",
        name: "Pandas",
        columnId: "data",
        columnName: "Data",
        status: "PESQUISA",
        shortTag: "ETL & ANÁLISE TABULAR",
        description: "Tratamento de dados tabulares, resolução de inconsistências e valores nulos, agrupamentos dinâmicos e criação de métricas de negócio.",
        usedInProjects: [
          { id: "residencia-dados", name: "Residência PUC-Rio" },
        ],
        applications: [
          "Sanitização completa de bases corporativas dispersas",
          "Transformações e joins complexos em DataFrames",
          "Exportação estruturada para relatórios executivos",
        ],
      },
      {
        id: "sql-avancado",
        code: "03.05",
        name: "SQL Avançado",
        columnId: "data",
        columnName: "Data",
        status: "PRODUÇÃO",
        shortTag: "CONSULTAS & STAR SCHEMA",
        description: "Escrita de queries analíticas com window functions, Common Table Expressions (CTEs), modelagem dimensional e agregação massiva.",
        usedInProjects: [
          { id: "residencia-dados", name: "Residência PUC-Rio" },
          { id: "vendefacil", name: "VendeFácil" },
        ],
        applications: [
          "Criação de métricas agregadas por período e categoria",
          "Otimização de planos de execução de consulta (EXPLAIN ANALYZE)",
          "Modelagem Star Schema para consumo em dashboards de BI",
        ],
      },
      {
        id: "looker-studio",
        code: "03.06",
        name: "Looker Studio",
        columnId: "data",
        columnName: "Data",
        status: "PROJETO",
        shortTag: "BI & DATA STORYTELLING",
        description: "Construção de dashboards executivos interativos, filtros dinâmicos e comunicação visual de métricas estratégicas para tomadores de decisão.",
        usedInProjects: [
          { id: "residencia-dados", name: "Residência PUC-Rio" },
        ],
        applications: [
          "Criação de dashboards dinâmicos para stakeholders do TIC em Trilhas",
          "Storytelling visual traduzindo números brutos em decisões de negócio",
          "Calibração de KPIs corporativos e gráficos intuitivos",
        ],
      },
      {
        id: "docker",
        code: "03.07",
        name: "Docker & Compose",
        columnId: "data",
        columnName: "Data",
        status: "PROJETO",
        shortTag: "CONTEINERIZAÇÃO ISOLADA",
        description: "Configuração de ambientes de desenvolvimento reproduzíveis, orquestrando bancos de dados, mensageria e APIs sem dependências locais.",
        usedInProjects: [
          { id: "controle-planos", name: "Controle de Planos" },
          { id: "onvagas", name: "OnVagas" },
        ],
        applications: [
          "Orquestração de PostgreSQL, Redis e RabbitMQ com Docker Compose",
          "Isolamento de dependências e replicação segura de ambiente",
          "Definição de volumes persistentes e redes virtuais isoladas",
        ],
      },
    ],
  },
  {
    id: "ai",
    number: "04",
    title: "AI & RAG",
    tagline: "IA Generativa & Modelagem Preditiva",
    skills: [
      {
        id: "rag",
        code: "04.01",
        name: "RAG & Orquestração de LLMs",
        columnId: "ai",
        columnName: "AI & RAG",
        status: "PESQUISA",
        shortTag: "BUSCA SEMÂNTICA & CONTEXTO",
        description: "Arquiteturas de Retrieval-Augmented Generation para ancorar respostas de grandes modelos de linguagem em bases documentais reais.",
        usedInProjects: [
          { id: "capacitacao-ia", name: "Laboratório IA USP" },
          { id: "a11y-io", name: "a11y.io" },
        ],
        applications: [
          "Chunking semântico de documentos e especificações técnicas",
          "Recuperação de contexto relevante com busca vetorial",
          "Eliminação de alucinações através de prompts ancorados",
        ],
      },
      {
        id: "faiss",
        code: "04.02",
        name: "FAISS",
        columnId: "ai",
        columnName: "AI & RAG",
        status: "PESQUISA",
        shortTag: "ÍNDICE VETORIAL DE ALTA VAZÃO",
        description: "Indexação e busca ultraveloz de vizinhos mais próximos (k-NN) em espaços vetoriais de alta dimensionalidade em Python.",
        usedInProjects: [
          { id: "capacitacao-ia", name: "Laboratório IA USP" },
        ],
        applications: [
          "Indexação vetorial de representações semânticas de textos",
          "Busca por similaridade de cosseno em tempo sub-milissegundo",
          "Clustering e segmentação de perfis em embeddings densos",
        ],
      },
      {
        id: "embeddings",
        code: "04.03",
        name: "Embeddings Vetoriais",
        columnId: "ai",
        columnName: "AI & RAG",
        status: "PESQUISA",
        shortTag: "REPRESENTAÇÃO SEMÂNTICA",
        description: "Mapeamento de palavras, sentenças e requisitos de software em representações numéricas densas para cálculo de proximidade conceitual.",
        usedInProjects: [
          { id: "capacitacao-ia", name: "Laboratório IA USP" },
          { id: "onvagas", name: "OnVagas (Pesquisa)" },
        ],
        applications: [
          "Cálculo de compatibilidade semântica entre currículos e descrições de vagas",
          "Clusterização de intenções em chatbots e assistentes",
          "Avaliação de similaridade entre critérios de acessibilidade",
        ],
      },
      {
        id: "langchain",
        code: "04.04",
        name: "LangChain",
        columnId: "ai",
        columnName: "AI & RAG",
        status: "EXPLORANDO",
        shortTag: "ENCADEAMENTO & MEMÓRIA",
        description: "Encadeamento de prompts, gerenciamento de histórico de conversação e orquestração de chamadas a ferramentas externas via LLMs.",
        usedInProjects: [
          { id: "capacitacao-ia", name: "Laboratório IA USP" },
        ],
        applications: [
          "Encadeamento sequencial de passos de raciocínio (Chains)",
          "Integração com parsers de saída estruturada em JSON",
          "Memória contextual para diálogos contínuos",
        ],
      },
      {
        id: "agentes-ia",
        code: "04.05",
        name: "Agentes Autônomos de IA",
        columnId: "ai",
        columnName: "AI & RAG",
        status: "PESQUISA",
        shortTag: "REACT & TOOL CALLING",
        description: "Formação pelo Instituto Eldorado & IBM SkillsBuild em agentes inteligentes que planejam ações e usam ferramentas dinamicamente.",
        usedInProjects: [
          { id: "comp_1", name: "Trilha ELAS IBM/Eldorado" },
          { id: "capacitacao-ia", name: "Laboratório IA USP" },
        ],
        applications: [
          "Arquiteturas de raciocínio ReAct (Reason + Act)",
          "Execução segura de chamadas a funções externas (Tool Calling)",
          "Avaliação de planos autônomos e resolução de ambiguidades",
        ],
      },
      {
        id: "scikit-learn",
        code: "04.06",
        name: "Machine Learning (Scikit-Learn)",
        columnId: "ai",
        columnName: "AI & RAG",
        status: "PESQUISA",
        shortTag: "MODELOS PREDITIVOS & CLF",
        description: "Treinamento experimental de modelos supervisionados: regressão logística, árvores de decisão, cálculo de acurácia, precision e recall.",
        usedInProjects: [
          { id: "capacitacao-ia", name: "Laboratório IA USP" },
        ],
        applications: [
          "Classificação preditiva estatística binária e multiclasse",
          "Validação cruzada (k-fold) e prevenção de overfitting",
          "Matriz de confusão e métricas F1-Score",
        ],
      },
      {
        id: "openrouter",
        code: "04.07",
        name: "OpenRouter & Multi-LLM",
        columnId: "ai",
        columnName: "AI & RAG",
        status: "PROJETO",
        shortTag: "GATEWAY UNIFICADO DE IA",
        description: "Integração flexível com múltiplos modelos de linguagem (Claude, Gemini, GPT) através de um gateway único com fallback de segurança.",
        usedInProjects: [
          { id: "a11y-io", name: "a11y.io" },
        ],
        applications: [
          "Roteamento de modelos por complexidade e custo da requisição",
          "Fallbacks automáticos quando um provedor atinge rate limit",
          "Monitoramento de consumo e latência de inferência",
        ],
      },
      {
        id: "bm25",
        code: "04.08",
        name: "BM25 & Busca Híbrida",
        columnId: "ai",
        columnName: "AI & RAG",
        status: "EXPLORANDO",
        shortTag: "RECUPERAÇÃO LÉXICA + VETORIAL",
        description: "Algoritmo de relevância de termos clássico combinado com vetores densos para busca híbrida com máxima precisão de palavras-chave exatas.",
        usedInProjects: [
          { id: "capacitacao-ia", name: "Laboratório IA USP" },
        ],
        applications: [
          "Recuperação léxica ponderada por frequência inversa (TF-IDF)",
          "Fusão de ranking recíproco (RRF) combinando vetores e BM25",
          "Alta precisão para siglas e termos técnicos raros",
        ],
      },
    ],
  },
];

export interface PresetStack {
  name: string;
  badge: string;
  tagline: string;
  frontendId: string;
  backendId: string;
  dataId: string;
  aiId?: string;
  relatedProjectName: string;
  relatedProjectId: string;
}

export const PRESET_STACKS: PresetStack[] = [
  {
    name: "Stack OnVagas (SaaS de Alta Performance)",
    badge: "SaaS em Produção",
    tagline: "SPAs reativas com API REST distribuída, cache em memória e banco relacional de baixa latência.",
    frontendId: "react",
    backendId: "nodejs",
    dataId: "postgresql",
    aiId: "embeddings",
    relatedProjectName: "OnVagas",
    relatedProjectId: "onvagas",
  },
  {
    name: "Stack VendeFácil (Clean Architecture)",
    badge: "E-Commerce & DDD",
    tagline: "Desacoplamento puro de casos de uso com transações atômicas de estoque no banco relacional.",
    frontendId: "typescript",
    backendId: "clean-arch",
    dataId: "postgresql",
    relatedProjectName: "VendeFácil",
    relatedProjectId: "vendefacil",
  },
  {
    name: "Stack Controle de Planos (Microsserviços)",
    badge: "Event-Driven & Docker",
    tagline: "Comunicação assíncrona orientada a eventos para tolerância total a falhas em faturamento.",
    frontendId: "react",
    backendId: "rabbitmq",
    dataId: "docker",
    relatedProjectName: "Controle de Planos",
    relatedProjectId: "controle-planos",
  },
  {
    name: "Stack a11y.io (IA & Acessibilidade)",
    badge: "Engenharia de Requisitos",
    tagline: "Tradução de diretrizes WCAG 2.2 em cenários BDD prontos para testes com IA Generativa.",
    frontendId: "wcag",
    backendId: "clean-arch",
    dataId: "postgresql",
    aiId: "rag",
    relatedProjectName: "a11y.io",
    relatedProjectId: "a11y-io",
  },
  {
    name: "Stack Inteligência Artificial FDTE/USP",
    badge: "Machine Learning & RAG",
    tagline: "Pipelines preditivos, busca vetorial em alta dimensionalidade e agentes autônomos de IA.",
    frontendId: "react",
    backendId: "nodejs",
    dataId: "python",
    aiId: "rag",
    relatedProjectName: "Laboratório IA USP",
    relatedProjectId: "capacitacao-ia",
  },
];

