"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Moon, Sun, Menu, X, ChevronDownIcon, ArrowRightIcon, ChartBarIcon, TagIcon, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const lastScrollY = useRef(0);
  const timeoutRef = useRef(null);

  const leftNavItems = [
    { name: "Home", href: "/" },
    {
      name: "Products",
      href: "#",
      subItems: [
        { name: "All Products", href: "/", image: "https://img.freepik.com/free-photo/3d-rendering-cartoon-shopping-cart_23-2151680650.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740" },
        { name: "New Arrivals", href: "/", image: "https://img.freepik.com/free-photo/happy-asian-teen-woman-shopping-clothing-fashion-store-shopping-mall-isolated-pink-background_74952-4128.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740" },
        { name: "Best Sellers", href: "/", image: "https://img.freepik.com/free-photo/young-woman-yellow-leather-jacket-sales-banner_23-2148674149.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740" },
        { name: "Categories", href: "/", image: "https://img.freepik.com/free-photo/programming-background-with-html-text_23-2150040418.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740" },
      ],
    },
    {
      name: "Solutions",
      href: "#",
      subItems: [
        { name: "Marketing", href: "/", image: "https://img.freepik.com/free-photo/commerce-business-marketing-strategy-finance-concept_53876-121544.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740" },
        { name: "Analytics", href: "/", image: "https://img.freepik.com/free-photo/businesswoman-working-with-modern-virtual-technologies-hands-touching-screen_1212-718.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740" },
        { name: "Commerce", href: "/", image: "https://img.freepik.com/free-photo/portrait-man-going-out-shopping-various-consumer-goods_23-2151669824.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740" },
        { name: "Insights", href: "/", image: "https://img.freepik.com/free-photo/representation-user-experience-interface-design_23-2150169851.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740" },
      ],
    },
  ];

  const rightNavItems = [
    { name: "Resources", href: "/contact" },
    { name: "Pricing", href: "/pricing" },
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
      if (typeof window === "undefined") return;
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

  const getIconForItem = (itemName) => {
    const icons = {
      "All Products": <ShoppingCartIcon className="w-6 h-6" />,
      "New Arrivals": <ArrowRightIcon className="w-6 h-6" />,
      "Best Sellers": <ChartBarIcon className="w-6 h-6" />,
      Categories: <TagIcon className="w-6 h-6" />,
      Marketing: <ArrowRightIcon className="w-6 h-6" />,
      Analytics: <ChartBarIcon className="w-6 h-6" />,
      Commerce: <ShoppingCartIcon className="w-6 h-6" />,
      Insights: <ArrowRightIcon className="w-6 h-6" />,
    };
    return icons[itemName] || <ShoppingCartIcon className="w-6 h-6" />;
  };

  return (
    <header
      className={`w-full z-50 transition-all duration-300 ${
        isScrolled
          ? `fixed top-0 ${
              darkMode
                ? "bg-gray-900/80 text-gray-100 border-b border-gray-800 backdrop-blur-xl"
                : "bg-white/90 text-gray-900 border-b border-gray-200 backdrop-blur-xl"
            } ${hidden ? "-translate-y-full" : "translate-y-0"}`
          : `absolute ${
              darkMode ? "bg-transparent text-gray-100" : "bg-transparent text-white"
            }`
      }`}
    >
      <div className="mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 max-w-7xl relative">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center group" onClick={handleLinkClick}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(79,70,229,0.6)] animate-pulse-slow ${
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
                  ? "bg-gradient-to-r from-gray-100 to-purple-300"
                  : isScrolled
                  ? "bg-gradient-to-r from-indigo-700 to-purple-600"
                  : "bg-gradient-to-r from-white to-indigo-300"
              } transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-indigo-500`}
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
              className=" group"
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => toggleDropdown(item.name)}
                className={`flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${
                  darkMode
                    ? "text-gray-200 hover:text-purple-300 hover:bg-gray-800/50"
                    : isScrolled
                    ? "text-indigo-800 hover:text-purple-600 hover:bg-indigo-100/50"
                    : "text-white hover:text-purple-300 hover:bg-white/10"
                }`}
              >
                {item.name}
                {item.subItems && (
                  <ChevronDownIcon
                    className={`ml-1 w-4 h-4 transition-transform duration-300 ${
                      openDropdown === item.name ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>
              {item.subItems && openDropdown === item.name && (
                <div className="absolute left-0 right-0 top-full mt-2 wn bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] z-50 animate-zoom-in">
                  <div className="grid grid-cols-2 gap-6 p-8 max-w-7xl mx-auto h-full">
                    <div className="flex flex-col space-y-4">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="group/sub flex items-center px-6 py-4 bg-gradient-to-r from-gray-800/60 to-gray-700/60 hover:from-purple-500/40 hover:to-indigo-500/40 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(168,85,247,0.4)] animate-slide-in"
                          onClick={handleLinkClick}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="text-purple-400 group-hover/sub:text-white transition-colors duration-300">
                              {getIconForItem(subItem.name)}
                            </div>
                            <div>
                              <span className="block text-base font-medium text-white group-hover/sub:text-purple-200 transition-colors duration-300">
                                {subItem.name}
                              </span>
                              <span className="block text-sm text-gray-400 group-hover/sub:text-gray-200 transition-colors duration-300">
                                Explore {subItem.name.toLowerCase()}
                              </span>
                            </div>
                          </div>
                          <ArrowRightIcon className="ml-auto w-5 h-5 text-purple-400 opacity-0 group-hover/sub:opacity-100 transform translate-x-2 group-hover/sub:translate-x-0 transition-all duration-300" />
                        </Link>
                      ))}
                    </div>
                    <div className="relative overflow-hidden rounded-xl">
                      <div className="grid grid-cols-2 gap-4 h-full animate-fade-in">
                        {item.subItems.slice(0, 4).map((subItem) => (
                          <div
                            key={subItem.name}
                            className="relative group/image overflow-hidden rounded-lg"
                          >
                            <Image
                              src={subItem.image}
                              alt={`${subItem.name} illustration`}
                              width={300}
                              height={200}
                              className="object-cover w-full h-full transition-transform duration-500 group-hover/image:scale-110"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end p-4">
                              <span className="text-white text-sm font-semibold">
                                {subItem.name}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {rightNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`px-3 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${
                darkMode
                  ? "text-gray-200 hover:text-purple-300 hover:bg-gray-800/50"
                  : isScrolled
                  ? "text-indigo-800 hover:text-purple-600 hover:bg-indigo-100/50"
                  : "text-white hover:text-purple-300 hover:bg-white/10"
              }`}
            >
              {item.name}
            </Link>
          ))}

          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-all duration-300 ${
              darkMode
                ? "text-purple-300 hover:bg-gray-800/50 hover:shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                : "text-indigo-600 hover:bg-indigo-100/50 hover:shadow-[0_0_10px_rgba(79,70,229,0.3)]"
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="lg:hidden flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-all duration-300 ${
              darkMode
                ? "text-purple-300 hover:bg-gray-800/50"
                : "text-indigo-600 hover:bg-indigo-100/50"
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-full transition-all duration-300 ${
              darkMode
                ? "text-gray-200 hover:bg-gray-800/50"
                : "text-indigo-600 hover:bg-indigo-100/50"
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div
          className={`lg:hidden fixed inset-0 z-40 overflow-y-auto transition-all duration-500 ${
            darkMode ? "bg-gray-900/95 text-gray-100 backdrop-blur-xl" : "bg-white/95 text-indigo-900 backdrop-blur-xl"
          }`}
        >
          <div
            className={`flex justify-between items-center p-4 border-b ${
              darkMode ? "border-gray-800" : "border-indigo-200"
            }`}
          >
            <Link
              href="/"
              className="text-xl font-bold flex items-center"
              onClick={handleLinkClick}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                  darkMode ? "bg-gradient-to-br from-indigo-600 to-purple-600" : "bg-gradient-to-br from-blue-600 to-indigo-700"
                }`}
              >
                <span className="text-sm font-bold text-white">T</span>
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">
                TechNova
              </span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className={`p-2 rounded-full transition-all duration-300 ${
                darkMode ? "text-gray-200 hover:bg-gray-800/50" : "text-indigo-600 hover:bg-indigo-100/50"
              }`}
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-4 space-y-3">
            {[...leftNavItems, ...rightNavItems].map((item) => (
              <div key={item.name}>
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`w-full flex items-center justify-between py-3 px-3 text-base font-semibold rounded-lg transition-all duration-300 ${
                        darkMode
                          ? "text-gray-200 hover:text-purple-300 hover:bg-gray-800/50"
                          : "text-indigo-800 hover:text-purple-600 hover:bg-indigo-100/50"
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDownIcon
                        className={`w-5 h-5 transition-transform duration-300 ${
                          openDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === item.name && (
                      <div className="pl-4 pt-2 space-y-2 animate-slide-in">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`flex flex-col py-2 px-3 rounded-lg transition-all duration-300 ${
                              darkMode
                                ? "text-gray-300 hover:text-purple-300 hover:bg-gray-800/30 hover:shadow-[0_4px_12px_rgba(168,85,247,0.2)]"
                                : "text-indigo-700 hover:text-purple-600 hover:bg-indigo-100/30 hover:shadow-[0_4px_12px_rgba(79,70,229,0.2)]"
                            }`}
                            onClick={handleLinkClick}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="text-purple-400">{getIconForItem(subItem.name)}</div>
                              <div>
                                <span className="block text-sm font-medium">{subItem.name}</span>
                                <span className="block text-xs text-gray-400">
                                  Explore {subItem.name.toLowerCase()}
                                </span>
                              </div>
                            </div>
                            <div className="mt-2 relative w-full h-24 rounded-lg overflow-hidden">
                              <Image
                                src={subItem.image}
                                alt={`${subItem.name} illustration`}
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-110"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`block py-3 px-3 text-base font-semibold rounded-lg transition-all duration-300 ${
                      darkMode
                        ? "text-gray-200 hover:text-purple-300 hover:bg-gray-800/50"
                        : "text-indigo-800 hover:text-purple-600 hover:bg-indigo-100/50"
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
      )}

      <style jsx>{`
        @keyframes pulse-slow {
          0% {
            box-shadow: 0 0 10px rgba(168, 85, 247, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
          }
          100% {
            box-shadow: 0 0 10px rgba(168, 85, 247, 0.3);
          }
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes zoom-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
        .animate-zoom-in {
          animation: zoom-in 0.4s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default Header;