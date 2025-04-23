import { useState } from "react";
import { 
  FaGithub, FaYoutube, FaDiscord, FaTwitter, FaCode, 
  FaComments, FaBug, FaLightbulb, FaDollarSign, FaUsers 
} from "react-icons/fa";
import SmoothNavLink from "@/components/SmoothNavLink";

export default function JoinPage() {
  const [activeTab, setActiveTab] = useState("community");

  return (
    <section className="animate-fadeIn py-8 sm:py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#00B2FF]">Join SoftTouch</h1>
          <p className="mt-1 sm:mt-2 text-base sm:text-lg md:text-xl">Connect, build, and contribute</p>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-4xl mx-auto mb-4 sm:mb-6 md:mb-8">
          <div className="flex flex-wrap justify-center border-b border-[#0D1525]">
            <button
              className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base md:text-lg font-medium ${activeTab === "community" ? "text-[#00B2FF] border-b-2 border-[#00B2FF]" : "text-gray-400 hover:text-gray-300"}`}
              onClick={() => setActiveTab("community")}
            >
              Community
            </button>
            <button
              className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base md:text-lg font-medium ${activeTab === "contribute" ? "text-[#00B2FF] border-b-2 border-[#00B2FF]" : "text-gray-400 hover:text-gray-300"}`}
              onClick={() => setActiveTab("contribute")}
            >
              Contribute
            </button>
          </div>
        </div>
        
        {/* Community Tab */}
        {activeTab === "community" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
              <a href="https://github.com/boluwatife-py/SoftTouch" target="_blank" rel="noopener noreferrer" className="bg-[#1A2332] rounded-lg shadow-lg p-4 sm:p-6 md:p-8 text-center transition duration-300 transform hover:scale-105">
                <div className="text-2xl sm:text-3xl md:text-4xl text-gray-300 mb-2 sm:mb-3 md:mb-4">
                  <FaGithub className="mx-auto" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#00B2FF] mb-1 sm:mb-2">GitHub</h3>
                <p className="text-xs sm:text-sm md:text-base">Explore our code, contribute, or report issues</p>
              </a>
              
              <a href="https://youtube.com/@softtouchApi" target="_blank" rel="noopener noreferrer" className="bg-[#1A2332] rounded-lg shadow-lg p-4 sm:p-6 md:p-8 text-center transition duration-300 transform hover:scale-105">
                <div className="text-2xl sm:text-3xl md:text-4xl text-red-500 mb-2 sm:mb-3 md:mb-4">
                  <FaYoutube className="mx-auto" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#00B2FF] mb-1 sm:mb-2">YouTube</h3>
                <p className="text-xs sm:text-sm md:text-base">Watch tutorials and stay updated with our latest features</p>
              </a>
              
              <a href="https://discord.gg/wAGzpZXexg" target="_blank" rel="noopener noreferrer" className="bg-[#1A2332] rounded-lg shadow-lg p-4 sm:p-6 md:p-8 text-center transition duration-300 transform hover:scale-105">
                <div className="text-2xl sm:text-3xl md:text-4xl text-indigo-500 mb-2 sm:mb-3 md:mb-4">
                  <FaDiscord className="mx-auto" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#00B2FF] mb-1 sm:mb-2">Discord</h3>
                <p className="text-xs sm:text-sm md:text-base">Join discussions and get help from our community</p>
              </a>
              
              <a href="https://twitter.com/softtouchApi" target="_blank" rel="noopener noreferrer" className="bg-[#1A2332] rounded-lg shadow-lg p-4 sm:p-6 md:p-8 text-center transition duration-300 transform hover:scale-105">
                <div className="text-2xl sm:text-3xl md:text-4xl text-blue-400 mb-2 sm:mb-3 md:mb-4">
                  <FaTwitter className="mx-auto" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#00B2FF] mb-1 sm:mb-2">Twitter</h3>
                <p className="text-xs sm:text-sm md:text-base">Follow us for news and announcements</p>
              </a>
            </div>
            
            <div className="mt-8 sm:mt-12 md:mt-16 max-w-2xl mx-auto bg-[#1A2332] rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#00B2FF] mb-4 sm:mb-6 text-center">Get Involved</h2>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                We welcome contributions from developers of all skill levels. Here are some ways you can get involved:
              </p>
              
              <ul className="list-disc pl-4 sm:pl-6 space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-sm sm:text-base">
                <li>Contribute to our open-source projects on GitHub</li>
                <li>Help improve our documentation</li>
                <li>Create tutorials or guides for using our APIs</li>
                <li>Share your projects built with SoftTouch APIs</li>
                <li>Report bugs or suggest new features</li>
                <li>Financially support our project through donations</li>
              </ul>
              
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
                <button
                  onClick={() => setActiveTab("contribute")}
                  className="px-4 sm:px-6 py-2 sm:py-3 border border-[#00B2FF] text-[#00B2FF] rounded-md hover:bg-[#00B2FF] hover:text-[#0D1525] transition duration-200 text-xs sm:text-sm"
                >
                  How to Contribute
                </button>
              </div>
            </div>
          </>
        )}

        {/* Contribute Tab */}
        {activeTab === "contribute" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#1A2332] p-4 sm:p-6 md:p-8 rounded-lg shadow-lg mb-4 sm:mb-6 md:mb-8">
              <div className="flex items-center mb-4 sm:mb-6">
                <FaGithub className="text-2xl sm:text-3xl text-[#00B2FF] mr-3 sm:mr-4" />
                <h2 className="text-xl sm:text-2xl font-semibold">Contribute to SoftTouch</h2>
              </div>
              
              <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                SoftTouch is an open-source project that relies on contributions from developers like you. 
                There are many ways to contribute, from writing code and improving documentation to 
                reporting bugs and suggesting new features.
              </p>
              
              <div className="flex justify-center">
                <a 
                  href="https://github.com/boluwatife-py/SoftTouch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-[#0D1525] text-[#00B2FF] rounded-md hover:bg-[#162231] transition duration-200 text-xs sm:text-sm"
                >
                  <FaGithub className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> View on GitHub
                </a>
              </div>
            </div>
            
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center">Ways to Contribute</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
              <div className="bg-[#1A2332] p-4 sm:p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-3 sm:mb-4">
                  <FaCode className="text-lg sm:text-xl text-[#00B2FF] mr-2 sm:mr-3" />
                  <h4 className="text-base sm:text-lg font-medium">Code Contributions</h4>
                </div>
                <p className="text-sm sm:text-base">
                  Help us improve existing APIs or develop new ones. Our codebase primarily uses 
                  Node.js, Python, and Go. Check our GitHub issues for good first contributions.
                </p>
              </div>
              
              <div className="bg-[#1A2332] p-4 sm:p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-3 sm:mb-4">
                  <FaComments className="text-lg sm:text-xl text-[#00B2FF] mr-2 sm:mr-3" />
                  <h4 className="text-base sm:text-lg font-medium">Documentation</h4>
                </div>
                <p className="text-sm sm:text-base">
                  Help improve our documentation by fixing errors, adding examples, or 
                  creating tutorials that show how to use our APIs effectively.
                </p>
              </div>
              
              <div className="bg-[#1A2332] p-4 sm:p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-3 sm:mb-4">
                  <FaBug className="text-lg sm:text-xl text-[#00B2FF] mr-2 sm:mr-3" />
                  <h4 className="text-base sm:text-lg font-medium">Bug Reports</h4>
                </div>
                <p className="text-sm sm:text-base">
                  Found a bug? Report it on our GitHub issue tracker with details about 
                  the problem, steps to reproduce, and your environment.
                </p>
              </div>
              
              <div className="bg-[#1A2332] p-4 sm:p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-3 sm:mb-4">
                  <FaLightbulb className="text-lg sm:text-xl text-[#00B2FF] mr-2 sm:mr-3" />
                  <h4 className="text-base sm:text-lg font-medium">Feature Requests</h4>
                </div>
                <p className="text-sm sm:text-base">
                  Have an idea for a new API or feature? Share it with the community 
                  to gather feedback and potentially get it implemented.
                </p>
              </div>
            </div>
            
            <div className="bg-[#1A2332] p-4 sm:p-6 rounded-lg shadow-md mb-4 sm:mb-6 md:mb-8">
              <div className="flex items-center mb-3 sm:mb-4">
                <FaDollarSign className="text-lg sm:text-xl text-[#00B2FF] mr-2 sm:mr-3" />
                <h4 className="text-base sm:text-lg font-medium">Financial Support</h4>
              </div>
              <p className="mb-4 text-sm sm:text-base">
                SoftTouch is committed to providing free APIs for everyone. Your financial support helps us 
                maintain our infrastructure and continue developing new features.
              </p>
              <div className="flex justify-center">
                <SmoothNavLink 
                  to="/donate"
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-[#00B2FF] text-[#0D1525] rounded-md hover:bg-[#00D4FF] transition duration-200 text-xs sm:text-sm"
                >
                  Support SoftTouch
                </SmoothNavLink>
              </div>
            </div>
            
            <div className="bg-[#1A2332] p-4 sm:p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-3 sm:mb-4">
                <FaUsers className="text-lg sm:text-xl text-[#00B2FF] mr-2 sm:mr-3" />
                <h4 className="text-base sm:text-lg font-medium">Contributor Community</h4>
              </div>
              <p className="mb-4 text-sm sm:text-base">
                Join our community of contributors on Discord to discuss ideas, get help with your 
                contributions, and collaborate with other developers.
              </p>
              <div className="flex justify-center">
                <a
                  href="https://discord.gg/wAGzpZXexg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-[#00B2FF] text-[#00B2FF] rounded-md hover:bg-[#00B2FF] hover:text-[#0D1525] transition duration-200 text-xs sm:text-sm"
                >
                  Join our Discord
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
