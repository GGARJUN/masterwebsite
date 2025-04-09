"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell, Calendar, ChevronDown, Code, Cpu, CreditCard, CreditCardIcon, FileText, HelpCircle, HelpCircleIcon, Home, Layers, Map, Menu, MessageSquare, PenTool, Rocket, Search, Settings, Settings2, Terminal, TerminalIcon, User, User2, X, Zap } from "lucide-react";

  
  const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const lastScrollY = useRef(0);
    const dropdownTimeout = useRef(null);
    const headerRef = useRef(null);
  
    // Enhanced nav items with corrected and relevant icons
    const navItems = [
      { 
        name: "Home", 
        href: "/",
        icon: <Home className="w-4 h-4 mr-2" />
      },
      {
        name: "Tools",
        href: "/tools",
        icon: <PenTool className="w-4 h-4 mr-2" />,
        subItems: [
          { name: "Inner Pages", href: "/tools/inner-pages", icon: <FileText className="w-4 h-4 mr-2" /> },
          { name: "Style Guide", href: "/tools/style-guide", hot: true, icon: <Settings className="w-4 h-4 mr-2" /> },
          { name: "Blog", href: "/tools/blog", icon: <MessageSquare className="w-4 h-4 mr-2" /> },
          { name: "Blog Details", href: "/tools/blog-details", icon: <MessageSquare className="w-4 h-4 mr-2" /> },
          { name: "Pricing", href: "/tools/pricing", icon: <CreditCard className="w-4 h-4 mr-2" /> },
          { name: "Contact", href: "/tools/contact", icon: <User className="w-4 h-4 mr-2" /> }
        ],
      },
      {
        name: "Pages",
        href: "/pages",
        icon: <Layers className="w-4 h-4 mr-2" />,
        subItems: [
          { name: "Dashboard", href: "/pages/dashboard", icon: <TerminalIcon className="w-4 h-4 mr-2" /> },
          { name: "Profile", href: "/pages/profile", icon: <User2 className="w-4 h-4 mr-2" /> },
          { name: "Notification", href: "/pages/notification", icon: <Bell className="w-4 h-4 mr-2" /> },
          { name: "Appearance", href: "/pages/appearance", icon: <Settings2 className="w-4 h-4 mr-2" /> },
          { name: "Plans and Billing", href: "/pages/plans", icon: <CreditCardIcon className="w-4 h-4 mr-2" /> },
          { name: "Sessions", href: "/pages/sessions", icon: <Calendar className="w-4 h-4 mr-2" /> },
          { name: "Application", href: "/pages/application", icon: <Cpu className="w-4 h-4 mr-2" /> },
          { name: "Release Notes", href: "/pages/release-notes", icon: <Code className="w-4 h-4 mr-2" /> },
          { name: "Help & FAQs", href: "/pages/help", icon: <HelpCircle className="w-4 h-4 mr-2" /> },
        ],
      },
      { 
        name: "Roadmap", 
        href: "/roadmap",
        icon: <Map className="w-4 h-4 mr-2" />
      },
      { 
        name: "How to use", 
        href: "/how-to-use",
        icon: <HelpCircleIcon className="w-4 h-4 mr-2" />
      },
    ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsScrolled(true);
      } else if (currentScrollY < lastScrollY.current) {
        setIsScrolled(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle dropdown with delay
  const toggleDropdown = (itemName) => {
    clearTimeout(dropdownTimeout.current);
    
    if (openDropdown === itemName) {
      setOpenDropdown(null);
    } else {
      dropdownTimeout.current = setTimeout(() => {
        setOpenDropdown(itemName);
      }, 150);
    }
  };

  // Close all menus
  const closeAllMenus = () => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      ref={headerRef}
      className={`fixed w-full z-50 transition-all duration-500 ease-out ${
        isScrolled ? 'bg-gray-900/95 shadow-xl' : 'bg-gray-900/90'
      } backdrop-blur-lg border-b border-gray-800`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center group"
            onClick={closeAllMenus}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center transition-all duration-500 group-hover:rotate-12 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hidden sm:block">
              TechNova
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div 
                key={item.name} 
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 group"
                    >
                      {item.icon}
                      {item.name}
                      <ChevronDown 
                        className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                          openDropdown === item.name ? 'rotate-180 text-cyan-400' : 'text-gray-400'
                        }`}
                      />
                      {item.subItems.some(sub => sub.hot) && (
                        <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                          New
                        </span>
                      )}
                    </button>

                    {openDropdown === item.name && (
                      <div 
                        className={`absolute left-0 mt-2 w-64 bg-gray-800 rounded-lg border border-gray-700/50 shadow-2xl p-2 z-50 animate-fade-in`}
                      >
                        <div className="p-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                          {item.name} Features
                        </div>
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="flex items-center p-3 space-x-3 rounded-md text-white hover:bg-gray-700/50 transition-colors duration-300 group/item"
                            onClick={closeAllMenus}
                          >
                            <div className={`p-1.5 rounded-md ${
                              subItem.hot 
                                ? 'bg-gradient-to-r from-pink-500/20 to-purple-600/20' 
                                : 'bg-gray-700/50'
                            }`}>
                              {subItem.icon}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white group-hover/item:text-cyan-400 transition-colors">
                                {subItem.name}
                              </div>
                            </div>
                            {subItem.hot && (
                              <span className="ml-auto px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                                Hot
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300"
                    onClick={closeAllMenus}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/get-started"
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-600 rounded-md hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300"
            >
              <Rocket className="h-4 w-4" />
              <span>Get Started</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300">
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300 relative"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-gray-900/95 backdrop-blur-xl transition-all duration-500 ease-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {navItems.map((item) => (
            <div key={item.name} className="border-b border-gray-800 pb-2">
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="flex justify-between items-center w-full text-left text-gray-300 hover:text-white transition-colors duration-300 py-3"
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                      {item.subItems.some(sub => sub.hot) && (
                        <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                          New
                        </span>
                      )}
                    </div>
                    <ChevronDown 
                      className={`h-5 w-5 transition-transform duration-300 ${
                        openDropdown === item.name ? 'rotate-180 text-cyan-400' : 'text-gray-400'
                      }`}
                    />
                  </button>

                  {openDropdown === item.name && (
                    <div className="pl-8 mt-1 space-y-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="flex items-center p-2 rounded-md hover:bg-gray-800 transition-colors duration-300 group/item"
                          onClick={closeAllMenus}
                        >
                          <div className={`p-1.5 rounded-md ${
                            subItem.hot 
                              ? 'bg-gradient-to-r from-pink-500/20 to-purple-600/20' 
                              : 'bg-gray-700/50'
                          }`}>
                            {subItem.icon}
                          </div>
                          <span className="ml-3 text-sm text-gray-300 group-hover/item:text-cyan-400">
                            {subItem.name}
                          </span>
                          {subItem.hot && (
                            <span className="ml-auto px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                              Hot
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center py-3 text-gray-300 hover:text-white transition-colors duration-300"
                  onClick={closeAllMenus}
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Link>
              )}
            </div>
          ))}

          <div className="pt-4">
            <Link
              href="/get-started"
              className="flex items-center justify-center w-full py-2 px-4 text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-600 rounded-md hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300"
            >
              <Rocket className="h-4 w-4 mr-2" />
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Glow effect styles */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default Header;