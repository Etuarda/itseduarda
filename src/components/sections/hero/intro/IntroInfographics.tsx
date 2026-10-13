import React from "react";
import { CREDENTIAL_HUBS, FORMACAO_PERIOD } from "../heroData";

// Infográficos do palco de apresentação. Apenas apresentação: a coreografia anima
// os ganchos `data-ig` e os números `data-count` (o texto final já vem renderizado).

const hub = (id: "formacao" | "residencias" | "intensivas") => CREDENTIAL_HUBS.find((h) => h.id === id)!;

/** Núcleo 01 — linha do tempo 2024 → 2027 com o ponto "Em andamento". */
export function TimelineGraphic() {
  const { start, end } = FORMACAO_PERIOD;
  const span = end.getTime() - start.getTime();
  const at = (date: Date) => Math.min(1, Math.max(0, (date.getTime() - start.getTime()) / span));
  const progress = at(new Date());
  // Marcos no início de cada ano, na posição real do calendário
  const years = [2024, 2025, 2026, 2027].map((y) => ({ y, pos: at(new Date(y, 0, 1)) }));
  const axes = hub("formacao").items[0].skills;

  return (
    <div className="w-full flex flex-col gap-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="relative pt-10 pb-8">
        <div data-ig="track" className="h-px w-full bg-[#58644B]/35 origin-left" />
        <div
          data-ig="fill"
          className="absolute left-0 top-10 h-[3px] -mt-px bg-[#58644B] origin-left"
          style={{ width: `${progress * 100}%` }}
        />
        <div
          data-ig="marker"
          className="absolute top-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          style={{ left: `${progress * 100}%` }}
        >
          <span className="block w-3.5 h-3.5 rounded-full bg-[#B69AD9] ring-4 ring-[rgba(182,154,217,0.25)]" />
          <span className="absolute bottom-6 whitespace-nowrap text-[11px] uppercase tracking-[0.18em] text-[#44503A] font-semibold">
            Em andamento
          </span>
        </div>
        {years.map(({ y, pos }) => (
          <span
            key={y}
            data-ig="tick"
            className="absolute top-10 flex flex-col items-start gap-2 text-xs sm:text-sm tabular-nums text-[#4B4B44]"
            style={{ left: `${pos * 100}%` }}
          >
            <span className="block w-px h-2.5 bg-[#58644B]/50" />
            {y}
          </span>
        ))}
      </div>
      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        {axes.map((axis) => (
          <li key={axis} data-ig="chip" className="text-sm sm:text-base text-[#44503A]">
            {axis}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Núcleo 02 — grafo Dados · IA · RAG; FDTE/USP com 360h. */
export function GraphGraphic() {
  const [dados, ia, rag] = hub("residencias").items;
  const nodes = [
    { x: 95, y: 210, item: dados },
    { x: 250, y: 60, item: ia },
    { x: 405, y: 210, item: rag },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 2],
  ];

  return (
    <svg viewBox="0 0 500 300" className="w-full h-auto overflow-visible" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {edges.map(([a, b]) => (
        <line
          key={`${a}${b}`}
          data-ig="edge"
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="rgba(245,242,233,0.45)"
          strokeWidth="1.2"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="0"
        />
      ))}
      {/* núcleo central: os três programas formam uma única base aplicada */}
      <circle data-ig="node" cx="250" cy="160" r="5" fill="#B69AD9" />
      {nodes.map(({ x, y, item }) => (
        <g key={item.title} data-ig="node-group">
          <circle data-ig="node" cx={x} cy={y} r="9" fill="#F5F2E9" />
          <circle cx={x} cy={y} r="18" fill="none" stroke="rgba(182,154,217,0.55)" strokeWidth="1" />
          <text
            data-ig="label"
            x={x}
            y={y > 100 ? y + 46 : y - 34}
            textAnchor="middle"
            fill="#F5F2E9"
            fontSize="17"
            fontWeight="600"
          >
            {item.title}
          </text>
          <text
            data-ig="label"
            x={x}
            y={y > 100 ? y + 68 : y - 14}
            textAnchor="middle"
            fill="rgba(245,242,233,0.75)"
            fontSize="13"
            letterSpacing="1.5"
          >
            {item.institution.replace(/\s*\(.*\)/, "").replace("Instituto ", "").toUpperCase()}
            {item.hoursNumber && (
              <>
                {" · "}
                <tspan data-count={item.hoursNumber} data-suffix="h" fill="#C9B3E6" fontWeight="700">
                  {item.hours}
                </tspan>
              </>
            )}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Núcleo 03 — horas das formações intensivas em barras proporcionais. */
export function BarsGraphic() {
  const items = [...hub("intensivas").items].sort((a, b) => (b.hoursNumber ?? 0) - (a.hoursNumber ?? 0));
  const max = items[0]?.hoursNumber ?? 1;

  return (
    <ul className="w-full flex flex-col gap-4 sm:gap-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {items.map((item) => (
        <li key={item.title} className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.5 items-end">
          <span className="text-sm sm:text-base text-[#23241F] leading-tight">
            <span className="font-semibold">{item.title.replace("Desenvolvimento de Software · ", "")}</span>
            <span className="text-[#4B4B44]"> · {item.institution}</span>
          </span>
          <span
            className="text-lg sm:text-2xl font-bold tabular-nums text-[#44503A]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            <span
              data-count={item.hoursNumber}
              data-suffix={item.hours?.replace(/[0-9.]/g, "") ?? "h"}
            >
              {item.hours}
            </span>
          </span>
          <span className="col-span-2 h-2 bg-[rgba(88,100,75,0.14)]">
            <span
              data-ig="bar"
              className="block h-full bg-[#58644B] origin-left"
              style={{ width: `${((item.hoursNumber ?? 0) / max) * 100}%` }}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}
