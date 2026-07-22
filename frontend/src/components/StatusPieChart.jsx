import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#f59e0b", // Open
  "#22c55e", // Closed
];

export default function StatusPieChart({ stats }) {
  const data = [
    {
      name: "Open",
      value: stats.open_incidents ?? 0,
    },
    {
      name: "Closed",
      value: stats.closed_incidents ?? 0,
    },
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          Incident Status
        </h2>

        <p className="text-sm text-slate-400">
          Open vs Closed incidents
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={4}
            animationDuration={800}
            label={({ percent }) =>
              percent > 0
                ? `${(percent * 100).toFixed(0)}%`
                : ""
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip
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

          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{
              color: "#cbd5e1",
              paddingTop: "10px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}