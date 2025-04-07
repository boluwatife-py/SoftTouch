import { ApiStats } from "@/lib/api";

interface StatsTableProps {
  apis: ApiStats[];
}

const StatsTable = ({ apis }: StatsTableProps) => {
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num);
  };

  const formatTime = (ms: number): string => {
    return `${ms}ms`;
  };

  const formatPercentage = (value: number): string => {
    return `${Math.round(value)}%`;
  };

  const renderStars = (popularity: number) => {
    const stars = [];
    const fullStars = Math.floor(popularity);
    const hasHalfStar = popularity % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star text-yellow-500"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-yellow-500"></i>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-yellow-500"></i>);
    }

    return stars;
  };

  return (
    <div className="bg-[#1B263B] rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-700">
        <h3 className="text-lg font-medium text-white">API Performance</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-[#0A1533]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-[#D3D3D3] uppercase tracking-wider">API Name</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-[#D3D3D3] uppercase tracking-wider">Daily Requests</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-[#D3D3D3] uppercase tracking-wider">Weekly Requests</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-[#D3D3D3] uppercase tracking-wider">Monthly Requests</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-[#D3D3D3] uppercase tracking-wider">Avg. Response Time</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-[#D3D3D3] uppercase tracking-wider">Success Rate</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-[#D3D3D3] uppercase tracking-wider">Popularity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {apis.map((api) => (
              <tr key={api.name}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{api.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#D3D3D3]">{formatNumber(api.daily_requests)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#D3D3D3]">{formatNumber(api.weekly_requests)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#D3D3D3]">{formatNumber(api.monthly_requests)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#D3D3D3]">{formatTime(api.average_response_time)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-green-500 h-2.5 rounded-full" 
                        style={{ width: `${api.success_rate}%` }}
                      ></div>
                    </div>
                    <span className="text-[#D3D3D3] ml-2">{formatPercentage(api.success_rate)}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center">
                    {renderStars(api.popularity)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatsTable;
