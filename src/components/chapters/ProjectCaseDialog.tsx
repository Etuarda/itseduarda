import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { Project } from "@/content/portfolioProjects";
import { PROJECT_IDENTITY } from "@/content/projectIdentity";

const sans = { fontFamily: "'DM Sans', sans-serif" };
const display = { fontFamily: "'Playfair Display', Georgia, serif" };

export const LINK_LABEL: Record<string, string> = {
  deploy: "Deploy",
  github: "GitHub",
  backend: "Backend",
  dashboard: "Dashboard",
};

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
                {project.kind}
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
            <section>
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#5B4A86] font-semibold mb-1.5">Problema</h4>
              <p className="text-[clamp(1.1rem,2vw,1.4rem)] leading-snug italic" style={display}>
                {project.problem}
              </p>
            </section>

            {project.origin && (
              <section>
                <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#5B4A86] font-semibold mb-1.5">Origem</h4>
                <p className="leading-relaxed">{project.origin}</p>
              </section>
            )}

            <section>
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#5B4A86] font-semibold mb-1.5">Solução</h4>
              <p className="leading-relaxed">{project.solution}</p>
            </section>

            {project.role && (
              <section>
                <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#5B4A86] font-semibold mb-1.5">Minha atuação</h4>
                <p className="leading-relaxed">{project.role}</p>
              </section>
            )}

            {project.flow && (
              <section>
                <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#5B4A86] font-semibold mb-2">
                  {project.slug === "analise-dados" ? "Processo" : "Fluxo"}
                </h4>
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
                  {project.flow.map((step, i) => (
                    <li key={step} className="flex items-center gap-2">
                      <span className="px-2.5 py-1 border border-[#23241F]/25 bg-white">{step}</span>
                      {i < project.flow!.length - 1 && <span aria-hidden="true" className="text-[#5B4A86]">→</span>}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {project.proofs && (
              <section>
                <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#5B4A86] font-semibold mb-2">Provas</h4>
                <dl className="grid grid-cols-3 gap-3">
                  {project.proofs.map((p) => (
                    <div key={p.label} className="border-l-2 border-[#5B4A86] pl-3">
                      <dt className="sr-only">{p.label}</dt>
                      <dd className="text-[clamp(1.4rem,3vw,2rem)] font-bold leading-none tabular-nums" style={display}>
                        {p.value}
                      </dd>
                      <dd className="text-xs text-[#4B4B44] mt-1">{p.label}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            <section>
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#5B4A86] font-semibold mb-2">Stack</h4>
              <p className="text-sm leading-relaxed">{project.stack.join(" · ")}</p>
            </section>

            <section className="flex flex-wrap gap-2 pb-2">
              {Object.entries(project.links).map(([kind, href]) => (
                <a
                  key={kind}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#23241F] text-[#F5F2E9] text-xs uppercase tracking-[0.16em] font-semibold hover:bg-[#5B4A86] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#B69AD9] focus-visible:ring-offset-2"
                >
                  {LINK_LABEL[kind] ?? kind} <span aria-hidden="true">↗</span>
                  <span className="sr-only">(abre em nova aba)</span>
                </a>
              ))}
            </section>
          </div>
        </div>
      )}
    </dialog>
  );
}
