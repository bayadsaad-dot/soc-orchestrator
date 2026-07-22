import { useEffect, useState } from "react";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    console.log("===== AUDIT LOGS =====");
    console.log("Token:", localStorage.getItem("token"));

    try {
      const response = await api.get("/audit/");

      console.log("Status:", response.status);
      console.log("Data:", response.data);

      setLogs(response.data);
    } catch (error) {
      console.error("Audit Logs Error:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  console.log("Current Logs:", logs);

  return (
    <MainLayout>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">
            Audit Logs
          </h1>

          <button
            onClick={fetchLogs}
            className="rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700"
          >
            Refresh
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow">
          <table className="min-w-full">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-3 text-left text-white">User</th>
                <th className="p-3 text-left text-white">Action</th>
                <th className="p-3 text-left text-white">Resource</th>
                <th className="p-3 text-left text-white">Details</th>
                <th className="p-3 text-left text-white">Timestamp</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="p-6 text-center text-slate-400"
                  >
                    Loading...
                  </td>
                </tr>
              ) : logs.length > 0 ? (
                logs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-t border-slate-700 hover:bg-slate-800"
                  >
                    <td className="p-3 text-white">{log.username}</td>
                    <td className="p-3 text-cyan-400">{log.action}</td>
                    <td className="p-3 text-white">{log.resource}</td>
                    <td className="p-3 text-slate-300">{log.details}</td>
                    <td className="p-3 text-slate-400">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-6 text-center text-slate-400"
                  >
                    No audit logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}