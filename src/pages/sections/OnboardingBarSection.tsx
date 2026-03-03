import React from "react";
import { SectionHeader } from "@/pages/Index";
import { OnboardingStepBar } from "@/components/komisi/OnboardingStepBar";

export const OnboardingBarSection = () => (
  <div>
    <SectionHeader title="Onboarding Step Bar" desc="Fixed bottom bar for multi-step wizards." />
    <div className="bg-background-subtle rounded-xl overflow-hidden border border-border">
      <OnboardingStepBar
        totalSteps={5}
        currentStep={2}
        stepLabel="Connect Revenue"
        onBack={() => {}}
        onNext={() => {}}
        onSkipStep={() => {}}
        onSkipAll={() => {}}
      />
    </div>
  </div>
);
