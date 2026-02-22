import React, { useEffect, useState } from "react";
import { 
  Zap, 
  History, 
  TrendingUp, 
  Clock, 
  ChevronRight,
  MessageSquare,
  Code,
  Instagram,
  Youtube,
  Mail,
  Globe,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";
import { fetchWithAuth } from "../lib/api";

export const DashboardOverview = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetchWithAuth("/api/user/history");
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const stats = [
    { label: "Total Generations", value: history.length, icon: Zap, color: "text-indigo-500" },
    { label: "Active Tools", value: "7", icon: TrendingUp, color: "text-emerald-500" },
    { label: "Last Used", value: history[0] ? new Date(history[0].created_at).toLocaleDateString() : "Never", icon: Clock, color: "text-amber-500" },
  ];

  const tools = [
    { icon: MessageSquare, label: "AI Chat", path: "/dashboard/chat", color: "bg-blue-500/10 text-blue-500" },
    { icon: Code, label: "Code Gen", path: "/dashboard/code", color: "bg-purple-500/10 text-purple-500" },
    { icon: Instagram, label: "Insta Captions", path: "/dashboard/instagram", color: "bg-pink-500/10 text-pink-500" },
    { icon: Youtube, label: "YT Scripts", path: "/dashboard/youtube", color: "bg-red-500/10 text-red-500" },
    { icon: Mail, label: "Email Writer", path: "/dashboard/email", color: "bg-indigo-500/10 text-indigo-500" },
    { icon: Globe, label: "Web Prompt", path: "/dashboard/web-prompt", color: "bg-cyan-500/10 text-cyan-500" },
    { icon: FileText, label: "PDF Summarizer", path: "/dashboard/summarizer", color: "bg-emerald-500/10 text-emerald-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-zinc-400">Welcome back to your AI command center.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-zinc-950 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-zinc-500">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Tools */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Rocket className="w-5 h-5 text-indigo-500" />
            Quick Access
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {tools.map((tool, i) => (
              <Link
                key={i}
                to={tool.path}
                className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-indigo-500/50 transition-all group text-center"
              >
                <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-4 ${tool.color} group-hover:scale-110 transition-transform`}>
                  <tool.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">{tool.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent History */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-500" />
            Recent History
          </h2>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl divide-y divide-zinc-800">
            {loading ? (
              <div className="p-8 text-center text-zinc-500">Loading...</div>
            ) : history.length === 0 ? (
              <div className="p-8 text-center text-zinc-500">No history yet.</div>
            ) : (
              history.slice(0, 5).map((item, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-zinc-800/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-zinc-950 rounded-lg flex items-center justify-center text-zinc-400">
                      {item.tool_type === "chat" && <MessageSquare className="w-4 h-4" />}
                      {item.tool_type === "code" && <Code className="w-4 h-4" />}
                      {item.tool_type === "instagram" && <Instagram className="w-4 h-4" />}
                      {item.tool_type === "youtube" && <Youtube className="w-4 h-4" />}
                      {item.tool_type === "email" && <Mail className="w-4 h-4" />}
                      {item.tool_type === "web-prompt" && <Globe className="w-4 h-4" />}
                      {item.tool_type === "summarizer" && <FileText className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium truncate max-w-[150px]">{item.prompt}</p>
                      <p className="text-xs text-zinc-500">{new Date(item.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
                </div>
              ))
            )}
          </div>
          {history.length > 5 && (
            <button className="w-full py-3 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              View All History
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

import { Rocket } from "lucide-react";
