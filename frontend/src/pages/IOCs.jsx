import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";

import MainLayout from "../layouts/MainLayout";

import IOCFilters from "../components/IOCFilters";
import IOCsTable from "../components/IOCsTable";

export default function IOCs() {

  const [iocs, setIocs] = useState([]);

  const [search, setSearch] = useState("");
  const [iocType, setIocType] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchIOCs();
  }, [search, iocType, status]);

  async function fetchIOCs() {
    try {

      const response = await api.get("/iocs/", {
        params: {
          search,
          ioc_type: iocType,
          status,
          page: 1,
          limit: 20,
        },
      });

      setIocs(response.data);

    } catch (error) {
      console.error(error);
    }
  }

  async function deleteIOC(id) {

    const confirmed = window.confirm(
      "Are you sure you want to delete this IOC?"
    );

    if (!confirmed) return;

    try {

      await api.delete(`/iocs/${id}`);

      alert("IOC deleted successfully.");

      fetchIOCs();

    } catch (error) {

      console.error(error);

      alert("Failed to delete IOC.");

    }
  }

  return (

    <MainLayout>

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-3xl font-bold text-white">
          Indicators of Compromise
        </h1>

        <Link
          to="/iocs/create"
          className="rounded-lg bg-cyan-500 px-5 py-3 text-white transition hover:bg-cyan-600"
        >
          + Create IOC
        </Link>

      </div>

      <IOCFilters
        search={search}
        setSearch={setSearch}
        iocType={iocType}
        setIocType={setIocType}
        status={status}
        setStatus={setStatus}
      />

      <IOCsTable
        iocs={iocs}
        deleteIOC={deleteIOC}
      />

    </MainLayout>

  );
}