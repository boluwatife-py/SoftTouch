import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { FaGithub, FaCode, FaServer, FaCoffee } from "react-icons/fa";
import SmoothNavLink from "../components/SmoothNavLink";

export default function DonatePage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const buyMeACoffeeLink = "https://buymeacoffee.com/softtouch";

  return (
    <section className="animate-fadeIn py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#00B2FF]">Support SoftTouch</h1>
          <p className="mt-2 text-xl">Keep our APIs 100% free with your help</p>
        </div>

        <div className="bg-[#1A2332] rounded-lg shadow-lg overflow-hidden p-8 max-w-4xl mx-auto mb-12">
          <div className="text-center mb-8">
            <p className="text-lg mb-6">
              SoftTouch provides completely free API services to developers worldwide—no rate limits, no API keys required. Your support on BuyMeACoffee helps us maintain servers, build new features, and keep these tools accessible to all. Every coffee counts!
            </p>
            
            <a
              href={buyMeACoffeeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#00B2FF] text-[#0D1525] rounded-md font-medium shadow-lg hover:bg-[#00D4FF] transition duration-200"
            >
              Support Us on BuyMeACoffee
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div 
              className={`border ${selectedPlan === 'basic' ? 'border-2' : 'border'} border-[#00B2FF] rounded-lg p-6 text-center transition-all duration-200 ${selectedPlan === 'basic' ? 'bg-[#1e283b]' : ''}`}
              onClick={() => setSelectedPlan('basic')}
            >
              <h3 className="text-xl font-semibold text-[#00B2FF] mb-4">$10 / month</h3>
              <p className="mb-4">Basic Supporter</p>
              <ul className="text-left mb-6">
                <li className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  Name on our Supporters page
                </li>
                <li className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  Early access to new APIs
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  Monthly developer newsletter
                </li>
              </ul>
              <a
                href={`${buyMeACoffeeLink}?amount=10&recurring=1`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full px-4 py-2 ${selectedPlan === 'basic' ? 'bg-[#00B2FF] text-[#0D1525]' : 'border border-[#00B2FF] text-[#00B2FF]'} rounded hover:bg-[#00D4FF] hover:text-[#0D1525] transition duration-200`}
              >
                {selectedPlan === 'basic' ? 'Selected' : 'Select'}
              </a>
            </div>
            
            <div 
              className={`${selectedPlan === 'pro' ? 'border-2' : 'border-2'} border-[#00B2FF] rounded-lg p-6 text-center relative transition-all duration-200 ${selectedPlan === 'pro' ? 'bg-[#1e283b]' : ''}`}
              onClick={() => setSelectedPlan('pro')}
            >
              <div className="absolute top-0 transform -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#00B2FF] text-[#0D1525] px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold text-[#00B2FF] mb-4">$15 / month</h3>
              <p className="mb-4">Pro Supporter</p>
              <ul className="text-left mb-6">
                <li className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  All Basic Supporter benefits
                </li>
                <li className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  Advanced documentation access
                </li>
                <li className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  Monthly developer newsletter
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  Priority support
                </li>
              </ul>
              <a
                href={`${buyMeACoffeeLink}?amount=15&recurring=1`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full px-4 py-2 ${selectedPlan === 'pro' || !selectedPlan ? 'bg-[#00B2FF] text-[#0D1525]' : 'border border-[#00B2FF] text-[#00B2FF]'} rounded hover:bg-[#00D4FF] transition duration-200`}
              >
                {selectedPlan === 'pro' ? 'Selected' : 'Select'}
              </a>
            </div>
            
            <div 
              className={`border ${selectedPlan === 'enterprise' ? 'border-2' : 'border'} border-[#00B2FF] rounded-lg p-6 text-center transition-all duration-200 ${selectedPlan === 'enterprise' ? 'bg-[#1e283b]' : ''}`}
              onClick={() => setSelectedPlan('enterprise')}
            >
              <h3 className="text-xl font-semibold text-[#00B2FF] mb-4">$30 / month</h3>
              <p className="mb-4">Enterprise Supporter</p>
              <ul className="text-left mb-6">
                <li className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  All Pro Supporter benefits
                </li>
                <li className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  Premium technical support
                </li>
                <li className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  Custom API consulting (2 hours/month)
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  Name and logo on sponsors page
                </li>
              </ul>
              <a
                href={`${buyMeACoffeeLink}?amount=30&recurring=1`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full px-4 py-2 ${selectedPlan === 'enterprise' ? 'bg-[#00B2FF] text-[#0D1525]' : 'border border-[#00B2FF] text-[#00B2FF]'} rounded hover:bg-[#00B2FF] hover:text-[#0D1525] transition duration-200`}
              >
                {selectedPlan === 'enterprise' ? 'Selected' : 'Select'}
              </a>
            </div>
          </div>
        </div>

        {/* Other ways to contribute */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Other Ways to Support</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#1A2332] p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <FaGithub className="text-xl text-[#00B2FF] mr-3" />
                <h3 className="text-xl font-medium">Contribute Code</h3>
              </div>
              <p className="mb-4">
                Help us enhance our free APIs by contributing to our open-source projects on GitHub.
              </p>
              <SmoothNavLink to="/join" className="inline-flex items-center text-[#00B2FF] hover:underline">
                View our GitHub repositories →
              </SmoothNavLink>
            </div>

            <div className="bg-[#1A2332] p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <FaCode className="text-xl text-[#00B2FF] mr-3" />
                <h3 className="text-xl font-medium">Share Your Projects</h3>
              </div>
              <p className="mb-4">
                Used our APIs in a cool project? Share it with us and inspire others in the SoftTouch community!
              </p>
              <button className="inline-flex items-center text-[#00B2FF] hover:underline" onClick={(e) => e.preventDefault()}>
                Submit your project →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1A2332] p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <FaServer className="text-xl text-[#00B2FF] mr-3" />
                <h3 className="text-xl font-medium">Provide Infrastructure</h3>
              </div>
              <p className="mb-4">
                Got extra server resources? Partner with us to help scale our free API services.
              </p>
              <SmoothNavLink to="/contact" className="inline-flex items-center text-[#00B2FF] hover:underline">
                Contact us to discuss →
              </SmoothNavLink>
            </div>

            <div className="bg-[#1A2332] p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <FaCoffee className="text-xl text-[#00B2FF] mr-3" />
                <h3 className="text-xl font-medium">Buy Us a Coffee</h3>
              </div>
              <p className="mb-4">
                Want to make a one-time donation? Buy us a coffee on BuyMeACoffee and keep our team fueled!
              </p>
              <a
                href={buyMeACoffeeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#00B2FF] text-[#0D1525] rounded hover:bg-[#00D4FF] transition duration-200"
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