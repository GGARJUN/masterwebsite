"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Menu, X, Search, User, ShoppingCart, Bell } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dropdownRefs = useRef({});
  const mobileMenuRef = useRef(null);

  const navItems = [
    { name: "Home", href: "/" },
    {
      name: "Products",
      href: "/",
      subItems: [
        { name: "All Products", href: "/products" },
        { name: "New Arrivals", href: "/products/new" },
        { name: "Best Sellers", href: "/products/bestsellers" },
        { name: "Categories", href: "/categories" },
      ],
    },
    {
      name: "Solutions",
      href: "/",
      subItems: [
        { name: "Marketing", href: "/solutions/marketing" },
        { name: "Analytics", href: "/solutions/analytics" },
        { name: "Commerce", href: "/solutions/commerce" },
        { name: "Insights", href: "/solutions/insights" },
      ],
    },
    { name: "Resources", href: "/resources" },
    { name: "Pricing", href: "/pricing" },
  ];

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(lastScrollY > currentScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
        isVisible
          ? "translate-y-0 bg-white/95 backdrop-blur-xl shadow-lg"
          : "-translate-y-full bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-400 flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-md">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-900 to-blue-600 bg-clip-text text-transparent hidden sm:block transition-all duration-300 group-hover:tracking-wider">
              MasterSite
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                ref={(el) => (dropdownRefs.current[item.name] = el)}
              >
                <Link
                  href={item.href}
                  className="flex items-center px-4 py-2 text-sm font-semibold text-gray-700 rounded-full transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-indigo-50 group-hover:to-blue-50 group-hover:text-indigo-700"
                >
                  {item.name}
                  {item.subItems && (
                    <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                  )}
                </Link>
                {item.subItems && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100/30 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:-translate-y-1 z-50"
                  >
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 hover:text-indigo-700 transition-all duration-300 relative overflow-hidden before:absolute before:inset-0 before:w-1 before:bg-indigo-500 before:transform before:-translate-x-full before:transition-transform before:duration-300 hover:before:translate-x-0"
                      >
                        <span className="relative z-10">{subItem.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search and Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 w-56 group-hover:w-64 group-hover:shadow-md bg-gray-50"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 transition-colors duration-300 group-hover:text-indigo-500" />
            </div>
            <button className="p-2 text-gray-600 rounded-full transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md relative group">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
            </button>
            <button className="p-2 text-gray-600 rounded-full transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md">
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button className="flex items-center space-x-1 p-2 text-gray-600 rounded-full transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md">
              <User className="h-5 w-5" />
              <span className="text-sm font-medium hidden xl:inline">Account</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-3">
            <button className="p-2 text-gray-600 rounded-full transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-600">
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 rounded-full transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-600"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden bg-white shadow-xl transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-screen py-4" : "max-h-0 py-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-4 px-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 bg-gray-50"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="space-y-2">
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-gray-100/50 last:border-0">
                <div className="group relative">
                  <Link
                    href={item.href}
                    className="flex w-full items-center justify-between px-4 py-3 text-base font-medium text-gray-900 rounded-lg transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-700"
                    onClick={() => item.subItems || setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                    {item.subItems && (
                      <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300 group-hover:rotate-180" />
                    )}
                  </Link>
                  {item.subItems && (
                    <div
                      className={`pl-6 overflow-hidden transition-all duration-300 ${
                        isMobileMenuOpen && item.subItems ? "max-h-96 py-2" : "max-h-0"
                      }`}
                    >
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 rounded-lg transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-700"
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

          <div className="mt-6 pt-6 border-t border-gray-200/50">
            <div className="flex items-center justify-center space-x-6 px-4">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-700 transition-all duration-300">
                <User className="h-5 w-5" />
                <span className="text-sm font-medium">Account</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-700 transition-all duration-300">
                <ShoppingCart className="h-5 w-5" />
                <span className="text-sm font-medium">Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;