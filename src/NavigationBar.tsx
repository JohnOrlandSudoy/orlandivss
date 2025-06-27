import React, { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationItem {
  href: string;
  label: string;
}

interface NavigationBarProps {
  navigationItems: NavigationItem[];
  logoSrc: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ navigationItems, logoSrc }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      const focusableEls = mobileMenuRef.current.querySelectorAll<HTMLElement>(
        'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstEl) {
              e.preventDefault();
              lastEl.focus();
            }
          } else {
            if (document.activeElement === lastEl) {
              e.preventDefault();
              firstEl.focus();
            }
          }
        }
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
          menuButtonRef.current?.focus();
        }
      };
      mobileMenuRef.current.addEventListener('keydown', handleKeyDown);
      return () => {
        mobileMenuRef.current?.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isMobileMenuOpen]);

  // Skip to content link
  // Visually hidden until focused
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only absolute top-2 left-2 z-50 bg-blue-700 text-white px-4 py-2 rounded shadow-lg">Skip to Content</a>
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gradient-to-r from-blue-900/30 via-purple-900/20 to-blue-950/30 shadow-lg rounded-b-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img
                src={logoSrc}
                alt="OrlandIV Logo"
                width={176}
                height={80}
                className="w-40 h-20 sm:w-56 sm:h-32 md:w-64 md:h-36 object-contain mx-auto"
                loading="eager"
              />
            </div>
            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex space-x-2 lg:space-x-6 bg-white/70 backdrop-blur-lg rounded-full px-4 py-2 shadow border border-gray-200"
              aria-label="Main navigation"
              role="navigation"
            >
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full font-semibold text-base transition-all duration-200
                    text-black hover:text-blue-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-gray-100
                    focus:outline-none focus:ring-2 focus:ring-blue-400
                  `}
                >
                  <span className="z-10 relative">{item.label}</span>
                </a>
              ))}
            </nav>
            {/* Mobile Menu Button */}
            <button
              ref={menuButtonRef}
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg bg-black/70 border border-gray-800 shadow hover:bg-blue-900 transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-blue-400" />
              ) : (
                <Menu className="h-6 w-6 text-blue-400" />
              )}
            </button>
          </div>
          {/* Mobile Navigation Menu */}
          <div
            id="mobile-menu"
            ref={mobileMenuRef}
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen
                ? 'max-h-96 opacity-100 pb-4'
                : 'max-h-0 opacity-0 overflow-hidden'
            }`}
            aria-label="Mobile navigation"
            role="navigation"
          >
            <nav className="flex flex-col space-y-2 pt-4 bg-black/90 rounded-2xl shadow border border-gray-800 px-4 py-4">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-200 font-semibold rounded-xl px-4 py-3 hover:bg-gradient-to-r hover:from-blue-900 hover:to-purple-900 hover:text-blue-400 transition-colors text-base"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default NavigationBar; 