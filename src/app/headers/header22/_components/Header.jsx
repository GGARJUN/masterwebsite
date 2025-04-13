"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Moon, Sun, Menu, X, ChevronDown } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const lastScrollY = useRef(0);
  const dropdownRef = useRef(null);

  const navItems = [
    {
      name: "Solutions",
      href: "/solutions",
      subItems: [
        { name: "Product Development", href: "/solutions/product-dev" },
        { name: "Digital Transformation", href: "/solutions/digital-transformation" },
      ],
    },
    {
      name: "Services",
      href: "/services",
      subItems: [
        { name: "Cloud Services", href: "/services/cloud" },
        { name: "AI & ML", href: "/services/ai-ml" },
        { name: "DevOps", href: "/services/devops" },
        { name: "Web Development", href: "/services/web-development" },
      ],
    },
    {
      name: "Industries",
      href: "/industries",
      subItems: [
        { name: "Healthcare", href: "/industries/healthcare" },
        { name: "Finance", href: "/industries/finance" },
        { name: "Education", href: "/industries/education" },
      ],
    },
    {
      name: "Resources",
      href: "/resources",
      subItems: [
        { name: "Blog", href: "/resources/blog" },
        { name: "Case Studies", href: "/resources/case-studies" },
        { name: "Whitepapers", href: "/resources/whitepapers" },
      ],
    },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (itemName) => {
    setOpenDropdown((prev) => (prev === itemName ? null : itemName));
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 max-w-7xl">
        {/* Logo */}
        <Link href="/" className="flex items-center group" onClick={handleLinkClick}>
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-glow ${
              darkMode ? "bg-indigo-900/80" : "bg-blue-600/80"
            } backdrop-blur-sm`}
          >
            <span className="text-2xl font-extrabold text-white">M</span>
          </div>
          <span
            className={`ml-3 text-xl font-bold bg-clip-text text-transparent transition-all duration-300 ${
              darkMode
                ? "bg-gradient-to-r from-gray-100 to-indigo-300"
                : "bg-gradient-to-r from-blue-600 to-indigo-600"
            } group-hover:scale-105`}
          >
            Master SIte
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1" ref={dropdownRef}>
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`flex items-center px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                      darkMode
                        ? "text-gray-200 hover:bg-indigo-900/50 hover:text-white"
                        : "text-gray-400 hover:bg-blue-100/50 hover:text-blue-700"
                    }`}
                  >
                    {item.name}
                    <ChevronDown
                      size={16}
                      className={`ml-1.5 transition-transform duration-300 ${
                        openDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openDropdown === item.name && (
                    <div
                      className={`absolute left-0 mt-2 w-60 rounded-xl shadow-2xl p-3 z-50 animate-slideDown ${
                        darkMode
                          ? "bg-indigo-900/90 backdrop-blur-md border border-indigo-700/50"
                          : "bg-white/90 backdrop-blur-md border border-gray-200/50"
                      }`}
                    >
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block px-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                            darkMode
                              ? "text-gray-200 hover:bg-indigo-800/50 hover:text-white"
                              : "text-gray-400 hover:bg-blue-50 hover:text-blue-600"
                          }`}
                          onClick={handleLinkClick}
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
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                    darkMode
                      ? "text-gray-200 hover:bg-indigo-900/50 hover:text-white"
                      : "text-gray-400 hover:bg-blue-100/50 hover:text-blue-700"
                  }`}
                  onClick={handleLinkClick}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-all duration-300 ${
              darkMode
                ? "text-yellow-300 hover:bg-indigo-900/50"
                : "text-blue-600 hover:bg-blue-100/50"
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center space-x-2">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-all duration-300 ${
              darkMode
                ? "text-yellow-300 hover:bg-indigo-900/50"
                : "text-blue-600 hover:bg-blue-100/50"
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-full transition-all duration-300 ${
              darkMode
                ? "text-gray-200 hover:bg-indigo-900/50"
                : "text-blue-600 hover:bg-blue-100/50"
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div
          className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
            darkMode
              ? "bg-indigo-950/95 backdrop-blur-md"
              : "bg-blue-50/95 backdrop-blur-md"
          } animate-slideInRight`}
        >
          <div className="flex flex-col h-full">
            <div
              className={`flex justify-between items-center p-4 border-b ${
                darkMode ? "border-indigo-800/50" : "border-blue-200/50"
              }`}
            >
              <Link href="/" className="flex items-center" onClick={handleLinkClick}>
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    darkMode ? "bg-indigo-900/80" : "bg-blue-600/80"
                  }`}
                >
                  <span className="text-xl font-bold text-white">M</span>
                </div>
                <span
                  className={`ml-2 text-lg font-bold ${
                    darkMode ? "text-gray-100" : "text-blue-800"
                  }`}
                >
                  Master Site
                </span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-2 rounded-full transition-all duration-200 ${
                  darkMode
                    ? "text-gray-200 hover:bg-indigo-900/50"
                    : "text-blue-600 hover:bg-blue-100/50"
                }`}
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center space-y-4 p-6">
              {navItems.map((item) => (
                <div key={item.name} className="w-full max-w-md">
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`w-full flex items-center justify-between py-3 px-4 text-base font-semibold rounded-lg transition-all duration-300 ${
                          darkMode
                            ? "text-gray-200 hover:bg-indigo-900/50"
                            : "text-blue-800 hover:bg-blue-100/50"
                        }`}
                      >
                        {item.name}
                        <ChevronDown
                          size={20}
                          className={`transition-transform duration-300 ${
                            openDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openDropdown === item.name && (
                        <div className="mt-2 space-y-2 pl-6 animate-fadeIn">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={`block py-2 px-4 text-sm rounded-lg transition-all duration-200 ${
                                darkMode
                                  ? "text-gray-300 hover:bg-indigo-800/50 hover:text-white"
                                  : "text-blue-700 hover:bg-blue-50 hover:text-blue-600"
                              }`}
                              onClick={handleLinkClick}
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
                      className={`block py-3 px-4 text-base font-semibold rounded-lg transition-all duration-300 ${
                        darkMode
                          ? "text-gray-200 hover:bg-indigo-900/50"
                          : "text-blue-800 hover:bg-blue-100/50"
                      }`}
                      onClick={handleLinkClick}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        .animate-slideInRight {
          animation: slideInRight 0.4s ease-out forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .group-hover:shadow-glow {
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </header>
  );
};

export default Header;