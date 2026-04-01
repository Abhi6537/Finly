import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { formatINRCompact } from "@/lib/formatCurrency";

const data = [
  { day: "Mon", value: 4200 },
  { day: "Tue", value: 3800 },
  { day: "Wed", value: 5100 },
  { day: "Thu", value: 4600 },
  { day: "Fri", value: 8900 },
  { day: "Sat", value: 9200 },
  { day: "Sun", value: 7500 },
];

const max = Math.max(...data.map((d) => d.value));

const SpendingVelocityChart = () => (
  <ResponsiveContainer width="100%" height="100%" minHeight={120}>
    <BarChart data={data}>
      <XAxis
        dataKey="day"
        axisLine={false}
        tickLine={false}
        tick={{ fill: "#6B7280", fontSize: 11 }}
      />
      <YAxis hide />
      <Tooltip
        content={({ active, payload }: any) =>
          active && payload?.length ? (
            <div className="glass-card rounded-lg px-3 py-2 !border-primary/30">
              <span className="font-mono text-xs">{formatINRCompact(payload[0].value)}</span>
            </div>
          ) : null
        }
      />
      <Bar dataKey="value" radius={[4, 4, 0, 0]} animationDuration={600}>
        {data.map((entry) => (
          <Cell
            key={entry.day}
            fill={entry.value === max ? "#C8F557" : "rgba(255,255,255,0.1)"}
          />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export default SpendingVelocityChart;
