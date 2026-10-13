// 05 — Trajetória: cada marco no mesmo formato ANO · INSTITUIÇÃO · CARGA HORÁRIA · RESULTADO

export type Milestone = { when: string; where: string; what: string; hours?: string };

export type Lane = { id: "dev" | "dados-ia" | "carreira"; label: string; items: Milestone[] };

export const TRAJECTORY = {
  kicker: "Trajetória",
  title: { lead: "Cada etapa adicionou uma ", accent: "camada", tail: "." },
  lanes: [
    {
      id: "dev",
      label: "Desenvolvimento",
      items: [
        { when: "2023 a 2024", where: "Cubos Academy", what: "Backend", hours: "~600h" },
        { when: "2024", where: "Cubos Academy", what: "TypeScript Avançado", hours: "77h" },
        { when: "2024 a 2025", where: "Cubos Academy", what: "Frontend", hours: "492h" },
        { when: "2024 a 2027", where: "PUCRS", what: "ADS · Em andamento" },
        { when: "2025 a jul/2026", where: "Programadores do Amanhã", what: "Full Stack", hours: "720h" },
        { when: "mar/2026", where: "Instituto Eldorado", what: "Fundamentos de Teste", hours: "24h" },
        { when: "abr/2026", where: "Trilha Node.js", what: "3 módulos · 30h + 50h + 30h", hours: "110h" },
      ],
    },
    {
      id: "dados-ia",
      label: "Dados & IA",
      items: [
        { when: "ago a nov/2025", where: "Instituto ECOA / PUC-Rio", what: "Residência em Análise de Dados", hours: "320h" },
        { when: "out/2025 a fev/2026", where: "FDTE / USP", what: "Capacitação em IA", hours: "360h" },
        { when: "2026", where: "PUC-Rio / TIC em Trilhas", what: "Agentes Inteligentes" },
        { when: "2026", where: "PUC-Rio / TIC em Trilhas", what: "RAG para Respostas Inteligentes" },
        { when: "desde 2026", where: "Instituto ECOA / PUC-Rio", what: "Residência em IA & RAG", hours: "284h" },
        { when: "set/2026", where: "VendeFácil", what: "Minidesafio RAG" },
        { when: "set a out/2026", where: "Nexo RJ", what: "Grande Desafio / Adaptive RAG" },
      ],
    },
    {
      id: "carreira",
      label: "Carreira",
      items: [
        { when: "2021 a 2024", where: "AeC", what: "Atendimento, comunicação e resolução de problemas." },
        { when: "desde 2024", where: "Projetos técnicos", what: "Software Full Stack, backend, dados e IA." },
        { when: "2026", where: "Vemari Empreendimentos", what: "TI, Workspace e processos." },
        { when: "desde 2026", where: "Instituto ECOA / PUC-Rio", what: "IA generativa e RAG aplicado." },
      ],
    },
  ] as Lane[],
  // a frase final é dividida: 1ª metade vira o título, 2ª fecha o capítulo
  closing: "Hoje elas se encontram em software, dados e inteligência artificial.",
};
