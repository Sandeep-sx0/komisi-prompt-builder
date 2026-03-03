import React, { useState } from "react";
import { KomisiLogo } from "@/components/komisi/KomisiLogo";
import { Button } from "@/components/ui/button";
import { ChipSelector } from "@/components/komisi/ChipSelector";
import { Link } from "react-router-dom";
import { ArrowRight, Smartphone, Sparkles, Check } from "lucide-react";

const SignUp = () => {
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const strength = password.length === 0 ? 0 : password.length < 4 ? 1 : password.length < 8 ? 2 : password.length < 12 ? 3 : 4;

  return (
    <div className="min-h-screen flex">
      {/* Left */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-[400px]">
          <div className="text-center mb-8"><KomisiLogo size="md" /></div>
          <h1 className="text-3xl font-bold tracking-tighter text-foreground">Create your account</h1>

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
              <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
              <input type="text" placeholder="Your full name" className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg placeholder:text-text-tertiary focus:border-foreground focus:ring-2 focus:ring-foreground/8 outline-none transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email Address *</label>
              <input type="email" placeholder="you@company.com" className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg placeholder:text-text-tertiary focus:border-foreground focus:ring-2 focus:ring-foreground/8 outline-none transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password *</label>
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg placeholder:text-text-tertiary focus:border-foreground focus:ring-2 focus:ring-foreground/8 outline-none transition-all" />
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className={`h-1 flex-1 rounded-full transition-all ${s <= strength ? "bg-success" : "bg-border"}`} />
                ))}
              </div>
              <p className="text-xs text-text-tertiary mt-1">Min 8 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">I am a... *</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "developer", label: "App Developer", icon: <Smartphone size={16} /> },
                  { value: "creator", label: "Creator / Affiliate", icon: <Sparkles size={16} /> },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setRole(opt.value)}
                    className={`h-11 rounded-lg border text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                      role === opt.value
                        ? "bg-primary text-primary-foreground border-transparent"
                        : "bg-card text-text-secondary border-border hover:border-[hsl(var(--border-hover))]"
                    }`}
                  >
                    {opt.icon} {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <Button className="w-full h-11">Create Account <ArrowRight size={16} /></Button>
            <p className="text-xs text-text-tertiary text-center">By creating an account, you agree to our <a className="underline" href="#">Terms of Service</a> and <a className="underline" href="#">Privacy Policy</a>.</p>
          </div>

          <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
            <span className="text-sm text-text-secondary">Already have an account?</span>
            <Link to="/login"><Button variant="secondary" size="sm">Login</Button></Link>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="hidden lg:flex flex-1 bg-background-subtle flex-col items-center justify-center relative">
        <div className="absolute top-0 left-0 right-0 h-1 gradient-ai" />
        <div className="max-w-[360px] px-8">
          <h2 className="text-2xl font-bold text-foreground tracking-tighter">Turn creators into your growth engine.</h2>
          <div className="mt-6 space-y-3">
            {[
              "Track in-app purchases & subscriptions",
              "RevenueCat & Adapty integration",
              "AI-powered fraud detection",
              "Automated payouts via Stripe Connect",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-foreground">
                <Check size={16} className="text-success shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 watercolor-mixed rounded-xl p-6">
            <p className="text-base font-medium text-foreground">"Komisi found us 15 affiliates in our first week. Revenue from creator referrals is now 30% of our MRR."</p>
            <p className="text-sm text-text-secondary mt-3">— Alex Rivera, FocusTimer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
