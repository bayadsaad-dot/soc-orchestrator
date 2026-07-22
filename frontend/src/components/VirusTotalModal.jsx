import { X, ShieldCheck, Loader2 } from "lucide-react";

export default function VirusTotalModal({
  open,
  onClose,
  loading,
  result,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-xl rounded-xl border border-slate-800 bg-slate-900 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-purple-400" size={22} />
            <h2 className="text-lg font-semibold text-white">
              VirusTotal Analysis
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">

          {loading ? (
            <div className="flex flex-col items-center justify-center py-10">

              <Loader2
                size={36}
                className="animate-spin text-cyan-400"
              />

              <p className="mt-4 text-slate-400">
                Checking VirusTotal...
              </p>

            </div>

          ) : result?.error ? (

            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300">
              {result.error}
            </div>

          ) : result?.message ? (

            <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4 text-yellow-300">
              {result.message}
            </div>

          ) : result ? (

            <div className="space-y-5">

              <Info label="IOC" value={result.ioc} />
              <Info label="Type" value={result.type} />

              <div className="grid grid-cols-2 gap-4">

                <Stat
                  title="Malicious"
                  value={result.malicious}
                  color="text-red-400"
                />

                <Stat
                  title="Suspicious"
                  value={result.suspicious}
                  color="text-yellow-400"
                />

                <Stat
                  title="Harmless"
                  value={result.harmless}
                  color="text-green-400"
                />

                <Stat
                  title="Undetected"
                  value={result.undetected}
                  color="text-slate-300"
                />

              </div>

              <Info
                label="Reputation"
                value={result.reputation}
              />

            </div>

          ) : (

            <div className="py-10 text-center text-slate-500">
              No VirusTotal data available.
            </div>

          )}

        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-800 px-6 py-4">

          <button
            onClick={onClose}
            className="rounded-lg bg-cyan-600 px-5 py-2 text-white transition hover:bg-cyan-700"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium text-white">
        {value ?? "-"}
      </span>
    </div>
  );
}

function Stat({ title, value, color }) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 p-4 text-center">
      <p className="text-sm text-slate-400">
        {title}
      </p>

      <p className={`mt-2 text-3xl font-bold ${color}`}>
        {value ?? 0}
      </p>
    </div>
  );
}