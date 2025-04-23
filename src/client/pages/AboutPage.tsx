import { FaHeart, FaShieldAlt, FaEye, FaUsers } from "react-icons/fa";
import SmoothNavLink from "@/components/SmoothNavLink";

export default function AboutPage() {
  return (
    <section className="animate-fadeIn py-8 sm:py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#00B2FF]">About SoftTouch</h1>
          <p className="mt-1 sm:mt-2 text-base sm:text-lg md:text-xl">Our mission and story</p>
        </div>

        <div className="bg-[#1A2332] rounded-lg shadow-lg overflow-hidden p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#00B2FF] mb-4 sm:mb-6">Our Mission</h2>
          
          <p className="mb-4 sm:mb-6 text-sm sm:text-base">
            SoftTouch was founded with a simple but powerful mission: to democratize access to high-quality APIs for developers at all levels.
          </p>
          
          <p className="mb-4 sm:mb-6 text-sm sm:text-base">
            We believe that technology should be accessible to everyone, regardless of budget constraints. By providing free, reliable, and well-documented APIs, we aim to empower developers to build innovative applications without worrying about costly subscription fees.
          </p>
          
          <p className="mb-4 sm:mb-6 text-sm sm:text-base">
            Our team consists of passionate developers who understand the challenges of building modern applications. We're committed to maintaining high standards of reliability, security, and performance for all our APIs.
          </p>
          
          <h2 className="text-xl sm:text-2xl font-semibold text-[#00B2FF] mb-4 sm:mb-6 mt-8 sm:mt-12">Core Values</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex items-start">
              <div className="text-[#00B2FF] mr-3 sm:mr-4 mt-1">
                <FaHeart className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h3 className="font-medium text-sm sm:text-base text-[#00B2FF]">Accessibility</h3>
                <p className="text-sm text-gray-300">Removing financial barriers to quality development resources</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="text-[#00B2FF] mr-3 sm:mr-4 mt-1">
                <FaShieldAlt className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h3 className="font-medium text-sm sm:text-base text-[#00B2FF]">Reliability</h3>
                <p className="text-sm text-gray-300">Maintaining stable services that developers can depend on</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="text-[#00B2FF] mr-3 sm:mr-4 mt-1">
                <FaEye className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h3 className="font-medium text-sm sm:text-base text-[#00B2FF]">Transparency</h3>
                <p className="text-sm text-gray-300">Being open about our processes, limitations, and roadmap</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="text-[#00B2FF] mr-3 sm:mr-4 mt-1">
                <FaUsers className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h3 className="font-medium text-sm sm:text-base text-[#00B2FF]">Community</h3>
                <p className="text-sm text-gray-300">Fostering a supportive environment for developers of all experience levels</p>
              </div>
            </div>
          </div>
        </div>

        {/* Join Us Section */}
        <div className="mt-6 sm:mt-8 md:mt-12 bg-[#1A2332] rounded-lg shadow-lg p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#00B2FF] mb-4 sm:mb-6">Join Our Community</h2>
          
          <p className="mb-4 sm:mb-6 text-sm sm:text-base">
            We're always looking for passionate developers to join our community. Whether you want to contribute code, report bugs, or suggest new features, your input is valuable to us.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            <SmoothNavLink 
              to="/join"
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-[#00B2FF] text-[#0D1525] rounded-md font-medium shadow-lg hover:bg-[#00D4FF] transition duration-200 cursor-pointer text-xs sm:text-sm"
            >
              Contribute
            </SmoothNavLink>
            
            <SmoothNavLink 
              to="/contact"
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-[#00B2FF] text-[#00B2FF] rounded-md font-medium shadow-lg hover:bg-[#00B2FF] hover:text-[#0D1525] transition duration-200 cursor-pointer text-xs sm:text-sm"
            >
              Contact Us
            </SmoothNavLink>
          </div>
        </div>
      </div>
    </section>
  );
}
