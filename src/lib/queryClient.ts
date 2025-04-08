import { QueryClient, QueryFunction } from "@tanstack/react-query";

const BASE_URL = import.meta.env.VITE_API_URL

// Store token in memory and sync with localStorage
let token: string | null = localStorage.getItem("authToken");

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const headers: Record<string, string> = {};
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
    credentials: "include", // Keep this if your backend requires cookies alongside JWT
  });

  // Handle token from login response
  if (url === "/admin/login" && res.headers.get("Authorization")) {
    token = res.headers.get("Authorization")!.split(" ")[1];
    localStorage.setItem("authToken", token);
  } else if (url === "/admin/logout") {
    token = null;
    localStorage.removeItem("authToken");
  }

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${BASE_URL}${queryKey[0] as string}`, {
      headers,
      credentials: "include", // Keep this if needed
    });

    if (res.status === 401) {
      if (unauthorizedBehavior === "returnNull") {
        token = null; // Clear token on 401
        localStorage.removeItem("authToken");
        return null; // Matches /admin/user expectation in useAuth.ts
      }
      throw new Error("401: Unauthorized");
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "returnNull" }), // Use returnNull for /admin/user
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity, // Keep data fresh until explicitly invalidated
      retry: false, // No retries in production for faster feedback
    },
    mutations: {
      retry: false,
    },
  },
});

// Initialize token from localStorage on module load
token = localStorage.getItem("authToken");