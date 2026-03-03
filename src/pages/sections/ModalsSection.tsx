import React, { useState } from "react";
import { SectionHeader } from "@/pages/Index";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const ModalsSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div>
      <SectionHeader title="Modals & Overlays" desc="Confirmation modals and slide-out panels." />
      <div className="bg-background-subtle rounded-xl p-8 flex gap-4">
        <Button variant="secondary" onClick={() => setShowModal(true)}>Open Modal</Button>
        <Button variant="secondary" onClick={() => setShowPanel(true)}>Open Panel</Button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-card rounded-xl p-6 max-w-md w-full mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-foreground">Delete Campaign?</h3>
            <p className="text-sm text-text-secondary mt-2">This action cannot be undone. All associated data will be permanently removed.</p>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button onClick={() => setShowModal(false)}>Confirm</Button>
            </div>
          </div>
        </div>
      )}

      {/* Panel */}
      {showPanel && (
        <div className="fixed inset-0 z-50 flex justify-end bg-foreground/50 backdrop-blur-sm" onClick={() => setShowPanel(false)}>
          <div className="bg-card w-[480px] h-full shadow-2xl animate-slide-in-right" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 h-16 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Affiliate Details</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowPanel(false)}><X size={18} /></Button>
            </div>
            <div className="px-6 py-4 text-sm text-text-secondary">
              <p>Panel content goes here. This slides in from the right.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
