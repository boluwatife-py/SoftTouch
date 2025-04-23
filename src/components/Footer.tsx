import { Link } from "wouter";
import { 
  FaGithub, FaTwitter, FaDiscord, FaYoutube, FaPaperPlane, 
  FaHeart, FaCode, FaQuestion, FaUsers, FaBook, FaEnvelope 
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1A2332] py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#00B2FF] mb-2 sm:mb-3">SoftTouch</h3>
            <p className="mb-3 sm:mb-4 text-[#D9E1E8] text-xs sm:text-sm">Free APIs for professional features. Build better applications without the cost.</p>
            <div className="flex space-x-4 mt-4 sm:mt-5">
              <a href="https://github.com/boluwatife-py/SoftTouch" target="_blank" rel="noopener noreferrer" className="text-[#00B2FF] hover:text-[#00D4FF] transition duration-150">
                <FaGithub size={18} />
              </a>
              <a href="https://twitter.com/softtouchApi" target="_blank" rel="noopener noreferrer" className="text-[#00B2FF] hover:text-[#00D4FF] transition duration-150">
                <FaTwitter size={18} />
              </a>
              <a href="https://discord.gg/wAGzpZXexg" target="_blank" rel="noopener noreferrer" className="text-[#00B2FF] hover:text-[#00D4FF] transition duration-150">
                <FaDiscord size={18} />
              </a>
              <a href="https://youtube.com/@softtouchApi" target="_blank" rel="noopener noreferrer" className="text-[#00B2FF] hover:text-[#00D4FF] transition duration-150">
                <FaYoutube size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#00B2FF] mb-2 sm:mb-3">Resources</h3>
            <ul className="space-y-2 sm:space-y-2.5">
              <li>
                <Link href="/docs">
                  <span className="flex items-center text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer text-xs sm:text-sm">
                    <FaCode className="mr-1.5 sm:mr-2 text-[#00B2FF]" size={14} />
                    Documentation
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/apis">
                  <span className="flex items-center text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer text-xs sm:text-sm">
                    <FaCode className="mr-1.5 sm:mr-2 text-[#00B2FF]" size={14} />
                    API Reference
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="flex items-center text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer text-xs sm:text-sm">
                    <FaUsers className="mr-1.5 sm:mr-2 text-[#00B2FF]" size={14} />
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <span className="flex items-center text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer text-xs sm:text-sm">
                    <FaQuestion className="mr-1.5 sm:mr-2 text-[#00B2FF]" size={14} />
                    FAQ
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/supporters">
                  <span className="flex items-center text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer text-xs sm:text-sm">
                    <FaHeart className="mr-1.5 sm:mr-2 text-[#00B2FF]" size={14} />
                    Our Supporters
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#00B2FF] mb-2 sm:mb-3">Support</h3>
            <ul className="space-y-2 sm:space-y-2.5">
              <li>
                <Link href="/join">
                  <span className="flex items-center text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer text-xs sm:text-sm">
                    <FaUsers className="mr-1.5 sm:mr-2 text-[#00B2FF]" size={14} />
                    Join Community
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/donate">
                  <span className="flex items-center text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer text-xs sm:text-sm">
                    <FaHeart className="mr-1.5 sm:mr-2 text-[#00B2FF]" size={14} />
                    Support Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="flex items-center text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer text-xs sm:text-sm">
                    <FaEnvelope className="mr-1.5 sm:mr-2 text-[#00B2FF]" size={14} />
                    Contact
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <span className="flex items-center text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer text-xs sm:text-sm">
                    <FaBook className="mr-1.5 sm:mr-2 text-[#00B2FF]" size={14} />
                    Terms & Conditions
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#00B2FF] mb-2 sm:mb-3">Newsletter</h3>
            <p className="mb-3 sm:mb-4 text-[#D9E1E8] text-xs sm:text-sm">Stay updated with our latest features and news.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-3 py-1.5 sm:px-4 sm:py-2 w-full bg-[#0D1525] text-[#D9E1E8] text-xs sm:text-sm border border-[#00B2FF] rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#00B2FF]" 
                required 
              />
              <button 
                type="submit" 
                className="bg-[#00B2FF] hover:bg-[#00D4FF] text-[#0D1525] px-3 py-1.5 sm:px-4 sm:py-2 rounded-r-md transition duration-150"
              >
                <FaPaperPlane size={14} />
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#2A3344] flex flex-col sm:flex-row justify-between items-center">
          <p className="text-[#D9E1E8] text-xs sm:text-sm">© 2025 SoftTouch. All rights reserved.</p>
          
          <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 mt-3 sm:mt-0">
            <Link href="/about">
              <span className="text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer text-xs sm:text-sm">About</span>
            </Link>
            <Link href="/faq">
              <span className="text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer text-xs sm:text-sm">FAQ</span>
            </Link>
            <Link href="/contact">
              <span className="text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer text-xs sm:text-sm">Contact</span>
            </Link>
            <Link href="/join">
              <span className="text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer text-xs sm:text-sm">Join</span>
            </Link>
            <Link href="/donate">
              <span className="text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer text-xs sm:text-sm">Donate</span>
            </Link>
            <Link href="/terms">
              <span className="text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer text-xs sm:text-sm">Terms</span>
            </Link>
            <Link href="/supporters">
              <span className="text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer text-xs sm:text-sm">Supporters</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
