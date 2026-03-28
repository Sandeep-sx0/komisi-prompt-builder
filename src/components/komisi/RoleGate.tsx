import React, { ReactNode } from "react";
import { useAppScope } from "@/hooks/use-app-scope";

interface RoleGateProps {
  children: ReactNode;
  /** Minimum role required. "viewer" = anyone, "admin" = admin+owner, "owner" = owner only */
  requiredRole?: "viewer" | "admin" | "owner";
  /** What to show when access is denied. Defaults to nothing. */
  fallback?: ReactNode;
}

const roleHierarchy = { viewer: 0, admin: 1, owner: 2 };

export const RoleGate: React.FC<RoleGateProps> = ({ children, requiredRole = "admin", fallback = null }) => {
  const { role } = useAppScope();

  if (roleHierarchy[role] >= roleHierarchy[requiredRole]) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
};
