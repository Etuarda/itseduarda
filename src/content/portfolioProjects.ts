// 03 — Problemas + Projetos
// 6 cases principais (carrossel + diálogo) e 9 projetos compactos ("Mais no GitHub").
// Identidade visual de cada projeto vem do próprio produto — ver projectIdentity.ts.
//
// Regras editoriais (script da Seção 03, 12/10/2026):
// - rótulos visíveis: "GitHub" para repositório e "Ver projeto" para deploy/dashboard;
// - URLs sempre por extenso nos dados; nada de href fictício;
// - sem deploy, simplesmente não há botão "Ver projeto".

export type LinkKind = "github" | "deploy" | "dashboard" | "docs";

export type ProjectLink = {
  kind: LinkKind;
  /** URL completa, sempre por extenso */
  href: string;
  /** complemento do rótulo: "Frontend", "Backend", "notebook", "complementar" */
  qualifier?: string;
};

type ProjectBase = {
  name: string;
  /** natureza do projeto (linha curta acima do título) */
  nature: string;
  /** contexto de criação: acadêmico, pesquisa, desafio técnico, autoral, colaborativo… */
  context: string;
  /** dor concreta, em linguagem não técnica */
  problem: string;
  /** resposta construída, logo abaixo da dor */
  solution: string;
  /** texto completo do case */
  story: string;
  /** decisões de engenharia sustentadas pelo código */
  engineering: string[];
  flow: string[];
  /** tecnologias curtas exibidas no card (3–5) */
  highlight: string[];
  links: ProjectLink[];
};

export type ProjectSlug = "nexo-rj" | "planos" | "a11y" | "onvagas" | "vemari" | "analise-dados";

export type Project = ProjectBase & {
  slug: ProjectSlug;
  /** contribuição individual — só quando fundamentada */
  role?: string;
  /** observação sobre o fluxo (ex.: o que é do time e o que é individual) */
  flowNote?: string;
  /** arquivos/artefatos que sustentam o case */
  evidence?: string[];
};

export type OtherSlug =
  | "arquivo-literario"
  | "healthhub"
  | "roadmap"
  | "series-journal"
  | "laboratorio-rag"
  | "chatbot-pln"
  | "classificacao-tumores"
  | "caminho-seguro"
  | "pokemon-card-battle";

export type OtherProject = ProjectBase & { slug: OtherSlug };

export const PROJECTS: Project[] = [
  {
    slug: "nexo-rj",
    name: "NEXO RJ",
    nature: "IA aplicada · RAG · Frontend integrado",
    context: "Grande Desafio da Residência em IA e RAG · Instituto ECOA / PUC-Rio · projeto colaborativo",
    problem:
      "Encontrar informações sobre contratações públicas exige consultar documentos e bases diferentes. Mesmo quando surge uma resposta, nem sempre é simples descobrir de onde ela veio.",
    solution:
      "O NEXO RJ reúne a experiência de consulta a um sistema Adaptive RAG, apresentando respostas acompanhadas de fontes e informações sobre o processamento.",
    story:
      "Em contratações públicas, informações relevantes podem estar espalhadas por documentos e fontes distintas. Localizar um dado já exige esforço; verificar se uma resposta está fundamentada exige ainda mais. O NEXO RJ explora uma arquitetura de recuperação aumentada por geração para facilitar essas consultas. Minha contribuição está no frontend: desenvolvi a interface em React e TypeScript, integrei serviços à API, organizei a gestão de sessões, o tratamento de erros, a apresentação de fontes e os fluxos de feedback. Assim, a experiência não se limita a exibir um texto gerado: também apresenta elementos que ajudam o usuário a compreender a origem da resposta.",
    role: "Frontend: interface em React e TypeScript, integração com a API, sessões, tratamento de erros, apresentação de fontes e feedback. O backend e a recuperação RAG são trabalho coletivo do time.",
    engineering: [
      "React 19 e TypeScript",
      "Serviços HTTP centralizados",
      "Tratamento de falhas e timeouts",
      "Hooks de sessão e conversa",
      "Integração com FastAPI",
      "Vitest e Testing Library",
    ],
    flow: ["Pergunta", "Consulta ao backend", "Recuperação RAG", "Resposta", "Fontes e feedback"],
    flowNote: "A recuperação interna faz parte da solução colaborativa do time, não da contribuição individual.",
    highlight: ["React", "TypeScript", "FastAPI", "RAG", "Vitest"],
    evidence: [
      "src/services/api.ts",
      "src/hooks/useRagWorkspace.ts",
      "src/pages/Consulta/ConsultaPage.integration.test.tsx",
      "Workflow de build, testes e deploy no GitHub Pages",
    ],
    links: [
      { kind: "github", qualifier: "Frontend", href: "https://github.com/Etuarda/frontendRAG" },
      {
        kind: "github",
        qualifier: "Backend",
        href: "https://github.com/Diogooliveira10/rag-grande-desafio-grupo04-cenario01",
      },
      { kind: "deploy", href: "https://etuarda.github.io/frontendRAG/" },
    ],
  },
  {
    slug: "planos",
    name: "Sistema de Controle de Planos",
    nature: "Backend · Serviços distribuídos",
    context: "Projeto acadêmico · Desenvolvimento de Sistemas Backend · PUCRS",
    problem:
      "Quando gestão de planos, pagamentos e consultas dividem a mesma lógica, cada mudança pode afetar partes que deveriam funcionar de forma independente.",
    solution:
      "Organizei essas responsabilidades em serviços próprios, com API Gateway, comunicação por eventos e cache de consultas.",
    story:
      "Administrar assinaturas envolve regras de negócio distintas: cadastrar planos, registrar pagamentos e verificar quais assinaturas estão ativas. Concentrar tudo no mesmo ponto torna a evolução mais difícil. Neste projeto acadêmico, essas responsabilidades foram separadas em serviços, com um API Gateway como entrada das requisições e mecanismos de comunicação para eventos e consultas. A arquitetura permite estudar fronteiras de domínio, persistência, mensageria e invalidação de cache de maneira concreta.",
    engineering: [
      "Node.js, TypeScript e Express",
      "PostgreSQL",
      "RabbitMQ para eventos",
      "Redis para cache de consultas",
      "Docker Compose",
      "Camadas domain / application / infrastructure / interfaces",
      "Testes de regras de domínio",
    ],
    flow: ["Requisição", "API Gateway", "Serviço responsável", "Persistência / evento", "Estado e cache", "Resposta"],
    highlight: ["Node.js", "TypeScript", "RabbitMQ", "Redis", "Docker"],
    evidence: [
      "servico-gestao, servico-faturamento, servico-planos-ativos e api-gateway",
      "Testes da entidade Assinatura",
    ],
    links: [{ kind: "github", href: "https://github.com/Etuarda/backend" }],
  },
  {
    slug: "a11y",
    name: "a11y.io",
    nature: "Engenharia de Requisitos · Acessibilidade",
    context: "Pesquisa e implementação acadêmica · Análise e Desenvolvimento de Sistemas · PUCRS",
    problem:
      "Quando barreiras de acessibilidade só aparecem depois da implementação, corrigi-las exige retrabalho e pode comprometer a experiência de quem utiliza a interface.",
    solution:
      "O a11y.io transforma o contexto da interface em recomendações WCAG, histórias de usuário e cenários BDD antes do desenvolvimento.",
    story:
      "A acessibilidade ainda é frequentemente tratada como uma correção feita no fim do desenvolvimento. O problema é que decisões de interface já tomadas podem tornar essas correções caras e difíceis. O a11y.io foi criado para antecipar essa análise: ele coleta informações sobre a interface, relaciona as respostas a recomendações da WCAG 2.2 e aos princípios Gaia e gera artefatos como User Stories e cenários BDD. Na implementação, as regras de domínio foram separadas de casos de uso, infraestrutura e interfaces HTTP, para que decisões de apresentação não fiquem misturadas à lógica de avaliação.",
    engineering: [
      "Node.js, Express e JavaScript",
      "Casos de uso e validação de entrada",
      "Regras determinísticas (sem IA generativa)",
      "Injeção de dependências",
      "Modularização inspirada em Clean Architecture",
      "WCAG 2.2, princípios Gaia e BDD",
    ],
    flow: ["Contexto da interface", "Validação", "Correspondência de regras", "Recomendações", "User Story e BDD"],
    highlight: ["JavaScript", "Node.js", "Express", "WCAG 2.2", "Clean Architecture"],
    evidence: [
      "a11y-clean-architecture/src/application/use-cases/EvaluateAccessibilityUseCase.js",
      "a11y-clean-architecture/src/domain/services/RuleMatcher.js",
    ],
    links: [
      { kind: "github", href: "https://github.com/Etuarda/a11y" },
      { kind: "deploy", href: "https://a11y-6cvv.onrender.com/" },
    ],
  },
  {
    slug: "onvagas",
    name: "OnVagas",
    nature: "Produto Full Stack",
    context: "Clube de Programação · nasceu da busca pela primeira oportunidade profissional",
    problem:
      "Procurar emprego significa adaptar currículos, repetir informações e acompanhar candidaturas em lugares diferentes. Muito tempo acaba sendo gasto na organização do processo.",
    solution:
      "O OnVagas propõe reunir perfil profissional, compatibilidade com vagas, personalização de currículos e acompanhamento de candidaturas em uma mesma jornada.",
    story:
      "Quem busca uma oportunidade profissional precisa lidar com diferentes versões do currículo, candidaturas em vários sites e informações repetidas. O OnVagas surgiu da tentativa de reduzir esse retrabalho. A proposta é centralizar o perfil profissional e reunir recursos para analisar a compatibilidade com vagas, adaptar currículos e acompanhar o andamento de candidaturas. O projeto foi concebido como um produto Full Stack: a interface e a API trabalham sobre um modelo de dados comum.",
    engineering: ["React e TypeScript", "Node.js e Express", "PostgreSQL e Prisma", "Autenticação JWT", "Validação com Zod", "Redis"],
    flow: ["Cadastro do perfil", "Identificação da vaga", "Adaptação da candidatura", "Acompanhamento"],
    highlight: ["React", "TypeScript", "Node.js", "PostgreSQL", "Prisma"],
    links: [
      {
        kind: "github",
        href: "https://github.com/Etuarda/vagasrepo",
      },
      { kind: "deploy", href: "https://onvagas.com.br/" },
    ],
  },
  {
    slug: "vemari",
    name: "Vemari Institucional",
    nature: "Frontend · Next.js",
    context: "Projeto autoral de portfólio · cenário de empreendimentos (não é trabalho para cliente)",
    problem:
      "Encontrar informações sobre uma empresa e seus empreendimentos fica mais difícil quando conteúdo, navegação e contato não estão bem organizados.",
    solution:
      "A Vemari explora uma experiência institucional clara e responsiva, com apresentação estruturada de conteúdo e caminhos de contato.",
    story:
      "Uma página institucional precisa ajudar a pessoa a entender o que está sendo apresentado e encontrar o próximo passo sem esforço. A Vemari foi desenvolvida como projeto autoral de portfólio para exercitar essa jornada em um cenário de empreendimentos. A solução organiza páginas, conteúdo e contatos em uma interface responsiva construída com Next.js, React e TypeScript. A arquitetura por funcionalidades e a reutilização de componentes foram priorizadas para tornar a manutenção mais compreensível.",
    engineering: [
      "Next.js, React e TypeScript",
      "Tailwind CSS",
      "Componentes reutilizáveis",
      "Organização por features",
      "Export estático",
    ],
    flow: ["Descoberta", "Exploração do conteúdo", "Informações relevantes", "Contato"],
    highlight: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    links: [
      { kind: "github", href: "https://github.com/Etuarda/VemariInstitucional-" },
      { kind: "deploy", href: "https://etuarda.github.io/VemariInstitucional-/" },
    ],
  },
  {
    slug: "analise-dados",
    name: "Análise de Dados",
    nature: "Análise de Dados · Visualização",
    context: "Residência em Análise de Dados · Instituto ECOA / PUC-Rio · 2025",
    problem:
      "Ter muitos dados não garante conseguir usá-los. Informações brutas e desorganizadas dificultam identificar tendências e responder perguntas importantes.",
    solution:
      "O projeto organiza preparação, transformação, análise e visualização para transformar dados em indicadores interpretáveis e apoiar decisões.",
    story:
      "Organizações podem reunir informações em grande volume sem conseguir transformá-las em respostas úteis. Dados com formatos diferentes, registros incompletos ou indicadores pouco claros tornam a análise mais lenta. Neste trabalho, o foco é percorrer o caminho entre o dado bruto e a interpretação: tratar informações, estruturar métricas, explorar tendências e reunir resultados em visualizações para apoiar a leitura dos dados. O objetivo não é apenas produzir gráficos, mas tornar mais claras as perguntas que eles ajudam a responder.",
    engineering: [
      "Python, Pandas e SQL",
      "Matplotlib e Looker Studio",
      "Limpeza, transformação, métricas e visualização",
    ],
    flow: ["Origem", "Limpeza", "Transformação", "Métricas", "Visualização", "Interpretação"],
    highlight: ["Python", "Pandas", "SQL", "Looker Studio"],
    links: [{ kind: "dashboard", href: "https://datastudio.google.com/s/rhrnbLbiyq4" }],
  },
];

export const OTHER_PROJECTS: OtherProject[] = [
  {
    slug: "arquivo-literario",
    name: "Arquivo Literário",
    nature: "Backend / Full Stack · Ruby on Rails",
    context: "Desafio técnico de processo seletivo de estágio",
    problem:
      "Organizar livros e leituras em registros separados dificulta manter uma biblioteca pessoal e proteger os dados de cada usuário.",
    solution:
      "Aplicação com cadastro de livros, autenticação, edição dos próprios registros e integração com a OpenLibrary.",
    story:
      "Quem registra suas leituras em vários lugares acaba perdendo o histórico e repetindo informações. O Arquivo Literário organiza livros em um espaço único, permitindo que cada pessoa gerencie seus próprios cadastros. Desenvolvido como desafio técnico, o projeto reúne autenticação, regras de autorização e integração com a OpenLibrary para consultar dados das obras. A execução por Docker facilita reproduzir o ambiente e examinar como a aplicação foi estruturada.",
    engineering: ["Ruby on Rails 7 (MVC)", "Devise", "Autorização por propriedade de registros", "Consumo da OpenLibrary", "Docker"],
    flow: ["Autenticação", "Busca / cadastro de livro", "Persistência", "Consulta e edição autorizada"],
    highlight: ["Ruby on Rails", "Devise", "SQLite", "Docker", "OpenLibrary"],
    links: [
      { kind: "github", href: "https://github.com/Etuarda/arqliterario" },
      { kind: "github", qualifier: "complementar", href: "https://github.com/Etuarda/arqliterariodeploy" },
    ],
  },
  {
    slug: "healthhub",
    name: "HealthHub",
    nature: "E-commerce Full Stack",
    context: "Projeto Full Stack de portfólio (não é serviço comercial)",
    problem: "Uma compra se torna confusa quando catálogo, carrinho, login e pedidos não compartilham informações e estado.",
    solution: "E-commerce que conecta a experiência de compra a uma API com autenticação, produtos, carrinho e pedidos.",
    story:
      "Uma loja virtual precisa manter a mesma jornada desde a descoberta de um produto até o pedido. O HealthHub foi criado para exercitar essa integração: a interface apresenta catálogo, favoritos e carrinho, enquanto a API concentra autenticação e operações de persistência. O projeto reúne tecnologias frontend e backend em uma aplicação só, permitindo estudar como dados e regras de negócio atravessam cada etapa da experiência.",
    engineering: ["React e TypeScript", "Node e Express", "TypeORM e modelo relacional", "Autenticação JWT", "Separação frontend / API"],
    flow: ["Catálogo", "Seleção", "Carrinho", "Autenticação", "Pedido"],
    highlight: ["React", "TypeScript", "Express", "TypeORM", "JWT"],
    links: [{ kind: "github", href: "https://github.com/Etuarda/HealthHub" }],
  },
  {
    slug: "roadmap",
    name: "Backend Roadmap Planner",
    nature: "Aplicação Full Stack",
    context: "Projeto formativo · Programadores do Amanhã",
    problem: "Sem identificar lacunas de conhecimento, é difícil decidir o que estudar e medir a evolução no backend.",
    solution: "Diagnóstico de competências que gera roteiro de estudos com tarefas organizadas e registro de progresso.",
    story:
      "Quem começa a estudar backend encontra muitos temas, mas nem sempre sabe por onde avançar. O Roadmap Planner transforma respostas de um diagnóstico em um plano de aprendizagem organizado. Na implementação, o frontend acompanha uma API com validações e serviços responsáveis pelas regras de geração do roteiro, evitando concentrar toda a lógica na interface.",
    engineering: ["React + TypeScript", "Express", "Validação com Zod", "Camadas controller / service / repository", "Persistência em JSON"],
    flow: ["Diagnóstico", "Validação", "Geração do roadmap", "Tarefas", "Progresso"],
    highlight: ["React", "TypeScript", "Node.js", "Express", "Zod"],
    links: [
      { kind: "github", href: "https://github.com/Etuarda/miniProjetoPda4" },
      { kind: "deploy", href: "https://miniprojetopda4-1.onrender.com/" },
    ],
  },
  {
    slug: "series-journal",
    name: "Series Journal",
    nature: "Desenvolvimento Frontend",
    context: "Projeto acadêmico · Desenvolvimento de Sistemas Frontend · PUCRS",
    problem: "Sem um lugar único para registrar séries, consultar e atualizar o histórico de títulos se torna repetitivo.",
    solution: "Interface React com listagem, busca, criação, edição e exclusão por API REST, além de modo demonstrativo offline.",
    story:
      "É mais fácil acompanhar séries quando o histórico de títulos pode ser consultado e atualizado na mesma interface. O Series Journal oferece operações de cadastro, pesquisa e edição integradas a uma API REST. O projeto foi desenvolvido na disciplina de frontend da PUCRS e inclui testes de componentes. Quando a API não está disponível, a aplicação diferencia os dados demonstrativos do fluxo conectado ao servidor.",
    engineering: ["React e React Router", "Material UI", "Axios e chamadas REST", "Vitest e Testing Library"],
    flow: ["Consultar séries", "Pesquisar", "Criar / editar / excluir", "Atualizar interface"],
    highlight: ["React", "JavaScript", "Material UI", "Axios", "Vitest"],
    links: [
      { kind: "github", href: "https://github.com/Etuarda/Series-Journal" },
      { kind: "deploy", href: "https://etuarda.github.io/Series-Journal/" },
    ],
  },
  {
    slug: "laboratorio-rag",
    name: "Laboratório RAG de Processamento Documental",
    nature: "Laboratório técnico de IA",
    context: "Residência em IA e RAG · Instituto ECOA / PUC-Rio",
    problem: "PDFs e documentos não estruturados dificultam extrair e recuperar trechos relevantes para consultas inteligentes.",
    solution: "Experimentos de extração de documentos, segmentação em chunks, embeddings e busca semântica para entender o preparo do corpus.",
    story:
      "Antes de um sistema RAG responder com base em documentos, é preciso converter os arquivos em informações recuperáveis. Neste laboratório da residência, explorei extração documental, divisão em trechos, metadados e representações vetoriais. O trabalho documenta etapas de preparação e recuperação, mostrando como decisões na ingestão influenciam o contexto que chega ao modelo.",
    engineering: ["Python e Docling", "Notebooks Jupyter", "Chunking e metadados", "Embeddings e busca vetorial"],
    flow: ["Documento", "Extração", "Segmentação", "Metadados", "Vetores", "Recuperação"],
    highlight: ["Python", "Docling", "Jupyter", "Embeddings"],
    links: [{ kind: "github", href: "https://github.com/Etuarda/residencia-ia-rag-puc-rio" }],
  },
  {
    slug: "chatbot-pln",
    name: "Chatbot com PLN",
    nature: "Machine Learning · PLN",
    context: "Experimento acadêmico · Capacitação técnica em IA · FDTE/USP",
    problem: "Perguntas frequentes podem consumir esforço de atendimento mesmo quando a resposta já está disponível na base de conhecimento.",
    solution: "Experimento de classificação e recuperação de perguntas usando TF-IDF, FAQs e regras de fallback.",
    story:
      "Muitas dúvidas de atendimento se repetem. O desafio é identificar a intenção de uma pergunta e localizar uma resposta útil sem devolver uma informação incompatível. O chatbot em notebook explora processamento de texto, representação TF-IDF e classificação para consultar uma base de perguntas frequentes e identificar quando a resposta precisa de tratamento diferente.",
    engineering: ["Python", "Pré-processamento de texto", "TF-IDF e classificação", "Avaliação por exemplos e métricas"],
    flow: ["Pergunta", "Pré-processamento", "Busca / classificação", "Confiança", "Resposta ou fallback"],
    highlight: ["Python", "TF-IDF", "PLN", "Scikit-learn"],
    links: [
      {
        kind: "github",
        qualifier: "notebook",
        href: "https://github.com/Etuarda/capacitacao-tecnica-em-IA--FDTE_USP/blob/main/projeto-chatbot-pln-ecommerce.ipynb",
      },
    ],
  },
  {
    slug: "classificacao-tumores",
    name: "Classificação de Tumores com Regressão Logística",
    nature: "Ciência de Dados · Machine Learning",
    context: "Experimento acadêmico · formação em IA · FDTE/USP",
    problem: "Modelos de classificação precisam de avaliação criteriosa para diferenciar padrões reais de resultados ocasionais.",
    solution:
      "Estudo de classificação binária com regressão logística sobre o conjunto público Breast Cancer Wisconsin, com treino/teste e métricas.",
    story:
      "Identificar padrões em dados de muitas variáveis exige uma metodologia que permita avaliar o modelo, não apenas treiná-lo. Neste experimento, utilizei o conjunto público Breast Cancer Wisconsin para estudar regressão logística, preparação de dados e desempenho em uma tarefa de classificação binária. O resultado é uma investigação educacional sobre modelagem e avaliação, não um aplicativo de diagnóstico.",
    engineering: ["Pipeline scikit-learn", "Separação treino / teste", "Regressão logística", "Avaliação e validação"],
    flow: ["Dados", "Preparação", "Separação", "Treinamento", "Predição", "Métricas"],
    highlight: ["Python", "Pandas", "Scikit-learn"],
    links: [
      {
        kind: "github",
        qualifier: "notebook",
        href: "https://github.com/Etuarda/capacitacao-tecnica-em-IA--FDTE_USP/blob/main/projeto-classificacao-tumor-regressao-logistica.ipynb",
      },
    ],
  },
  {
    slug: "caminho-seguro",
    name: "Caminho Seguro",
    nature: "Interface web · Prototipação social",
    context: "Protótipo demonstrativo de frontend",
    problem: "Em situações de vulnerabilidade, buscar recursos de apoio de modo discreto pode ser difícil.",
    solution: "Protótipo de navegação disfarçada e telas de apoio que exploram uma experiência digital voltada à discrição.",
    story:
      "Quando uma pessoa precisa buscar orientação de maneira reservada, uma interface convencional pode não oferecer a discrição desejada. O Caminho Seguro explora uma navegação que começa com aparência de calculadora e abre uma experiência demonstrativa de acolhimento. O projeto é um protótipo de frontend; as ações de emergência, gravação, autenticação e conversa com IA são simuladas e não oferecem proteção real.",
    engineering: ["HTML, CSS e JavaScript", "Navegação e estado local", "Interface responsiva", "Prototipação de experiência"],
    flow: ["Entrada discreta", "Navegação", "Recursos demonstrativos", "Retorno"],
    highlight: ["HTML", "CSS", "JavaScript", "UX"],
    links: [
      { kind: "github", href: "https://github.com/Etuarda/mulhersegura" },
      { kind: "deploy", href: "https://etuarda.github.io/mulhersegura/src/html/calculadora.html" },
    ],
  },
  {
    slug: "pokemon-card-battle",
    name: "Pokémon Card Battle",
    nature: "Aplicação web interativa",
    context: "Projeto formativo · Programadores do Amanhã",
    problem: "Transformar dados de uma API em uma interação consistente exige regras próprias e organização de estado além da renderização.",
    solution: "Jogo de cartas que utiliza informações reais da PokéAPI para batalhas e separa o motor de regras da interface.",
    story:
      "Uma API fornece os dados, mas não cria a experiência do usuário. O Pokémon Card Battle transforma atributos retornados pela PokéAPI em cartas com regras de disputa. O jogo separa serviço de consulta, lógica de batalha e renderização, permitindo estudar como dados externos se tornam interações previsíveis.",
    engineering: ["JavaScript modular", "Consumo de API REST", "Controle de estado", "Tratamento de falhas", "Motor de batalha separado da UI"],
    flow: ["Escolha", "Consulta à API", "Cartas", "Batalha", "Resultado"],
    highlight: ["JavaScript", "HTML", "CSS", "PokéAPI"],
    links: [
      { kind: "github", href: "https://github.com/Etuarda/PokemonGame" },
      { kind: "deploy", href: "https://etuarda.github.io/PokemonGame/" },
    ],
  },
];

export const PROJECTS_COPY = {
  kicker: "Problemas + Projetos",
  title: { lead: "Cada projeto começa por um ", accent: "problema", tail: "." },
  lead: "Desafios reais e acadêmicos transformados em software, dados e inteligência artificial. Conheça os problemas, as soluções e as decisões de engenharia por trás de cada projeto.",
  othersTitle: "Mais no GitHub",
};
