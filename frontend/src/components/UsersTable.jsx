export default function UsersTable({
  users,
  onDelete,
  onRoleChange,
}) {
  return (
    <div className="overflow-x-auto rounded-xl bg-slate-900 shadow-lg">

      <table className="min-w-full">

        <thead className="border-b border-slate-700 bg-slate-800">

          <tr>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Username
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Email
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
              Role
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {users.length === 0 ? (
            <tr>

              <td
                colSpan="4"
                className="py-8 text-center text-gray-400"
              >
                No users found.
              </td>

            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-slate-800 hover:bg-slate-800 transition"
              >

                <td className="px-6 py-4 text-white">
                  {user.username}
                </td>

                <td className="px-6 py-4 text-gray-300">
                  {user.email}
                </td>

                <td className="px-6 py-4">

                  <select
                    value={user.role}
                    onChange={(e) =>
                      onRoleChange(
                        user.username,
                        e.target.value
                      )
                    }
                    className="rounded-lg bg-slate-800 px-3 py-2 text-white outline-none"
                  >
                    <option value="Admin">
                      Admin
                    </option>

                    <option value="Analyst">
                      Analyst
                    </option>

                  </select>

                </td>

                <td className="px-6 py-4 text-center">

                  <button
                    onClick={() =>
                      onDelete(user.username)
                    }
                    className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}