"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isContactVisible, setIsContactVisible] = useState(true);
  const lastScrollY = useRef(0);

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

  const toggleDropdown = (itemName) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
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

  return (
    <header className=" text-white  sticky top-0 z-50 transition-all duration-300">
      <nav className="">
        {/* Top Contact Bar with Scroll Transition */}
        <div
          className={`hidden md:flex justify-between items-center py-2 px-10 text-sm border-b border-teal-700/50 transition-all duration-500 bg-gradient-to-r from-blue-900/80 via-teal-900/80 to-blue-900/80 backdrop-blur-md ${
            isContactVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
          }`}
        >
          <div className="flex space-x-4">
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400">📍</span>
              <span>Jones Street, New York, USA</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400">📧</span>
              <span>Info@example.com</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400">📞</span>
              <span>+70 264 566 579</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <a href="#" className="hover:text-yellow-400 transition-colors duration-300">
              <span className="sr-only">Facebook</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors duration-300">
              <span className="sr-only">Twitter</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.73-.669 1.585-.669 2.492 0 1.714.87 3.23 2.188 4.118-.807-.026-1.566-.248-2.228-.616v.062c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.396 0-.788-.023-1.175-.068 2.187 1.405 4.787 2.224 7.544 2.224 9.056 0 14.01-7.496 14.01-13.986 0-.21-.005-.42-.015-.63.962-.695 1.8-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors duration-300">
              <span className="sr-only">Instagram</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.974.974 1.248 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.974.974-2.242 1.248-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.974-.974-1.248-2.242-1.31-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.974-.974 2.242-1.248 3.608-1.31 1.266-.058 1.646-.07 4.85-.07m0-2.163c-3.259 0-3.67.014-4.947.072-1.29.061-2.52.28-3.647.811-1.127.53-2.096 1.5-2.627 2.627-.53 1.127-.75 2.357-.811 3.647-.059 1.277-.073 1.689-.073 4.947s.014 3.67.073 4.947c.061 1.29.28 2.52.811 3.647.53 1.127 1.5 2.096 2.627 2.627 1.127.53 2.357.75 3.647.811 1.277.059 1.689.073 4.947.073s3.67-.014 4.947-.073c1.29-.061 2.52-.28 3.647-.811 1.127-.53 2.096-1.5 2.627-2.627.53-1.127.75-2.357.811-3.647.059-1.277.073-1.689.073-4.947s-.014-3.67-.073-4.947c-.061-1.29-.28-2.52-.811-3.647-.53-1.127-1.5-2.096-2.627-2.627-1.127-.53-2.357-.75-3.647-.811-1.277-.059-1.689-.073-4.947-.073z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Main Navigation */}
        <div className={`bg-yellow-400/90 backdrop-blur-md py-2 flex items-center justify-between md:justify-start px-10  transition-all duration-300${
            isContactVisible ? "opacity-100 translate-y-0" : "opacity-0 md:-translate-y-10"
          }`}>
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-400 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-2xl font-extrabold text-gray-800 bg-gradient-to-r from-gray-800 to-teal-900 bg-clip-text transition-all duration-300 group-hover:tracking-wider">
                Translo
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6 flex-1 justify-center">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex items-center text-gray-800 hover:text-teal-900 px-4 py-2 text-sm font-medium rounded-md bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-300"
                    >
                      {item.name}
                      {openDropdown === item.name ? (
                        <ChevronUp className="ml-1 h-4 w-4 transition-transform duration-300" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300" />
                      )}
                    </button>
                    {openDropdown === item.name && (
                      <div className="absolute left-0 mt-2 w-48 bg-white/90 backdrop-blur-md rounded-lg shadow-xl py-1 z-50 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-2">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-100/50 hover:text-teal-900 rounded-md transition-all duration-300"
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
                    className="text-gray-800 hover:text-teal-900 px-4 py-2 text-sm font-medium rounded-md bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-white/80 text-gray-800 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-900 transition-all duration-300 placeholder-gray-500"
              />
            </div>
            <Link
              href="/quote"
              className="bg-white/90 text-teal-900 font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-teal-900 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-full text-gray-800 hover:text-teal-900 hover:bg-white/20 focus:outline-none transition-all duration-300"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-yellow-400/90 backdrop-blur-md text-gray-800 pb-4 shadow-lg transition-all duration-300">
            <div className="px-4 pt-2 text-sm bg-teal-800/80 text-white py-2 rounded-b-lg">
              Jones Street, New York, USA | Info@example.com | +70 264 566 579
            </div>
            {navItems.map((item) => (
              <div key={item.name} className="px-4 pt-2">
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex w-full items-center justify-between px-3 py-2 text-base font-medium text-gray-800 hover:text-teal-900 rounded-md bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-300"
                    >
                      {item.name}
                      {openDropdown === item.name ? (
                        <ChevronUp className="h-5 w-5 transition-transform duration-300" />
                      ) : (
                        <ChevronDown className="h-5 w-5 transition-transform duration-300" />
                      )}
                    </button>
                    {openDropdown === item.name && (
                      <div className="pl-4">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-teal-900 hover:bg-yellow-100/50 rounded-md transition-all duration-300"
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
                    className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-teal-900 rounded-md bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="px-4 pt-2">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-white/80 text-gray-800 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-900 transition-all duration-300 placeholder-gray-500"
              />
            </div>
            <div className="px-4 pt-2">
              <Link
                href="/quote"
                className="block w-full text-center bg-white/90 text-teal-900 font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-teal-900 hover:text-white transition-all duration-300 transform hover:scale-105"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;