// Recuperado do build de 2026-10-12 (dist/) após sobrescrita acidental do original.
// Conteúdo e ordem idênticos ao bundle; formatação e nomes das imagens reconstruídos.
import type { ProjectCase } from "@/types/content";
import onvagasCover from "@/components/assets/project-onvagas-cover.png";
import plansCover from "@/components/assets/project-plans-system-cover.png";
import vendefacilCover from "@/components/assets/project-vendefacil-cover.png";
import a11yCover from "@/components/assets/project-a11y-cover.png";

export const projectsContent: ProjectCase[] = [
  {
    id: "onvagas",
    title: "OnVagas",
    subtitle: "SaaS Full Stack • Produto & Matching",
    category: ["backend", "frontend"],
    categoryLabel: "FULL STACK • SAAS & PRODUTO",
    headline: "Organizar candidaturas sem transformar o processo em mais uma tarefa manual.",
    problem:
      "Candidatos perdem tempo organizando dados dispersos entre dezenas de plataformas, sem clareza sobre aderência real às vagas.",
    role: "Idealizadora e Desenvolvedora Full Stack",
    decisions: [
      "Lógica de matching multicritério auditável antes de qualquer dependência probabilística",
      "Modelagem relacional em PostgreSQL normalizada com Prisma ORM",
      "Contratos de dados compartilhados com Zod entre cliente e servidor",
      "Cache de alta frequência em Redis para otimização de latência",
    ],
    technologies: [
      "React 19",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Zod",
      "JWT",
    ],
    techIds: [
      "react",
      "typescript-frontend",
      "nodejs",
      "typescript-backend",
      "postgresql",
      "redis",
      "zod-backend",
      "wcag",
    ],
    evidence: [
      "Fluxo de triagem e matching determinístico auditável",
      "Tempo médio de resposta de consultas abaixo de 45ms",
      "Validação ponta a ponta com esquemas Zod compartilhados",
    ],
    coverImage: onvagasCover,
    features: [
      "Centralização de perfil profissional, vagas e histórico em um único fluxo",
      "Lógica de matching comparando requisitos de forma estruturada e transparente",
      "Validação rigorosa no cliente e servidor com esquemas Zod",
      "Persistência relacional em PostgreSQL gerenciada via Prisma ORM",
      "Cache de alta frequência em Redis para otimizar tempo de resposta",
    ],
    links: {
      demo: "https://onvagas.com.br/",
      github: "https://github.com/Etuarda/vagasrepo",
      caseStudy: "#case-onvagas",
    },
    featured: true,
    status: "verified",
    caseStudy: {
      situation:
        "Quem procura emprego precisa interpretar requisitos, comparar vagas, adaptar informações e acompanhar processos em dezenas de plataformas.",
      context:
        "Informações profissionais ficam dispersas entre arquivos, plataformas de vagas e anotações informais, gerando esforço repetitivo a cada candidatura.",
      problem:
        "A falta de centralização e de clareza sobre requisitos reais dificulta a priorização de onde vale realmente investir tempo.",
      implication:
        "O esforço operacional aumenta, mas a assertividade nas candidaturas continua baixa.",
      solution:
        "O OnVagas unifica perfil profissional, vagas e histórico em um único fluxo, com matching estruturado que avalia aderência de requisitos antes de delegar a automações.",
      technicalDecision:
        "Construir o motor de recomendação com regras auditáveis e explícitas em vez de transformá-lo em uma caixa-preta opaca.",
      evidence:
        "Tempo de resposta em consultas otimizado abaixo de 45ms com cache Redis e persistência relacional normalizada.",
      learning:
        "Sistemas de recomendação devem começar com regras determinísticas auditáveis antes de delegar decisões a modelos probabilísticos.",
      architecture: [
        "Camada de Domínio isolada de frameworks externos",
        "PostgreSQL com modelagem relacional estrita e Prisma ORM",
        "Validação de contratos com Zod compartilhada entre cliente e servidor",
        "Autenticação segura via JWT com invalidação controlada no Redis",
      ],
      metrics: "Resposta de consultas < 45ms e validação estrita de 100% das entradas de dados.",
    },
  },
  {
    id: "controle-planos",
    title: "Sistema de Controle de Planos",
    subtitle: "Back-end • Microsserviços & Mensageria",
    category: ["backend"],
    categoryLabel: "BACK-END • ARQUITETURA DISTRIBUÍDA",
    headline: "Sistemas desacoplados para responsabilidades que precisam evoluir separadamente.",
    problem:
      "Operações de planos e faturamento acopladas geram falhas em cascata que paralisam a gestão cadastral.",
    role: "Engenheira de Back-end & Arquiteta do Sistema",
    decisions: [
      "Isolamento entre serviço cadastral e serviço financeiro com comunicação assíncrona",
      "RabbitMQ com tópicos dedicados, retentativas e Dead-Letter Exchange (DLX)",
      "Cache estratégico no Redis para rotas de consulta de planos de alta concorrência",
      "Orquestração completa de contêineres e broker com Docker Compose",
    ],
    technologies: [
      "Node.js",
      "TypeScript",
      "RabbitMQ",
      "Redis",
      "PostgreSQL",
      "Docker",
      "Clean Architecture",
    ],
    techIds: [
      "nodejs",
      "typescript-backend",
      "clean-architecture",
      "rabbitmq",
      "redis",
      "postgresql",
      "docker",
    ],
    evidence: [
      "Isolamento comprovado: falhas simuladas no gateway de pagamento não afetam o serviço de planos",
      "Filas de retry com DLX garantindo recuperação sem perda de mensagens financeiras",
      "Ambiente de teste e produção determinístico via Docker Compose",
    ],
    coverImage: plansCover,
    features: [
      "Arquitetura distribuída com serviços desacoplados orquestrados com Docker Compose",
      "Mensageria assíncrona com RabbitMQ incluindo filas de retry e Dead-Letter Exchange",
      "Cache estratégico no Redis para rotas de consulta de alta frequência",
      "API Gateway centralizando rotas, logs de requisições e rate limiting",
    ],
    links: {
      github: "https://github.com/Etuarda/backend",
      caseStudy: "#case-controle-planos",
    },
    featured: true,
    status: "verified",
    caseStudy: {
      situation:
        "Em plataformas corporativas, fluxos de assinatura, cobrança e planos reúnem responsabilidades críticas que não podem falhar juntas.",
      context:
        "Um monolito com dependências diretas expõe a operação a falhas em cascata: uma lentidão no parceiro de pagamento bloqueia a navegação do usuário.",
      problem:
        "Operações que deveriam ser independentes compartilham o mesmo ciclo de vida e concorrência de banco.",
      implication:
        "A estabilidade operacional fica fragilizada e a evolução de novas regras de cobrança se torna arriscada.",
      solution:
        "Estruturação de microsserviços desacoplados comunicando-se por eventos assíncronos no RabbitMQ, com cache Redis e persistência isolada.",
      technicalDecision:
        "Desacoplar eventos assíncronos de faturamento do ciclo síncrono da API consumida pelo cliente.",
      evidence:
        "100% de isolamento em testes de estresse: faturamento assíncrono processado sem travamento da API de clientes.",
      learning:
        "Microsserviços não são uma meta estética. São uma ferramenta para controlar dependências quando o domínio exige separação operacional.",
      architecture: [
        "Produtores e consumidores independentes em Node.js e TypeScript",
        "Broker RabbitMQ orquestrando eventos com Dead-Letter Exchange",
        "Persistência isolada por serviço no PostgreSQL",
        "Docker Compose padronizando ambiente com broker, bancos e serviços",
      ],
      metrics: "Isolamento completo de falhas entre mensageria e rotas de consulta.",
    },
  },
  {
    id: "vendefacil",
    title: "VendeFácil",
    subtitle: "IA Generativa • RAG & Recuperação Híbrida",
    category: ["ai", "backend", "data"],
    categoryLabel: "IA GENERATIVA • RAG ANCORADO EM EVIDÊNCIAS",
    headline: "Como fazer uma IA responder com base em evidências, e não apenas em probabilidade?",
    problem:
      "LLMs geram respostas convincentes mas alucinadas quando não possuem ancoragem determinística nos dados corporativos.",
    role: "Engenheira de IA & Desenvolvedora do Pipeline",
    decisions: [
      "Recuperação híbrida unindo busca vetorial densa (FAISS) e lexical esparsa (BM25)",
      "Reciprocal Rank Fusion (RRF) balanceando correspondência de termos exatos e proximidade semântica",
      "Filtros determinísticos por metadados antes de qualquer passagem de contexto ao modelo",
      "Validação rígida de esquemas com Pydantic e suite de 95 testes automatizados",
    ],
    technologies: [
      "Python",
      "FAISS",
      "BM25",
      "RRF",
      "Pydantic",
      "Embeddings",
      "OpenAI API",
      "Guardrails",
    ],
    techIds: ["rag-hibrido", "guardrails", "pydantic", "python-data"],
    evidence: [
      "95 testes unitários e de integração aprovados na suite de recuperação",
      "5.714 chunks indexados com embeddings e metadados estruturados",
      "Guardrails que rejeitam consultas fora do escopo corporativo",
    ],
    coverImage: vendefacilCover,
    features: [
      "Recuperação híbrida unindo busca vetorial densa (FAISS) e busca lexical esparsa (BM25)",
      "Fusão e reclassificação de relevância com Reciprocal Rank Fusion (RRF)",
      "Filtros de escopo por metadados e validação estrita de esquemas com Pydantic",
      "Guardrails ativos para contenção de consultas fora de domínio ou sensíveis",
      "Suite de 95 testes automatizados cobrindo qualidade de recuperação e contenção de alucinações",
    ],
    links: {
      github: "https://github.com/Etuarda/vendefacil",
      caseStudy: "#case-vendefacil",
    },
    featured: true,
    status: "verified",
    caseStudy: {
      situation:
        "A equipe de vendas precisava consultar políticas comerciais, contratos e catálogos complexos com agilidade e precisão sem margem para erro.",
      context:
        "Enviar perguntas diretamente a um modelo de linguagem pode induzir alucinações perigosas em termos de preços e condições comerciais.",
      problem:
        "Respostas plausíveis, porém incorretas, destroem a confiança operacional e criam passivos comerciais.",
      implication:
        "Sem rastreabilidade e fontes comprovadas, nenhuma inteligência artificial pode ser colocada em ambiente de produção sensível.",
      solution:
        "Desenvolvimento de pipeline RAG com recuperação híbrida (FAISS + BM25), fusão RRF, filtros de escopo determinísticos e esquemas Pydantic.",
      technicalDecision:
        "Separar recuperação semântica de validação determinística: o modelo só sintetiza o que foi previamente validado e recuperado.",
      evidence:
        "95 testes automatizados cobrindo exatidão de recuperação, filtros de metadados e guardrails de segurança.",
      learning:
        "Um LLM nunca deve receber responsabilidades que possam ser resolvidas por regras determinísticas e validáveis.",
      architecture: [
        "Ingestão e chunking semântico com indexação combinada em FAISS + BM25",
        "Reciprocal Rank Fusion (RRF) calibrado para balancear termos exatos e proximidade semântica",
        "Filtros determinísticos por metadados antes da sintetização",
        "Pydantic para estruturação rígida de saída e guardrails de segurança",
      ],
      metrics: "95 testes aprovados e 5.714 chunks indexados com rastreabilidade completa.",
    },
  },
  {
    id: "a11y-io",
    title: "a11y.io",
    subtitle: "Acessibilidade • Engenharia de Requisitos",
    category: ["frontend", "backend"],
    categoryLabel: "ACESSIBILIDADE • ENGENHARIA DE REQUISITOS",
    headline: "E se acessibilidade entrasse no requisito antes de chegar à interface?",
    problem:
      "Critérios de acessibilidade costumam ser tratados como conserto tardio após o front-end pronto, gerando retrabalho expressivo.",
    role: "Arquiteta de Requisitos & Desenvolvedora",
    decisions: [
      "Mapeamento sistemático de diretrizes da WCAG 2.2 em cenários BDD acionáveis",
      "Clean Architecture separando domínio de especificação e apresentação",
      "Front-end com navegação completa por teclado e leitores de tela",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Clean Architecture",
      "WCAG 2.2",
      "BDD",
    ],
    techIds: ["wcag", "react", "clean-architecture", "nodejs"],
    evidence: [
      "Critérios de sucesso WCAG 2.2 modelados como regras verificáveis",
      "Geração automática de cenários Given-When-Then para testes automatizados",
      "Conformidade de contraste e foco visível testada em múltiplos navegadores",
    ],
    coverImage: a11yCover,
    features: [
      "Mapeamento de critérios WCAG 2.2 em regras estruturadas de especificação",
      "Geração de cenários BDD prontos para implementação e testes automatizados",
      "Clean Architecture dividindo regras de domínio, casos de uso e apresentação",
      "Interface acessível em conformidade estrita de teclado, leitores de tela e contraste",
    ],
    links: {
      demo: "https://a11y-6cvv.onrender.com/",
      github: "https://github.com/Etuarda/a11y",
      caseStudy: "#case-a11y-io",
    },
    featured: true,
    status: "verified",
    caseStudy: {
      situation:
        "Acessibilidade digital é frequentemente delegada ao final do desenvolvimento, gerando refações custosas de layout e semântica.",
      context:
        "Requisitos de acessibilidade costumam ser ignorados na fase de concepção porque as equipes não sabem traduzir a WCAG em critérios de aceite claros.",
      problem:
        "Adaptar uma interface já construída é muitas vezes mais demorado do que construí-la acessível desde o primeiro momento.",
      implication:
        "Aplicações nascem inacessíveis para milhões de usuários com deficiência e expostas a barreiras de conformidade legal.",
      solution:
        "O a11y.io traduz as diretrizes da WCAG 2.2 em especificações de requisitos, histórias de usuário e cenários BDD executáveis antes da implementação.",
      technicalDecision:
        "Tratar acessibilidade como requisito essencial de engenharia de software e critério de qualidade de código.",
      evidence:
        "Geração de cenários BDD executáveis e redução do tempo de especificação de requisitos acessíveis.",
      learning:
        "Acessibilidade não é capricho estético: é qualidade de software, arquitetura semântica e respeito humano.",
      architecture: [
        "Mapeamento de diretrizes internacionais WCAG 2.2",
        "Clean Architecture garantindo manutenibilidade das regras de negócio",
        "Frontend com conformidade estrita de contraste, teclado e leitores de tela",
      ],
      metrics: "Conformidade WCAG 2.2 A/AA e cenários BDD integrados ao ciclo de desenvolvimento.",
    },
  },
  {
    id: "roadmap-planner",
    title: "Backend Roadmap Planner",
    subtitle: "Full Stack • Avaliação por Critérios",
    category: ["backend", "frontend"],
    categoryLabel: "FULL STACK • REGRAS DE NEGÓCIO",
    headline: "Estudar mais não significa necessariamente estudar o que falta.",
    problem:
      "Estudantes e desenvolvedores acumulam cursos sem clareza sobre quais fundamentos realmente faltam para seu nível.",
    role: "Desenvolvedora Full Stack",
    decisions: [
      "Avaliação multicritério determinística orientada por lacunas de conhecimento",
      "Validação com Zod de ponta a ponta no formulário e no backend",
      "Trilhas de recomendação geradas sem algoritmos opacos",
    ],
    technologies: ["React", "TypeScript", "Node.js", "Express", "Zod", "Tailwind CSS"],
    techIds: ["react", "typescript-frontend", "nodejs", "typescript-backend", "zod-backend"],
    evidence: ["Diagnóstico instantâneo e geração de roadmap de evolução estruturado."],
    coverImage: plansCover,
    features: [
      "Avaliação estruturada por critérios e eixos técnicos de desenvolvimento",
      "Motor de recomendação determinístico com regras de negócio transparentes",
      "Validação estrita no cliente e servidor compartilhando esquemas Zod",
    ],
    links: {
      demo: "https://miniprojetopda4-1.onrender.com/",
      github: "https://github.com/Etuarda/miniProjetoPda4",
    },
    featured: false,
    status: "verified",
    caseStudy: {
      situation:
        "Back-end envolve fundamentos extensos de banco de dados, arquitetura, segurança e redes.",
      context:
        "Sem diagnóstico direcionado, a evolução profissional torna-se dispersa e ineficiente.",
      problem: "Dificuldade em identificar prioridades de estudo técnicas reais.",
      implication: "Perda de tempo em conteúdos repetitivos sem preencher lacunas críticas.",
      solution: "Aplicação que avalia critérios técnicos e monta trilha personalizada.",
      technicalDecision: "Regras de negócio transparentes sem caixas-pretas.",
      evidence: "Trilhas geradas de forma transparente.",
      learning: "Transparência nas regras gera maior confiança no usuário.",
      architecture: ["React SPA", "Node.js API", "Validação com Zod"],
      metrics: "Avaliação instantânea multicritério.",
    },
  },
  {
    id: "residencia-dados",
    title: "Análise de Dados — PUC-Rio",
    subtitle: "Dados • ETL & Visualização",
    category: ["data"],
    categoryLabel: "DADOS • PIPELINES DE ETL & STORYTELLING",
    headline: "Uma análise confiável começa antes do dashboard.",
    problem:
      "Bases de dados brutas chegam repletas de duplicatas, inconsistências de tipo e valores nulos.",
    role: "Residente em Análise de Dados",
    decisions: [
      "Higienização de fontes em Python com Pandas antes de qualquer agregação",
      "Modelagem dimensional e consultas estruturadas em SQL",
      "Storytelling executivo no Looker Studio orientado a tomadores de decisão",
    ],
    technologies: ["Python", "Pandas", "SQL", "ETL", "Looker Studio"],
    techIds: ["python-data", "sql-analitico", "looker-studio"],
    evidence: ["Painéis estratégicos publicados e fontes de dados saneadas."],
    coverImage: onvagasCover,
    features: [
      "Processamento completo de tratamento de dados e inconsistências com Pandas",
      "Consultas analíticas estruturadas e agregações em SQL",
      "Dashboards dinâmicos desenvolvidos no Looker Studio",
    ],
    links: {
      demo: "https://datastudio.google.com/s/rhrnbLbiyq4",
    },
    featured: false,
    status: "verified",
    caseStudy: {
      situation: "Bases de dados corporativas dispersas com inconsistências de cadastro.",
      context: "Tomadores de decisão precisavam de indicadores confiáveis de performance.",
      problem: "Dados brutos sem tratamento levam a relatórios incorretos.",
      implication: "Decisões estratégicas tomadas com base em números distorcidos.",
      solution: "Pipeline de ETL em Python/Pandas com consolidação SQL e painel no Looker Studio.",
      technicalDecision: "Garantir a integridade da fonte antes de criar qualquer visualização.",
      evidence: "Relatórios executivos interativos consolidados.",
      learning: "Qualidade de visualização não compensa baixa qualidade de dados.",
      architecture: ["Python ETL", "SQL analítico", "Looker Studio"],
      metrics: "Bases dispersas unificadas e higienizadas.",
    },
  },
  {
    id: "capacitacao-ia",
    title: "Laboratório de IA — FDTE / USP",
    subtitle: "Machine Learning • Visão & NLP",
    category: ["ai", "data"],
    categoryLabel: "INTELIGÊNCIA ARTIFICIAL • MODELAGEM TÉCNICA",
    headline:
      "Antes de trabalhar com IA generativa, eu quis entender os fundamentos de aprendizado de máquina.",
    problem:
      "Usar modelos de IA como caixas-pretas impede o diagnóstico de métricas de erro e viés.",
    role: "Pesquisadora & Desenvolvedora de Modelos",
    decisions: [
      "Implementação prática de modelos de classificação, regressão e clusterização",
      "Rotinas de visão computacional em OpenCV e processamento de linguagem natural",
      "Experimentação de algoritmos de aprendizado por reforço (Q-Learning e SARSA)",
    ],
    technologies: ["Python", "Scikit-Learn", "OpenCV", "TensorFlow", "Q-Learning"],
    techIds: ["scikit-learn", "python-data"],
    evidence: ["360 horas de imersão técnica concluídas com múltiplos protótipos experimentais."],
    coverImage: vendefacilCover,
    features: [
      "Modelos supervisionados de classificação e regressão com Scikit-Learn",
      "Processamento de Linguagem Natural (NLP) aplicado",
      "Visão computacional prática com OpenCV para extração e correspondência de padrões",
    ],
    links: {
      github: "https://github.com/Etuarda/capacitacao-tecnica-em-IA--FDTE_USP",
    },
    featured: false,
    status: "verified",
    caseStudy: {
      situation:
        "Compreender os fundamentos teóricos e práticos de Inteligência Artificial além da API de LLMs.",
      context: "Programa intensivo de 360 horas com docentes e pesquisadores da USP.",
      problem:
        "A dependência de caixas-pretas compromete a capacidade de tomar boas decisões técnicas.",
      implication: "Dificuldade em calibrar hiperparâmetros e avaliar limites de modelos.",
      solution:
        "Implementação sistemática de algoritmos de aprendizado supervisionado, não supervisionado e por reforço.",
      technicalDecision:
        "Experimentar sistematicamente diferentes abordagens para entender o impacto de dados e métricas.",
      evidence: "Dezenas de protótipos práticos documentados no GitHub.",
      learning:
        "Entender dados, métricas e treinamento fundamenta a criação de soluções sólidas com IA generativa e RAG.",
      architecture: ["Pipelines Python", "Scikit-Learn", "OpenCV", "TensorFlow"],
      metrics: "360h de imersão técnica com múltiplos experimentos validados.",
    },
  },
  {
    id: "vemari",
    title: "Vemari Empreendimentos",
    subtitle: "Web • Operação & Negócio",
    category: ["backend", "frontend"],
    categoryLabel: "WEB & INFRAESTRUTURA • OPERAÇÃO REAL",
    headline: "Tecnologia precisa conversar com a operação real da empresa.",
    problem:
      "Problemas técnicos e de comunicação em empresas não aparecem isolados: afetam rotinas e pessoas.",
    role: "Auxiliar de TI & Desenvolvedora Web",
    decisions: [
      "Governança e segurança de infraestrutura de e-mails corporativos (DNS, SPF, DKIM, DMARC)",
      "Levantamento direto de requisitos e mapeamento de gargalos operacionais",
      "Desenvolvimento de site institucional responsivo",
    ],
    technologies: ["Web", "DNS & E-mail", "Google Workspace", "Processos", "Suporte"],
    techIds: ["wcag"],
    evidence: [
      "Infraestrutura de e-mails corporativos e processos internos plenamente operacionais.",
    ],
    coverImage: onvagasCover,
    features: [
      "Configuração e governança de infraestrutura de e-mails corporativos",
      "Levantamento de requisitos e diagnóstico de gargalos operacionais com equipes internas",
      "Desenvolvimento de site institucional alinhado à comunicação da empresa",
    ],
    links: {},
    featured: false,
    status: "verified",
    caseStudy: {
      situation:
        "Operação corporativa com necessidades diversas de infraestrutura, suporte e presença digital.",
      context:
        "Contato direto com as rotinas diárias e restrições reais de usuários e equipe administrativa.",
      problem:
        "Processos manuais e infraestrutura de e-mails instável geravam atrito na comunicação com clientes.",
      implication: "Riscos de segurança em e-mails e atrasos nas entregas operacionais.",
      solution:
        "Estruturação de políticas de e-mail (SPF, DKIM, DMARC), automação de rotinas e site institucional.",
      technicalDecision:
        "Adequar a tecnologia às restrições orçamentárias e humanas da organização.",
      evidence: "Operação corporativa estabilizada e documentada.",
      learning:
        "Tecnologia precisa funcionar dentro da realidade da empresa, e não apenas no ambiente de desenvolvimento.",
      architecture: ["DNS / SPF / DKIM / DMARC", "Google Workspace", "Web Responsiva"],
      metrics: "Infraestrutura corporativa estabilizada e processos documentados.",
    },
  },
];
