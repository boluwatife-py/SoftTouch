import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ApiEndpoint } from "@/lib/api";
import {
  Edit,
  Trash2,
  Loader2,
  Eye,
  EyeOff,
  ExternalLink,
  Terminal,
  Power,
  PowerOff,
  Check,
  Info,
  Copy,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface EndpointTableProps {
  endpoints: ApiEndpoint[];
  onToggleStatus: (id: string, currentStatus: boolean) => void;
  onToggleVisibility: (id: string, currentVisibility: boolean) => void;
  onEdit: (endpoint: ApiEndpoint) => void;
  onDelete: (id: string) => void;
  isProcessing: {
    enable: boolean;
    disable: boolean;
    show: boolean;
    hide: boolean;
  };
}

const EndpointTable = ({
  endpoints,
  onToggleStatus,
  onToggleVisibility,
  onEdit,
  onDelete,
  isProcessing,
}: EndpointTableProps) => {
  const [processingIds, setProcessingIds] = useState<Record<string, boolean>>(
    {}
  );

  const handleToggleStatus = (endpoint: ApiEndpoint) => {
    setProcessingIds((prev) => ({ ...prev, [`status-${endpoint.id}`]: true }));
    onToggleStatus(endpoint.id, endpoint.enabled);
    setTimeout(() => {
      setProcessingIds((prev) => ({
        ...prev,
        [`status-${endpoint.id}`]: false,
      }));
    }, 1000);
  };

  const handleToggleVisibility = (endpoint: ApiEndpoint) => {
    setProcessingIds((prev) => ({
      ...prev,
      [`visibility-${endpoint.id}`]: true,
    }));
    onToggleVisibility(endpoint.id, endpoint.is_visible_in_stats);
    setTimeout(() => {
      setProcessingIds((prev) => ({
        ...prev,
        [`visibility-${endpoint.id}`]: false,
      }));
    }, 1000);
  };

  const getMethodBadgeClass = (method: string) => {
    switch (method.toUpperCase()) {
      case "GET":
        return "bg-blue-500/15 text-blue-400 border-blue-500/20";
      case "POST":
        return "bg-green-500/15 text-green-400 border-green-500/20";
      case "PUT":
        return "bg-yellow-500/15 text-yellow-400 border-yellow-500/20";
      case "DELETE":
        return "bg-red-500/15 text-red-400 border-red-500/20";
      case "PATCH":
        return "bg-purple-500/15 text-purple-400 border-purple-500/20";
      default:
        return "bg-gray-500/15 text-gray-400 border-gray-500/20";
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method.toUpperCase()) {
      case "GET":
        return <Eye className="h-3 w-3 mr-1" />;
      case "POST":
        return <PlusIcon className="h-3 w-3 mr-1" />;
      case "PUT":
        return <RefreshIcon className="h-3 w-3 mr-1" />;
      case "DELETE":
        return <Trash2 className="h-3 w-3 mr-1" />;
      case "PATCH":
        return <EditIcon className="h-3 w-3 mr-1" />;
      default:
        return <Terminal className="h-3 w-3 mr-1" />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Endpoint
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Method
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Enabled
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700/50">
          {endpoints.map((endpoint) => (
            <tr
              key={endpoint.id}
              className="hover:bg-[#213977]/30 transition-colors"
            >
              <td className="px-6 py-4 text-sm">
                <div className="font-medium text-white">{endpoint.name}</div>
                <div className="text-xs text-gray-400 mt-1 max-w-[200px] truncate">
                  {endpoint.part_description}
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-300">
                <div className="flex items-center space-x-1 group">
                  <code className="text-xs bg-gray-700/50 p-1 rounded font-mono">
                    {endpoint.endpoint}
                  </code>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => copyToClipboard(endpoint.endpoint)}
                          className="hidden group-hover:flex p-1 hover:bg-gray-700 rounded-md"
                        >
                          <Copy className="h-3 w-3 text-gray-400" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy endpoint</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </td>
              <td className="px-6 py-4 text-sm">
                <Badge
                  variant="outline"
                  className={`px-2 py-1 flex items-center text-xs font-normal rounded border ${getMethodBadgeClass(
                    endpoint.method
                  )}`}
                >
                  {getMethodIcon(endpoint.method)}
                  {endpoint.method}
                </Badge>
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex items-center space-x-2">
                  {processingIds[`status-${endpoint.id}`] ||
                  isProcessing.enable ||
                  isProcessing.disable ? (
                    <Loader2 className="w-4 h-4 text-[#00BFFF] animate-spin" />
                  ) : (
                    <div className="flex items-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>
                              <Switch
                                checked={endpoint.enabled}
                                onCheckedChange={() =>
                                  handleToggleStatus(endpoint)
                                }
                                className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-500"
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {endpoint.enabled
                                ? "Disable endpoint"
                                : "Enable endpoint"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      {endpoint.enabled ? (
                        <Power className="ml-2 h-3 w-3 text-green-400" />
                      ) : (
                        <PowerOff className="ml-2 h-3 w-3 text-gray-400" />
                      )}
                    </div>
                  )}
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                <div className="flex items-center justify-end space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                          onClick={() => onEdit(endpoint)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit endpoint</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          onClick={() => onDelete(endpoint.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete endpoint</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-gray-300 hover:bg-gray-700/50"
                        >
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Helper icons
const PlusIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

const RefreshIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 16h5v5" />
  </svg>
);

const EditIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

export default EndpointTable;
