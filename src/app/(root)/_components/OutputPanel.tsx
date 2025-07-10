"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { AlertTriangle, CheckCircle, Clock, Copy, Terminal } from "lucide-react";
import { useState } from "react";
import RunningCodeSkeleton from "./RunningCodeSkeleton";

function OutputPanel() {
    const { output, error, isRunning } = useCodeEditorStore();
    const [isCopied, setIsCopied] = useState(false);
    const hasContent = error || output;

    const handleCopy = async () => {
        if (!hasContent) return;
        await navigator.clipboard.writeText(error || output);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="relative bg-[#121212] rounded-xl p-5 border border-[#00ff8844] shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 flex items-center justify-center bg-[#1e1e2e] border border-[#2a2a2a] rounded-lg">
                        <Terminal className="w-4 h-4 text-[#00ff88]" />
                    </div>
                    <span className="text-sm font-semibold text-gray-300">Output</span>
                </div>

                {hasContent && (
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-[#2a2a2a] hover:border-[#444] text-gray-400 hover:text-gray-300 transition"
                    >
                        {isCopied ? (
                            <>
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                Copied
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4" />
                                Copy
                            </>
                        )}
                    </button>
                )}
            </div>

            {/* Output Content */}
            <div className="bg-[#1a1a1a] border border-[#00ff8844] rounded-xl p-4 h-[600px] overflow-auto text-sm font-mono text-gray-300">
                {isRunning ? (
                    <RunningCodeSkeleton />
                ) : error ? (
                    <div className="flex items-start gap-3 text-red-400">
                        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
                        <div>
                            <div className="font-semibold">Execution Error</div>
                            <pre className="whitespace-pre-wrap text-red-300 mt-1">{error}</pre>
                        </div>
                    </div>
                ) : output ? (
                    <>
                        <div className="flex items-center gap-2 text-[#00ff88] mb-2">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">Execution Successful</span>
                        </div>
                        <pre className="whitespace-pre-wrap">{output}</pre>
                    </>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500">
                        <div className="w-12 h-12 flex items-center justify-center bg-gray-800/50 rounded-xl border border-gray-700 mb-4">
                            <Clock className="w-6 h-6" />
                        </div>
                        <p className="text-center">Запустите ваш код здесь ...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OutputPanel;
