"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Server, Zap, Grid, Network, Mail, Cpu, ChevronDown } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null); // Track which submenu is open
  let scrollTimeout = null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const submenuItems = {
    Systems: [
      { name: "Nexus Core", icon: <Cpu className="w-5 h-5 text-blue-500" />, desc: "Central processing hub" },
      { name: "Bolt Network", icon: <Zap className="w-5 h-5 text-blue-500" />, desc: "Lightning-fast connectivity" },
      { name: "Neon Grid", icon: <Grid className="w-5 h-5 text-blue-500" />, desc: "Dynamic power distribution" },
    ],
    Network: [
      { name: "Cyber Hub", icon: <Server className="w-5 h-5 text-blue-500" />, desc: "Secure server network" },
      { name: "Data Stream", icon: <Zap className="w-5 h-5 text-blue-500" />, desc: "Real-time data flow" },
    ],
  };

  return (
    <>
      {/* Menu Button */}
      <div
        className={`fixed top-4 right-4 z-50 transition-all duration-400 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] ${
          isScrolling ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"
        }`}
      >
        <button
          onClick={toggleMenu}
          className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-[0_10px_35px_rgba(0,0,0,0.3)] group transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-7 h-7 text-gray-900 transition-transform duration-400 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] rotate-90" />
          ) : (
            <Menu className="w-7 h-7 text-gray-900 transition-transform duration-400 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]" />
          )}
          <div className="absolute inset-0 rounded-full  opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-md scale-110" />
        </button>
      </div>

      {/* Desktop Header (unchanged) */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] hidden sm:block ${
          isMenuOpen
            ? "translate-y-0 bg-white/95 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.3)]"
            : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <nav className="flex justify-center items-center gap-12">
            <div className="flex gap-16 items-center text-lg font-semibold text-gray-900">
              <div className="group relative">
                <span className="cursor-pointer hover:text-blue-500 transition-all duration-300 flex items-center gap-3">
                  <Cpu className="w-6 h-6 group-hover:text-blue-500 transition-colors duration-300" />
                  Systems
                </span>
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 bg-white rounded-xl border border-gray-200/50 shadow-[0_15px_40px_rgba(0,0,0,0.15)] p-6 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-400 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] pointer-events-none group-hover:pointer-events-auto w-[320px]">
                  <ul className="space-y-4">
                    {submenuItems.Systems.map((item) => (
                      <li key={item.name}>
                        <a
                          href="#"
                          className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 group/item relative overflow-hidden"
                        >
                          <div className="absolute inset-0  opacity-0 group-hover/item:opacity-20 transition-opacity duration-300" />
                          {item.icon}
                          <div>
                            <span className="block text-sm font-medium text-gray-900 group-hover/item:text-blue-500 transition-colors duration-300">
                              {item.name}
                            </span>
                            <span className="text-xs text-gray-500">{item.desc}</span>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="group relative">
                <span className="cursor-pointer hover:text-blue-500 transition-all duration-300 flex items-center gap-3">
                  <Network className="w-6 h-6 group-hover:text-blue-500 transition-colors duration-300" />
                  Network
                </span>
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 bg-white rounded-xl border border-gray-200/50 shadow-[0_15px_40px_rgba(0,0,0,0.15)] p-6 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-400 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] pointer-events-none group-hover:pointer-events-auto w-[320px]">
                  <ul className="space-y-4">
                    {submenuItems.Network.map((item) => (
                      <li key={item.name}>
                        <a
                          href="#"
                          className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 group/item relative overflow-hidden"
                        >
                          <div className="absolute inset-0  opacity-0 group-hover/item:opacity-20 transition-opacity duration-300" />
                          {item.icon}
                          <div>
                            <span className="block text-sm font-medium text-gray-900 group-hover/item:text-blue-500 transition-colors duration-300">
                              {item.name}
                            </span>
                            <span className="text-xs text-gray-500">{item.desc}</span>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <a
                href="#"
                className="hover:text-blue-500 transition-all duration-300 flex items-center gap-3"
              >
                <Mail className="w-6 h-6 group-hover:text-blue-500 transition-colors duration-300" />
                Contact
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Header */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] sm:hidden ${
          isMenuOpen
            ? "translate-y-0 bg-white/95 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.3)] min-h-screen"
            : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-5 pt-16">
          <nav className="flex flex-col items-center gap-8">
            <div className="flex flex-col gap-8 w-full text-lg font-semibold text-gray-900">
              {/* Systems Mobile Menu */}
              <div className="group">
                <button
                  onClick={() => toggleSubmenu("Systems")}
                  className="cursor-pointer hover:text-blue-500 transition-all duration-300 flex items-center justify-between gap-3 py-2 border-b border-gray-200 w-full"
                >
                  <div className="flex items-center gap-3">
                    <Cpu className="w-6 h-6 group-hover:text-blue-500 transition-colors duration-300" />
                    Systems
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                      openSubmenu === "Systems" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`mt-4 bg-white rounded-xl border border-gray-200/50 shadow-[0_10px_30px_rgba(0,0,0,0.1)] p-4 transition-all duration-300 ${
                    openSubmenu === "Systems" && isMenuOpen ? "block opacity-100" : "hidden opacity-0"
                  }`}
                >
                  <ul className="space-y-4">
                    {submenuItems.Systems.map((item) => (
                      <li key={item.name}>
                        <a
                          href="#"
                          className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 transition-all duration-300 group/item relative overflow-hidden"
                          onClick={() => setIsMenuOpen(false)} // Close menu on item click
                        >
                          <div className="absolute inset-0  opacity-0 group-hover/item:opacity-20 transition-opacity duration-300" />
                          {item.icon}
                          <div>
                            <span className="block text-sm font-medium text-gray-900 group-hover/item:text-blue-500 transition-colors duration-300">
                              {item.name}
                            </span>
                            <span className="text-xs text-gray-500">{item.desc}</span>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Network Mobile Menu */}
              <div className="group">
                <button
                  onClick={() => toggleSubmenu("Network")}
                  className="cursor-pointer hover:text-blue-500 transition-all duration-300 flex items-center justify-between gap-3 py-2 border-b border-gray-200 w-full"
                >
                  <div className="flex items-center gap-3">
                    <Network className="w-6 h-6 group-hover:text-blue-500 transition-colors duration-300" />
                    Network
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                      openSubmenu === "Network" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`mt-4 bg-white rounded-xl border border-gray-200/50 shadow-[0_10px_30px_rgba(0,0,0,0.1)] p-4 transition-all duration-300 ${
                    openSubmenu === "Network" && isMenuOpen ? "block opacity-100" : "hidden opacity-0"
                  }`}
                >
                  <ul className="space-y-4">
                    {submenuItems.Network.map((item) => (
                      <li key={item.name}>
                        <a
                          href="#"
                          className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 transition-all duration-300 group/item relative overflow-hidden"
                          onClick={() => setIsMenuOpen(false)} // Close menu on item click
                        >
                          <div className="absolute inset-0  opacity-0 group-hover/item:opacity-20 transition-opacity duration-300" />
                          {item.icon}
                          <div>
                            <span className="block text-sm font-medium text-gray-900 group-hover/item:text-blue-500 transition-colors duration-300">
                              {item.name}
                            </span>
                            <span className="text-xs text-gray-500">{item.desc}</span>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Contact Mobile Link */}
              <a
                href="#"
                className="hover:text-blue-500 transition-all duration-300 flex items-center gap-3 py-2 border-b border-gray-200 w-full"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                <Mail className="w-6 h-6 group-hover:text-blue-500 transition-colors duration-300" />
                Contact
              </a>
            </div>
          </nav>
        </div>
      </header>

      <style jsx>{`
        @keyframes fade-slide {
          from {
            opacity: 0;
            transform: translateY(-15px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .group:hover .opacity-0 {
          animation: fade-slide 0.4s ease-out forwards;
        }

        /* Responsive Adjustments */
        @media (max-width: 640px) {
          .min-h-screen {
            min-height: 100vh;
          }
          .text-lg {
            font-size: 1.25rem; /* 20px */
          }
          .text-sm {
            font-size: 1rem; /* 16px */
          }
          .w-6 {
            width: 1.75rem; /* 28px */
            height: 1.75rem;
          }
          .w-5 {
            width: 1.5rem; /* 24px */
            height: 1.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default Header;