import { useEffect, useState } from "react";
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

import api from "../../services/api";

export default function TopSourcesChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchSources();
  }, []);

  async function fetchSources() {
    try {
      const response = await api.get("/dashboard/top-sources");

      const colors = [
        "#06b6d4",
        "#3b82f6",
        "#8b5cf6",
        "#22c55e",
        "#f59e0b",
      ];

      const formatted = response.data.map((item, index) => ({
        name: item.source,
        value: item.count,
        color: colors[index % colors.length],
      }));

      setData(formatted);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          Top Attack Sources
        </h2>

        <p className="text-sm text-slate-400">
          Incidents grouped by source
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barCategoryGap="25%">
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