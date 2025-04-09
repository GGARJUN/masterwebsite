"use client";
import React, { useState, useEffect, useRef } from "react";
import { 
  Cpu, Server, Zap, Grid, Network, 
  Mail, ChevronDown, Menu, X, Search, User 
} from "lucide-react";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const submenuTimeoutRef = useRef(null);

  // Tech products data with enhanced styling
  const techProducts = {
    Systems: [
      { 
        name: "Nexus Core", 
        icon: <Cpu className="w-5 h-5 text-indigo-400 group-hover:text-indigo-600 transition-colors" />, 
        desc: "Central processing hub",
        color: "from-indigo-500 to-purple-500"
      },
      { 
        name: "Bolt Network", 
        icon: <Zap className="w-5 h-5 text-blue-400 group-hover:text-blue-600 transition-colors" />, 
        desc: "Lightning-fast connectivity",
        color: "from-blue-500 to-cyan-500"
      },
      { 
        name: "Neon Grid", 
        icon: <Grid className="w-5 h-5 text-emerald-400 group-hover:text-emerald-600 transition-colors" />, 
        desc: "Dynamic power distribution",
        color: "from-emerald-500 to-teal-500"
      },
    ],
    Network: [
      { 
        name: "Cyber Hub", 
        icon: <Server className="w-5 h-5 text-amber-400 group-hover:text-amber-600 transition-colors" />, 
        desc: "Secure server network",
        color: "from-amber-500 to-orange-500"
      },
      { 
        name: "Data Stream", 
        icon: <Zap className="w-5 h-5 text-violet-400 group-hover:text-violet-600 transition-colors" />, 
        desc: "Real-time data flow",
        color: "from-violet-500 to-fuchsia-500"
      },
    ],
  };

  // Enhanced scroll handler with debounce
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = window.innerHeight * 0.1;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsScrollingDown(true);
      } else if (currentScrollY < lastScrollY - scrollThreshold) {
        setIsScrollingDown(false);
      }

      setLastScrollY(currentScrollY);
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => setIsScrollingDown(false), 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, [lastScrollY]);

  // Improved click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenSubmenu(null);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Enhanced menu handlers with animation timing
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
    if (!isMenuOpen) {
      setOpenSubmenu(null);
    }
  };

  const toggleSubmenu = (menu) => {
    clearTimeout(submenuTimeoutRef.current);
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const handleMenuHover = (visible) => {
    setIsHeaderVisible(visible);
    if (!visible) {
      clearTimeout(submenuTimeoutRef.current);
      submenuTimeoutRef.current = setTimeout(() => setOpenSubmenu(null), 500);
    }
  };

  const handleSubmenuHover = (menu, entering) => {
    clearTimeout(submenuTimeoutRef.current);
    if (entering) {
      setOpenSubmenu(menu);
    } else {
      submenuTimeoutRef.current = setTimeout(() => setOpenSubmenu(null), 300);
    }
  };

  return (
    <div ref={headerRef}>
      {/* Floating Logo */}
      <div
        className={`fixed top-6 left-0 right-0 z-10 flex justify-center transition-all duration-500 ease-out ${
          isScrollingDown ? "opacity-0 -translate-y-20" : "opacity-100 translate-y-0"
        } pointer-events-none`}
      >
        <Link 
          href="/" 
          className="flex items-center space-x-2 group pointer-events-auto"
          onClick={() => {
            setIsMenuOpen(false);
            setOpenSubmenu(null);
          }}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(79,70,229,0.5)]">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent hidden sm:block transition-all duration-300 group-hover:tracking-wider">
            Master Site
          </span>
        </Link>
      </div>

      {/* Menu Toggle Button */}
      <div
        className={`fixed top-4 right-4 z-50 transition-all duration-500 ease-out ${
          isScrollingDown ? "opacity-0 -translate-y-20" : "opacity-100 translate-y-0"
        }`}
        onMouseEnter={() => handleMenuHover(true)}
        onMouseLeave={() => handleMenuHover(false)}
      >
        <button
          onClick={toggleMenu}
          className="relative w-12 h-12 flex items-center justify-center group"
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6">
            <Menu
              className={`absolute w-6 h-6 text-gray-900 transition-all duration-400 ease-out ${
                isMenuOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 group-hover:rotate-180"
              }`}
            />
            <X
              className={`absolute w-6 h-6 text-gray-900 transition-all duration-400 ease-out ${
                isMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
              }`}
            />
          </div>
          <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {/* Desktop Header */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hidden sm:block ${
          isHeaderVisible || isMenuOpen
            ? "translate-y-0 bg-white/95 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-b border-gray-100/50"
            : "-translate-y-full"
        }`}
        onMouseEnter={() => handleMenuHover(true)}
        onMouseLeave={() => handleMenuHover(false)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex justify-center items-center gap-12">
            <div className="flex gap-16 items-center text-lg font-semibold">
              <Link
                href="/about"
                className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 flex items-center gap-3 group"
              >
                <div className="p-1.5 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 transition-colors duration-300">
                  <Cpu className="w-5 h-5 text-indigo-500 group-hover:text-indigo-600 transition-colors" />
                </div>
                About
              </Link>

              {/* Systems Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleSubmenuHover("Systems", true)}
                onMouseLeave={() => handleSubmenuHover("Systems", false)}
              >
                <button
                  onClick={() => toggleSubmenu("Systems")}
                  className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 flex items-center gap-3 group"
                >
                  <div className="p-1.5 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 transition-colors duration-300">
                    <Server className="w-5 h-5 text-indigo-500 group-hover:text-indigo-600 transition-colors" />
                  </div>
                  Systems
                  <ChevronDown
                    className={`w-4 h-4 ml-1 transition-transform duration-300 ${
                      openSubmenu === "Systems" ? "rotate-180 text-indigo-500" : "text-gray-400"
                    }`}
                  />
                </button>

                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-full mt-4 bg-white rounded-xl shadow-2xl border border-gray-100/30 p-4 transition-all duration-300 ease-out ${
                    openSubmenu === "Systems" 
                      ? "opacity-100 translate-y-0 pointer-events-auto" 
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  } w-64`}
                >
                  <div className="space-y-2">
                    {techProducts.Systems.map((item) => (
                      <Link
                        key={item.name}
                        href="#"
                        className={`group/item flex items-start p-3 rounded-lg transition-all duration-300 bg-gradient-to-r hover:from-${item.color.split(' ')[0]}/5 hover:to-${item.color.split(' ')[2]}/5`}
                      >
                        <div className="p-1.5 rounded-md bg-white shadow-sm mr-3 group-hover/item:shadow-md transition-all duration-300">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 group-hover/item:text-indigo-600 transition-colors">
                            {item.name}
                          </div>
                          <div className="text-xs text-gray-500">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Centered Logo */}
              <Link 
                href="/" 
                className="flex items-center space-x-2 group"
                onClick={() => {
                  setIsMenuOpen(false);
                  setOpenSubmenu(null);
                }}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(79,70,229,0.5)]">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent hidden sm:block transition-all duration-300 group-hover:tracking-wider">
                  Master Site
                </span>
              </Link>

              {/* Network Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleSubmenuHover("Network", true)}
                onMouseLeave={() => handleSubmenuHover("Network", false)}
              >
                <button
                  onClick={() => toggleSubmenu("Network")}
                  className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 flex items-center gap-3 group"
                >
                  <div className="p-1.5 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 transition-colors duration-300">
                    <Network className="w-5 h-5 text-indigo-500 group-hover:text-indigo-600 transition-colors" />
                  </div>
                  Network
                  <ChevronDown
                    className={`w-4 h-4 ml-1 transition-transform duration-300 ${
                      openSubmenu === "Network" ? "rotate-180 text-indigo-500" : "text-gray-400"
                    }`}
                  />
                </button>

                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-full mt-4 bg-white rounded-xl shadow-2xl border border-gray-100/30 p-4 transition-all duration-300 ease-out ${
                    openSubmenu === "Network" 
                      ? "opacity-100 translate-y-0 pointer-events-auto" 
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  } w-64`}
                >
                  <div className="space-y-2">
                    {techProducts.Network.map((item) => (
                      <Link
                        key={item.name}
                        href="#"
                        className={`group/item flex items-start p-3 rounded-lg transition-all duration-300 bg-gradient-to-r hover:from-${item.color.split(' ')[0]}/5 hover:to-${item.color.split(' ')[2]}/5`}
                      >
                        <div className="p-1.5 rounded-md bg-white shadow-sm mr-3 group-hover/item:shadow-md transition-all duration-300">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 group-hover/item:text-indigo-600 transition-colors">
                            {item.name}
                          </div>
                          <div className="text-xs text-gray-500">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 flex items-center gap-3 group"
              >
                <div className="p-1.5 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 transition-colors duration-300">
                  <Mail className="w-5 h-5 text-indigo-500 group-hover:text-indigo-600 transition-colors" />
                </div>
                Contact
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Header */}
      <div
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:hidden ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="h-full overflow-y-auto pt-20 pb-8 px-4">
          <nav className="flex flex-col gap-1">
            <Link
              href="/about"
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="p-2 rounded-lg bg-indigo-50">
                <Cpu className="w-5 h-5 text-indigo-500" />
              </div>
              <span className="text-lg font-medium text-gray-900">About</span>
            </Link>

            {/* Mobile Systems Dropdown */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => toggleSubmenu("Systems")}
                className="w-full flex items-center justify-between gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-indigo-50">
                    <Server className="w-5 h-5 text-indigo-500" />
                  </div>
                  <span className="text-lg font-medium text-gray-900">Systems</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                    openSubmenu === "Systems" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`pl-16 overflow-hidden transition-all duration-300 ease-out ${
                  openSubmenu === "Systems" ? "max-h-96 py-2" : "max-h-0"
                }`}
              >
                <div className="space-y-2">
                  {techProducts.Systems.map((item) => (
                    <Link
                      key={item.name}
                      href="#"
                      className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-300 group/item"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-md bg-gradient-to-br ${item.color} shadow-sm`}>
                          {React.cloneElement(item.icon, { className: "w-4 h-4 text-white" })}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-xs text-gray-500">{item.desc}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Network Dropdown */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => toggleSubmenu("Network")}
                className="w-full flex items-center justify-between gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-indigo-50">
                    <Network className="w-5 h-5 text-indigo-500" />
                  </div>
                  <span className="text-lg font-medium text-gray-900">Network</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                    openSubmenu === "Network" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`pl-16 overflow-hidden transition-all duration-300 ease-out ${
                  openSubmenu === "Network" ? "max-h-96 py-2" : "max-h-0"
                }`}
              >
                <div className="space-y-2">
                  {techProducts.Network.map((item) => (
                    <Link
                      key={item.name}
                      href="#"
                      className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-300 group/item"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-md bg-gradient-to-br ${item.color} shadow-sm`}>
                          {React.cloneElement(item.icon, { className: "w-4 h-4 text-white" })}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-xs text-gray-500">{item.desc}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="p-2 rounded-lg bg-indigo-50">
                <Mail className="w-5 h-5 text-indigo-500" />
              </div>
              <span className="text-lg font-medium text-gray-900">Contact</span>
            </Link>
          </nav>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex justify-center gap-6">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
                <Search className="w-5 h-5 text-gray-700" />
              </button>
              <button className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium hover:shadow-md transition-all duration-300 flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;