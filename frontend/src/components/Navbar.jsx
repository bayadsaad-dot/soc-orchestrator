import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Bell,
  Search,
  LogOut,
  CalendarDays,
} from "lucide-react";

import api from "../services/api";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({
    username: "",
    role: "",
  });

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  async function fetchUser() {
    try {
      const response = await api.get("/users/me");
      setUser(response.data);
    } catch (error) {
      console.error(error);
      logout();
    }
  }

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await api.get("/dashboard/activity-feed");
      setNotifications(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchUser();
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 10000);

    return () => clearInterval(interval);
  }, [fetchNotifications]);

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const titles = {
    "/dashboard": "Dashboard",
    "/incidents": "Incidents",
    "/iocs": "IOCs",
    "/users": "Users",
    "/audit": "Audit Logs",
    "/reports": "Reports",
    "/settings": "Settings",
  };

  const pageTitle = titles[location.pathname] || "SOC Orchestrator";

  function severityColor(severity) {
    switch (severity) {
      case "Critical":
        return "bg-red-600 text-white";
      case "High":
        return "bg-orange-500 text-white";
      case "Medium":
        return "bg-yellow-500 text-black";
      default:
        return "bg-green-600 text-white";
    }
  }

  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-8 py-5">

      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          {pageTitle}
        </h1>

        <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">
          <CalendarDays size={15} />

          {new Date().toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="hidden lg:flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2">

          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            className="w-56 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />

        </div>

        {/* Notifications */}
        <div className="relative">

          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-xl border border-slate-800 bg-slate-900 p-3 transition hover:border-cyan-500 hover:text-cyan-400"
          >
            <Bell size={19} />

            {notifications.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                {notifications.length}
              </span>
            )}

          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-96 rounded-xl border border-slate-700 bg-slate-900 shadow-2xl z-50">

              <div className="border-b border-slate-700 p-4">
                <h3 className="font-semibold text-white">
                  Notifications
                </h3>
              </div>

              <div className="max-h-96 overflow-y-auto">

                {notifications.length === 0 ? (

                  <p className="p-6 text-center text-slate-400">
                    No notifications.
                  </p>

                ) : (

                  notifications.map((item, index) => (

                    <div
                      key={index}
                      className="border-b border-slate-800 p-4 hover:bg-slate-800 transition"
                    >

                      <div className="flex justify-between items-center">

                        <span className="font-semibold text-white">
                          {item.title}
                        </span>

                        <span
                          className={`rounded px-2 py-1 text-xs ${severityColor(
                            item.severity
                          )}`}
                        >
                          {item.severity}
                        </span>

                      </div>

                      <div className="mt-2 flex gap-3 text-sm">

                        <span className="text-slate-400">
                          {item.status}
                        </span>

                        <span className="text-cyan-400">
                          {item.source}
                        </span>

                      </div>

                      <p className="mt-2 text-xs text-slate-500">
                        {new Date(item.created_at).toLocaleString()}
                      </p>

                    </div>

                  ))

                )}

              </div>

              <div className="border-t border-slate-700 p-3 text-center">

                <button
                  onClick={() => setNotifications([])}
                  className="text-sm text-cyan-400 hover:text-cyan-300"
                >
                  Mark all as read
                </button>

              </div>

            </div>
          )}

        </div>

        {/* User */}
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500 font-bold text-white">
            {user.username
              ? user.username.charAt(0).toUpperCase()
              : "?"}
          </div>

          <div className="hidden md:block">

            <p className="font-semibold text-white">
              {user.username}
            </p>

            <p className="text-sm capitalize text-slate-400">
              {user.role}
            </p>

          </div>

        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
        >
          <LogOut size={17} />
          Logout
        </button>

      </div>

    </header>
  );
}