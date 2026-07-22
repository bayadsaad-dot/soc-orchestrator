export default function IncidentFilters({
  search,
  setSearch,
  severity,
  setSeverity,
  status,
  setStatus,
  source,
  setSource,
}) {
  return (
    <div className="mb-6 grid grid-cols-4 gap-4">

      <input
        type="text"
        placeholder="Search incident..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="rounded-lg bg-slate-800 p-3 text-white outline-none"
      />

      <select
        value={severity}
        onChange={(e) => setSeverity(e.target.value)}
        className="rounded-lg bg-slate-800 p-3 text-white"
      >
        <option value="">All Severity</option>
        <option value="Critical">Critical</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded-lg bg-slate-800 p-3 text-white"
      >
        <option value="">All Status</option>
        <option value="Open">Open</option>
        <option value="Investigating">
          Investigating
        </option>
        <option value="Closed">Closed</option>
      </select>

      <input
        type="text"
        placeholder="Source..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
        className="rounded-lg bg-slate-800 p-3 text-white outline-none"
      />

    </div>
  );
}