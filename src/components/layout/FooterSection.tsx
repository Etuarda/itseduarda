import { useState, type FormEvent, type MouseEvent } from "react";
import { Download, Github, Linkedin, Mail, Send, Trash2, Copy, Clock } from "lucide-react";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import type { ContactMessage } from "@/types/contact";
import ToastNotification from "@/components/ui/ToastNotification";
import { OvalMonogramSeal } from "@/components/ui/HandDrawnElements";

type OpportunityType =
  | ""
  | "Contratação"
  | "Projeto freelancer"
  | "Consultoria"
  | "Conversa profissional";

export default function FooterSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [opportunityType, setOpportunityType] = useState<OpportunityType>("");
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [messages, setMessages] = useLocalStorageState<ContactMessage[]>("eduarda_portfolio_messages", []);
  const [showInbox, setShowInbox] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ title: string; sub?: string } | null>(null);

  const corporateEmail = "itseduardasilva@gmail.com";
  const resumeUrl = "/Eduarda- Curriculo-Full-Stack(6).pdf";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(corporateEmail);
    setToastMessage({
      title: "E-mail copiado para a área de transferência!",
      sub: `${corporateEmail} foi copiado com sucesso.`,
    });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) {
      errors.name = "Por favor, informe seu nome.";
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Por favor, informe um e-mail válido.";
    }
    if (!opportunityType) {
      errors.opportunityType = "Selecione o tipo de oportunidade.";
    }
    if (!text.trim()) {
      errors.text = "Escreva uma mensagem antes de enviar.";
    }
    return errors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    try {
      const subject = `[${opportunityType}] Contato via Portfólio de ${name}`;
      const body = `Nome: ${name}\nE-mail: ${email}\nTipo de Oportunidade: ${opportunityType}\n\nMensagem:\n${text}`;
      const mailto = `mailto:${corporateEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;

      const newMessage: ContactMessage = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        text: `[${opportunityType}] ${text}`,
        date: new Date().toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages([newMessage, ...messages]);

      setName("");
      setEmail("");
      setOpportunityType("");
      setText("");

      // Feedback exato da Seção 75 do Guia Mestre
      setToastMessage({
        title: "Mensagem preparada. Obrigada pelo contato.",
        sub: "O cliente de e-mail foi aberto com seu recado.",
      });
    } catch {
      // Feedback de erro da Seção 75 do Guia Mestre
      setToastMessage({
        title: "Não consegui concluir o envio por aqui.",
        sub: "Você ainda pode entrar em contato diretamente por e-mail.",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setToastMessage(null), 5000);
    }
  };

  const handleDeleteMessage = (id: string, e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setMessages(messages.filter((message) => message.id !== id));
  };

  return (
    <footer id="contato" className="w-full relative mt-6 md:mt-10 pt-8 pb-10 bg-transparent text-[#1C1A18] overflow-hidden border-t border-[#465B20]/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Grid Principal: Informações & Formulário (Seções 68 a 75) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch mb-10">
          
          {/* Coluna Esquerda: Informações e Contato Direto (Seções 68 a 72) */}
          <div className="botanical-card texture-paper rounded-3xl p-5 sm:p-8 md:p-9 relative shadow-xs flex flex-col justify-between border border-[#465B20]/25 bg-[#FAF8F5] h-full">
            <div>
              <div className="inline-flex items-center mb-3 px-3.5 py-1 rounded-full bg-white border border-[#465B20]/30 shadow-2xs">
                <span className="text-[10px] font-mono uppercase tracking-[0.20em] text-[#2A3614] font-bold">
                  CONTATO
                </span>
              </div>

              {/* Headline (Seção 68 do Guia Mestre) */}
              <h3 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-[#1C1A18] tracking-tight mb-3">
                Tem um problema interessante para{" "}
                <span
                  className="text-3xl sm:text-4xl lg:text-5xl text-[#465B20] select-none inline-block font-normal"
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                >
                  resolver?
                </span>
              </h3>

              {/* Corpo (Seção 68 do Guia Mestre) */}
              <div className="space-y-3 font-sans text-xs sm:text-sm text-[#383531] font-normal leading-relaxed mb-6">
                <p>
                  Estou aberta a oportunidades em Back-end, Full Stack, Dados e IA Aplicada nas quais eu possa aprender, assumir responsabilidades e contribuir com entregas reais.
                </p>
                <p>
                  Procuro equipes que valorizem qualidade técnica, comunicação clara, colaboração e evolução contínua.
                </p>
                <p className="text-[#1C1A18] font-medium">
                  Se esse perfil fizer sentido para sua equipe, podemos começar com uma conversa.
                </p>
              </div>

              {/* Status de Disponibilidade (Seção 69: Ponto estático, sem animação contínua) */}
              <div className="flex flex-col gap-2 mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#465B20]/15 border border-[#465B20]/30 text-[#2A3614] text-xs font-sans font-semibold w-fit">
                  <span className="w-2 h-2 rounded-full bg-[#465B20]" />
                  <span>Aberta a oportunidades profissionais</span>
                </div>

                {/* Tempo de resposta (Seção 70) */}
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#4E4A45]">
                  <Clock className="w-3.5 h-3.5 text-[#465B20]" />
                  <span>Tempo médio de resposta: até 24 horas.</span>
                </div>
              </div>

              {/* Bloco de E-mail Direto (Seção 71 do Guia Mestre) */}
              <div className="p-4 rounded-2xl bg-white border border-[#465B20]/25 mb-6 shadow-2xs">
                <span className="font-serif font-bold text-sm text-[#1C1A18] block mb-1">
                  Prefere falar diretamente por e-mail?
                </span>
                <p className="font-sans text-xs text-[#4E4A45] mb-3">
                  Você pode copiar meu endereço ou abrir seu aplicativo de e-mail.
                </p>

                <div className="flex flex-col min-[380px]:flex-row items-stretch min-[380px]:items-center justify-between gap-2.5 p-2.5 rounded-xl bg-[#FAF8F5] border border-[#465B20]/20">
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-4 h-4 text-[#465B20] shrink-0" />
                    <span className="font-mono text-xs text-[#1C1A18] font-bold truncate">
                      {corporateEmail}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="px-3 py-1.5 rounded-full bg-white border border-[#465B20]/30 text-[#1C1A18] hover:bg-[#FAF8F5] font-sans text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                      title="Copiar e-mail"
                    >
                      <Copy className="w-3 h-3 text-[#465B20]" /> Copiar e-mail
                    </button>
                    <a
                      href={`mailto:${corporateEmail}`}
                      className="px-3 py-1.5 rounded-full bg-[#465B20] text-[#F7F6F2] hover:bg-[#2A3614] font-sans text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                      title="Abrir e-mail"
                    >
                      Abrir e-mail
                    </a>
                  </div>
                </div>
              </div>

              {/* Redes Profissionais (Seção 72 do Guia Mestre) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href="https://github.com/Etuarda"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white border border-[#465B20]/25 hover:border-[#465B20]/60 transition-all group shadow-2xs"
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[#1C1A18] font-bold text-xs font-sans">
                    <Github className="w-4 h-4 text-[#465B20] group-hover:scale-110 transition-transform" />
                    <span>GitHub</span>
                  </div>
                  <p className="font-sans text-[11px] text-[#4E4A45] leading-snug">
                    Código, projetos públicos e experimentos técnicos.
                  </p>
                </a>

                <a
                  href="https://www.linkedin.com/in/itseduarda"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white border border-[#465B20]/25 hover:border-[#465B20]/60 transition-all group shadow-2xs"
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[#1C1A18] font-bold text-xs font-sans">
                    <Linkedin className="w-4 h-4 text-[#465B20] group-hover:scale-110 transition-transform" />
                    <span>LinkedIn</span>
                  </div>
                  <p className="font-sans text-[11px] text-[#4E4A45] leading-snug">
                    Experiência, formação e atualizações profissionais.
                  </p>
                </a>

                <a
                  href={resumeUrl}
                  download="Eduarda- Curriculo-Full-Stack(6).pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white border border-[#465B20]/25 hover:border-[#465B20]/60 transition-all group shadow-2xs"
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[#1C1A18] font-bold text-xs font-sans">
                    <Download className="w-4 h-4 text-[#465B20] group-hover:scale-110 transition-transform" />
                    <span>Currículo</span>
                  </div>
                  <p className="font-sans text-[11px] text-[#4E4A45] leading-snug">
                    Versão em PDF com experiência, formação e tecnologias.
                  </p>
                </a>
              </div>
            </div>

            {/* Selo Monograma Nobre */}
            <div className="mt-6 pt-5 border-t border-[#465B20]/20 flex flex-col items-center justify-center gap-1 relative z-10">
              <OvalMonogramSeal variant="light" initials="ES" yearLeft="20" yearRight="26" />
            </div>
          </div>

          {/* Coluna Direita: Formulário de Contato (Seções 73, 74 & 75 do Guia Mestre) */}
          <div
            id="formulario-contato"
            className="texture-brushed-olive rounded-3xl p-5 sm:p-8 md:p-9 shadow-[0_20px_50px_-15px_rgba(58,68,35,0.45)] relative border border-[#728464]/35 overflow-hidden flex flex-col justify-between h-full"
          >
            <div>
              {/* Cabeçalho do Formulário (Seção 73) */}
              <div className="text-center mb-5 border-b border-[#F7F6F2]/15 pb-4 relative z-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.20em] text-[#E8ECE0]/80 block mb-1">
                  MENSAGEM DIRETA
                </span>
                <h3 className="font-serif font-light text-2xl sm:text-3xl text-[#F7F6F2] tracking-tight leading-none">
                  Vamos iniciar uma{" "}
                  <span
                    className="text-3xl sm:text-4xl text-[#E6C4C1] select-none inline-block ml-1"
                    style={{ fontFamily: "'Great Vibes', cursive" }}
                  >
                    conversa
                  </span>
                </h3>
                <p className="font-sans text-xs text-[#E8ECE0]/80 mt-2">
                  Conte um pouco sobre a vaga, projeto ou desafio que sua equipe precisa resolver.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {/* Campo 1: Nome (Seção 74) */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="form-name" className="font-sans text-[11px] uppercase tracking-wider text-[#E8ECE0] font-medium">
                      Nome
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (formErrors.name) setFormErrors({ ...formErrors, name: "" });
                      }}
                      placeholder="Como posso te chamar?"
                      className="w-full bg-black/20 border border-white/20 focus:border-white/70 focus:bg-black/35 rounded-xl px-3.5 py-2.5 font-sans text-base sm:text-xs text-white placeholder:text-white/40 outline-none transition-colors"
                    />
                    {formErrors.name && (
                      <span className="text-xs text-[#E6C4C1] font-sans">{formErrors.name}</span>
                    )}
                  </div>

                  {/* Campo 2: E-mail (Seção 74) */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="form-email" className="font-sans text-[11px] uppercase tracking-wider text-[#E8ECE0] font-medium">
                      E-mail
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (formErrors.email) setFormErrors({ ...formErrors, email: "" });
                      }}
                      placeholder="nome@empresa.com"
                      className="w-full bg-black/20 border border-white/20 focus:border-white/70 focus:bg-black/35 rounded-xl px-3.5 py-2.5 font-sans text-base sm:text-xs text-white placeholder:text-white/40 outline-none transition-colors"
                    />
                    {formErrors.email && (
                      <span className="text-xs text-[#E6C4C1] font-sans">{formErrors.email}</span>
                    )}
                  </div>
                </div>

                {/* Campo 3: Tipo de oportunidade (Seção 74) */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="form-opportunity" className="font-sans text-[11px] uppercase tracking-wider text-[#E8ECE0] font-medium">
                    Tipo de oportunidade
                  </label>
                  <select
                    id="form-opportunity"
                    value={opportunityType}
                    onChange={(e) => {
                      setOpportunityType(e.target.value as OpportunityType);
                      if (formErrors.opportunityType) setFormErrors({ ...formErrors, opportunityType: "" });
                    }}
                    className="w-full bg-black/20 border border-white/20 focus:border-white/70 focus:bg-black/35 rounded-xl px-3.5 py-2.5 font-sans text-base sm:text-xs text-white outline-none transition-colors cursor-pointer"
                  >
                    <option value="" className="bg-[#2A3614] text-white">Selecione uma opção</option>
                    <option value="Contratação" className="bg-[#2A3614] text-white">Contratação</option>
                    <option value="Projeto freelancer" className="bg-[#2A3614] text-white">Projeto freelancer</option>
                    <option value="Consultoria" className="bg-[#2A3614] text-white">Consultoria</option>
                    <option value="Conversa profissional" className="bg-[#2A3614] text-white">Conversa profissional</option>
                  </select>
                  {formErrors.opportunityType && (
                    <span className="text-xs text-[#E6C4C1] font-sans">{formErrors.opportunityType}</span>
                  )}
                </div>

                {/* Campo 4: Mensagem (Seção 74) */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="form-message" className="font-sans text-[11px] uppercase tracking-wider text-[#E8ECE0] font-medium">
                    Mensagem
                  </label>
                  <textarea
                    id="form-message"
                    rows={3}
                    value={text}
                    onChange={(e) => {
                      setText(e.target.value);
                      if (formErrors.text) setFormErrors({ ...formErrors, text: "" });
                    }}
                    placeholder="Conte um pouco sobre a oportunidade ou desafio."
                    className="w-full bg-black/20 border border-white/20 focus:border-white/70 focus:bg-black/35 rounded-xl p-3 font-sans text-base sm:text-xs text-white placeholder:text-white/40 outline-none transition-colors resize-none"
                  />
                  {formErrors.text && (
                    <span className="text-xs text-[#E6C4C1] font-sans">{formErrors.text}</span>
                  )}
                </div>

                {/* CTA do Formulário (Seção 75: Enviar mensagem / Enviando mensagem) */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[46px] bg-[#FAF8F5] hover:bg-white text-[#1C1A18] font-sans font-bold text-xs uppercase tracking-[0.18em] py-3 rounded-full transition-all duration-300 active:scale-98 shadow-md flex items-center justify-center gap-2 cursor-pointer mt-1 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Enviando mensagem</span>
                  ) : (
                    <>
                      <span>Enviar mensagem</span>
                      <Send className="w-3.5 h-3.5 text-[#465B20]" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Selo Monograma Nobre */}
            <div className="mt-6 pt-5 border-t border-white/15 flex flex-col items-center justify-center gap-1 relative z-10">
              <OvalMonogramSeal variant="dark" initials="ES" yearLeft="20" yearRight="26" />
            </div>

            {/* Gaveta de Mensagens Salvas Localmente */}
            {messages.length > 0 && (
              <div className="mt-5 pt-3 border-t border-[#465B20]/25">
                <button
                  type="button"
                  onClick={() => setShowInbox(!showInbox)}
                  className="font-sans text-[10px] uppercase font-bold tracking-widest text-[#2A3614] flex items-center gap-1 cursor-pointer"
                >
                  Gaveta de Recados ({messages.length}) {showInbox ? "▼" : "▶"}
                </button>

                {showInbox && (
                  <div className="mt-2.5 flex flex-col gap-2 max-h-44 overflow-y-auto pr-1 no-scrollbar">
                    {messages.map((m) => (
                      <div key={m.id} className="p-2.5 bg-white rounded-xl border border-[#465B20]/25 text-xs relative group flex flex-col gap-0.5 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="font-sans font-semibold text-[#1C1A18]">{m.name}</span>
                          <span className="font-sans text-[9px] text-[#4E4A45] font-semibold">{m.date}</span>
                        </div>
                        <span className="font-sans text-[10px] text-[#465B20] font-bold">{m.email}</span>
                        <p className="font-sans text-[11px] text-[#383531] mt-0.5 italic">"{m.text}"</p>

                        <button
                          type="button"
                          onClick={(e) => handleDeleteMessage(m.id, e)}
                          className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 text-[#4E4A45] hover:text-[#1C1A18] transition-all p-0.5"
                          title="Apagar recado"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Marca D'Água Tipográfica Editorial */}
        <div className="mt-5 pt-1 border-t border-[#465B20]/20 text-center select-none overflow-hidden">
          <h2 className="font-serif font-light text-[8vw] tracking-[0.2em] leading-none text-[#465B20]/20 uppercase">
            Eduarda
          </h2>
        </div>

        {/* FOOTER FINAL (Seções 76 e 77 do Guia Mestre) */}
        <div className="mt-4 pt-6 border-t border-[#465B20]/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-[#4E4A45] text-center md:text-left">
          <div className="flex flex-col gap-1">
            <span className="font-serif font-bold text-sm text-[#1C1A18]">
              Eduarda Silva Santos
            </span>
            <span className="text-[11px] font-mono text-[#2A3614] font-semibold">
              Full Stack • Back-end • Dados • IA Aplicada
            </span>
            <span className="text-xs text-[#383531]">
              Construindo software a partir de problemas que valem a pena entender.
            </span>
          </div>

          <div className="flex flex-col md:items-end gap-1.5">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#465B20]">
              <a href="https://github.com/Etuarda" target="_blank" rel="noreferrer" className="hover:text-[#2A3614]">GitHub</a>
              <span>•</span>
              <a href="https://www.linkedin.com/in/itseduarda" target="_blank" rel="noreferrer" className="hover:text-[#2A3614]">LinkedIn</a>
              <span>•</span>
              <a href={`mailto:${corporateEmail}`} className="hover:text-[#2A3614]">E-mail</a>
              <span>•</span>
              <a href={resumeUrl} target="_blank" rel="noreferrer" className="hover:text-[#2A3614]">Currículo</a>
            </div>
            <span className="font-medium text-[#1C1A18] text-[11px]">
              2026 — Eduarda Silva Santos
            </span>
            <span className="text-[10px] font-mono text-[#4E4A45]">
              Desenvolvido com React e TypeScript.
            </span>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <ToastNotification
        message={toastMessage?.title ?? null}
        subMessage={toastMessage?.sub}
        onClose={() => setToastMessage(null)}
      />
    </footer>
  );
}
