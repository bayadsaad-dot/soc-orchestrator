export default function UserFilters({
  search,
  setSearch,
  role,
  setRole,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-xl bg-slate-900 p-6 shadow-lg md:flex-row md:items-center md:justify-between">

      <input
        type="text"
        placeholder="Search by username..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none md:w-80"
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
      >
        <option value="">All Roles</option>
        <option value="Admin">Admin</option>
        <option value="Analyst">Analyst</option>
      </select>

      <button
        onClick={() => {
          setSearch("");
          setRole("");
        }}
        className="rounded-lg bg-cyan-600 px-5 py-2 text-white transition hover:bg-cyan-700"
      >
        Reset
      </button>

    </div>
  );
}