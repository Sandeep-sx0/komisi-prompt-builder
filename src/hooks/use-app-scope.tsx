import React, { createContext, useContext, useState, ReactNode } from "react";

type AppRole = "owner" | "admin" | "viewer";

interface AppScopeContextType {
  appId: string;
  appName: string;
  role: AppRole;
  canWrite: boolean;
  canManageCollaborators: boolean;
  canDeleteApp: boolean;
  switchApp: (appId: string, appName: string, role: AppRole) => void;
}

const AppScopeContext = createContext<AppScopeContextType | null>(null);

export const AppScopeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appId, setAppId] = useState("app_mindfulapp_001");
  const [appName, setAppName] = useState("MindfulApp");
  const [role, setRole] = useState<AppRole>("owner");

  const switchApp = (newAppId: string, newAppName: string, newRole: AppRole) => {
    setAppId(newAppId);
    setAppName(newAppName);
    setRole(newRole);
  };

  const canWrite = role === "owner" || role === "admin";
  const canManageCollaborators = role === "owner";
  const canDeleteApp = role === "owner";

  return (
    <AppScopeContext.Provider value={{ appId, appName, role, canWrite, canManageCollaborators, canDeleteApp, switchApp }}>
      {children}
    </AppScopeContext.Provider>
  );
};

export const useAppScope = () => {
  const context = useContext(AppScopeContext);
  if (!context) throw new Error("useAppScope must be used within AppScopeProvider");
  return context;
};
