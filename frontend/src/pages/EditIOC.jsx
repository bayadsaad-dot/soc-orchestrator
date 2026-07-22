import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";
import MainLayout from "../layouts/MainLayout";

export default function EditIOC() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [iocType, setIocType] = useState("IP");
  const [value, setValue] = useState("");
  const [source, setSource] = useState("");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    fetchIOC();
  }, []);

  async function fetchIOC() {
    try {

      const response = await api.get(`/iocs/${id}`);

      setIocType(response.data.ioc_type);
      setValue(response.data.value);
      setSource(response.data.source);
      setStatus(response.data.status);

    } catch (error) {

      console.error(error);

      alert("Failed to load IOC.");

    }
  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await api.put(`/iocs/${id}`, {
        ioc_type: iocType,
        value,
        source,
        status,
      });

      alert("IOC updated successfully.");

      navigate("/iocs");

    } catch (error) {

      console.error(error);

      alert("Failed to update IOC.");

    }
  }

  return (

    <MainLayout>

      <div className="mx-auto max-w-2xl rounded-xl bg-slate-900 p-8">

        <h1 className="mb-6 text-3xl font-bold text-white">
          Edit IOC
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <select
            value={iocType}
            onChange={(e) => setIocType(e.target.value)}
            className="w-full rounded-lg bg-slate-800 p-3 text-white"
          >
            <option value="IP">IP</option>
            <option value="Domain">Domain</option>
            <option value="URL">URL</option>
            <option value="Hash">Hash</option>
            <option value="Email">Email</option>
          </select>

          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded-lg bg-slate-800 p-3 text-white outline-none"
            required
          />

          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full rounded-lg bg-slate-800 p-3 text-white outline-none"
            required
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg bg-slate-800 p-3 text-white"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button
            type="submit"
            className="w-full rounded-lg bg-cyan-500 p-3 text-white transition hover:bg-cyan-600"
          >
            Update IOC
          </button>

        </form>

      </div>

    </MainLayout>

  );
}