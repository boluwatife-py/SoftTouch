import { apiRequest } from "./queryClient";

// Types from Flask API
export interface ApiParam {
  name: string;
  type: string;
  description: string;
}

export interface ApiEndpoint {
  id: string;
  name: string;
  method: string;
  endpoint: string;
  response_type: string;
  part_description: string;
  description: string;
  enabled: boolean;
  is_visible_in_stats: boolean;
  sample_request?: string; // Added this property
  sample_response?: string; // Ensure this is also included if needed
  params?: ApiParam[];
}

export interface ApiStats {
  name: string;
  daily_requests: number;
  weekly_requests: number;
  monthly_requests: number;
  average_response_time: number;
  success_rate: number;
  popularity: number;
}

export interface Statistics {
  total_requests: number;
  unique_users: number;
  timestamp: string;
  apis: ApiStats[];
}

// API Functions
export const fetchEndpoints = async (): Promise<{ endpoints: ApiEndpoint[], count: number, timestamp: string }> => {
  const res = await apiRequest("GET", "/admin/endpoints");
  return res.json();
};

export const fetchEndpoint = async (id: string): Promise<ApiEndpoint> => {
  const res = await apiRequest("GET", `/admin/endpoints/${id}`);
  return res.json();
};

export const createEndpoint = async (endpoint: Omit<ApiEndpoint, "id">): Promise<{ message: string, endpoint: ApiEndpoint }> => {
  const res = await apiRequest("POST", "/admin/endpoints", endpoint);
  return res.json();
};

export const updateEndpoint = async (id: string, endpoint: ApiEndpoint): Promise<{ message: string, endpoint: ApiEndpoint }> => {
  const res = await apiRequest("PUT", `/admin/endpoints/${id}`, endpoint);
  return res.json();
};

export const deleteEndpoint = async (id: string): Promise<{ message: string }> => {
  const res = await apiRequest("DELETE", `/admin/endpoints/${id}`);
  return res.json();
};

export const enableEndpoint = async (id: string): Promise<{ message: string, endpoint: ApiEndpoint }> => {
  const res = await apiRequest("POST", `/admin/endpoints/${id}/enable`);
  return res.json();
};

export const disableEndpoint = async (id: string): Promise<{ message: string, endpoint: ApiEndpoint }> => {
  const res = await apiRequest("POST", `/admin/endpoints/${id}/disable`);
  return res.json();
};

export const showInStats = async (id: string): Promise<{ message: string, endpoint: ApiEndpoint }> => {
  const res = await apiRequest("POST", `/admin/endpoints/${id}/stats/show`);
  return res.json();
};

export const hideInStats = async (id: string): Promise<{ message: string, endpoint: ApiEndpoint }> => {
  const res = await apiRequest("POST", `/admin/endpoints/${id}/stats/hide`);
  return res.json();
};

export const fetchStatistics = async (): Promise<Statistics> => {
  const res = await apiRequest("GET", "/admin/stats");
  return res.json();
};

// Bulk operations
export const enableAllEndpoints = async (): Promise<{ message: string, count: number }> => {
  const res = await apiRequest("POST", "/admin/endpoints/enable-all");
  return res.json();
};

export const disableAllEndpoints = async (): Promise<{ message: string, count: number }> => {
  const res = await apiRequest("POST", "/admin/endpoints/disable-all");
  return res.json();
};

export const showAllInStats = async (): Promise<{ message: string, count: number }> => {
  const res = await apiRequest("POST", "/admin/endpoints/show-all-in-stats");
  return res.json();
};

export const hideAllFromStats = async (): Promise<{ message: string, count: number }> => {
  const res = await apiRequest("POST", "/admin/endpoints/hide-all-from-stats");
  return res.json();
};
