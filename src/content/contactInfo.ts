// 06 — Contato

export type ContactLink = { id: string; label: string; value: string; href: string; download?: boolean };

export const CONTACT = {
  kicker: "Contato",
  title: { lead: "Vamos transformar o próximo problema em ", accent: "solução", tail: "?" },
  text: "Aberta a oportunidades em desenvolvimento Full Stack, backend, dados e IA aplicada.",
  email: "ettuarda@gmail.com",
  links: [
    { id: "email", label: "E-mail", value: "ettuarda@gmail.com", href: "mailto:ettuarda@gmail.com" },
    { id: "linkedin", label: "LinkedIn", value: "in/itseduarda", href: "https://www.linkedin.com/in/itseduarda" },
    { id: "github", label: "GitHub", value: "Etuarda", href: "https://github.com/Etuarda" },
    { id: "onvagas", label: "OnVagas", value: "onvagas.com.br", href: "https://onvagas.com.br/" },
    {
      id: "cv",
      label: "Currículo",
      value: "Baixar PDF",
      href: `/${encodeURIComponent("Eduarda- Curriculo-Full-Stack(6).pdf")}`,
      download: true,
    },
  ] as ContactLink[],
};

/**
 * Caixa de mensagem: o site é estático, então o envio passa pelo FormSubmit
 * (formsubmit.co), que encaminha cada mensagem por e-mail ao destinatário.
 * Na PRIMEIRA mensagem o FormSubmit envia um e-mail de ativação para este endereço:
 * é preciso clicar em "Activate Form" uma única vez para começar a receber.
 */
export const CONTACT_FORM = {
  recipient: "ettuarda@gmail.com",
  endpoint: (to: string) => `https://formsubmit.co/ajax/${to}`,
  subject: "Portfólio: nova mensagem",
  limits: { name: 80 },
};
