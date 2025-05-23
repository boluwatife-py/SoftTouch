import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  Bar,
  BarChart,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Define types for our statistics
interface ApiStat {
  name: string;
  dailyRequests: number;
  weeklyRequests: number;
  monthlyRequests: number;
  averageResponseTime: number;
  successRate: number;
  popularity: number;
}

interface Statistics {
  totalRequests: number;
  uniqueUsers: number;
  timestamp: string;
  apis: ApiStat[];
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
];

export default function StatisticsPage() {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"daily" | "weekly" | "monthly">(
    "daily"
  );

  // Function to format large numbers
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  // Load statistics data from API when component mounts
  const statistcUrl: string = import.meta.env.VITE_API_URL + '/statistics'
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const response = await fetch(statistcUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setStatistics(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
        setErrorMessage(
          "Failed to load statistics data. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  // No loading state

  // Render error state
  if (errorMessage) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="bg-[#1A2332] rounded-lg shadow-lg p-8 max-w-md mx-auto text-center">
          <h2 className="text-2xl font-semibold text-[#00B2FF] mb-4">Error</h2>
          <p className="text-white mb-6">{errorMessage}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#00B2FF] text-[#0D1525] rounded-md hover:bg-[#00D4FF] transition duration-200"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  // Prepare the data based on view mode
  const getRequestsValue = (api: ApiStat) => {
    switch (viewMode) {
      case "daily":
        return api.dailyRequests;
      case "weekly":
        return api.weeklyRequests;
      case "monthly":
        return api.monthlyRequests;
      default:
        return api.dailyRequests;
    }
  };

  const chartData =
    statistics?.apis.map((api) => ({
      name: api.name,
      requests: getRequestsValue(api),
      responseTime: api.averageResponseTime,
      successRate: api.successRate,
    })) || [];

  const pieData =
    statistics?.apis.map((api) => ({
      name: api.name,
      value: api.popularity,
    })) || [];

  return (
    <section className="animate-fadeIn py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00B2FF]">
            API Usage Statistics
          </h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">Real-time data insights</p>
        </div>

        {/* Summary Cards */}
        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-12">
            <div className="bg-[#1A2332] rounded-lg shadow-lg p-3 sm:p-4 md:p-6 text-center">
              <p className="text-sm sm:text-base font-semibold mb-1">
                Total Requests
              </p>
              <p className="text-lg sm:text-xl md:text-2xl text-[#00B2FF] font-bold truncate">
                {formatNumber(statistics.totalRequests)}
              </p>
              <p className="text-xs mt-1 text-gray-400">
                All time
              </p>
            </div>
            <div className="bg-[#1A2332] rounded-lg shadow-lg p-3 sm:p-4 md:p-6 text-center">
              <p className="text-sm sm:text-base font-semibold mb-1">
                Unique Users
              </p>
              <p className="text-lg sm:text-xl md:text-2xl text-[#00B2FF] font-bold truncate">
                {formatNumber(statistics.uniqueUsers)}
              </p>
              <p className="text-xs mt-1 text-gray-400">
                Last 30 days
              </p>
            </div>
            <div className="bg-[#1A2332] rounded-lg shadow-lg p-3 sm:p-4 md:p-6 text-center">
              <p className="text-sm sm:text-base font-semibold mb-1">
                Average Success Rate
              </p>
              <p className="text-lg sm:text-xl md:text-2xl text-[#00B2FF] font-bold truncate">
                {(
                  statistics.apis.reduce(
                    (sum, api) => sum + api.successRate,
                    0
                  ) / statistics.apis.length
                ).toFixed(2)}
                %
              </p>
              <p className="text-xs mt-1 text-gray-400">
                Across all APIs
              </p>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-3">
          <div className="flex space-x-1 sm:space-x-2 items-center">
            <p className="text-gray-300 text-xs mr-1 sm:mr-2">View:</p>
            <button
              onClick={() => setViewMode("daily")}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs ${
                viewMode === "daily"
                  ? "bg-[#00B2FF] text-[#0D1525]"
                  : "bg-[#1A2332] text-gray-300"
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setViewMode("weekly")}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs ${
                viewMode === "weekly"
                  ? "bg-[#00B2FF] text-[#0D1525]"
                  : "bg-[#1A2332] text-gray-300"
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setViewMode("monthly")}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs ${
                viewMode === "monthly"
                  ? "bg-[#00B2FF] text-[#0D1525]"
                  : "bg-[#1A2332] text-gray-300"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Data last updated timestamp */}
        {statistics && (
          <p className="text-center text-gray-400 text-xs mb-4 sm:mb-6">
            Last updated: {new Date(statistics.timestamp).toLocaleString()}
          </p>
        )}

        {/* Requests by API Chart */}
        <div className="bg-[#1A2332] rounded-lg shadow-lg p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 md:mb-6">
            API Requests ({viewMode})
          </h2>
          <div className="h-60 sm:h-70 md:h-80">
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
                    backgroundColor: "#1A2332",
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Response Time Chart */}
          <div className="bg-[#1A2332] rounded-lg shadow-lg p-4 md:p-6">
            <h2 className="text-xl font-semibold mb-6">
              Average Response Time (ms)
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
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
                      backgroundColor: "#1A2332",
                      borderColor: "#2D3748",
                    }}
                    formatter={(value: any) => [
                      `${value.toFixed(2)} ms`,
                      "Response Time",
                    ]}
                  />
                  <Legend wrapperStyle={{ color: "#A0AEC0" }} />
                  <Line
                    type="monotone"
                    dataKey="responseTime"
                    name="Response Time"
                    stroke="#00D4FF"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* API Popularity Pie Chart */}
          <div className="bg-[#1A2332] rounded-lg shadow-lg p-4 md:p-6">
            <h2 className="text-xl font-semibold mb-6">API Popularity</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1A2332",
                      borderColor: "#2D3748",
                    }}
                    formatter={(value: any) => [
                      `${value} points`,
                      "Popularity Score",
                    ]}
                  />
                  <Legend wrapperStyle={{ color: "#A0AEC0" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* API Success Rates */}
        <div className="bg-[#1A2332] rounded-lg shadow-lg p-4 md:p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">API Success Rates</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-transparent">
              <thead className="bg-[#0D1525]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    API Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Success Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2D3748]">
                {statistics?.apis.map((api, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {api.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {api.successRate.toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          api.successRate > 99.9
                            ? "bg-green-800 text-green-100"
                            : api.successRate > 99.7
                            ? "bg-blue-800 text-blue-100"
                            : "bg-yellow-800 text-yellow-100"
                        }`}
                      >
                        {api.successRate > 99.9
                          ? "Excellent"
                          : api.successRate > 99.7
                          ? "Good"
                          : "Fair"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Free APIs Reminder */}
        <div className="bg-[#1A2332] rounded-lg shadow-lg p-3 sm:p-4 md:p-6 text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#00B2FF] mb-2 sm:mb-3">
            All SoftTouch APIs are 100% Free
          </h2>
          <p className="text-sm sm:text-base mb-3 sm:mb-4">
            No API keys, no rate limits, no hidden costs - just reliable APIs
            available to everyone.
          </p>
          <div className="mt-2 sm:mt-3 flex justify-center">
            <Link href="/apis">
              <span className="inline-block px-4 sm:px-6 py-2 sm:py-2.5 border border-[#00B2FF] bg-[#00B2FF] text-[#0D1525] rounded-md text-sm sm:text-base font-medium shadow-lg hover:bg-transparent hover:text-[#00B2FF] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-2 focus:ring-offset-[#0D1525] cursor-pointer">
                Explore APIs
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
