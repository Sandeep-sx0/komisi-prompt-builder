import React, { useState, useEffect } from "react";
import { KomisiLogo } from "@/components/komisi/KomisiLogo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  { quote: "We replaced $3,000/month in paid ads with Komisi affiliates. Our CAC dropped 60% in three months.", name: "Sarah Chen", title: "Head of Growth, MindfulApp", initials: "SC" },
  { quote: "Komisi found us 15 affiliates in our first week. Revenue from creator referrals is now 30% of our MRR.", name: "Alex Rivera", title: "Founder, FocusTimer", initials: "AR" },
  { quote: "The AI-powered fraud detection alone saved us $12,000 in fake installs last quarter.", name: "Priya Sharma", title: "CTO, LearnFlow", initials: "PS" },
];

const Login = () => {
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTestimonialIdx((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Left */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-[400px]">
          <div className="text-center mb-8"><KomisiLogo size="md" /></div>

          <h1 className="text-3xl font-bold tracking-tighter text-foreground">Login</h1>

          <div className="mt-6 space-y-4">
            <button className="w-full h-11 rounded-lg border border-border bg-card text-sm font-medium text-foreground flex items-center justify-center gap-2 hover:bg-background-subtle transition-colors">
              <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
              Continue with Google
            </button>

            <div className="relative flex items-center gap-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-text-tertiary">OR</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
              <input type="email" placeholder="you@company.com" className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg placeholder:text-text-tertiary focus:border-foreground focus:ring-2 focus:ring-foreground/8 outline-none transition-all" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-foreground">Password</label>
                <a href="#" className="text-sm text-text-secondary underline hover:text-foreground">Forgot Password?</a>
              </div>
              <input type="password" placeholder="••••••••••" className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg placeholder:text-text-tertiary focus:border-foreground focus:ring-2 focus:ring-foreground/8 outline-none transition-all" />
            </div>

            <Button className="w-full h-11">Login</Button>
          </div>

          <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
            <span className="text-sm text-text-secondary">Don't have an account?</span>
            <Link to="/signup"><Button variant="secondary" size="sm">Sign Up</Button></Link>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="hidden lg:flex flex-1 bg-background-subtle flex-col items-center justify-center relative">
        <div className="absolute top-0 left-0 right-0 h-1 gradient-ai" />

        <div className="max-w-[400px] text-center px-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center text-lg font-bold text-foreground border-2 border-card shadow-md mb-6">
            {testimonials[testimonialIdx].initials}
          </div>

          <p className="text-lg font-medium text-foreground italic leading-relaxed transition-opacity duration-300">
            "{testimonials[testimonialIdx].quote}"
          </p>
          <p className="text-sm font-semibold text-foreground mt-4">{testimonials[testimonialIdx].name}</p>
          <p className="text-sm text-text-secondary">{testimonials[testimonialIdx].title}</p>

          <div className="flex items-center justify-center gap-2 mt-4">
            <button onClick={() => setTestimonialIdx((i) => (i - 1 + testimonials.length) % testimonials.length)} className="p-1 text-text-tertiary hover:text-foreground"><ChevronLeft size={18} /></button>
            {testimonials.map((_, i) => <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === testimonialIdx ? "bg-foreground" : "bg-border"}`} />)}
            <button onClick={() => setTestimonialIdx((i) => (i + 1) % testimonials.length)} className="p-1 text-text-tertiary hover:text-foreground"><ChevronRight size={18} /></button>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-text-secondary leading-relaxed">Whether you're a developer growing your app or a creator earning from recommendations — Komisi connects both sides.</p>
            <p className="text-sm text-text-secondary mt-4"><span className="font-bold gradient-ai-text">200+</span> app developers are using Komisi to grow with creators</p>
            <div className="flex items-center justify-center gap-6 mt-4 opacity-30">
              {["App1", "App2", "App3", "App4", "App5"].map((l) => (
                <div key={l} className="w-16 h-6 bg-foreground/20 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
