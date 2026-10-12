import React from "react";
import HeroBackground from "./HeroBackground";
import HeroGraphicWord from "./HeroGraphicWord";
import HeroIdentity from "./HeroIdentity";
import HeroPortrait from "./HeroPortrait";
import HeroHeadline from "./HeroHeadline";
import CredentialsRail from "./CredentialsRail/CredentialsRail";
import HeroHook from "./HeroHook";
import IntroStage from "./intro/IntroStage";
import HeroMotionController from "./HeroMotionController";

/**
 * Seção 01 — Apresentação + Posicionamento.
 * DOM único e recomposto por breakpoint (sem duplicar desktop/mobile):
 *   mobile:  nome → posicionamento → retrato → headline → trilho → gancho
 *   desktop: pôster assimétrico — identidade e headline à esquerda, retrato-"O" à direita
 */
export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      data-chapter="hero"
      className="chapter w-full relative bg-[#F5F2E9] text-[#23241F] overflow-hidden flex flex-col px-6 sm:px-10 lg:px-16 pt-[max(6.5rem,12svh)] pb-[max(3.5rem,8svh)]"
    >
      <HeroBackground />
      <HeroGraphicWord />
      <IntroStage />
      <HeroMotionController />

      <div
        data-hero-layer="content"
        className="relative z-10 w-full max-w-7xl mx-auto flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[auto_1fr_auto_auto] gap-x-8 gap-y-[clamp(0.6rem,1.8svh,2rem)] content-center-safe"
      >
        <div className="lg:col-span-7 lg:row-start-1">
          <HeroIdentity />
        </div>

        <div className="flex justify-center items-center lg:col-start-8 lg:col-span-5 lg:row-start-1 lg:row-span-2">
          <HeroPortrait />
        </div>

        <div className="lg:col-span-7 lg:row-start-2 lg:self-center">
          <HeroHeadline />
        </div>

        <div className="lg:col-span-12 lg:row-start-3 min-w-0">
          <CredentialsRail />
        </div>

        <div className="lg:col-span-12 lg:row-start-4">
          <HeroHook />
        </div>
      </div>
    </section>
  );
}
