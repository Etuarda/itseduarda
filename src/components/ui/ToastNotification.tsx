import { motion, AnimatePresence } from "motion/react";
import { Check, Sparkles, X } from "lucide-react";

type ToastProps = {
  message: string | null;
  subMessage?: string;
  onClose: () => void;
};

export default function ToastNotification({ message, subMessage, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-auto bg-[#F7F6F2]/95 backdrop-blur-md border border-[#465B20]/35 rounded-2xl p-4 shadow-[0_15px_35px_-5px_rgba(28,26,24,0.25)] text-[#1C1A18] flex items-start gap-3"
          role="status"
          aria-live="polite"
        >
          <div className="w-8 h-8 rounded-full bg-[#465B20]/15 border border-[#465B20]/35 flex items-center justify-center text-[#465B20] shrink-0 mt-0.5">
            <Check className="w-4 h-4" />
          </div>

          <div className="flex flex-col pr-2">
            <span className="font-serif font-bold text-sm text-[#1C1A18] leading-tight">
              {message}
            </span>
            {subMessage && (
              <span className="font-sans text-xs text-[#383531] font-normal mt-0.5 leading-relaxed">
                {subMessage}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-[#4E4A45] hover:text-[#1C1A18] p-1 transition-colors cursor-pointer"
            aria-label="Fechar notificação"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

