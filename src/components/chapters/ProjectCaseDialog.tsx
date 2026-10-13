import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { Project } from "@/content/portfolioProjects";
import { PROJECT_IDENTITY } from "@/content/projectIdentity";
import { LINK_LABEL, linkLabel } from "./ProjectLinks";

export { LINK_LABEL };

const sans = { fontFamily: "'DM Sans', sans-serif" };
const display = { fontFamily: "'Playfair Display', Georgia, serif" };


/**
 * Case completo em <dialog> nativo: foco preso no diálogo, Esc fecha e o foco
 * volta ao botão que o abriu (comportamento do próprio navegador).
 */
export default function ProjectCaseDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  const id = project ? PROJECT_IDENTITY[project.slug] : null;

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(); // clique no backdrop
      }}
      aria-labelledby="case-title"
      className="case-dialog m-0 sm:m-auto w-full sm:w-[min(56rem,92vw)] h-[100svh] sm:h-auto sm:max-h-[88svh] max-w-none sm:max-w-[56rem] p-0 bg-[#FBF9F4] text-[#23241F] overflow-hidden backdrop:bg-[#23241F]/60 backdrop:backdrop-blur-sm"
    >
      {project && id && (
        <div className="flex flex-col h-full max-h-[100svh] sm:max-h-[88svh]">
          {/* Faixa na identidade do projeto */}
          <header className="relative flex items-start justify-between gap-4 px-6 sm:px-8 py-5" style={{ background: id.bg, color: id.ink }}>
            <div className="flex flex-col gap-1">
              <p className="text-[11px] uppercase tracking-[0.2em] opacity-80" style={sans}>
                {project.nature}
              </p>
              <h3 id="case-title" className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight" style={id.font ? { fontFamily: id.font } : display}>
                {project.name}
              </h3>
              <p className="text-sm opacity-85" style={sans}>
                {project.context}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={`Fechar case ${project.name}`}
              className="shrink-0 p-2 border border-current/30 hover:bg-white/15 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#B69AD9]"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
            <span aria-hidden="true" className="absolute left-0 right-0 bottom-0 h-1" style={{ background: id.accent }} />
          </header>

          <div className="overflow-y-auto px-6 sm:px-8 py-6 flex flex-col gap-6" style={sans}>
            <Block title="Problema">
              <p className="text-[clamp(1.1rem,2vw,1.4rem)] leading-snug italic" style={display}>
                {project.problem}
              </p>
            </Block>

            <Block title="Solução">
              <p className="leading-relaxed font-medium">{project.solution}</p>
              <p className="mt-3 leading-relaxed text-[#3A3A34]">{project.story}</p>
            </Block>

            {project.role && (
              <Block title="Minha atuação">
                <p className="leading-relaxed">{project.role}</p>
              </Block>
            )}

            <Block title="Engenharia aplicada">
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm leading-relaxed list-disc pl-4 marker:text-[#5B4A86]">
                {project.engineering.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </Block>

            <Block title={project.slug === "analise-dados" ? "Processo" : "Fluxo"}>
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
                {project.flow.map((step, i) => (
                  <li key={step} className="flex items-center gap-2">
                    <span className="px-2.5 py-1 border border-[#23241F]/25 bg-white">{step}</span>
                    {i < project.flow.length - 1 && <span aria-hidden="true" className="block size-1.5 rounded-full bg-[#5B4A86]" />}
                  </li>
                ))}
              </ol>
              {project.flowNote && <p className="mt-2 text-xs text-[#4B4B44]">{project.flowNote}</p>}
            </Block>

            <Block title="Tecnologias">
              <p className="text-sm leading-relaxed">{project.highlight.join(" · ")}</p>
            </Block>

            {project.evidence && (
              <Block title="Evidências no código">
                <ul className="flex flex-col gap-1 text-[13px]">
                  {project.evidence.map((e) => (
                    <li key={e} className="font-mono break-all text-[#2F2E2A]">
                      {e}
                    </li>
                  ))}
                </ul>
              </Block>
            )}


            <Block title="Links">
              <div className="flex flex-wrap gap-2 pb-2">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#23241F] text-[#F5F2E9] text-xs uppercase tracking-[0.16em] font-semibold hover:bg-[#5B4A86] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#B69AD9] focus-visible:ring-offset-2"
                  >
                    {linkLabel(l)}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                ))}
              </div>
            </Block>
          </div>
        </div>
      )}
    </dialog>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#5B4A86] font-semibold mb-1.5">{title}</h4>
      {children}
    </section>
  );
}
