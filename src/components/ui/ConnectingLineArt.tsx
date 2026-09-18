import React from "react";

/**
 * Galho Botânico de Folhas Contínuo (Botanical Leaf Branch Vine)
 * 
 * Corre exclusivamente pelas bordas e margens externas laterais seguras da página,
 * contornando graciosamente todo o dossiê editorial:
 * - NUNCA cruza o miolo central (x: 100 a x: 900), onde residem títulos, nomes e imagens.
 * - Haste orgânica curva com folhas botânicas delicadas, nervuras e brotos naturais.
 * - Sem números binários, sem circuitos artificiais. 100% botânico.
 */

// Folha botânica com pecíolo e nervura central
function Leaf({
  x,
  y,
  angle,
  scale = 1,
  flip = false,
  opacity = 0.55,
}: {
  x: number;
  y: number;
  angle: number;
  scale?: number;
  flip?: boolean;
  opacity?: number;
}) {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${angle}) scale(${scale})`}>
      {/* Pecíolo / Haste da folha */}
      <path
        d="M 0 0 C 6 -3, 12 -2, 16 0"
        stroke="#3A4A1C"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Lâmina da Folha */}
      <path
        d={
          flip
            ? "M 14 0 C 26 -16, 46 -14, 52 0 C 46 10, 26 12, 14 0 Z"
            : "M 14 0 C 26 14, 46 12, 52 0 C 46 -12, 26 -10, 14 0 Z"
        }
        fill="#556B2F"
        fillOpacity={opacity}
        stroke="#2F3E14"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Nervura Central */}
      <path
        d="M 14 0 C 28 1, 40 0, 50 0"
        stroke="#2F3E14"
        strokeWidth="0.8"
        strokeOpacity={0.65}
        strokeLinecap="round"
      />
    </g>
  );
}

// Broto botânico ou pequena florzinha de nó
function Bud({ x, y, angle }: { x: number; y: number; angle: number }) {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${angle})`}>
      <path d="M 0 0 C 4 -2, 8 -3, 12 -2" stroke="#3A4A1C" strokeWidth="1" strokeLinecap="round" />
      <circle cx="12" cy="-2" r="2.5" fill="#465B20" fillOpacity="0.85" />
      <circle cx="15" cy="-2" r="1.8" fill="#728464" fillOpacity="0.75" />
    </g>
  );
}

export default function ConnectingLineArt() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
    >
      <svg
        viewBox="0 0 1000 4200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-full opacity-90 transition-opacity duration-1000"
      >
        <defs>
          {/* Gradiente natural da haste do galho em Verde Oliva & Sálvia */}
          <linearGradient id="branch-stem-grad" x1="0" y1="0" x2="0" y2="4200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#465B20" stopOpacity="0.45" />
            <stop offset="15%" stopColor="#556B2F" stopOpacity="0.65" />
            <stop offset="35%" stopColor="#3A4A1C" stopOpacity="0.70" />
            <stop offset="55%" stopColor="#465B20" stopOpacity="0.65" />
            <stop offset="75%" stopColor="#556B2F" stopOpacity="0.70" />
            <stop offset="90%" stopColor="#3A4A1C" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#465B20" stopOpacity="0.45" />
          </linearGradient>

          {/* Filtro sutil para textura orgânica */}
          <filter id="branch-softness" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="0.4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ====================================================================
            GALHO PRINCIPAL DA MARGEM DIREITA (x: 925 a 970)
            Corre estritamente na borda lateral direita, jamais entrando no centro
            onde ficam nomes, títulos ou fotos.
           ==================================================================== */}
        <path
          d="
            M 950 30
            C 930 200, 965 380, 945 560
            C 925 740, 960 920, 940 1100
            C 920 1280, 965 1460, 945 1640
            C 925 1820, 960 2000, 935 2180
            C 915 2360, 965 2540, 945 2720
            C 925 2900, 960 3080, 935 3260
            C 915 3440, 965 3620, 945 3800
            C 925 3960, 955 4080, 940 4180
          "
          stroke="url(#branch-stem-grad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#branch-softness)"
        />

        {/* ====================================================================
            GALHO DA MARGEM ESQUERDA (x: 30 a 75)
            Cria simetria e equilíbrio botânico na borda esquerda da página.
           ==================================================================== */}
        <path
          d="
            M 50 60
            C 70 240, 35 420, 55 600
            C 75 780, 40 960, 60 1140
            C 80 1320, 35 1500, 55 1680
            C 75 1860, 40 2040, 65 2220
            C 85 2400, 35 2580, 55 2760
            C 75 2940, 40 3120, 65 3300
            C 85 3480, 35 3660, 55 3840
            C 75 4000, 45 4100, 60 4180
          "
          stroke="url(#branch-stem-grad)"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#branch-softness)"
        />

        {/* ====================================================================
            FOLHAS BOTÂNICAS AO LONGO DO GALHO DIREITO
            Brotam para dentro e para fora nas bordas seguras
           ==================================================================== */}
        {/* Topo / Hero lateral */}
        <Leaf x={948} y={120} angle={-35} scale={0.9} flip={false} />
        <Leaf x={942} y={220} angle={150} scale={0.85} flip={true} />
        <Bud x={946} y={320} angle={-25} />
        <Leaf x={958} y={420} angle={-40} scale={0.95} flip={false} />
        <Leaf x={946} y={540} angle={145} scale={0.9} flip={true} />

        {/* Stacks lateral */}
        <Bud x={938} y={660} angle={135} />
        <Leaf x={952} y={780} angle={-35} scale={0.95} flip={false} />
        <Leaf x={944} y={920} angle={150} scale={0.85} flip={true} />
        <Bud x={948} y={1020} angle={-30} />
        <Leaf x={938} y={1140} angle={145} scale={0.9} flip={true} />

        {/* Projetos lateral */}
        <Leaf x={955} y={1280} angle={-45} scale={0.95} flip={false} />
        <Bud x={942} y={1390} angle={140} />
        <Leaf x={958} y={1500} angle={-30} scale={0.9} flip={false} />
        <Leaf x={944} y={1630} angle={155} scale={0.95} flip={true} />
        <Bud x={952} y={1740} angle={-20} />

        {/* Skills lateral */}
        <Leaf x={938} y={1870} angle={145} scale={0.9} flip={true} />
        <Leaf x={952} y={2010} angle={-40} scale={0.95} flip={false} />
        <Bud x={940} y={2130} angle={135} />
        <Leaf x={945} y={2270} angle={-35} scale={0.85} flip={false} />
        <Leaf x={938} y={2410} angle={150} scale={0.95} flip={true} />
        <Bud x={950} y={2540} angle={-25} />

        {/* Trajetória lateral */}
        <Leaf x={956} y={2680} angle={-45} scale={0.9} flip={false} />
        <Leaf x={940} y={2820} angle={140} scale={0.95} flip={true} />
        <Bud x={948} y={2950} angle={-30} />
        <Leaf x={954} y={3080} angle={-35} scale={0.85} flip={false} />
        <Leaf x={938} y={3220} angle={155} scale={0.9} flip={true} />

        {/* Footer lateral */}
        <Bud x={946} y={3360} angle={-25} />
        <Leaf x={952} y={3500} angle={-40} scale={0.95} flip={false} />
        <Leaf x={940} y={3640} angle={145} scale={0.9} flip={true} />
        <Bud x={948} y={3780} angle={-30} />
        <Leaf x={944} y={3920} angle={150} scale={0.85} flip={true} />
        <Leaf x={942} y={4060} angle={-35} scale={0.8} flip={false} />

        {/* ====================================================================
            FOLHAS BOTÂNICAS AO LONGO DO GALHO ESQUERDO
            Brotam harmonicamente na borda esquerda segura
           ==================================================================== */}
        <Leaf x={52} y={160} angle={35} scale={0.85} flip={false} />
        <Bud x={62} y={290} angle={-140} />
        <Leaf x={42} y={440} angle={-150} scale={0.9} flip={true} />
        <Leaf x={58} y={620} angle={40} scale={0.95} flip={false} />
        <Bud x={48} y={760} angle={-135} />

        <Leaf x={65} y={940} angle={30} scale={0.85} flip={false} />
        <Leaf x={45} y={1120} angle={-145} scale={0.9} flip={true} />
        <Bud x={60} y={1260} angle={45} />
        <Leaf x={52} y={1440} angle={35} scale={0.95} flip={false} />
        <Leaf x={44} y={1620} angle={-155} scale={0.85} flip={true} />

        <Bud x={64} y={1800} angle={-130} />
        <Leaf x={56} y={1980} angle={40} scale={0.9} flip={false} />
        <Leaf x={46} y={2160} angle={-140} scale={0.95} flip={true} />
        <Bud x={68} y={2320} angle={35} />
        <Leaf x={54} y={2500} angle={30} scale={0.85} flip={false} />

        <Leaf x={44} y={2700} angle={-150} scale={0.9} flip={true} />
        <Bud x={62} y={2880} angle={45} />
        <Leaf x={55} y={3060} angle={35} scale={0.95} flip={false} />
        <Leaf x={46} y={3240} angle={-145} scale={0.85} flip={true} />
        <Bud x={65} y={3420} angle={-135} />

        <Leaf x={54} y={3600} angle={40} scale={0.9} flip={false} />
        <Leaf x={46} y={3780} angle={-150} scale={0.85} flip={true} />
        <Bud x={62} y={3940} angle={30} />
        <Leaf x={58} y={4080} angle={35} scale={0.8} flip={false} />
      </svg>
    </div>
  );
}
