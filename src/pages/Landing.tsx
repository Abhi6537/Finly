import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Shield,
  Zap,
  TrendingUp,
  PieChart,
  Wallet,
  ChevronRight,
  Users,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ── Animated SVG Illustrations ── */
const HeroIllustration = () => (
  <svg viewBox="0 0 480 400" fill="none" className="w-full h-full">
    {/* Phone mockup */}
    <motion.rect
      x="140" y="30" width="200" height="340" rx="24"
      fill="#13161E" stroke="rgba(255,255,255,0.12)" strokeWidth="2"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: [0, -10, 0] }}
      transition={{
        y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        opacity: { duration: 0.8 }
      }}
    />
    <motion.rect
      x="152" y="50" width="176" height="300" rx="12"
      fill="#0D0F14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, -10, 0] }}
      transition={{
        y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        opacity: { delay: 0.3, duration: 0.6 }
      }}
    />
    {/* Screen content - continuous pulsing chart bars */}
    {[0, 1, 2, 3, 4].map((i) => (
      <motion.rect
        key={i}
        x={172 + i * 30} y={260 - [80, 120, 60, 140, 100][i]}
        width="18" rx="4"
        height={[80, 120, 60, 140, 100][i]}
        fill={i === 3 ? "#C8F557" : "rgba(255,255,255,0.08)"}
        initial={{ scaleY: 0 }}
        animate={{
          scaleY: [1, 0.85, 1],
          y: [0, -10, 0]
        }}
        transition={{
          scaleY: { delay: 0.5 + i * 0.1, duration: 3, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{ transformOrigin: "bottom" }}
      />
    ))}
    {/* Balance text placeholder */}
    <motion.rect x="170" y="70" width="100" height="8" rx="4" fill="rgba(255,255,255,0.15)"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, -10, 0] }}
      transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, opacity: { delay: 0.4 } }}
    />
    <motion.rect x="170" y="90" width="140" height="16" rx="4" fill="#C8F557"
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: 140, y: [0, -10, 0] }}
      transition={{
        width: { delay: 0.6, duration: 0.8 },
        y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
      }}
    />
    {/* Floating green card */}
    <motion.g
      initial={{ opacity: 0, x: 40, y: 0 }}
      animate={{ opacity: 1, x: 0, y: [0, -15, 0] }}
      transition={{
        opacity: { delay: 0.8, duration: 0.7 },
        x: { delay: 0.8, duration: 0.7 },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
      }}
    >
      <rect x="340" y="80" width="120" height="70" rx="12" fill="#13161E" stroke="rgba(200,245,87,0.3)" strokeWidth="1" />
      <circle cx="360" cy="100" r="8" fill="#30D990" />
      <rect x="374" y="96" width="60" height="8" rx="3" fill="rgba(255,255,255,0.15)" />
      <rect x="355" y="120" width="90" height="10" rx="3" fill="rgba(255,255,255,0.1)" />
      <text x="355" y="142" fill="#30D990" fontSize="10" fontFamily="JetBrains Mono">+₹95,000</text>
    </motion.g>
    {/* Floating purple card */}
    <motion.g
      initial={{ opacity: 0, x: -40, y: 0 }}
      animate={{ opacity: 1, x: 0, y: [0, 15, 0] }}
      transition={{
        opacity: { delay: 1, duration: 0.7 },
        x: { delay: 1, duration: 0.7 },
        y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }
      }}
    >
      <rect x="20" y="160" width="120" height="70" rx="12" fill="#13161E" stroke="rgba(123,97,255,0.3)" strokeWidth="1" />
      <circle cx="40" cy="180" r="8" fill="#7B61FF" />
      <rect x="54" y="176" width="60" height="8" rx="3" fill="rgba(255,255,255,0.15)" />
      <rect x="35" y="200" width="90" height="10" rx="3" fill="rgba(255,255,255,0.1)" />
      <text x="35" y="222" fill="#FF5C5C" fontSize="10" fontFamily="JetBrains Mono">-₹12,800</text>
    </motion.g>
    {/* Floating dots */}
    {[
      { cx: 80, cy: 80, r: 4, color: "#C8F557", delay: 1.2 },
      { cx: 420, cy: 300, r: 3, color: "#7B61FF", delay: 1.4 },
      { cx: 60, cy: 320, r: 5, color: "#30D990", delay: 1.1 },
      { cx: 440, cy: 180, r: 3, color: "#C8F557", delay: 1.5 },
    ].map((dot, i) => (
      <motion.circle
        key={i} cx={dot.cx} cy={dot.cy} r={dot.r} fill={dot.color}
        initial={{ opacity: 0, scale: 0, y: 0 }}
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.8, 1.2, 0.8], y: [0, -5, 0] }}
        transition={{
          opacity: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: dot.delay },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: dot.delay },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: dot.delay }
        }}
      />
    ))}
  </svg>
);

const features = [
  { icon: BarChart3, title: "Live Insights", desc: "Real-time spending analytics with beautiful charts", color: "#C8F557" },
  { icon: Zap, title: "Instant Tracking", desc: "Add & categorize transactions in seconds", color: "#30D990" },
  { icon: Shield, title: "Role-Based Access", desc: "Admin & Viewer modes for secure collaboration", color: "#7B61FF" },
];


const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative">
      {/* Mesh blobs wrapped to not break scroll bounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle, #C8F557 0%, transparent 70%)", animation: "float 8s ease-in-out infinite alternate" }}
        />
        <div className="absolute bottom-[-300px] right-[-200px] w-[700px] h-[700px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #7B61FF 0%, transparent 70%)", animation: "float 8s ease-in-out infinite alternate-reverse" }}
        />
        <div className="absolute top-[50%] left-[50%] w-[500px] h-[500px] rounded-full opacity-[0.04] -translate-x-1/2 -translate-y-1/2"
          style={{ background: "radial-gradient(circle, #30D990 0%, transparent 70%)", animation: "float 10s ease-in-out infinite alternate" }}
        />
      </div>

      {/* Nav */}
      <motion.nav
        className="relative z-20 flex items-center justify-between px-6 md:px-8 py-4 md:py-5 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Finly" className="w-16 h-16 -m-3 rounded-lg object-contain" />
          <span className="font-heading font-bold text-2xl text-foreground">Finly</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            Features
          </a>
          <Button
            className="bg-primary text-primary-foreground hover:scale-[1.02] transition-transform font-semibold"
            onClick={() => navigate("/signup")}
          >
            Get Started <ArrowRight className="ml-1 w-4 h-4" />
          </Button>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pt-4 pb-8 md:pt-12 md:pb-16 flex flex-col items-center text-center lg:text-left lg:grid lg:grid-cols-2 gap-6 md:gap-12">
        
        {/* Mobile Background SVG removed - switching to inline stack */}

        <motion.div
          initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center lg:items-start w-full"
        >
          <div className="inline-flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full glass mb-4 md:mb-6 text-[9.5px] sm:text-[11px] md:text-xs text-muted-foreground leading-tight text-center max-w-[280px] sm:max-w-none">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse shrink-0" />
            <span>Powering financial operations for 500+ forward-thinking teams</span>
          </div>
          
          {/* Mobile Illustration inserted between badge and heading */}
          <div className="lg:hidden relative w-[110%] max-w-[340px] sm:max-w-[400px] mx-auto -mt-2 -mb-16 z-0 opacity-60 pointer-events-none mix-blend-screen flex justify-center"
               style={{ maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)" }}>
            <HeroIllustration />
          </div>

          <h1 className="relative z-10 font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-[1.15] mb-3 md:mb-5 max-w-[300px] sm:max-w-none mx-auto lg:mx-0">
            Enterprise financial <span className="text-primary">visibility.</span>
          </h1>
          <p className="relative z-10 text-muted-foreground text-[13px] sm:text-sm md:text-base max-w-[320px] sm:max-w-lg mb-5 md:mb-8 mx-auto lg:mx-0 leading-relaxed">
            Gain unprecedented visibility into your organization's cash flow. Finly combines
            real-time analytics with uncompromising security to optimize your financial operations.
          </p>
          <div className="relative z-10 flex flex-row items-center justify-center lg:justify-start gap-2.5 md:gap-3 w-full sm:w-auto">
            <Button
              className="flex-1 sm:flex-none h-9 md:h-11 bg-primary text-primary-foreground hover:scale-[1.02] transition-all font-semibold text-[12px] md:text-sm px-4 md:px-6 shadow-[0_0_20px_rgba(200,245,87,0.15)]"
              onClick={() => navigate("/signup")}
            >
              Start for Free <ChevronRight className="ml-0.5 w-3.5 h-3.5 md:w-4 md:h-4" />
            </Button>
            <Button
              variant="outline"
              className="flex-1 sm:flex-none h-9 md:h-11 border-border text-foreground hover:bg-muted/50 text-[12px] md:text-sm px-4 md:px-6"
              onClick={() => navigate("/dashboard")}
            >
              View Demo
            </Button>
          </div>
          <div className="relative z-10 flex flex-wrap justify-center lg:justify-start items-center gap-3 md:gap-6 mt-6 md:mt-10 text-[10px] md:text-sm text-muted-foreground w-full">
            <div className="flex items-center gap-1"><Users className="w-3 h-3 md:w-4 md:h-4 text-primary" /> 500+ teams</div>
            <div className="flex items-center gap-1.5"><Globe className="w-3 h-3 md:w-4 md:h-4 text-secondary" /> SOC2 Compliant</div>
            <div className="flex items-center gap-1.5"><Shield className="w-3 h-3 md:w-4 md:h-4 text-success" /> Bank-grade security</div>
          </div>
        </motion.div>
        
        {/* Desktop inline SVG */}
        <motion.div
          className="hidden lg:block relative w-full max-w-none"
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <HeroIllustration />
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
            A comprehensive suite for <span className="text-primary">modern financial teams</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
            Built with obsessive attention to detail for teams that demand uncompromising insights into their capital flow.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="glass-card rounded-2xl p-6 group hover:shadow-[0_0_0_1px_#C8F557] transition-all cursor-default"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${f.color}15` }}
              >
                <f.icon className="w-5 h-5" style={{ color: f.color }} />
              </div>
              <h3 className="font-heading font-semibold text-foreground text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 py-8 md:py-16">
        <motion.div
          className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { value: "$500M+", label: "Managed" },
            { value: "500+", label: "Organizations" },
            { value: "3M+", label: "Transactions" },
            { value: "99.99%", label: "Uptime" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-mono text-2xl lg:text-3xl font-bold text-primary mb-1">{s.value}</div>
              <div className="text-muted-foreground text-sm">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8 text-center text-muted-foreground text-xs">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Finly" className="w-12 h-12 -m-2 rounded-md object-contain" />
            <span className="font-heading font-semibold text-foreground text-sm">Finly</span>
          </div>
          <p>© 2026 Finly Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
