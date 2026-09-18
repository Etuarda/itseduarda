import { useEffect, useRef } from "react";

type ParticleType = "neural-node" | "binary" | "leaf" | "flower";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  type: ParticleType;
  char?: string;
  angle: number;
  spin: number;
  color: string;
  alpha: number;
};

type WindLine = {
  y: number;
  speed: number;
  amplitude: number;
  wavelength: number;
  phase: number;
  alpha: number;
};

export default function BotanicalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Paleta Verde Oliva & Sálvia Botânico-Digital Vibrante e Aparente
    const oliveColors = [
      "rgba(85, 107, 47, 0.85)",   // Verde Oliva Base vibrante
      "rgba(47, 62, 20, 0.90)",    // Oliva Profundo elegante
      "rgba(70, 95, 45, 0.80)",    // Oliva Floresta
      "rgba(158, 103, 97, 0.78)",  // Mauve Botânico
    ];

    const binaryChars = ["0", "1", "01", "10", "101", "010", "11"];

    // Gerador de partículas heterogêneas (Redes Neurais + Binário + Folhas + Flores)
    const particleCount = Math.min(Math.floor((width * height) / 12000), 90);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const rand = Math.random();
      let type: ParticleType = "neural-node";
      let char: string | undefined;

      if (rand < 0.38) {
        type = "neural-node"; // Nós de rede neural
      } else if (rand < 0.62) {
        type = "binary"; // Dígitos binários flutuantes
        char = binaryChars[Math.floor(Math.random() * binaryChars.length)];
      } else if (rand < 0.85) {
        type = "leaf"; // Folhas botânicas ao vento
      } else {
        type = "flower"; // Pequenas flores/pétalas
      }

      const r = type === "leaf" ? 3.8 : type === "flower" ? 3.2 : 2.2;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.4) * 0.35 + 0.1, // Deriva suave com o vento para a direita
        vy: (Math.random() - 0.5) * 0.28,
        radius: r,
        type,
        char,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.02,
        color: oliveColors[Math.floor(Math.random() * oliveColors.length)],
        alpha: Math.random() * 0.35 + 0.55,
      });
    }

    // Linhas de vento ondulantes (Breeze lines) bem visíveis
    const windLines: WindLine[] = [
      { y: height * 0.22, speed: 0.8, amplitude: 18, wavelength: 260, phase: 0, alpha: 0.30 },
      { y: height * 0.52, speed: 1.1, amplitude: 24, wavelength: 320, phase: 2, alpha: 0.26 },
      { y: height * 0.82, speed: 0.9, amplitude: 20, wavelength: 290, phase: 4, alpha: 0.32 },
    ];

    // Posição do cursor do mouse/toque
    const mouse = {
      x: -9999,
      y: -9999,
      radius: 130,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      windLines[0].y = height * 0.22;
      windLines[1].y = height * 0.52;
      windLines[2].y = height * 0.82;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("resize", handleResize);

    const maxDistance = 120;
    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // 1. DESENHA LINHAS DE VENTO (BREEZE STREAMLINES)
      ctx.lineWidth = 1.4;
      for (const wind of windLines) {
        wind.phase += wind.speed * 0.012;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(85, 107, 47, ${wind.alpha})`;

        for (let x = 0; x < width; x += 15) {
          const y = wind.y + Math.sin(x / wind.wavelength + wind.phase) * wind.amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // 2. ATUALIZA E DESENHA PARTÍCULAS
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;

        // Efeito de vento contínuo da esquerda para a direita com reaparecimento suave
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;
        if (p.y > height + 20) p.y = -20;
        if (p.y < -20) p.y = height + 20;

        // Interação orgânica com o cursor
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouse.radius) {
          const force = (mouse.radius - distMouse) / mouse.radius;
          p.x -= (dxMouse / distMouse) * force * 1.5;
          p.y -= (dyMouse / distMouse) * force * 1.5;
          p.angle += 0.04;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        if (p.type === "neural-node") {
          // NÓ DE REDE NEURAL: Círculo concêntrico delicado bem definido
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        } else if (p.type === "binary") {
          // NÚMERO BINÁRIO (0 ou 1): Monospace verde oliva visível e nítido
          ctx.font = "bold 11px 'Courier New', monospace";
          ctx.fillStyle = "rgba(47, 62, 20, 0.75)";
          ctx.fillText(p.char || "1", -4, 4);
        } else if (p.type === "leaf") {
          // FOLHA BOTÂNICA: Curva elíptica alongada
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 2.2, p.radius, 0, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(85, 107, 47, 0.60)";
          ctx.fill();
          ctx.strokeStyle = "rgba(47, 62, 20, 0.85)";
          ctx.lineWidth = 1.0;
          ctx.stroke();
          // Nervura central da folha
          ctx.beginPath();
          ctx.moveTo(-p.radius * 2, 0);
          ctx.lineTo(p.radius * 2, 0);
          ctx.stroke();
        } else if (p.type === "flower") {
          // FLOR / PÉTALAS: 4 pequenas pétalas simétricas em tom mauve botânico
          ctx.fillStyle = "rgba(158, 103, 97, 0.65)";
          for (let petal = 0; petal < 4; petal++) {
            ctx.rotate(Math.PI / 2);
            ctx.beginPath();
            ctx.ellipse(0, 3, 2, 3.5, 0, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.beginPath();
          ctx.arc(0, 0, 1.4, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(47, 62, 20, 0.90)";
          ctx.fill();
        }

        ctx.restore();

        // 3. SINAPSES NEURAIS & GALHOS ENTRE NÓS PRÓXIMOS
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineOpacity = (1 - dist / maxDistance) * 0.45;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);

            // Se uma das partículas for nó neural, desenha linha curva de sinapse
            const midX = (p.x + p2.x) / 2 + Math.sin(time + i) * 3;
            const midY = (p.y + p2.y) / 2 + Math.cos(time + j) * 3;

            ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);
            ctx.strokeStyle = `rgba(85, 107, 47, ${lineOpacity})`;
            ctx.lineWidth = 0.95;
            ctx.stroke();

            // Pulso de sinapse neural animado viajando ocasionalmente
            if ((i + j) % 7 === 0) {
              const progress = (Math.sin(time * 2 + i) + 1) / 2;
              const pulseX = p.x + (p2.x - p.x) * progress;
              const pulseY = p.y + (p2.y - p.y) * progress;

              ctx.beginPath();
              ctx.arc(pulseX, pulseY, 1.6, 0, Math.PI * 2);
              ctx.fillStyle = "rgba(85, 107, 47, 0.85)";
              ctx.fill();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-95"
    />
  );
}
