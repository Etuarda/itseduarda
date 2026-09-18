import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LaceTrim } from "@/components/ui/CssLace";

export default function SplashIntro() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="splash-container"
          className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-[#F7F6F2] select-none pointer-events-none"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.8,
              ease: [0.77, 0, 0.175, 1],
            },
          }}
        >
          {/* Micro-Scallop Lace Hem on Exit Curtain */}
          <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden translate-y-full">
            <LaceTrim position="bottom" className="opacity-80" />
          </div>

          <div className="relative z-10 text-center px-6 max-w-md">
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 15 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                transition: { delay: 0.1, duration: 0.6, ease: "easeOut" },
              }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-white border border-[#465B20]/30 shadow-xs">
                <span className="text-[#465B20] text-xs">✦</span>
                <span className="font-serif-display text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#2A3614] font-bold">
                  Editorial Portfolio & Guia Beija-Flor
                </span>
                <span className="text-[#9E6761] text-xs">✦</span>
              </div>

              <h1 className="font-serif font-black text-3xl sm:text-5xl text-[#1C1A18] tracking-tight">
                Eduarda Silva Santos
              </h1>
              <p className="font-handwriting text-xl text-[#465B20] mt-1 font-semibold">
                Full-Stack, Dados & Inteligência Artificial
              </p>

              <span className="font-sans text-[10px] text-[#383531] uppercase tracking-[0.22em] font-semibold mt-4 bg-white px-3.5 py-1 rounded-full border border-[#465B20]/25 shadow-xs">
                PUCRS • USP/FDTE • PUC-Rio
              </span>
            </motion.div>

            {/* Sóbria Linha de Carregamento */}
            <div className="w-36 h-1 bg-[#DCD8CA] rounded-full mx-auto mt-6 overflow-hidden relative">
              <motion.div
                id="splash-loading-bar"
                className="absolute top-0 bottom-0 left-0 bg-[#465B20]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
