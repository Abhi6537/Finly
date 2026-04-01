import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { formatINR } from "@/lib/formatCurrency";

const data = [
  { name: "Food & Dining", value: 14200, color: "#FF8C42" },
  { name: "Transport", value: 8400, color: "#7B61FF" },
  { name: "Shopping", value: 12800, color: "#C8F557" },
  { name: "Health", value: 5600, color: "#30D990" },
  { name: "Entertainment", value: 7500, color: "#FF5C5C" },
  { name: "Education", value: 6200, color: "#00C2FF" },
  { name: "Rent & Utilities", value: 6640, color: "#A0AEC0" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  const total = data.reduce((s, v) => s + v.value, 0);
  const pct = ((d.value / total) * 100).toFixed(0);
  return (
    <div className="glass-card rounded-lg px-4 py-3 shadow-lg !border-primary/30">
      <p className="text-xs text-muted-foreground">{d.name}</p>
      <p className="font-mono text-sm font-semibold" style={{ color: d.payload.color }}>
        {formatINR(d.value)} ({pct}%)
      </p>
    </div>
  );
};

const SpendingDonutChart = () => {
  const total = data.reduce((s, v) => s + v.value, 0);
  return (
    <div className="glass-card rounded-xl p-2 md:p-5 h-[140px] md:h-[340px] flex flex-col">
      <div className="flex flex-col mb-1 md:mb-4">
        <h3 className="font-heading text-[11px] md:text-sm font-semibold text-foreground truncate">Spending</h3>
        <div className="flex items-baseline gap-1 mt-0.5">
          <span className="font-mono text-[11px] md:text-lg font-bold text-foreground">
            {formatINR(total)}
          </span>
          <span className="text-[8px] md:text-xs text-muted-foreground">spent this month</span>
        </div>
      </div>
      <div className="relative flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="40%"
              outerRadius="80%"
              paddingAngle={2}
              dataKey="value"
              animationDuration={800}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingDonutChart;
