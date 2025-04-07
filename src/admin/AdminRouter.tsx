import { Switch, Route } from "wouter";
import { queryClient } from "@/shared/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout/Layout";
import EndpointsPage from "@/pages/endpoints";
import StatisticsPage from "@/pages/statistics";
import { ProtectedRoute } from "@/shared/lib/protected-route";
import AuthPage from "@/pages/auth-page";
import { AuthProvider } from "@/hooks/use-auth";

function AdminRouter() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Switch>
          <ProtectedRoute
            path="/"
            component={() => (
              <Layout>
                <EndpointsPage />
              </Layout>
            )}
          />
          <ProtectedRoute
            path="/statistics"
            component={() => (
              <Layout>
                <StatisticsPage />
              </Layout>
            )}
          />
          <Route path="/auth" component={AuthPage} />
          <Route component={NotFound} />
        </Switch>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default AdminRouter;
