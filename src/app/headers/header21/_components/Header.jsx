"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiHome, FiBox, FiLayers, FiBook, FiDollarSign } from "react-icons/fi";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { ChevronDownIcon, XMarkIcon, Bars3Icon, ArrowRightIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const headerRef = useRef(null);

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: <FiHome className="w-5 h-5" />,
      subItems: [],
    },
    {
      name: "Products",
      icon: <FiBox className="w-5 h-5" />,
      subItems: [
        {
          name: "All Products",
          href: "/",
          image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
          description: "Explore our complete catalog",
        },
        {
          name: "New Arrivals",
          href: "/",
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
          description: "Discover our latest innovations",
        },
        {
          name: "Best Sellers",
          href: "/",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
          description: "Most popular choices",
        },
        {
          name: "Categories",
          href: "/",
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
          description: "Browse by product type",
        },
      ],
    },
    {
      name: "Solutions",
      icon: <FiLayers className="w-5 h-5" />,
      subItems: [
        {
          name: "Marketing",
          href: "/",
          image: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
          description: "Boost your brand awareness",
        },
        {
          name: "Analytics",
          href: "/",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
          description: "Data-driven insights",
        },
        {
          name: "Commerce",
          href: "/",
          image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
          description: "Seamless transactions",
        },
        {
          name: "Insights",
          href: "/",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
          description: "Actionable intelligence",
        },
      ],
    },
    {
      name: "Resources",
      href: "/",
      icon: <FiBook className="w-5 h-5" />,
      subItems: [],
    },
    {
      name: "Pricing",
      href: "/",
      icon: <FiDollarSign className="w-5 h-5" />,
      subItems: [],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleDropdown = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed w-full top-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-gradient-to-r from-indigo-900/90 to-purple-900/90 backdrop-blur-md shadow-lg h-16"
          : "bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-md h-20"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg transform group-hover:rotate-6 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-500 ease-out" />
              <div className="absolute inset-0 bg-white/10 rounded-lg backdrop-blur-sm" />
              <span className="absolute inset-0 flex items-center justify-center text-white font-extrabold text-xl">
                M
              </span>
            </div>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 hidden sm:block">
              MasterSite
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-4">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.subItems.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`flex items-center px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 group-hover:shadow-[0_0_10px_rgba(139,92,246,0.3)] ${
                        isScrolled
                          ? "text-indigo-100 bg-indigo-800/30 hover:bg-indigo-700/40"
                          : "text-gray-200 bg-gray-700/30 hover:bg-gray-600/40"
                      }`}
                      aria-haspopup="true"
                      aria-expanded={activeDropdown === item.name}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.name}
                      <ChevronDownIcon
                        className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Mega Dropdown */}
                    {activeDropdown === item.name && (
                      <div
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[36rem] bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden animate-fade-in"
                        role="menu"
                      >
                        <div className="grid grid-cols-2 gap-4 p-6">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="group/subitem flex flex-col p-4 rounded-xl bg-gray-800/50 hover:bg-gray-700/70 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(139,92,246,0.2)]"
                              onClick={() => {
                                setActiveDropdown(null);
                                setIsMobileMenuOpen(false);
                              }}
                              role="menuitem"
                            >
                              <div className="w-full h-32 rounded-lg overflow-hidden mb-3">
                                <img
                                  src={subItem.image}
                                  alt={subItem.name}
                                  className="w-full h-full object-cover transform group-hover/subitem:scale-105 transition-transform duration-300"
                                  loading="lazy"
                                />
                              </div>
                              <h3 className="text-gray-100 font-semibold text-lg group-hover/subitem:text-purple-300 transition-colors duration-300">
                                {subItem.name}
                              </h3>
                              <p className="text-gray-400 text-sm mt-1">{subItem.description}</p>
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-gray-700/50 px-6 py-4 bg-gray-800/50 flex justify-between items-center">
                          <div className="flex space-x-4">
                            <a
                              href="#"
                              className="text-gray-400 hover:text-purple-300 transition-colors duration-300 transform hover:scale-110"
                              aria-label="Twitter"
                            >
                              <FaTwitter className="w-5 h-5" />
                            </a>
                            <a
                              href="#"
                              className="text-gray-400 hover:text-purple-300 transition-colors duration-300 transform hover:scale-110"
                              aria-label="Facebook"
                            >
                              <FaFacebook className="w-5 h-5" />
                            </a>
                            <a
                              href="#"
                              className="text-gray-400 hover:text-purple-300 transition-colors duration-300 transform hover:scale-110"
                              aria-label="Instagram"
                            >
                              <FaInstagram className="w-5 h-5" />
                            </a>
                            <a
                              href="#"
                              className="text-gray-400 hover:text-purple-300 transition-colors duration-300 transform hover:scale-110"
                              aria-label="LinkedIn"
                            >
                              <FaLinkedin className="w-5 h-5" />
                            </a>
                          </div>
                          <Link
                            href="#"
                            className="flex items-center text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-4 py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Get Started <ArrowRightIcon className="ml-2 w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 group-hover:shadow-[0_0_10px_rgba(139,92,246,0.3)] ${
                      isScrolled
                        ? "text-indigo-100 bg-indigo-800/30 hover:bg-indigo-700/40"
                        : "text-gray-200 bg-gray-700/30 hover:bg-gray-600/40"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg bg-gray-700/30 hover:bg-gray-600/40 transition-all duration-300"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-gray-200" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-gray-200" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-gradient-to-b from-gray-800/95 to-gray-900/95 backdrop-blur-lg z-40 transition-all duration-500 ease-out animate-slide-in"
          style={{ top: isScrolled ? "64px" : "80px" }}
        >
          <div className="h-[calc(100vh-80px)] overflow-y-auto py-6 px-6">
            <div className="max-w-md mx-auto space-y-4">
              {navItems.map((item) => (
                <div key={item.name} className="border-b border-gray-700/50 pb-2">
                  {item.subItems.length > 0 ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`w-full flex items-center justify-between py-4 px-4 rounded-lg transition-all duration-300 ${
                          isScrolled
                            ? "text-indigo-100 hover:bg-indigo-800/50"
                            : "text-gray-200 hover:bg-gray-700/50"
                        }`}
                        aria-expanded={activeDropdown === item.name}
                      >
                        <span className="flex items-center text-lg font-medium">
                          <span className="mr-3">{item.icon}</span>
                          {item.name}
                        </span>
                        <ChevronDownIcon
                          className={`w-5 h-5 transition-transform duration-300 ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-out ${
                          activeDropdown === item.name ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="pl-6 py-2 space-y-3">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="flex flex-col p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/70 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(139,92,246,0.2)]"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setActiveDropdown(null);
                              }}
                            >
                              <div className="w-full h-24 rounded-lg overflow-hidden mb-2">
                                <img
                                  src={subItem.image}
                                  alt={subItem.name}
                                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                                  loading="lazy"
                                />
                              </div>
                              <div className="text-gray-100 font-semibold">{subItem.name}</div>
                              <div className="text-gray-400 text-sm mt-1">{subItem.description}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block py-4 px-4 rounded-lg transition-all duration-300 ${
                        isScrolled
                          ? "text-indigo-100 hover:bg-indigo-800/50"
                          : "text-gray-200 hover:bg-gray-700/50"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="flex items-center text-lg font-medium">
                        <span className="mr-3">{item.icon}</span>
                        {item.name}
                      </span>
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile Footer */}
              <div className="mt-12 pt-6 border-t border-gray-700/50">
                <div className="flex justify-center space-x-6 mb-6">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-300 transition-colors duration-300 transform hover:scale-110"
                    aria-label="Twitter"
                  >
                    <FaTwitter className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-300 transition-colors duration-300 transform hover:scale-110"
                    aria-label="Facebook"
                  >
                    <FaFacebook className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-300 transition-colors duration-300 transform hover:scale-110"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-300 transition-colors duration-300 transform hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                </div>
                <Link
                  href="#"
                  className="flex items-center justify-center w-full py-3 px-6 text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg transition-all duration-300 shadow-sm hover:shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started <ArrowRightIcon className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
        }
        html {
          scroll-behavior: smooth;
        }
        *:focus-visible {
          outline: 2px solid #8b5cf6;
          outline-offset: 2px;
        }
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.3);
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: rgba(139, 92, 246, 0.5);
          border-radius: 3px;
        }
        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
          .transition-all,
          .transition-colors,
          .transition-transform {
            transition: none !important;
          }
          [class*="animate-"] {
            animation: none !important;
          }
        }
        @media (prefers-contrast: high) {
          .bg-gradient-to-r-from-gray-800\/80-to-gray-900\/80,
          .bg-gradient-to-r-from-indigo-900\/90-to-purple-900\/90,
          .bg-gray-900\/95,
          .bg-gray-800\/ Do you want to make this more advanced? You can add features like a search bar, user profile integration, or interactive elements.

          .bg-gray-800\/50 {
            background-color: #1e1b4b !important;
          }
          .text-gray-200,
          .text-indigo-100,
          .text-white,
          .text-gray-100,
          .text-purple-300 {
            color: #ffffff !important;
          }
          .text-gray-400 {
            color: #d1d5db !important;
          }
          .bg-blue-500,
          .bg-purple-500 {
            background-color: #8b5cf6 !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;