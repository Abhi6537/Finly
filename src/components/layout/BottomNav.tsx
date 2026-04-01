import { NavLink } from "react-router-dom";
import { LayoutDashboard, ArrowLeftRight, Lightbulb, Settings } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { to: "/insights", label: "Insights", icon: Lightbulb },
  { to: "/settings", label: "Settings", icon: Settings },
];

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[52px] glass border-t border-[rgba(255,255,255,0.07)] z-50 flex items-center justify-around md:hidden px-1 pb-safe">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`
          }
        >
          <item.icon className="w-4 h-4 mt-0.5" />
          <span className="text-[9px] font-medium tracking-tight mb-0.5">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
