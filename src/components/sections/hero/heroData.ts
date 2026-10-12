import pucrsLogo from "@/components/assets/education-pucrs-logo.png";
import ecoaLogo from "@/components/assets/education-ecoa-puc-rio-logo.png";
import fdteLogo from "@/components/assets/education-fdte-usp-logo.png";
import cubosLogo from "@/components/assets/education-cubos-academy-logo.png";
import pdaLogo from "@/components/assets/education-programadores-amanha-logo.png";

export type InstitutionLogo = { src: string; alt: string };

/** Logos oficiais em PNG transparente (Cubos e FDTE recoloridos: originais só em branco) */
export const LOGOS = {
  pucrs: { src: pucrsLogo, alt: "PUCRS" },
  ecoa: { src: ecoaLogo, alt: "Instituto ECOA PUC-Rio" },
  fdte: { src: fdteLogo, alt: "FDTE — Fundação para o Desenvolvimento Tecnológico da Engenharia" },
  cubos: { src: cubosLogo, alt: "Cubos Academy" },
  pda: { src: pdaLogo, alt: "Programadores do Amanhã" },
} satisfies Record<string, InstitutionLogo>;

export type CredentialItemData = {
  title: string;
  institution: string;
  period?: string;
  hours?: string;
  hoursNumber?: number;
  note?: string;
  logo?: InstitutionLogo;
  skills: string[];
};

export type CredentialHub = {
  id: "formacao" | "residencias" | "intensivas";
  index: "01" | "02" | "03";
  title: string;
  surfaceHighlight: string;
  surfaceSub: string;
  summary: string;
  /** Instituições do núcleo, na ordem de exibição */
  logos: InstitutionLogo[];
  items: CredentialItemData[];
};

export const CREDENTIAL_HUBS: CredentialHub[] = [
  {
    id: "formacao",
    index: "01",
    title: "FORMAÇÃO",
    surfaceHighlight: "ADS · PUCRS",
    surfaceSub: "Graduação Superior",
    summary: "Base teórica e arquitetural em Engenharia de Software e Modelagem de Soluções.",
    logos: [LOGOS.pucrs],
    items: [
      {
        title: "Tecnologia em Análise e Desenvolvimento de Sistemas",
        institution: "PUCRS — Pontifícia Universidade Católica do Rio Grande do Sul",
        period: "2024–2027 • Em andamento",
        logo: LOGOS.pucrs,
        skills: [
          "Engenharia de Software",
          "Sistemas Web",
          "Banco de Dados",
          "Arquitetura de APIs",
          "Modelagem de Soluções",
        ],
      },
    ],
  },
  {
    id: "residencias",
    index: "02",
    title: "RESIDÊNCIAS & PROGRAMAS APLICADOS",
    surfaceHighlight: "DADOS · IA · RAG",
    surfaceSub: "ECOA / PUC-Rio & FDTE / USP",
    summary: "Imersões práticas em Engenharia de Dados, Aprendizado de Máquina e RAG ancorado.",
    logos: [LOGOS.ecoa, LOGOS.fdte],
    items: [
      {
        title: "Análise de Dados",
        institution: "Instituto ECOA / PUC-Rio",
        logo: LOGOS.ecoa,
        hours: "320h",
        hoursNumber: 320,
        skills: [
          "Python",
          "Pandas",
          "SQL",
          "ETL",
          "Visualização",
          "Métricas",
          "BI",
          "Storytelling com Dados",
        ],
      },
      {
        title: "Inteligência Artificial",
        institution: "FDTE / USP",
        logo: LOGOS.fdte,
        hours: "360h",
        hoursNumber: 360,
        skills: [
          "Python",
          "Machine Learning",
          "NLP",
          "Visão Computacional",
          "Deep Learning",
          "Aprendizado por Reforço",
        ],
      },
      {
        title: "IA & RAG",
        institution: "Instituto ECOA / PUC-Rio (Programa TIC em Trilhas)",
        logo: LOGOS.ecoa,
        hours: "284h",
        hoursNumber: 284,
        skills: [
          "IA Generativa",
          "RAG",
          "Ingestão",
          "Chunking",
          "Embeddings",
          "FAISS",
          "Retrieval",
          "Avaliação",
          "Guardrails",
        ],
      },
    ],
  },
  {
    id: "intensivas",
    index: "03",
    title: "FORMAÇÕES INTENSIVAS",
    surfaceHighlight: "Desenvolvimento de Software",
    surfaceSub: "+1.800h de Imersão e Squad Ágil",
    summary: "Mais de 1.800 horas de código real, APIs transacionais e entrega contínua.",
    logos: [LOGOS.cubos, LOGOS.pda],
    items: [
      {
        title: "Desenvolvimento de Software — Back-end",
        institution: "Cubos Academy",
        logo: LOGOS.cubos,
        hours: "600h+",
        hoursNumber: 600,
        skills: ["JavaScript", "Node.js", "Express", "PostgreSQL", "APIs REST"],
      },
      {
        title: "Desenvolvimento de Software — Front-end",
        institution: "Cubos Academy",
        logo: LOGOS.cubos,
        hours: "492h",
        hoursNumber: 492,
        skills: ["React", "JavaScript", "TypeScript", "Vite", "APIs REST"],
      },
      {
        title: "Desenvolvimento Web Full Stack",
        institution: "Programadores do Amanhã",
        logo: LOGOS.pda,
        hours: "720h",
        hoursNumber: 720,
        note: "Concluído em julho de 2026",
        skills: [
          "JavaScript",
          "Node.js",
          "Express",
          "React",
          "Bancos de dados",
          "Squad Ágil",
          "Metodologias Ágeis",
        ],
      },
    ],
  },
];


// ---------------------------------------------------------------------------
// Copy do Hero e do palco de apresentação (conteúdo aprovado — não editar no JSX)
// ---------------------------------------------------------------------------

export type CopySegment = { text: string; accent?: boolean };

export const HERO_COPY = {
  firstName: "Eduarda",
  fullName: "Eduarda Silva Santos",
  role: "Desenvolvedora de Software Full Stack, criando soluções com Engenharia de Dados e aplicações de IA.",
  /** Proposta de valor em duas frases: uma palavra de destaque por frase */
  valueBeats: [
    [
      { text: "Transformo problemas em soluções digitais funcionais e " },
      { text: "escaláveis", accent: true },
      { text: "," },
    ],
    [
      { text: "da ideia à implementação, conectando software, dados e " },
      { text: "inteligência artificial", accent: true },
      { text: "." },
    ],
  ] as CopySegment[][],
  hook: "Veja como transformo problemas em soluções reais",
  /** Rótulos de canto da moldura editorial: [destaque, complemento] */
  corners: [
    ["Eduarda", "Silva Santos"],
    ["Full", "Stack"],
    ["Engenharia", "de Dados"],
    ["Aplicações", "de IA"],
  ] as [string, string][],
};

/** Período da graduação, para a linha do tempo do núcleo 01 */
export const FORMACAO_PERIOD = { start: new Date(2024, 0, 1), end: new Date(2027, 11, 31) };
