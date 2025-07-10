"use client";
import { useUser } from "@clerk/nextjs";
import { usePaginatedQuery, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import NavigationHeader from "@/components/NavigationHeader";
import ProfileHeader from "./_components/ProfileHeader";
import ProfileHeaderSkeleton from "./_components/ProfileHeaderSkeleton";
import { ChevronRight, Clock, Code, ListVideo, Loader2, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import StarButton from "@/components/StarButton";
import CodeBlock from "./_components/CodeBlock";

const TABS = [
  {
    id: "Выполнения",
    label: "Выполнения кода",
    icon: ListVideo,
  },
  {
    id: "Отмечено",
    label: "Отмеченные фрагменты",
    icon: Star,
  },
];

function ProfilePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"executions" | "starred">("executions");

  const userStats = useQuery(api.codeExecutions.getUserStats, {
    userId: user?.id ?? "",
  });

  const starredSnippets = useQuery(api.snippets.getStarredSnippets);

  const {
    results: executions,
    status: executionStatus,
    isLoading: isLoadingExecutions,
    loadMore,
  } = usePaginatedQuery(
    api.codeExecutions.getUserExecutions,
    {
      userId: user?.id ?? "",
    },
    { initialNumItems: 5 }
  );

  const userData = useQuery(api.users.getUser, { userId: user?.id ?? "" });

  const handleLoadMore = () => {
    if (executionStatus === "CanLoadMore") loadMore(5);
  };

  if (!user && isLoaded) return router.push("/");

  return (
      <div className="min-h-screen bg-black bg-gradient-to-b from-black via-[#001a00] to-black">
        <NavigationHeader />

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Profile Header */}
          {userStats && userData && (
              <ProfileHeader userStats={userStats} userData={userData} user={user!} />
          )}

          {(userStats === undefined || !isLoaded) && <ProfileHeaderSkeleton />}

          {/* Main content */}
          <div
              className="bg-gradient-to-br from-[#002200] to-[#003300] rounded-3xl shadow-xl
          shadow-green-900/80 border border-green-900/70 backdrop-blur-lg overflow-hidden"
          >
            {/* Tabs */}
            <div className="border-b border-green-900/70">
              <div className="flex space-x-1 p-4">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as "executions" | "starred")}
                        className={`group flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 relative overflow-hidden ${
                            activeTab === tab.id
                                ? "text-lime-400"
                                : "text-green-600 hover:text-lime-300"
                        }`}
                    >
                      {activeTab === tab.id && (
                          <motion.div
                              layoutId="activeTab"
                              className="absolute inset-0 bg-lime-700/20 rounded-lg"
                              transition={{
                                type: "spring",
                                bounce: 0.2,
                                duration: 0.6,
                              }}
                          />
                      )}
                      <tab.icon className="w-4 h-4 relative z-10 text-lime-400" />
                      <span className="text-sm font-medium relative z-10">{tab.label}</span>
                    </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="p-6"
              >
                {/* EXECUTIONS TAB */}
                {activeTab === "executions" && (
                    <div className="space-y-6">
                      {executions?.map((execution) => (
                          <div
                              key={execution._id}
                              className="group rounded-xl overflow-hidden transition-all duration-300 hover:border-lime-500/50 hover:shadow-md hover:shadow-lime-500/50 border border-green-800/50"
                          >
                            <div className="flex items-center justify-between p-4 bg-black/50 border-b border-green-900/70 rounded-t-xl">
                              <div className="flex items-center gap-4">
                                <div className="relative">
                                  <div className="absolute inset-0 bg-gradient-to-r from-lime-600 to-green-900 rounded-lg blur opacity-25 group-hover:opacity-40 transition-opacity" />
                                  <Image
                                      src={"/" + execution.language + ".png"}
                                      alt=""
                                      className="rounded-lg relative z-10 object-cover"
                                      width={40}
                                      height={40}
                                  />
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-lime-400">
                                {execution.language.toUpperCase()}
                              </span>
                                    <span className="text-xs text-green-500">•</span>
                                    <span className="text-xs text-green-500">
                                {new Date(execution._creationTime).toLocaleString()}
                              </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                              <span
                                  className={`text-xs px-2 py-0.5 rounded-full ${
                                      execution.error
                                          ? "bg-red-700/30 text-red-400"
                                          : "bg-lime-700/30 text-lime-400"
                                  }`}
                              >
                                {execution.error ? "Error" : "Success"}
                              </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 bg-black/30 rounded-b-xl border border-t-0 border-green-900/70">
                              <CodeBlock code={execution.code} language={execution.language} />

                              {(execution.output || execution.error) && (
                                  <div className="mt-4 p-4 rounded-lg bg-black/60 border border-green-900/80">
                                    <h4 className="text-sm font-medium text-green-400 mb-2">Output</h4>
                                    <pre
                                        className={`text-sm ${
                                            execution.error ? "text-red-400" : "text-lime-400"
                                        } font-mono`}
                                    >
                              {execution.error || execution.output}
                            </pre>
                                  </div>
                              )}
                            </div>
                          </div>
                      ))}

                      {isLoadingExecutions ? (
                          <div className="text-center py-12">
                            <Loader2 className="w-12 h-12 text-green-600 mx-auto mb-4 animate-spin" />
                            <h3 className="text-lg font-medium text-green-400 mb-2">
                             Загружаем выполнения кодов...
                            </h3>
                          </div>
                      ) : (
                          executions.length === 0 && (
                              <div className="text-center py-12">
                                <Code className="w-12 h-12 text-green-600 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-green-400 mb-2">
                                  Выполнения кодов пока нету
                                </h3>
                                <p className="text-green-600">
                                  Начните кодить чтобы увидеть вашу историю действий
                                </p>
                              </div>
                          )
                      )}

                      {/* Load More Button */}
                      {executionStatus === "CanLoadMore" && (
                          <div className="flex justify-center mt-8">
                            <button
                                onClick={handleLoadMore}
                                className="px-6 py-3 bg-lime-700/30 hover:bg-lime-700/50 text-lime-400 rounded-lg flex items-center gap-2 transition-colors"
                            >
                              Грузить больше
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                      )}
                    </div>
                )}

                {/* STARRED TAB */}
                {activeTab === "starred" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {starredSnippets?.map((snippet) => (
                          <div key={snippet._id} className="group relative">
                            <Link href={`/snippets/${snippet._id}`}>
                              <div
                                  className="bg-black/50 rounded-xl border border-green-900/70 hover:border-lime-600/80
                          transition-all duration-300 overflow-hidden h-full group-hover:scale-[1.03] transform"
                              >
                                <div className="p-6">
                                  <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                      <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-lime-600 to-green-900 rounded-lg blur opacity-25 group-hover:opacity-40 transition-opacity" />
                                        <Image
                                            src={`/${snippet.language}.png`}
                                            alt={`${snippet.language} logo`}
                                            className="relative z-10"
                                            width={40}
                                            height={40}
                                        />
                                      </div>
                                      <span className="px-3 py-1 bg-lime-800/40 text-lime-400 rounded-lg text-sm">
                                  {snippet.language}
                                </span>
                                    </div>
                                    <div
                                        className="absolute top-6 right-6 z-10"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                      <StarButton snippetId={snippet._id} />
                                    </div>
                                  </div>
                                  <h2 className="text-xl font-semibold text-lime-400 mb-3 line-clamp-1 group-hover:text-lime-300 transition-colors">
                                    {snippet.title}
                                  </h2>
                                  <div className="flex items-center justify-between text-sm text-green-400">
                                    <div className="flex items-center gap-2">
                                      <Clock className="w-4 h-4" />
                                      <span>{new Date(snippet._creationTime).toLocaleDateString()}</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                  </div>
                                </div>
                                <div className="px-6 pb-6">
                                  <div className="bg-black/70 rounded-lg p-4 overflow-hidden">
                              <pre className="text-sm text-lime-300 font-mono line-clamp-3">
                                {snippet.code}
                              </pre>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                      ))}

                  {(!starredSnippets || starredSnippets.length === 0) && (
                    <div className="col-span-full text-center py-12">
                      <Star className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-400 mb-2">
                        Нет отмеченных фрагментов
                      </h3>
                      <p className="text-gray-500">
                       Начните изучать и отмечать фрагменты чтобы они показались здесь
                      </p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;
