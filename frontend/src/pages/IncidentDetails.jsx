import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";

export default function IncidentDetails() {
  const { id } = useParams();
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIncident() {
      try {
        const response = await api.get(`/incidents/${id}`);
        setIncident(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchIncident();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center text-white text-xl">
          Loading...
        </div>
      </MainLayout>
    );
  }

  if (!incident) {
    return (
      <MainLayout>
        <div className="text-center text-red-500 text-xl">
          Incident not found.
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
  <div className="mx-auto max-w-5xl">

    <div className="mb-8 flex items-center justify-between">
      <h1 className="text-3xl font-bold text-white">
        Incident Details
      </h1>

      <Link
        to="/incidents"
        className="rounded-lg bg-slate-700 px-5 py-2 text-white hover:bg-slate-600"
      >
        ← Back
      </Link>
    </div>

    <div className="grid gap-6 md:grid-cols-2">

      <div className="rounded-xl bg-slate-900 p-6">
        <h2 className="mb-4 text-xl font-semibold text-cyan-400">
          General Information
        </h2>

        <div className="space-y-4 text-slate-300">

          <div>
            <span className="font-semibold text-white">Title:</span>
            <p>{incident.title}</p>
          </div>

          <div>
            <span className="font-semibold text-white">Description:</span>
            <p>{incident.description}</p>
          </div>

          <div>
            <span className="font-semibold text-white">Source:</span>
            <p>{incident.source}</p>
          </div>

        </div>
      </div>

      <div className="rounded-xl bg-slate-900 p-6">
        <h2 className="mb-4 text-xl font-semibold text-cyan-400">
          Incident Status
        </h2>

        <div className="space-y-4 text-slate-300">

          <div>
            <span className="font-semibold text-white">Severity:</span>
            <p>{incident.severity}</p>
          </div>

          <div>
            <span className="font-semibold text-white">Priority:</span>
            <p>{incident.priority}</p>
          </div>

          <div>
            <span className="font-semibold text-white">Status:</span>
            <p>{incident.status}</p>
          </div>

          <div>
            <span className="font-semibold text-white">Assigned To:</span>
            <p>{incident.assigned_to || "Unassigned"}</p>
          </div>

          <div>
            <span className="font-semibold text-white">Due Date:</span>
            <p>
              {incident.due_date
                ? new Date(incident.due_date).toLocaleString()
                : "Not set"}
            </p>
          </div>

          <div>
            <span className="font-semibold text-white">Created At:</span>
            <p>
              {new Date(incident.created_at).toLocaleString()}
            </p>
          </div>

        </div>
      </div>

    </div>

    <div className="mt-6 rounded-xl bg-slate-900 p-6">
      <h2 className="mb-4 text-xl font-semibold text-cyan-400">
        Resolution
      </h2>

      <p className="text-slate-300">
        {incident.resolution || "No resolution available."}
      </p>
    </div>

  </div>
 </MainLayout>
  );
}