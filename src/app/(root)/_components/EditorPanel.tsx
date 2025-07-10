"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useState } from "react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../_constants";
import { Editor } from "@monaco-editor/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { RotateCcwIcon, ShareIcon, TypeIcon } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { EditorPanelSkeleton } from "./EditorPanelSkeleton";
import useMounted from "@/hooks/useMounted";
import ShareSnippetDialog from "./ShareSnippetDialog";

function EditorPanel() {
  const clerk = useClerk();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const { language, theme, fontSize, editor, setFontSize, setEditor } = useCodeEditorStore();
  const mounted = useMounted();

  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`);
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(newCode);
  }, [language, editor]);

  useEffect(() => {
    const savedFontSize = localStorage.getItem("editor-font-size");
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
  }, [setFontSize]);

  const handleRefresh = () => {
    const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(defaultCode);
    localStorage.removeItem(`editor-code-${language}`);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value) localStorage.setItem(`editor-code-${language}`, value);
  };

  const handleFontSizeChange = (newSize: number) => {
    const size = Math.min(Math.max(newSize, 12), 24);
    setFontSize(size);
    localStorage.setItem("editor-font-size", size.toString());
  };

  if (!mounted) return null;

  return (
      <div className="relative">
        <div className="bg-[#121212] border border-[#00ff8855] p-6 rounded-xl shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-[#1e1e2e] border border-[#2a2a2a] rounded-lg">
                <Image src={`/${language}.png`} alt="Language" width={24} height={24} />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white">{language}</h2>

              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Font Size */}
              <div className="flex items-center gap-3 px-3 py-2 bg-[#1e1e2e] rounded-lg border border-[#2a2a2a]">
                <TypeIcon className="w-4 h-4 text-gray-400" />
                <input
                    type="range"
                    min="12"
                    max="24"
                    value={fontSize}
                    onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
                    className="w-24"
                />
                <span className="text-sm text-[#00ff88]">{fontSize}</span>
              </div>

              {/* Reset Button */}
              <motion.button
                  onClick={handleRefresh}
                  className="p-2 rounded-lg bg-[#1a1a1a] border border-[#00ff8844] hover:bg-[#222] transition"
              >
                <RotateCcwIcon className="w-4 h-4 text-[#00ff88]" />
              </motion.button>

              {/* Share */}
              <motion.button
                  onClick={() => setIsShareDialogOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00ff88] hover:bg-[#00cc66] text-black font-medium transition"
              >
                <ShareIcon className="w-4 h-4" />
                Поделиться
              </motion.button>
            </div>
          </div>

          {/* Editor */}
          <div className="rounded-xl overflow-hidden border border-white/10">
            {clerk.loaded ? (
                <Editor
                    height="600px"
                    language={LANGUAGE_CONFIG[language].monacoLanguage}
                    theme={theme}
                    beforeMount={defineMonacoThemes}
                    onMount={(editor) => setEditor(editor)}
                    onChange={handleEditorChange}
                    options={{
                      minimap: { enabled: false },
                      fontSize,
                      automaticLayout: true,
                      scrollBeyondLastLine: false,
                      padding: { top: 16, bottom: 16 },
                      renderWhitespace: "selection",
                      fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                      fontLigatures: true,
                      cursorBlinking: "smooth",
                      smoothScrolling: true,
                      renderLineHighlight: "all",
                      lineHeight: 1.6,
                      roundedSelection: true,
                      scrollbar: {
                        verticalScrollbarSize: 8,
                        horizontalScrollbarSize: 8,
                      },
                    }}
                />
            ) : (
                <EditorPanelSkeleton />
            )}
          </div>
        </div>

        {/* Share Dialog */}
        {isShareDialogOpen && <ShareSnippetDialog onClose={() => setIsShareDialogOpen(false)} />}
      </div>
  );
}

export default EditorPanel;
