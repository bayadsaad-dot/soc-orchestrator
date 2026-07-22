import { useEffect, useState, useCallback } from "react";
import api from "../../services/api";

export default function ThreatFeed() {
  const [feed, setFeed] = useState([]);

  const fetchFeed = useCallback(async () => {
    try {
      const res = await api.get("/dashboard/activity-feed");
      setFeed(res.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchFeed();

    const interval = setInterval(fetchFeed, 10000);

    return () => clearInterval(interval);
  }, [fetchFeed]);

  const badgeColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "bg-red-600";
      case "High":
        return "bg-orange-500";
      case "Medium":
        return "bg-yellow-500";
      default:
        return "bg-green-600";
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Threat Intelligence Feed
      </h2>

      <div className="space-y-4">
        {feed.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            No activity found.
          </p>
        ) : (
          feed.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-700 rounded-lg p-4 hover:bg-gray-800 transition-all duration-300"
            >
              <div className="flex justify-between items-center gap-4">
                <span className="text-white font-semibold">
                  {item.title.length > 80
                    ? item.title.substring(0, 80) + "..."
                    : item.title}
                </span>

                <span
                  className={`${badgeColor(
                    item.severity
                  )} text-white px-3 py-1 rounded-full text-xs font-semibold`}
                >
                  {item.severity}
                </span>
              </div>

              <div className="flex items-center gap-3 mt-3 flex-wrap">
                <span className="text-gray-400 text-sm">
                  Status: {item.status}
                </span>

                <span className="text-cyan-400 text-sm">
                  Source: {item.source}
                </span>
              </div>

              <p className="text-gray-500 text-xs mt-2">
                {new Date(item.created_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}