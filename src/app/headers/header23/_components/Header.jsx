"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const navItems = [
    { name: "Home", href: "/" },
    {
      name: "Products",
      href: "#",
      subItems: [
        { name: "All Products", href: "/products" },
        { name: "New Arrivals", href: "/products/new" },
        { name: "Best Sellers", href: "/products/bestsellers" },
      ],
    },
    {
      name: "Solutions",
      href: "#",
      subItems: [
        { name: "Marketing", href: "/solutions/marketing" },
        { name: "Analytics", href: "/solutions/analytics" },
        { name: "Commerce", href: "/solutions/commerce" },
      ],
    },
    { name: "Resources", href: "/resources" },
    { name: "Contact", href: "/contact" },
  ];

  // Track cursor position for hover effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Custom cursor effect element
  const CursorEffect = () => (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-100 ease-out"
      style={{
        left: `${cursorPos.x}px`,
        top: `${cursorPos.y}px`,
        transform: `translate(-50%, -50%) scale(${hoveredItem ? 1.5 : 1})`,
      }}
    >
      <div
        className={`w-4 h-4 rounded-full transition-all duration-300 ${
          hoveredItem ? "bg-white mix-blend-difference" : "bg-purple-500/30"
        }`}
      />
    </div>
  );

  return (
    <>
      <CursorEffect />
      
      <header
        className={`fixed w-full top-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-lg shadow-sm py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Minimal Logo with Hover Effect */}
            <Link
              href="/"
              className="relative group"
              onMouseEnter={() => setHoveredItem("logo")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="flex items-center space-x-2">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg transform group-hover:rotate-12 transition-all duration-500" />
                  <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                    U
                  </span>
                </div>
                <span
                  className={`text-xl font-bold tracking-tight ${
                    isScrolled ? "text-gray-900" : "text-white"
                  } group-hover:text-purple-600 transition-colors duration-500`}
                >
                  Ultra
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => {
                    setActiveMenu(item.name);
                    setHoveredItem(item.name);
                  }}
                  onMouseLeave={() => {
                    setActiveMenu(null);
                    setHoveredItem(null);
                  }}
                >
                  <Link
                    href={item.href}
                    className={`px-5 py-3 text-sm font-medium relative overflow-hidden transition-all duration-300 ${
                      isScrolled ? "text-gray-800" : "text-white"
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {/* Hover underline effect */}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 ${
                        activeMenu === item.name ? "w-full" : "w-0"
                      }`}
                    />
                    {/* Background highlight */}
                    <span
                      className={`absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg transition-all duration-500 ${
                        activeMenu === item.name
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95"
                      }`}
                    />
                  </Link>

                  {/* Mega Dropdown */}
                  {item.subItems && (
                    <div
                      className={`absolute left-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 origin-top ${
                        activeMenu === item.name
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-0 scale-95 translate-y-2 pointer-events-none"
                      }`}
                    >
                      <div className="p-2 space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-300 group relative overflow-hidden"
                          >
                            <span className="relative z-10">
                              {subItem.name}
                            </span>
                            <span className="absolute left-0 top-0 h-full w-1 bg-purple-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg focus:outline-none"
              onClick={() => setMobileOpen(!mobileOpen)}
              onMouseEnter={() => setHoveredItem("menu")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="w-6 h-6 relative">
                <span
                  className={`absolute block w-full h-0.5 rounded-full transition-all duration-300 ${
                    isScrolled ? "bg-gray-800" : "bg-white"
                  } ${mobileOpen ? "rotate-45 top-1/2" : "top-1"}`}
                />
                <span
                  className={`absolute block w-full h-0.5 rounded-full transition-all duration-300 ${
                    isScrolled ? "bg-gray-800" : "bg-white"
                  } ${mobileOpen ? "opacity-0" : "top-1/2"}`}
                />
                <span
                  className={`absolute block w-full h-0.5 rounded-full transition-all duration-300 ${
                    isScrolled ? "bg-gray-800" : "bg-white"
                  } ${mobileOpen ? "-rotate-45 top-1/2" : "bottom-1"}`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 bg-gradient-to-b from-gray-900 to-purple-900/95 backdrop-blur-lg z-30 transition-all duration-500 ease-in-out ${
            mobileOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full"
          }`}
        >
          <div className="h-full flex flex-col justify-center px-6 py-20">
            <nav className="space-y-6">
              {navItems.map((item) => (
                <div key={item.name} className="overflow-hidden">
                  <Link
                    href={item.href}
                    className={`block text-2xl font-medium py-4 px-6 rounded-xl transition-all duration-500 ${
                      activeMenu === item.name
                        ? "bg-white/10 text-white"
                        : "text-white/80 hover:text-white"
                    }`}
                    onClick={() => {
                      if (!item.subItems) setMobileOpen(false);
                      else setActiveMenu(activeMenu === item.name ? null : item.name);
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span>{item.name}</span>
                      {item.subItems && (
                        <span
                          className={`transform transition-transform duration-300 ${
                            activeMenu === item.name ? "rotate-180" : ""
                          }`}
                        >
                          ▼
                        </span>
                      )}
                    </div>
                  </Link>

                  {item.subItems && (
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        activeMenu === item.name
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pl-8 pt-2 space-y-4">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block text-lg text-white/70 hover:text-white transition-all duration-300 py-2 px-4 rounded-lg hover:bg-white/10"
                            onClick={() => setMobileOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Global Styles */}
      <style jsx global>{`
        /* Smooth scrolling for anchor links */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #6366f1);
          border-radius: 10px;
        }
        
        /* Animation for menu items */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Animation for background gradient */
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
};

export default Header;