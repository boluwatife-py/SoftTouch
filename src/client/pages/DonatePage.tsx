import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { FaGithub, FaCode, FaServer, FaCoffee } from "react-icons/fa";
import SmoothNavLink from "@/components/SmoothNavLink";

export default function DonatePage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const buyMeACoffeeLink = "https://buymeacoffee.com/softtouch";

  return (
    <section className="animate-fadeIn py-8 sm:py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#00B2FF]">Support SoftTouch</h1>
          <p className="mt-1 sm:mt-2 text-base sm:text-lg md:text-xl">Keep our APIs 100% free with your help</p>
        </div>

        <div className="bg-[#1A2332] rounded-lg shadow-lg overflow-hidden p-4 sm:p-6 md:p-8 max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-12">
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
              SoftTouch provides completely free API services to developers worldwide—no rate limits, no API keys required. Your support on BuyMeACoffee helps us maintain servers, build new features, and keep these tools accessible to all. Every coffee counts!
            </p>
            
            <a
              href={buyMeACoffeeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-6 py-2 sm:py-3 bg-[#00B2FF] text-[#0D1525] rounded-md font-medium shadow-lg hover:bg-[#00D4FF] transition duration-200 text-sm sm:text-base"
            >
              Support Us on BuyMeACoffee
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 md:mt-12">
            <div 
              className={`border ${selectedPlan === 'basic' ? 'border-2' : 'border'} border-[#00B2FF] rounded-lg p-2 sm:p-3 md:p-4 text-center transition-all duration-200 ${selectedPlan === 'basic' ? 'bg-[#1e283b]' : ''}`}
              onClick={() => setSelectedPlan('basic')}
            >
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#00B2FF] mb-1 sm:mb-2 md:mb-3">$20 / month</h3>
              <p className="mb-1 sm:mb-2 md:mb-3 text-xs sm:text-sm md:text-base">Basic Supporter</p>
              <ul className="text-left mb-4 sm:mb-6">
                <li className="flex items-center mb-1 sm:mb-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mr-2" />
                  <span className="text-xs sm:text-sm">Name on our Supporters page</span>
                </li>
                <li className="flex items-center mb-1 sm:mb-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mr-2" />
                  <span className="text-xs sm:text-sm">Early access to new APIs</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mr-2" />
                  <span className="text-xs sm:text-sm">Monthly developer newsletter</span>
                </li>
              </ul>
              <a
                href={`${buyMeACoffeeLink}?amount=20&recurring=1`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full px-3 sm:px-4 py-1.5 sm:py-2 ${selectedPlan === 'basic' ? 'bg-[#00B2FF] text-[#0D1525]' : 'border border-[#00B2FF] text-[#00B2FF]'} rounded hover:bg-[#00D4FF] hover:text-[#0D1525] transition duration-200 text-xs sm:text-sm`}
              >
                {selectedPlan === 'basic' ? 'Selected' : 'Select'}
              </a>
            </div>
            
            <div 
              className={`${selectedPlan === 'pro' ? 'border-2' : 'border-2'} border-[#00B2FF] rounded-lg p-2 sm:p-3 md:p-4 text-center relative transition-all duration-200 ${selectedPlan === 'pro' ? 'bg-[#1e283b]' : ''}`}
              onClick={() => setSelectedPlan('pro')}
            >
              <div className="absolute top-0 transform -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#00B2FF] text-[#0D1525] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#00B2FF] mb-1 sm:mb-2 md:mb-3">$50 / month</h3>
              <p className="mb-1 sm:mb-2 md:mb-3 text-xs sm:text-sm md:text-base">Pro Supporter</p>
              <ul className="text-left mb-4 sm:mb-6">
                <li className="flex items-center mb-1 sm:mb-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mr-2" />
                  <span className="text-xs sm:text-sm">All Basic Supporter benefits</span>
                </li>
                <li className="flex items-center mb-1 sm:mb-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mr-2" />
                  <span className="text-xs sm:text-sm">Advanced documentation access</span>
                </li>
                <li className="flex items-center mb-1 sm:mb-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mr-2" />
                  <span className="text-xs sm:text-sm">Monthly developer newsletter</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mr-2" />
                  <span className="text-xs sm:text-sm">Priority support</span>
                </li>
              </ul>
              <a
                href={`${buyMeACoffeeLink}?amount=50&recurring=1`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full px-3 sm:px-4 py-1.5 sm:py-2 ${selectedPlan === 'pro' || !selectedPlan ? 'bg-[#00B2FF] text-[#0D1525]' : 'border border-[#00B2FF] text-[#00B2FF]'} rounded hover:bg-[#00D4FF] transition duration-200 text-xs sm:text-sm`}
              >
                {selectedPlan === 'pro' ? 'Selected' : 'Select'}
              </a>
            </div>
            
            <div 
              className={`border ${selectedPlan === 'enterprise' ? 'border-2' : 'border'} border-[#00B2FF] rounded-lg p-2 sm:p-3 md:p-4 text-center transition-all duration-200 ${selectedPlan === 'enterprise' ? 'bg-[#1e283b]' : ''}`}
              onClick={() => setSelectedPlan('enterprise')}
            >
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#00B2FF] mb-1 sm:mb-2 md:mb-3">$100 / month</h3>
              <p className="mb-1 sm:mb-2 md:mb-3 text-xs sm:text-sm md:text-base">Enterprise Supporter</p>
              <ul className="text-left mb-4 sm:mb-6">
                <li className="flex items-center mb-1 sm:mb-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mr-2" />
                  <span className="text-xs sm:text-sm">All Pro Supporter benefits</span>
                </li>
                <li className="flex items-center mb-1 sm:mb-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mr-2" />
                  <span className="text-xs sm:text-sm">Premium technical support</span>
                </li>
                <li className="flex items-center mb-1 sm:mb-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mr-2" />
                  <span className="text-xs sm:text-sm">Custom API consulting (2 hours/month)</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mr-2" />
                  <span className="text-xs sm:text-sm">Name and logo on sponsors page</span>
                </li>
              </ul>
              <a
                href={`${buyMeACoffeeLink}?amount=100&recurring=1`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full px-3 sm:px-4 py-1.5 sm:py-2 ${selectedPlan === 'enterprise' ? 'bg-[#00B2FF] text-[#0D1525]' : 'border border-[#00B2FF] text-[#00B2FF]'} rounded hover:bg-[#00B2FF] hover:text-[#0D1525] transition duration-200 text-xs sm:text-sm`}
              >
                {selectedPlan === 'enterprise' ? 'Selected' : 'Select'}
              </a>
            </div>
          </div>
        </div>

        {/* Other ways to contribute */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 md:mb-8 text-center">Other Ways to Support</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
            <div className="bg-[#1A2332] p-3 sm:p-4 md:p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-2 sm:mb-3 md:mb-4">
                <FaGithub className="text-lg sm:text-xl text-[#00B2FF] mr-2 sm:mr-3" />
                <h3 className="text-base sm:text-lg md:text-xl font-medium">Contribute Code</h3>
              </div>
              <p className="mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">
                Help us enhance our free APIs by contributing to our open-source projects on GitHub.
              </p>
              <SmoothNavLink to="/join" className="inline-flex items-center text-[#00B2FF] hover:underline text-xs sm:text-sm">
                View our GitHub repositories →
              </SmoothNavLink>
            </div>

            <div className="bg-[#1A2332] p-3 sm:p-4 md:p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-2 sm:mb-3 md:mb-4">
                <FaCode className="text-lg sm:text-xl text-[#00B2FF] mr-2 sm:mr-3" />
                <h3 className="text-base sm:text-lg md:text-xl font-medium">Share Your Projects</h3>
              </div>
              <p className="mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">
                Used our APIs in a cool project? Share it with us and inspire others in the SoftTouch community!
              </p>
              <button className="inline-flex items-center text-[#00B2FF] hover:underline text-xs sm:text-sm" onClick={(e) => e.preventDefault()}>
                Submit your project →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <div className="bg-[#1A2332] p-3 sm:p-4 md:p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-2 sm:mb-3 md:mb-4">
                <FaServer className="text-lg sm:text-xl text-[#00B2FF] mr-2 sm:mr-3" />
                <h3 className="text-base sm:text-lg md:text-xl font-medium">Provide Infrastructure</h3>
              </div>
              <p className="mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">
                Got extra server resources? Partner with us to help scale our free API services.
              </p>
              <SmoothNavLink to="/contact" className="inline-flex items-center text-[#00B2FF] hover:underline text-xs sm:text-sm">
                Contact us to discuss →
              </SmoothNavLink>
            </div>

            <div className="bg-[#1A2332] p-3 sm:p-4 md:p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-2 sm:mb-3 md:mb-4">
                <FaCoffee className="text-lg sm:text-xl text-[#00B2FF] mr-2 sm:mr-3" />
                <h3 className="text-base sm:text-lg md:text-xl font-medium">Buy Us a Coffee</h3>
              </div>
              <p className="mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">
                Want to make a one-time donation? Buy us a coffee on BuyMeACoffee and keep our team fueled!
              </p>
              <a
                href={buyMeACoffeeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#00B2FF] text-[#0D1525] rounded hover:bg-[#00D4FF] transition duration-200 text-xs sm:text-sm"
              >
                Buy Us a Coffee
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}