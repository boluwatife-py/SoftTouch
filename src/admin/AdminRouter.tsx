import { Switch, Route } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "./pages/not-found";
import Layout from "@/components/layout/Layout";
import EndpointsPage from "./pages/endpoints";
import StatisticsPage from "./pages/statistics";
import { ProtectedRoute } from "@/lib/protected-route";
import AuthPage from "./pages/auth-page";
import { AuthProvider } from "@/hooks/use-auth";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { useLocation } from "wouter";

function AuthRedirect() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && user) {
      setLocation("/admin"); // Redirect authenticated users to /admin
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return <div>Loading...</div>; // Optional: Add a loading state
  }

  return <AuthPage />; // Render AuthPage for unauthenticated users
}

function AdminRouter() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Switch>
          <ProtectedRoute
            path="/admin"
            component={() => (
              <Layout>
                <EndpointsPage />
              </Layout>
            )}
          />
          <ProtectedRoute
            path="/admin/statistics"
            component={() => (
              <Layout>
                <StatisticsPage />
              </Layout>
            )}
          />
          <Route path="/admin/auth" component={AuthRedirect} /> {/* Use AuthRedirect */}
          <Route component={NotFound} />
        </Switch>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default AdminRouter;