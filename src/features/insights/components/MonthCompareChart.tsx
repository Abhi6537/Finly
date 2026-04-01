import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { formatINRCompact } from "@/lib/formatCurrency";

const data = [
  { month: "May", income: 130000, expenses: 58000, savings: 72000 },
  { month: "Jun", income: 95000, expenses: 61340, savings: 33660 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card rounded-lg px-4 py-3 shadow-lg !border-primary/30">
      <p className="text-xs text-muted-foreground mb-1">{label} 2026</p>
      {payload.map((p: any) => (
        <p key={p.name} className="font-mono text-xs" style={{ color: p.color }}>
          {p.name}: {formatINRCompact(p.value)}
        </p>
      ))}
    </div>
  );
};

const MonthCompareChart = () => (
  <ResponsiveContainer width="100%" height="100%" minHeight={120}>
    <BarChart data={data} barCategoryGap="30%">
      <CartesianGrid stroke="rgba(255,255,255,0.04)" />
      <XAxis
        dataKey="month"
        axisLine={false}
        tickLine={false}
        tick={{ fill: "#6B7280", fontSize: 12 }}
      />
      <YAxis
        axisLine={false}
        tickLine={false}
        tick={{ fill: "#6B7280", fontSize: 10, fontFamily: "JetBrains Mono" }}
        tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
      />
      <Tooltip content={<CustomTooltip />} />
      <Legend
        iconType="circle"
        iconSize={8}
        wrapperStyle={{ fontSize: 11, fontFamily: "Inter" }}
      />
      <Bar dataKey="income" name="Income" fill="#30D990" radius={[4, 4, 0, 0]} />
      <Bar dataKey="expenses" name="Expenses" fill="#FF5C5C" radius={[4, 4, 0, 0]} />
      <Bar dataKey="savings" name="Savings" fill="#C8F557" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

export default MonthCompareChart;
