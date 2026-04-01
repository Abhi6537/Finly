import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { formatINRCompact } from "@/lib/formatCurrency";

const data = [
  { name: "Food", value: 14200, color: "#FF8C42" },
  { name: "Transport", value: 8400, color: "#7B61FF" },
  { name: "Shopping", value: 12800, color: "#C8F557" },
  { name: "Health", value: 5600, color: "#30D990" },
  { name: "Fun", value: 7500, color: "#FF5C5C" },
  { name: "Education", value: 6200, color: "#00C2FF" },
  { name: "Rent", value: 6640, color: "#A0AEC0" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card rounded-lg px-3 py-2 shadow-lg !border-primary/30">
      <p className="font-mono text-xs">{formatINRCompact(payload[0].value)}</p>
    </div>
  );
};

const CategoryBarChart = () => (
  <ResponsiveContainer width="100%" height="100%" minHeight={120}>
    <BarChart data={data} layout="vertical" barCategoryGap="20%">
      <CartesianGrid stroke="rgba(255,255,255,0.04)" horizontal={false} />
      <XAxis
        type="number"
        axisLine={false}
        tickLine={false}
        tick={{ fill: "#6B7280", fontSize: 10, fontFamily: "JetBrains Mono" }}
        tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
      />
      <YAxis
        type="category"
        dataKey="name"
        axisLine={false}
        tickLine={false}
        tick={{ fill: "#6B7280", fontSize: 11, fontFamily: "Inter" }}
        width={70}
      />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="value" radius={[0, 4, 4, 0]} animationDuration={800}>
        {data.map((entry) => (
          <Cell key={entry.name} fill={entry.color} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export default CategoryBarChart;
