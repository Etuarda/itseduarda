import React, { useState, type FormEvent } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { Download, Github, Linkedin, Mail, Send, Copy, Check, ArrowRight } from "lucide-react";

export default function FooterSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const corporateEmail = "itseduardasilva@gmail.com";
  const resumeUrl = "/Eduarda- Curriculo-Full-Stack(6).pdf";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(corporateEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const subject = `Contato via Portfólio de ${name}`;
    const body = `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`;
    window.location.href = `mailto:${corporateEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 6000);
  };

  return (
    <footer
      id="contato"
      aria-label="Contato e Oportunidades"
      className="w-full py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-12 lg:px-16 text-[#FAF8F5] relative select-text"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16 relative z-10">
        
        {/* 1. Título Editorial Puro (Em modo claro sobre fundo noturno) */}
        <SectionTitle
          index="06"
          title="Contato"
          scriptAccent="vamos conversar?"
          align="left"
          lightMode={true}
          subtitle="Estou disponível para contratação em Back-end, Full Stack e Dados/IA. Vamos discutir como posso agregar valor técnico à sua equipe."
        />

        {/* 2. Grid Editorial de Fechamento (2 colunas assimétricas) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* COLUNA ESQUERDA: CANAIS DIRETOS & CONVERSÃO (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#C5D9A5] font-bold">
                Contato Direto
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#FAF8F5] leading-snug">
                Sem intermediários.
                <br />
                <span className="text-[#C5D9A5]">Resposta ágil em até 24 horas.</span>
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#E2DFD8] leading-relaxed">
                Priorizo comunicação clara, alinhamento de expectativas e transparência desde o primeiro contato.
              </p>
            </div>

            {/* Caixa de Cópia Rápida de E-mail */}
            <div className="p-4 border border-[#C5D9A5]/30 bg-[#263118]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C5D9A5] shrink-0" />
                <span className="font-mono text-xs sm:text-sm text-[#FAF8F5] select-all">
                  {corporateEmail}
                </span>
              </div>

              <button
                onClick={handleCopyEmail}
                className="px-3 py-1.5 bg-[#465B20] hover:bg-[#5C772A] text-[#FAF8F5] font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer self-start sm:self-auto active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#C5D9A5]" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>

            {/* Links Sociais e Currículo */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://linkedin.com/in/itseduardasilva"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 border border-[#C5D9A5]/30 hover:border-[#C5D9A5] hover:bg-[#C5D9A5]/10 text-[#FAF8F5] font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                <Linkedin className="w-4 h-4 text-[#C5D9A5]" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://github.com/Etuarda"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 border border-[#C5D9A5]/30 hover:border-[#C5D9A5] hover:bg-[#C5D9A5]/10 text-[#FAF8F5] font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                <Github className="w-4 h-4 text-[#C5D9A5]" />
                <span>GitHub</span>
              </a>

              <a
                href={resumeUrl}
                download="Eduarda- Curriculo-Full-Stack(6).pdf"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-[#C5D9A5] hover:bg-[#D5E5BC] text-[#16210F] font-mono text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-98"
              >
                <Download className="w-4 h-4" />
                <span>Baixar CV (PDF)</span>
              </a>
            </div>
          </div>

          {/* COLUNA DIREITA: FORMULÁRIO EDITORIAL DIRETO (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 border border-[#C5D9A5]/30 bg-[#222E15]/80 shadow-md flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs uppercase tracking-widest text-[#C5D9A5] font-bold">
                Envie uma Mensagem
              </span>
              <h4 className="font-serif font-bold text-xl sm:text-2xl text-[#FAF8F5]">
                Vamos conversar sobre uma oportunidade?
              </h4>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[#C5D9A5]">
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Ana Silva"
                    className="p-3 bg-[#16210F]/80 border border-[#C5D9A5]/30 focus:border-[#C5D9A5] text-[#FAF8F5] text-xs font-sans placeholder-[#FAF8F5]/40 outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[#C5D9A5]">
                    Seu E-mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ex: ana@empresa.com"
                    className="p-3 bg-[#16210F]/80 border border-[#C5D9A5]/30 focus:border-[#C5D9A5] text-[#FAF8F5] text-xs font-sans placeholder-[#FAF8F5]/40 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] uppercase tracking-wider text-[#C5D9A5]">
                  Mensagem ou Descrição da Oportunidade *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Conte um pouco sobre o projeto, time ou desafio técnico..."
                  className="p-3 bg-[#16210F]/80 border border-[#C5D9A5]/30 focus:border-[#C5D9A5] text-[#FAF8F5] text-xs font-sans placeholder-[#FAF8F5]/40 outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#465B20] hover:bg-[#5C772A] text-[#FAF8F5] font-mono text-xs uppercase font-bold tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98 self-start mt-2"
              >
                <span>Enviar Mensagem</span>
                <Send className="w-3.5 h-3.5" />
              </button>

              {sentSuccess && (
                <p className="font-mono text-xs text-[#C5D9A5] mt-2">
                  ✓ Mensagem preparada no seu cliente de e-mail. Obrigada pelo contato!
                </p>
              )}
            </form>
          </div>

        </div>

        {/* 3. Assinatura e Créditos Editoriais */}
        <div className="pt-8 border-t border-[#C5D9A5]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#FAF8F5]/70 text-xs font-mono">
          <span>Eduarda Silva Santos • Salvador, Bahia, Brasil</span>
          <span className="text-center">
            Desenvolvido com React 19, TypeScript, Tailwind CSS & Motion
          </span>
          <span>© {new Date().getFullYear()} • Todos os direitos reservados</span>
        </div>

      </div>
    </footer>
  );
}
