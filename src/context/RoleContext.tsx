import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Role = "admin" | "viewer";

interface RoleContextValue {
  role: Role;
  toggleRole: () => void;
  isAdmin: boolean;
}

const RoleContext = createContext<RoleContextValue | null>(null);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>(() => {
    return (localStorage.getItem("finly-role") as Role) || "admin";
  });

  useEffect(() => {
    localStorage.setItem("finly-role", role);
  }, [role]);

  const toggleRole = () => setRole((r) => (r === "admin" ? "viewer" : "admin"));

  return (
    <RoleContext.Provider value={{ role, toggleRole, isAdmin: role === "admin" }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
};
