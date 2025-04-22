"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

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

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-2 px-4 flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">
            Are you ready to free case evaluation today?{" "}
            <Link href="/contact" className="text-yellow-300 font-bold underline">
              Contact Us
            </Link>
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10z" />
            </svg>
            <span>info@disgdsfsdfsfs.com</span>
          </span>
          <span className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M15.883 18.793a1 1 0 00-.287.801L11.5 17.21l-3.117 1.287a1 1 0 00-.287.801C7.98 20.11 7 19.1 7 18V6c0-1.1.9-2 2-2h4a2 2 0 012 2v12a2 2 0 01-2 2H9a1 1 0 01-1-1v-4a1 1 0 00-1-1H6a1 1 0 00-1 1v4a1 1 0 01-1 1H2a2 2 0 00-2 2v12c0 1.1.9 2 2 2h16a2 2 0 002-2v-12a2 2 0 012-2h1a1 1 0 011 1v4a1 1 0 001 1h4a1 1 0 011-1v-4a1 1 0 00-1-1h-1a2 2 0 00-2-2V6c0-1.1-.9-2-2-2h-4a2 2 0 01-2-2v-3.5c0-.8.6-1.5 1.5-1.5h15c.9 0 1.5.7 1.5 1.5V6a2 2 0 01-2 2h-4a1 1 0 00-1 1v12a1 1 0 01-1 1H15.883zM18 6v12H6V6h12z" />
            </svg>
            <span>(555) 123-4567</span>
          </span>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-extrabold text-gray-900 bg-gradient-to-r from-yellow-500 to-yellow-700 bg-clip-text text-transparent hidden sm:block transition-all duration-300 group-hover:tracking-wide">
                Master Site
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                    >
                      {item.name}
                      {openDropdown === item.name ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </button>
                    {openDropdown === item.name && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
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
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Donate Button */}
          <div className="md:flex items-center hidden">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full flex items-center space-x-2">
              <span>Log In</span>
              <ChevronUp className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-3">
            {navItems.map((item) => (
              <div key={item.name} className="px-2 pt-2">
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex w-full items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                    >
                      {item.name}
                      {openDropdown === item.name ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                    {openDropdown === item.name && (
                      <div className="pl-4">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
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
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;