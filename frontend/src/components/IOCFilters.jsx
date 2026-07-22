export default function IOCFilters({
  search,
  setSearch,
  iocType,
  setIocType,
  status,
  setStatus,
}) {
  return (
    <div className="mb-6 grid grid-cols-3 gap-4">

      <input
        type="text"
        placeholder="Search IOC..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="rounded-lg bg-slate-800 p-3 text-white outline-none"
      />

      <select
        value={iocType}
        onChange={(e) => setIocType(e.target.value)}
        className="rounded-lg bg-slate-800 p-3 text-white"
      >
        <option value="">All Types</option>
        <option value="IP">IP</option>
        <option value="Domain">Domain</option>
        <option value="URL">URL</option>
        <option value="Hash">Hash</option>
        <option value="Email">Email</option>
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded-lg bg-slate-800 p-3 text-white"
      >
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

    </div>
  );
}