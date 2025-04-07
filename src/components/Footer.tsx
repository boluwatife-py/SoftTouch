import { Link } from "wouter";
import { 
  FaGithub, FaTwitter, FaDiscord, FaYoutube, FaPaperPlane, 
  FaHeart, FaCode, FaQuestion, FaUsers, FaBook, FaEnvelope 
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1A2332] py-10 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-[#00B2FF] mb-4">SoftTouch</h3>
            <p className="mb-4 text-[#D9E1E8]">Free APIs for professional features. Build better applications without the cost.</p>
            <div className="flex space-x-5 mt-6">
              <a href="https://github.com/boluwatife-py/SoftTouch" target="_blank" rel="noopener noreferrer" className="text-[#00B2FF] hover:text-[#00D4FF] transition duration-150">
                <FaGithub size={22} />
              </a>
              <a href="https://twitter.com/softtouchApi" target="_blank" rel="noopener noreferrer" className="text-[#00B2FF] hover:text-[#00D4FF] transition duration-150">
                <FaTwitter size={22} />
              </a>
              <a href="https://discord.gg/softtouch" target="_blank" rel="noopener noreferrer" className="text-[#00B2FF] hover:text-[#00D4FF] transition duration-150">
                <FaDiscord size={22} />
              </a>
              <a href="https://youtube.com/@softtouchApi" target="_blank" rel="noopener noreferrer" className="text-[#00B2FF] hover:text-[#00D4FF] transition duration-150">
                <FaYoutube size={22} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-[#00B2FF] mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/docs">
                  <span className="flex items-center text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer">
                    <FaCode className="mr-2 text-[#00B2FF]" size={16} />
                    Documentation
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/apis">
                  <span className="flex items-center text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer">
                    <FaCode className="mr-2 text-[#00B2FF]" size={16} />
                    API Reference
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="flex items-center text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer">
                    <FaUsers className="mr-2 text-[#00B2FF]" size={16} />
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <span className="flex items-center text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer">
                    <FaQuestion className="mr-2 text-[#00B2FF]" size={16} />
                    FAQ
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/supporters">
                  <span className="flex items-center text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer">
                    <FaHeart className="mr-2 text-[#00B2FF]" size={16} />
                    Our Supporters
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-[#00B2FF] mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/join">
                  <span className="flex items-center text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer">
                    <FaUsers className="mr-2 text-[#00B2FF]" size={16} />
                    Join Community
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/donate">
                  <span className="flex items-center text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer">
                    <FaHeart className="mr-2 text-[#00B2FF]" size={16} />
                    Support Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="flex items-center text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer">
                    <FaEnvelope className="mr-2 text-[#00B2FF]" size={16} />
                    Contact
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <span className="flex items-center text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer">
                    <FaBook className="mr-2 text-[#00B2FF]" size={16} />
                    Terms & Conditions
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-[#00B2FF] mb-4">Newsletter</h3>
            <p className="mb-4 text-[#D9E1E8]">Stay updated with our latest features and news.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 w-full bg-[#0D1525] text-[#D9E1E8] border border-[#00B2FF] rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#00B2FF]" 
                required 
              />
              <button 
                type="submit" 
                className="bg-[#00B2FF] hover:bg-[#00D4FF] text-[#0D1525] px-4 py-2 rounded-r-md transition duration-150"
              >
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-10 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-[#D9E1E8]">© 2025 SoftTouch. All rights reserved.</p>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 sm:mt-0">
            <Link href="/about">
              <span className="text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer">About</span>
            </Link>
            <Link href="/faq">
              <span className="text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer">FAQ</span>
            </Link>
            <Link href="/contact">
              <span className="text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer">Contact</span>
            </Link>
            <Link href="/join">
              <span className="text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer">Join</span>
            </Link>
            <Link href="/donate">
              <span className="text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer">Donate</span>
            </Link>
            <Link href="/terms">
              <span className="text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer">Terms</span>
            </Link>
            <Link href="/supporters">
              <span className="text-[#D9E1E8] hover:text-[#00B2FF] transition duration-150 cursor-pointer">Supporters</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
