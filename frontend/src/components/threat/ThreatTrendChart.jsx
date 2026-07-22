import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import api from "../../services/api";

export default function ThreatTrendChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadTrend();
  }, []);

  async function loadTrend() {
    try {
      const res = await api.get("/dashboard/trends");
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          Threat Trends
        </h2>

        <p className="text-sm text-slate-400">
          Incidents during the last 7 days
        </p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid
            stroke="#1e293b"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="date"
            tick={{ fill: "#94a3b8" }}
          />

          <YAxis
            allowDecimals={false}
            tick={{ fill: "#94a3b8" }}
          />

          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #334155",
              borderRadius: 10,
            }}
          />

          <Line
            type="monotone"
            dataKey="count"
            stroke="#06b6d4"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}