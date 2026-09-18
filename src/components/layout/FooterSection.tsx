import { useState, type FormEvent, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Download, Github, Linkedin, Mail, Send, Trash2, Sparkles, Check, Copy } from "lucide-react";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import type { ContactMessage } from "@/types/contact";
import ToastNotification from "@/components/ui/ToastNotification";
import {
  OvalMonogramSeal,
} from "@/components/ui/HandDrawnElements";

export default function FooterSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [messages, setMessages] = useLocalStorageState<ContactMessage[]>("eduarda_portfolio_messages", []);
  const [showInbox, setShowInbox] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ title: string; sub?: string } | null>(null);

  const corporateEmail = "ettuarda@gmail.com";
  const resumeUrl = "/Eduarda- Curriculo-Full-Stack(6).pdf";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(corporateEmail);
    setToastMessage({
      title: "E-mail copiado com sucesso!",
      sub: "ettuarda@gmail.com está na sua área de transferência.",
    });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !text) return;

    const mailto = `mailto:${corporateEmail}?subject=${encodeURIComponent(
      `Contato via Portfólio de ${name}`
    )}&body=${encodeURIComponent(
      `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${text}`
    )}`;

    window.location.href = mailto;

    const newMessage: ContactMessage = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      text,
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
    setText("");
    setSubmitted(true);

    setToastMessage({
      title: "Mensagem registrada com sucesso!",
      sub: "O cliente de e-mail foi aberto com seu recado.",
    });

    setTimeout(() => {
      setSubmitted(false);
      setToastMessage(null);
    }, 4500);
  };

  const handleDeleteMessage = (id: string, e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setMessages(messages.filter((message) => message.id !== id));
  };

  return (
    <footer id="contato" className="w-full relative mt-3 md:mt-4 pt-3 pb-6 bg-transparent text-[#1C1A18] overflow-hidden border-t border-[#465B20]/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Coluna Esquerda: Informações e Contato Direto com Textura Papel */}
          <div className="botanical-card texture-paper rounded-3xl p-6 sm:p-8 md:p-9 relative shadow-xs flex flex-col justify-between border border-[#465B20]/25 bg-[#FAF8F5] h-full">
            <div>
              <h2 className="font-serif font-light text-3xl sm:text-4xl text-[#1C1A18] tracking-tight mb-2">
                Vamos{" "}
                <span
                  className="text-4xl sm:text-5xl text-[#9E6761] select-none inline-block ml-1"
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                >
                  Conversar?
                </span>
              </h2>

              <p className="font-sans text-xs sm:text-sm text-[#383531] font-normal leading-relaxed mb-5">
                Obrigada por explorar meu dossiê editorial. Se você busca uma desenvolvedora com foco em arquitetura limpa, dados e IA para sua equipe ou projeto, estou à disposição para conversarmos.
              </p>

              {/* Status de Disponibilidade */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#465B20]/10 border border-[#465B20]/20 text-[#2A3614] text-xs font-sans font-semibold mb-5">
                <span className="w-2 h-2 rounded-full bg-[#465B20] animate-pulse" />
                <span>Disponível para contratação & novos desafios</span>
              </div>

              {/* Botão de Cópia Rápida de E-mail */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#465B20]/25 mb-5 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="w-8 h-8 rounded-full bg-[#465B20]/15 flex items-center justify-center text-[#465B20] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="text-[10px] font-sans uppercase tracking-wider text-[#4E4A45] font-bold">
                      E-mail Corporativo:
                    </span>
                    <span className="font-mono text-xs text-[#1C1A18] truncate font-semibold">
                      {corporateEmail}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-full bg-[#465B20] hover:bg-[#2A3614] text-[#F7F6F2] font-sans text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs shrink-0"
                  title="Copiar e-mail"
                >
                  <Copy className="w-3 h-3" /> Copiar
                </button>
              </div>

              {/* Redes e Download */}
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="https://github.com/Etuarda"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-[#465B20]/30 hover:bg-[#1C1A18] hover:text-[#F7F6F2] text-[#1C1A18] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href="https://www.linkedin.com/in/itseduarda"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-[#465B20]/30 hover:bg-[#1C1A18] hover:text-[#F7F6F2] text-[#1C1A18] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href={`mailto:${corporateEmail}`}
                  className="w-10 h-10 rounded-full bg-white border border-[#465B20]/30 hover:bg-[#1C1A18] hover:text-[#F7F6F2] text-[#1C1A18] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                  title="Enviar E-mail"
                >
                  <Mail className="w-4 h-4" />
                </a>

                <a
                  href={resumeUrl}
                  download="Eduarda- Curriculo-Full-Stack(6).pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-full border border-[#465B20]/35 bg-white hover:bg-[#FAF8F5] text-[#1C1A18] flex items-center gap-1.5 text-xs font-sans font-semibold transition-all shadow-xs cursor-pointer"
                  title="Baixar Currículo em PDF"
                >
                  <Download className="w-3.5 h-3.5 text-[#465B20]" />
                  Baixar CV
                </a>
              </div>
            </div>

            {/* Selo Monograma Nobre (Harmonizado com a coluna da direita) */}
            <div className="mt-6 pt-5 border-t border-[#465B20]/20 flex flex-col items-center justify-center gap-1 relative z-10">
              <OvalMonogramSeal variant="light" initials="ES" yearLeft="20" yearRight="26" />
              <span className="font-handwriting text-xs text-[#4E4A45] mt-1 font-semibold">
            
              </span>
            </div>
          </div>

          {/* Coluna Direita: Cartão de Contato com Formulario */}
          <div className="texture-brushed-olive rounded-3xl p-6 sm:p-8 md:p-9 shadow-[0_20px_50px_-15px_rgba(58,68,35,0.45)] relative border border-[#728464]/35 overflow-hidden flex flex-col justify-between h-full">
            <div>
              {/* Cabeçalho */}
              <div className="text-center mb-5 border-b border-[#F7F6F2]/15 pb-4 relative z-10">
                <h3 className="font-serif font-light text-3xl sm:text-4xl text-[#F7F6F2] tracking-tight leading-none">
                  ARQUITETURA &{" "}
                  <span
                    className="text-4xl sm:text-5xl text-[#E6C4C1] select-none inline-block ml-1"
                    style={{ fontFamily: "'Great Vibes', cursive" }}
                  >
                    Propósito
                  </span>
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="form-name" className="font-sans text-[11px] uppercase tracking-wider text-[#E8ECE0] font-medium">
                      Seu Nome:
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Ana Silva"
                      className="w-full bg-black/20 border border-white/20 focus:border-white/70 focus:bg-black/35 rounded-xl px-3.5 py-2.5 font-sans text-xs text-white placeholder:text-white/40 outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="form-email" className="font-sans text-[11px] uppercase tracking-wider text-[#E8ECE0] font-medium">
                      Seu E-mail:
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seuemail@empresa.com"
                      className="w-full bg-black/20 border border-white/20 focus:border-white/70 focus:bg-black/35 rounded-xl px-3.5 py-2.5 font-sans text-xs text-white placeholder:text-white/40 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="form-message" className="font-sans text-[11px] uppercase tracking-wider text-[#E8ECE0] font-medium">
                    Mensagem ou Proposta:
                  </label>
                  <textarea
                    id="form-message"
                    required
                    rows={3}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Olá Eduarda! Vimos seus projetos e temos uma oportunidade com foco em..."
                    className="w-full bg-black/20 border border-white/20 focus:border-white/70 focus:bg-black/35 rounded-xl p-3 font-sans text-xs text-white placeholder:text-white/40 outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FAF8F5] hover:bg-white text-[#1C1A18] font-sans font-bold text-xs uppercase tracking-[0.18em] py-3 rounded-full transition-all duration-300 active:scale-98 shadow-md flex items-center justify-center gap-2 cursor-pointer mt-1"
                >
                  Enviar Mensagem <Send className="w-3.5 h-3.5 text-[#465B20]" />
                </button>
              </form>
            </div>

            {/* Selo Monograma Nobre (Reference 1: 20 [ES] 26) */}
            <div className="mt-6 pt-5 border-t border-white/15 flex flex-col items-center justify-center gap-1 relative z-10">
              <OvalMonogramSeal variant="dark" initials="ES" yearLeft="20" yearRight="26" />
              <span className="font-handwriting text-xs text-[#E8ECE0]/85 mt-1 font-semibold">
              
              </span>
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

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] font-sans text-[#4E4A45] font-medium mt-2 pt-3 border-t border-[#465B20]/15 gap-2">
          <span>Eduarda Silva Santos • Engenharia de Software Full Stack & IA</span>
          <span>© 2026 • Portfólio Editorial & Guia Beija-Flor</span>
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
