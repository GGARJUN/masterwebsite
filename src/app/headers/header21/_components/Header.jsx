"use client";
import { useState, useEffect } from "react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Menu } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);

  const navItems = [
    { name: "Explore", href: "#", subItems: [] },
    {
      name: "Modules",
      subItems: [
        { name: "Quantum UI", href: "#" },
        { name: "Nexus API", href: "#" },
        { name: "Pulse Analytics", href: "#" },
      ],
    },
    {
      name: "Ecosystem",
      subItems: [
        { name: "Plugins", href: "#" },
        { name: "Integrations", href: "#" },
        { name: "Marketplace", href: "#" },
      ],
    },
    { name: "Launchpad", href: "#", subItems: [] },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const threshold = window.innerHeight * 0.1;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsScrolled(true);
      } else if (currentScrollY <= threshold) {
        setIsScrolled(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleMouseEnter = (name) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setOpenDropdown(null);
      setTimeoutId(null);
    }, 300);
    setTimeoutId(id);
  };

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <>
      <header
        className={`fixed w-full top-5 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "opacity-0 -translate-y-full"
            : "opacity-100 translate-y-0"
        }`}
      >
        <nav className="relative max-w-[95%] mx-auto px-6 ">
          {/* Glass Morphism Background */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xl rounded-xl shadow-sm border border-white/20 -z-10" />
          
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30 rounded-xl -z-20" />
          
          {/* Main Nav Container */}
          <div className="flex items-center justify-between px-6 py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg transform group-hover:rotate-6 transition-all duration-500 ease-out" />
                <div className="absolute inset-0 bg-white/10 rounded-lg backdrop-blur-sm" />
                <span className="absolute inset-0 flex items-center justify-center text-white font-extrabold text-2xl tracking-tight">
                  M
                </span>
              </div>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                MasterSite
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.subItems && item.subItems.length > 0 ? (
                    <>
                      <button
                        onMouseEnter={() => handleMouseEnter(item.name)}
                        onMouseLeave={handleMouseLeave}
                        className="nav-item flex items-center text-gray-700 px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-out hover:text-blue-600 rounded-lg relative"
                      >
                        <span className="relative z-10">{item.name}</span>
                        <ChevronDownIcon
                          className={`w-4 h-4 ml-1 transform transition-transform duration-300 ease-out ${
                            openDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`absolute left-0 mt-2 w-56 bg-white/95 backdrop-blur-lg rounded-lg shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 ease-out ${
                          openDropdown === item.name
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-2 pointer-events-none"
                        }`}
                        onMouseEnter={() => handleMouseEnter(item.name)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {item.subItems.map((subItem, index) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`flex items-center px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-300 ease-out ${
                              index === 0 ? "pt-3" : ""
                            }`}
                          >
                            <span className="relative z-10">{subItem.name}</span>
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="nav-item flex items-center text-gray-700 px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-out hover:text-blue-600 rounded-lg relative"
                    >
                      <span className="relative z-10">{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden fixed inset-0 bg-white/95 backdrop-blur-lg transform transition-all duration-500 ease-out ${
            isMobileMenuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <div className="relative flex flex-col h-full pt-20 pb-8 px-6">
            <div className="flex flex-col space-y-2 w-full max-w-md mx-auto">
              {navItems.map((item) => (
                <div key={item.name} className="w-full">
                  {item.subItems && item.subItems.length > 0 ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="w-full text-gray-700 text-lg font-medium py-3 px-4 hover:bg-blue-50 transition-all duration-300 rounded-lg flex items-center justify-between"
                      >
                        <span>{item.name}</span>
                        <ChevronDownIcon
                          className={`w-5 h-5 transform transition-transform duration-300 ${
                            openDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`w-full transition-all duration-300 ease-in-out overflow-hidden pl-4 ${
                          openDropdown === item.name
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block text-gray-600 py-2.5 px-4 text-base font-medium hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-300 rounded-lg"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setOpenDropdown(null);
                            }}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="w-full text-gray-700 text-lg font-medium py-3 px-4 hover:bg-blue-50 transition-all duration-300 rounded-lg block"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Global Styles */}
      <style jsx global>{`
        .nav-item {
          position: relative;
        }

        .nav-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
          transform: translateX(-50%);
          transition: width 0.3s ease;
        }

        .nav-item:hover::after {
          width: 70%;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Header;