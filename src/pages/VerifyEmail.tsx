import React, { useState } from "react";
import { KomisiLogo } from "@/components/komisi/KomisiLogo";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  const [resent, setResent] = useState(false);

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 60000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <KomisiLogo size="md" className="justify-center" />

        <div className="mt-8 w-20 h-20 mx-auto rounded-full watercolor-blue flex items-center justify-center">
          <Mail size={32} className="text-text-secondary" />
        </div>

        <h1 className="text-3xl font-bold tracking-tighter text-foreground mt-6">Check your inbox</h1>
        <p className="text-base text-text-secondary mt-2">
          We sent a verification link to<br />
          <span className="font-semibold text-foreground">sandeep@upturn.ae</span>
        </p>

        <div className="mt-6 text-sm text-text-secondary">
          Didn't receive it? Check your spam folder or{" "}
          {resent ? (
            <span className="text-success font-medium">✓ Email resent!</span>
          ) : (
            <button onClick={handleResend} className="underline text-foreground font-medium hover:no-underline">Resend Email</button>
          )}
        </div>

        <div className="mt-6 space-y-3 max-w-[280px] mx-auto">
          <Button className="w-full h-11">Open Gmail <ArrowRight size={16} /></Button>
          <Button variant="secondary" className="w-full h-11">Open Outlook <ArrowRight size={16} /></Button>
        </div>

        <Link to="/login" className="block mt-8 text-sm text-text-secondary hover:text-foreground">Use a different email</Link>
      </div>
    </div>
  );
};

export default VerifyEmail;
