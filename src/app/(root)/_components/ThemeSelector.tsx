'use client';
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useRef, useState } from "react";
import { THEMES } from "../_constants";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Laptop, Github, Cloud } from "lucide-react";
import useMounted from "@/hooks/useMounted";

const ICONS: Record<string, JSX.Element> = {
  "vs-dark": <Moon size={16} />,
  "vs-light": <Sun size={16} />,
  "github-dark": <Github size={16} />,
  monokai: <Laptop size={16} />,
  "solarized-dark": <Cloud size={16} />,
};

function ThemeSelector() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useCodeEditorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mounted = useMounted();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = THEMES.find((t) => t.id === theme);

  if (!mounted) return null;

  return (
      <div className="relative" ref={dropdownRef}>
        <button
            onClick={() => setOpen((p) => !p)}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-sm text-white hover:bg-neutral-700 transition"
        >
          {ICONS[theme]}
          <span>{current?.label}</span>
          <div className="w-3 h-3 rounded-full border ml-1" style={{ backgroundColor: current?.color }} />
        </button>

        <AnimatePresence>
          {open && (
              <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-50 mt-2 w-48 bg-neutral-900 border border-neutral-700 rounded-md shadow-xl overflow-hidden"
              >
                {THEMES.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => {
                          setTheme(t.id);
                          setOpen(false);
                        }}
                        className={`flex items-center justify-between w-full px-3 py-2 text-sm ${
                            t.id === theme ? "bg-neutral-700 text-green-400" : "hover:bg-neutral-800 text-white"
                        } transition`}
                    >
                      <div className="flex items-center gap-2">
                        {ICONS[t.id] || <span className="w-4 h-4 inline-block bg-gray-500 rounded-full" />}
                        {t.label}
                      </div>
                      <div className="w-3 h-3 rounded-full border" style={{ backgroundColor: t.color }} />
                    </button>
                ))}
              </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
}

export default ThemeSelector;
