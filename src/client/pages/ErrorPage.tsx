import { Link } from "wouter";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

interface ErrorPageProps {
  title?: string;
  message?: string;
  code?: string | number;
}

export default function ErrorPage({
  title = "An Error Occurred",
  message = "We're sorry, something went wrong. Please try again later.",
  code = "500"
}: ErrorPageProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0D1525] text-[#D9E1E8] px-3 sm:px-4">
      <div className="container max-w-4xl text-center">
        <div className="flex justify-center mb-4 sm:mb-6">
          <AlertTriangle className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-amber-500" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-amber-500 mb-3 sm:mb-4 md:mb-6">{code}</h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4">{title}</h2>
        <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10 text-gray-400 max-w-xl mx-auto">
          {message}
        </p>
        
        <div className="space-y-2 sm:space-y-0 sm:space-x-2 md:space-x-4 flex flex-col sm:flex-row justify-center">
          <Link to="/">
            <span className="inline-flex items-center px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-[#00B2FF] text-[#0D1525] rounded-md font-medium hover:bg-[#00D4FF] transition duration-200 text-xs sm:text-sm">
              <Home className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              Return Home
            </span>
          </Link>
          <button 
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-[#1A2332] text-[#D9E1E8] rounded-md font-medium hover:bg-[#2A3342] transition duration-200 text-xs sm:text-sm"
          >
            <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
            Try Again
          </button>
        </div>
      </div>
    </section>
  );
}