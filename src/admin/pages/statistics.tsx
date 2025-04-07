import { useQuery } from "@tanstack/react-query";
import { fetchStatistics, Statistics, ApiStats } from "@/lib/api"; // Import types from lib/api
import StatCards from "@/components/statistics/StatCards";
import StatsTable from "@/components/statistics/StatsTable";
import { useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const StatisticsPage = () => {
  const [viewMode, setViewMode] = useState<"daily" | "weekly" | "monthly">("daily");

  const { data, isLoading, isError } = useQuery<Statistics>({
    queryKey: ["/api/admin/stats"],
    retry: 2,
    queryFn: fetchStatistics,
  });

  // Function to format large numbers
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  // Prepare chart data based on view mode
  const getRequestsValue = (api: ApiStats) => {
    switch (viewMode) {
      case "daily":
        return api.daily_requests;
      case "weekly":
        return api.weekly_requests;
      case "monthly":
        return api.monthly_requests;
      default:
        return api.daily_requests;
    }
  };

  const chartData = data?.apis.map((api) => ({
    name: api.name,
    requests: getRequestsValue(api),
  })) || [];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-white mb-8">Admin Statistics</h2>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00BFFF]"></div>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="bg-[#1B263B] rounded-lg shadow-lg p-6 text-center">
          <i className="fas fa-exclamation-circle text-red-500 text-4xl mb-4"></i>
          <h3 className="text-xl text-white mb-2">Error Loading Statistics</h3>
          <p className="text-[#D3D3D3]">
            There was a problem loading the statistics. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[#00B2FF] text-[#0D1525] rounded-md hover:bg-[#00D4FF] transition duration-200"
          >
            Retry
          </button>
        </div>
      )}

      {/* No Stats State */}
      {!isLoading && !isError && (!data || data.apis?.length === 0) && (
        <div className="text-center py-12 bg-[#1B263B] rounded-lg">
          <i className="fas fa-chart-bar text-5xl text-gray-600 mb-4"></i>
          <h3 className="text-xl text-white mb-2">No statistics available</h3>
          <p className="text-[#D3D3D3]">
            Statistics will appear here once your APIs start receiving traffic
          </p>
        </div>
      )}

      {/* Statistics Content */}
      {!isLoading && !isError && data && (
        <>
          <StatCards
            totalRequests={data.total_requests}
            uniqueUsers={data.unique_users}
            timestamp={data.timestamp}
          />

          {/* View Mode Controls */}
          <div className="flex space-x-2 items-center mb-6">
            <p className="text-gray-300 mr-2">View:</p>
            <button
              onClick={() => setViewMode("daily")}
              className={`px-4 py-2 rounded-md ${
                viewMode === "daily"
                  ? "bg-[#00B2FF] text-[#0D1525]"
                  : "bg-[#1B263B] text-gray-300"
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setViewMode("weekly")}
              className={`px-4 py-2 rounded-md ${
                viewMode === "weekly"
                  ? "bg-[#00B2FF] text-[#0D1525]"
                  : "bg-[#1B263B] text-gray-300"
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setViewMode("monthly")}
              className={`px-4 py-2 rounded-md ${
                viewMode === "monthly"
                  ? "bg-[#00B2FF] text-[#0D1525]"
                  : "bg-[#1B263B] text-gray-300"
              }`}
            >
              Monthly
            </button>
          </div>

          {/* Timestamp */}
          <p className="text-gray-400 text-sm mb-6">
            Last updated: {new Date(data.timestamp).toLocaleString()}
          </p>

          {/* Requests Chart */}
          <div className="bg-[#1B263B] rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              API Requests ({viewMode})
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#A0AEC0" }}
                    angle={-45}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis tick={{ fill: "#A0AEC0" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1B263B",
                      borderColor: "#2D3748",
                    }}
                    formatter={(value: any) => [formatNumber(value), "Requests"]}
                  />
                  <Legend wrapperStyle={{ color: "#A0AEC0" }} />
                  <Bar dataKey="requests" name="Requests" fill="#00B2FF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stats Table */}
          {data.apis && data.apis.length > 0 && <StatsTable apis={data.apis} />}
        </>
      )}
    </div>
  );
};

export default StatisticsPage;