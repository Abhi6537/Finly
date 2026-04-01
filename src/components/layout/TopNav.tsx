import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useRole } from "@/context/RoleContext";
import { getGreeting } from "@/lib/dateUtils";
import { toast } from "sonner";

const TopNav = () => {
  const { role, toggleRole } = useRole();

  const handleToggle = () => {
    toggleRole();
    toast(
      role === "admin" ? "Switched to Viewer mode" : "Switched to Admin mode",
      { duration: 3000 }
    );
  };

  return (
    <header className="h-12 md:h-14 flex items-center justify-between px-3 md:px-6 border-b border-[rgba(255,255,255,0.07)] gap-2">
      {/* Mobile: Logo + compact greeting | Desktop: full greeting */}
      <div className="flex items-center gap-2 min-w-0">
        <Link to="/" className="md:hidden shrink-0 hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="Finly" className="w-12 h-12 -m-2 rounded-md object-contain" />
        </Link>
        <h2 className="font-heading font-semibold text-[11px] md:text-lg text-foreground truncate">
          {getGreeting()}, Aryan 👋
        </h2>
      </div>

      <div className="flex items-center gap-2 md:gap-4 ml-auto">


        {/* Role toggle */}
        <button
          onClick={handleToggle}
          className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-[rgba(255,255,255,0.07)] bg-muted/30 text-[10px] md:text-sm font-medium transition-all hover:bg-muted/50 shrink-0"
        >
          {role === "admin" ? (
            <>
              <span className="text-[10px] md:text-xs">⚙</span>
              <span className="hidden sm:inline text-primary font-mono text-[10px] md:text-xs uppercase tracking-wider">Admin</span>
            </>
          ) : (
            <>
              <span className="text-[10px] md:text-xs">👁</span>
              <span className="hidden sm:inline text-secondary font-mono text-[10px] md:text-xs uppercase tracking-wider">Viewer</span>
            </>
          )}
        </button>

        {/* Bell */}
        <div className="relative">
          <Bell className="w-5 h-5 text-muted-foreground bell-pulse cursor-pointer" />
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full" />
        </div>

        {/* Avatar link to settings */}
        <Link to="/settings" className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-muted flex items-center justify-center text-[9px] md:text-xs font-mono font-medium text-foreground shrink-0 hover:ring-2 hover:ring-primary transition-all">
          AK
        </Link>
      </div>
    </header>
  );
};

export default TopNav;
