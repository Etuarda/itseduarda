import type { EvidenceMetric } from "@/types/content";

export const profileContent = {
  name: "Eduarda Silva Santos",
  tagline: "Desenvolvedora Back-end & Full Stack",
  headline: "Construo aplicações web, APIs resilientes e sistemas orientados a regras de negócio claras e arquitetura limpa.",
  subheadline: "Back-end com Node.js, TypeScript e PostgreSQL como eixo principal, ampliado por aplicações Full Stack com React, processamento de Dados em Python/SQL e soluções com IA generativa e RAG.",
  status: "verified" as const,
  location: "Brasil • Disponível para atuação remota",
  email: "eduarda.santos.dev@gmail.com", // atualizável pelo usuário
  contactLinks: {
    github: "https://github.com/Etuarda",
    linkedin: "https://www.linkedin.com/in/eduarda-silva-santos-/",
    curriculoPdf: "/Eduarda- Curriculo-Full-Stack(6).pdf",
  },
  metrics: [
    {
      id: "metric-tests",
      value: "95",
      label: "Testes automatizados aprovados",
      context: "Suite de testes unitários e de integração no pipeline RAG do projeto VendeFácil.",
      status: "verified",
    },
    {
      id: "metric-hours-fullstack",
      value: "720h",
      label: "Formação Full Stack intensiva",
      context: "Imersão prática em squad ágil pelo programa Programadores do Amanhã.",
      status: "verified",
    },
    {
      id: "metric-hours-ai",
      value: "360h",
      label: "Imersão técnica em Inteligência Artificial",
      context: "Capacitação nacional em Machine Learning e Redes Neurais pela FDTE / USP.",
      status: "verified",
    },
    {
      id: "metric-hours-data",
      value: "340h",
      label: "Residência prática em Análise de Dados",
      context: "Tratamento de dados reais, pipelines de ETL e dashboards executivos na PUC-Rio.",
      status: "verified",
    },
  ] as EvidenceMetric[],
};
