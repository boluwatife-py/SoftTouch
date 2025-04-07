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
          <Route path="/admin/auth" component={AuthPage} />
          <Route component={NotFound} />
        </Switch>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default AdminRouter;
