import React from "react";

/**
 * Fio Condutor Contínuo & Desenho Sem Nome (Connecting Line Art)
 * Simula a trajetória fluida de voo do beija-flor, integrando:
 * - Voo dinâmico (curvas de sustentação, rasantes e laços suaves)
 * - Natureza (folhas, galhos, flores e espirais de vento)
 * - Tecnologia & IA (redes neurais com sinapses e números binários verde oliva)
 * - No rodapé: contorna graciosamente pela lateral direita, sem jamais cortar o nome "Eduarda"!
 */
export default function ConnectingLineArt() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
    >
      <svg
        viewBox="0 0 1000 4000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-full opacity-95 transition-opacity duration-1000"
      >
        <defs>
          {/* Gradiente visível e nítido em Verde Oliva Botânico & Sálvia */}
          <linearGradient id="flight-line-grad" x1="0" y1="0" x2="0" y2="4000" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#465B20" stopOpacity="0.38" />
            <stop offset="12%" stopColor="#465B20" stopOpacity="0.65" />
            <stop offset="30%" stopColor="#556B2F" stopOpacity="0.58" />
            <stop offset="50%" stopColor="#465B20" stopOpacity="0.72" />
            <stop offset="70%" stopColor="#556B2F" stopOpacity="0.62" />
            <stop offset="88%" stopColor="#2F3E14" stopOpacity="0.70" />
            <stop offset="100%" stopColor="#2F3E14" stopOpacity="0.45" />
          </linearGradient>

          {/* Filtro sutil de granulação suave para o traço de voo */}
          <filter id="flight-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="0.7" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ====================================================================
            1. O TRAÇADO PRINCIPAL DO VOO (Flight Path Trajectory)
            Trajetória de voo do beija-flor:
            - Hero: Topo Direito (x: 820)
            - Rasante para a Esquerda (Stacks): (x: 160)
            - Laço amplo em ascensão (Projetos): (x: 850)
            - Curva de sustentação (Skills & IA): (x: 220)
            - Planeio descendente (Trajetória): (x: 800)
            - RODAPÉ: A linha contorna pela LATERAL DIREITA (x: 880 -> 920 -> 890),
              passando AO LADO e NUNCA pelo meio do nome "Eduarda"!
           ==================================================================== */}
        <path
          d="
            M 820 100
            C 920 240, 740 400, 520 490
            C 300 580, 110 740, 160 980
            C 210 1200, 500 1340, 820 1480
            C 950 1620, 890 1880, 720 2060
            C 550 2240, 180 2360, 220 2600
            C 260 2840, 540 2980, 800 3160
            C 940 3320, 840 3540, 870 3720
            C 890 3840, 930 3920, 890 3970
          "
          stroke="url(#flight-line-grad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#flight-glow)"
        />

        {/* Linha Fina Pontilhada Paralela (Vórtice de Voo / Corrente de Vento) */}
        <path
          d="
            M 826 106
            C 926 244, 746 402, 526 492
            C 306 582, 116 742, 166 982
            C 216 1202, 506 1342, 826 1482
            C 956 1622, 896 1882, 726 2062
            C 556 2242, 186 2362, 226 2602
            C 266 2842, 546 2982, 806 3162
            C 946 3322, 846 3542, 876 3722
            C 896 3842, 936 3922, 896 3972
          "
          stroke="#465B20"
          strokeWidth="1.1"
          strokeOpacity="0.35"
          strokeDasharray="4 7"
          strokeLinecap="round"
        />

        {/* ====================================================================
            2. ELEMENTOS MISTOS: NATUREZA (Folhas, Flores, Vento) + IA (Rede Neural & Binário)
           ==================================================================== */}

        {/* PONTO 1: Topo Hero (Folha + Flor + Dígito 01) */}
        <g transform="translate(820, 220)">
          {/* Folha */}
          <path
            d="M 0 0 C 20 -12, 34 -4, 38 12 C 24 18, 10 12, 0 0 Z"
            fill="#556B2F"
            fillOpacity="0.45"
            stroke="#2F3E14"
            strokeWidth="1.1"
            strokeOpacity="0.75"
          />
          {/* Flor de 4 pétalas */}
          <circle cx="38" cy="12" r="2.5" fill="#465B20" fillOpacity="0.85" />
          <circle cx="42" cy="12" r="2" fill="#728464" fillOpacity="0.75" />
          <circle cx="34" cy="12" r="2" fill="#728464" fillOpacity="0.75" />
          <circle cx="38" cy="8" r="2" fill="#728464" fillOpacity="0.75" />
          <circle cx="38" cy="16" r="2" fill="#728464" fillOpacity="0.75" />

          {/* Número binário integrado */}
          <text x="48" y="15" fill="#2F3E14" fillOpacity="0.70" fontSize="11" fontFamily="monospace" fontWeight="bold">
            01
          </text>
        </g>

        {/* PONTO 2: Espiral de Vento na Transição Hero -> Stacks */}
        <g transform="translate(520, 490)">
          {/* Espiral de vento (vórtice de ar) */}
          <path
            d="M -20 -8 C -10 -22, 18 -18, 15 -2 C 12 12, -8 10, -12 -4 C -14 -12, 4 -12, 6 -4"
            fill="none"
            stroke="#465B20"
            strokeWidth="1.4"
            strokeOpacity="0.55"
            strokeLinecap="round"
          />
          <circle cx="6" cy="-4" r="2.5" fill="#556B2F" fillOpacity="0.8" />
        </g>

        {/* PONTO 3: Stacks (Galho Botânico com Rede Neural & Sinapses) */}
        <g transform="translate(160, 980)">
          {/* Galho orgânico */}
          <path
            d="M 0 0 C -22 -16, -34 -6, -32 12 C -20 16, -8 8, 0 0 Z"
            fill="#556B2F"
            fillOpacity="0.45"
            stroke="#2F3E14"
            strokeWidth="1.1"
            strokeOpacity="0.75"
          />
          <path
            d="M 0 0 C -6 -24, 12 -28, 20 -16 C 18 -6, 8 -2, 0 0 Z"
            fill="#728464"
            fillOpacity="0.40"
            stroke="#2F3E14"
            strokeWidth="1.1"
            strokeOpacity="0.7"
          />

          {/* Rede Neural com nós e sinapses */}
          <line x1="0" y1="0" x2="-28" y2="-32" stroke="#465B20" strokeWidth="1.0" strokeOpacity="0.6" />
          <line x1="-28" y1="-32" x2="-48" y2="-20" stroke="#465B20" strokeWidth="1.0" strokeOpacity="0.6" />
          <line x1="-28" y1="-32" x2="-16" y2="-52" stroke="#465B20" strokeWidth="1.0" strokeOpacity="0.6" />
          <circle cx="-28" cy="-32" r="3" fill="#465B20" fillOpacity="0.8" />
          <circle cx="-48" cy="-20" r="2.5" fill="#728464" fillOpacity="0.75" />
          <circle cx="-16" cy="-52" r="2.5" fill="#465B20" fillOpacity="0.8" />

          {/* Números Binários nítidos */}
          <text x="-56" y="-36" fill="#2F3E14" fillOpacity="0.70" fontSize="10" fontFamily="monospace" fontWeight="bold">
            1010
          </text>
        </g>

        {/* PONTO 4: Transição Stacks -> Projetos (Vento + Flores + Binário) */}
        <g transform="translate(500, 1340)">
          {/* Sopro de vento suave */}
          <path
            d="M -35 0 C -15 -10, 15 -10, 35 0 M -20 6 C -5 -2, 10 -2, 25 6"
            fill="none"
            stroke="#465B20"
            strokeWidth="1.3"
            strokeOpacity="0.55"
            strokeLinecap="round"
          />
          {/* Duas pequenas flores */}
          <circle cx="-35" cy="0" r="2.5" fill="#556B2F" fillOpacity="0.8" />
          <circle cx="35" cy="0" r="2.5" fill="#556B2F" fillOpacity="0.8" />

          <text x="-12" y="4" fill="#2F3E14" fillOpacity="0.70" fontSize="10" fontFamily="monospace" fontWeight="bold">
            0101
          </text>
        </g>

        {/* PONTO 5: Projetos (Curva de sustentação de voo + Folha grande + Rede Neural) */}
        <g transform="translate(820, 1480)">
          {/* Folha alargada */}
          <path
            d="M 0 0 C 24 -12, 38 4, 34 22 C 18 20, 6 12, 0 0 Z"
            fill="#556B2F"
            fillOpacity="0.45"
            stroke="#2F3E14"
            strokeWidth="1.1"
            strokeOpacity="0.75"
          />
          {/* Rede Neural com 3 nós */}
          <line x1="34" y1="22" x2="56" y2="34" stroke="#465B20" strokeWidth="1.0" strokeOpacity="0.6" />
          <line x1="56" y1="34" x2="48" y2="56" stroke="#465B20" strokeWidth="1.0" strokeOpacity="0.6" />
          <circle cx="34" cy="22" r="3.2" fill="#465B20" fillOpacity="0.8" />
          <circle cx="56" cy="34" r="2.6" fill="#728464" fillOpacity="0.75" />
          <circle cx="48" cy="56" r="2.6" fill="#465B20" fillOpacity="0.8" />

          <text x="62" y="38" fill="#2F3E14" fillOpacity="0.70" fontSize="11" fontFamily="monospace" fontWeight="bold">
            110
          </text>
        </g>

        {/* PONTO 6: Skills & IA (Galho com nós neurais densos) */}
        <g transform="translate(220, 2600)">
          <path
            d="M 0 0 C -18 -18, -30 -10, -28 8 C -16 12, -6 6, 0 0 Z"
            fill="#556B2F"
            fillOpacity="0.45"
            stroke="#2F3E14"
            strokeWidth="1.1"
            strokeOpacity="0.75"
          />
          {/* Sinapses */}
          <line x1="0" y1="0" x2="-26" y2="-24" stroke="#465B20" strokeWidth="1.0" strokeOpacity="0.6" />
          <line x1="-26" y1="-24" x2="-44" y2="-12" stroke="#465B20" strokeWidth="1.0" strokeOpacity="0.6" />
          <line x1="-26" y1="-24" x2="-32" y2="-44" stroke="#465B20" strokeWidth="1.0" strokeOpacity="0.6" />
          <circle cx="-26" cy="-24" r="3.4" fill="#465B20" fillOpacity="0.85" />
          <circle cx="-44" cy="-12" r="2.5" fill="#728464" fillOpacity="0.75" />
          <circle cx="-32" cy="-44" r="2.6" fill="#465B20" fillOpacity="0.85" />

          <text x="-58" y="-20" fill="#2F3E14" fillOpacity="0.70" fontSize="11" fontFamily="monospace" fontWeight="bold">
            0101
          </text>
        </g>

        {/* PONTO 7: Trajetória & Carreira (Broto Botânico + Flor) */}
        <g transform="translate(800, 3160)">
          <path
            d="M 0 0 C 18 -14, 30 -4, 26 14 C 14 16, 4 8, 0 0 Z"
            fill="#556B2F"
            fillOpacity="0.45"
            stroke="#2F3E14"
            strokeWidth="1.1"
            strokeOpacity="0.75"
          />
          {/* Flor de 4 pétalas */}
          <circle cx="26" cy="14" r="3" fill="#465B20" fillOpacity="0.85" />
          <circle cx="31" cy="14" r="2.2" fill="#728464" fillOpacity="0.75" />
          <circle cx="21" cy="14" r="2.2" fill="#728464" fillOpacity="0.75" />
          <circle cx="26" cy="9" r="2.2" fill="#728464" fillOpacity="0.75" />
          <circle cx="26" cy="19" r="2.2" fill="#728464" fillOpacity="0.75" />

          <text x="36" y="18" fill="#2F3E14" fillOpacity="0.70" fontSize="10" fontFamily="monospace" fontWeight="bold">
            101
          </text>
        </g>

        {/* ====================================================================
            PONTO 8: RODAPÉ (FOOTER)
            CRITÉRIO: A LINHA FICA NA LATERAL DIREITA (x: 870 -> 930 -> 890),
            NUNCA PASSANDO PELO CENTRO (x: 500) ONDE FICA O NOME EDUARDA!
           ==================================================================== */}
        <g transform="translate(890, 3960)">
          {/* Ramo e nós ancorados elegantemente na margem lateral direita */}
          <path
            d="M 0 0 C 12 -10, 20 -4, 18 8 C 10 10, 2 6, 0 0 Z"
            fill="#556B2F"
            fillOpacity="0.45"
            stroke="#2F3E14"
            strokeWidth="1.1"
            strokeOpacity="0.75"
          />
          {/* Círculo concêntrico de pouso na margem direita */}
          <circle cx="0" cy="0" r="14" stroke="#465B20" strokeWidth="1.1" strokeOpacity="0.45" strokeDasharray="3 3" />
          <circle cx="0" cy="0" r="6" fill="#556B2F" fillOpacity="0.45" />
          <circle cx="0" cy="0" r="2.5" fill="#2F3E14" fillOpacity="0.85" />
          <text x="-24" y="-16" fill="#2F3E14" fillOpacity="0.70" fontSize="10" fontFamily="monospace" fontWeight="bold">
            01
          </text>
        </g>
      </svg>
    </div>
  );
}
