import { useEffect, useState } from "react";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";
import UsersTable from "../components/UsersTable";
import UserFilters from "../components/UserFilters";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to load users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (username) => {
    if (!window.confirm(`Delete ${username}?`)) return;

    try {
      await api.delete(`/users/${username}`);
      fetchUsers();
    } catch (error) {
      alert(
        error.response?.data?.detail ||
        "Failed to delete user."
      );
    }
  };

  const handleRoleChange = async (username, role) => {
    try {
      await api.put(
        `/users/role/${username}?role=${role}`
      );

      fetchUsers();
    } catch (error) {
      alert(
        error.response?.data?.detail ||
        "Failed to update role."
      );
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.username
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesRole =
      role === "" || user.role === role;

    return matchesSearch && matchesRole;
  });

  return (
    <MainLayout>

      {loading ? (
        <div className="p-6 text-white">
          Loading users...
        </div>
      ) : (
        <div className="p-6">

          <div className="mb-6 flex items-center justify-between">

            <h1 className="text-3xl font-bold text-white">
              Users Management
            </h1>

            <span className="rounded-lg bg-cyan-600 px-4 py-2 text-white">
              {filteredUsers.length} Users
            </span>

          </div>

          <UserFilters
            search={search}
            setSearch={setSearch}
            role={role}
            setRole={setRole}
          />

          <UsersTable
            users={filteredUsers}
            onDelete={handleDelete}
            onRoleChange={handleRoleChange}
          />

        </div>
      )}

    </MainLayout>
  );
}