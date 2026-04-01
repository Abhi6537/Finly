import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

/* ── Decorative SVG ── */
const AuthIllustration = ({ isLogin }: { isLogin: boolean }) => (
  <svg viewBox="0 0 400 400" fill="none" className="w-full max-w-[320px] mx-auto">
    {/* Circular orbit rings */}
    <motion.circle cx="200" cy="200" r="160" stroke="rgba(255,255,255,0.04)" strokeWidth="1"
      initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
    />
    <motion.circle cx="200" cy="200" r="120" stroke="rgba(255,255,255,0.06)" strokeWidth="1"
      initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, delay: 0.15 }}
    />
    <motion.circle cx="200" cy="200" r="80" stroke="rgba(200,245,87,0.1)" strokeWidth="1"
      initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    />

    {/* Center wallet/shield icon */}
    <motion.g
      initial={{ scale: 0, opacity: 0 }} animate={{ scale: [1, 1.05, 1], opacity: 1 }}
      transition={{
        scale: { delay: 0.5, duration: 4, repeat: Infinity, ease: "easeInOut" },
        opacity: { delay: 0.5, duration: 0.6 }
      }}
      style={{ transformOrigin: "200px 200px" }}
    >
      {isLogin ? (
        /* Shield for login */
        <>
          <path d="M200 160 L230 175 L230 210 C230 230 215 245 200 250 C185 245 170 230 170 210 L170 175 Z"
            fill="#13161E" stroke="#C8F557" strokeWidth="2" />
          <path d="M190 205 L197 212 L212 195" stroke="#C8F557" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </>
      ) : (
        /* Sparkle/star for signup */
        <>
          <rect x="180" y="180" width="40" height="40" rx="12" fill="#13161E" stroke="#7B61FF" strokeWidth="2" />
          <circle cx="200" cy="200" r="6" fill="#C8F557" />
          <line x1="200" y1="188" x2="200" y2="194" stroke="#C8F557" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="200" y1="206" x2="200" y2="212" stroke="#C8F557" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="188" y1="200" x2="194" y2="200" stroke="#C8F557" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="206" y1="200" x2="212" y2="200" stroke="#C8F557" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
    </motion.g>

    {/* Orbiting dots */}
    {[
      { angle: 0, r: 160, color: "#C8F557", size: 5, duration: 25 },
      { angle: 90, r: 120, color: "#7B61FF", size: 4, duration: 20 },
      { angle: 200, r: 160, color: "#30D990", size: 4, duration: 30 },
      { angle: 270, r: 120, color: "#FF5C5C", size: 3, duration: 18 },
      { angle: 45, r: 80, color: "#C8F557", size: 3, duration: 15 },
      { angle: 150, r: 80, color: "#00C2FF", size: 3, duration: 22 },
    ].map((d, i) => (
      <motion.g
        key={i}
        initial={{ rotate: d.angle, opacity: 0 }}
        animate={{ rotate: d.angle + 360, opacity: 0.7 }}
        transition={{
          rotate: { duration: d.duration, repeat: Infinity, ease: "linear" },
          opacity: { delay: 0.5 + i * 0.1, duration: 1 }
        }}
        style={{ transformOrigin: "200px 200px" }}
      >
        <circle cx={200 + d.r} cy={200} r={d.size} fill={d.color} />
      </motion.g>
    ))}

    {/* Floating card snippets */}
    <motion.g
      initial={{ opacity: 0, x: -20, y: 0 }}
      animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
      transition={{
        opacity: { delay: 1.2, duration: 0.6 },
        x: { delay: 1.2, duration: 0.6 },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }
      }}
    >
      <rect x="40" y="130" width="90" height="50" rx="8" fill="#13161E" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <rect x="50" y="142" width="40" height="6" rx="3" fill="rgba(255,255,255,0.1)" />
      <text x="50" y="168" fill="#30D990" fontSize="11" fontFamily="JetBrains Mono">+₹95K</text>
    </motion.g>
    <motion.g
      initial={{ opacity: 0, x: 20, y: 0 }}
      animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
      transition={{
        opacity: { delay: 1.3, duration: 0.6 },
        x: { delay: 1.3, duration: 0.6 },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.3 }
      }}
    >
      <rect x="270" y="280" width="90" height="50" rx="8" fill="#13161E" stroke="rgba(200,245,87,0.15)" strokeWidth="1" />
      <rect x="280" y="292" width="50" height="6" rx="3" fill="rgba(255,255,255,0.1)" />
      <text x="280" y="318" fill="#C8F557" fontSize="11" fontFamily="JetBrains Mono">35.4%</text>
    </motion.g>
  </svg>
);

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password || (!isLogin && !form.name)) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success(isLogin ? "Welcome back! Redirecting..." : "Account created! Redirecting...");
    setTimeout(() => navigate("/dashboard"), 800);
  };

  return (
    <div className="min-h-[100dvh] bg-background relative overflow-y-auto overflow-x-hidden flex flex-col lg:flex-row">
      {/* Mesh blobs */}
      <div className="absolute top-[-200px] right-[-100px] w-[500px] h-[500px] rounded-full opacity-[0.07] pointer-events-none"
        style={{ background: "radial-gradient(circle, #C8F557 0%, transparent 70%)", animation: "float 8s ease-in-out infinite alternate" }}
      />
      <div className="absolute bottom-[-200px] left-[-100px] w-[500px] h-[500px] rounded-full opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(circle, #7B61FF 0%, transparent 70%)", animation: "float 8s ease-in-out infinite alternate-reverse" }}
      />

      {/* Left - Illustration (hidden on mobile) */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 relative">
        <div className="max-w-md w-full">
          <AuthIllustration isLogin={isLogin} />
          <motion.div
            className="text-center mt-8 hidden lg:block"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
              {isLogin ? "Welcome back to Finly" : "Join the Finly movement"}
            </h2>
            <p className="text-muted-foreground text-sm">
              {isLogin
                ? "Your financial dashboard awaits. Pick up right where you left off."
                : "Take control of your finances with India's most beautiful money tracker."}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-8 z-10 w-full">
        <motion.div
          className="w-full max-w-sm lg:max-w-md bg-[#13161E]/80 backdrop-blur-md border border-white/5 lg:bg-transparent lg:border-none p-5 lg:p-0 rounded-2xl relative overflow-hidden lg:overflow-visible"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Mobile Background SVG - Continuously Animating */}
          <div className="absolute -top-[100px] -right-[100px] w-[400px] opacity-[0.15] pointer-events-none lg:hidden z-0 flex items-center justify-center">
            <div style={{ animation: "meshFloat 12s ease-in-out infinite alternate" }} className="w-full h-full">
              <AuthIllustration isLogin={isLogin} />
            </div>
          </div>

          <div className="relative z-10">
            {/* Back */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-[11px] lg:text-sm mb-6 lg:mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to home
            </button>

            <div className="flex items-start justify-between gap-3 mb-6 lg:mb-8">
              <div className="flex-1">
                {/* Logo */}
                <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-8">
                  <img src="/logo.png" alt="Finly" className="w-14 h-14 lg:w-16 lg:h-16 -m-2 rounded-lg lg:rounded-xl object-contain" />
                  <span className="font-heading font-bold text-xl lg:text-2xl text-foreground">Finly</span>
                </div>

                <h1 className="font-heading text-xl lg:text-3xl font-bold text-foreground mb-1 lg:mb-2">
                  {isLogin ? "Log in" : "Create account"}
                </h1>
                <p className="text-muted-foreground text-[11px] lg:text-base max-w-[200px] lg:max-w-none">
                  {isLogin
                    ? "Enter your credentials to access your dashboard."
                    : "Start tracking your finances in under a minute."}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    key="name-field"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Label htmlFor="name" className="text-foreground text-[11px] lg:text-sm mb-1.5 lg:mb-2 block">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-2.5 lg:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 lg:w-4 lg:h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Aryan Verma"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="pl-8 lg:pl-10 bg-[rgba(255,255,255,0.03)] border-border focus:border-primary h-9 lg:h-11 text-[11px] lg:text-sm"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <Label htmlFor="email" className="text-foreground text-[11px] lg:text-sm mb-1.5 lg:mb-2 block">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-2.5 lg:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 lg:w-4 lg:h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="aryan@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="pl-8 lg:pl-10 bg-[rgba(255,255,255,0.03)] border-border focus:border-primary h-9 lg:h-11 text-[11px] lg:text-sm"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-foreground text-[11px] lg:text-sm mb-1.5 lg:mb-2 block">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-2.5 lg:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 lg:w-4 lg:h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="pl-8 lg:pl-10 pr-8 lg:pr-10 bg-[rgba(255,255,255,0.03)] border-border focus:border-primary h-9 lg:h-11 text-[11px] lg:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 lg:right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5 lg:w-4 lg:h-4" /> : <Eye className="w-3.5 h-3.5 lg:w-4 lg:h-4" />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="text-right">
                  <button type="button" className="text-primary text-[10px] lg:text-xs hover:underline">Forgot password?</button>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-semibold h-10 lg:h-11 text-[11px] lg:text-sm hover:scale-[1.01] transition-all shadow-[0_0_25px_rgba(200,245,87,0.15)] rounded-lg"
              >
                {isLogin ? "Log in" : "Create Account"} <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 lg:gap-4 my-5 lg:my-6">
              <div className="flex-1 h-px bg-[rgba(255,255,255,0.05)]" />
              <span className="text-muted-foreground text-[10px] lg:text-xs">or continue with</span>
              <div className="flex-1 h-px bg-[rgba(255,255,255,0.05)]" />
            </div>

            {/* Social buttons */}
            <div className="flex flex-col gap-2 lg:gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.05)] h-9 lg:h-11 text-[11px] lg:text-sm rounded-lg"
                onClick={() => {
                  toast.success("Google auth is mock — redirecting...");
                  setTimeout(() => navigate("/dashboard"), 800);
                }}
              >
                <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 mr-1.5 lg:mr-2" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </Button>
            </div>

            {/* Toggle */}
            <p className="text-center text-[10px] lg:text-sm text-muted-foreground mt-6 lg:mt-8">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => navigate(isLogin ? "/signup" : "/login")}
                className="text-primary font-medium hover:underline"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
