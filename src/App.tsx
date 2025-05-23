import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import ClientRouter from "@/client/ClientRouter";
import AdminRouter from "@/admin/AdminRouter";

type AppProps = {
  mode: "client" | "admin";
};

function App({ mode }: AppProps) {
  const Router = mode === "admin" ? AdminRouter : ClientRouter;

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
