import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { alignGraphicWord } from "./HeroGraphicWord";
import { STAGE_ANCHOR_INDEX } from "./intro/IntroStage";
import { alignAnchorTo, centerWithin, fontsReady, glyphInkBox, prefersReducedMotion } from "./heroGeometry";
import { HERO_INTRO_DONE, HERO_INTRO_PLAY, HUMMINGBIRD_INTRO_DONE } from "@/components/ui/HummingbirdGuide";
import { CHAPTERS, birdZoneCoords } from "@/content/chapters";

gsap.registerPlugin(SplitText, MotionPathPlugin);

const INK = "#23241F";
const CREAM = "#F5F2E9";
const WORD_FAINT = "rgba(68, 80, 58, 0.16)";
const LILAC = "#B69AD9";
const HIDE_LEFT = "inset(0% 100% 0% 0%)";
const SHOW = "inset(0% 0% 0% 0%)";
const PANEL_BELOW = "inset(100% 0% 0% 0%)";
const PANEL_ABOVE = "inset(0% 0% 100% 0%)";
const NO_GLOW = "drop-shadow(0px 0px 0px rgba(245,242,233,0))";
const GLOW = "drop-shadow(0px 0px 10px rgba(245,242,233,0.6))";

/** Se o guia não sinalizar o fim do voo de entrada, a apresentação começa assim mesmo. */
const BIRD_INTRO_FALLBACK_MS = 2600;

/**
 * Apresentação em cenas sobre o Hero, conduzida pelo beija-flor (nunca bloqueante).
 * Começa quando o voo de entrada do guia termina; o pássaro do palco assume do
 * mesmo poleiro e devolve o lugar ao guia no final.
 *
 *   01 Origem (0–4.7s)        planta a semente e desenha, com o bico, a linha que atravessa EDUARDA
 *   02 Identidade (4.7–11s)   o oval vira a íris do retrato; o pássaro circula e "escreve" o anel
 *   03 Proposta (11–21s)      varre a tela revelando a 1ª frase; puxa o painel oliva para a 2ª
 *   04 Autoridade (21–41s)    percorre a linha do tempo, visita os nós do grafo, corre as barras
 *   05 Fecho (41–47s)         foto + nome + gancho; volta ao poleiro e o palco se dissolve
 * Scroll, toque, clique, teclado, foco no Hero ou "Pular" encerram na hora.
 */
export default function HeroMotionController() {
  const skipRef = useRef<HTMLButtonElement | null>(null);

  useLayoutEffect(() => {
    const skipBtn = skipRef.current;
    const root = skipBtn?.closest<HTMLElement>("section") ?? null;
    const stage = root?.querySelector<HTMLElement>('[data-intro="stage"]') ?? null;
    if (!root || !stage || !skipBtn) return;

    const q = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(stage.querySelectorAll(sel));
    const one = <T extends Element = HTMLElement>(sel: string) => stage.querySelector<T>(sel);
    const reveal = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll('[data-hero-layer="content"], [data-hero="word"]'),
    );

    const hideStage = () => {
      stage.style.display = "none";
      skipBtn.style.display = "none";
    };

    // Movimento reduzido: sem palco, o Hero já nasce no estado final
    if (prefersReducedMotion()) {
      hideStage();
      return () => {
        stage.style.display = "";
        skipBtn.style.display = "";
      };
    }

    let tl: gsap.core.Timeline | null = null;
    let done = false;
    let disposed = false;
    let started = false;
    const splits: SplitText[] = [];
    const countups = q("[data-count]");
    const restoreCountups = () =>
      countups.forEach((el) => (el.textContent = `${el.dataset.count}${el.dataset.suffix ?? ""}`));

    // ---- Estados iniciais antes do primeiro paint ---------------------------------
    const ctx = gsap.context(() => {
      gsap.set(reveal, { opacity: 0 });
      gsap.set(
        q(
          '[data-intro="portrait-scene"], [data-intro="value-a"], [data-intro="value-b"], ' +
            '[data-intro="hl-1"], [data-intro="hl-2"], [data-intro="hl-3"], [data-intro="final"]',
        ),
        { autoAlpha: 0 },
      );
      gsap.set(q('[data-intro="letter"]'), { opacity: 0 });
      gsap.set(q('[data-intro="rule"]'), { scaleX: 0 });
      gsap.set(q('[data-intro="dot"]'), { scale: 0 });
      gsap.set(q('[data-intro="corner"]'), { clipPath: HIDE_LEFT });
      countups.forEach((el) => (el.textContent = `0${el.dataset.suffix ?? ""}`));
    }, stage);

    // ---- Pular / encerrar -----------------------------------------------------------
    // landed: o pássaro do palco terminou pousado na zona do capítulo 01 (o guia assume dali)
    const handBack = (landed = false) =>
      window.dispatchEvent(new CustomEvent(HERO_INTRO_DONE, { detail: { landed } }));

    const finish = (landed = true) => {
      if (disposed) return;
      done = true;
      unlisten();
      splits.forEach((s) => s.revert());
      splits.length = 0;
      restoreCountups();
      gsap.set(reveal, { clearProps: "opacity" });
      hideStage();
      handBack(landed);
    };

    const skip = () => {
      if (done) return;
      done = true;
      tl?.pause();
      gsap.to(stage, { autoAlpha: 0, duration: 0.45, ease: "power2.out" });
      gsap.to(reveal, {
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
        // pulou no meio: o guia voa a partir do ponto em que estava
        onComplete: () => finish(false),
      });
    };

    const onKey = (e: KeyboardEvent) => {
      if ([" ", "PageDown", "PageUp", "ArrowDown", "ArrowUp", "End", "Home", "Escape", "Enter"].includes(e.key)) skip();
    };
    const onFocusIn = (e: FocusEvent) => {
      if (e.target !== skipBtn) skip();
    };
    let lastWidth = root.clientWidth;
    const onResize = () => {
      if (root.clientWidth === lastWidth) return; // ignora barra de endereço do mobile
      lastWidth = root.clientWidth;
      skip();
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.35) skip();
      },
      { threshold: [0, 0.35] },
    );

    stage.addEventListener("pointerdown", skip);
    skipBtn.addEventListener("click", skip);
    root.addEventListener("focusin", onFocusIn);
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchmove", skip, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    io.observe(stage);

    function unlisten() {
      stage!.removeEventListener("pointerdown", skip);
      skipBtn!.removeEventListener("click", skip);
      root!.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchmove", skip);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      window.removeEventListener(HUMMINGBIRD_INTRO_DONE, onBirdIntroDone);
      io.disconnect();
    }

    // ---- Timeline ---------------------------------------------------------------------
    const build = () => {
      if (disposed || done) return;
      alignGraphicWord(root);

      ctx.add(() => {
        const svg = one<SVGSVGElement>('[data-intro="svg"]')!;
        const seed = one<SVGCircleElement>('[data-intro="seed"]')!;
        const shape = one<SVGRectElement>('[data-intro="shape"]')!;
        const word = one('[data-intro="word"]')!;
        const portrait = one('[data-intro="portrait"]')!;
        const photo = one('[data-intro="photo"]')!;
        const bird = one('[data-intro="bird"]')!;
        const birdFace = one('[data-intro="bird-face"]')!;
        const letters = q('[data-intro="letter"]');
        const anchor = letters[STAGE_ANCHOR_INDEX];

        const W = stage.clientWidth;
        const H = stage.clientHeight;
        svg.setAttribute("width", String(W));
        svg.setAttribute("height", String(H));
        svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

        // A letra-âncora fica concêntrica ao retrato da Cena 02
        alignAnchorTo(word, anchor, portrait);
        const sr = stage.getBoundingClientRect();
        const rel = (el: Element) => centerWithin(el, stage);
        const c = rel(portrait);
        const R = portrait.offsetWidth / 2;
        const ink = glyphInkBox(anchor);
        const aRx = ink.width / 2;
        const aRy = ink.height / 2;
        const letterXs = letters.map((l) => rel(l).x);
        const seedX = Math.max(24, W * 0.08);
        const endX = Math.min(W - 24, W * 0.92);
        const lineLen = Math.max(1, endX - seedX);

        // ---- Geometria do beija-flor -------------------------------------------
        // Tudo é posicionado pela ponta do bico: (96%, 46%) do desenho olhando à direita
        const B = bird.offsetWidth || 64;
        const tipX = (f: 1 | -1) => (f === 1 ? 0.96 : 0.04) * B;
        const tipY = 0.46 * B;
        const at = (x: number, y: number, f: 1 | -1) => ({ x: x - tipX(f), y: y - tipY });
        // Começa onde o voo de entrada do guia pousou (canto superior direito)…
        const perch = { x: W - (W < 768 ? 65 : 85), y: W < 768 ? 78 : 84 };
        // …e termina na zona do capítulo 01, onde o guia continua o sobrevoo
        const home = birdZoneCoords(CHAPTERS[0].bird, W, window.innerHeight);
        const rest = { x: W * 0.86, y: H * 0.22 }; // pouso de leitura, longe do texto

        const [, valueB] = q('[data-intro="value-text"]');
        const linesBSplit = SplitText.create(valueB, { type: "lines", mask: "lines", linesClass: "intro-line", deepSlice: true });
        splits.push(linesBSplit);
        const linesB = linesBSplit.lines;

        tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: () => finish(true), paused: true });

        // ---- Verbos do pássaro ---------------------------------------------------
        const face = (f: 1 | -1, t: number) => tl!.to(birdFace, { scaleX: f, duration: 0.18, ease: "power2.out" }, t);
        const flyTo = (x: number, y: number, f: 1 | -1, t: number, duration: number, ease = "power2.inOut") => {
          face(f, t);
          tl!.to(bird, { ...at(x, y, f), duration, ease }, t);
        };
        const arcTo = (points: { x: number; y: number }[], f: 1 | -1, t: number, duration: number, ease = "power1.inOut") => {
          face(f, t);
          tl!.to(bird, { motionPath: { path: points.map((p) => at(p.x, p.y, f)), curviness: 1.25 }, duration, ease }, t);
        };
        /** Sobe junto com a borda do painel oliva, como se o puxasse. Retorna o fim do movimento. */
        const pullPanel = (mode: "in" | "out", t: number) => {
          const x = W * (mode === "in" ? 0.74 : 0.26);
          const f: 1 | -1 = mode === "in" ? -1 : 1;
          flyTo(x, H + B, f, t, 0.45, "power2.in"); // mergulha para a base
          const ride = t + 0.5;
          tl!.fromTo(
            '[data-intro="panel"]',
            { clipPath: mode === "in" ? PANEL_BELOW : SHOW },
            // immediateRender: false — vários fromTo no mesmo painel; sem isso o último
            // estado "from" registrado seria aplicado já na construção da timeline
            { clipPath: mode === "in" ? SHOW : PANEL_ABOVE, duration: 0.9, ease: "power2.inOut", immediateRender: false },
            ride,
          );
          tl!.fromTo(bird, { ...at(x, H, f) }, { ...at(x, 0, f), duration: 0.9, ease: "power2.inOut", immediateRender: false }, ride);
          tl!.to(bird, { filter: mode === "in" ? GLOW : NO_GLOW, duration: 0.4 }, ride + 0.3);
          tl!.to(
            stage,
            {
              "--frame-ink": mode === "in" ? CREAM : INK,
              "--frame-line": mode === "in" ? "rgba(245,242,233,0.45)" : "rgba(88,100,75,0.45)",
              duration: 0.6,
              ease: "power2.inOut",
            },
            ride + 0.15,
          );
          return ride + 0.9;
        };
        const highlightIn = (n: number, t: number) => {
          const sel = `[data-intro="hl-${n}"]`;
          tl!.set(sel, { autoAlpha: 1 }, t);
          tl!.from(`${sel} [data-intro="hl-label"]`, { opacity: 0, x: -12, duration: 0.6 }, t + 0.2);
          tl!.from(`${sel} [data-intro="hl-title"]`, { clipPath: HIDE_LEFT, duration: 1.0, ease: "power4.inOut" }, t + 0.15);
          tl!.from(`${sel} [data-intro="hl-sub"]`, { opacity: 0, y: 10, duration: 0.7 }, t + 0.7);
          if (stage.querySelector(`${sel} [data-intro="hl-logo"]`))
            tl!.from(`${sel} [data-intro="hl-logo"]`, { opacity: 0, y: 8, duration: 0.5, stagger: 0.12 }, t + 1.0);
        };
        const countTo = (el: HTMLElement, t: number, duration = 1.2) => {
          const target = Number(el.dataset.count);
          const suffix = el.dataset.suffix ?? "";
          const counter = { v: 0 };
          tl!.to(
            counter,
            {
              v: target,
              duration,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = `${Math.round(counter.v)}${suffix}`;
              },
            },
            t,
          );
        };

        // ===== 01 — ORIGEM =========================================================
        tl.call(() => window.dispatchEvent(new Event(HERO_INTRO_PLAY)), undefined, 0);
        tl.set(birdFace, { scaleX: -1 }, 0);
        tl.set(bird, { ...perch, autoAlpha: 1, filter: NO_GLOW }, 0);

        tl.to(q('[data-intro="rule"]'), { scaleX: 1, duration: 1.6, ease: "power3.inOut", stagger: 0.2 }, 0.1);
        tl.to(q('[data-intro="dot"]'), { scale: 1, duration: 0.45, ease: "back.out(2.5)", stagger: 0.06 }, 0.8);

        // Mergulha do poleiro até o ponto da semente e a planta
        arcTo([{ x: W * 0.55, y: H * 0.22 }, { x: seedX, y: c.y }], -1, 0.2, 1.1);
        tl.to(bird, { y: `+=${B * 0.12}`, duration: 0.15, yoyo: true, repeat: 1, ease: "sine.inOut" }, 1.3);
        tl.fromTo(seed, { attr: { cx: seedX, cy: c.y, r: 0 } }, { attr: { r: 3.5 }, duration: 0.5, ease: "back.out(2.4)" }, 1.35);
        face(1, 1.55);

        // Desenha a linha com o bico; cada letra surge quando o bico passa por ela
        const LINE_T = 1.7;
        const LINE_D = 1.8;
        tl.fromTo(
          shape,
          { attr: { x: seedX, y: c.y - 0.5, width: 0.5, height: 1, rx: 0.5, ry: 0.5 }, opacity: 1 },
          { attr: { width: lineLen }, duration: LINE_D, ease: "sine.inOut", immediateRender: false },
          LINE_T,
        );
        tl.fromTo(bird, { ...at(seedX, c.y, 1) }, { ...at(endX, c.y, 1), duration: LINE_D, ease: "sine.inOut", immediateRender: false }, LINE_T);
        letters.forEach((el, i) => {
          const p = gsap.utils.clamp(0, 1, (letterXs[i] - seedX) / lineLen);
          const t = LINE_T + (Math.acos(1 - 2 * p) / Math.PI) * LINE_D; // inverso de sine.inOut
          tl!.fromTo(el, { opacity: 0, yPercent: 14 }, { opacity: 1, yPercent: 0, duration: 0.6 }, t);
        });

        // Linha → pílula → oval no "A", enquanto o pássaro contorna a letra por cima
        const pillH = aRy * 0.7;
        const pillW = aRx * 3.2;
        tl.to(
          shape,
          {
            attr: { x: c.x - pillW / 2, y: c.y - pillH / 2, width: pillW, height: pillH, rx: pillH / 2, ry: pillH / 2 },
            duration: 0.6,
            ease: "power3.inOut",
          },
          3.6,
        );
        tl.to(seed, { attr: { cx: c.x - pillW / 2, r: 0 }, duration: 0.6, ease: "power3.inOut" }, 3.6);
        tl.to(
          shape,
          { attr: { x: c.x - aRx, y: c.y - aRy, width: aRx * 2, height: aRy * 2, rx: aRx, ry: aRy }, duration: 0.55, ease: "power2.inOut" },
          4.2,
        );
        arcTo(
          [
            { x: c.x + aRx * 1.5, y: c.y - aRy * 0.9 },
            { x: c.x, y: c.y - aRy * 1.45 },
            { x: c.x - aRx * 1.5, y: c.y - aRy * 0.6 },
          ],
          -1,
          3.6,
          1.1,
        );
        tl.to(anchor, { color: LILAC, duration: 0.35 }, 4.5);

        // ===== 02 — IDENTIDADE ======================================================
        tl.set('[data-intro="portrait-scene"]', { autoAlpha: 1 }, 4.7);
        tl.set(photo, { clipPath: "circle(0% at 50% 50%)" }, 4.7);
        tl.set('[data-intro="orbit"]', { autoAlpha: 0, rotate: -30, scale: 0.94 }, 4.7);
        tl.set('[data-intro="role"]', { clipPath: HIDE_LEFT }, 4.7);
        tl.set('[data-intro="photo-img"]', { scale: 1.15 }, 4.7);

        tl.to(shape, { attr: { x: c.x - R, y: c.y - R, width: R * 2, height: R * 2, rx: R, ry: R }, duration: 1.0, ease: "power3.inOut" }, 4.7);
        tl.to(anchor, { opacity: 0, duration: 0.45 }, 4.85);
        // EDU ◯ RDA: as letras abrem espaço para o retrato e recuam para o fundo
        letters.forEach((el, i) => {
          if (i === STAGE_ANCHOR_INDEX) return;
          const side = i < STAGE_ANCHOR_INDEX ? -1 : 1;
          tl!.to(el, { x: side * R * 0.42, color: WORD_FAINT, duration: 1.2, ease: "power3.inOut" }, 4.8);
        });
        tl.to(photo, { clipPath: "circle(50% at 50% 50%)", duration: 1.3, ease: "power3.inOut" }, 5.3);
        tl.to('[data-intro="photo-img"]', { scale: 1, duration: 2.2, ease: "power2.out" }, 5.3);
        tl.to(shape, { opacity: 0, duration: 0.6 }, 6.4);

        // O pássaro circula o retrato enquanto o anel orbital é "escrito"
        const orbitR = R * 1.32;
        const ring = (deg: number) => ({
          x: c.x + Math.cos((deg * Math.PI) / 180) * orbitR,
          y: c.y + Math.sin((deg * Math.PI) / 180) * orbitR,
        });
        arcTo([ring(-150), ring(-90), ring(-30), ring(30), ring(90), ring(150), ring(210), ring(-45)], 1, 5.6, 2.6);
        face(-1, 8.2);
        tl.to('[data-intro="orbit"]', { autoAlpha: 1, rotate: 0, scale: 1, duration: 1.8 }, 5.9);
        tl.fromTo(
          q('[data-hero="orbit-mask"]'),
          { attr: { "stroke-dashoffset": 1 } },
          { attr: { "stroke-dashoffset": 0 }, duration: 2.3, ease: "power2.inOut" },
          5.9,
        );
        tl.to(q('[data-intro="corner"]'), { clipPath: SHOW, duration: 0.9, ease: "power4.inOut", stagger: 0.15 }, 6.6);
        tl.to('[data-intro="role"]', { clipPath: SHOW, duration: 1.3, ease: "power4.inOut" }, 7.6);
        // leitura: posicionamento até ~11s

        // ===== 03 — PROPOSTA DE VALOR ===============================================
        // Varre a tela da esquerda para a direita: atrás do bico surge a 1ª frase
        flyTo(-B * 0.2, H * 0.5, -1, 11.0, 0.7);
        const SWEEP_T = 11.8;
        const SWEEP_D = 1.5;
        face(1, SWEEP_T - 0.1);
        tl.fromTo(bird, { ...at(0, H * 0.5, 1) }, { ...at(W, H * 0.5, 1), duration: SWEEP_D, ease: "sine.inOut", immediateRender: false }, SWEEP_T);
        tl.set('[data-intro="value-a"]', { autoAlpha: 1, clipPath: HIDE_LEFT }, SWEEP_T);
        tl.to('[data-intro="value-a"]', { clipPath: SHOW, duration: SWEEP_D, ease: "sine.inOut" }, SWEEP_T);
        tl.to('[data-intro="portrait-scene"]', { clipPath: "inset(0% 0% 0% 100%)", duration: SWEEP_D, ease: "sine.inOut" }, SWEEP_T);
        tl.to(letters, { autoAlpha: 0, duration: 0.8 }, SWEEP_T);
        tl.set('[data-intro="portrait-scene"]', { autoAlpha: 0, clipPath: SHOW }, SWEEP_T + SWEEP_D);
        tl.from(q('[data-intro="value-a"] [data-intro="accent"]'), { color: INK, duration: 0.8, ease: "power2.inOut" }, 13.4);
        flyTo(rest.x, rest.y, -1, SWEEP_T + SWEEP_D, 0.8);
        // leitura: 1ª frase até ~15.5s

        // Puxa o painel oliva e a 2ª frase entra sobre ele
        const afterPanel1 = pullPanel("in", 15.5);
        tl.set('[data-intro="value-a"]', { autoAlpha: 0 }, afterPanel1);
        tl.set('[data-intro="value-b"]', { autoAlpha: 1 }, afterPanel1 - 0.3);
        tl.from(linesB, { yPercent: 110, duration: 1.0, ease: "power4.out", stagger: 0.12 }, afterPanel1 - 0.3);
        tl.from(q('[data-intro="value-b"] [data-intro="accent"]'), { color: CREAM, duration: 0.8, ease: "power2.inOut" }, afterPanel1 + 0.7);
        flyTo(rest.x, rest.y, -1, afterPanel1, 0.7);
        // leitura: 2ª frase até ~21s

        // ===== 04 — AUTORIDADE ======================================================
        tl.to(linesB, { yPercent: -110, duration: 0.5, ease: "power3.in", stagger: 0.05 }, 21.0);
        const afterPanel2 = pullPanel("out", 21.0);
        tl.set('[data-intro="value-b"]', { autoAlpha: 0 }, afterPanel2);

        // 01 · Formação — o pássaro percorre a linha do tempo até "Em andamento"
        const H1 = afterPanel2 - 0.2;
        highlightIn(1, H1);
        const track = one('[data-intro="hl-1"] [data-ig="track"]')!;
        const marker = one('[data-intro="hl-1"] [data-ig="marker"]')!;
        const tr = track.getBoundingClientRect();
        const trackY = tr.top - sr.top;
        const trackX0 = tr.left - sr.left;
        const markerX = rel(marker).x;
        flyTo(trackX0, trackY - 4, 1, H1 + 0.8, 0.8);
        tl.from('[data-intro="hl-1"] [data-ig="track"]', { scaleX: 0, duration: 1.0, ease: "power3.inOut" }, H1 + 1.0);
        tl.from('[data-intro="hl-1"] [data-ig="tick"]', { opacity: 0, y: 6, duration: 0.4, stagger: 0.12 }, H1 + 1.2);
        tl.from('[data-intro="hl-1"] [data-ig="fill"]', { scaleX: 0, duration: 1.6, ease: "sine.inOut" }, H1 + 1.7);
        tl.to(bird, { x: at(markerX, 0, 1).x, duration: 1.6, ease: "sine.inOut" }, H1 + 1.7);
        tl.from('[data-intro="hl-1"] [data-ig="marker"]', { opacity: 0, scale: 0.4, duration: 0.5, ease: "back.out(2)" }, H1 + 3.3);
        tl.to(bird, { y: `-=${B * 0.6}`, duration: 0.45, ease: "power2.out" }, H1 + 3.3);
        tl.from('[data-intro="hl-1"] [data-ig="chip"]', { opacity: 0, y: 8, duration: 0.45, stagger: 0.08 }, H1 + 2.4);
        // leitura: formação até ~H1+6.2

        // 02 · Dados · IA · RAG — visita os nós; as arestas nascem do voo
        const P2 = H1 + 6.2;
        const afterPanel3 = pullPanel("in", P2);
        tl.set('[data-intro="hl-1"]', { autoAlpha: 0 }, afterPanel3);
        const H2 = afterPanel3 - 0.2;
        highlightIn(2, H2);
        const nodes = q<SVGCircleElement>('[data-intro="hl-2"] [data-ig="node-group"] > circle:first-child').map(rel);
        const edges = q<SVGLineElement>('[data-intro="hl-2"] [data-ig="edge"]');
        tl.from('[data-intro="hl-2"] [data-ig="node"]', { scale: 0, transformOrigin: "50% 50%", duration: 0.45, ease: "back.out(2.4)", stagger: 0.1 }, H2 + 0.5);
        tl.from('[data-intro="hl-2"] [data-ig="label"]', { opacity: 0, duration: 0.5, stagger: 0.08 }, H2 + 0.9);
        if (nodes.length === 3) {
          flyTo(nodes[0].x, nodes[0].y - 14, 1, H2 + 0.6, 0.8);
          // percurso 0→1→2→0; arestas declaradas no infográfico como [0,1], [1,2], [0,2]
          const legs: [number, number][] = [
            [0, 1],
            [1, 2],
            [2, 0],
          ];
          legs.forEach(([a, b], i) => {
            const t = H2 + 1.5 + i * 0.9;
            const f: 1 | -1 = nodes[b].x >= nodes[a].x ? 1 : -1;
            flyTo(nodes[b].x, nodes[b].y - 14, f, t, 0.8, "sine.inOut");
            const edge = edges[i];
            if (edge)
              tl!.fromTo(edge, { attr: { "stroke-dashoffset": 1 } }, { attr: { "stroke-dashoffset": 0 }, duration: 0.8, ease: "sine.inOut" }, t);
          });
        }
        // cada nó conta suas horas quando o pássaro chega: 0 (Dados), 1 (IA), 2 (RAG)
        const nodeCounts = q('[data-intro="hl-2"] [data-ig="node-group"]').map((g) => g.querySelector<HTMLElement>("[data-count]"));
        const arrivals = [H2 + 1.4, H2 + 2.3, H2 + 3.2];
        nodeCounts.forEach((el, i) => el && countTo(el, arrivals[i], 1.0));
        flyTo(rest.x, rest.y, -1, H2 + 4.3, 0.8);
        // leitura: residências até ~H2+6

        // 03 · Cubos · PDA — corre cada barra enquanto ela cresce
        const P3 = H2 + 6.0;
        const afterPanel4 = pullPanel("out", P3);
        tl.set('[data-intro="hl-2"]', { autoAlpha: 0 }, afterPanel4);
        const H3 = afterPanel4 - 0.2;
        highlightIn(3, H3);
        const bars = q('[data-intro="hl-3"] [data-ig="bar"]');
        const barCounts = q('[data-intro="hl-3"] [data-count]');
        bars.forEach((bar, i) => {
          const r = bar.getBoundingClientRect();
          const y = r.top - sr.top - 6;
          const x0 = r.left - sr.left;
          const t = H3 + 1.0 + i * 0.8;
          flyTo(x0, y, 1, t - 0.35, 0.35, "power2.out");
          tl!.from(bar, { scaleX: 0, duration: 0.75, ease: "sine.inOut" }, t);
          tl!.to(bird, { x: at(x0 + r.width, 0, 1).x, duration: 0.75, ease: "sine.inOut" }, t);
          if (barCounts[i]) countTo(barCounts[i], t, 0.75);
        });
        flyTo(rest.x, rest.y, -1, H3 + 1.0 + bars.length * 0.8, 0.8);
        // leitura: formações intensivas até ~H3+6

        // ===== 05 — FECHO ==========================================================
        const F = H3 + 6.0;
        tl.to('[data-intro="hl-3"]', { autoAlpha: 0, duration: 0.4 }, F);

        // O retrato reaparece no lugar reservado do fecho (medido, não estimado)
        const slot = one('[data-intro="final-slot"]')!;
        const s = slot.offsetWidth / portrait.offsetWidth;
        const sc = rel(slot);
        tl.set('[data-intro="role"]', { autoAlpha: 0 }, F + 0.3);
        tl.set('[data-intro="portrait-scene"]', { scale: 1 }, F + 0.3);
        tl.set(portrait, { x: sc.x - c.x, y: sc.y - c.y, scale: s }, F + 0.3);
        tl.set('[data-intro="final"]', { autoAlpha: 1 }, F + 0.35);
        tl.to('[data-intro="portrait-scene"]', { autoAlpha: 1, duration: 0.7, ease: "power2.out" }, F + 0.35);
        tl.fromTo(portrait, { scale: s * 0.9 }, { scale: s, duration: 1.0, ease: "power3.out", immediateRender: false }, F + 0.35);
        tl.from('[data-intro="final-name"]', { clipPath: HIDE_LEFT, duration: 1.1, ease: "power4.inOut" }, F + 0.7);
        tl.from('[data-intro="final-hook"]', { clipPath: HIDE_LEFT, duration: 1.0, ease: "power4.inOut" }, F + 1.4);
        // pousa ao lado da seta do gancho, que "aponta" o caminho
        const arrow = rel(one('[data-intro="final-arrow"]')!);
        flyTo(arrow.x + 18, arrow.y - 8, -1, F + 1.6, 0.9);
        tl.fromTo('[data-intro="final-arrow"]', { y: 0 }, { y: 6, duration: 0.4, yoyo: true, repeat: 3, ease: "sine.inOut" }, F + 2.5);

        // Volta ao poleiro e devolve a cena ao guia; o palco se dissolve no layout real
        arcTo([{ x: W * 0.4, y: H * 0.3 }, { x: home.x + tipX(-1), y: home.y + tipY }], -1, F + 3.9, 1.2);
        face(1, F + 5.0); // em repouso à esquerda, olha para dentro da tela
        tl.to(stage, { autoAlpha: 0, duration: 0.8, ease: "power2.inOut" }, F + 4.6);
        tl.to(reveal, { opacity: 1, duration: 0.8, ease: "power2.inOut" }, F + 4.6);
      });

      tl?.play();
    };

    // Só começa depois do voo de entrada do guia (ou do fallback)
    const start = () => {
      if (started || disposed || done) return;
      started = true;
      fontsReady().then(() => requestAnimationFrame(build));
    };
    function onBirdIntroDone() {
      start();
    }
    if (window.__hummingbirdIntroDone) start();
    else window.addEventListener(HUMMINGBIRD_INTRO_DONE, onBirdIntroDone, { once: true });
    const fallback = window.setTimeout(start, BIRD_INTRO_FALLBACK_MS);

    return () => {
      disposed = true;
      window.clearTimeout(fallback);
      unlisten();
      ctx.revert();
      splits.forEach((s) => s.revert());
      restoreCountups();
      gsap.set(reveal, { clearProps: "opacity" });
      stage.style.display = "";
      skipBtn.style.display = "";
      handBack();
    };
  }, []);

  return (
    <button
      ref={skipRef}
      type="button"
      className="absolute left-1/2 -translate-x-1/2 top-[calc(100svh-7rem)] z-40 px-3 sm:px-4 py-2 whitespace-nowrap text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.22em] text-[#44503A] hover:text-[#23241F] bg-[#F5F2E9]/80 border border-[#58644B]/25 hover:border-[#58644B] transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#B69AD9]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      Pular apresentação
    </button>
  );
}
