import React from "react";

/**
 * Único Galho Botânico de Folhas Contínuo (Single Weaving Botanical Branch Vine)
 * 
 * Um único galho botânico autêntico que percorre toda a página de forma fluida e orgânica:
 * - Cruza a tela suavemente nos espaços abertos de transição entre as seções (Gaps / divisores).
 * - NUNCA passa por baixo dos títulos das seções: na altura dos títulos, corre estritamente
 *   pelas margens laterais externas (x: 70-80 e x: 920-940), longe dos títulos centralizados.
 * - Haste com textura aquarelada, folhas botânicas delicadas com pecíolos e nervuras centrais,
 *   além de brotinhos naturais.
 * - Sem números binários, sem circuitos artificiais. 100% botânico.
 */

// Folha botânica com pecíolo e nervura central
function Leaf({
  x,
  y,
  angle,
  scale = 1,
  flip = false,
  opacity = 0.32,
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
        className="w-full h-full opacity-20 sm:opacity-28 transition-opacity duration-1000"
      >
        <defs>
          {/* Gradiente sutil da haste do galho único como gravura botânica delicada */}
          <linearGradient id="single-branch-grad" x1="0" y1="0" x2="0" y2="4200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#465B20" stopOpacity="0.25" />
            <stop offset="18%" stopColor="#556B2F" stopOpacity="0.35" />
            <stop offset="38%" stopColor="#3A4A1C" stopOpacity="0.40" />
            <stop offset="58%" stopColor="#465B20" stopOpacity="0.35" />
            <stop offset="78%" stopColor="#556B2F" stopOpacity="0.40" />
            <stop offset="92%" stopColor="#3A4A1C" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#465B20" stopOpacity="0.25" />
          </linearGradient>

          {/* Filtro sutil para textura orgânica de aquarela botânica */}
          <filter id="branch-softness" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="0.35" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ====================================================================
            O ÚNICO GALHO: VIDEIRA CONTÍNUA QUE CRUZA A TELA
            Trajeto:
            1. Topo Hero: Desce pela margem direita segura (x: 940, y: 50 a 760)
            2. Vão Hero ➔ Stacks: Cruza a tela da Direita para a Esquerda (y: 840-940)
            3. Stacks: Desce pela margem esquerda segura (x: 75, y: 980-1450)
            4. Vão Stacks ➔ Projetos: Cruza a tela da Esquerda para a Direita (y: 1510-1620)
            5. Projetos: Desce pela margem direita segura (x: 925, y: 1680-2180)
            6. Vão Projetos ➔ Skills: Cruza a tela da Direita para a Esquerda (y: 2240-2340)
            7. Skills: Desce pela margem esquerda segura (x: 75, y: 2400-2960)
            8. Vão Skills ➔ Trajetória: Cruza a tela da Esquerda para a Direita (y: 3020-3140)
            9. Trajetória: Desce pela margem direita segura (x: 925, y: 3200-3700)
            10. Conclusão Footer: Suave desfecho em direção ao rodapé (y: 3780-4180)
           ==================================================================== */}
        <path
          d="
            M 940 50
            C 920 220, 960 420, 940 640
            C 930 730, 905 790, 820 840
            C 720 895, 320 865, 170 910
            C 105 930, 75 970, 75 1060
            C 75 1180, 55 1310, 70 1410
            C 80 1470, 115 1520, 200 1555
            C 340 1610, 680 1570, 820 1610
            C 885 1630, 925 1670, 925 1760
            C 925 1880, 945 2010, 930 2130
            C 920 2200, 885 2250, 805 2285
            C 670 2340, 320 2305, 175 2345
            C 110 2365, 75 2405, 75 2490
            C 75 2610, 55 2740, 70 2860
            C 80 2940, 115 2995, 210 3040
            C 350 3100, 680 3060, 820 3105
            C 890 3125, 925 3165, 925 3250
            C 925 3370, 945 3500, 930 3620
            C 920 3690, 880 3740, 790 3790
            C 650 3870, 340 3950, 220 4050
            C 160 4100, 130 4150, 120 4180
          "
          stroke="url(#single-branch-grad)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#branch-softness)"
        />

        {/* ====================================================================
            FOLHAS E BROTOS BOTÂNICOS AO LONGO DO ÚNICO GALHO
           ==================================================================== */}
        {/* 1. Hero (Margem Direita Segura) */}
        <Leaf x={938} y={120} angle={-35} scale={0.9} flip={false} />
        <Leaf x={946} y={230} angle={150} scale={0.85} flip={true} />
        <Bud x={940} y={350} angle={-25} />
        <Leaf x={948} y={480} angle={-40} scale={0.95} flip={false} />
        <Leaf x={936} y={620} angle={145} scale={0.9} flip={true} />
        <Bud x={942} y={730} angle={-20} />

        {/* 2. Travessia 1: Hero ➔ Stacks (Direita para Esquerda, y: 840 a 930) */}
        <Leaf x={810} y={845} angle={160} scale={0.95} flip={true} />
        <Bud x={680} y={875} angle={-15} />
        <Leaf x={520} y={885} angle={-170} scale={1} flip={false} />
        <Leaf x={360} y={885} angle={155} scale={0.95} flip={true} />
        <Bud x={220} y={905} angle={-20} />

        {/* 3. Stacks (Margem Esquerda Segura) */}
        <Leaf x={72} y={1080} angle={35} scale={0.9} flip={false} />
        <Bud x={76} y={1190} angle={-140} />
        <Leaf x={68} y={1300} angle={-150} scale={0.95} flip={true} />
        <Leaf x={78} y={1410} angle={40} scale={0.9} flip={false} />

        {/* 4. Travessia 2: Stacks ➔ Projetos (Esquerda para Direita, y: 1530 a 1630) */}
        <Leaf x={190} y={1550} angle={25} scale={0.95} flip={false} />
        <Bud x={340} y={1595} angle={-160} />
        <Leaf x={500} y={1590} angle={15} scale={1} flip={true} />
        <Leaf x={660} y={1585} angle={-25} scale={0.95} flip={false} />
        <Bud x={800} y={1605} angle={150} />

        {/* 5. Projetos (Margem Direita Segura) */}
        <Leaf x={930} y={1780} angle={-35} scale={0.95} flip={false} />
        <Leaf x={940} y={1900} angle={150} scale={0.85} flip={true} />
        <Bud x={932} y={2020} angle={-25} />
        <Leaf x={938} y={2140} angle={145} scale={0.9} flip={true} />

        {/* 6. Travessia 3: Projetos ➔ Skills (Direita para Esquerda, y: 2260 a 2345) */}
        <Leaf x={800} y={2290} angle={160} scale={0.95} flip={true} />
        <Bud x={660} y={2320} angle={-20} />
        <Leaf x={500} y={2320} angle={-170} scale={1} flip={false} />
        <Leaf x={350} y={2325} angle={155} scale={0.95} flip={true} />
        <Bud x={200} y={2350} angle={-15} />

        {/* 7. Skills (Margem Esquerda Segura) */}
        <Leaf x={72} y={2510} angle={35} scale={0.9} flip={false} />
        <Bud x={76} y={2630} angle={-140} />
        <Leaf x={68} y={2750} angle={-150} scale={0.95} flip={true} />
        <Leaf x={78} y={2870} angle={40} scale={0.9} flip={false} />

        {/* 8. Travessia 4: Skills ➔ Trajetória (Esquerda para Direita, y: 3020 a 3130) */}
        <Leaf x={195} y={3035} angle={25} scale={0.95} flip={false} />
        <Bud x={350} y={3085} angle={-160} />
        <Leaf x={500} y={3080} angle={15} scale={1} flip={true} />
        <Leaf x={660} y={3075} angle={-25} scale={0.95} flip={false} />
        <Bud x={800} y={3100} angle={150} />

        {/* 9. Trajetória (Margem Direita Segura) */}
        <Leaf x={930} y={3280} angle={-35} scale={0.95} flip={false} />
        <Leaf x={940} y={3410} angle={150} scale={0.85} flip={true} />
        <Bud x={932} y={3530} angle={-25} />
        <Leaf x={936} y={3650} angle={145} scale={0.9} flip={true} />

        {/* 10. Conclusão ao Rodapé (y: 3780 a 4180) */}
        <Leaf x={780} y={3800} angle={155} scale={0.9} flip={true} />
        <Bud x={620} y={3880} angle={-30} />
        <Leaf x={450} y={3935} angle={145} scale={0.85} flip={true} />
        <Bud x={300} y={4000} angle={-20} />
        <Leaf x={190} y={4070} angle={-45} scale={0.8} flip={false} />
        <Leaf x={120} y={4170} angle={140} scale={0.75} flip={true} />
      </svg>
    </div>
  );
}


