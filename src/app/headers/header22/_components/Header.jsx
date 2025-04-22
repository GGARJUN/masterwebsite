"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiHome, FiBox, FiLayers, FiBook, FiDollarSign, FiArrowRight, FiUser, FiSearch } from "react-icons/fi";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef(null);
  const menuTimeout = useRef(null);

  const menuItems = [
    {
      name: "Home",
      href: "/",
      icon: <FiHome className="w-5 h-5" />,
      subItems: []
    },
    {
      name: "Products",
      icon: <FiBox className="w-5 h-5" />,
      subItems: [
        {
          name: "All Products",
          href: "/products",
          icon: <FiBox className="w-4 h-4" />,
          description: "Explore our complete collection",
          image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
        },
        {
          name: "New Arrivals",
          href: "/new",
          icon: <FiLayers className="w-4 h-4" />,
          description: "Discover our latest innovations",
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
        },
        {
          name: "Premium Selection",
          href: "/premium",
          icon: <FiDollarSign className="w-4 h-4" />,
          description: "Exclusive high-end products",
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
        }
      ]
    },
    {
      name: "Solutions",
      icon: <FiLayers className="w-5 h-5" />,
      subItems: [
        {
          name: "Enterprise",
          href: "/enterprise",
          icon: <FiBox className="w-4 h-4" />,
          description: "Scalable solutions for large businesses",
          image: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
        },
        {
          name: "Startups",
          href: "/startups",
          icon: <FiLayers className="w-4 h-4" />,
          description: "Tailored for growing businesses",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
        },
        {
          name: "Personal",
          href: "/personal",
          icon: <FiUser className="w-4 h-4" />,
          description: "Solutions for individual creators",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
        }
      ]
    },
    {
      name: "Resources",
      icon: <FiBook className="w-5 h-5" />,
      subItems: [
        {
          name: "Documentation",
          href: "/docs",
          icon: <FiBook className="w-4 h-4" />,
          description: "Technical guides and API references"
        },
        {
          name: "Tutorials",
          href: "/tutorials",
          icon: <FiLayers className="w-4 h-4" />,
          description: "Step-by-step learning paths"
        },
        {
          name: "Community",
          href: "/community",
          icon: <FiUser className="w-4 h-4" />,
          description: "Join our vibrant community"
        }
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleMenuEnter = (menuName) => {
    if (menuTimeout.current) clearTimeout(menuTimeout.current);
    setActiveMenu(menuName);
  };

  const handleMenuLeave = () => {
    menuTimeout.current = setTimeout(() => {
      setActiveMenu(null);
    }, 300);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveMenu(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed w-full top-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-sm"
          : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg"
      }`}
    >
      {/* Floating 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10 dark:opacity-5"
            style={{
              background: "radial-gradient(circle, var(--gradient-color) 0%",
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100 - 50}%`,
              filter: "blur(40px)",
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `float ${Math.random() * 20 + 10}s infinite ease-in-out alternate`,
              animationDelay: `${Math.random() * 5}s`,
              "--gradient-color": darkMode
                ? i % 2 === 0 ? "#6366f1" : "#a855f7"
                : i % 2 === 0 ? "#3b82f6" : "#8b5cf6"
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo with 3D Effect */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-indigo-700 dark:to-purple-700 rounded-xl transform group-hover:rotate-6 transition-all duration-700 ease-out shadow-lg" />
              <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-extrabold text-white transform group-hover:scale-110 transition-transform duration-300">
                  M
                </span>
              </div>
            </div>
            <span className="ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 transition-all duration-500 group-hover:translate-x-1">
              MasterSite
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className=""
                onMouseEnter={() => handleMenuEnter(item.name)}
                onMouseLeave={handleMenuLeave}
              >
                {item.subItems.length > 0 ? (
                  <>
                    <button
                      className={`flex items-center px-5 py-3 rounded-xl transition-all duration-300 group ${
                        activeMenu === item.name
                          ? "text-blue-600 dark:text-indigo-400"
                          : "text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-indigo-300"
                      }`}
                    >
                      <span className="flex items-center">
                        <span className="mr-2">{item.icon}</span>
                        {item.name}
                      </span>
                      <div
                        className={`ml-1.5 transform transition-transform duration-300 ${
                          activeMenu === item.name ? "rotate-180" : ""
                        }`}
                      >
                        <FiArrowRight className="w-4 h-4" />
                      </div>
                    </button>

                    {/* 3D Mega Menu */}
                    {activeMenu === item.name && (
                      <div
                        className={`absolute left-0 top-full mt-2 w-[50rem] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ease-out ${
                          activeMenu === item.name
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-2"
                        }`}
                        style={{
                          transformStyle: "preserve-3d",
                          perspective: "1000px",
                          transform: "rotateX(-5deg)"
                        }}
                      >
                        <div
                          className={`relative p-1 ${
                            darkMode
                              ? "bg-gradient-to-br from-gray-900 to-gray-800"
                              : "bg-gradient-to-br from-white to-gray-50"
                          }`}
                        >
                          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
                          <div className="relative grid grid-cols-3 gap-0 rounded-xl overflow-hidden">
                            <div className="col-span-2 p-6">
                              <h3 className="text-lg font-bold text-blue-600 dark:text-indigo-400 mb-4">
                                {item.name}
                              </h3>
                              <div className="space-y-2">
                                {item.subItems.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    className="group flex items-start p-3 rounded-lg transition-all duration-300 hover:bg-blue-50/50 dark:hover:bg-indigo-900/30"
                                  >
                                    <div className="flex-shrink-0 mt-1">
                                      <div className="w-9 h-9 rounded-lg bg-blue-100/50 dark:bg-indigo-900/30 flex items-center justify-center text-blue-600 dark:text-indigo-400 group-hover:bg-blue-200/50 dark:group-hover:bg-indigo-800/50 transition-colors duration-300">
                                        {subItem.icon}
                                      </div>
                                    </div>
                                    <div className="ml-4">
                                      <h4 className="text-gray-900 dark:text-gray-100 font-medium group-hover:text-blue-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                                        {subItem.name}
                                      </h4>
                                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                        {subItem.description}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                            <div className="relative">
                              {item.subItems[0]?.image && (
                                <div className="absolute inset-0 ">
                                  <img
                                    src={item.subItems[0].image}
                                    alt=""
                                    className="w-full h-full object-cover rounded-xl p-5 transform scale-105"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                  <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h4 className="text-white font-bold">
                                      {item.subItems[0].name}
                                    </h4>
                                    <p className="text-white/80 text-sm mt-1">
                                      {item.subItems[0].description}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="px-6 py-4 border-t border-gray-200/50 dark:border-gray-700/50 flex justify-between items-center">
                            <div className="flex space-x-4">
                              <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors duration-300">
                                <FaTwitter className="w-5 h-5" />
                              </a>
                              <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors duration-300">
                                <FaFacebook className="w-5 h-5" />
                              </a>
                              <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors duration-300">
                                <FaInstagram className="w-5 h-5" />
                              </a>
                              <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors duration-300">
                                <FaLinkedin className="w-5 h-5" />
                              </a>
                            </div>
                            <Link
                              href="/get-started"
                              className="flex items-center text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-indigo-600 dark:to-purple-600 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                            >
                              Get Started <FiArrowRight className="ml-2" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center px-5 py-3 rounded-xl transition-all duration-300 ${
                      activeMenu === item.name
                        ? "text-blue-600 dark:text-indigo-400"
                        : "text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-indigo-300"
                    }`}
                  >
                    <span className="flex items-center">
                      <span className="mr-2">{item.icon}</span>
                      {item.name}
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleSearch}
              className={`p-2 rounded-full transition-all duration-300 ${
                darkMode
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <FiSearch className="w-5 h-5" />
            </button>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-300 ${
                darkMode
                  ? "text-yellow-300 hover:bg-gray-800"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {darkMode ? <IoMdSunny className="w-5 h-5" /> : <IoMdMoon className="w-5 h-5" />}
            </button>
            <button className={`p-2 rounded-full transition-all duration-300 ${
              darkMode
                ? "text-gray-300 hover:bg-gray-800"
                : "text-gray-500 hover:bg-gray-100"
            }`}>
              <FiUser className="w-5 h-5" />
            </button>
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-full transition-all duration-300 text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Full Screen 3D Effect */}
      {isMenuOpen && (
        <div
          className={`lg:hidden fixed inset-0 z-40 h-screen overflow-hidden ${
            darkMode ? "bg-gray-900" : "bg-white"
          }`}
          style={{
            clipPath: isMenuOpen
              ? "circle(150% at 100% 0)"
              : "circle(0% at 100% 0)",
            transition: "clip-path 1s ease-out"
          }}
        >
          <div className="relative h-full w-full overflow-y-auto">
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200/20">
              <Link href="/" className="flex items-center" onClick={toggleMenu}>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-indigo-700 dark:to-purple-700 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">M</span>
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                  MasterSite
                </span>
              </Link>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="p-6 space-y-6">
              {menuItems.map((item) => (
                <div key={item.name} className="w-full">
                  {item.subItems.length > 0 ? (
                    <>
                      <button
                        onClick={() =>
                          setActiveMenu(activeMenu === item.name ? null : item.name)
                        }
                        className="flex items-center justify-between w-full py-4 px-4 text-lg font-medium text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                      >
                        <span className="flex items-center">
                          <span className="mr-3">{item.icon}</span>
                          {item.name}
                        </span>
                        <FiArrowRight
                          className={`w-5 h-5 transform transition-transform duration-300 ${
                            activeMenu === item.name ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-out ${
                          activeMenu === item.name
                            ? "max-h-96 opacity-100 mt-2"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="pl-8 space-y-3">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block py-3 px-4 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                              onClick={toggleMenu}
                            >
                              <div className="flex items-center">
                                <span className="mr-3">{subItem.icon}</span>
                                <div>
                                  <div className="font-medium">{subItem.name}</div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {subItem.description}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center py-4 px-4 text-lg font-medium text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                      onClick={toggleMenu}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Footer */}
            <div className="p-6 border-t border-gray-200/20 mt-auto">
              <div className="flex justify-center space-x-6 mb-6">
                <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors duration-300">
                  <FaTwitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors duration-300">
                  <FaFacebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors duration-300">
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors duration-300">
                  <FaLinkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors duration-300">
                  <FaGithub className="w-6 h-6" />
                </a>
              </div>
              <Link
                href="/get-started"
                className="flex items-center justify-center w-full py-3 px-6 text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-indigo-600 dark:to-purple-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium"
                onClick={toggleMenu}
              >
                Get Started <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl flex items-center justify-center p-6"
          style={{
            opacity: searchOpen ? 1 : 0,
            pointerEvents: searchOpen ? "auto" : "none",
            transition: "opacity 0.3s ease-out"
          }}
        >
          <div className="relative w-full max-w-2xl">
            <button
              onClick={toggleSearch}
              className="absolute right-0 top-0 p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full py-5 px-6 text-xl bg-transparent border-b-2 border-gray-200 dark:border-gray-700 focus:border-blue-600 dark:focus:border-indigo-500 outline-none transition-colors duration-300"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }

        .noise-bg {
          background-image: url("https://grainy-gradients.vercel.app/noise.svg");
          opacity: 0.05;
        }
      `}</style>
    </header>
  );
};

// Helper components
const XMarkIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const MenuIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

export default Header;