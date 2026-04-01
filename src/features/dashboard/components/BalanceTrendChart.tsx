import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { formatINRCompact } from "@/lib/formatCurrency";

const data = [
  { month: "Jan", balance: 210000 },
  { month: "Feb", balance: 245000 },
  { month: "Mar", balance: 230000 },
  { month: "Apr", balance: 280000 },
  { month: "May", balance: 320000 },
  { month: "Jun", balance: 384250 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card rounded-lg px-4 py-3 shadow-lg !border-primary/30">
      <p className="text-xs text-muted-foreground mb-1">{label} 2026</p>
      <p className="font-mono text-sm text-foreground font-semibold">
        {formatINRCompact(payload[0].value)}
      </p>
    </div>
  );
};

const BalanceTrendChart = () => (
  <div className="glass-card rounded-xl p-2 md:p-5 h-[140px] md:h-[340px] flex flex-col">
    <h3 className="font-heading text-[11px] md:text-sm font-semibold text-foreground mb-0.5 md:mb-4">Balance Trend</h3>
    <div className="flex-1 min-h-0">
      <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
        <defs>
          <linearGradient id="limeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C8F557" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#C8F557" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#6B7280", fontSize: 9, fontFamily: "Inter" }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#6B7280", fontSize: 9, fontFamily: "JetBrains Mono" }}
          tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          width={35}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="balance"
          stroke="#C8F557"
          strokeWidth={2.5}
          fill="url(#limeGradient)"
          animationDuration={1000}
        />
      </AreaChart>
    </ResponsiveContainer>
    </div>
  </div>
);

export default BalanceTrendChart;
