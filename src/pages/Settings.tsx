import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useRole } from "@/context/RoleContext";
import { useTransactions } from "@/features/transactions/context/TransactionContext";
import { toast } from "sonner";

const Settings = () => {
  const { role } = useRole();
  const { dispatch } = useTransactions();
  const navigate = useNavigate();

  // Profile Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({ name: "Aryan Kumar", email: "aryan.kumar@gmail.com" });

  // Notifications State
  const [notifications, setNotifications] = useState({
    "Gmail notifications": true,
    "Budget alerts": true,
    "Weekly summary": true,
  });

  const toggleNotification = (key: string) => {
    setNotifications(prev => ({ ...prev, [key as keyof typeof notifications]: !prev[key as keyof typeof notifications] }));
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all data?")) {
      dispatch({ type: "CLEAR" });
      toast.success("All data cleared");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6 max-w-2xl"
    >
      <h1 className="font-heading font-bold text-2xl">Settings</h1>

      {/* Profile Card */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading font-semibold text-sm text-muted-foreground uppercase tracking-wider">Profile</h3>
          <button 
            onClick={() => {
              if (isEditing) toast.success("Profile updated");
              setIsEditing(!isEditing);
            }} 
            className="text-xs font-medium text-primary hover:underline"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-lg font-mono font-semibold text-foreground shrink-0">
            {profileData.name.substring(0,2).toUpperCase()}
          </div>
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2 max-w-[240px]">
                <input 
                  type="text" 
                  value={profileData.name} 
                  onChange={(e) => setProfileData(p => ({...p, name: e.target.value}))}
                  className="w-full bg-muted/50 border border-[rgba(255,255,255,0.07)] rounded px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <div className="space-y-1">
                  <label className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Gmail Address</label>
                  <input 
                    type="email" 
                    value={profileData.email} 
                    readOnly
                    className="w-full bg-muted/20 border border-transparent rounded px-2 py-1 text-sm text-foreground/50 cursor-not-allowed focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              <>
                <p className="text-foreground font-medium text-lg">{profileData.name}</p>
                <p className="text-sm text-muted-foreground">{profileData.email}</p>
              </>
            )}
            <span
              className={`inline-block mt-2 text-[10px] font-mono font-medium uppercase tracking-wider px-2 py-0.5 rounded ${
                role === "admin"
                  ? "bg-primary/20 text-primary"
                  : "bg-secondary/20 text-secondary"
              }`}
            >
              {role}
            </span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-heading font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">Notifications</h3>
        <div className="space-y-4">
          {[
            { label: "Gmail notifications", desc: "Receive transaction alerts via Gmail" },
            { label: "Budget alerts", desc: "Get notified when exceeding budget" },
            { label: "Weekly summary", desc: "Weekly spending summary report" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications[item.label as keyof typeof notifications]}
                  onChange={() => toggleNotification(item.label)} 
                  className="sr-only peer" 
                />
                <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-foreground after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full peer-checked:after:bg-primary-foreground" />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Data Management */}
      {role === "admin" && (
        <div className="glass-card rounded-xl p-6">
          <h3 className="font-heading font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">Data Management</h3>
          <div className="flex gap-3">
            <button
              onClick={handleClear}
              className="px-4 py-2.5 rounded-lg bg-destructive/10 border border-destructive/20 text-sm font-medium text-destructive hover:bg-destructive/20 transition-colors"
            >
              Clear All Data
            </button>
          </div>
        </div>
      )}

      {/* Mobile Sign Out */}
      <div className="md:hidden glass-card rounded-xl p-6">
        <button 
          onClick={() => navigate("/")}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[rgba(255,255,255,0.05)] text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:border-destructive/20 hover:text-destructive transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* App Info */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-heading font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">About</h3>
        <p className="text-sm text-foreground">Finly v1.0.0</p>
        <p className="text-xs text-muted-foreground mt-1">Enterprise financial visibility.</p>
      </div>
    </motion.div>
  );
};

export default Settings;
