import React from "react";

/**
 * Galho Botânico de Folhas Contínuo & Entrelaçado (Weaving Botanical Branch Vines)
 * 
 * Os galhos cruzam a tela suavemente nos espaços de transição entre as seções (intersticiais),
 * criando um movimento orgânico de videira que percorre toda a extensão da página:
 * - Cruzam a tela em X nos vazios entre seções (Gaps com divisores).
 * - NUNCA passam embaixo dos títulos das seções: ao atingir a altura dos títulos,
 *   os galhos correm estritamente pelas margens laterais externas (x: 60-80 e x: 920-940),
 *   ficando a centenas de pixels de distância dos títulos centralizados.
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
        className="w-full h-full opacity-85 transition-opacity duration-1000"
      >
        <defs>
          {/* Gradiente natural da haste do galho 1 em Verde Oliva & Floresta */}
          <linearGradient id="branch-grad-1" x1="0" y1="0" x2="0" y2="4200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#465B20" stopOpacity="0.45" />
            <stop offset="18%" stopColor="#556B2F" stopOpacity="0.65" />
            <stop offset="38%" stopColor="#3A4A1C" stopOpacity="0.70" />
            <stop offset="58%" stopColor="#465B20" stopOpacity="0.65" />
            <stop offset="78%" stopColor="#556B2F" stopOpacity="0.70" />
            <stop offset="92%" stopColor="#3A4A1C" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#465B20" stopOpacity="0.45" />
          </linearGradient>

          {/* Gradiente da haste do galho 2 em Verde Sálvia & Oliva Suave */}
          <linearGradient id="branch-grad-2" x1="0" y1="0" x2="0" y2="4200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5C6E50" stopOpacity="0.40" />
            <stop offset="22%" stopColor="#465B20" stopOpacity="0.60" />
            <stop offset="45%" stopColor="#556B2F" stopOpacity="0.65" />
            <stop offset="65%" stopColor="#3A4A1C" stopOpacity="0.65" />
            <stop offset="85%" stopColor="#465B20" stopOpacity="0.60" />
            <stop offset="100%" stopColor="#5C6E50" stopOpacity="0.40" />
          </linearGradient>

          {/* Filtro sutil para textura orgânica de aquarela botânica */}
          <filter id="branch-softness" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="0.35" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ====================================================================
            GALHO 1: VIDEIRA PRINCIPAL CRUZANDO A TELA
            Trajeto:
            - Começa na margem direita do Hero (x: 940, y: 50)
            - Cruza a tela da Direita -> Esquerda no vão Hero/Stacks (y: 840-940)
            - Desce pela margem esquerda segura do Stacks (x: 75, y: 980-1450)
            - Cruza a tela da Esquerda -> Direita no vão Stacks/Projetos (y: 1510-1620)
            - Desce pela margem direita segura do Projetos (x: 925, y: 1680-2180)
            - Cruza a tela da Direita -> Esquerda no vão Projetos/Skills (y: 2240-2340)
            - Desce pela margem esquerda segura do Skills (x: 75, y: 2400-2960)
            - Cruza a tela da Esquerda -> Direita no vão Skills/Trajetória (y: 3020-3140)
            - Desce pela margem direita segura da Trajetória (x: 925, y: 3200-3700)
            - Suave desfecho em direção ao Footer (y: 3780-4180)
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
          stroke="url(#branch-grad-1)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#branch-softness)"
        />

        {/* ====================================================================
            GALHO 2: SEGUNDA VIDEIRA ENTRELAÇADA CRUZANDO EM SENTIDO OPOSTO
            Trajeto:
            - Começa na margem esquerda do Hero (x: 60, y: 50)
            - Cruza a tela da Esquerda -> Direita no vão Hero/Stacks (y: 840-940)
            - Desce pela margem direita segura do Stacks (x: 925, y: 980-1450)
            - Cruza a tela da Direita -> Esquerda no vão Stacks/Projetos (y: 1510-1620)
            - Desce pela margem esquerda segura do Projetos (x: 75, y: 1680-2180)
            - Cruza a tela da Esquerda -> Direita no vão Projetos/Skills (y: 2240-2340)
            - Desce pela margem direita segura do Skills (x: 925, y: 2400-2960)
            - Cruza a tela da Direita -> Esquerda no vão Skills/Trajetória (y: 3020-3140)
            - Desce pela margem esquerda segura da Trajetória (x: 75, y: 3200-3700)
            - Suave desfecho em direção ao Footer oposto (y: 3780-4180)
           ==================================================================== */}
        <path
          d="
            M 60 50
            C 80 220, 45 420, 65 640
            C 75 730, 100 790, 185 840
            C 285 895, 685 865, 835 910
            C 900 930, 930 970, 930 1060
            C 930 1180, 950 1310, 935 1410
            C 925 1470, 890 1520, 805 1555
            C 665 1610, 325 1570, 185 1610
            C 120 1630, 80 1670, 80 1760
            C 80 1880, 60 2010, 75 2130
            C 85 2200, 120 2250, 200 2285
            C 335 2340, 685 2305, 830 2345
            C 895 2365, 930 2405, 930 2490
            C 930 2610, 950 2740, 935 2860
            C 925 2940, 890 2995, 795 3040
            C 655 3100, 325 3060, 185 3105
            C 115 3125, 80 3165, 80 3250
            C 80 3370, 60 3500, 75 3620
            C 85 3690, 125 3740, 215 3790
            C 355 3870, 665 3950, 785 4050
            C 845 4100, 875 4150, 885 4180
          "
          stroke="url(#branch-grad-2)"
          strokeWidth="2.0"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#branch-softness)"
        />

        {/* ====================================================================
            FOLHAS BOTÂNICAS AO LONGO DO GALHO 1
           ==================================================================== */}
        {/* Hero Flanco Direito */}
        <Leaf x={938} y={120} angle={-35} scale={0.9} flip={false} />
        <Leaf x={946} y={240} angle={150} scale={0.85} flip={true} />
        <Bud x={940} y={380} angle={-25} />
        <Leaf x={948} y={520} angle={-40} scale={0.95} flip={false} />
        <Leaf x={936} y={660} angle={145} scale={0.9} flip={true} />

        {/* Cruzamento 1: Hero -> Stacks (Direita para Esquerda, y: 840-920) */}
        <Leaf x={750} y={875} angle={160} scale={0.95} flip={true} />
        <Bud x={640} y={890} angle={-15} />
        <Leaf x={520} y={885} angle={-170} scale={1} flip={false} />
        <Leaf x={380} y={880} angle={155} scale={0.95} flip={true} />
        <Bud x={260} y={895} angle={-20} />

        {/* Stacks Flanco Esquerdo */}
        <Leaf x={72} y={1080} angle={35} scale={0.9} flip={false} />
        <Bud x={76} y={1190} angle={-140} />
        <Leaf x={68} y={1300} angle={-150} scale={0.95} flip={true} />
        <Leaf x={78} y={1410} angle={40} scale={0.9} flip={false} />

        {/* Cruzamento 2: Stacks -> Projetos (Esquerda para Direita, y: 1540-1620) */}
        <Leaf x={250} y={1575} angle={20} scale={0.95} flip={false} />
        <Bud x={370} y={1595} angle={-160} />
        <Leaf x={500} y={1585} angle={15} scale={1} flip={true} />
        <Leaf x={640} y={1580} angle={-25} scale={0.95} flip={false} />
        <Bud x={750} y={1600} angle={150} />

        {/* Projetos Flanco Direito */}
        <Leaf x={930} y={1780} angle={-35} scale={0.95} flip={false} />
        <Leaf x={940} y={1900} angle={150} scale={0.85} flip={true} />
        <Bud x={932} y={2020} angle={-25} />
        <Leaf x={938} y={2140} angle={145} scale={0.9} flip={true} />

        {/* Cruzamento 3: Projetos -> Skills (Direita para Esquerda, y: 2260-2340) */}
        <Leaf x={740} y={2315} angle={160} scale={0.95} flip={true} />
        <Bud x={630} y={2330} angle={-20} />
        <Leaf x={510} y={2320} angle={-170} scale={1} flip={false} />
        <Leaf x={370} y={2320} angle={155} scale={0.9} flip={true} />
        <Bud x={250} y={2335} angle={-15} />

        {/* Skills Flanco Esquerdo */}
        <Leaf x={72} y={2510} angle={35} scale={0.9} flip={false} />
        <Bud x={76} y={2630} angle={-140} />
        <Leaf x={68} y={2750} angle={-150} scale={0.95} flip={true} />
        <Leaf x={78} y={2870} angle={40} scale={0.9} flip={false} />

        {/* Cruzamento 4: Skills -> Trajetória (Esquerda para Direita, y: 3020-3120) */}
        <Leaf x={260} y={3065} angle={20} scale={0.95} flip={false} />
        <Bud x={380} y={3085} angle={-160} />
        <Leaf x={510} y={3075} angle={15} scale={1} flip={true} />
        <Leaf x={650} y={3070} angle={-25} scale={0.95} flip={false} />
        <Bud x={760} y={3090} angle={150} />

        {/* Trajetória Flanco Direito */}
        <Leaf x={930} y={3280} angle={-35} scale={0.95} flip={false} />
        <Leaf x={940} y={3410} angle={150} scale={0.85} flip={true} />
        <Bud x={932} y={3530} angle={-25} />
        <Leaf x={936} y={3650} angle={145} scale={0.9} flip={true} />

        {/* Cruzamento 5 / Rumo ao Footer */}
        <Leaf x={680} y={3830} angle={155} scale={0.9} flip={true} />
        <Bud x={520} y={3900} angle={-30} />
        <Leaf x={360} y={3970} angle={145} scale={0.85} flip={true} />
        <Leaf x={180} y={4090} angle={-45} scale={0.8} flip={false} />

        {/* ====================================================================
            FOLHAS BOTÂNICAS AO LONGO DO GALHO 2 (ENTRELAÇADO)
           ==================================================================== */}
        {/* Hero Flanco Esquerdo */}
        <Leaf x={58} y={130} angle={35} scale={0.85} flip={false} />
        <Leaf x={72} y={270} angle={-145} scale={0.9} flip={true} />
        <Bud x={54} y={410} angle={40} />
        <Leaf x={68} y={540} angle={30} scale={0.95} flip={false} />
        <Leaf x={56} y={670} angle={-155} scale={0.85} flip={true} />

        {/* Cruzamento 1: Hero -> Stacks (Esquerda para Direita, y: 840-920) */}
        <Leaf x={280} y={875} angle={15} scale={0.95} flip={false} />
        <Leaf x={440} y={895} angle={-25} scale={1} flip={true} />
        <Leaf x={600} y={885} angle={20} scale={0.95} flip={false} />
        <Bud x={720} y={895} angle={150} />

        {/* Stacks Flanco Direito */}
        <Leaf x={935} y={1090} angle={-40} scale={0.9} flip={false} />
        <Bud x={928} y={1210} angle={145} />
        <Leaf x={940} y={1330} angle={150} scale={0.95} flip={true} />
        <Leaf x={932} y={1430} angle={-35} scale={0.9} flip={false} />

        {/* Cruzamento 2: Stacks -> Projetos (Direita para Esquerda, y: 1540-1620) */}
        <Leaf x={730} y={1575} angle={165} scale={0.95} flip={true} />
        <Leaf x={570} y={1595} angle={-165} scale={1} flip={false} />
        <Leaf x={410} y={1585} angle={160} scale={0.95} flip={true} />
        <Bud x={290} y={1600} angle={-30} />

        {/* Projetos Flanco Esquerdo */}
        <Leaf x={75} y={1790} angle={35} scale={0.9} flip={false} />
        <Leaf x={65} y={1920} angle={-145} scale={0.95} flip={true} />
        <Bud x={78} y={2040} angle={40} />
        <Leaf x={68} y={2150} angle={-150} scale={0.9} flip={true} />

        {/* Cruzamento 3: Projetos -> Skills (Esquerda para Direita, y: 2260-2340) */}
        <Leaf x={270} y={2315} angle={15} scale={0.95} flip={false} />
        <Leaf x={430} y={2335} angle={-25} scale={1} flip={true} />
        <Leaf x={590} y={2325} angle={20} scale={0.95} flip={false} />
        <Bud x={710} y={2335} angle={150} />

        {/* Skills Flanco Direito */}
        <Leaf x={935} y={2520} angle={-40} scale={0.9} flip={false} />
        <Bud x={928} y={2650} angle={145} />
        <Leaf x={940} y={2770} angle={150} scale={0.95} flip={true} />
        <Leaf x={932} y={2890} angle={-35} scale={0.9} flip={false} />

        {/* Cruzamento 4: Skills -> Trajetória (Direita para Esquerda, y: 3020-3120) */}
        <Leaf x={730} y={3065} angle={165} scale={0.95} flip={true} />
        <Leaf x={570} y={3085} angle={-165} scale={1} flip={false} />
        <Leaf x={410} y={3075} angle={160} scale={0.95} flip={true} />
        <Bud x={290} y={3090} angle={-30} />

        {/* Trajetória Flanco Esquerdo */}
        <Leaf x={75} y={3290} angle={35} scale={0.9} flip={false} />
        <Leaf x={65} y={3420} angle={-145} scale={0.95} flip={true} />
        <Bud x={78} y={3540} angle={40} />
        <Leaf x={68} y={3660} angle={-150} scale={0.9} flip={true} />

        {/* Cruzamento 5 / Rumo ao Footer */}
        <Leaf x={330} y={3830} angle={25} scale={0.9} flip={false} />
        <Bud x={480} y={3900} angle={-150} />
        <Leaf x={640} y={3970} angle={35} scale={0.85} flip={false} />
        <Leaf x={820} y={4090} angle={135} scale={0.8} flip={true} />
      </svg>
    </div>
  );
}

