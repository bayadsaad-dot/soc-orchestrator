import IOCRow from "./IOCRow";

export default function IOCsTable({
  iocs,
  deleteIOC,
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-lg">

      <div className="border-b border-slate-800 px-6 py-4">
        <h2 className="text-lg font-semibold text-white">
          IOC Inventory
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Monitor and manage Indicators of Compromise.
        </p>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-950">

            <tr className="text-left text-xs uppercase tracking-wider text-slate-400">

              <th className="px-6 py-4">
                Type
              </th>

              <th className="px-6 py-4">
                Value
              </th>

              <th className="px-6 py-4">
                Source
              </th>

              <th className="px-6 py-4">
                Status
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {iocs.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="py-14 text-center text-slate-500"
                >
                  No IOCs found.
                </td>

              </tr>

            ) : (

              iocs.map((ioc) => (
                <IOCRow
                  key={ioc.id}
                  ioc={ioc}
                  deleteIOC={deleteIOC}
                />
              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}