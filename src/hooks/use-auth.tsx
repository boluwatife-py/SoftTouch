import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter"; // Import useLocation for navigation

type User = {
  id: number;
  username: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<User, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
};

type LoginData = {
  username: string;
  password: string;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [, setLocation] = useLocation(); // Get setLocation for navigation
  const token = localStorage.getItem("token");

  const { data: user, error, isLoading } = useQuery<User | null, Error>({
    queryKey: ["/admin/user"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/admin/user");
      if (res.status === 401) return null;
      return await res.json();
    },
    enabled: !!token,
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await apiRequest("POST", "/admin/login", credentials);
      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
      } else {
        throw new Error("No token received");
      }
      return { id: data.id, username: data.username };
    },
    onSuccess: (user: User) => {
      queryClient.setQueryData(["/admin/user"], user);
      toast({
        title: "Login successful",
        description: `Welcome, ${user.username}!`,
      });
      setLocation("/admin"); // Redirect to /admin after successful login
    },
    onError: (error: Error) => {
      const errorMessage = error.message.toLowerCase();
      let title = "Login failed";
      let description = error.message;

      if (errorMessage.includes("username") || errorMessage.includes("password")) {
        title = "Authentication failed";
        description = "Incorrect username or password.";
      } else if (errorMessage.includes("token")) {
        title = "Login error";
        description = "Failed to receive authentication token.";
      }

      toast({
        title,
        description,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: async () => {
      await apiRequest("POST", "/admin/logout");
      localStorage.removeItem("token");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/admin/user"], null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      setLocation("/admin/auth"); // Optional: Redirect to login page after logout
    },
    onError: (error: Error) => {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}