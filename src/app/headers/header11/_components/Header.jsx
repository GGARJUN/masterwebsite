"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { name: "Home", href: "/" },
    {
      name: "Products",
      href: "#",
      subItems: [
        { name: "Categories", href: "/products/categories" },
        { name: "New Arrivals", href: "/products/new" },
        { name: "Best Sellers", href: "/products/bestsellers" },
        { name: "Categorieas", href: "/products/categories" },
        { name: "New Arrivas", href: "/products/new" },
        { name: "Best Selleres", href: "/products/bestsellers" },
        { name: "Categoriwes", href: "/products/categories" },
        { name: "New Arreivals", href: "/products/new" },
        { name: "Best Selslers", href: "/products/bestsellers" },
      ],
    },
    {
      name: "Solutions",
      href: "#",
      subItems: [
        { name: "Tools", href: "/solutions/business" },
        { name: "Services", href: "/solutions/digital" },
        { name: "Support", href: "/solutions/support" },
        { name: "Business ", href: "/solutions/business" },
        { name: "Digital", href: "/solutions/digital" },
        { name: "Supports", href: "/solutions/support" },
      ],
    },
    { name: "Resources", href: "/resources" },
    { name: "Pricing", href: "/pricing" },
  ];

  // Scroll handling with opacity-based fade effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 30); // Trigger at 30px scroll
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-800 ease-in-out ${
        isScrolled
          ? "bg-gradient-to-r from-purple-900/95 via-indigo-950/95 to-blue-900/95 backdrop-blur-lg opacity-100"
          : "bg-transparent opacity-90"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
        {/* Desktop Navigation with Single-Level Submenu */}
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
                className="relative px-5 py-2 text-sm font-medium transition-opacity duration-600 ease-in-out"
                style={{
                  color: isScrolled ? "rgb(209 213 219)" : "rgb(55 65 81)",
                }}
              >
                <span className="relative z-10">{item.name}</span>
                {/* Hover Underline */}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out`}
                ></span>
                {/* Indicator Chevron */}
                {item.subItems && (
                  <span className="ml-1 inline-flex items-center">
                    {activeDropdown === item.name ? (
                      <ChevronUp className="h-4 w-4 text-purple-400 transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-purple-400 transition-transform duration-300" />
                    )}
                  </span>
                )}
              </Link>
              {item.subItems && activeDropdown === item.name && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-96 grid grid-cols-3 bg-gray-800/90 backdrop-blur-md rounded-lg shadow-xl border border-indigo-800/30 p-2  gap-1 transition-opacity duration-700 ease-in-out opacity-100">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className="block px-4 py-2 text-sm font-medium text-indigo-200 hover:text-white rounded hover:bg-indigo-800/30 transition-colors duration-400 ease-in-out"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Get Started Button and Mobile Toggle */}
        <div className="flex items-center  space-x-4">
          <Link
            href="/get-started"
            className="hidden lg:inline-block px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-800 transition-all duration-500 ease-in-out hover:shadow-lg"
          >
            Get Started
          </Link>
          <button
            className="lg:hidden p-2 rounded-full bg-indigo-800/30 hover:bg-purple-700/40 text-indigo-100 hover:text-white transition-colors duration-500 ease-in-out hover:shadow-md "
            onClick={toggleMobileMenu}
          >
            {isScrolled ? (
              isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />
            ) : (
              isMobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
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
                  <div className="pl-6 mt-2 space-y-2 ">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-xs font-medium rounded-md bg-indigo-950/50 hover:bg-purple-700/40 transition-colors duration-400 ease-in-out"
                        style={{
                          color: isScrolled ? "rgb(203 213 225)" : "rgb(209 213 219)",
                        }}
                        onClick={() => setIsMobileMenuOpen(false)}
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
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-out {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-in-out; }
        .animate-fade-out { animation: fade-out 0.8s ease-in-out; }
      `}</style>
    </header>
  );
};

export default Header;