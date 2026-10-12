import { useEffect, useRef } from "react";

type ParticleType = "seed" | "neural-node" | "binary" | "leaf" | "flower";

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

export default function BotanicalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const updateCanvasDimensions = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    updateCanvasDimensions();

    // Paleta Botânica & Tecnológica Vívida, Nítida e Elegante
    const oliveColors = [
      "rgba(58, 77, 24, 0.85)",   // Verde Oliva Escuro Principal
      "rgba(42, 54, 20, 0.88)",   // Oliva Floresta Profundo
      "rgba(85, 107, 47, 0.80)",  // Oliva Dourado
      "rgba(158, 103, 97, 0.82)", // Mauve / Rosa Vintage
      "rgba(92, 110, 80, 0.80)",  // Sálvia Botânica
    ];

    const binaryChars = ["0", "1", "01", "10", "101", "010", "11", "001"];

    const isMobile = width < 640;
    const maxParticles = isMobile ? 40 : 95;
    const particleCount = Math.min(Math.floor((width * height) / 11000), maxParticles);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const rand = Math.random();
      let type: ParticleType = "neural-node";
      let char: string | undefined;

      if (rand < 0.28) {
        type = "seed"; // Semente botânica com pluma leve (Dente-de-leão)
      } else if (rand < 0.50) {
        type = "neural-node"; // Nós de rede neural
      } else if (rand < 0.70) {
        type = "binary"; // Dígito binário suave
        char = binaryChars[Math.floor(Math.random() * binaryChars.length)];
      } else if (rand < 0.88) {
        type = "leaf"; // Microfolha botânica
      } else {
        type = "flower"; // Pétalas delicadas
      }

      const r =
        type === "leaf" ? 4.5 :
        type === "seed" ? 3.5 :
        type === "flower" ? 4.0 : 2.5;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.4) * 0.4 + 0.12, // Deriva suave contínua
        vy: (Math.random() - 0.5) * 0.28,
        radius: r,
        type,
        char,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.025,
        color: oliveColors[Math.floor(Math.random() * oliveColors.length)],
        alpha: Math.random() * 0.35 + 0.65, // Alta opacidade para visibilidade perfeita
      });
    }

    // Cursor e Interação
    const mouse = {
      x: -9999,
      y: -9999,
      radius: 170,
    };

    let scrollSpeed = 0;
    let lastScrollY = window.scrollY;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollSpeed = Math.min(Math.max((currentScrollY - lastScrollY) * 0.06, -3.5), 3.5);
      lastScrollY = currentScrollY;
    };

    const handleResize = () => {
      if (!canvas) return;
      updateCanvasDimensions();
    };

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const maxDistance = isMobile ? 100 : 145;
    let time = 0;

    const render = () => {
      if (document.hidden) return;
      time += 0.015;
      scrollSpeed *= 0.94; // Decaimento da brisa de scroll

      ctx.clearRect(0, 0, width, height);

      // Desenha conexão entre o cursor e partículas próximas (efeito polinização interativa)
      if (mouse.x > 0 && mouse.y > 0) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dxM = mouse.x - p.x;
          const dyM = mouse.y - p.y;
          const distM = Math.sqrt(dxM * dxM + dyM * dyM);

          if (distM < mouse.radius) {
            const filamentAlpha = (1 - distM / mouse.radius) * 0.45;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            const midX = (mouse.x + p.x) / 2 + Math.sin(time * 2 + i) * 8;
            const midY = (mouse.y + p.y) / 2 + Math.cos(time * 2 + i) * 8;
            ctx.quadraticCurveTo(midX, midY, p.x, p.y);
            ctx.strokeStyle = `rgba(70, 91, 32, ${filamentAlpha})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy + scrollSpeed * 0.45;
        p.angle += p.spin;

        // Reaparecimento contínuo nas bordas
        if (p.x > width + 30) p.x = -30;
        if (p.x < -30) p.x = width + 30;
        if (p.y > height + 30) p.y = -30;
        if (p.y < -30) p.y = height + 30;

        // Reação ao mouse (repulsão e rotação orgânica)
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouse.radius) {
          const force = (mouse.radius - distMouse) / mouse.radius;
          p.x -= (dxMouse / (distMouse || 1)) * force * 2.8;
          p.y -= (dyMouse / (distMouse || 1)) * force * 2.8;
          p.angle += 0.08;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        if (p.type === "seed") {
          // SEMENTE BOTÂNICA: Núcleo escuro com pluma filamentar (Dente-de-leão)
          ctx.beginPath();
          ctx.ellipse(0, 0, 3.2, 1.6, 0, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

          // Plumas de dispersão ao vento
          ctx.strokeStyle = "rgba(70, 91, 32, 0.70)";
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          ctx.moveTo(-2, 0);
          ctx.lineTo(-9, -5);
          ctx.moveTo(-2, 0);
          ctx.lineTo(-11, 0);
          ctx.moveTo(-2, 0);
          ctx.lineTo(-9, 5);
          ctx.stroke();
        } else if (p.type === "neural-node") {
          // NÓ NEURAL: Ponto nítido com anel pulsante
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(0, 0, p.radius * 2.2, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(70, 91, 32, 0.35)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        } else if (p.type === "binary") {
          // NÚMERO BINÁRIO: Monospace nítido
          ctx.font = "bold 12px 'Courier New', monospace";
          ctx.fillStyle = "rgba(42, 54, 20, 0.70)";
          ctx.fillText(p.char || "1", -4, 4);
        } else if (p.type === "leaf") {
          // FOLHA BOTÂNICA: Silhueta elíptica com nervura central viva
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 2.4, p.radius * 1.1, 0, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(85, 107, 47, 0.65)";
          ctx.fill();
          ctx.strokeStyle = "rgba(42, 54, 20, 0.85)";
          ctx.lineWidth = 1.0;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(-p.radius * 2.2, 0);
          ctx.lineTo(p.radius * 2.2, 0);
          ctx.stroke();
        } else if (p.type === "flower") {
          // FLOR / PÉTALAS: Pétalas em tom mauve vintage
          for (let petal = 0; petal < 4; petal++) {
            ctx.save();
            ctx.rotate((petal * Math.PI) / 2);
            ctx.beginPath();
            ctx.ellipse(0, 2.5, 1.4, 2.8, 0, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(158, 103, 97, 0.70)";
            ctx.fill();
            ctx.restore();
          }
          ctx.beginPath();
          ctx.arc(0, 0, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = "#FAF8F5";
          ctx.fill();
        }

        ctx.restore();

        // Conexões neurais orgânicas entre nós próximos
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineOpacity = (1 - dist / maxDistance) * 0.38;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);

            const midX = (p.x + p2.x) / 2 + Math.sin(time + i) * 3;
            const midY = (p.y + p2.y) / 2 + Math.cos(time + j) * 3;

            ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);
            ctx.strokeStyle = `rgba(70, 91, 32, ${lineOpacity})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-100"
    />
  );
}
