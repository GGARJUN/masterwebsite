"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiHome, FiBox, FiLayers, FiBook, FiDollarSign } from "react-icons/fi";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const headerRef = useRef(null);

  const menuItems = [
    { name: "Home", href: "#", icon: <FiHome size={20} />, submenus: [] },
    {
      name: "Products",
      icon: <FiBox size={20} />,
      submenus: [
        {
          name: "All Products",
          href: "/",
          icon: <FiBox size={16} className="mr-2" />,
          image:
            "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        },
        {
          name: "New Arrivals",
          href: "/",
          icon: <FiLayers size={16} className="mr-2" />,
          image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        },
        {
          name: "Best Sellers",
          href: "/",
          icon: <FiBook size={16} className="mr-2" />,
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        },
        {
          name: "Categories",
          href: "/",
          icon: <FiDollarSign size={16} className="mr-2" />,
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        },
      ],
    },
    {
      name: "Solutions",
      icon: <FiLayers size={20} />,
      submenus: [
        {
          name: "Marketing",
          href: "/",
          icon: <FiBox size={16} className="mr-2" />,
          image:
            "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        },
        {
          name: "Analytics",
          href: "/",
          icon: <FiLayers size={16} className="mr-2" />,
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        },
        {
          name: "Commerce",
          href: "/",
          icon: <FiBook size={16} className="mr-2" />,
          image:
            "https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        },
        {
          name: "Insights",
          href: "/",
          icon: <FiDollarSign size={16} className="mr-2" />,
          image:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        },
      ],
    },
    { name: "Resources", href: "#", icon: <FiBook size={20} />, submenus: [] },
    { name: "Pricing", href: "#", icon: <FiDollarSign size={20} />, submenus: [] },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenSubmenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSubmenu = (menuName) => {
    setOpenSubmenu((prev) => (prev === menuName ? null : menuName));
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setOpenSubmenu(null);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-gradient-to-r from-indigo-900/90 to-purple-900/90 backdrop-blur-md shadow-lg h-16"
          : "bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-md h-20"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-center h-full relative">
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((menu) => (
              <div key={menu.name} className="group">
                {menu.submenus.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(menu.name)}
                      className="relative p-3 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-all duration-300"
                    >
                      <div
                        className={`relative ${
                          isScrolled ? "text-indigo-100" : "text-gray-200"
                        }`}
                      >
                        {menu.icon}
                        <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </div>
                      <span
                        className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-gray-800 ${
                          isScrolled ? "text-indigo-100" : "text-gray-200"
                        } text-sm px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      >
                        {menu.name}
                      </span>
                    </button>
                    {openSubmenu === menu.name && (
                      <div className="absolute left-80 top-24 mt-2 bg-gray-800/95 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden">
                        <div className="grid grid-cols-2 gap-4 p-4">
                          {menu.submenus.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="group/item flex items-start p-3 rounded-lg transition-all duration-300 hover:bg-white/10"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setOpenSubmenu(null);
                              }}
                            >
                              <div className="w-12 h-12 rounded-md overflow-hidden mr-3 flex-shrink-0">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <div
                                  className={`${
                                    isScrolled ? "text-indigo-100" : "text-gray-200"
                                  } font-medium flex items-center`}
                                >
                                  {item.icon}
                                  {item.name}
                                </div>
                                <div className="text-gray-400 text-sm mt-1">
                                  Lorem ipsum dolor sit amet
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-gray-700 p-4 flex justify-between items-center">
                          <div className="flex space-x-3">
                            <a
                              href="#"
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              <FaTwitter size={18} />
                            </a>
                            <a
                              href="#"
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              <FaFacebook size={18} />
                            </a>
                            <a
                              href="#"
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              <FaInstagram size={18} />
                            </a>
                            <a
                              href="#"
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              <FaLinkedin size={18} />
                            </a>
                          </div>
                          <Link
                            href="#"
                            className={`flex items-center text-sm font-medium ${
                              isScrolled ? "text-indigo-100" : "text-gray-200"
                            } bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors duration-300`}
                          >
                            Get Started <ArrowRightIcon className="ml-2 w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={menu.href}
                    className="relative p-3 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-all duration-300"
                  >
                    <div
                      className={`relative ${
                        isScrolled ? "text-indigo-100" : "text-gray-200"
                      }`}
                    >
                      {menu.icon}
                      <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </div>
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-gray-800 ${
                        isScrolled ? "text-indigo-100" : "text-gray-200"
                      } text-sm px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    >
                      {menu.name}
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={handleMobileMenuToggle}
            className="lg:hidden absolute right-4 p-2 text-white group"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative">
              <svg
                className="h-7 w-7 transition-all duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
              <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-gradient-to-b from-gray-800/95 to-gray-900/95 backdrop-blur-lg z-40 transition-all duration-300 ease-in-out"
            style={{ top: isScrolled ? "64px" : "80px" }}
          >
            <div className="flex flex-col h-[calc(100%-64px)] justify-between py-8 px-6">
              <div className="space-y-6 flex flex-col items-center">
                {menuItems.map((menu) => (
                  <div key={menu.name} className="w-full max-w-md">
                    {menu.submenus.length > 0 ? (
                      <>
                        <button
                          onClick={() => toggleSubmenu(menu.name)}
                          className={`w-full flex justify-between items-center text-xl ${
                            isScrolled ? "text-indigo-100" : "text-gray-200"
                          } font-medium py-4 px-3 rounded-lg hover:bg-white/10 transition-colors duration-300`}
                        >
                          <div className="flex items-center">
                            <span className="mr-3">{menu.icon}</span>
                            {menu.name}
                          </div>
                          <svg
                            className={`w-5 h-5 transform transition-transform duration-300 ${
                              openSubmenu === menu.name ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        <div
                          className={`ml-8 space-y-3 transition-all duration-300 ease-in-out overflow-hidden ${
                            openSubmenu === menu.name
                              ? "max-h-[500px] opacity-100 mt-2"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          {menu.submenus.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={`block text-lg ${
                                isScrolled ? "text-indigo-100" : "text-gray-200"
                              } py-3 px-4 rounded-lg hover:bg-white/10 transition-colors duration-300 flex items-center`}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setOpenSubmenu(null);
                              }}
                            >
                              <span className="mr-3">{item.icon}</span>
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link
                        href={menu.href}
                        className={`block text-xl ${
                          isScrolled ? "text-indigo-100" : "text-gray-200"
                        } font-medium py-4 px-3 rounded-lg hover:bg-white/10 transition-colors duration-300 flex items-center justify-center`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="mr-3">{menu.icon}</span>
                        {menu.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <div className="flex justify-center space-x-6 mb-6">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaTwitter size={20} />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaFacebook size={20} />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaInstagram size={20} />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaLinkedin size={20} />
                  </a>
                </div>
                <Link
                  href="#"
                  className={`flex items-center justify-center w-full ${
                    isScrolled ? "text-indigo-100" : "text-gray-200"
                  } bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors duration-300 font-medium`}
                >
                  Get Started <ArrowRightIcon className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        *:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
          .transition-all,
          .transition-colors,
          .transition-opacity,
          .transition-transform {
            transition: none !important;
          }
        }
        @media (prefers-contrast: high) {
          .bg-gradient-to-r-from-gray-800\/80-to-gray-900\/80,
          .bg-gradient-to-r-from-indigo-900\/90-to-purple-900\/90,
          .bg-gray-800\/95 {
            background-color: #1e1b4b !important;
          }
          .text-gray-200,
          .text-indigo-100,
          .text-white {
            color: #ffffff !important;
          }
          .text-gray-400 {
            color: #d1d5db !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;