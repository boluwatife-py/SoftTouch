import { Link } from "wouter";
import { FaBolt, FaLock, FaCode, FaGlobe, FaRocket, FaUserFriends, FaArrowRight, FaDatabase, FaCloud, FaShieldAlt, FaTools, FaClock, FaChartLine, FaServer, FaLightbulb, FaCogs } from "react-icons/fa";
import { useEffect, useState } from "react";
import { apis, ApiType } from "../data/apis";
import Spinner from "@/components/Spinner";

export default function HomePage() {
  const [apiData, setApiData] = useState<ApiType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFeature, setActiveFeature] = useState(0);

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

  const latestApis = apiData.slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="animate-fadeIn py-16 md:py-24 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#00B2FF]/10 to-[#00D4FF]/10 blur-3xl -top-64 -left-64 animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-l from-[#00B2FF]/10 to-[#00D4FF]/10 blur-3xl -bottom-64 -right-64 animate-pulse"></div>
        <div className="absolute w-32 h-32 rounded-full bg-[#00BFFF]/20 blur-3xl top-1/4 left-1/3 animate-blob"></div>
        <div className="absolute w-32 h-32 rounded-full bg-[#00B2FF]/20 blur-3xl bottom-1/4 right-1/3 animate-blob" style={{animationDelay: '2s'}}></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMxYTM2OGIiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-10"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00B2FF] to-[#00D4FF] animate-slideIn">
              SoftTouch
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fadeIn opacity-90 text-[#D9E1E8]">
              Empower your applications with our enterprise-grade APIs. 
              Build faster, scale better, and innovate without limits.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/apis">
                <span className="inline-block px-8 py-4 border-2 border-[#00B2FF] bg-[#00B2FF] text-[#0D1525] rounded-md text-lg font-medium shadow-lg hover:bg-transparent hover:text-[#00B2FF] transition-all duration-300 transform hover:scale-105">
                  Get Started
                </span>
              </Link>
              <Link href="/docs">
                <span className="inline-block px-8 py-4 border-2 border-[#00B2FF] text-[#00B2FF] rounded-md text-lg font-medium shadow-lg hover:bg-[#00B2FF] hover:text-[#0D1525] transition-all duration-300 transform hover:scale-105">
                  View Documentation
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { icon: FaServer, value: "99.9%", label: "Uptime" },
            { icon: FaChartLine, value: "50M+", label: "API Calls" },
            { icon: FaUserFriends, value: "10K+", label: "Developers" },
            { icon: FaGlobe, value: "150+", label: "Countries" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-[#1A2332]/80 backdrop-blur-sm p-6 rounded-lg text-center transform transition-all duration-300 hover:scale-105">
              <stat.icon className="text-[#00B2FF] text-3xl mx-auto mb-3" />
              <div className="text-2xl font-bold text-[#00B2FF] mb-1">{stat.value}</div>
              <div className="text-[#D9E1E8]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#00B2FF]">Why Choose SoftTouch?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FaBolt, title: "Lightning Fast", desc: "Sub-100ms response times with global edge deployment" },
              { icon: FaLock, title: "Bank-Grade Security", desc: "Enterprise-level encryption and security protocols" },
              { icon: FaCloud, title: "Auto-Scaling", desc: "Seamlessly handle millions of requests per second" },
              { icon: FaCogs, title: "Easy Integration", desc: "Simple SDK integration with extensive documentation" },
              { icon: FaLightbulb, title: "Smart Analytics", desc: "Real-time insights and usage monitoring" },
              { icon: FaShieldAlt, title: "24/7 Support", desc: "Round-the-clock expert technical assistance" }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="bg-[#1A2332]/80 backdrop-blur-sm p-8 rounded-lg transform transition-all duration-300 hover:scale-105 hover:bg-[#1A2332]/90"
              >
                <feature.icon className="text-[#00B2FF] text-3xl mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-[#00B2FF]">{feature.title}</h3>
                <p className="text-[#D9E1E8]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Latest APIs Section */}
        <div className="mb-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-[#00B2FF]">Latest APIs</h2>
            <Link href="/apis">
              <span className="inline-flex items-center text-[#00B2FF] hover:text-[#00D4FF] transition-colors group">
                View all APIs <FaArrowRight className="ml-2 transform group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[#1A2332]/80 backdrop-blur-sm rounded-lg p-6 h-[200px] flex items-center justify-center">
                  <Spinner size="md" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestApis.map((api) => (
                <Link key={api.name} href={`/docs#${api.name.toLowerCase()}`}>
                  <div className="bg-[#1A2332]/80 backdrop-blur-sm p-6 rounded-lg border border-transparent hover:border-[#00B2FF] transition-all duration-300 group cursor-pointer">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-[#00B2FF] group-hover:text-[#00D4FF]">{api.name}</h3>
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        api.method === 'GET' 
                          ? 'bg-green-900/50 text-green-300 border border-green-700' 
                          : 'bg-blue-900/50 text-blue-300 border border-blue-700'
                      }`}>{api.method}</span>
                    </div>
                    <p className="text-[#D9E1E8] mb-4">{api.part_description}</p>
                    <code className="block bg-[#0D1525] p-3 rounded text-[#00D4FF] text-sm font-mono overflow-x-auto">
                      {api.endpoint}
                    </code>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-[#1A2332]/80 backdrop-blur-sm p-12 rounded-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#00B2FF]">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-[#D9E1E8]">
            Join thousands of developers building amazing applications with SoftTouch APIs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/docs">
              <span className="inline-block px-8 py-4 border-2 border-[#00B2FF] text-[#00B2FF] rounded-md text-lg font-medium hover:bg-[#00B2FF] hover:text-[#0D1525] transition-all duration-300 transform hover:scale-105">
                Read Documentation
              </span>
            </Link>
            <Link href="/apis">
              <span className="inline-block px-8 py-4 border-2 border-[#00B2FF] bg-[#00B2FF] text-[#0D1525] rounded-md text-lg font-medium hover:bg-transparent hover:text-[#00B2FF] transition-all duration-300 transform hover:scale-105">
                Start Building
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}