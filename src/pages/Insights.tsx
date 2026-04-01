import { motion } from "framer-motion";
import { Trophy, CalendarDays, Zap, Target, AlertTriangle, TrendingUp } from "lucide-react";
import CategoryBarChart from "@/features/insights/components/CategoryBarChart";
import MonthCompareChart from "@/features/insights/components/MonthCompareChart";
import SpendingVelocityChart from "@/features/insights/components/SpendingVelocityChart";
import SavingsRing from "@/features/insights/components/SavingsRing";
import { formatINR } from "@/lib/formatCurrency";

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" as const },
  }),
};

const insights = [
  {
    icon: Trophy,
    iconColor: "#C8F557",
    title: "Top Spending Category",
    subtitle: "Shopping ate up ₹12,800 this month",
    chart: <CategoryBarChart />,
  },
  {
    icon: CalendarDays,
    iconColor: "#7B61FF",
    title: "Month-over-Month Comparison",
    subtitle: "May 2026 vs June 2026",
    chart: <MonthCompareChart />,
  },
  {
    icon: Zap,
    iconColor: "#FF8C42",
    title: "Spending Velocity",
    subtitle: "You spend the most on Fridays & Weekends",
    chart: <SpendingVelocityChart />,
  },
  {
    icon: Target,
    iconColor: "#C8F557",
    title: "Savings Goal Tracker",
    subtitle: `${formatINR(115750)} to go — keep it up!`,
    chart: <SavingsRing current={384250} goal={500000} />,
  },
  {
    icon: AlertTriangle,
    iconColor: "#FF5C5C",
    title: "Budget Alert",
    subtitle: "Shopping is over budget by ₹2,800",
    isWarning: true,
    chart: null,
  },
  {
    icon: TrendingUp,
    iconColor: "#30D990",
    title: "Best Month",
    subtitle: "March was your lowest spending month (₹48,200)",
    chart: null,
  },
];

const Insights = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2 }}
    className="space-y-4 md:space-y-6"
  >
    <h1 className="font-heading font-bold text-xl md:text-2xl">Insights</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
      {insights.map((item, i) => (
        <motion.div
          key={item.title}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={cardVariant}
          className={`glass-card rounded-xl p-3 md:p-4 flex flex-col ${
            item.isWarning ? "!shadow-[0_0_0_1px_#FF5C5C]" : ""
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-7 h-7 rounded-md flex shrink-0 items-center justify-center"
              style={{ backgroundColor: `${item.iconColor}15` }}
            >
              <item.icon className="w-3.5 h-3.5" style={{ color: item.iconColor }} />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-xs md:text-sm text-foreground">{item.title}</h3>
              <p className="text-[10px] md:text-xs text-muted-foreground">{item.subtitle}</p>
            </div>
          </div>
          {item.chart && <div className="mt-1 h-[120px] md:h-auto">{item.chart}</div>}
          {!item.chart && item.isWarning && (
            <div className="mt-3 p-2.5 rounded-lg bg-[#FF5C5C]/5 border border-[#FF5C5C]/10">
              <p className="text-[11px] md:text-sm text-[#FF5C5C] font-medium leading-snug">
                ⚠️ Your shopping expenses exceeded the monthly budget of ₹10,000
              </p>
            </div>
          )}
          {!item.chart && !item.isWarning && (
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-mono text-2xl md:text-3xl font-bold text-primary">₹48,200</span>
              <span className="text-[10px] md:text-xs text-muted-foreground">in March 2026</span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default Insights;
