import { useQuery } from "@tanstack/react-query";
import { fetchStatistics } from "@/lib/api";
import StatCards from "@/components/statistics/StatCards";
import StatsTable from "@/components/statistics/StatsTable";

const StatisticsPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["/api/admin/stats"],
    retry: 2
  });

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-white mb-8">Statistics</h2>
      
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
          <p className="text-[#D3D3D3]">There was a problem loading the statistics. Please try again.</p>
        </div>
      )}

      {/* No Stats State */}
      {!isLoading && !isError && (!data || data.apis?.length === 0) && (
        <div className="text-center py-12 bg-[#1B263B] rounded-lg">
          <i className="fas fa-chart-bar text-5xl text-gray-600 mb-4"></i>
          <h3 className="text-xl text-white mb-2">No statistics available</h3>
          <p className="text-[#D3D3D3]">Statistics will appear here once your APIs start receiving traffic</p>
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
          
          {data.apis && data.apis.length > 0 && (
            <StatsTable apis={data.apis} />
          )}
        </>
      )}
    </div>
  );
};

export default StatisticsPage;
