import React from "react";

const keyStyle = { fontFamily: "'Playfair Display', Georgia, serif" };

export default function HeroHeadline() {
  return (
    <h2
      className="font-bold text-[#23241F] tracking-tight leading-[1] select-text"
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "clamp(1.3rem, min(3.8vw, 4.9svh), 4rem)",
        textWrap: "balance",
      }}
    >
      Transformo problemas em soluções digitais funcionais e{" "}
      <em className="hero-key" style={keyStyle}>
        escaláveis
      </em>
      , da ideia à implementação, conectando software, dados e{" "}
      <em className="hero-key" style={keyStyle}>
        inteligência artificial
      </em>
      .
    </h2>
  );
}
