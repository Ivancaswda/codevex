'use client';
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useRef, useState } from "react";
import { LANGUAGE_CONFIG } from "../_constants";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Lock } from "lucide-react";
import useMounted from "@/hooks/useMounted";

function LanguageSelector({ hasAccess }: { hasAccess: boolean }) {
  const [open, setOpen] = useState(false);
  const { language, setLanguage } = useCodeEditorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mounted = useMounted();

  const currentLang = LANGUAGE_CONFIG[language];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectLanguage = (langId: string) => {
    if (!hasAccess && langId !== "javascript") return;
    setLanguage(langId);
    setOpen(false);
  };

  if (!mounted) return null;

  return (
      <div className="relative" ref={dropdownRef}>
        <button
            onClick={() => setOpen((p) => !p)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-sm text-white hover:bg-neutral-700 transition ${
                !hasAccess && language !== "javascript" ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          <Image src={currentLang.logoPath} alt={currentLang.label} width={20} height={20} className="rounded-sm" />
          {currentLang.label}
          <ChevronDown size={14} className={`ml-1 transition ${open ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {open && (
              <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-50 mt-2 w-56 bg-neutral-900 border border-neutral-700 rounded-md shadow-xl overflow-hidden"
              >
                {Object.values(LANGUAGE_CONFIG).map((lang) => {
                  const isLocked = !hasAccess && lang.id !== "javascript";
                  return (
                      <button
                          key={lang.id}
                          onClick={() => selectLanguage(lang.id)}
                          disabled={isLocked}
                          className={`flex items-center justify-between w-full px-3 py-2 text-sm ${
                              lang.id === language ? "bg-neutral-700 text-green-400" : "hover:bg-neutral-800 text-white"
                          } ${isLocked ? "opacity-40 cursor-not-allowed" : ""} transition`}
                      >
                        <div className="flex items-center gap-2">
                          <Image src={lang.logoPath} alt={lang.label} width={20} height={20} />
                          {lang.label}
                        </div>
                        {isLocked ? <Lock size={14} /> : null}
                      </button>
                  );
                })}
              </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
}
export default LanguageSelector;
