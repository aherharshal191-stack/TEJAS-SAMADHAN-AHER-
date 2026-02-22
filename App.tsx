import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { AuthPage } from "./pages/AuthPage";
import { DashboardOverview } from "./pages/DashboardOverview";
import { DashboardLayout } from "./components/DashboardLayout";
import { AITool } from "./components/AITool";
import { useAuth } from "./hooks/useAuth";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage type="login" />} />
        <Route path="/register" element={<AuthPage type="register" />} />
        
        <Route path="/dashboard" element={<ProtectedRoute><DashboardOverview /></ProtectedRoute>} />
        
        <Route path="/dashboard/chat" element={
          <ProtectedRoute>
            <AITool 
              title="AI Chat Assistant" 
              description="Have a natural conversation with our most advanced AI model."
              placeholder="Ask me anything..."
              toolType="chat"
              systemInstruction="You are a helpful, creative, and professional AI assistant."
            />
          </ProtectedRoute>
        } />

        <Route path="/dashboard/code" element={
          <ProtectedRoute>
            <AITool 
              title="Code Generator" 
              description="Generate production-ready code snippets, functions, or entire components."
              placeholder="Describe the code you need (e.g., 'A React hook for local storage')..."
              toolType="code"
              systemInstruction="You are an expert software engineer. Provide clean, efficient, and well-documented code. Only output the code and brief explanations if necessary."
            />
          </ProtectedRoute>
        } />

        <Route path="/dashboard/instagram" element={
          <ProtectedRoute>
            <AITool 
              title="Instagram Caption Generator" 
              description="Create viral, engaging captions for your Instagram posts."
              placeholder="What is your post about?..."
              toolType="instagram"
              systemInstruction="You are a social media expert. Generate 3 engaging Instagram captions (one funny, one professional, one short) with relevant hashtags."
            />
          </ProtectedRoute>
        } />

        <Route path="/dashboard/youtube" element={
          <ProtectedRoute>
            <AITool 
              title="YouTube Script Writer" 
              description="Generate high-retention scripts for your YouTube videos."
              placeholder="Enter your video topic or title..."
              toolType="youtube"
              systemInstruction="You are a professional YouTube scriptwriter. Create a structured script including Hook, Intro, Main Content points, and Outro."
            />
          </ProtectedRoute>
        } />

        <Route path="/dashboard/email" element={
          <ProtectedRoute>
            <AITool 
              title="Email Writer" 
              description="Write professional emails for any situation in seconds."
              placeholder="Who are you emailing and why?..."
              toolType="email"
              systemInstruction="You are a professional business communicator. Write clear, concise, and effective emails with appropriate subject lines."
            />
          </ProtectedRoute>
        } />

        <Route path="/dashboard/web-prompt" element={
          <ProtectedRoute>
            <AITool 
              title="Website Builder Prompt" 
              description="Generate detailed prompts for AI website builders like v0 or Bolt."
              placeholder="Describe the website you want to build..."
              toolType="web-prompt"
              systemInstruction="You are a senior web architect. Generate a highly detailed, technical prompt for an AI website builder, specifying layout, components, color palette, and functionality."
            />
          </ProtectedRoute>
        } />

        <Route path="/dashboard/summarizer" element={
          <ProtectedRoute>
            <AITool 
              title="Text Summarizer" 
              description="Paste long text or PDF content to get a concise summary."
              placeholder="Paste the text you want to summarize..."
              toolType="summarizer"
              systemInstruction="You are an expert editor. Provide a concise summary of the provided text, highlighting the key points and takeaways in bullet points."
            />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
