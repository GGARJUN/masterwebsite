"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const timeoutRef = useRef(null);

  const dummyImages = {
    nexus: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&auto=format&fit=crop",
    bolt: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&auto=format&fit=crop",
    ambulance: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=500&auto=format&fit=crop",
    home: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop",
    about: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&auto=format&fit=crop",
    careers: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop",
    news: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&auto=format&fit=crop",
  };

  const navItems = [
    {
      name: "Our Solutions",
      subItems: [
        { name: "Lifesigns Nexus", desc: "Unified platform for real-time patient monitoring across hospitals, ambulances, and home.", href: "#", image: dummyImages.nexus },
        { name: "Lifesigns Bolt", desc: "Integrated solution for patient monitoring by hospitals.", href: "#", image: dummyImages.bolt },
        { name: "Smart Ambulance", desc: "Smart Monitoring solutions for emergency care.", href: "#", image: dummyImages.ambulance },
        { name: "At Home", desc: "Remote monitoring solutions for home care.", href: "#", image: dummyImages.home },
      ],
    },
    {
      name: "Company",
      subItems: [
        { name: "About Us", desc: "Learn more about our mission and team.", href: "#", image: dummyImages.about },
        { name: "Careers", desc: "Join our innovative team.", href: "#", image: dummyImages.careers },
        { name: "News", desc: "Stay updated with our latest news.", href: "#", image: dummyImages.news },
      ],
    },
    { name: "Get a Demo", href: "#", isButton: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      if (scrollTop > lastScrollY && scrollTop > 50) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }

      setIsScrolled(scrollTop > 50);
      setScrollProgress(progress);
      setLastScrollY(scrollTop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleMouseEnter = (name) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 z-50 h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 transition-all duration-300 shadow-md"
        style={{ width: `${scrollProgress}%` }}
      />

      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-gray-900/95 backdrop-blur-xl shadow-lg py-3"
            : "bg-transparent py-5"
        } ${isHeaderVisible ? "top-0" : "-top-20"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="group relative flex items-center">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-500 via-cyan-600 to-blue-600 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg">
                <span
                  className={`font-extrabold text-2xl tracking-tight transition-colors duration-300 ${
                    isScrolled ? "text-white" : "text-gray-900"
                  } group-hover:text-teal-200`}
                >
                  M
                </span>
              </div>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="url(#logoGradient)"
                  strokeWidth="2"
                  strokeDasharray={scrollProgress * 3}
                  className="transition-all duration-300 group-hover:animate-spin-slow"
                />
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
              </svg>
              <div
                className={`absolute w-2 h-2 bg-teal-400 rounded-full top-0 left-1/2 -translate-x-1/2 transition-all duration-300 ${
                  isScrolled ? "animate-orbit" : "opacity-0"
                }`}
              />
            </div>
            <span
              className={`ml-3 text-xl font-semibold hidden sm:block transition-colors duration-300 ${
                isScrolled ? "text-white" : "text-gray-900"
              } group-hover:text-teal-200`}
            >
              Master Site
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                {item.isButton ? (
                  <Link
                    href={item.href}
                    className="px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-full hover:from-teal-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      isScrolled ? "text-white hover:text-teal-300" : "text-gray-900 hover:text-teal-600"
                    }`}
                  >
                    {item.name}
                    {item.subItems && (
                      <ChevronDown
                        className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
                        strokeWidth={2}
                      />
                    )}
                  </button>
                )}
                {item.subItems && activeDropdown === item.name && (
                  <div 
                    className="absolute top-[100%] left-1/2 -translate-x-1/2 mt-2 w-[28rem] bg-white rounded-xl shadow-2xl border border-gray-100/50 overflow-hidden animate-fadeIn"
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="p-2 space-y-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="flex items-center gap-4 p-3 rounded-lg hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50 transition-all duration-300 group relative overflow-hidden"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute inset-0 rounded-md bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative w-14 h-14 flex-shrink-0">
                            <img
                              src={subItem.image}
                              alt={subItem.name}
                              className="w-full h-full object-cover rounded-md transform transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">
                              {subItem.name}
                            </h3>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{subItem.desc}</p>
                          </div>
                          <div className="w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ChevronDown className="w-4 h-4 text-teal-500 transform rotate-270" />
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="px-4 py-2 bg-gray-50/50 border-t border-gray-100/50">
                      <Link href="#" className="text-xs text-teal-600 hover:text-teal-700 font-medium">
                        View All {item.name} →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className={`w-6 h-6 ${isScrolled ? "text-white" : "text-gray-900"}`} />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-2xl mx-4 mt-2 rounded-xl border border-gray-100 animate-slideDown">
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-gray-100/50 last:border-0">
                {item.subItems ? (
                  <>
                    <button
                      className="flex items-center justify-between w-full text-left p-4 text-gray-900 font-medium"
                      onClick={() =>
                        setActiveDropdown(activeDropdown === item.name ? null : item.name)
                      }
                    >
                      {item.name}
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="px-4 pb-4 space-y-2">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-teal-50 transition-all duration-300"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <img
                              src={subItem.image}
                              alt={subItem.name}
                              className="w-12 h-12 object-cover rounded-md"
                            />
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">{subItem.name}</h4>
                              <p className="text-xs text-gray-600">{subItem.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`block p-4 ${
                      item.isButton
                        ? "bg-gradient-to-r from-teal-500 to-blue-600 text-white m-2 rounded-lg"
                        : "text-gray-900 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </header>

      <style jsx>{`
        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(24px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(24px) rotate(-360deg);
          }
        }
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-orbit {
          animation: orbit 4s linear infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Header;