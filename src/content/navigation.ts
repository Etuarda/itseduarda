export type NavItem = {
  id: string;
  label: string;
  href: string;
  sectionIndex: string;
};

export const navigationItems: NavItem[] = [
  { id: "hero", label: "Início", href: "#hero", sectionIndex: "00" },
  { id: "sobre", label: "Sobre", href: "#sobre", sectionIndex: "01" },
  { id: "competencias", label: "Competências", href: "#competencias", sectionIndex: "02" },
  { id: "projetos", label: "Projetos", href: "#projetos", sectionIndex: "03" },
  { id: "experiencia", label: "Experiência", href: "#experiencia", sectionIndex: "04" },
  { id: "formacao", label: "Formação", href: "#formacao", sectionIndex: "05" },
  { id: "contato", label: "Contato", href: "#contato", sectionIndex: "06" },
];

export const sectionMetadata = {
  hero: {
    title: "Eduarda Silva Santos",
    scriptAccent: "construindo",
    index: "00",
  },
  sobre: {
    title: "Sobre",
    scriptAccent: "mim",
    index: "01",
    question: "Como penso e que tipo de contribuição levo para uma equipe?",
  },
  competencias: {
    title: "Competências",
    scriptAccent: "em combinação",
    index: "02",
    question: "O que sei combinar e integrar na prática?",
  },
  projetos: {
    title: "Projetos",
    scriptAccent: "em prática",
    index: "03",
    question: "O código mostra o que foi construído. O estudo de caso mostra por quê.",
  },
  experiencia: {
    title: "Experiência",
    scriptAccent: "em contexto",
    index: "04",
    question: "Como o contato com pessoas, operação e ambientes reais moldou meu repertório?",
  },
  formacao: {
    title: "Formação",
    scriptAccent: "em evolução",
    index: "05",
    question: "Como aprofundei minha base e construí consistência técnica?",
  },
  contato: {
    title: "Contato",
    scriptAccent: "próximo passo",
    index: "06",
    question: "Vamos conversar sobre uma oportunidade?",
  },
};
