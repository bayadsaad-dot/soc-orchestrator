import IncidentRow from "./IncidentRow";

export default function IncidentsTable({
  incidents,
  deleteIncident,
}) {
  return (
    <div className="overflow-x-auto rounded-xl bg-slate-900 p-6">
      <table className="w-full table-auto border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-sm font-semibold text-slate-400">

            <th className="px-4 py-3 w-[28%]">
              Title
            </th>

            <th className="px-4 py-3 whitespace-nowrap">
              Severity
            </th>

            <th className="px-4 py-3 whitespace-nowrap">
              Priority
            </th>

            <th className="px-4 py-3 whitespace-nowrap">
              Status
            </th>

            <th className="px-4 py-3 whitespace-nowrap">
              Assigned To
            </th>

            <th className="px-4 py-3 whitespace-nowrap">
              Due Date
            </th>

            <th className="px-4 py-3 whitespace-nowrap">
              Source
            </th>

            <th className="px-4 py-3 text-center whitespace-nowrap">
              Actions
            </th>

          </tr>
        </thead>

        <tbody>
          {incidents.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="py-10 text-center text-slate-400"
              >
                No incidents found.
              </td>
            </tr>
          ) : (
            incidents.map((incident) => (
              <IncidentRow
                key={incident.id}
                incident={incident}
                deleteIncident={deleteIncident}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}