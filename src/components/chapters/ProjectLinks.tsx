import React from "react";
import type { LinkKind, ProjectLink } from "@/content/portfolioProjects";

/** Rótulos visíveis padronizados: repositório = "GitHub"; deploy/dashboard = "Ver projeto". */
export const LINK_LABEL: Record<LinkKind | "backend", string> = {
  deploy: "Ver projeto",
  dashboard: "Ver projeto",
  github: "GitHub",
  backend: "Backend",
  docs: "Documentação da API",
};

export const linkLabel = (l: ProjectLink) => (l.qualifier ? `${LINK_LABEL[l.kind]} · ${l.qualifier}` : LINK_LABEL[l.kind]);

/** Linha de links de um card: cada link do projeto, clicável. */
export function CardLinks({
  links,
  name,
  className = "",
  linkClassName,
}: {
  links: ProjectLink[];
  name: string;
  className?: string;
  linkClassName: string;
}) {
  return (
    <span className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 ${className}`}>
      {links.map((l) => (
        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
          {linkLabel(l)}
          <span className="sr-only"> de {name} (abre em nova aba)</span>
        </a>
      ))}
    </span>
  );
}
