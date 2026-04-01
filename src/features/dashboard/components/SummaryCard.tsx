import { type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import CountUpNumber from "@/components/shared/CountUpNumber";
import { formatINR } from "@/lib/formatCurrency";

interface SummaryCardProps {
  icon: LucideIcon;
  iconColor: string;
  label: string;
  value: number;
  isCurrency?: boolean;
  isPercent?: boolean;
  trend: string;
  trendUp: boolean;
  index: number;
}

const SummaryCard = ({
  icon: Icon,
  iconColor,
  label,
  value,
  isCurrency = true,
  isPercent = false,
  trend,
  trendUp,
  index,
}: SummaryCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
    className="glass-card rounded-xl p-3 md:p-5"
  >
    <div className="flex items-start justify-between mb-2.5 md:mb-3">
      <div
        className="w-7 h-7 md:w-10 md:h-10 rounded-lg flex justify-center items-center shrink-0"
        style={{ backgroundColor: `${iconColor}15` }}
      >
        <Icon className="w-3.5 h-3.5 md:w-5 md:h-5" style={{ color: iconColor }} />
      </div>
      <span
        className={`text-[9px] md:text-xs font-mono font-medium px-1.5 py-0.5 md:px-2 md:py-1 rounded-full border border-transparent whitespace-nowrap ${
          trendUp
            ? "bg-[#30D990]/10 text-[#30D990]"
            : "bg-[#FF5C5C]/10 text-[#FF5C5C]"
        }`}
      >
        {trendUp ? "▲" : "▼"} {trend}
      </span>
    </div>
    <p className="text-muted-foreground text-[10px] md:text-sm mb-0.5 md:mb-1 truncate">{label}</p>
    <div className="text-xs sm:text-lg md:text-2xl font-bold font-mono leading-tight">
      {isPercent ? (
        <CountUpNumber
          end={value}
          decimals={1}
          suffix="%"
          className="text-foreground"
        />
      ) : isCurrency ? (
        <CountUpNumber
          end={value}
          formatFn={(v) => formatINR(v)}
          className="text-foreground"
        />
      ) : (
        <CountUpNumber end={value} className="text-foreground" />
      )}
    </div>
  </motion.div>
);

export default SummaryCard;
