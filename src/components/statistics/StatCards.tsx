import { formatDistanceToNow } from "date-fns";

interface StatCardsProps {
  totalRequests: number;
  uniqueUsers: number;
  timestamp: string;
}

const StatCards = ({ totalRequests, uniqueUsers, timestamp }: StatCardsProps) => {
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num);
  };

  const getRelativeTime = (timestamp: string): string => {
    try {
      const date = new Date(timestamp);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (e) {
      return timestamp;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-[#1B263B] rounded-lg p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-[#D3D3D3] text-sm font-medium">Total Requests</h4>
            <p className="text-3xl font-bold text-white mt-1">{formatNumber(totalRequests)}</p>
          </div>
          <div className="p-3 rounded-full bg-blue-900 text-[#00BFFF]">
            <i className="fas fa-exchange-alt"></i>
          </div>
        </div>
      </div>
      <div className="bg-[#1B263B] rounded-lg p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-[#D3D3D3] text-sm font-medium">Unique Users</h4>
            <p className="text-3xl font-bold text-white mt-1">{formatNumber(uniqueUsers)}</p>
          </div>
          <div className="p-3 rounded-full bg-purple-900 text-purple-400">
            <i className="fas fa-users"></i>
          </div>
        </div>
      </div>
      <div className="bg-[#1B263B] rounded-lg p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-[#D3D3D3] text-sm font-medium">Last Updated</h4>
            <p className="text-md font-medium text-white mt-1">{getRelativeTime(timestamp)}</p>
            <p className="text-xs text-[#D3D3D3]">{new Date(timestamp).toLocaleString()}</p>
          </div>
          <div className="p-3 rounded-full bg-gray-700 text-gray-300">
            <i className="fas fa-clock"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCards;
