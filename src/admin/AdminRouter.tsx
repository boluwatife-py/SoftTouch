import { Switch, Route } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "./pages/not-found";
import Layout from "@/components/layout/Layout";
import EndpointsPage from "./pages/endpoints";
import { ProtectedRoute } from "@/lib/protected-route";
import AuthPage from "./pages/auth-page";
import { AuthProvider } from "@/hooks/use-auth";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";

function AuthRedirect() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        setLocation("/admin");
      }
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-[#00BFFF]" />
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return null; // Prevent rendering anything if redirecting
}

function RootRedirect() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        setLocation("/admin"); // Authenticated users go to /admin
      } else {
        setLocation("/admin/auth"); // Unauthenticated users go to login
      }
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-[#00BFFF]" />
      </div>
    );
  }

  return null; // Don't render anything, just redirect
}

function AdminRouter() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Switch>
          <Route path="/" component={RootRedirect} /> {/* Handle root path */}
          <Route path="/admin/auth" component={AuthRedirect} />
          <ProtectedRoute
            path="/admin"
            component={() => (
              <Layout>
                <EndpointsPage />
              </Layout>
            )}
          />
          <Route component={NotFound} /> {/* Catch-all for undefined routes */}
        </Switch>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default AdminRouter;