import { Switch, Route, useLocation, useRoute } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import React, { createContext, useContext, useState, useEffect, Suspense } from "react";
import Spinner from "./components/Spinner";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ApiPage from "./pages/ApiPage";
import DocsPage from "./pages/DocsPage";
import AboutPage from "./pages/AboutPage";
import DonatePage from "./pages/DonatePage";
import JoinPage from "./pages/JoinPage";
import FaqPage from "./pages/FaqPage";
import ContactPage from "./pages/ContactPage";
import TermsPage from "./pages/TermsPage";
import SupportersPage from "./pages/SupportersPage";
import StatisticsPage from "./pages/StatisticsPage";
import NotFound from "@/pages/not-found";
import ErrorPage from "./pages/ErrorPage";

// Create a context to manage the mobile menu state
type NavbarContextType = {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
};

const NavbarContext = createContext<NavbarContextType>({
  isMobileMenuOpen: false,
  setIsMobileMenuOpen: () => {},
});

// Ensure the context is properly initialized
NavbarContext.displayName = 'NavbarContext';

// Use a named export for the hook to avoid Fast Refresh issues
export function useNavbar() { 
  return useContext(NavbarContext);
}

// Custom Error Boundary Component
class CustomErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage 
          title="Something Went Wrong" 
          message="We're having trouble displaying this page. Please try again later." 
          code="500" 
        />
      );
    }

    return this.props.children;
  }
}

function Router() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll to top and close mobile menu when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close mobile menu when clicking outside or when a navigation occurs
  useEffect(() => {
    // Only add the event listener if the menu is open
    if (!isMobileMenuOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Skip if click is on the toggle button itself
      if (target.closest('#mobile-menu-button')) return;
      
      // Close if the click is outside the mobile menu
      if (!target.closest('#mobile-menu')) {
        setIsMobileMenuOpen(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <NavbarContext.Provider value={{ isMobileMenuOpen, setIsMobileMenuOpen }}>
      <div className="min-h-screen flex flex-col bg-[#0D1525] text-[#D9E1E8] font-sans">
        <Navbar />
        <main className="flex-grow pt-16"> {/* Added padding top to account for fixed navbar */}
          <CustomErrorBoundary>
            <Suspense fallback={<Spinner centered fullHeight size="md" />}>
              <Switch>
                <Route path="/" component={HomePage} />
                <Route path="/apis" component={ApiPage} />
                <Route path="/docs" component={DocsPage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/donate" component={DonatePage} />
                <Route path="/join" component={JoinPage} />
                <Route path="/faq" component={FaqPage} />
                <Route path="/contact" component={ContactPage} />
                <Route path="/terms" component={TermsPage} />
                <Route path="/supporters" component={SupportersPage} />
                <Route path="/statistics" component={StatisticsPage} />
                <Route path="/error" component={() => <ErrorPage />} />
                <Route path="/error/:code" component={({ params }) => (
                  <ErrorPage 
                    code={params.code} 
                    title={params.code === '500' ? 'Server Error' : 'Error Occurred'} 
                  />
                )} />
                <Route component={NotFound} />
              </Switch>
            </Suspense>
          </CustomErrorBoundary>
        </main>
        <Footer />
      </div>
    </NavbarContext.Provider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
