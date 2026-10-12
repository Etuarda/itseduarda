import React, { useEffect, useRef } from "react";

type NodePoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  isLilac: boolean;
  pulsePhase: number;
};

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.parentElement?.clientHeight || window.innerHeight;

    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = width < 768;

    // Menos nós no mobile para proteger bateria e performance
    const count = isMobile ? 22 : 46;
    const maxDist = isMobile ? 95 : 140;

    const nodes: NodePoint[] = [];
    for (let i = 0; i < count; i++) {
      const isLilac = Math.random() < 0.15;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: isLilac ? 2.5 : Math.random() * 2.2 + 1.2,
        color: isLilac ? "rgba(182, 154, 217, 0.45)" : "rgba(88, 100, 75, 0.32)",
        isLilac,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Parallax suave com cursor (Desktop apenas)
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }
    // Com movimento reduzido o quadro é estático: redesenha após cada resize
    const ro = new ResizeObserver(() => {
      resize();
      if (prefersReducedMotion) render();
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    // Pausa o loop fora da viewport e com a aba oculta
    let running = true;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      wake();
    });
    io.observe(canvas);
    const onVisibility = () => wake();
    document.addEventListener("visibilitychange", onVisibility);
    const wake = () => {
      const shouldRun = visible && !document.hidden && !prefersReducedMotion;
      if (shouldRun && !running) {
        running = true;
        animId = requestAnimationFrame(render);
      } else if (!shouldRun) {
        running = false;
        cancelAnimationFrame(animId);
      }
    };

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Interpolação suave do mouse (parallax lento, teto de ~7px)
      if (!isMobile) {
        mouse.x += (mouse.targetX - mouse.x) * 0.03;
        mouse.y += (mouse.targetY - mouse.y) * 0.03;
      }
      const offsetX = !isMobile ? ((mouse.x - width / 2) / (width / 2)) * 7 : 0;
      const offsetY = !isMobile ? ((mouse.y - height / 2) / (height / 2)) * 7 : 0;

      // 1. Atualiza e desenha conexões de rede/grafo
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        if (!prefersReducedMotion) {
          n1.x += n1.vx;
          n1.y += n1.vy;
          if (n1.x < -20) n1.x = width + 20;
          if (n1.x > width + 20) n1.x = -20;
          if (n1.y < -20) n1.y = height + 20;
          if (n1.y > height + 20) n1.y = -20;
        }

        const posX1 = n1.x + offsetX;
        const posY1 = n1.y + offsetY;

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const posX2 = n2.x + offsetX;
          const posY2 = n2.y + offsetY;

          const dx = posX1 - posX2;
          const dy = posY1 - posY2;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(posX1, posY1);
            ctx.lineTo(posX2, posY2);
            ctx.strokeStyle = n1.isLilac || n2.isLilac
              ? `rgba(182, 154, 217, ${alpha * 0.9})`
              : `rgba(88, 100, 75, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // 2. Desenha nós / sementes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const posX = n.x + offsetX;
        const posY = n.y + offsetY;
        const pulse = 1 + Math.sin(time + n.pulsePhase) * 0.15;

        ctx.beginPath();
        ctx.arc(posX, posY, n.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();

        // Anel sutil de dados
        if (n.radius > 2.0) {
          ctx.beginPath();
          ctx.arc(posX, posY, n.radius * 2.2, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(88, 100, 75, 0.08)";
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      if (running && !prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

