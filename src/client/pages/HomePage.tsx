import { Link } from "wouter";
import { FaBolt, FaLock, FaCode, FaGlobe, FaRocket, FaUserFriends, FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { apis, ApiType } from "../data/apis";
import Spinner from "../components/Spinner";

export default function HomePage() {
  const [apiData, setApiData] = useState<ApiType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch API data
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        setIsLoading(true);
        const data = await apis;
        setApiData(data);
      } catch (error) {
        console.error("Error fetching API data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchApiData();
  }, []);
  
  // Use the first 3 APIs for the featured section
  const latestApis = apiData.slice(0, 3);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="animate-fadeIn py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-[#00B2FF] mb-6">
            <span className="inline-block">SoftTouch</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            100% free API access for pro features. Build powerful applications without the cost.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/apis">
              <span className="inline-block px-8 py-3 border border-[#00B2FF] bg-[#00B2FF] text-[#0D1525] rounded-md text-lg font-medium shadow-lg hover:bg-transparent hover:text-[#00B2FF] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-2 focus:ring-offset-[#0D1525] cursor-pointer">
                Explore APIs
              </span>
            </Link>
            <Link href="/docs">
              <span className="inline-block px-8 py-3 border border-[#00B2FF] text-[#00B2FF] rounded-md text-lg font-medium shadow-lg hover:bg-[#00B2FF] hover:text-[#0D1525] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#00D4FF] focus:ring-offset-2 focus:ring-offset-[#0D1525] cursor-pointer">
                Read the Docs
              </span>
            </Link>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">Why choose SoftTouch APIs?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1A2332] p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
              <div className="text-[#00B2FF] text-2xl mb-4">
                <FaBolt />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast & Reliable</h3>
              <p>Optimized for speed with 99.9% uptime guarantee. Build with confidence knowing your API calls will be processed quickly.</p>
            </div>
            <div className="bg-[#1A2332] p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
              <div className="text-[#00B2FF] text-2xl mb-4">
                <FaLock />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
              <p>Industry-standard security protocols and data protection for all your API needs. Your data remains private and secure at all times.</p>
            </div>
            <div className="bg-[#1A2332] p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
              <div className="text-[#00B2FF] text-2xl mb-4">
                <FaCode />
              </div>
              <h3 className="text-xl font-semibold mb-2">Developer Friendly</h3>
              <p>Well-documented endpoints with examples and SDKs for popular languages. Start implementing in minutes, not hours.</p>
            </div>
          </div>
        </div>
        
        {/* Latest APIs Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#00B2FF]">Latest APIs</h2>
            <Link href="/apis">
              <span className="inline-flex items-center text-[#00B2FF] hover:text-[#00D4FF] transition-colors cursor-pointer">
                View all APIs <FaArrowRight className="ml-2" />
              </span>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[#1A2332] rounded-lg shadow-lg overflow-hidden border border-[#1A2332] h-full p-5">
                  <div className="flex justify-center items-center h-40">
                    <Spinner size="md" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestApis.map((api) => {
              const apiId = api.name.toLowerCase().replace(/\s+/g, '');
              return (
                <Link key={api.name} href={`/docs#${apiId}`}>
                  <div className="bg-[#1A2332] rounded-lg shadow-lg overflow-hidden border border-[#1A2332] hover:border-[#00B2FF] hover:shadow-[0_0_15px_rgba(0,178,255,0.15)] transition-all duration-300 h-full cursor-pointer group">
                    <div className="p-5">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold text-[#00B2FF] group-hover:text-[#00D4FF] transition-colors">{api.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          api.method === 'GET' 
                            ? 'bg-green-900/50 text-green-300 border border-green-700' 
                            : 'bg-blue-900/50 text-blue-300 border border-blue-700'
                        }`}>{api.method}</span>
                      </div>
                      
                      <p className="text-sm mb-3 text-[#D9E1E8]/90">{api.part_description}</p>
                      
                      <div className="mb-3">
                        <span className="text-xs text-gray-400">Endpoint:</span>
                        <code className="block bg-[#0D1525] p-2 mt-1 rounded text-[#00D4FF] overflow-x-auto text-xs font-mono">
                          {api.endpoint}
                        </code>
                      </div>
                      
                      <div className="flex justify-end">
                        <span className="inline-flex items-center mt-2 text-sm text-[#00B2FF] group-hover:text-[#00D4FF] transition-colors">
                          View documentation <FaArrowRight className="ml-1 transform group-hover:translate-x-1 transition-transform" size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="mb-24 py-12 bg-[#1A2332] rounded-lg shadow-md">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">Trusted by Developers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-[#00B2FF]">1M+</p>
              <p className="text-lg mt-2">API Requests Daily</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#00B2FF]">20K+</p>
              <p className="text-lg mt-2">Active Developers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#00B2FF]">99.9%</p>
              <p className="text-lg mt-2">Uptime Guarantee</p>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mb-24">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">More Reasons to Love SoftTouch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1A2332] p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
              <div className="text-[#00B2FF] text-2xl mb-4">
                <FaGlobe />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Infrastructure</h3>
              <p>Strategically located servers across the globe ensure low latency no matter where your users are.</p>
            </div>
            <div className="bg-[#1A2332] p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
              <div className="text-[#00B2FF] text-2xl mb-4">
                <FaRocket />
              </div>
              <h3 className="text-xl font-semibold mb-2">Continuous Updates</h3>
              <p>We're always adding new features and improving existing ones based on community feedback.</p>
            </div>
            <div className="bg-[#1A2332] p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
              <div className="text-[#00B2FF] text-2xl mb-4">
                <FaUserFriends />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
              <p>Join our active community of developers to share ideas, get help, and collaborate on projects.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Start building with our free APIs today. No credit card required, no hidden fees.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/docs">
              <span className="inline-block px-8 py-3 border border-[#00B2FF] text-[#00B2FF] rounded-md text-lg font-medium hover:bg-[#00B2FF] hover:text-[#0D1525] transition duration-300 cursor-pointer">
                Read the Docs
              </span>
            </Link>
            <Link href="/apis">
              <span className="inline-block px-8 py-3 border border-[#00B2FF] bg-[#00B2FF] text-[#0D1525] rounded-md text-lg font-medium hover:bg-transparent hover:text-[#00B2FF] transition duration-300 cursor-pointer">
                Explore APIs
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
