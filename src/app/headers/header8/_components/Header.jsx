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
  const [timeoutId, setTimeoutId] = useState(null); // New state for timeout

  const navItems = [
    { name: "Explore", href: "#", subItems: [] },
    {
      name: "Modules",
      subItems: [
        { name: "Quantum UI", href: "#" },
        { name: "Nexus API", href: "#" },
        { name: "Pulse Analytics", href: "#" },
      ],
    },
    {
      name: "Ecosystem",
      subItems: [
        { name: "Plugins", href: "#" },
        { name: "Integrations", href: "#" },
        { name: "Marketplace", href: "#" },
      ],
    },
    { name: "Launchpad", href: "#", subItems: [] },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const threshold = window.innerHeight * 0.1; // 10% of viewport height

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsScrolled(true); // Hide on scroll down
      } else if (currentScrollY <= threshold) {
        setIsScrolled(false); // Show when near top
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleMouseEnter = (name) => {
    // Clear any existing timeout to prevent premature closing
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setOpenDropdown(name); // Open submenu immediately
  };

  const handleMouseLeave = () => {
    // Set a 2-second delay before closing the submenu
    const id = setTimeout(() => {
      setOpenDropdown(null);
      setTimeoutId(null);
    }, 2000); // 2000ms = 2 seconds
    setTimeoutId(id);
  };

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-700 ease-in-out ${
          isScrolled
            ? "opacity-0 -translate-y-full scale-90"
            : "opacity-100 translate-y-0 scale-100"
        }`}
      >
        <nav className="relative max-w-[95%] mx-auto px-6 py-6">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 via-violet-600/20 to-indigo-600/20 blur-3xl transform scale-105 -z-10 animate-bg-shift" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0,_transparent_70%)] animate-pulse-subtle" />

          {/* Main Nav Container */}
          <div className="flex items-center justify-between bg-gradient-to-r from-gray-800/90 via-gray-900/90 to-black/90 backdrop-blur-xl px-8 py-4 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.05)] border border-white/10">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-violet-500 to-indigo-500 rounded-lg transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 ease-out" />
                <div className="absolute inset-0 bg-white/10 rounded-lg animate-spin-subtle group-hover:animate-spin-fast" />
                <span className="absolute inset-0 flex items-center justify-center text-white font-extrabold text-2xl tracking-tight">
                  Z
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-400/50 to-indigo-400/50 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-violet-200 to-indigo-200 group-hover:animate-text-shimmer">
                ZenithLabs
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
                        className="nav-item flex items-center text-white/90 px-5 py-3 text-base font-medium transition-all duration-500 ease-out hover:text-white hover:bg-gradient-to-r hover:from-teal-500/20 hover:to-indigo-500/20 rounded-lg relative overflow-hidden"
                      >
                        <span className="relative z-10">{item.name}</span>
                        <ChevronDownIcon
                          className={`w-5 h-5 ml-2 transform transition-transform duration-300 ease-out ${
                            openDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                        <span className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center" />
                      </button>
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 mt-3 w-64 bg-gray-900/95 backdrop-blur-lg rounded-xl shadow-[0_15px_50px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden transition-all duration-400 ease-out ${
                          openDropdown === item.name
                            ? "opacity-100 translate-y-0 scale-100"
                            : "opacity-0 translate-y-6 scale-95 pointer-events-none"
                        }`}
                        onMouseEnter={() => handleMouseEnter(item.name)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {item.subItems.map((subItem, index) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`flex items-center px-5 py-4 text-white/80 hover:bg-gradient-to-r hover:from-teal-500/30 hover:to-indigo-500/30 hover:text-white transition-all duration-300 ease-out transform hover:translate-x-1 ${
                              index === 0
                                ? "pt-4"
                                : index === item.subItems.length - 1
                                ? "pb-4"
                                : ""
                            }`}
                          >
                            <span className="w-2 h-2 bg-teal-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative z-10">{subItem.name}</span>
                            <span className="absolute left-0 top-0 w-1 h-full bg-teal-400/50 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="nav-item flex items-center text-white/90 px-5 py-3 text-base font-medium transition-all duration-500 ease-out hover:text-white hover:bg-gradient-to-r hover:from-teal-500/20 hover:to-indigo-500/20 rounded-lg relative overflow-hidden"
                    >
                      <span className="relative z-10">{item.name}</span>
                      <span className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center" />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6 transform rotate-180 transition-all duration-300" />
              ) : (
                <Menu className="w-6 h-6 transition-all duration-300" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden fixed w-full bg-gradient-to-b from-indigo-900/95 to-blue-900/95 backdrop-blur-lg transform transition-all duration-700 ease-in-out ${
            isMobileMenuOpen
              ? "translate-x-0 opacity-100 scale-100"
              : "translate-x-full opacity-0 scale-90"
          }`}
        >
          {/* Background Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 opacity-50 animate-gradient-shift" />

          {/* Mobile Menu Content */}
          <div className="relative flex flex-col h-full pt-8 pb-8 px-6">
            {/* Menu Items */}
            <div className="flex flex-col space-y-4 w-full max-w-md mx-auto">
              {navItems.map((item) => (
                <div key={item.name} className="w-full">
                  {item.subItems && item.subItems.length > 0 ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="w-full text-white text-lg font-semibold py-4 px-6 bg-white/5 hover:bg-white/10 transition-all duration-300 border-b border-white/10 flex items-center justify-between shadow-md"
                      >
                        <span>{item.name}</span>
                        <ChevronDownIcon
                          className={`w-6 h-6 transform transition-transform duration-300 ${
                            openDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`w-full bg-indigo-800/60 border-b border-white/10 transition-all duration-500 ease-in-out overflow-hidden ${
                          openDropdown === item.name
                            ? "max-h-96 opacity-100 translate-y-0"
                            : "max-h-0 opacity-0 translate-y-2"
                        }`}
                      >
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block text-white/90 py-3 px-8 text-base font-medium hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300"
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
                      className="w-full text-white text-lg font-semibold py-4 px-6 bg-white/5 hover:bg-white/10 transition-all duration-300 border-b border-white/10 block shadow-md"
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
          background: linear-gradient(to right, #22d3ee, #a855f7);
          transform: translateX(-50%);
          transition: width 0.4s ease;
        }

        .nav-item:hover::before {
          width: 70%;
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
          height: 2px;
          background: linear-gradient(to right, #22d3ee, #a855f7);
          transition: width 0.4s ease;
        }

        .mobile-nav-item:hover::after {
          width: 100%;
        }

        /* Custom Animations */
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin-fast {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.3); }
          50% { text-shadow: 0 0 15px rgba(255, 255, 255, 0.7); }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s infinite ease-in-out;
        }

        .animate-spin-subtle {
          animation: spin-slow 12s linear infinite;
        }

        .animate-spin-fast {
          animation: spin-fast 3s linear infinite;
        }

        .animate-text-shimmer {
          animation: text-glow 2s infinite ease-in-out;
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Header;