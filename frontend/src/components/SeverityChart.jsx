import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

export default function SeverityChart({ stats }) {
  const data = [
    {
      name: "Critical",
      value: stats.critical ?? 0,
      color: "#dc2626",
    },
    {
      name: "High",
      value: stats.high ?? 0,
      color: "#f97316",
    },
    {
      name: "Medium",
      value: stats.medium ?? 0,
      color: "#eab308",
    },
    {
      name: "Low",
      value: stats.low ?? 0,
      color: "#22c55e",
    },
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Incident Severity
          </h2>

          <p className="text-sm text-slate-400">
            Distribution of incidents by severity level
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          barCategoryGap="25%"
        >
          <CartesianGrid
            stroke="#1e293b"
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="name"
            tick={{ fill: "#94a3b8", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            allowDecimals={false}
            tick={{ fill: "#94a3b8", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "10px",
              color: "#fff",
            }}
            labelStyle={{
              color: "#fff",
            }}
          />

          <Bar
            dataKey="value"
            radius={[8, 8, 0, 0]}
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.color}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}