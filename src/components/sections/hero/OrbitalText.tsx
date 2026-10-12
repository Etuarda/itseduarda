import React, { useId } from "react";

const ORBIT_TEXT = "SOFTWARE · ENGENHARIA DE DADOS · INTELIGÊNCIA ARTIFICIAL · ";
const RADIUS = 126;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function OrbitalText({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const pathId = `orbit-path-${uid}`;
  const maskId = `orbit-mask-${uid}`;

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none select-none animate-[spin_70s_linear_infinite] motion-reduce:animate-none ${className}`}
    >
      <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible">
        <defs>
          <path
            id={pathId}
            d={`M 150,150 m -${RADIUS},0 a ${RADIUS},${RADIUS} 0 1,1 ${RADIUS * 2},0 a ${RADIUS},${RADIUS} 0 1,1 -${RADIUS * 2},0`}
          />
          {/* Máscara que "escreve" o anel durante a Cena 02 (dashoffset 1 → 0) */}
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="300" height="300">
            <circle
              data-hero="orbit-mask"
              cx="150"
              cy="150"
              r={RADIUS}
              fill="none"
              stroke="#fff"
              strokeWidth="34"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset="0"
              transform="rotate(180 150 150)"
            />
          </mask>
        </defs>
        <text
          mask={`url(#${maskId})`}
          className="uppercase"
          fill="rgba(68, 80, 58, 0.78)"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "9.5px",
            fontWeight: 600,
          }}
        >
          <textPath href={`#${pathId}`} textLength={CIRCUMFERENCE - 6} lengthAdjust="spacing">
            {ORBIT_TEXT}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
