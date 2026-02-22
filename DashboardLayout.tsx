import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Code, 
  Instagram, 
  Youtube, 
  Mail, 
  Globe, 
  FileText, 
  LogOut,
  User,
  Zap
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
    { icon: MessageSquare, label: "AI Chat", path: "/dashboard/chat" },
    { icon: Code, label: "Code Generator", path: "/dashboard/code" },
    { icon: Instagram, label: "Insta Captions", path: "/dashboard/instagram" },
    { icon: Youtube, label: "YT Scripts", path: "/dashboard/youtube" },
    { icon: Mail, label: "Email Writer", path: "/dashboard/email" },
    { icon: Globe, label: "Web Prompt", path: "/dashboard/web-prompt" },
    { icon: FileText, label: "PDF Summarizer", path: "/dashboard/summarizer" },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 flex flex-col fixed h-full bg-zinc-950">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            AI HUB
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-all group"
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.email}</p>
              <p className="text-xs text-zinc-500">{user?.usage_count} generations</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
};
