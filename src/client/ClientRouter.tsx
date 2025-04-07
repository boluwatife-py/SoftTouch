import { Switch, Route, useLocation } from "wouter";
import React, { createContext, useContext, useState, useEffect, Suspense } from "react";
import Spinner from "./components/Spinner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {
  HomePage, ApiPage, DocsPage, AboutPage, DonatePage, JoinPage,
  FaqPage, ContactPage, TermsPage, SupportersPage, StatisticsPage,
  NotFound, ErrorPage
} from "./pages";

type NavbarContextType = {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
};

const NavbarContext = createContext<NavbarContextType>({
  isMobileMenuOpen: false,
  setIsMobileMenuOpen: () => {},
});

NavbarContext.displayName = 'NavbarContext';

export function useNavbar() {
  return useContext(NavbarContext);
}

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

function ClientRouter() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("#mobile-menu-button")) return;
      if (!target.closest("#mobile-menu")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <NavbarContext.Provider value={{ isMobileMenuOpen, setIsMobileMenuOpen }}>
      <div className="min-h-screen flex flex-col bg-[#0D1525] text-[#D9E1E8] font-sans">
        <Navbar />
        <main className="flex-grow pt-16">
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
                    title={params.code === "500" ? "Server Error" : "Error Occurred"}
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

export default ClientRouter;
