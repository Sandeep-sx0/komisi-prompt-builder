import React from "react";
import { SectionHeader } from "@/pages/Index";
import { AILoading } from "@/components/komisi/AILoading";

const steps = [
  { label: "Analyzing your app..." },
  { label: "Pulling store metadata..." },
  { label: "Detecting integrations..." },
  { label: "Generating recommendations..." },
  { label: "Almost there!" },
];

export const AILoadingSection = () => (
  <div>
    <SectionHeader title="AI Loading State" desc="Progressive checklist animation for AI-powered actions." />
    <div className="bg-background-subtle rounded-xl p-8">
      <AILoading steps={steps} />
    </div>
  </div>
);
