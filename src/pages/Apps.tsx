import React, { useState } from "react";
import { DashboardLayout } from "@/components/komisi/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChipSelector } from "@/components/komisi/ChipSelector";
import { BadgeStatus } from "@/components/komisi/BadgeStatus";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, MoreVertical, Sparkles, ArrowRight } from "lucide-react";

const apps = [
  {
    name: "MindfulApp",
    subtitle: "Health & Fitness · iOS + Android",
    sdkInstalled: true,
    revenueCatConnected: true,
    stats: "12 affiliates · 847 installs this month",
    initials: "MA",
  },
  {
    name: "FocusTimer Pro",
    subtitle: "Productivity · iOS",
    sdkInstalled: false,
    revenueCatConnected: false,
    stats: "0 affiliates · Setup required",
    initials: "FT",
  },
];

const Apps: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [platform, setPlatform] = useState("Both");

  return (
    <DashboardLayout activeItem="Apps">
      <div className="px-8 py-6 max-w-[1200px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Apps</h1>
          <Button onClick={() => setModalOpen(true)}>
            <Plus size={16} /> Add App
          </Button>
        </div>

        {/* App Cards */}
        <div className="space-y-4">
          {apps.map((app) => (
            <div
              key={app.name}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-sm font-semibold text-text-secondary shrink-0">
                  {app.initials}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground">{app.name}</h3>
                  <p className="text-sm text-text-secondary mt-0.5">{app.subtitle}</p>

                  {/* Status Row */}
                  <div className="flex items-center gap-4 mt-3">
                    <span className="flex items-center gap-1.5 text-sm">
                      <span className={`inline-block w-2 h-2 rounded-full ${app.sdkInstalled ? "bg-[hsl(var(--success))]" : "bg-muted-foreground"}`} />
                      <span className={app.sdkInstalled ? "text-[hsl(var(--success))]" : "text-[hsl(var(--warning))]"}>
                        SDK: {app.sdkInstalled ? "Installed" : "Not installed"}
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5 text-sm">
                      <span className={`inline-block w-2 h-2 rounded-full ${app.revenueCatConnected ? "bg-[hsl(var(--success))]" : "bg-muted-foreground"}`} />
                      <span className={app.revenueCatConnected ? "text-[hsl(var(--success))]" : "text-[hsl(var(--warning))]"}>
                        RevenueCat: {app.revenueCatConnected ? "Connected" : "Not connected"}
                      </span>
                    </span>
                  </div>

                  <p className="text-sm text-text-secondary mt-2">{app.stats}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {app.sdkInstalled ? (
                    <>
                      <Button variant="ghost" size="sm">Manage <ArrowRight size={14} /></Button>
                      <Button variant="ghost" size="sm">SDK Setup</Button>
                    </>
                  ) : (
                    <Button size="sm">Complete Setup <ArrowRight size={14} /></Button>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Archive</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add App Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New App</DialogTitle>
            <DialogDescription>Add your app so Komisi can configure tracking and attribution.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>App Name *</Label>
              <Input placeholder="e.g., MindfulApp" />
            </div>
            <div className="space-y-1.5">
              <Label>App Store URL</Label>
              <Input placeholder="https://apps.apple.com/app/..." />
            </div>
            <div className="space-y-1.5">
              <Label>Play Store URL</Label>
              <Input placeholder="https://play.google.com/store/apps/..." />
            </div>
            <div className="space-y-1.5">
              <Label>Platform *</Label>
              <ChipSelector
                options={[{ label: "iOS", value: "iOS" }, { label: "Android", value: "Android" }, { label: "Both", value: "Both" }]}
                value={platform}
                onChange={setPlatform}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Category *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="health">Health & Fitness</SelectItem>
                  <SelectItem value="productivity">Productivity</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="photo">Photo & Video</SelectItem>
                  <SelectItem value="gaming">Gaming</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="ai" className="w-full h-11">
              <Sparkles size={16} /> Fetch with AI ✦
            </Button>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setModalOpen(false)}>Save App</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Apps;
