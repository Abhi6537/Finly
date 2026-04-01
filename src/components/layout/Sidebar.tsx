import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, ArrowLeftRight, Lightbulb, Settings, LogOut } from "lucide-react";
import { useRole } from "@/context/RoleContext";

const navItems = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { to: "/insights", label: "Insights", icon: Lightbulb },
  { to: "/settings", label: "Settings", icon: Settings },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = useRole();

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[220px] glass z-40 flex-col">
      {/* Logo */}
      <Link to="/" className="px-6 py-6 flex items-center gap-3 hover:opacity-80 transition-opacity">
        <img src="/logo.png" alt="Finly" className="w-14 h-14 -m-2 rounded-lg object-contain" />
        <span className="font-heading font-bold text-xl text-foreground">Finly</span>
      </Link>

      {/* Nav */}
      <nav className="flex-1 px-3 mt-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.to);
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group relative ${
                    isActive
                      ? "bg-primary/10 text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-[rgba(255,255,255,0.04)]"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full" />
                  )}
                  <item.icon className={`w-4 h-4 ${isActive ? "text-primary" : ""}`} />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sign Out */}
      <div className="px-3 pb-6 mt-auto">
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-[rgba(255,255,255,0.05)] text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
