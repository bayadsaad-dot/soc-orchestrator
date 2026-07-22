import { Link } from "react-router-dom";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  UserIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";

export default function IncidentRow({
  incident,
  deleteIncident,
}) {
  const dueDate = incident.due_date
    ? new Date(incident.due_date)
    : null;

  const isOverdue =
    dueDate &&
    dueDate < new Date() &&
    incident.status !== "Closed";

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const severityBadge = {
    Critical: "bg-red-600 text-white",
    High: "bg-orange-500 text-white",
    Medium: "bg-yellow-400 text-black",
    Low: "bg-green-600 text-white",
  };

  const priorityBadge = {
    Critical: "bg-red-700 text-white",
    High: "bg-orange-600 text-white",
    Medium: "bg-yellow-500 text-black",
    Low: "bg-cyan-600 text-white",
  };

  const statusBadge = {
    Open: "bg-red-500 text-white",
    Investigating: "bg-amber-500 text-black",
    Closed: "bg-green-600 text-white",
  };

  return (
    <tr className="border-b border-slate-800 transition hover:bg-slate-800/40">

      {/* Title */}
      <td className="px-4 py-5 max-w-md break-words font-medium text-white">
        {incident.title}
      </td>

      {/* Severity */}
      <td className="px-4 py-5">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            severityBadge[incident.severity]
          }`}
        >
          {incident.severity}
        </span>
      </td>

      {/* Priority */}
      <td className="px-4 py-5">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            priorityBadge[incident.priority]
          }`}
        >
          {incident.priority}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-5">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusBadge[incident.status]
          }`}
        >
          {incident.status}
        </span>
      </td>

      {/* Assigned */}
      <td className="px-4 py-5">
        {incident.assigned_to ? (
          <div className="flex items-center gap-2 text-slate-200">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-600">
              <UserIcon className="h-4 w-4 text-white" />
            </div>

            <span>{incident.assigned_to}</span>
          </div>
        ) : (
          <span className="text-slate-500">—</span>
        )}
      </td>

      {/* Due Date */}
      <td className="px-4 py-5">
        {dueDate ? (
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-slate-300">
              <CalendarDaysIcon className="h-4 w-4 text-cyan-400" />
              <span>{formatDate(dueDate)}</span>
            </div>

            {isOverdue && (
              <span className="mt-1 text-xs font-semibold text-red-500">
                ● Overdue
              </span>
            )}
          </div>
        ) : (
          <span className="text-slate-500">—</span>
        )}
      </td>

      {/* Source */}
      <td className="px-4 py-5">
        <span className="rounded-md bg-slate-700 px-3 py-1 text-xs text-slate-200">
          {incident.source}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-5">
        <div className="flex items-center justify-center gap-2">

          <Link
            to={`/incidents/${incident.id}`}
            className="rounded-lg bg-cyan-600 p-2 transition hover:bg-cyan-700"
            title="View Details"
          >
            <EyeIcon className="h-5 w-5 text-white" />
          </Link>

          <Link
            to={`/incidents/edit/${incident.id}`}
            className="rounded-lg bg-blue-600 p-2 transition hover:bg-blue-700"
            title="Edit"
          >
            <PencilSquareIcon className="h-5 w-5 text-white" />
          </Link>

          <button
            onClick={() => deleteIncident(incident.id)}
            className="rounded-lg bg-red-600 p-2 transition hover:bg-red-700"
            title="Delete"
          >
            <TrashIcon className="h-5 w-5 text-white" />
          </button>

        </div>
      </td>

    </tr>
  );
}