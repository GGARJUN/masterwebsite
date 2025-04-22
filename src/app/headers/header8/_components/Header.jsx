"use client";
import { useState, useEffect } from "react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Menu } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);

  const navItems = [
    { name: "Home", href: "#", subItems: [] },
    {
      name: "Products",
      href: "#",
      subItems: [
        { name: "All Products", href: "/" },
        { name: "New Arrivals", href: "/" },
        { name: "Best Sellers", href: "/" },
        { name: "Categories", href: "/" },
      ],
    },
    {
      name: "Solutions",
      href: "#",
      subItems: [
        { name: "Marketing", href: "/" },
        { name: "Analytics", href: "/" },
        { name: "Commerce", href: "/" },
        { name: "Insights", href: "/" },
      ],
    },
    { name: "Resources", href: "#", subItems: [] },
    { name: "Pricing", href: "#", subItems: [] },
  ];



  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleMouseEnter = (name) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setOpenDropdown(null);
      setTimeoutId(null);
    }, 1500);
    setTimeoutId(id);
  };

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-600 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isScrolled
            ? "opacity-0 -translate-y-full scale-95"
            : "opacity-100 translate-y-0 scale-100"
        }`}
      >
        <nav className="relative max-w-[100%] mx-auto px-3 py-3">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#8b5cf6_0,_#3b82f6_50%,_transparent_75%)] blur-2xl transform scale-110 -z-10 animate-bg-pulse" />
          <div className="absolute inset-0 bg-[conic-gradient(from_45deg_at_50%_50%,_#8b5cf6,_#3b82f6,_#8b5cf6)] opacity-20 animate-rotate-slow" />

          {/* Main Nav Container */}
          <div className="flex items-center justify-between bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a]  backdrop-blur-2xl px-8 py-3 rounded-[5px] shadow-[0_0_30px_rgba(139,92,246,0.2),inset_0_0_15px_rgba(255,255,255,0.1)] border border-violet-500/20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-[#8b5cf6]  transform group-hover:scale-105 group-hover:rotate-12 transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]" />
                <div className="absolute inset-0.5 bg-white/20 rounded-[14px] animate-pulse-slow group-hover:animate-none" />
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl tracking-tight">
                  M
                </span>
                <div className="absolute -inset-1.5 bg-gradient-to-r from-violet-400/30 to-blue-400/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-600" />
              </div>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-blue-200 group-hover:animate-text-glow">
                Master Site
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.subItems && item.subItems.length > 0 ? (
                    <>
                      <button
                        onMouseEnter={() => handleMouseEnter(item.name)}
                        onMouseLeave={handleMouseLeave}
                        className="nav-item flex items-center text-violet-100 px-5 py-3 text-base font-medium transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-white hover:bg-violet-500/10  relative overflow-hidden"
                      >
                        <span className="relative z-10">{item.name}</span>
                        <ChevronDownIcon
                          className={`w-5 h-5 ml-2 transform transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                            openDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                        <span className="absolute inset-0 bg-violet-400/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] origin-left" />
                      </button>
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 mt-2 w-60 bg-[#1e1b4b]/95 backdrop-blur-lg rounded-[16px] shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-violet-500/20 overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                          openDropdown === item.name
                            ? "opacity-100 translate-y-0 scale-100"
                            : "opacity-0 translate-y-4 scale-90 pointer-events-none"
                        }`}
                        onMouseEnter={() => handleMouseEnter(item.name)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {item.subItems.map((subItem, index) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`flex items-center px-5 py-3 text-violet-200 hover:bg-violet-500/20 hover:text-white transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] transform hover:translate-x-2 ${
                              index === 0
                                ? "pt-3"
                                : index === item.subItems.length - 1
                                ? "pb-3"
                                : ""
                            }`}
                          >
                            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative z-10 text-sm">{subItem.name}</span>
                            <span className="absolute left-0 top-0 w-0.5 h-full bg-violet-400/40 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="nav-item flex items-center text-violet-100 px-5 py-3 text-base font-medium transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-white hover:bg-violet-500/10 rounded-[12px] relative overflow-hidden"
                    >
                      <span className="relative z-10">{item.name}</span>
                      <span className="absolute inset-0 bg-violet-400/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] origin-left" />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-violet-100 hover:text-white hover:bg-violet-500/20 rounded-[12px] transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6 transform rotate-180 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]" />
              ) : (
                <Menu className="w-6 h-6 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden fixed w-full bg-[#1e1b4b]/95 backdrop-blur-lg transform transition-all duration-600 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            isMobileMenuOpen
              ? "translate-x-0 opacity-100 scale-100"
              : "translate-x-full opacity-0 scale-95"
          }`}
        >
          {/* Background Gradient Overlay */}
          <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,_#8b5cf6,_#3b82f6,_#8b5cf6)] opacity-30 animate-rotate-slow" />

          {/* Mobile Menu Content */}
          <div className="relative flex flex-col h-full pt-8 pb-8 px-6">
            {/* Menu Items */}
            <div className="flex flex-col space-y-3 w-full max-w-md mx-auto">
              {navItems.map((item) => (
                <div key={item.name} className="w-full">
                  {item.subItems && item.subItems.length > 0 ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="w-full text-violet-100 text-lg font-semibold py-3 px-6 bg-violet-500/10 hover:bg-violet-500/20 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] border-b border-violet-500/20 flex items-center justify-between rounded-[12px] shadow-sm"
                      >
                        <span>{item.name}</span>
                        <ChevronDownIcon
                          className={`w-6 h-6 transform transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                            openDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`w-full bg-violet-600/10 border-b border-violet-500/20 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] overflow-hidden ${
                          openDropdown === item.name
                            ? "max-h-96 opacity-100 translate-y-0 mt-2"
                            : "max-h-0 opacity-0 translate-y-2"
                        }`}
                      >
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block text-violet-200 py-3 px-8 text-sm font-medium hover:text-white hover:bg-violet-500/20 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-[10px]"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setOpenDropdown(null);
                            }}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="w-full text-violet-100 text-lg font-semibold py-3 px-6 bg-violet-500/10 hover:bg-violet-500/20 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] border-b border-violet-500/20 block rounded-[12px] shadow-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Global Styles */}
      <style jsx global>{`
        .nav-item {
          position: relative;
          overflow: visible;
        }

        .nav-item::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 1px;
          background: #8b5cf6;
          transform: translateX(-50%);
          transition: width 0.4s ease-[cubic-bezier(0.4,0,0.2,1)];
          
        }

        .nav-item:hover::before {
          width: 60%;
        }

        .mobile-nav-item {
          position: relative;
        }

        .mobile-nav-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: #8b5cf6;
          transition: width 0.4s ease-[cubic-bezier(0.4,0,0.2,1)];
        }

        .mobile-nav-item:hover::after {
          width: 100%;
        }

        /* Custom Animations */
        @keyframes bg-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }

        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 4px rgba(139, 92, 246, 0.4); }
          50% { text-shadow: 0 0 12px rgba(139, 92, 246, 0.8); }
        }

        .animate-bg-pulse {
          animation: bg-pulse 10s infinite ease-in-out;
        }



        .animate-pulse-slow {
          animation: bg-pulse 8s infinite ease-in-out;
        }

        .animate-text-glow {
          animation: text-glow 3s infinite ease-in-out;
        }
      `}</style>
    </>
  );
};

export default Header;