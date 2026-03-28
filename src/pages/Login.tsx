import React from "react";
import { KomisiLogo } from "@/components/komisi/KomisiLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const handleForgotPassword = () => {
    toast({ title: "Password reset link sent to your email." });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative px-4">
      {/* Decorative watercolor */}
      <div className="absolute top-0 left-0 w-48 h-48 watercolor-mixed opacity-30 rounded-br-full pointer-events-none" />

      {/* Logo */}
      <div className="absolute top-6 left-6">
        <KomisiLogo size="sm" />
      </div>

      {/* Login card */}
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold tracking-tighter text-foreground">Welcome back</h1>
        <p className="text-text-secondary mt-1">Sign in to your Komisi account.</p>

        <div className="mt-8 space-y-4">
          {/* Google OAuth */}
          <Button
            variant="secondary"
            className="w-full h-11"
            onClick={() => navigate("/dashboard")}
          >
            <svg width="18" height="18" viewBox="0 0 48 48" className="shrink-0">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
            </svg>
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-text-tertiary">or continue with email</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Email + Password form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" placeholder="you@company.com" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label>Password</Label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-text-secondary hover:text-foreground transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <Input type="password" placeholder="••••••••••" />
            </div>

            <Button type="submit" className="w-full h-11">Sign In</Button>
          </form>
        </div>

        {/* Bottom */}
        <p className="text-sm text-text-secondary mt-8 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-foreground underline hover:text-foreground/80">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
