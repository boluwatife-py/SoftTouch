import { QueryClient, QueryFunction } from "@tanstack/react-query";

const BASE_URL = import.meta.env.VITE_API_URL;

// Store token in memory and sync with localStorage
let token: string | null = localStorage.getItem("authToken");

// Utility to throw an error if the response is not OK
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Generalized API request function
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown,
  customHeaders: Record<string, string> = {}
): Promise<Response> {
  const headers: Record<string, string> = { ...customHeaders };
  if (data) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${url}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include", // Keep if your backend uses cookies alongside JWT
  });

  // Handle token updates from login/logout responses
  if (url === "/admin/login" && res.headers.get("Authorization")) {
    token = res.headers.get("Authorization")!.split(" ")[1];
    localStorage.setItem("authToken", token);
  } else if (url === "/admin/logout" && res.ok) {
    token = null;
    localStorage.removeItem("authToken");
  }

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn = <T>({
  on401: unauthorizedBehavior,
}: {
  on401: UnauthorizedBehavior;
}): QueryFunction<T> => async ({ queryKey }) => {
  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${queryKey[0] as string}`, {
    headers,
    credentials: "include", // Keep if needed
  });

  if (res.status === 401) {
    token = null; // Clear token on 401
    localStorage.removeItem("authToken");
    if (unauthorizedBehavior === "returnNull") {
      return null as T; // Type assertion to match useQuery<User | null>
    }
    throw new Error("401: Unauthorized");
  }

  await throwIfResNotOk(res);
  return await res.json();
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "returnNull" }), // Default for /admin/user
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity, // Keep data fresh until invalidated
      retry: false, // No retries for faster feedback
    },
    mutations: {
      retry: false,
    },
  },
});

// Initialize token from localStorage on module load
token = localStorage.getItem("authToken");