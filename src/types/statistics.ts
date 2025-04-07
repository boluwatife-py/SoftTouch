export type ApiStat = {
    name: string;
    request_count: number;
    // Add more fields here as needed
  };
  
  export type StatisticsResponse = {
    total_requests: number;
    unique_users: number;
    timestamp: string;
    apis: ApiStat[];
  };
  