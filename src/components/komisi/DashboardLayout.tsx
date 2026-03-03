import React, { ReactNode, useState } from "react";
import { AppSidebar } from "@/components/komisi/AppSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  activeItem?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activeItem }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar
        userType="developer"
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        activeItem={activeItem}
      />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
