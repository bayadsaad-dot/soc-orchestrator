import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import MainLayout from "../layouts/MainLayout";

export default function CreateIOC() {

  const navigate = useNavigate();

  const [iocType, setIocType] = useState("IP");
  const [value, setValue] = useState("");
  const [source, setSource] = useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await api.post("/iocs/", {
        ioc_type: iocType,
        value,
        source,
      });

      alert("IOC created successfully.");

      navigate("/iocs");

    } catch (error) {

      console.error(error);

      alert("Failed to create IOC.");

    }
  }

  return (

    <MainLayout>

      <div className="mx-auto max-w-2xl rounded-xl bg-slate-900 p-8">

        <h1 className="mb-6 text-3xl font-bold text-white">
          Create IOC
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
            placeholder="IOC Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded-lg bg-slate-800 p-3 text-white outline-none"
            required
          />

          <input
            type="text"
            placeholder="Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full rounded-lg bg-slate-800 p-3 text-white outline-none"
            required
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-cyan-500 p-3 text-white transition hover:bg-cyan-600"
          >
            Create IOC
          </button>

        </form>

      </div>

    </MainLayout>

  );
}