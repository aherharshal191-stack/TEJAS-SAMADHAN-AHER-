import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export const AuthPage: React.FC<{ type: "login" | "register" }> = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = type === "login" ? "/api/auth/login" : "/api/auth/register";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (type === "login") {
          login(data.token, data.user);
          navigate("/dashboard");
        } else {
          navigate("/login");
        }
      } else {
        setError(data.error || "Authentication failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 font-bold text-2xl tracking-tighter mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 fill-white" />
            </div>
            AI HUB
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">
            {type === "login" ? "Welcome back" : "Create an account"}
          </h1>
          <p className="text-zinc-400 mt-2">
            {type === "login" ? "Enter your credentials to access your tools" : "Join thousands of creators using AI Hub"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400 ml-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="name@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400 ml-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-zinc-200 flex items-center justify-center gap-2 transition-all group"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                {type === "login" ? "Sign In" : "Create Account"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-zinc-500 text-sm">
          {type === "login" ? (
            <>
              Don't have an account?{" "}
              <Link to="/register" className="text-white hover:underline">Sign up</Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link to="/login" className="text-white hover:underline">Log in</Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};
