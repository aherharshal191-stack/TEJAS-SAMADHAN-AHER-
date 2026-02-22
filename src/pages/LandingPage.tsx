import React from "react";
import { Link } from "react-router-dom";
import { Zap, Shield, Rocket, CheckCircle2, ArrowRight, Github, Twitter } from "lucide-react";
import { motion } from "motion/react";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            AI HUB
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <Link to="/login" className="hover:text-white transition-colors">Login</Link>
            <Link to="/register" className="bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-6 border border-indigo-500/20">
              Next-Gen AI Platform
            </span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9]">
              UNLEASH THE POWER <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                OF INTELLIGENCE
              </span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              The ultimate suite of AI-powered tools for creators, developers, and professionals. 
              Generate code, content, and ideas in seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all group">
                Start Creating Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#features" className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all">
                Explore Tools
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: MessageSquare, title: "Smart Chat", desc: "Advanced conversational AI for any task." },
              { icon: Code, title: "Code Gen", desc: "Write production-ready code in any language." },
              { icon: Instagram, title: "Social Suite", desc: "Viral captions and scripts for all platforms." },
              { icon: Mail, title: "Email Pro", desc: "Craft perfect professional emails instantly." },
              { icon: Globe, title: "Web Architect", desc: "Generate complex website prompts and structures." },
              { icon: Shield, title: "Secure & Fast", desc: "Enterprise-grade security for your data." },
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-indigo-500/50 transition-all group">
                <div className="w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-indigo-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 border-t border-white/5 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-zinc-400">Choose the plan that fits your needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free */}
            <div className="p-10 rounded-3xl bg-zinc-900 border border-white/5 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <div className="text-4xl font-black mb-6">$0<span className="text-lg text-zinc-500 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-10 flex-1">
                {["10 Generations / day", "Standard AI Models", "Basic Support", "Community Access"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-400">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="w-full py-4 rounded-2xl bg-white text-black font-bold text-center hover:bg-zinc-200 transition-colors">
                Get Started
              </Link>
            </div>
            {/* Pro */}
            <div className="p-10 rounded-3xl bg-indigo-600 border border-indigo-500 flex flex-col relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Most Popular</div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="text-4xl font-black mb-6">$19<span className="text-lg text-white/60 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-10 flex-1">
                {["Unlimited Generations", "Premium AI Models", "Priority Support", "API Access", "Custom Templates"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-2xl bg-black text-white font-bold hover:bg-zinc-900 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            AI HUB
          </div>
          <div className="flex gap-8 text-zinc-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors"><Github className="w-5 h-5" /></a>
            <a href="#" className="p-2 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors"><Twitter className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Re-using existing icons from lucide-react
import { MessageSquare, Code, Instagram, Mail, Globe } from "lucide-react";
