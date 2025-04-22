"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { name: "Home", href: "/" },
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
    { name: "Resources", href: "/" },
    { name: "Pricing", href: "/" },
  ];

  // Scroll handling with progress and dynamic effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop > 50 ? (scrollTop / docHeight) * 400 : 0;
      setIsScrolled(scrollTop > 50);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? "bg-gradient-to-l from-gray-900/95 via-indigo-950/95 to-purple-950/95 backdrop-blur-3xl shadow-2xl py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Container */}
        <div className="flex items-center justify-between">
          {/* Advanced Logo with Dynamic Effects */}
          <Link href="/" className="group relative flex items-center">
            <div className="relative w-16 h-16">
              {/* Core Element */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-800 via-indigo-700 to-blue-600 flex items-center justify-center transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-45 shadow-xl">
                <span
                  className={`font-extrabold text-3xl tracking-tighter transition-colors duration-500 ${
                    isScrolled ? "text-gray-100" : "text-gray-100"
                  } group-hover:text-white`}
                >
                  M
                </span>
              </div>
              {/* Multi-Orbit Rings */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="url(#outerGradient)"
                  strokeWidth="2"
                  strokeDasharray={scrollProgress}
                  strokeDashoffset="0"
                  className="transition-all duration-1000 group-hover:stroke-dasharray-400 group-hover:animate-spin-slow"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#innerGradient)"
                  strokeWidth="1.5"
                  strokeDasharray={scrollProgress * 0.8}
                  strokeDashoffset="50"
                  className="transition-all duration-1200 group-hover:stroke-dasharray-320 group-hover:animate-spin-reverse"
                />
                <defs>
                  <linearGradient id="outerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#6366f1" stopOpacity="1" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="innerGradient" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#c084fc" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#818cf8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.7" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Dynamic Particles */}
              <div
                className={`absolute w-2 h-2 bg-purple-500 rounded-full top-0 left-1/2 -translate-x-1/2 transition-all duration-1000 ${
                  isScrolled ? "animate-orbit-fast" : "opacity-0"
                }`}
              ></div>
              <div
                className={`absolute w-1.5 h-1.5 bg-indigo-400 rounded-full bottom-0 left-1/2 -translate-x-1/2 transition-all duration-1200 ${
                  isScrolled ? "animate-orbit-slow" : "opacity-0"
                }`}
              ></div>
            </div>
            <span
              className={`ml-4 text-xl font-bold tracking-wide hidden sm:block transition-all duration-700 ${
                isScrolled ? "text-gray-100" : "text-gray-900"
              } group-hover:text-purple-300 group-hover:tracking-widest group-hover:scale-105`}
            >
              Master Site
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => {
                  setActiveDropdown(item.name);
                  setHoveredItem(item.name);
                }}
                onMouseLeave={() => {
                  setActiveDropdown(null);
                  setHoveredItem(null);
                }}
              >
                <Link
                  href={item.href}
                  className="relative px-6 py-3 text-sm font-semibold transition-all duration-500 group-hover:text-white rounded-full overflow-hidden"
                >
                  <span
                    className={`relative z-10 ${
                      isScrolled ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    {item.name}
                  </span>
                  {/* Gradient Hover Effect */}
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-indigo-600/30 to-blue-600/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center rounded-full"
                  ></span>
                  {/* Glow Effect */}
                  <span
                    className={`absolute inset-0 transition-all duration-500 ${
                      hoveredItem === item.name
                        ? "opacity-100 blur-md bg-purple-500/20 scale-110"
                        : "opacity-0 scale-100"
                    }`}
                  ></span>
                  {/* Indicator */}
                  {item.subItems && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-125"></span>
                  )}
                </Link>
                {item.subItems && (
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 top-full mt-4 w-72 bg-gray-900/95 rounded-2xl shadow-2xl border border-purple-700/30 transition-all duration-400 ease-out ${
                      activeDropdown === item.name
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-90 translate-y-4 pointer-events-none"
                    }`}
                  >
                    <div className="p-4 space-y-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-5 py-3 text-sm font-medium rounded-lg hover:bg-gradient-to-r hover:from-purple-700/40 hover:to-indigo-700/40 hover:text-white transition-all duration-500 relative group/sub overflow-hidden"
                        >
                          <span
                            className={`relative z-10 ${
                              isScrolled ? "text-gray-100" : "text-gray-100"
                            }`}
                          >
                            {subItem.name}
                          </span>
                          <span
                            className="absolute inset-0 w-1.5 bg-purple-600 transform -translate-x-full group-hover/sub:translate-x-0 transition-transform duration-700 ease-in-out"
                          ></span>
                          <span
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover/sub:translate-x-full transition-transform duration-500"
                          ></span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-3 rounded-full transition-all duration-500 hover:bg-purple-500/30 hover:text-white hover:shadow-lg hover:scale-110"
            onClick={toggleMobileMenu} // Fixed: Added onClick handler
          >
            {isMobileMenuOpen ? (
              <X
                className={`h-6 w-6 transition-colors duration-500 ${
                  isScrolled ? "text-gray-100" : "text-gray-900"
                }`}
              />
            ) : (
              <Menu
                className={`h-6 w-6 transition-colors duration-500 ${
                  isScrolled ? "text-gray-100" : "text-gray-900"
                }`}
              />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-gray-900/95 to-indigo-950/95 shadow-2xl rounded-b-3xl transition-all duration-700 ease-in-out ${
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <nav className="px-6 py-8 space-y-5">
            {navItems.map((item) => (
              <div key={item.name} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center justify-between w-full px-5 py-4 text-base font-semibold rounded-xl transition-all duration-500 hover:bg-purple-500/40 hover:text-white"
                  onClick={() => !item.subItems && setIsMobileMenuOpen(false)}
                >
                  <span
                    className={`${
                      isScrolled ? "text-gray-100" : "text-gray-100"
                    }`}
                  >
                    {item.name}
                  </span>
                  {item.subItems && (
                    <span
                      className="w-2 h-2 bg-purple-500 rounded-full transition-all duration-400 group-hover:scale-150 group-hover:bg-purple-400"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveDropdown(
                          activeDropdown === item.name ? null : item.name
                        );
                      }}
                    ></span>
                  )}
                </Link>
                {item.subItems && (
                  <div
                    className={`pl-6 mt-3 space-y-3 transition-all duration-500 ease-out ${
                      activeDropdown === item.name ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-5 py-3 text-sm font-medium rounded-lg hover:bg-purple-600/40 hover:text-white transition-all duration-500 relative overflow-hidden before:absolute before:inset-0 before:w-2 before:bg-purple-600 before:-translate-x-full before:transition-transform before:duration-700 hover:before:translate-x-0"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span
                          className={`relative z-10 ${
                            isScrolled ? "text-gray-100" : "text-gray-100"
                          }`}
                        >
                          {subItem.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes orbit-fast {
          0% {
            transform: rotate(0deg) translateX(26px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(26px) rotate(-360deg);
          }
        }
        @keyframes orbit-slow {
          0% {
            transform: rotate(0deg) translateX(20px) rotate(0deg);
          }
          100% {
            transform: rotate(-360deg) translateX(20px) rotate(360deg);
          }
        }
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-reverse {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
        .animate-orbit-fast {
          animation: orbit-fast 3s linear infinite;
        }
        .animate-orbit-slow {
          animation: orbit-slow 5s linear infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 12s linear infinite;
        }
      `}</style>
    </header>
  );
};

export default Header;