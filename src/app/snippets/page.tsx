"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import SnippetsPageSkeleton from "./_components/SnippetsPageSkeleton";
import NavigationHeader from "@/components/NavigationHeader";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Code, Grid, Layers, Search, Tag, X } from "lucide-react";
import SnippetCard from "./_components/SnippetCard";

function SnippetsPage() {
  const snippets = useQuery(api.snippets.getSnippets);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  // loading state
  if (snippets === undefined) {
    return (
      <div className="min-h-screen">
        <NavigationHeader />
        <SnippetsPageSkeleton />
      </div>
    );
  }

  const languages = [...new Set(snippets.map((s) => s.language))];
  const popularLanguages = languages.slice(0, 5);

  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.userName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLanguage = !selectedLanguage || snippet.language === selectedLanguage;

    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
    <NavigationHeader/>

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.1}}
              className="text-4xl md:text-5xl font-bold text-green-400 font-mono drop-shadow-[0_0_5px_#00ff00]"
          >
            Snippets from the Underground
          </motion.h1>


        </div>

        {/* Filters Section */}
        <div className="relative max-w-5xl mx-auto mb-12 space-y-6">
          {/* Search */}
          <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}

              className="
    w-full
    bg-black
    text-green-400
    placeholder:text-green-700/70
    border
    border-green-800
    rounded-md
    px-4
    py-2
    font-mono
    focus:outline-none
    focus:ring-2
    focus:ring-green-500
    focus:ring-offset-1
    focus:ring-offset-black
    transition
    shadow-sm
    hover:border-green-600
  "
              placeholder="Search snippets..."
          />


          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#1e1e2e] rounded-lg ring-1 ring-gray-800">
              <Tag className="w-4 h-4 text-gray-400"/>
              <span className="text-sm text-gray-400">Languages:</span>
            </div>

            {popularLanguages.map((lang, idx) => (
                <button key={idx}
                        className={`px-3 py-1.5 font-mono flex items-center gap-2 text-sm border border-green-800 ${
                            selectedLanguage === lang ? "bg-green-800 text-black" : "hover:bg-green-900/30 text-green-400"
                        }`}
                >
                  <img src={`/${lang}.png`} className="w-4 h-4"/>
                  {lang}
                </button>
            ))}

            {selectedLanguage && (
                <button
                    onClick={() => setSelectedLanguage(null)}
                    className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <X className="w-3 h-3"/>
                  Очистить
                </button>
            )}

            <div className="ml-auto flex items-center gap-3">
              <span className="text-sm text-gray-500">
                {filteredSnippets.length} snippets found
              </span>

              {/* View Toggle */}
              <div className="flex items-center gap-1 p-1 bg-[#1e1e2e] rounded-lg ring-1 ring-gray-800">
                <button
                    onClick={() => setView("grid")}
                    className={`p-2 rounded-md transition-all ${
                        view === "grid"
                            ? "bg-green-500/20 text-green-400"
                            : "text-gray-400 hover:text-gray-300 hover:bg-[#262637]"
                    }`}
                >
                  <Grid className="w-4 h-4"/>
                </button>
                <button
                    onClick={() => setView("list")}
                    className={`p-2 rounded-md transition-all ${
                        view === "list"
                            ? "bg-green-500/20 text-green-400"
                            : "text-gray-400 hover:text-gray-300 hover:bg-[#262637]"
                    }`}
                >
                  <Layers className="w-4 h-4"/>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Snippets Grid */}
        <motion.div
            className={`grid gap-6 ${
                view === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1 max-w-3xl mx-auto"
            }`}
            layout
        >
          <AnimatePresence mode="popLayout">
            {filteredSnippets.map((snippet) => (
                <SnippetCard key={snippet._id} snippet={snippet} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* edge case: empty state */}
        {filteredSnippets.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-md mx-auto mt-20 p-8 rounded-2xl overflow-hidden"
          >
            <div className="text-center">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br 
                from-green-500/10 to-purple-500/10 ring-1 ring-white/10 mb-6"
              >
                <Code className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">No snippets found</h3>
              <p className="text-gray-400 mb-6">
                {searchQuery || selectedLanguage
                  ? "Try adjusting your search query or filters"
                  : "Be the first to share a code snippet with the community"}
              </p>

              {(searchQuery || selectedLanguage) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedLanguage(null);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#262637] text-gray-300 hover:text-white rounded-lg 
                    transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
export default SnippetsPage;
