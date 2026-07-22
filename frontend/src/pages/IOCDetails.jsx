import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

import {
  ArrowLeft,
  ShieldCheck,
  Pencil,
  RefreshCw,
} from "lucide-react";

export default function IOCDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [ioc, setIoc] = useState(null);
  const [vt, setVt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    fetchIOC();
  }, []);

  async function fetchIOC() {
    try {

      const response = await api.get(`/iocs/${id}`);

      setIoc(response.data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function refreshVirusTotal() {

    try {

      setChecking(true);

      const response = await api.get(`/iocs/check/${id}`);

      setVt(response.data);

    } catch (err) {

      console.error(err);

    } finally {

      setChecking(false);

    }

  }

  if (loading) {
    return (
      <MainLayout>
        <div className="text-white text-xl">
          Loading...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold text-white">
            IOC Details
          </h1>

          <p className="text-slate-400 mt-2">
            Indicator of Compromise information
          </p>

        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-white hover:bg-slate-700"
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </div>

      {/* IOC Information */}

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

        <h2 className="mb-6 text-xl font-semibold text-white">
          IOC Information
        </h2>

        <div className="grid grid-cols-2 gap-6">

          <Info
            label="Value"
            value={ioc.value}
          />

          <Info
            label="Type"
            value={ioc.ioc_type}
          />

          <Info
            label="Status"
            value={ioc.status}
          />

          <Info
            label="Source"
            value={ioc.source}
          />

        </div>

      </div>

      {/* VirusTotal */}

      <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">

        <div className="mb-6 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <ShieldCheck className="text-purple-400" />

            <h2 className="text-xl font-semibold text-white">
              VirusTotal Analysis
            </h2>

          </div>

          <button
            onClick={refreshVirusTotal}
            disabled={checking}
            className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700"
          >
            <RefreshCw
              size={16}
              className={checking ? "animate-spin" : ""}
            />

            Refresh
          </button>

        </div>

        {!vt ? (

          <div className="text-center text-slate-400 py-12">

            Click Refresh to check VirusTotal.

          </div>

        ) : vt.error ? (

          <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-4 text-red-300">
            {vt.error}
          </div>

        ) : vt.message ? (

          <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/30 p-4 text-yellow-300">
            {vt.message}
          </div>

        ) : (

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

            <Card
              title="Malicious"
              value={vt.malicious}
              color="text-red-400"
            />

            <Card
              title="Suspicious"
              value={vt.suspicious}
              color="text-yellow-400"
            />

            <Card
              title="Harmless"
              value={vt.harmless}
              color="text-green-400"
            />

            <Card
              title="Undetected"
              value={vt.undetected}
              color="text-slate-300"
            />

          </div>

        )}

      </div>

      <div className="mt-8 flex gap-4">

        <Link
          to={`/iocs/edit/${ioc.id}`}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          <Pencil size={18} />
          Edit IOC
        </Link>

      </div>

    </MainLayout>
  );

}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className="rounded-xl bg-slate-800 p-6 text-center">
      <p className="text-slate-400">
        {title}
      </p>

      <p className={`mt-3 text-4xl font-bold ${color}`}>
        {value}
      </p>
    </div>
  );
}