import React from "react";

type ProjectArtworkProps = {
  projectId: string;
  category?: string;
  className?: string;
  variant?: "card" | "modal";
};

export default function ProjectArtwork({
  projectId,
  category = "fullstack",
  className = "",
  variant = "card",
}: ProjectArtworkProps) {
  const isModal = variant === "modal";

  switch (projectId) {
    case "onvagas":
      return (
        <div
          className={`w-full h-full relative overflow-hidden bg-gradient-to-br from-[#F4F6EE] via-[#FAFBF7] to-[#FAF0EF] flex items-center justify-center select-none ${className}`}
        >
          {/* Fundo com grade de precisão editorial */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "radial-gradient(circle at 12px 12px, #465B20 1px, transparent 1.2px)",
              backgroundSize: "24px 24px",
            }}
          />

          <svg
            viewBox="0 0 400 220"
            className="w-full h-full max-h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Círculos Concêntricos de Compatibilidade (Radar de Vagas) */}
            <circle cx="200" cy="110" r="90" stroke="#465B20" strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.3" />
            <circle cx="200" cy="110" r="65" stroke="#465B20" strokeWidth="1.2" strokeDasharray="4 4" strokeOpacity="0.45" />
            <circle cx="200" cy="110" r="40" stroke="#9E6761" strokeWidth="1.4" strokeOpacity="0.55" fill="#FAFBF7" fillOpacity="0.6" />

            {/* Eixos de Varredura Cartesiana */}
            <line x1="80" y1="110" x2="320" y2="110" stroke="#465B20" strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="2 3" />
            <line x1="200" y1="20" x2="200" y2="200" stroke="#465B20" strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="2 3" />

            {/* Vetores de Correspondência e Nós de Candidato/Vaga */}
            <path
              d="M 120 70 C 150 90, 170 105, 200 110 C 230 115, 250 135, 280 150"
              stroke="#465B20"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 130 155 C 160 140, 180 120, 200 110 C 220 100, 245 80, 275 65"
              stroke="#9E6761"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* Nós Interconectados */}
            <circle cx="120" cy="70" r="6" fill="#465B20" />
            <circle cx="120" cy="70" r="10" stroke="#465B20" strokeWidth="1" strokeOpacity="0.4" />

            <circle cx="280" cy="150" r="6" fill="#465B20" />
            <circle cx="280" cy="150" r="10" stroke="#465B20" strokeWidth="1" strokeOpacity="0.4" />

            <circle cx="130" cy="155" r="5" fill="#9E6761" />
            <circle cx="275" cy="65" r="5" fill="#9E6761" />

            {/* Nó Central: Selo de Compatibilidade / Match Exato */}
            <circle cx="200" cy="110" r="14" fill="#465B20" />
            <circle cx="200" cy="110" r="18" stroke="#465B20" strokeWidth="1.5" strokeOpacity="0.5" />
            <path d="M 194 110 L 198 114 L 206 106" stroke="#FAF8F5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

            {/* Folhas Botânicas que Brotam da Rede */}
            <path d="M 120 70 C 110 55, 95 60, 95 72 C 105 76, 115 74, 120 70 Z" fill="#556B2F" fillOpacity="0.75" />
            <path d="M 280 150 C 295 160, 305 152, 303 140 C 292 138, 285 144, 280 150 Z" fill="#556B2F" fillOpacity="0.75" />

            {/* Carimbo de Selo Arquitetural */}
            <text x="200" y="195" textAnchor="middle" fill="#465B20" fontSize="8" fontFamily="monospace" letterSpacing="3" fontWeight="bold" opacity="0.75">
              // MATCH ALGORÍTMICO • TALENT NETWORK
            </text>
          </svg>
        </div>
      );

    case "vendefacil":
      return (
        <div
          className={`w-full h-full relative overflow-hidden bg-gradient-to-br from-[#FAF2ED] via-[#FAF8F5] to-[#F2F5EC] flex items-center justify-center select-none ${className}`}
        >
          {/* Grid sutil */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "linear-gradient(to right, #9E4A28 1px, transparent 1px), linear-gradient(to bottom, #9E4A28 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <svg
            viewBox="0 0 400 220"
            className="w-full h-full max-h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 4 Círculos Concêntricos da Clean Architecture */}
            <circle cx="200" cy="110" r="92" stroke="#465B20" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3 4" fill="#F4F6EE" fillOpacity="0.35" />
            <circle cx="200" cy="110" r="70" stroke="#9E4A28" strokeWidth="1.2" strokeOpacity="0.4" fill="#FAF5F0" fillOpacity="0.5" />
            <circle cx="200" cy="110" r="48" stroke="#9E6761" strokeWidth="1.4" strokeOpacity="0.5" fill="#FAF0EF" fillOpacity="0.6" />
            <circle cx="200" cy="110" r="28" stroke="#465B20" strokeWidth="2" fill="#465B20" />

            {/* Prisma Isométrico no Núcleo do Domínio (Concorrência Atômica / Transação) */}
            <path d="M 200 96 L 210 102 L 210 116 L 200 122 L 190 116 L 190 102 Z" fill="#FAF8F5" stroke="#2F3E14" strokeWidth="1" />
            <path d="M 200 96 L 200 110 L 210 116" stroke="#465B20" strokeWidth="1" />
            <path d="M 200 110 L 190 116" stroke="#465B20" strokeWidth="1" />

            {/* Setas de Dependência que Apontam Rigorosamente Para Dentro (Regra da Clean Arch) */}
            <path d="M 120 110 L 150 110" stroke="#9E4A28" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 145 106 L 152 110 L 145 114" stroke="#9E4A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

            <path d="M 280 110 L 250 110" stroke="#9E4A28" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 255 106 L 248 110 L 255 114" stroke="#9E4A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Guirlanda Botânica Decorativa ao Redor do Círculo Externo */}
            <path d="M 112 110 C 112 60, 150 24, 200 24" stroke="#465B20" strokeWidth="1" strokeDasharray="2 3" strokeOpacity="0.5" />
            <path d="M 200 196 C 250 196, 288 160, 288 110" stroke="#465B20" strokeWidth="1" strokeDasharray="2 3" strokeOpacity="0.5" />

            <path d="M 150 35 C 145 25, 135 28, 137 36 C 145 39, 149 37, 150 35 Z" fill="#556B2F" fillOpacity="0.75" />
            <path d="M 250 185 C 255 195, 265 192, 263 184 C 255 181, 251 183, 250 185 Z" fill="#556B2F" fillOpacity="0.75" />

            {/* Legenda de Camadas */}
            <text x="200" y="196" textAnchor="middle" fill="#9E4A28" fontSize="8" fontFamily="monospace" letterSpacing="3" fontWeight="bold" opacity="0.8">
              // CLEAN ARCHITECTURE • ATOMIC INVENTORY
            </text>
          </svg>
        </div>
      );

    case "controle-planos":
      return (
        <div
          className={`w-full h-full relative overflow-hidden bg-gradient-to-br from-[#F0F5F1] via-[#FAF8F5] to-[#F3EDE8] flex items-center justify-center select-none ${className}`}
        >
          {/* Padrão de Barramento de Dados */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "radial-gradient(circle at 10px 10px, #3B5B44 1px, transparent 1.2px)",
              backgroundSize: "20px 20px",
            }}
          />

          <svg
            viewBox="0 0 400 220"
            className="w-full h-full max-h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Barramento Central Assíncrono (RabbitMQ Message Broker) */}
            <line x1="70" y1="110" x2="330" y2="110" stroke="#3B5B44" strokeWidth="2.5" strokeLinecap="round" />

            {/* Fila de Mensagens / Pacotes em Trânsito */}
            <rect x="130" y="103" width="16" height="14" rx="3" fill="#9E4A28" />
            <rect x="160" y="103" width="16" height="14" rx="3" fill="#465B20" />
            <rect x="225" y="103" width="16" height="14" rx="3" fill="#9E6761" />
            <rect x="255" y="103" width="16" height="14" rx="3" fill="#3B5B44" />

            {/* Microsserviço 1: Cadastros & Planos (Nó Superior Esquerdo) */}
            <circle cx="110" cy="55" r="28" fill="#FAF8F5" stroke="#3B5B44" strokeWidth="1.8" />
            <circle cx="110" cy="55" r="22" fill="#EBF2ED" />
            <path d="M 102 55 L 118 55 M 110 47 L 110 63" stroke="#3B5B44" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="110" y1="83" x2="110" y2="110" stroke="#3B5B44" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Microsserviço 2: Faturamento & Cobrança (Nó Superior Direito) */}
            <circle cx="290" cy="55" r="28" fill="#FAF8F5" stroke="#9E4A28" strokeWidth="1.8" />
            <circle cx="290" cy="55" r="22" fill="#FAF0EB" />
            <circle cx="290" cy="55" r="8" stroke="#9E4A28" strokeWidth="1.6" />
            <line x1="290" y1="83" x2="290" y2="110" stroke="#9E4A28" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Fila Dead-Letter Exchange (DLX - Nó Inferior Central) */}
            <rect x="160" y="150" width="80" height="34" rx="10" fill="#FAF8F5" stroke="#9E6761" strokeWidth="1.8" />
            <path d="M 200 110 L 200 150" stroke="#9E6761" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="200" y="172" textAnchor="middle" fill="#9E6761" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="1">
              RETRY & DLX
            </text>

            {/* Ramos Botânicos Conectando os Serviços */}
            <path d="M 110 27 C 120 15, 140 18, 140 30 C 130 33, 118 31, 110 27 Z" fill="#556B2F" fillOpacity="0.7" />
            <path d="M 290 27 C 280 15, 260 18, 260 30 C 270 33, 282 31, 290 27 Z" fill="#556B2F" fillOpacity="0.7" />

            {/* Rótulo Editorial */}
            <text x="200" y="205" textAnchor="middle" fill="#3B5B44" fontSize="8" fontFamily="monospace" letterSpacing="3" fontWeight="bold" opacity="0.8">
              // EVENT-DRIVEN • RABBITMQ MICROSERVICES
            </text>
          </svg>
        </div>
      );

    case "a11y-io":
      return (
        <div
          className={`w-full h-full relative overflow-hidden bg-gradient-to-br from-[#FAF0EF] via-[#FAF8F5] to-[#F4F6EE] flex items-center justify-center select-none ${className}`}
        >
          {/* Padrão Tátil de Acessibilidade */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "radial-gradient(circle at 14px 14px, #9E6761 1.2px, transparent 1.4px)",
              backgroundSize: "28px 28px",
            }}
          />

          <svg
            viewBox="0 0 400 220"
            className="w-full h-full max-h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Anéis de Contraste e Foco de Acessibilidade (Focus Indicator Rings) */}
            <circle cx="200" cy="105" r="85" stroke="#9E6761" strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.3" />
            <circle cx="200" cy="105" r="68" stroke="#465B20" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.45" />

            {/* Símbolo do Olho Botânico / Visão Clara & Leitor de Tela */}
            <path
              d="M 120 105 C 150 65, 250 65, 280 105 C 250 145, 150 145, 120 105 Z"
              stroke="#465B20"
              strokeWidth="2.2"
              fill="#FAF8F5"
              fillOpacity="0.85"
            />

            {/* Íris Botânica com Contraste WCAG 2.2 */}
            <circle cx="200" cy="105" r="26" fill="#465B20" />
            <circle cx="200" cy="105" r="18" fill="#9E6761" />
            <circle cx="200" cy="105" r="8" fill="#FAF8F5" />

            {/* Círculos da Roda de Contraste AAA (7:1) e AA (4.5:1) */}
            <path
              d="M 120 105 L 100 105 M 280 105 L 300 105 M 200 45 L 200 25 M 200 165 L 200 185"
              stroke="#9E6761"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Guirlanda de Folhas da Inclusão Digital */}
            <path d="M 130 75 C 120 65, 115 75, 120 85 C 128 85, 132 78, 130 75 Z" fill="#556B2F" fillOpacity="0.8" />
            <path d="M 270 75 C 280 65, 285 75, 280 85 C 272 85, 268 78, 270 75 Z" fill="#556B2F" fillOpacity="0.8" />
            <path d="M 140 135 C 130 145, 135 155, 145 150 C 145 142, 142 136, 140 135 Z" fill="#556B2F" fillOpacity="0.8" />
            <path d="M 260 135 C 270 145, 265 155, 255 150 C 255 142, 258 136, 260 135 Z" fill="#556B2F" fillOpacity="0.8" />

            {/* Selo WCAG 2.2 AAA */}
            <text x="200" y="200" textAnchor="middle" fill="#9E6761" fontSize="8" fontFamily="monospace" letterSpacing="3" fontWeight="bold" opacity="0.85">
              // ACCESSIBILITY REQUISITES • WCAG 2.2 AAA
            </text>
          </svg>
        </div>
      );

    case "roadmap-planner":
      return (
        <div
          className={`w-full h-full relative overflow-hidden bg-gradient-to-br from-[#F5F6EE] via-[#FAF8F5] to-[#FAF2ED] flex items-center justify-center select-none ${className}`}
        >
          {/* Padrão Cartográfico / Trilha */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "radial-gradient(circle at 12px 12px, #465B20 1px, transparent 1.2px)",
              backgroundSize: "24px 24px",
            }}
          />

          <svg
            viewBox="0 0 400 220"
            className="w-full h-full max-h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Gráfico de Radar Hexagonal de Habilidades Backend */}
            <polygon points="200,30 265,65 265,145 200,180 135,145 135,65" stroke="#465B20" strokeWidth="0.8" strokeOpacity="0.25" />
            <polygon points="200,55 245,80 245,130 200,155 155,130 155,80" stroke="#465B20" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.4" fill="#FAFBF7" fillOpacity="0.5" />

            {/* Eixos do Radar */}
            <line x1="200" y1="105" x2="200" y2="30" stroke="#465B20" strokeWidth="0.8" strokeOpacity="0.3" />
            <line x1="200" y1="105" x2="265" y2="65" stroke="#465B20" strokeWidth="0.8" strokeOpacity="0.3" />
            <line x1="200" y1="105" x2="265" y2="145" stroke="#465B20" strokeWidth="0.8" strokeOpacity="0.3" />
            <line x1="200" y1="105" x2="200" y2="180" stroke="#465B20" strokeWidth="0.8" strokeOpacity="0.3" />
            <line x1="200" y1="105" x2="135" y2="145" stroke="#465B20" strokeWidth="0.8" strokeOpacity="0.3" />
            <line x1="200" y1="105" x2="135" y2="65" stroke="#465B20" strokeWidth="0.8" strokeOpacity="0.3" />

            {/* Polígono de Competência Avaliada (Scoring em Destaque) */}
            <polygon
              points="200,45 255,75 235,138 185,160 145,120 160,75"
              fill="#465B20"
              fillOpacity="0.2"
              stroke="#465B20"
              strokeWidth="2"
            />

            {/* Nós de Competência nos Vértices */}
            <circle cx="200" cy="45" r="4" fill="#465B20" />
            <circle cx="255" cy="75" r="4" fill="#9E4A28" />
            <circle cx="235" cy="138" r="4" fill="#465B20" />
            <circle cx="185" cy="160" r="4" fill="#9E6761" />
            <circle cx="145" cy="120" r="4" fill="#465B20" />
            <circle cx="160" cy="75" r="4" fill="#9E4A28" />

            {/* Trilha Ascendente Curva (A rota de evolução sugerida) */}
            <path
              d="M 60 170 C 100 160, 100 80, 180 50 C 240 30, 310 70, 340 40"
              stroke="#9E4A28"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 4"
            />
            <circle cx="340" cy="40" r="5" fill="#9E4A28" />

            {/* Broto de Conhecimento */}
            <path d="M 340 40 C 355 35, 360 45, 350 50 C 342 50, 338 45, 340 40 Z" fill="#556B2F" fillOpacity="0.8" />

            {/* Rótulo Editorial */}
            <text x="200" y="202" textAnchor="middle" fill="#465B20" fontSize="8" fontFamily="monospace" letterSpacing="3" fontWeight="bold" opacity="0.85">
              // SKILL RADAR • BACKEND ROADMAP DIAGNOSIS
            </text>
          </svg>
        </div>
      );

    case "capacitacao-ia":
      return (
        <div
          className={`w-full h-full relative overflow-hidden bg-gradient-to-br from-[#EEF3EC] via-[#FAF8F5] to-[#FAF0EF] flex items-center justify-center select-none ${className}`}
        >
          {/* Padrão Sináptico */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "radial-gradient(circle at 15px 15px, #3A4A1C 1.2px, transparent 1.4px)",
              backgroundSize: "30px 30px",
            }}
          />

          <svg
            viewBox="0 0 400 220"
            className="w-full h-full max-h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Árvore / Rede Neural Botânica de IA */}
            {/* Camada 1: Entradas (Input Layer) */}
            <circle cx="90" cy="60" r="10" fill="#FAF8F5" stroke="#3A4A1C" strokeWidth="1.8" />
            <circle cx="90" cy="110" r="10" fill="#FAF8F5" stroke="#3A4A1C" strokeWidth="1.8" />
            <circle cx="90" cy="160" r="10" fill="#FAF8F5" stroke="#3A4A1C" strokeWidth="1.8" />

            {/* Camada 2: Oculta / Convolucional (Hidden Layer) */}
            <circle cx="200" cy="45" r="12" fill="#EBF2ED" stroke="#465B20" strokeWidth="2" />
            <circle cx="200" cy="90" r="12" fill="#FAF0EF" stroke="#9E6761" strokeWidth="2" />
            <circle cx="200" cy="135" r="12" fill="#FAF0EF" stroke="#9E6761" strokeWidth="2" />
            <circle cx="200" cy="180" r="12" fill="#EBF2ED" stroke="#465B20" strokeWidth="2" />

            {/* Camada 3: Saída / Decisão Preditiva (Output Layer) */}
            <circle cx="310" cy="85" r="14" fill="#FAF8F5" stroke="#3A4A1C" strokeWidth="2" />
            <circle cx="310" cy="135" r="14" fill="#FAF8F5" stroke="#9E6761" strokeWidth="2" />

            {/* Sinapses / Ramos Botânicos Conectando as Camadas */}
            <line x1="100" y1="60" x2="188" y2="45" stroke="#465B20" strokeWidth="1.2" strokeOpacity="0.4" />
            <line x1="100" y1="60" x2="188" y2="90" stroke="#9E6761" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="100" y1="110" x2="188" y2="90" stroke="#9E6761" strokeWidth="1.4" strokeOpacity="0.45" />
            <line x1="100" y1="110" x2="188" y2="135" stroke="#465B20" strokeWidth="1.2" strokeOpacity="0.4" />
            <line x1="100" y1="160" x2="188" y2="135" stroke="#9E6761" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="100" y1="160" x2="188" y2="180" stroke="#465B20" strokeWidth="1.2" strokeOpacity="0.4" />

            <line x1="212" y1="45" x2="296" y2="85" stroke="#465B20" strokeWidth="1.4" strokeOpacity="0.45" />
            <line x1="212" y1="90" x2="296" y2="85" stroke="#9E6761" strokeWidth="1.6" strokeOpacity="0.6" />
            <line x1="212" y1="135" x2="296" y2="135" stroke="#9E6761" strokeWidth="1.6" strokeOpacity="0.6" />
            <line x1="212" y1="180" x2="296" y2="135" stroke="#465B20" strokeWidth="1.4" strokeOpacity="0.45" />

            {/* Curva Sigmoide / Função de Recompensa Q-Learning */}
            <path
              d="M 140 195 C 180 195, 220 25, 260 25"
              stroke="#3A4A1C"
              strokeWidth="1.2"
              strokeDasharray="2 3"
              strokeOpacity="0.4"
            />

            {/* Folhas nos Nós de Ativação */}
            <path d="M 310 71 C 320 60, 335 65, 330 75 C 322 75, 315 72, 310 71 Z" fill="#556B2F" fillOpacity="0.8" />
            <path d="M 310 149 C 325 155, 320 168, 312 165 C 310 158, 310 152, 310 149 Z" fill="#556B2F" fillOpacity="0.8" />

            {/* Rótulo Editorial */}
            <text x="200" y="206" textAnchor="middle" fill="#3A4A1C" fontSize="8" fontFamily="monospace" letterSpacing="3" fontWeight="bold" opacity="0.85">
              // NEURAL AGENTS • MACHINE LEARNING USP
            </text>
          </svg>
        </div>
      );

    case "residencia-dados":
      return (
        <div
          className={`w-full h-full relative overflow-hidden bg-gradient-to-br from-[#FAF3EE] via-[#FAF8F5] to-[#EEF3EC] flex items-center justify-center select-none ${className}`}
        >
          {/* Padrão de Matriz de Dados */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "linear-gradient(to right, #9E4A28 1px, transparent 1px), linear-gradient(to bottom, #465B20 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          <svg
            viewBox="0 0 400 220"
            className="w-full h-full max-h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Constelação Star Schema: Tabela Fato no Centro */}
            <polygon points="200,80 225,105 200,130 175,105" fill="#465B20" />
            <circle cx="200" cy="105" r="26" stroke="#465B20" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Tabelas de Dimensão Conectadas (Pétalas em Formato Diamante) */}
            {/* Dim 1: Topo */}
            <polygon points="200,35 215,48 200,61 185,48" fill="#FAF8F5" stroke="#9E4A28" strokeWidth="1.5" />
            <line x1="200" y1="61" x2="200" y2="80" stroke="#9E4A28" strokeWidth="1.5" />

            {/* Dim 2: Direita */}
            <polygon points="270,105 285,118 270,131 255,118" fill="#FAF8F5" stroke="#9E6761" strokeWidth="1.5" />
            <line x1="225" y1="105" x2="255" y2="118" stroke="#9E6761" strokeWidth="1.5" />

            {/* Dim 3: Base */}
            <polygon points="200,150 215,163 200,176 185,163" fill="#FAF8F5" stroke="#9E4A28" strokeWidth="1.5" />
            <line x1="200" y1="130" x2="200" y2="150" stroke="#9E4A28" strokeWidth="1.5" />

            {/* Dim 4: Esquerda */}
            <polygon points="130,105 145,118 130,131 115,118" fill="#FAF8F5" stroke="#9E6761" strokeWidth="1.5" />
            <line x1="175" y1="105" x2="145" y2="118" stroke="#9E6761" strokeWidth="1.5" />

            {/* Gráfico Analítico Isométrico (Storytelling com Dados no Rodapé Esquerdo) */}
            <rect x="75" y="140" width="10" height="30" fill="#465B20" fillOpacity="0.75" rx="2" />
            <rect x="90" y="125" width="10" height="45" fill="#9E4A28" fillOpacity="0.75" rx="2" />
            <rect x="105" y="110" width="10" height="60" fill="#9E6761" fillOpacity="0.75" rx="2" />

            {/* Linha de Tendência Ascendente de Negócio */}
            <path
              d="M 75 135 L 95 120 L 110 105 L 140 90 L 170 85"
              stroke="#2A3614"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="170" cy="85" r="3.5" fill="#2A3614" />

            {/* Detalhe Botânico */}
            <path d="M 270 95 C 280 85, 292 90, 288 98 C 280 100, 274 98, 270 95 Z" fill="#556B2F" fillOpacity="0.8" />

            {/* Rótulo Editorial */}
            <text x="200" y="202" textAnchor="middle" fill="#9E4A28" fontSize="8" fontFamily="monospace" letterSpacing="3" fontWeight="bold" opacity="0.85">
              // STAR SCHEMA • ETL DATA INTELLIGENCE PUC-RIO
            </text>
          </svg>
        </div>
      );

    default:
      return (
        <div
          className={`w-full h-full relative overflow-hidden bg-gradient-to-br from-[#FAF8F5] via-[#F4F6EE] to-[#FAF0EF] flex items-center justify-center select-none ${className}`}
        >
          <svg
            viewBox="0 0 400 220"
            className="w-full h-full max-h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="200" cy="110" r="80" stroke="#465B20" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <circle cx="200" cy="110" r="50" stroke="#9E6761" strokeWidth="1.5" fill="#FFFFFF" fillOpacity="0.6" />
            <circle cx="200" cy="110" r="20" fill="#465B20" />
            <path d="M 200 95 L 200 125 M 185 110 L 215 110" stroke="#FAF8F5" strokeWidth="2" strokeLinecap="round" />
            <path d="M 200 60 C 190 45, 175 50, 175 62 C 185 66, 195 64, 200 60 Z" fill="#556B2F" fillOpacity="0.8" />
            <text x="200" y="195" textAnchor="middle" fill="#465B20" fontSize="8" fontFamily="monospace" letterSpacing="3" fontWeight="bold" opacity="0.8">
              // ARQUITETURA DE SOFTWARE • EDUARDA SANTOS
            </text>
          </svg>
        </div>
      );
  }
}

