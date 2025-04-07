import { useState } from "react";
import { 
  FaGithub, FaYoutube, FaDiscord, FaTwitter, FaCode, 
  FaComments, FaBug, FaLightbulb, FaDollarSign, FaUsers 
} from "react-icons/fa";
import SmoothNavLink from "@/components/SmoothNavLink";

export default function JoinPage() {
  const [activeTab, setActiveTab] = useState("community"); // "community" or "contribute"

  return (
    <section className="animate-fadeIn py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#00B2FF]">Join SoftTouch</h1>
          <p className="mt-2 text-xl">Connect, build, and contribute</p>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-wrap justify-center border-b border-[#0D1525]">
            <button
              className={`px-6 py-3 text-lg font-medium ${activeTab === "community" ? "text-[#00B2FF] border-b-2 border-[#00B2FF]" : "text-gray-400 hover:text-gray-300"}`}
              onClick={() => setActiveTab("community")}
            >
              Community
            </button>
            <button
              className={`px-6 py-3 text-lg font-medium ${activeTab === "contribute" ? "text-[#00B2FF] border-b-2 border-[#00B2FF]" : "text-gray-400 hover:text-gray-300"}`}
              onClick={() => setActiveTab("contribute")}
            >
              Contribute
            </button>
          </div>
        </div>
        
        {/* Community Tab */}
        {activeTab === "community" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <a href="https://github.com/boluwatife-py/SoftTouch" target="_blank" rel="noopener noreferrer" className="bg-[#1A2332] rounded-lg shadow-lg p-8 text-center transition duration-300 transform hover:scale-105">
                <div className="text-4xl text-gray-300 mb-4">
                  <FaGithub className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-[#00B2FF] mb-2">GitHub</h3>
                <p>Explore our code, contribute, or report issues</p>
              </a>
              
              <a href="https://youtube.com/@softtouchApi" target="_blank" rel="noopener noreferrer" className="bg-[#1A2332] rounded-lg shadow-lg p-8 text-center transition duration-300 transform hover:scale-105">
                <div className="text-4xl text-red-500 mb-4">
                  <FaYoutube className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-[#00B2FF] mb-2">YouTube</h3>
                <p>Watch tutorials and stay updated with our latest features</p>
              </a>
              
              <a href="https://discord.gg/softtouch" target="_blank" rel="noopener noreferrer" className="bg-[#1A2332] rounded-lg shadow-lg p-8 text-center transition duration-300 transform hover:scale-105">
                <div className="text-4xl text-indigo-500 mb-4">
                  <FaDiscord className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-[#00B2FF] mb-2">Discord</h3>
                <p>Join discussions and get help from our community</p>
              </a>
              
              <a href="https://twitter.com/softtouchApi" target="_blank" rel="noopener noreferrer" className="bg-[#1A2332] rounded-lg shadow-lg p-8 text-center transition duration-300 transform hover:scale-105">
                <div className="text-4xl text-blue-400 mb-4">
                  <FaTwitter className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-[#00B2FF] mb-2">Twitter</h3>
                <p>Follow us for news and announcements</p>
              </a>
            </div>
            
            <div className="mt-16 max-w-2xl mx-auto bg-[#1A2332] rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-[#00B2FF] mb-6 text-center">Get Involved</h2>
              <p className="mb-6">
                We welcome contributions from developers of all skill levels. Here are some ways you can get involved:
              </p>
              
              <ul className="list-disc pl-6 space-y-3 mb-8">
                <li>Contribute to our open-source projects on GitHub</li>
                <li>Help improve our documentation</li>
                <li>Create tutorials or guides for using our APIs</li>
                <li>Share your projects built with SoftTouch APIs</li>
                <li>Report bugs or suggest new features</li>
                <li>Financially support our project through donations</li>
              </ul>
              
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setActiveTab("contribute")}
                  className="px-6 py-2 border border-[#00B2FF] text-[#00B2FF] rounded-md hover:bg-[#00B2FF] hover:text-[#0D1525] transition duration-200"
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
            <div className="bg-[#1A2332] p-8 rounded-lg shadow-lg mb-8">
              <div className="flex items-center mb-6">
                <FaGithub className="text-3xl text-[#00B2FF] mr-4" />
                <h2 className="text-2xl font-semibold">Contribute to SoftTouch</h2>
              </div>
              
              <p className="mb-6">
                SoftTouch is an open-source project that relies on contributions from developers like you. 
                There are many ways to contribute, from writing code and improving documentation to 
                reporting bugs and suggesting new features.
              </p>
              
              <div className="flex justify-center">
                <a 
                  href="https://github.com/boluwatife-py/SoftTouch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-[#0D1525] text-[#00B2FF] rounded-md hover:bg-[#162231] transition duration-200"
                >
                  <FaGithub className="mr-2" /> View on GitHub
                </a>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-6 text-center">Ways to Contribute</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#1A2332] p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <FaCode className="text-xl text-[#00B2FF] mr-3" />
                  <h4 className="text-lg font-medium">Code Contributions</h4>
                </div>
                <p>
                  Help us improve existing APIs or develop new ones. Our codebase primarily uses 
                  Node.js, Python, and Go. Check our GitHub issues for good first contributions.
                </p>
              </div>
              
              <div className="bg-[#1A2332] p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <FaComments className="text-xl text-[#00B2FF] mr-3" />
                  <h4 className="text-lg font-medium">Documentation</h4>
                </div>
                <p>
                  Help improve our documentation by fixing errors, adding examples, or 
                  creating tutorials that show how to use our APIs effectively.
                </p>
              </div>
              
              <div className="bg-[#1A2332] p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <FaBug className="text-xl text-[#00B2FF] mr-3" />
                  <h4 className="text-lg font-medium">Bug Reports</h4>
                </div>
                <p>
                  Found a bug? Report it on our GitHub issue tracker with details about 
                  the problem, steps to reproduce, and your environment.
                </p>
              </div>
              
              <div className="bg-[#1A2332] p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <FaLightbulb className="text-xl text-[#00B2FF] mr-3" />
                  <h4 className="text-lg font-medium">Feature Requests</h4>
                </div>
                <p>
                  Have an idea for a new API or feature? Share it with the community 
                  to gather feedback and potentially get it implemented.
                </p>
              </div>
            </div>
            
            <div className="bg-[#1A2332] p-6 rounded-lg shadow-md mb-8">
              <div className="flex items-center mb-4">
                <FaDollarSign className="text-xl text-[#00B2FF] mr-3" />
                <h4 className="text-lg font-medium">Financial Support</h4>
              </div>
              <p className="mb-4">
                SoftTouch is committed to providing free APIs for everyone. Your financial support helps us 
                maintain our infrastructure and continue developing new features.
              </p>
              <div className="flex justify-center">
                <SmoothNavLink 
                  to="/donate"
                  className="inline-flex items-center px-6 py-3 bg-[#00B2FF] text-[#0D1525] rounded-md hover:bg-[#00D4FF] transition duration-200"
                >
                  Support SoftTouch
                </SmoothNavLink>
              </div>
            </div>
            
            <div className="bg-[#1A2332] p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <FaUsers className="text-xl text-[#00B2FF] mr-3" />
                <h4 className="text-lg font-medium">Contributor Community</h4>
              </div>
              <p className="mb-4">
                Join our community of contributors on Discord to discuss ideas, get help with your 
                contributions, and collaborate with other developers.
              </p>
              <div className="flex justify-center">
                <a
                  href="https://discord.gg/softtouch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-[#00B2FF] text-[#00B2FF] rounded-md hover:bg-[#00B2FF] hover:text-[#0D1525] transition duration-200"
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
