"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [ripple, setRipple] = useState(null);

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

  // Track cursor position and handle ripple effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    const handleClick = (e) => {
      setRipple({ x: e.clientX, y: e.clientY, id: Date.now() });
      setTimeout(() => setRipple(null), 600); // Ripple duration
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Custom cursor and ripple effect
  const CursorEffect = () => (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-150 ease-out"
      style={{
        left: `${cursorPos.x}px`,
        top: `${cursorPos.y}px`,
        transform: `translate(-50%, -50%) scale(${hoveredItem ? 1.8 : 1})`,
      }}
    >
      <div
        className={`w-5 h-5 rounded-full border transition-all duration-300 ${
          hoveredItem
            ? "border-purple-400 bg-purple-400/20"
            : "border-blue-400/50 bg-blue-400/10"
        }`}
      />
      {ripple && (
        <div
          className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-purple-400/30 to-blue-400/30 animate-ripple"
          style={{
            left: `${ripple.x - cursorPos.x}px`,
            top: `${ripple.y - cursorPos.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </div>
  );

  return (
    <>
      <CursorEffect />

      <header
        className={`fixed w-full top-0 z-40 transition-all duration-600 ease-in-out ${
          isScrolled
            ? "bg-gradient-to-r from-gray-900/90 via-purple-900/90 to-blue-900/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.2)] py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo with Pulsating Effect */}
            <Link
              href="/"
              className="relative group"
              onMouseEnter={() => setHoveredItem("logo")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12">
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 animate-pulse-slow ${
                      isScrolled ? "opacity-80" : "opacity-100"
                    }`}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-white font-extrabold text-2xl">
                    U
                  </span>
                  <div
                    className="absolute inset-0 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
                <span
                  className={`text-2xl font-extrabold tracking-tight bg-clip-text text-transparent transition-all duration-500 group-hover:scale-105 ${
                    isScrolled
                      ? "bg-gradient-to-r from-gray-100 to-purple-300"
                      : "bg-gradient-to-r from-white to-blue-300"
                  }`}
                >
                  Ultra
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item, index) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => {
                    setActiveMenu(item.name);
                    setHoveredItem(item.name);
                  }}
                  onMouseLeave={() => {
                    setActiveMenu(null);
                    setHoveredItem(null);
                  }}
                >
                  <Link
                    href={item.href}
                    className={`px-4 py-3 text-sm font-semibold relative overflow-hidden transition-all duration-500 transform group-hover:-translate-y-1 ${
                      isScrolled ? "text-gray-100" : "text-white"
                    } animate-menu-reveal`}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      transformStyle: "preserve-3d",
                      perspective: "1000px",
                    }}
                  >
                    <span
                      className="relative z-10"
                      style={{ transform: "translateZ(10px)" }}
                    >
                      {item.name}
                    </span>
                    {/* Neon underline effect */}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-500 ${
                        activeMenu === item.name ? "w-full" : "w-0"
                      }`}
                    />
                    {/* Glow effect */}
                    <span
                      className={`absolute inset-0 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      style={{ transform: "translateZ(-5px)" }}
                    />
                  </Link>

                  {/* Submenu with Parallax Cards */}
                  {item.subItems && (
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 top-full mt-3 w-72 bg-gradient-to-br from-gray-900/95 via-purple-900/95 to-blue-900/95 backdrop-blur-lg rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-400 origin-top ${
                        activeMenu === item.name
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-0 scale-95 translate-y-4 pointer-events-none"
                      }`}
                    >
                      <div className="p-4 space-y-3">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-3 text-sm text-white font-medium relative group/sub rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/10"
                            onClick={() => setMobileOpen(false)}
                          >
                            <span className="relative z-10">{subItem.name}</span>
                            {/* Gradient border effect */}
                            <span
                              className="absolute inset-0 border-2 border-transparent group-hover/sub:border-gradient-to-r group-hover/sub:from-purple-400 group-hover/sub:to-blue-400 rounded-xl transition-all duration-500"
                              style={{
                                background:
                                  "linear-gradient(45deg, rgba(168,85,247,0.2), rgba(59,130,246,0.2))",
                                transform: "translateZ(-10px)",
                              }}
                            />
                            {/* Parallax tilt */}
                            <span
                              className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-xl transform transition-transform duration-300 group-hover/sub:-rotate-2 group-hover/sub:scale-105"
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-3 rounded-full focus:outline-none relative group"
              onClick={() => setMobileOpen(!mobileOpen)}
              onMouseEnter={() => setHoveredItem("menu")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="w-7 h-7 relative">
                <span
                  className={`absolute block w-full h-0.5 rounded-full transition-all duration-400 ${
                    isScrolled ? "bg-gray-100" : "bg-white"
                  } ${mobileOpen ? "rotate-45 top-1/2" : "top-1"}`}
                />
                <span
                  className={`absolute block w-full h-0.5 rounded-full transition-all duration-400 ${
                    isScrolled ? "bg-gray-100" : "bg-white"
                  } ${mobileOpen ? "opacity-0" : "top-1/2"}`}
                />
                <span
                  className={`absolute block w-full h-0.5 rounded-full transition-all duration-400 ${
                    isScrolled ? "bg-gray-100" : "bg-white"
                  } ${mobileOpen ? "-rotate-45 top-1/2" : "bottom-1"}`}
                />
                <span
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-blue-400/20 scale-0 group-hover:scale-100 transition-transform duration-400"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 bg-gradient-to-br from-gray-900/95 via-purple-900/95 to-blue-900/95 backdrop-blur-lg z-30 transition-all duration-600 ease-in-out animate-waveReveal ${
            mobileOpen
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-full"
          }`}
        >
          <div className="h-full flex flex-col justify-center px-6 py-16">
            <nav className="space-y-4">
              {navItems.map((item) => (
                <div key={item.name} className="overflow-hidden">
                  <button
                    className={`block w-full text-xl font-semibold py-4 px-6 rounded-xl transition-all duration-500 relative group ${
                      activeMenu === item.name
                        ? "bg-white/10 text-white"
                        : "text-white/90 hover:text-white"
                    }`}
                    onClick={() => {
                      if (!item.subItems) {
                        setMobileOpen(false);
                      } else {
                        setActiveMenu(
                          activeMenu === item.name ? null : item.name
                        );
                      }
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="relative z-10">{item.name}</span>
                      {item.subItems && (
                        <svg
                          className={`w-5 h-5 transform transition-transform duration-400 ${
                            activeMenu === item.name ? "rotate-180" : ""
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
                      )}
                      <span
                        className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-400"
                      />
                    </div>
                  </button>

                  {item.subItems && (
                    <div
                      className={`overflow-hidden transition-all duration-600 ${
                        activeMenu === item.name
                          ? "max-h-[400px] opacity-100 translate-y-0"
                          : "max-h-0 opacity-0 translate-y-4"
                      }`}
                    >
                      <div className="pl-8 pt-3 space-y-3">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block text-base text-white/80 hover:text-white transition-all duration-400 py-3 px-4 rounded-lg relative group/sub hover:bg-white/10"
                            onClick={() => setMobileOpen(false)}
                          >
                            <span className="relative z-10">
                              {subItem.name}
                            </span>
                            <span
                              className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-400 to-blue-400 transform -translate-x-full group-hover/sub:translate-x-0 transition-transform duration-400"
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Global Styles */}
      <style jsx global>{`
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #a855f7, #3b82f6);
          border-radius: 6px;
        }

        /* Ripple animation */
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 0.6s ease-out forwards;
        }

        /* Pulse animation for logo */
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        /* Menu reveal animation */
        @keyframes menu-reveal {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-menu-reveal {
          animation: menu-reveal 0.5s ease-out forwards;
        }

        /* Wave reveal for mobile menu */
        @keyframes waveReveal {
          0% {
            clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
            opacity: 0;
          }
          100% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            opacity: 1;
          }
        }
        .animate-waveReveal {
          animation: waveReveal 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Header;