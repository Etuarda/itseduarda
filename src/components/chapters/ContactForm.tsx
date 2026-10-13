import React, { useId, useState } from "react";
import { CONTACT_FORM } from "@/content/contactInfo";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full bg-[#F5F2E9]/[0.06] border border-[#F5F2E9]/30 px-3.5 py-2.5 text-[#F5F2E9] placeholder:text-[#DAD6CA]/60 outline-none focus:border-[#C9B3E6] focus-visible:ring-2 focus-visible:ring-[#C9B3E6]/60 transition-colors";
const label = "text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B5C29C]";

/** Caixa de mensagem → e-mail da Eduarda (via FormSubmit, ver content/contactInfo.ts). */
export default function ContactForm() {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const mailtoFallback = `mailto:${CONTACT_FORM.recipient}?subject=${encodeURIComponent(CONTACT_FORM.subject)}&body=${encodeURIComponent(
    `${values.message}\n\nDe: ${values.name} (${values.email}${values.phone ? `, ${values.phone}` : ""})`,
  )}`;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    // honeypot: robôs preenchem o campo invisível; pessoas não
    if ((form.elements.namedItem("_honey") as HTMLInputElement)?.value) return;

    setStatus("sending");
    try {
      const res = await fetch(CONTACT_FORM.endpoint(CONTACT_FORM.recipient), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          message: values.message,
          _replyto: values.email,
          _subject: `${CONTACT_FORM.subject} de ${values.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: string | boolean };
      if (!res.ok || String(data.success) !== "true") throw new Error("envio recusado");
      setStatus("sent");
      setValues({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate={false} aria-describedby={`${uid}-status`} className="flex flex-col gap-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${uid}-name`} className={label}>
            Nome
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            required
            autoComplete="name"
            maxLength={CONTACT_FORM.limits.name}
            value={values.name}
            onChange={onChange}
            className={field}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${uid}-email`} className={label}>
            E-mail
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={onChange}
            className={field}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${uid}-phone`} className={label}>
          Telefone / WhatsApp <span className="normal-case tracking-normal font-normal text-[#DAD6CA]/70"></span>
        </label>
        <input
          id={`${uid}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          value={values.phone}
          onChange={onChange}
          className={field}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${uid}-message`} className={label}>
          Mensagem
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          required
          rows={4}
          value={values.message}
          onChange={onChange}
          placeholder="Conte sobre a vaga, o projeto ou o problema que você quer resolver."
          className={`${field} resize-none h-[clamp(4.5rem,11svh,9rem)]`}
        />
      </div>
      {/* honeypot anti-spam: fora da tela e da árvore de acessibilidade */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] w-px h-px opacity-0" />

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#C9B3E6] text-[#161B12] text-xs uppercase tracking-[0.18em] font-semibold hover:bg-[#F5F2E9] disabled:opacity-60 disabled:cursor-wait transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#F5F2E9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161B12]"
        >
          {status === "sending" ? "Enviando…" : "Enviar mensagem"}
        </button>
        <p id={`${uid}-status`} role="status" aria-live="polite" className="text-sm text-[#DAD6CA]">
          {status === "sent" && "Mensagem enviada. Obrigada, respondo em breve."}
          {status === "error" && (
            <>
              Não consegui enviar agora.{" "}
              <a href={mailtoFallback} className="underline underline-offset-4 text-[#C9B3E6] outline-none focus-visible:ring-2 focus-visible:ring-[#C9B3E6]">
                Enviar pelo seu e-mail
              </a>
            </>
          )}
        </p>
      </div>
    </form>
  );
}
