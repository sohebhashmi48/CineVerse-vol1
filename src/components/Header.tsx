import React, { useState, useEffect } from 'react';
import { Search, Film, Menu, X, Star, TrendingUp, Zap } from 'lucide-react';
import { useGSAP } from '../hooks/useGSAP';

interface HeaderProps {
  onSearchClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { gsap } = useGSAP();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Simplified entrance animations
    gsap.fromTo('.header-logo', 
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.4, delay: 0.1 }
    );
    
    gsap.fromTo('.header-nav', 
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.4, delay: 0.2, stagger: 0.05 }
    );
    
    gsap.fromTo('.header-actions', 
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, delay: 0.3 }
    );
  }, [gsap]);

  const navItems = [
    { name: 'Trending', icon: TrendingUp },
    { name: 'Movies', icon: Film },
    { name: 'Top Rated', icon: Star },
    { name: 'New Releases', icon: Zap }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="header-logo flex items-center space-x-2">
            <div className="relative">
              <Film className="w-8 h-8 text-yellow-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              CineVerse
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                className="header-nav group flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 relative"
              >
                <item.icon className="w-4 h-4 group-hover:text-yellow-400 transition-colors" />
                <span className="font-medium">{item.name}</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-red-500 group-hover:w-full transition-all duration-200"></div>
              </button>
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="header-actions flex items-center space-x-4">
            <button
              onClick={onSearchClick}
              className="group p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200"
            >
              <Search className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/10">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  className="flex items-center space-x-3 w-full text-left text-gray-300 hover:text-white transition-colors duration-200 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;