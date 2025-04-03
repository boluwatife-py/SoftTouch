import React, { useEffect } from 'react';

interface SmoothNavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  hash?: string;
  children: React.ReactNode;
  className?: string;
}

// Add a global click handler to handle synthetic smooth navigation links
if (typeof window !== 'undefined') {
  document.addEventListener('click', (e) => {
    // Only handle click events from elements with the data-smooth-link attribute
    const target = e.target as HTMLElement;
    const smoothLink = target.closest('[data-smooth-link]') as HTMLAnchorElement;
    
    if (smoothLink && smoothLink.href) {
      e.preventDefault();
      
      const url = new URL(smoothLink.href);
      const to = url.pathname;
      const hash = url.hash.substring(1); // Remove the # character
      
      // If already on the same page, just scroll to element
      if (window.location.pathname === to && hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }
      
      // Change URL without reload
      window.history.pushState({}, '', to + (hash ? `#${hash}` : ''));
      
      // Scroll to top by default
      window.scrollTo(0, 0);
      
      // If hash is provided, try to scroll to that element
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100); // Small delay to ensure element is available
      }
    }
  });
}

/**
 * A component for client-side navigation without page reloads
 * If hash is provided, it will scroll to that element
 */
export default function SmoothNavLink({ 
  to, 
  hash, 
  children, 
  className = '', 
  onClick,
  ...props 
}: SmoothNavLinkProps) {
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Allow parent onClick to execute if provided
    if (onClick) {
      onClick(e);
    }
    
    // If already on the same page, just scroll to element
    if (window.location.pathname === to && hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }
    
    // Change URL without reload
    window.history.pushState({}, '', to + (hash ? `#${hash}` : ''));
    
    // Scroll to top by default
    window.scrollTo(0, 0);
    
    // If hash is provided, try to scroll to that element
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100); // Small delay to ensure element is available
    }
  };
  
  return (
    <a 
      href={`${to}${hash ? `#${hash}` : ''}`} 
      onClick={handleClick}
      className={className}
      data-smooth-link="true"
      {...props}
    >
      {children}
    </a>
  );
}