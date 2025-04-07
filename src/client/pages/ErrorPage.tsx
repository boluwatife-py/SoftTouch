import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

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
    <section className="min-h-screen flex items-center justify-center bg-[#0D1525] text-[#D9E1E8] px-4">
      <div className="container max-w-4xl text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-24 w-24 text-amber-500" />
        </div>
        <h1 className="text-6xl md:text-8xl font-bold text-amber-500 mb-6">{code}</h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg mb-10 text-gray-400 max-w-xl mx-auto">
          {message}
        </p>
        
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
          <Link to="/">
            <span className="px-8 py-3 bg-[#00B2FF] text-[#0D1525] rounded-md font-medium inline-block hover:bg-[#00D4FF] transition duration-200">
              Return Home
            </span>
          </Link>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-[#1A2332] text-[#D9E1E8] rounded-md font-medium inline-block hover:bg-[#2A3342] transition duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    </section>
  );
}