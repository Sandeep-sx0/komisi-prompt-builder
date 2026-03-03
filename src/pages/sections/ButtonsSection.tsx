import React from "react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/pages/Index";
import { ArrowRight, Sparkles, Trash2, Plus, Loader2 } from "lucide-react";

export const ButtonsSection = () => (
  <div>
    <SectionHeader title="Buttons" desc="All button variants, sizes, and states." />
    <div className="bg-background-subtle rounded-xl p-8 space-y-8">
      {/* Variants */}
      <div>
        <p className="text-xs font-semibold text-text-tertiary uppercase tracking-widest mb-3">Variants</p>
        <div className="flex flex-wrap gap-3 items-center">
          <Button>Primary</Button>
          <Button>Primary with Arrow <ArrowRight size={16} /></Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="ai"><Sparkles size={14} /> AI Action</Button>
          <Button variant="destructive"><Trash2 size={14} /> Destructive</Button>
          <Button variant="link">Link</Button>
          <Button size="icon"><Plus size={16} /></Button>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="text-xs font-semibold text-text-tertiary uppercase tracking-widest mb-3">Sizes</p>
        <div className="flex flex-wrap gap-3 items-end">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      {/* States */}
      <div>
        <p className="text-xs font-semibold text-text-tertiary uppercase tracking-widest mb-3">States</p>
        <div className="flex flex-wrap gap-3 items-center">
          <Button disabled>Disabled</Button>
          <Button disabled><Loader2 size={14} className="animate-spin" /> Loading</Button>
        </div>
      </div>
    </div>
  </div>
);
