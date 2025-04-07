import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0D1525] text-[#D9E1E8] px-4">
      <div className="container max-w-4xl text-center">
        <div className="flex justify-center mb-6">
          <AlertCircle className="h-24 w-24 text-[#00B2FF]" />
        </div>
        <h1 className="text-6xl md:text-8xl font-bold text-[#00B2FF] mb-6">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-lg mb-10 text-gray-400 max-w-xl mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
          <Link to="/">
            <span className="px-8 py-3 bg-[#00B2FF] text-[#0D1525] rounded-md font-medium inline-block hover:bg-[#00D4FF] transition duration-200">
              Return Home
            </span>
          </Link>
          <Link to="/apis">
            <span className="px-8 py-3 bg-[#1A2332] text-[#D9E1E8] rounded-md font-medium inline-block hover:bg-[#2A3342] transition duration-200">
              Explore APIs
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
