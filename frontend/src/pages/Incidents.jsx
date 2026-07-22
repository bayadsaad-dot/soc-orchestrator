import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import api from "../services/api";

import MainLayout from "../layouts/MainLayout";

import IncidentFilters from "../components/IncidentFilters";
import IncidentsTable from "../components/IncidentsTable";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);

  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");

  const fetchIncidents = useCallback(async () => {
    try {
      const response = await api.get("/incidents/", {
        params: {
          search,
          severity,
          status,
          source,
          page: 1,
          limit: 20,
        },
      });

      setIncidents(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [search, severity, status, source]);

  useEffect(() => {
    fetchIncidents();

    const interval = setInterval(() => {
      fetchIncidents();
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, [fetchIncidents]);

  async function deleteIncident(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this incident?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/incidents/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Incident deleted successfully.");

      fetchIncidents();
    } catch (error) {
      console.error(error);

      alert("Failed to delete incident.");
    }
  }

  async function exportPDF() {
    try {
      const response = await axios.get(
        "http://localhost:8000/reports/incidents/pdf",
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;
      link.setAttribute(
        "download",
        "SOC_Incident_Report.pdf"
      );

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(error);
      alert("Failed to export PDF.");
    }
  }

  return (
    <MainLayout>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">
          Incidents
        </h1>

        <div className="flex gap-3">
          <button
            onClick={exportPDF}
            className="rounded-lg bg-emerald-600 px-5 py-3 text-white transition hover:bg-emerald-700"
          >
            📄 Export PDF
          </button>

          <Link
            to="/incidents/create"
            className="rounded-lg bg-cyan-500 px-5 py-3 text-white transition hover:bg-cyan-600"
          >
            + Create Incident
          </Link>
        </div>
      </div>

      <IncidentFilters
        search={search}
        setSearch={setSearch}
        severity={severity}
        setSeverity={setSeverity}
        status={status}
        setStatus={setStatus}
        source={source}
        setSource={setSource}
      />

      <IncidentsTable
        incidents={incidents}
        deleteIncident={deleteIncident}
      />
    </MainLayout>
  );
}