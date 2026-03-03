import React, { useState } from "react";
import { SectionHeader } from "@/pages/Index";
import { ChipSelector } from "@/components/komisi/ChipSelector";
import { Smartphone, Sparkles } from "lucide-react";

export const InputsSection = () => {
  const [chip, setChip] = useState("ios");
  const [toggle, setToggle] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <SectionHeader title="Inputs & Form Elements" desc="Text inputs, selects, toggles, chips, and checkboxes." />
      <div className="bg-background-subtle rounded-xl p-8 space-y-8">
        {/* Text Input */}
        <div className="max-w-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
            <input
              type="email"
              placeholder="you@company.com"
              className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg placeholder:text-text-tertiary focus:border-foreground focus:ring-2 focus:ring-foreground/8 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">App Description</label>
            <textarea
              placeholder="Describe your app..."
              className="w-full min-h-[100px] px-3 py-2 text-sm bg-card border border-border rounded-lg placeholder:text-text-tertiary focus:border-foreground focus:ring-2 focus:ring-foreground/8 outline-none transition-all resize-y"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Error State</label>
            <input
              type="text"
              defaultValue="invalid@"
              className="w-full h-10 px-3 text-sm bg-card border border-error rounded-lg focus:ring-2 focus:ring-error/8 outline-none transition-all"
            />
            <p className="text-xs text-error mt-1">Please enter a valid email address</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
            <select className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg text-foreground focus:border-foreground focus:ring-2 focus:ring-foreground/8 outline-none transition-all">
              <option>Health & Fitness</option>
              <option>Productivity</option>
              <option>Education</option>
            </select>
          </div>
        </div>

        {/* Chip Selector */}
        <div>
          <p className="text-xs font-semibold text-text-tertiary uppercase tracking-widest mb-3">Chip Selector</p>
          <ChipSelector
            options={[
              { label: "iOS", value: "ios", icon: <Smartphone size={14} /> },
              { label: "Android", value: "android", icon: <Smartphone size={14} /> },
              { label: "Both", value: "both" },
            ]}
            value={chip}
            onChange={setChip}
          />
        </div>

        {/* Toggle + Checkbox */}
        <div className="flex gap-8 items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setToggle(!toggle)}
              className={`w-11 h-6 rounded-full transition-colors duration-200 relative ${toggle ? 'bg-primary' : 'bg-border'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-card shadow transition-transform duration-200 ${toggle ? 'translate-x-5' : ''}`} />
            </button>
            <span className="text-sm text-foreground">Toggle</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setChecked(!checked)}
              className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${checked ? 'bg-primary border-primary' : 'border-border-hover bg-card'}`}
            >
              {checked && <span className="text-primary-foreground text-xs">✓</span>}
            </button>
            <span className="text-sm text-foreground">Checkbox</span>
          </div>
        </div>
      </div>
    </div>
  );
};
