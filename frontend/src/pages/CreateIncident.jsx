import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";

export default function CreateIncident() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [severity, setSeverity] = useState("Critical");
  const [priority, setPriority] = useState("Medium");

  const [status, setStatus] = useState("Open");
  const [source, setSource] = useState("Wazuh");

  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");

  async function createIncident() {
    try {
      await api.post(
        "/incidents/",
        {
          title,
          description,
          severity,
          priority,
          status,
          source,
          assigned_to: assignedTo || null,
          due_date: dueDate || null,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Incident created successfully!");

      navigate("/incidents");

    } catch (error) {
      console.error(error);
      alert("Failed to create incident");
    }
  }

  return (
    <MainLayout>
      <div className="p-8">

        <h1 className="mb-8 text-3xl font-bold text-white">
          Create Incident
        </h1>

        <div className="space-y-5 rounded-xl bg-slate-900 p-6">

          <input
            type="text"
            placeholder="Incident Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg bg-slate-800 p-3 text-white"
          />

          <textarea
            rows={5}
            placeholder="Incident Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg bg-slate-800 p-3 text-white"
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
                className="w-full rounded-lg bg-slate-800 p-3 text-white"
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
                className="w-full rounded-lg bg-slate-800 p-3 text-white"
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
                className="w-full rounded-lg bg-slate-800 p-3 text-white"
              />
            </div>

          </div>

          <button
            onClick={createIncident}
            className="rounded-lg bg-cyan-500 px-6 py-3 text-white transition hover:bg-cyan-600"
          >
            Create Incident
          </button>

        </div>

      </div>
    </MainLayout>
  );
}