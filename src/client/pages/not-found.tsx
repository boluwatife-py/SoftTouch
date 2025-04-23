import { Link } from "wouter";
import { AlertCircle, Home, Code } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0D1525] text-[#D9E1E8] px-3 sm:px-4">
      <div className="container max-w-4xl text-center">
        <div className="flex justify-center mb-4 sm:mb-6">
          <AlertCircle className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-[#00B2FF]" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-[#00B2FF] mb-3 sm:mb-4 md:mb-6">404</h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4">Page Not Found</h2>
        <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10 text-gray-400 max-w-xl mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-2 sm:space-y-0 sm:space-x-2 md:space-x-4 flex flex-col sm:flex-row justify-center">
          <Link to="/">
            <span className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-[#00B2FF] text-[#0D1525] rounded-md font-medium hover:bg-[#00D4FF] transition duration-200 text-xs sm:text-sm">
              <Home className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              Return Home
            </span>
          </Link>
          <Link to="/apis">
            <span className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-[#00B2FF] text-[#00B2FF] rounded-md font-medium hover:bg-[#00B2FF] hover:text-[#0D1525] transition duration-200 text-xs sm:text-sm">
              <Code className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              Explore APIs
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
