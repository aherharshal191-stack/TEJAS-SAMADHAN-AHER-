import React, { useState } from "react";
import { Copy, Check, Loader2, Send } from "lucide-react";
import Markdown from "react-markdown";
import { fetchWithAuth } from "../lib/api";

interface ToolProps {
  title: string;
  description: string;
  placeholder: string;
  toolType: string;
  systemInstruction: string;
  inputType?: "text" | "textarea";
}

export const AITool: React.FC<ToolProps> = ({
  title,
  description,
  placeholder,
  toolType,
  systemInstruction,
  inputType = "textarea",
}) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await fetchWithAuth("/api/generate", {
        method: "POST",
        body: JSON.stringify({
          prompt: input,
          toolType,
          systemInstruction,
        }),
      });
      const data = await res.json();
      if (data.text) {
        setOutput(data.text);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
        <p className="text-zinc-400">{description}</p>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-xl">
        <div className="space-y-4">
          {inputType === "textarea" ? (
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              className="w-full h-32 bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
            />
          ) : (
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          )}

          <button
            onClick={handleGenerate}
            disabled={loading || !input.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            {loading ? "Generating..." : "Generate Content"}
          </button>
        </div>
      </div>

      {output && (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Result
            </h2>
            <button
              onClick={copyToClipboard}
              className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
            >
              {copied ? (
                <Check className="w-5 h-5 text-emerald-500" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="prose prose-invert max-w-none">
            <Markdown>{output}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
};
