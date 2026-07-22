import { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function MitreAttackChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/dashboard/mitre-summary")
      .then((res) => setData(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-gray-900 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        MITRE ATT&CK Summary
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 80,
          }}
        >
          <CartesianGrid
            stroke="#374151"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="tactic"
            angle={-30}
            textAnchor="end"
            interval={0}
            height={90}
            tick={{ fill: "#CBD5E1", fontSize: 12 }}
          />

          <YAxis
            tick={{ fill: "#CBD5E1" }}
          />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#06B6D4"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}