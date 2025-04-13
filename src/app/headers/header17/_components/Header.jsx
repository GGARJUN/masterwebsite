"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Moon, Sun, Menu, X } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const lastScrollY = useRef(0);
  const timeoutRef = useRef(null);

  const leftNavItems = [
    { 
      name: "Solutions", 
      href: "/solutions", 
      subItems: [
        { name: "Product Development", href: "/solutions/product-dev" },
        { name: "Digital Transformation", href: "/solutions/digital-transformation" },
      ]
    },
    { 
      name: "Services", 
      href: "/services", 
      subItems: [
        { name: "Cloud Services", href: "/services/cloud" },
        { name: "AI & ML", href: "/services/ai-ml" },
        { name: "DevOps", href: "/services/devops" },
        { name: "Web Development", href: "/services/Web Development" }
      ]
    },
    { 
      name: "Industries", 
      href: "/industries", 
      subItems: [
        { name: "Healthcare", href: "/industries/healthcare" },
        { name: "Finance", href: "/industries/finance" },
        { name: "Education", href: "/industries/education" },
      ]
    },
  ];

  const rightNavItems = [
    { 
      name: "Resources", 
      href: "/resources", 
      subItems: [
        { name: "Blog", href: "/resources/blog" },
        { name: "Case Studies", href: "/resources/case-studies" },
        { name: "Whitepapers", href: "/resources/whitepapers" },
      ]
    },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleDropdown = (itemName) => {
    setOpenDropdown((prev) => (prev === itemName ? null : itemName));
  };

  const handleMouseEnter = (itemName) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const item = [...leftNavItems, ...rightNavItems].find((i) => i.name === itemName);
    if (item?.subItems) setOpenDropdown(itemName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return; // Safeguard for server-side rendering
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 0);
      if (currentScrollY > lastScrollY.current + 10) {
        setHidden(true);
      } else if (currentScrollY < lastScrollY.current - 10) {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      className={`w-full z-50 transition-all duration-300 ${
        isScrolled
          ? `fixed top-0 ${
              darkMode
                ? "bg-gray-900 text-gray-100 border-b border-gray-800"
                : "bg-white text-gray-900 border-b border-gray-200"
            } ${hidden ? "-translate-y-full" : "translate-y-0"}`
          : `absolute ${
              darkMode ? "bg-transparent text-gray-100" : "bg-transparent text-white"
            }`
      }`}
    >
      <div className="mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 max-w-7xl">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center group" onClick={handleLinkClick}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-md ${
                darkMode
                  ? "bg-gradient-to-br from-indigo-600 to-purple-600"
                  : "bg-gradient-to-br from-blue-600 to-indigo-700"
              }`}
            >
              <span className="text-xl font-bold text-white">T</span>
            </div>
            <span
              className={`ml-2 text-xl font-extrabold bg-clip-text text-transparent ${
                darkMode
                  ? "bg-gradient-to-r from-gray-100 to-gray-300"
                  : isScrolled
                  ? "bg-gradient-to-r from-gray-900 to-black"
                  : "bg-gradient-to-r from-white to-gray-300"
              } transition-all duration-300 group-hover:text-white`}
            >
              TechNova
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-4">
          {leftNavItems.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => toggleDropdown(item.name)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  darkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-800"
                    : isScrolled
                    ? "text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
                    : "text-gray-200 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.name}
                {item.subItems && (
                  <span className="ml-1 transition-transform duration-300">
                    {openDropdown === item.name ? "▲" : "▼"}
                  </span>
                )}
              </button>
              {item.subItems && openDropdown === item.name && (
                <div
                  className={`absolute left-0 mt-2 w-56 rounded-lg shadow-lg p-2 z-50 animate-fadeIn ${
                    darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                  }`}
                >
                  {item.subItems.map((subItem) =>
                    subItem.subItems ? (
                      <div key={subItem.name} className="relative">
                        <button
                          onClick={() => toggleDropdown(subItem.name)}
                          className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                            darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {subItem.name}
                          <span className="ml-1 transition-transform duration-300">
                            {openDropdown === subItem.name ? "▲" : "▼"}
                          </span>
                        </button>
                        {subItem.subItems && openDropdown === subItem.name && (
                          <div
                            className={`absolute left-full top-0 mt-0 w-56 rounded-lg shadow-lg p-2 z-50 animate-slideIn ${
                              darkMode ? "bg-gray-700 border border-gray-600" : "bg-gray-50 border border-gray-200"
                            }`}
                          >
                            {subItem.subItems.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                className={`block px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                                  darkMode ? "text-gray-300 hover:bg-gray-600" : "text-gray-700 hover:bg-gray-100"
                                }`}
                                onClick={handleLinkClick}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={`block px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                          darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={handleLinkClick}
                      >
                        {subItem.name}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          ))}

          {rightNavItems.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                      darkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : isScrolled
                          ? "text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
                          : "text-gray-200 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.name}
                    <span className="ml-1 transition-transform duration-300">
                      {openDropdown === item.name ? "▲" : "▼"}
                    </span>
                  </button>
                  {item.subItems && openDropdown === item.name && (
                    <div
                      className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg p-2 z-50 animate-fadeIn ${
                        darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                      }`}
                    >
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                            darkMode
                              ? "text-gray-300 hover:bg-gray-700"
                              : "text-gray-700 hover:bg-gray-100"
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
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                    darkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-800"
                      : isScrolled
                        ? "text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
                        : "text-gray-200 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-all duration-300 ${
              darkMode
                ? "text-yellow-300 hover:bg-gray-700"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-all duration-300 ${
              darkMode
                ? "text-yellow-300 hover:bg-gray-700"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-full transition-all duration-300 ${
              darkMode
                ? "text-gray-300 hover:bg-gray-700"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden fixed inset-0 z-40 overflow-y-auto ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
        }`}>
          <div className={`flex justify-between items-center p-4 border-b ${
            darkMode ? "border-gray-800" : "border-gray-200"
          }`}>
            <Link
              href="/"
              className="text-xl font-bold flex items-center"
              onClick={handleLinkClick}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                  darkMode ? "bg-indigo-600" : "bg-blue-600"
                }`}
              >
                <span className="text-sm font-bold text-white">T</span>
              </div>
              TechNova
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className={`p-2 rounded-full ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
              } transition-all duration-200`}
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-4 space-y-2">
            {[...leftNavItems, ...rightNavItems].map((item) => (
              <div key={item.name}>
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className={`w-full flex items-center justify-between py-3 px-2 text-base font-medium rounded-md transition-all duration-200 ${
                    darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                  {item.subItems && (
                    <span className="transition-transform duration-300">
                      {openDropdown === item.name ? "▲" : "▼"}
                    </span>
                  )}
                </button>
                {item.subItems && openDropdown === item.name && (
                  <div className="pl-4 mt-1 space-y-1">
                    {item.subItems.map((subItem) =>
                      subItem.subItems ? (
                        <div key={subItem.name}>
                          <button
                            onClick={() => toggleDropdown(subItem.name)}
                            className={`w-full flex items-center justify-between py-2 px-2 text-sm rounded-md transition-all duration-200 ${
                              darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                            }`}
                          >
                            {subItem.name}
                            <span className="transition-transform duration-300">
                              {openDropdown === subItem.name ? "▲" : "▼"}
                            </span>
                          </button>
                          {subItem.subItems && openDropdown === subItem.name && (
                            <div className="pl-4 mt-1 space-y-1">
                              {subItem.subItems.map((child) => (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  className={`block py-2 px-2 text-sm rounded-md transition-all duration-200 ${
                                    darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                                  }`}
                                  onClick={handleLinkClick}
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block py-2 px-2 text-sm rounded-md transition-all duration-200 ${
                            darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                          }`}
                          onClick={handleLinkClick}
                        >
                          {subItem.name}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-15px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out forwards; }
        .animate-slideIn { animation: slideIn 0.3s ease-out forwards; }
      `}</style>
    </header>
  );
};

export default Header;