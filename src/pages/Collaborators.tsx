import React, { useState } from "react";
import { DashboardLayout } from "@/components/komisi/DashboardLayout";
import { RoleGate } from "@/components/komisi/RoleGate";
import { useAppScope } from "@/hooks/use-app-scope";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BadgeStatus } from "@/components/komisi/BadgeStatus";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Users, MoreHorizontal, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface Collaborator {
  name: string;
  email: string;
  initials: string;
  role: "Owner" | "Admin" | "Viewer";
  status: "Active" | "Pending";
  added: string;
}

const mockCollaborators: Collaborator[] = [
  { name: "Sandeep Kumar", email: "sandeep@upturn.ae", initials: "SK", role: "Owner", status: "Active", added: "Jan 15, 2026" },
  { name: "Alex Chen", email: "alex@mindfulapp.com", initials: "AC", role: "Admin", status: "Active", added: "Feb 1, 2026" },
  { name: "Jordan Lee", email: "jordan@mindfulapp.com", initials: "JL", role: "Viewer", status: "Active", added: "Feb 10, 2026" },
  { name: "", email: "taylor@example.com", initials: "T", role: "Admin", status: "Pending", added: "Mar 1, 2026" },
];

const Collaborators: React.FC = () => {
  const { role } = useAppScope();
  const isOwner = role === "owner";
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("admin");
  const [showEmpty, setShowEmpty] = useState(false);

  return (
    <DashboardLayout activeItem="Collaborators">
      <div className="px-8 py-8 max-w-[1200px]">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Collaborators</h1>
            <p className="text-sm text-text-secondary mt-1">Manage who has access to this app.</p>
          </div>
          <RoleGate requiredRole="owner">
            <Button onClick={() => setInviteOpen(true)}>
              <Plus size={14} /> Invite Collaborator
            </Button>
          </RoleGate>
        </div>

        {/* Access denied banner for non-owners */}
        {!isOwner && (
          <div className="bg-muted border border-border p-4 mb-8 flex items-center gap-3">
            <Info size={16} className="text-text-secondary shrink-0" />
            <p className="text-sm text-text-secondary">Only the app owner can manage collaborators. Contact the owner to make changes.</p>
          </div>
        )}

        {/* Demo toggle */}
        <div className="mb-4">
          <button
            onClick={() => setShowEmpty(!showEmpty)}
            className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
          >
            [Demo: {showEmpty ? "Show table" : "Show empty state"}]
          </button>
        </div>

        {showEmpty ? (
          /* Empty State */
          <div className="bg-card border border-border p-12 flex flex-col items-center text-center">
            <div className="w-20 h-20 watercolor-mixed flex items-center justify-center mb-4">
              <Users size={32} className="text-text-tertiary" />
            </div>
            <h3 className="text-base font-semibold text-foreground">No collaborators yet</h3>
            <p className="text-sm text-text-secondary mt-1 max-w-xs">Invite developers to help manage this app.</p>
            <RoleGate requiredRole="owner">
              <Button className="mt-4" onClick={() => setInviteOpen(true)}>
                <Plus size={14} /> Invite Your First Collaborator
              </Button>
            </RoleGate>
          </div>
        ) : (
          /* Table */
          <div className="bg-card border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Member", "Role", "Status", "Added", "Actions"].map((h) => (
                    <th key={h} className="text-left text-[11px] uppercase tracking-[0.08em] font-medium text-text-tertiary h-10 px-6">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockCollaborators.map((collab, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-muted hover:bg-background-subtle transition-colors"
                  >
                    <td className="px-6 h-[52px]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-foreground shrink-0">
                          {collab.initials}
                        </div>
                        <div>
                          {collab.name && (
                            <div className="text-sm font-medium text-foreground">
                              {collab.name}
                              {collab.role === "Owner" && <span className="text-text-tertiary"> (You)</span>}
                            </div>
                          )}
                          <div className={cn("text-xs text-text-tertiary", !collab.name && "text-sm text-foreground")}>
                            {collab.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 h-[52px]">
                      <BadgeStatus variant={collab.role === "Owner" ? "active" : "neutral"}>
                        {collab.role}
                      </BadgeStatus>
                    </td>
                    <td className="px-6 h-[52px]">
                      <BadgeStatus variant={collab.status === "Active" ? "neutral" : "warning"}>
                        {collab.status}
                      </BadgeStatus>
                    </td>
                    <td className="px-6 h-[52px] text-sm text-text-secondary">{collab.added}</td>
                    <td className="px-6 h-[52px]">
                      {collab.role === "Owner" ? (
                        <span className="text-sm text-text-tertiary">—</span>
                      ) : isOwner ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {collab.status === "Pending" ? (
                              <>
                                <DropdownMenuItem>Resend Invite</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Cancel Invite</DropdownMenuItem>
                              </>
                            ) : (
                              <>
                                <DropdownMenuItem>
                                  {collab.role === "Admin" ? "Change to Viewer" : "Change to Admin"}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Revoke Access</DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <span className="text-sm text-text-tertiary">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Invite Modal */}
        <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Invite Collaborator</DialogTitle>
              <DialogDescription>
                They'll receive an email to accept the invitation. Only developers can be invited — creator accounts are not eligible.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label>Email Address *</Label>
                <Input
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Role *</Label>
                <Select value={inviteRole} onValueChange={setInviteRole}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-text-tertiary">
                  Admins can create and edit campaigns, affiliates, and payouts. Viewers have read-only access.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setInviteOpen(false)}>Cancel</Button>
              <Button onClick={() => setInviteOpen(false)}>Send Invite →</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Collaborators;