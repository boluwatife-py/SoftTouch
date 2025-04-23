import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "wouter";
import { FaCode, FaUserPlus, FaHeart, FaChartBar } from "react-icons/fa";

export default function Navbar() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  // Handle clicks outside the mobile menu
  useEffect(() => {
    if (!isMenuOpen) return;
    
    function handleClickOutside(event: MouseEvent) {
      if (mobileButtonRef.current?.contains(event.target as Node)) {
        return;
      }
      
      if (mobileMenuRef.current?.contains(event.target as Node)) {
        return;
      }
      
      setIsMenuOpen(false);
    }
    
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 10);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);
  
  // Handler for mobile menu link clicks
  const handleLinkClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0D1525]/95 backdrop-blur-sm shadow-lg' : 'bg-[#0D1525]'} border-b border-[#1A2332]`}>
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <span className="text-[#00B2FF] font-bold text-lg sm:text-xl md:text-2xl cursor-pointer hover:text-[#00D4FF] transition duration-200">
                SoftTouch
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/">
              <span className={`px-2.5 py-1.5 rounded-md text-xs sm:text-sm font-medium cursor-pointer transition-all duration-200 ${
                isActive("/") 
                  ? "bg-[#1A2332] text-[#00B2FF]" 
                  : "text-[#D9E1E8] hover:text-[#00D4FF] hover:bg-[#1A2332]/60"
              }`}>
                Home
              </span>
            </Link>
            <Link href="/apis">
              <span className={`px-2.5 py-1.5 rounded-md text-xs sm:text-sm font-medium cursor-pointer transition-all duration-200 ${
                isActive("/apis") 
                  ? "bg-[#1A2332] text-[#00B2FF]" 
                  : "text-[#D9E1E8] hover:text-[#00D4FF] hover:bg-[#1A2332]/60"
              }`}>
                APIs
              </span>
            </Link>
            <Link href="/docs">
              <span className={`px-2.5 py-1.5 rounded-md text-xs sm:text-sm font-medium cursor-pointer flex items-center transition-all duration-200 ${
                isActive("/docs") 
                  ? "bg-[#1A2332] text-[#00B2FF]" 
                  : "text-[#D9E1E8] hover:text-[#00D4FF] hover:bg-[#1A2332]/60"
              }`}>
                <FaCode className="mr-1" size={12} />
                Docs
              </span>
            </Link>
            <Link href="/about">
              <span className={`px-2.5 py-1.5 rounded-md text-xs sm:text-sm font-medium cursor-pointer transition-all duration-200 ${
                isActive("/about") 
                  ? "bg-[#1A2332] text-[#00B2FF]" 
                  : "text-[#D9E1E8] hover:text-[#00D4FF] hover:bg-[#1A2332]/60"
              }`}>
                About
              </span>
            </Link>
            <Link href="/faq">
              <span className={`px-2.5 py-1.5 rounded-md text-xs sm:text-sm font-medium cursor-pointer transition-all duration-200 ${
                isActive("/faq") 
                  ? "bg-[#1A2332] text-[#00B2FF]" 
                  : "text-[#D9E1E8] hover:text-[#00D4FF] hover:bg-[#1A2332]/60"
              }`}>
                FAQ
              </span>
            </Link>
            <Link href="/statistics">
              <span className={`px-2.5 py-1.5 rounded-md text-xs sm:text-sm font-medium cursor-pointer flex items-center transition-all duration-200 ${
                isActive("/statistics") 
                  ? "bg-[#1A2332] text-[#00B2FF]" 
                  : "text-[#D9E1E8] hover:text-[#00D4FF] hover:bg-[#1A2332]/60"
              }`}>
                <FaChartBar className="mr-1" size={12} />
                Stats
              </span>
            </Link>
            <Link href="/join">
              <span className={`px-2.5 py-1.5 rounded-md text-xs sm:text-sm font-medium cursor-pointer flex items-center transition-all duration-200 ${
                isActive("/join") 
                  ? "bg-[#1A2332] text-[#00B2FF]" 
                  : "text-[#D9E1E8] hover:text-[#00D4FF] hover:bg-[#1A2332]/60"
              }`}>
                <FaUserPlus className="mr-1" size={12} />
                Join
              </span>
            </Link>
            <Link href="/donate">
              <span className={`ml-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium cursor-pointer flex items-center transition-all duration-200 ${
                isActive("/donate") 
                  ? "bg-[#00B2FF] text-[#0D1525]" 
                  : "bg-transparent border border-[#00B2FF] text-[#00B2FF] hover:bg-[#00B2FF] hover:text-[#0D1525]"
              }`}>
                <FaHeart className="mr-1" size={12} />
                Support
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button 
              id="mobile-menu-button"
              ref={mobileButtonRef}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-[#D9E1E8] hover:text-[#00D4FF] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#00B2FF] transition-all duration-200"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleMobileMenu();
              }}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              <div className="relative w-5 h-5">
                <span className={`absolute block w-5 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-2.5' : 'top-1'}`}></span>
                <span className={`absolute block w-5 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'top-2.5'}`}></span>
                <span className={`absolute block w-5 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-2.5' : 'top-4'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        id="mobile-menu" 
        ref={mobileMenuRef}
        className={`md:hidden absolute top-full left-0 right-0 bg-[#0D1525] border-b border-[#1A2332] transform transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? "opacity-100 translate-y-0 visible" 
            : "opacity-0 -translate-y-4 invisible"
        }`}
      >
        <div className="pt-2 pb-3 space-y-1">
          <Link href="/" onClick={handleLinkClick}>
            <span className={`block px-3 py-2 text-sm font-medium cursor-pointer transition-all duration-200 ${
              isActive("/")
                ? "bg-[#1A2332] text-[#00B2FF] border-l-2 border-[#00B2FF] pl-4"
                : "text-[#D9E1E8] hover:bg-[#1A2332] hover:text-[#00D4FF]"
            }`}>
              Home
            </span>
          </Link>
          <Link href="/apis" onClick={handleLinkClick}>
            <span className={`block px-3 py-2 text-sm font-medium cursor-pointer transition-all duration-200 ${
              isActive("/apis")
                ? "bg-[#1A2332] text-[#00B2FF] border-l-2 border-[#00B2FF] pl-4"
                : "text-[#D9E1E8] hover:bg-[#1A2332] hover:text-[#00D4FF]"
            }`}>
              APIs
            </span>
          </Link>
          <Link href="/docs" onClick={handleLinkClick}>
            <span className={`block px-3 py-2 text-sm font-medium cursor-pointer transition-all duration-200 ${
              isActive("/docs")
                ? "bg-[#1A2332] text-[#00B2FF] border-l-2 border-[#00B2FF] pl-4"
                : "text-[#D9E1E8] hover:bg-[#1A2332] hover:text-[#00D4FF]"
            }`}>
              Documentation
            </span>
          </Link>
          <Link href="/about" onClick={handleLinkClick}>
            <span className={`block px-3 py-2 text-sm font-medium cursor-pointer transition-all duration-200 ${
              isActive("/about")
                ? "bg-[#1A2332] text-[#00B2FF] border-l-2 border-[#00B2FF] pl-4"
                : "text-[#D9E1E8] hover:bg-[#1A2332] hover:text-[#00D4FF]"
            }`}>
              About Us
            </span>
          </Link>
          <Link href="/faq" onClick={handleLinkClick}>
            <span className={`block px-3 py-2 text-sm font-medium cursor-pointer transition-all duration-200 ${
              isActive("/faq")
                ? "bg-[#1A2332] text-[#00B2FF] border-l-2 border-[#00B2FF] pl-4"
                : "text-[#D9E1E8] hover:bg-[#1A2332] hover:text-[#00D4FF]"
            }`}>
              FAQ
            </span>
          </Link>
          <Link href="/statistics" onClick={handleLinkClick}>
            <span className={`block px-3 py-2 text-sm font-medium cursor-pointer transition-all duration-200 ${
              isActive("/statistics")
                ? "bg-[#1A2332] text-[#00B2FF] border-l-2 border-[#00B2FF] pl-4"
                : "text-[#D9E1E8] hover:bg-[#1A2332] hover:text-[#00D4FF]"
            }`}>
              API Statistics
            </span>
          </Link>
          <Link href="/contact" onClick={handleLinkClick}>
            <span className={`block px-3 py-2 text-sm font-medium cursor-pointer transition-all duration-200 ${
              isActive("/contact")
                ? "bg-[#1A2332] text-[#00B2FF] border-l-2 border-[#00B2FF] pl-4"
                : "text-[#D9E1E8] hover:bg-[#1A2332] hover:text-[#00D4FF]"
            }`}>
              Contact
            </span>
          </Link>
          <Link href="/join" onClick={handleLinkClick}>
            <span className={`block px-3 py-2 text-sm font-medium cursor-pointer transition-all duration-200 ${
              isActive("/join")
                ? "bg-[#1A2332] text-[#00B2FF] border-l-2 border-[#00B2FF] pl-4"
                : "text-[#D9E1E8] hover:bg-[#1A2332] hover:text-[#00D4FF]"
            }`}>
              Join Community
            </span>
          </Link>
          <Link href="/donate" onClick={handleLinkClick}>
            <span className={`block px-3 py-2 text-sm font-medium cursor-pointer transition-all duration-200 ${
              isActive("/donate")
                ? "bg-[#1A2332] text-[#00B2FF] border-l-2 border-[#00B2FF] pl-4"
                : "text-[#D9E1E8] hover:bg-[#1A2332] hover:text-[#00D4FF]"
            }`}>
              Support Us
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}