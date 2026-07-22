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

export default function IOCTypeChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchIOCTypes();
  }, []);

  async function fetchIOCTypes() {
    try {
      const response = await api.get("/dashboard/ioc-types");

      const colors = {
        Domain: "#3b82f6",
        IP: "#06b6d4",
        URL: "#8b5cf6",
        Hash: "#22c55e",
      };

      const formatted = response.data.map((item) => ({
        name: item.type,
        value: item.count,
        color: colors[item.type] || "#94a3b8",
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
          IOC Types
        </h2>

        <p className="text-sm text-slate-400">
          Distribution of Indicators of Compromise
        </p>
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