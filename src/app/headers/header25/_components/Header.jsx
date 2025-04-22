"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isContactVisible, setIsContactVisible] = useState(true);
  const lastScrollY = useRef(0);
  const dropdownTimeout = useRef(null); // Ref to store timeout for submenu auto-close
  const hoverTimeout = useRef(null); // Ref to store hover timeout for mouse leave

  const toggleDropdown = (itemName) => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current); // Clear any existing timeout
    }
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current); // Clear any existing hover timeout
    }
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  const handleMouseEnter = (itemName) => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current); // Clear any existing hover timeout
    }
    if (openDropdown !== itemName) {
      setOpenDropdown(itemName);
    }
  };

  const handleMouseLeave = (itemName) => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current); // Clear any existing hover timeout
    }
    hoverTimeout.current = setTimeout(() => {
      if (openDropdown === itemName) {
        setOpenDropdown(null);
      }
    }, 200); // 2-second delay before closing
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle scroll to hide/show contact bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setIsContactVisible(false); // Hide on scroll down
      } else {
        setIsContactVisible(true); // Show on scroll up
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    {
      name: "Products",
      href: "/",
      subItems: [
        { name: "All Products", href: "/" },
        { name: "New Arrivals", href: "/" , hot: true},
        { name: "Best Sellers", href: "/" },
        { name: "Categories", href: "/" },
        { name: "Inner Pages", href: "/tools/inner-pages" },
        { name: "Style Guide", href: "/tools/style-guide", hot: true },
        { name: "Sign In", href: "/tools/sign-in" },
        { name: "Sign Up", href: "/tools/sign-up" },
        { name: "Team", href: "/tools/team" },
        { name: "Terms & Policy", href: "/tools/terms" },
        { name: "Privacy Policy", href: "/tools/privacy" },
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
        { name: "Appearance", href: "/" },
        { name: "Plans and Billing", href: "/" },
        { name: "Sessions", href: "/" },
        { name: "Application", href: "/" },
        { name: "Release Notes", href: "/" },
        { name: "Help & FAQs", href: "/" },
      ],
    },
    { name: "Resources", href: "/" },
    { name: "Pricing", href: "/" },
  ];

  return (
    <header className="text-white sticky top-0 z-50">
      <nav
        className={`px-4 sm:px-6 lg:px-8 py-3 transition-all duration-700 ease-in-out ${
          isContactVisible ? "" : "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
        }`}
      >
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-cyan-400 rounded-lg flex items-center justify-center transform transition-all duration-500 ease-out group-hover:scale-110">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span  className={`text-xl font-bold  transition-all duration-500 ease-out ${
          isContactVisible ? "text-black" : " text-cyan-300"
        }`}>
                Master Site
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 border-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-5 py-2 rounded-full">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={() => handleMouseLeave(item.name)}
              >
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex items-center text-gray-300 hover:text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700/50 transition-all duration-500 ease-in-out hover:shadow-md"
                    >
                      {item.name}
                      {openDropdown === item.name || (item.name === openDropdown && item.subItems) ? (
                        <ChevronUp className="ml-1 h-4 w-4 transition-transform duration-500 ease-in-out" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-500 ease-in-out" />
                      )}
                      {item.subItems.some((sub) => sub.hot) && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-600 text-white">
                          Hot
                        </span>
                      )}
                    </button>
                    {(openDropdown === item.name || (item.name === openDropdown && item.subItems)) && (
                      <div className="absolute left-0 mt-2 w-64 bg-gray-800/90 backdrop-blur-md rounded-md shadow-lg py-2 z-50 transition-all duration-700 ease-in-out opacity-100 scale-100">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-all duration-500 ease-in-out hover:shadow-inner"
                            onClick={() => {
                              setOpenDropdown(null);
                              if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                            }}
                          >
                            {subItem.name}
                            {subItem.hot && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-600 text-white">
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
                    className="text-gray-300 hover:text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700/50 transition-all duration-500 ease-in-out hover:shadow-md"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Button */}
          <div className="hidden md:block">
            <Link
              href="/get-start"
              className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-500 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Get Start
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700/50 focus:outline-none transition-all duration-500 ease-in-out"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 bg-gray-800/90 backdrop-blur-md rounded-md shadow-lg p-2 transition-all duration-700 ease-in-out">
            {navItems.map((item) => (
              <div key={item.name} className="px-2 py-1">
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex w-full items-center justify-between px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-all duration-500 ease-in-out"
                    >
                      {item.name}
                      {item.subItems.some((sub) => sub.hot) && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-600 text-white">
                          Hot
                        </span>
                      )}
                      {openDropdown === item.name ? (
                        <ChevronUp className="h-5 w-5 transition-transform duration-500 ease-in-out" />
                      ) : (
                        <ChevronDown className="h-5 w-5 transition-transform duration-500 ease-in-out" />
                      )}
                    </button>
                    {openDropdown === item.name && (
                      <div className="pl-4 mt-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-all duration-500 ease-in-out"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setOpenDropdown(null);
                              if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                            }}
                          >
                            {subItem.name}
                            {subItem.hot && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-600 text-white">
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
                    className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-all duration-500 ease-in-out"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="mt-2">
              <Link
                href="/get-start"
                className="block w-full text-center bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-500 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Get Start
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;