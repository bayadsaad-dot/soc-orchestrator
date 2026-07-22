import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";
import MainLayout from "../layouts/MainLayout";

export default function EditIncident() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [severity, setSeverity] = useState("Critical");
  const [priority, setPriority] = useState("Medium");

  const [status, setStatus] = useState("Open");
  const [source, setSource] = useState("");

  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [resolution, setResolution] = useState("");

  useEffect(() => {
    fetchIncident();
  }, []);

  async function fetchIncident() {
    try {
      const response = await api.get(`/incidents/${id}`);

      setTitle(response.data.title);
      setDescription(response.data.description);

      setSeverity(response.data.severity);
      setPriority(response.data.priority || "Medium");

      setStatus(response.data.status);
      setSource(response.data.source);

      setAssignedTo(response.data.assigned_to || "");

      setDueDate(
        response.data.due_date
          ? response.data.due_date.slice(0, 16)
          : ""
      );

      setResolution(response.data.resolution || "");
    } catch (error) {
      console.error(error);
      alert("Failed to load incident.");
    }
  }

  async function updateIncident(e) {
    e.preventDefault();

    try {
      await api.put(`/incidents/${id}`, {
        title,
        description,
        severity,
        priority,
        status,
        source,
        assigned_to: assignedTo || null,
        due_date: dueDate || null,
        resolution: resolution || null,
      });

      alert("Incident updated successfully.");

      navigate("/incidents");
    } catch (error) {
      console.error(error);
      alert("Failed to update incident.");
    }
  }

  return (
    <MainLayout>
      <div className="p-8">
        <h1 className="mb-8 text-3xl font-bold text-white">
          Edit Incident
        </h1>

        <form
          onSubmit={updateIncident}
          className="space-y-5 rounded-xl bg-slate-900 p-6"
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg bg-slate-800 p-3 text-white outline-none"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full rounded-lg bg-slate-800 p-3 text-white outline-none"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Severity
              </label>

              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full rounded-lg bg-slate-800 p-3 text-white"
              >
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Priority
              </label>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-lg bg-slate-800 p-3 text-white"
              >
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-lg bg-slate-800 p-3 text-white"
              >
                <option>Open</option>
                <option>Investigating</option>
                <option>Closed</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Source
              </label>

              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full rounded-lg bg-slate-800 p-3 text-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Assigned Analyst
              </label>

              <input
                type="text"
                placeholder="john.smith"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full rounded-lg bg-slate-800 p-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Due Date
              </label>

              <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-lg bg-slate-800 p-3 text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-400">
              Resolution Notes
            </label>

            <textarea
              rows={4}
              placeholder="Describe how the incident was resolved..."
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              className="w-full rounded-lg bg-slate-800 p-3 text-white outline-none"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white hover:bg-cyan-600"
            >
              Update Incident
            </button>

            <button
              type="button"
              onClick={() => navigate("/incidents")}
              className="rounded-lg bg-slate-700 px-6 py-3 font-semibold text-white hover:bg-slate-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}