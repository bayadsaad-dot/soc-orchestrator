import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

import VirusTotalModal from "./VirusTotalModal";

import {
  Pencil,
  Trash2,
  ShieldCheck,
  Eye,
} from "lucide-react";

export default function IOCRow({
  ioc,
  deleteIOC,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vtResult, setVtResult] = useState(null);

  async function checkVirusTotal() {
    try {
      setLoading(true);
      setOpenModal(true);

      const response = await api.get(`/iocs/check/${ioc.id}`);

      setVtResult(response.data);

    } catch (error) {
      console.error(error);
      console.log(error.response);

      alert(
        error.response?.data?.detail ||
        error.response?.data?.error ||
        "VirusTotal lookup failed."
      );

      setVtResult(error.response?.data || null);

    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <tr className="border-b border-slate-800 transition hover:bg-slate-800/40">

        {/* IOC Type */}
        <td className="px-6 py-4">
          <span className="inline-flex rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-400">
            {ioc.ioc_type}
          </span>
        </td>

        {/* IOC Value */}
        <td className="px-6 py-4">
          <span className="break-all font-medium text-white">
            {ioc.value}
          </span>
        </td>

        {/* Source */}
        <td className="px-6 py-4 text-slate-300">
          {ioc.source}
        </td>

        {/* Status */}
        <td className="px-6 py-4">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
              ioc.status === "Active"
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {ioc.status}
          </span>
        </td>

        {/* Actions */}
        <td className="px-6 py-4">
          <div className="flex items-center justify-center gap-2">

            {/* View */}
            <Link
              to={`/iocs/${ioc.id}`}
              title="View IOC"
              className="rounded-lg bg-slate-700 p-2 text-white transition hover:bg-slate-600"
            >
              <Eye size={16} />
            </Link>

            {/* Edit */}
            <Link
              to={`/iocs/edit/${ioc.id}`}
              title="Edit IOC"
              className="rounded-lg bg-blue-600 p-2 text-white transition hover:bg-blue-700"
            >
              <Pencil size={16} />
            </Link>

            {/* VirusTotal */}
            <button
              onClick={checkVirusTotal}
              title="Check VirusTotal"
              className="rounded-lg bg-purple-600 p-2 text-white transition hover:bg-purple-700"
            >
              <ShieldCheck size={16} />
            </button>

            {/* Delete */}
            <button
              onClick={() => deleteIOC(ioc.id)}
              title="Delete IOC"
              className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
            >
              <Trash2 size={16} />
            </button>

          </div>
        </td>

      </tr>

      <VirusTotalModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        loading={loading}
        result={vtResult}
      />
    </>
  );
}