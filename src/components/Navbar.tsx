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
      // Don't close if clicking the menu button - that's handled by toggle
      if (mobileButtonRef.current?.contains(event.target as Node)) {
        return;
      }
      
      // Don't close if clicking inside the menu content
      if (mobileMenuRef.current?.contains(event.target as Node)) {
        return;
      }
      
      // Otherwise, close the menu
      setIsMenuOpen(false);
    }
    
    // Add listener with a delay to avoid conflicting with button click
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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-200 ${scrolled ? 'bg-[#0D1525]/95 backdrop-blur-sm shadow-lg' : 'bg-[#0D1525]'} border-b border-[#1A2332]`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <span className="text-[#00B2FF] font-bold text-xl md:text-2xl cursor-pointer hover:text-[#00D4FF] transition duration-150">
                SoftTouch
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/">
              <span className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                isActive("/") 
                  ? "bg-[#1A2332] text-[#00B2FF]" 
                  : "text-[#D9E1E8] hover:text-[#00D4FF] hover:bg-[#1A2332]/60 transition duration-150"
              }`}>
                Home
              </span>
            </Link>
            <Link href="/apis">
              <span className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                isActive("/apis") 
                  ? "bg-[#1A2332] text-[#00B2FF]" 
                  : "text-[#D9E1E8] hover:text-[#00D4FF] hover:bg-[#1A2332]/60 transition duration-150"
              }`}>
                APIs
              </span>
            </Link>
            <Link href="/docs">
              <span className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer flex items-center ${
                isActive("/docs") 
                  ? "bg-[#1A2332] text-[#00B2FF]" 
                  : "text-[#D9E1E8] hover:text-[#00D4FF] hover:bg-[#1A2332]/60 transition duration-150"
              }`}>
                <FaCode className="mr-1" size={14} />
                Docs
              </span>
            </Link>
            <Link href="/about">
              <span className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                isActive("/about") 
                  ? "bg-[#1A2332] text-[#00B2FF]" 
                  : "text-[#D9E1E8] hover:text-[#00D4FF] hover:bg-[#1A2332]/60 transition duration-150"
              }`}>
                About
              </span>
            </Link>
            <Link href="/faq">
              <span className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                isActive("/faq") 
                  ? "bg-[#1A2332] text-[#00B2FF]" 
                  : "text-[#D9E1E8] hover:text-[#00D4FF] hover:bg-[#1A2332]/60 transition duration-150"
              }`}>
                FAQ
              </span>
            </Link>
            <Link href="/statistics">
              <span className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer flex items-center ${
                isActive("/statistics") 
                  ? "bg-[#1A2332] text-[#00B2FF]" 
                  : "text-[#D9E1E8] hover:text-[#00D4FF] hover:bg-[#1A2332]/60 transition duration-150"
              }`}>
                <FaChartBar className="mr-1" size={14} />
                Stats
              </span>
            </Link>
            <Link href="/join">
              <span className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer flex items-center ${
                isActive("/join") 
                  ? "bg-[#1A2332] text-[#00B2FF]" 
                  : "text-[#D9E1E8] hover:text-[#00D4FF] hover:bg-[#1A2332]/60 transition duration-150"
              }`}>
                <FaUserPlus className="mr-1" size={14} />
                Join
              </span>
            </Link>
            <Link href="/donate">
              <span className={`ml-2 px-4 py-2 rounded-md text-sm font-medium cursor-pointer flex items-center ${
                isActive("/donate") 
                  ? "bg-[#00B2FF] text-[#0D1525]" 
                  : "bg-transparent border border-[#00B2FF] text-[#00B2FF] hover:bg-[#00B2FF] hover:text-[#0D1525] transition duration-150"
              }`}>
                <FaHeart className="mr-1" size={14} />
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
              className="inline-flex items-center justify-center p-2 rounded-md text-[#D9E1E8] hover:text-[#00D4FF] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#00B2FF]"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleMobileMenu();
              }}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        id="mobile-menu" 
        ref={mobileMenuRef}
        className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link href="/" onClick={handleLinkClick}>
            <span className={`block px-3 py-2 text-base font-medium cursor-pointer ${
              isActive("/")
                ? "bg-[#1A2332] text-[#00B2FF] border-l-2 border-[#00B2FF] pl-4"
                : "text-[#D9E1E8] hover:bg-[#1A2332] hover:text-[#00D4FF] transition duration-150"
            }`}>
              Home
            </span>
          </Link>
          <Link href="/apis" onClick={handleLinkClick}>
            <span className={`block px-3 py-2 text-base font-medium cursor-pointer ${
              isActive("/apis")
                ? "bg-[#1A2332] text-[#00B2FF] border-l-2 border-[#00B2FF] pl-4"
                : "text-[#D9E1E8] hover:bg-[#1A2332] hover:text-[#00D4FF] transition duration-150"
            }`}>
              APIs
            </span>
          </Link>
          <Link href="/docs" onClick={handleLinkClick}>
            <span className={`block px-3 py-2 text-base font-medium cursor-pointer ${
              isActive("/docs")
                ? "bg-[#1A2332] text-[#00B2FF] border-l-2 border-[#00B2FF] pl-4"
                : "text-[#D9E1E8] hover:bg-[#1A2332] hover:text-[#00D4FF] transition duration-150"
            }`}>
              Documentation
            </span>
          </Link>
          <Link href="/about" onClick={handleLinkClick}>
            <span className={`block px-3 py-2 text-base font-medium cursor-pointer ${
              isActive("/about")
                ? "bg-[#1A2332] text-[#00B2FF] border-l-2 border-[#00B2FF] pl-4"
                : "text-[#D9E1E8] hover:bg-[#1A2332] hover:text-[#00D4FF] transition duration-150"
            }`}>
              About Us
            </span>
          </Link>
          <Link href="/faq" onClick={handleLinkClick}>
            <span className={`block px-3 py-2 text-base font-medium cursor-pointer ${
              isActive("/faq")
                ? "bg-[#1A2332] text-[#00B2FF] border-l-2 border-[#00B2FF] pl-4"
                : "text-[#D9E1E8] hover:bg-[#1A2332] hover:text-[#00D4FF] transition duration-150"
            }`}>
              FAQ
            </span>
          </Link>
          <Link href="/statistics" onClick={handleLinkClick}>
            <span className={`block px-3 py-2 text-base font-medium cursor-pointer ${
              isActive("/statistics")
                ? "bg-[#1A2332] text-[#00B2FF] border-l-2 border-[#00B2FF] pl-4"
                : "text-[#D9E1E8] hover:bg-[#1A2332] hover:text-[#00D4FF] transition duration-150"
            }`}>
              API Statistics
            </span>
          </Link>
          <Link href="/contact" onClick={handleLinkClick}>
            <span className={`block px-3 py-2 text-base font-medium cursor-pointer ${
              isActive("/contact")
                ? "bg-[#1A2332] text-[#00B2FF] border-l-2 border-[#00B2FF] pl-4"
                : "text-[#D9E1E8] hover:bg-[#1A2332] hover:text-[#00D4FF] transition duration-150"
            }`}>
              Contact
            </span>
          </Link>
          <Link href="/join" onClick={handleLinkClick}>
            <span className={`block px-3 py-2 text-base font-medium cursor-pointer ${
              isActive("/join")
                ? "bg-[#1A2332] text-[#00B2FF] border-l-2 border-[#00B2FF] pl-4"
                : "text-[#D9E1E8] hover:bg-[#1A2332] hover:text-[#00D4FF] transition duration-150"
            }`}>
              Join Community
            </span>
          </Link>
          <Link href="/donate" onClick={handleLinkClick}>
            <span className={`block px-3 py-2 text-base font-medium cursor-pointer ${
              isActive("/donate")
                ? "bg-[#1A2332] text-[#00B2FF] border-l-2 border-[#00B2FF] pl-4"
                : "text-[#D9E1E8] hover:bg-[#1A2332] hover:text-[#00D4FF] transition duration-150"
            }`}>
              Support Us
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}