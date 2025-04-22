"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Search, User, ShoppingBag, Bell } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const mobileMenuRef = useRef(null);

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

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent hidden sm:block">
              Master Site
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors duration-300"
                    onMouseEnter={() => item.subItems && setActiveDropdown(item.name)}
                  >
                    {item.name}
                  </Link>
                  {item.subItems && (
                    <button
                      className="p-1 text-gray-500 hover:text-purple-600 transition-colors"
                      onClick={() => toggleDropdown(item.name)}
                      onMouseEnter={() => setActiveDropdown(item.name)}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                {item.subItems && activeDropdown === item.name && (
                  <div
                    className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 p-2 z-50"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-md transition-colors duration-200"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <button className="p-2 text-gray-500 hover:text-purple-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-purple-600 transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-pink-500 rounded-full"></span>
            </button>
            <button className="p-2 text-gray-500 hover:text-purple-600 transition-colors">
              <ShoppingBag className="h-5 w-5" />
            </button>
            <button className="flex items-center space-x-1 pl-2 pr-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-100 text-purple-600 hover:shadow-sm transition-all duration-300">
              <User className="h-5 w-5" />
              <span className="text-sm font-medium">Sign In</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-3">
            <button className="p-2 text-gray-500 hover:text-purple-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-500 hover:text-purple-600 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden bg-white shadow-lg rounded-lg mt-2 overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-3">
            <div className="space-y-1">
              {navItems.map((item) => (
                <div key={item.name} className="border-b border-gray-100 last:border-0">
                  <div className="flex flex-col">
                    <Link
                      href={item.href}
                      className="flex items-center justify-between py-3 text-gray-700 hover:text-purple-600 transition-colors"
                      onClick={() => !item.subItems && setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                      {item.subItems && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleDropdown(item.name);
                          }}
                          className="p-1"
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              activeDropdown === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </Link>
                    {item.subItems && activeDropdown === item.name && (
                      <div className="pl-4 pb-2 space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block py-2 text-sm text-gray-600 hover:text-purple-600 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors">
                  <User className="h-5 w-5" />
                  <span>Account</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors">
                  <ShoppingBag className="h-5 w-5" />
                  <span>Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;