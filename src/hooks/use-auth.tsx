import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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

  const { data: user, error, isLoading } = useQuery<User | null, Error>({
    queryKey: ["/admin/user"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/admin/user");
      if (res.status === 401) return null;
      return await res.json();
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await apiRequest("POST", "/admin/login", credentials);
      if (!res.ok) throw new Error(await res.text());
      return await res.json();
    },
    onSuccess: (user: User) => {
      queryClient.setQueryData(["/admin/user"], user);
      toast({
        title: "Login successful",
        description: `Welcome, ${user.username}!`,
      });
    },
    onError: (error: Error) => {
      const errorMessage = error.message.toLowerCase();
      let title = "Login failed";
      let description = error.message;

      if (errorMessage.includes("username")) {
        title = "Invalid username";
        description = "This username doesn't exist.";
      } else if (errorMessage.includes("password")) {
        title = "Invalid password";
        description = "The password is incorrect.";
      }

      toast({
        title,
        description,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/admin/logout");
      if (!res.ok) throw new Error(await res.text());
    },
    onSuccess: () => {
      queryClient.setQueryData(["/admin/user"], null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
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
        logoutMutation
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