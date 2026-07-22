import { useEffect, useState, useCallback } from "react";
import { RefreshCw } from "lucide-react";
import api from "../services/api";

export default function DashboardRecentIncidents() {
  const [incidents, setIncidents] = useState([]);

  const fetchRecentIncidents = useCallback(async () => {
    try {
      const response = await api.get("/dashboard/recent-incidents");
      setIncidents(response.data);
    } catch (error) {
      console.error("Failed to load recent incidents:", error);
    }
  }, []);

  useEffect(() => {
    fetchRecentIncidents();

    const interval = setInterval(fetchRecentIncidents, 10000);

    return () => clearInterval(interval);
  }, [fetchRecentIncidents]);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-lg">

      <div className="mb-5 flex items-center justify-between">

        <div>
          <h2 className="text-lg font-semibold text-white">
            Recent Incidents
          </h2>

          <p className="text-sm text-slate-400">
            Latest security events detected
          </p>
        </div>

        <button
          onClick={fetchRecentIncidents}
          className="rounded-lg border border-slate-700 p-2 text-slate-400 transition hover:border-cyan-500 hover:text-cyan-400"
        >
          <RefreshCw size={18} />
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wider text-slate-400">
              <th className="pb-4">Title</th>
              <th className="pb-4">Severity</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Source</th>
            </tr>
          </thead>

          <tbody>

            {incidents.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-12 text-center text-slate-500"
                >
                  No recent incidents found.
                </td>
              </tr>
            ) : (
              incidents.map((incident) => (
                <tr
                  key={incident.id}
                  className="border-b border-slate-800 transition duration-200 hover:bg-slate-800/40"
                >
                  <td className="py-4 font-medium text-white">
                    {incident.title}
                  </td>

                  <td className="py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        incident.severity === "Critical"
                          ? "bg-red-500/20 text-red-400"
                          : incident.severity === "High"
                          ? "bg-orange-500/20 text-orange-400"
                          : incident.severity === "Medium"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {incident.severity}
                    </span>
                  </td>

                  <td className="py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        incident.status === "Open"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-emerald-500/20 text-emerald-400"
                      }`}
                    >
                      {incident.status}
                    </span>
                  </td>

                  <td className="py-4">
                    <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-400">
                      {incident.source}
                    </span>
                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}