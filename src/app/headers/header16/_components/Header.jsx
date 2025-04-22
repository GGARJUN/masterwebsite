"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const leftNavItems = [
    { name: "Home", href: "/" },
    {
      name: "Products",
      href: "/",
      subItems: [
        { name: "All Products", href: "/" },
        { name: "New Arrivals", href: "/" },
        { name: "Best Sellers", href: "/" },
        { name: "Categories", href: "/" },
      ],
    },
    {
      name: "Solutions",
      href: "/",
      subItems: [
        { name: "Marketing", href: "/" },
        { name: "Analytics", href: "/" },
        { name: "Commerce", href: "/" },
        { name: "Insights", href: "/" },
      ],
    },
  ];

  const rightNavItems = [
    { name: "Resources", href: "/" },
    { name: "Pricing", href: "/" },
  ];

  const toggleDropdown = (itemName) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('nav')) {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`bg-gradient-to-r from-green-900 via-green-800 to-green-600 text-white shadow-2xl  m-5 rounded-3xl transition-all duration-300 ${isScrolled
          ? "h-20 fixed top-2 w-[calc(100%-2.5rem)] z-50"
          : "h-20 z-50"
        }`}
    >
      <nav className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isScrolled ? "pt-5 z-50" : "pt-5 z-50"
        }`}>
        <div className="flex items-center justify-between h-full relative">
          {/* Centered Logo */}
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 flex items-center transition-all duration-300 ${isScrolled ? "scale-90" : "z-50"
              }`}
          >
            <Link
              href="/"
              className="flex items-center space-x-4 group"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setOpenDropdown(null);
              }}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-200 to-green-100 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                <span className="text-3xl font-extrabold text-green-800">M</span>
              </div>
              <span className={`text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 transition-all duration-500 group-hover:text-white tracking-wide ${isScrolled ? "" : ""
                }`}>
                Master site
              </span>
            </Link>
          </div>

          {/* Left Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-6 z-50">
            {leftNavItems.map((item) => (

              <div key={item.name} className="relative group">
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex items-center text-white hover:text-yellow-300 px-4 py-2 text-sm font-semibold rounded-md hover:bg-green-700/40 transition-all duration-300 border-b-2 border-transparent hover:border-yellow-300"
                    >
                      {item.name}
                      {openDropdown === item.name ? (
                        <ChevronUp className="ml-1 h-5 w-5" />
                      ) : (
                        <ChevronDown className="ml-1 h-5 w-5" />
                      )}
                    </button>
                    {openDropdown === item.name && (
                      <div className="absolute right-0 mt-2 w-52 bg-gradient-to-br from-indigo-200/70 to-purple-300/70 backdrop-blur-lg rounded-2xl shadow-2xl py-2 z-50 animate-slideIn">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-5 py-2.5 text-sm font-medium text-gray-800 hover:bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl transition-all duration-300 hover:shadow-md"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="text-white hover:text-yellow-300 px-4 py-2 text-sm font-semibold rounded-md hover:bg-green-700/40 transition-all duration-300 border-b-2 border-transparent hover:border-yellow-300"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-6 z-50">
            {rightNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-yellow-300 px-4 py-2 text-sm font-semibold rounded-md hover:bg-green-700/40 transition-all duration-300 border-b-2 border-transparent hover:border-yellow-300"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                if (isMobileMenuOpen) setOpenDropdown(null);
              }}
              className="inline-flex items-center justify-center p-2 rounded-full text-white hover:bg-green-700/50 focus:outline-none transition-all duration-300 shadow-md"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 animate-fadeIn">
            <div className="pt-4">
              {leftNavItems.map((item) => (
                <div key={item.name} className="px-2 pt-1">
                  <Link
                    href={item.href}
                    className="block px-3 py-3 text-base font-medium text-white hover:bg-green-700/50 rounded-md transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}

              {rightNavItems.map((item) => (
                <div key={item.name} className="px-2 pt-1">
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="flex w-full items-center justify-between px-3 py-3 text-base font-medium text-white hover:bg-green-700/50 rounded-md transition-all duration-200"
                      >
                        {item.name}
                        {openDropdown === item.name ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                      {openDropdown === item.name && (
                        <div className="pl-4 mt-1">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-3 py-3 text-base text-white hover:bg-green-700/50 rounded-md transition-all duration-200"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setOpenDropdown(null);
                              }}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-3 py-3 text-base font-medium text-white hover:bg-green-700/50 rounded-md transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-15px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.2s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default Header;