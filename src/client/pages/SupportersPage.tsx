import { FaHeart, FaStar, FaBuilding, FaUser, FaGlobe } from "react-icons/fa";
import SmoothNavLink from "@/components/SmoothNavLink";

export default function SupportersPage() {
  // Sample supporters data - in a real app this would come from an API
  const platinumSupporters = [
    { id: 1, name: "TechCorp Solutions", type: "company", country: "United States", since: "January 2023" },
    { id: 2, name: "WebFuture Inc", type: "company", country: "Canada", since: "March 2023" },
    { id: 3, name: "Northern Lights Tech", type: "company", country: "Norway", since: "April 2023" }
  ];

  const goldSupporters = [
    { id: 4, name: "Jasmine Wong", type: "individual", country: "Singapore", since: "February 2023" },
    { id: 5, name: "DataFlow Systems", type: "company", country: "Germany", since: "June 2023" },
    { id: 6, name: "Miguel Santos", type: "individual", country: "Brazil", since: "July 2023" },
    { id: 7, name: "Eastern Digital", type: "company", country: "Japan", since: "August 2023" }
  ];

  const regularSupporters = [
    { id: 8, name: "Sarah Johnson", type: "individual", country: "United Kingdom", since: "March 2023" },
    { id: 9, name: "Tech Enthusiasts Group", type: "company", country: "Australia", since: "April 2023" },
    { id: 10, name: "Marco Rossi", type: "individual", country: "Italy", since: "May 2023" },
    { id: 11, name: "NextGen Developers", type: "company", country: "France", since: "June 2023" },
    { id: 12, name: "Olivia Chen", type: "individual", country: "Canada", since: "July 2023" },
    { id: 13, name: "Creative Coders", type: "company", country: "Sweden", since: "August 2023" },
    { id: 14, name: "Ahmed Hassan", type: "individual", country: "Egypt", since: "September 2023" },
    { id: 15, name: "Digital Dreams", type: "company", country: "Ireland", since: "October 2023" }
  ];

  return (
    <section className="animate-fadeIn py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#00B2FF]">Our Supporters</h1>
          <p className="mt-2 text-xl">Thank you to everyone who helps make SoftTouch possible</p>
        </div>

        <div className="mb-16">
          <div className="text-center mb-8">
            <p className="max-w-3xl mx-auto">
              SoftTouch provides completely free API services with no rate limits or restrictions thanks to the generous
              support of individuals and organizations who believe in our mission. We are deeply grateful for their contributions.
            </p>
          </div>

          {/* Platinum Tier */}
          <div className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-[#00B2FF] to-transparent w-full max-w-xs"></div>
              <h2 className="text-2xl font-bold text-[#00B2FF] mx-4 whitespace-nowrap">Platinum Supporters</h2>
              <div className="h-px bg-gradient-to-r from-[#00B2FF] via-[#00B2FF] to-transparent w-full max-w-xs"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {platinumSupporters.map((supporter) => (
                <div key={supporter.id} className="bg-[#1A2332] border-2 border-[#00B2FF] rounded-lg p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(0,178,255,0.25)]">
                  <div className="relative mx-auto w-20 h-20 bg-[#0D1525] rounded-full flex items-center justify-center mb-4 border-2 border-[#00B2FF]">
                    {supporter.type === "company" ? (
                      <FaBuilding className="text-[#00B2FF] text-3xl" />
                    ) : (
                      <FaUser className="text-[#00B2FF] text-3xl" />
                    )}
                    <div className="absolute -top-2 -right-2 bg-[#00B2FF] text-[#0D1525] p-1 rounded-full">
                      <FaStar className="text-lg" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-[#00B2FF] mb-2">{supporter.name}</h3>
                  <div className="flex items-center justify-center mb-2 text-sm text-gray-400">
                    <FaGlobe className="mr-1" />
                    <span>{supporter.country}</span>
                  </div>
                  <p className="text-sm">Supporting since {supporter.since}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gold Tier */}
          <div className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent w-full max-w-xs"></div>
              <h2 className="text-2xl font-bold text-[#D4AF37] mx-4 whitespace-nowrap">Gold Supporters</h2>
              <div className="h-px bg-gradient-to-r from-[#D4AF37] via-[#D4AF37] to-transparent w-full max-w-xs"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {goldSupporters.map((supporter) => (
                <div key={supporter.id} className="bg-[#1A2332] border border-[#D4AF37] rounded-lg p-6 text-center transition duration-300 hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:border-2">
                  <div className="mx-auto w-16 h-16 bg-[#0D1525] rounded-full flex items-center justify-center mb-4 border border-[#D4AF37]">
                    {supporter.type === "company" ? (
                      <FaBuilding className="text-[#D4AF37] text-2xl" />
                    ) : (
                      <FaUser className="text-[#D4AF37] text-2xl" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-[#D4AF37] mb-2">{supporter.name}</h3>
                  <div className="flex items-center justify-center mb-2 text-sm text-gray-400">
                    <FaGlobe className="mr-1" />
                    <span>{supporter.country}</span>
                  </div>
                  <p className="text-sm">Supporting since {supporter.since}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Regular Supporters */}
          <div>
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-[#D9E1E8] to-transparent w-full max-w-xs"></div>
              <h2 className="text-2xl font-bold text-[#D9E1E8] mx-4 whitespace-nowrap">Community Supporters</h2>
              <div className="h-px bg-gradient-to-r from-[#D9E1E8] via-[#D9E1E8] to-transparent w-full max-w-xs"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {regularSupporters.map((supporter) => (
                <div key={supporter.id} className="bg-[#1A2332] rounded-lg p-4 text-center transition duration-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:bg-[#162232]">
                  <h3 className="text-md font-medium text-[#D9E1E8] mb-1">{supporter.name}</h3>
                  <div className="flex items-center justify-center text-xs text-gray-400">
                    <FaGlobe className="mr-1" />
                    <span>{supporter.country}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-[#1A2332] rounded-lg shadow-lg p-8 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-[#00B2FF] mb-4">Join Our Supporters</h2>
          <p className="mb-6">
            Help us continue providing free, high-quality APIs with no limitations.
            Your support makes a real difference for developers around the world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <SmoothNavLink 
              to="/donate" 
              className="px-6 py-3 bg-[#00B2FF] text-[#0D1525] rounded-md font-medium hover:bg-[#00D4FF] transition duration-200"
            >
              Become a Supporter
            </SmoothNavLink>
            <SmoothNavLink 
              to="/about" 
              className="px-6 py-3 border border-[#00B2FF] text-[#00B2FF] rounded-md font-medium hover:bg-[#00B2FF] hover:text-[#0D1525] transition duration-200"
            >
              Learn More About Us
            </SmoothNavLink>
          </div>
        </div>
      </div>
    </section>
  );
}