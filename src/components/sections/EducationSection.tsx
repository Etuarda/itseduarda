import React, { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { educationContent } from "@/content/education";
import type { EducationTier, EducationItem } from "@/types/content";
import { GraduationCap, Award, BookMarked, CheckCircle2, Clock } from "lucide-react";

export default function EducationSection() {
  const degree = educationContent.filter((e) => e.tier === "degree");
  const extensive = educationContent.filter((e) => e.tier === "extensive");
  const specializations = educationContent.filter((e) => e.tier === "specialization");
  const complementary = educationContent.filter((e) => e.tier === "complementary");

  return (
    <section
      id="formacao"
      aria-label="Formação Acadêmica e Especializações Técnicas"
      className="w-full py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto scroll-mt-20 relative select-text"
    >
      {/* 1. Título Editorial Limpo */}
      <div className="mb-12 sm:mb-16">
        <SectionTitle
          index="05"
          title="Formação"
          scriptAccent="fundamentos sólidos"
          align="left"
          subtitle="Educação superior e mais de 2.000 horas em programas imersivos e residências técnicas em Engenharia de Software, Dados e Inteligência Artificial."
        />
      </div>

      {/* 2. TIER 1: GRADUAÇÃO SUPERIOR (Destaque Principal) */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4 text-[#465B20]">
          <GraduationCap className="w-4 h-4" />
          <span className="font-mono text-xs uppercase tracking-widest font-bold">
            01 / Graduação Superior
          </span>
        </div>

        {degree.map((item) => (
          <div
            key={item.id}
            className="p-6 sm:p-8 bg-[#FAF8F5]/90 border-2 border-[#465B20] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex flex-col gap-2 max-w-3xl">
              <span className="font-mono text-xs font-bold text-[#465B20]">
                {item.institution}
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1C1A18]">
                {item.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {item.skills?.map((sk) => (
                  <span
                    key={sk}
                    className="font-mono text-[10px] uppercase px-2 py-0.5 border border-[#465B20]/30 text-[#1C1A18] bg-white"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end justify-between shrink-0 gap-3 border-t md:border-t-0 md:border-l border-[#465B20]/20 pt-4 md:pt-0 md:pl-6">
              <span className="font-mono text-xs font-bold text-[#1C1A18]">
                {item.year}
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-xs text-[#465B20] font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Em Andamento</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. TIER 2: PROGRAMAS IMERSIVOS EXTENSIVOS (Horas Comprovadas) */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4 text-[#465B20]">
          <Clock className="w-4 h-4" />
          <span className="font-mono text-xs uppercase tracking-widest font-bold">
            02 / Programas Imersivos Extensivos (+2.000 horas somadas)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {extensive.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-[#FAF8F5]/85 border border-[#465B20]/25 flex flex-col justify-between gap-5 shadow-2xs hover:border-[#465B20]/50 transition-all"
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#465B20] font-bold">
                    {item.institution}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#1C1A18]">
                    {item.year}
                  </span>
                </div>

                <h4 className="font-serif font-bold text-xl text-[#1C1A18] leading-snug">
                  {item.title}
                </h4>

                {item.note && (
                  <span className="font-mono text-xs font-bold text-[#465B20]">
                    {item.note}
                  </span>
                )}

                <p className="font-sans text-xs sm:text-sm text-[#383531] leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.skills?.map((sk) => (
                    <span
                      key={sk}
                      className="font-mono text-[9px] uppercase px-2 py-0.5 border border-[#465B20]/20 text-[#4E4A45] bg-white"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#465B20]/15 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#4E4A45]">
                  Formação Verificada
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-[#465B20] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Concluído / Em Andamento</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. TIER 3 & 4: ESPECIALIZAÇÕES & FORMAÇÃO COMPLEMENTAR */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tier 3: Especializações */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[#465B20]">
            <Award className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-widest font-bold">
              03 / Especializações Técnicas
            </span>
          </div>

          <div className="flex flex-col divide-y divide-[#465B20]/15 border-t border-[#465B20]/20">
            {specializations.map((item) => (
              <div key={item.id} className="py-4 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <h5 className="font-serif font-bold text-base text-[#1C1A18]">
                    {item.title}
                  </h5>
                  <span className="font-mono text-xs text-[#465B20] font-semibold shrink-0">
                    {item.year}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#4E4A45]">
                  {item.institution}
                </span>
                <p className="font-sans text-xs text-[#383531] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 4: Formação Complementar */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[#465B20]">
            <BookMarked className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-widest font-bold">
              04 / Formação Complementar
            </span>
          </div>

          <div className="flex flex-col divide-y divide-[#465B20]/15 border-t border-[#465B20]/20">
            {complementary.map((item) => (
              <div key={item.id} className="py-4 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <h5 className="font-serif font-bold text-base text-[#1C1A18]">
                    {item.title}
                  </h5>
                  <span className="font-mono text-xs text-[#465B20] font-semibold shrink-0">
                    {item.year}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#4E4A45]">
                  {item.institution}
                </span>
                <p className="font-sans text-xs text-[#383531] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
