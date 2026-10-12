// 04 — Como eu construo

export type BuildBlock = { id: string; label: string; tools: string; practices: string };

export const BUILD = {
  kicker: "Como eu construo",
  title: { lead: "Da pergunta à ", accent: "solução", tail: "." },
  text: "Não escolho tecnologia pela tendência. Escolho pela função que ela precisa cumprir dentro da solução.",
  blocks: [
    {
      id: "interfaces",
      label: "Interfaces",
      tools: "React · TypeScript · Vite",
      practices: "Componentização · responsividade · acessibilidade · APIs",
    },
    {
      id: "backend",
      label: "Backend",
      tools: "Node.js · Express · Fastify · PostgreSQL",
      practices: "APIs · autenticação · validação · regras de negócio",
    },
    {
      id: "dados",
      label: "Dados",
      tools: "Python · SQL · Pandas · ETL",
      practices: "Tratamento · análise · modelagem · métricas",
    },
    {
      id: "ia",
      label: "IA",
      tools: "RAG · FAISS · BM25 · RRF · LLMs",
      practices: "Ingestão · retrieval · grounding · avaliação · guardrails",
    },
  ] as BuildBlock[],
  engineering: { label: "Engenharia", items: "Git · testes · Docker · CI/CD · documentação · segurança" },
  process: ["Entender", "Modelar", "Construir", "Testar", "Validar", "Evoluir"],
};
