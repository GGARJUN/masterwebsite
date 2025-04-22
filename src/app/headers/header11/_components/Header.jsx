"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon, ChevronUpIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const timeoutRef = useRef(null);
  const headerRef = useRef(null);

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

  // Scroll handling with opacity-based fade effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setActiveDropdown(null);
  };

  const handleMouseEnter = (itemName) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 1000); // 1-second delay before closing
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-800 ease-in-out ${
        isScrolled
          ? "bg-gradient-to-r from-purple-900/95 via-indigo-950/95 to-blue-900/95 backdrop-blur-lg opacity-100"
          : "bg-transparent opacity-90"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
        {/* <Link
          href="/"
          className="flex items-center space-x-2"
          aria-label="Home"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center text-white font-bold text-lg">
            M
          </div>
          <span className="text-lg font-semibold text-white hidden sm:block">
            Master Site
          </span>
        </Link> */}

        <nav className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => item.subItems && handleMouseEnter(item.name)}
              onMouseLeave={() => item.subItems && handleMouseLeave()}
            >
              <Link
                href={item.href}
                className="relative px-5 py-2 text-sm font-medium transition-opacity duration-600 ease-in-out flex items-center"
                style={{
                  color: isScrolled ? "rgb(209 213 219)" : "rgb(55 65 81)",
                }}
                aria-haspopup={item.subItems ? "true" : "false"}
                aria-expanded={activeDropdown === item.name}
              >
                <span className="relative z-10">{item.name}</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out`}
                ></span>
                {item.subItems && (
                  <span className="ml-1 inline-flex items-center">
                    {activeDropdown === item.name ? (
                      <ChevronUpIcon className="h-4 w-4 text-purple-400 transition-transform duration-300" />
                    ) : (
                      <ChevronDownIcon className="h-4 w-4 text-purple-400 transition-transform duration-300" />
                    )}
                  </span>
                )}
              </Link>
              {item.subItems && activeDropdown === item.name && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-96 grid grid-cols-3 bg-gray-800/90 backdrop-blur-md rounded-lg shadow-xl border border-indigo-800/30 p-2 gap-1 transition-opacity duration-700 ease-in-out opacity-100 animate-fade-in">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className="block px-4 py-2 text-sm font-medium text-indigo-200 hover:text-white rounded hover:bg-indigo-800/30 transition-colors duration-400 ease-in-out"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Link
            href="/get-started"
            className="hidden lg:inline-block px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-800 transition-all duration-500 ease-in-out hover:shadow-lg"
          >
            Get Started
          </Link>
          <button
            className="lg:hidden p-2 rounded-full bg-indigo-800/30 hover:bg-purple-700/40 text-indigo-100 hover:text-white transition-colors duration-500 ease-in-out hover:shadow-md"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isScrolled ? (
              isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )
            ) : (
              isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-700" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-700" />
              )
            )}
          </button>
        </div>

        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-purple-900/95 to-indigo-950/95 shadow-xl rounded-b-lg transition-opacity duration-700 ease-in-out ${
            isMobileMenuOpen ? "opacity-100 max-h-screen" : "opacity-0 max-h-0 overflow-hidden"
          }`}
        >
          <nav className="px-4 py-6 space-y-3">
            {navItems.map((item) => (
              <div key={item.name} className="group relative">
                <div
                  className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg bg-indigo-900/40 hover:bg-purple-800/50 transition-colors duration-500 ease-in-out"
                  style={{
                    color: isScrolled ? "rgb(209 213 219)" : "rgb(209 213 219)",
                  }}
                  onClick={() => item.subItems && setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                >
                  <span>{item.name}</span>
                  {item.subItems && (
                    <span className="w-2 h-2 bg-purple-400 rounded-full transition-transform duration-400 group-hover:scale-125"></span>
                  )}
                </div>
                {item.subItems && activeDropdown === item.name && (
                  <div className="pl-6 mt-2 space-y-2 animate-fade-in">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-xs font-medium rounded-md bg-indigo-950/50 hover:bg-purple-700/40 transition-colors duration-400 ease-in-out"
                        style={{
                          color: isScrolled ? "rgb(203 213 225)" : "rgb(209 213 219)",
                        }}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setActiveDropdown(null);
                        }}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4">
              <Link
                href="/get-started"
                className="block w-full text-center px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-800 transition-all duration-500 ease-in-out hover:shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-out {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-in-out;
        }
        .animate-fade-out {
          animation: fade-out 0.8s ease-in-out;
        }
        html {
          scroll-behavior: smooth;
        }
        *:focus-visible {
          outline: 2px solid #818cf8;
          outline-offset: 2px;
        }
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.3);
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: rgba(129, 140, 248, 0.5);
          border-radius: 3px;
        }
        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
          .transition-all,
          .transition-colors,
          .transition-transform {
            transition: none !important;
          }
          [class*="animate-"] {
            animation: none !important;
          }
        }
        @media (prefers-contrast: high) {
          .bg-gray-800\/90,
          .bg-indigo-900\/40,
          .bg-indigo-950\/50,
          .bg-purple-800\/50 {
            background-color: #1e1b4b !important;
            border-color: #3730a3 !important;
          }
          .text-indigo-200,
          .text-gray-200 {
            color: #ffffff !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;