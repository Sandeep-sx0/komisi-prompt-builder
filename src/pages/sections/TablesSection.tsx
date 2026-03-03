import React from "react";
import { SectionHeader } from "@/pages/Index";
import { BadgeStatus } from "@/components/komisi/BadgeStatus";
import { ChevronsUpDown } from "lucide-react";

const data = [
  { name: "Emma Rodriguez", platform: "TikTok", clicks: "2,340", conversions: 45, revenue: "$1,230", status: "active" as const },
  { name: "James Park", platform: "YouTube", clicks: "8,120", conversions: 112, revenue: "$4,580", status: "active" as const },
  { name: "Aisha Patel", platform: "Instagram", clicks: "1,890", conversions: 28, revenue: "$890", status: "pending" as const },
  { name: "Carlos Silva", platform: "Blog", clicks: "560", conversions: 8, revenue: "$240", status: "inactive" as const },
];

export const TablesSection = () => (
  <div>
    <SectionHeader title="Tables & Data" desc="Clean data tables with sorting and status indicators." />
    <div className="bg-background-subtle rounded-xl p-8">
      <div className="bg-card rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-background-subtle">
              {["Affiliate", "Platform", "Clicks", "Conversions", "Revenue", "Status"].map((h) => (
                <th key={h} className="text-left text-xs uppercase tracking-wider font-semibold text-text-secondary h-10 px-4">
                  <span className="inline-flex items-center gap-1">{h} <ChevronsUpDown size={12} /></span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.name} className="border-b border-muted last:border-0 hover:bg-background-subtle transition-colors">
                <td className="px-4 h-14 text-sm font-medium text-foreground">{row.name}</td>
                <td className="px-4 h-14 text-sm text-text-secondary">{row.platform}</td>
                <td className="px-4 h-14 text-sm text-foreground">{row.clicks}</td>
                <td className="px-4 h-14 text-sm text-foreground">{row.conversions}</td>
                <td className="px-4 h-14 text-sm font-medium text-foreground">{row.revenue}</td>
                <td className="px-4 h-14">
                  <BadgeStatus variant={row.status === "active" ? "success" : row.status === "pending" ? "warning" : "neutral"} dot>
                    {row.status}
                  </BadgeStatus>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
