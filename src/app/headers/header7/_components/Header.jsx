"use client";
import { useState, useEffect } from "react";
import { ChevronDownIcon, XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  const menuItems = [
    { name: "Dashboard", href: "#", submenus: [] },
    {
      name: "Features",
      submenus: [
        { name: "AI Analytics", href: "#" },
        { name: "Cloud Sync", href: "#" },
        { name: "Team Collab", href: "#" },
      ],
    },
    {
      name: "Tools",
      submenus: [
        { name: "Editor", href: "#" },
        { name: "Converter", href: "#" },
        { name: "Optimizer", href: "#" },
        { name: "Debugger", href: "#" },
      ],
    },
    { name: "Community", href: "#", submenus: [] },
    { name: "Docs", href: "#", submenus: [] },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const threshold = windowHeight * 0.05; // 5% of viewport height

      // Hide when scrolling down past 60px, show when within 5% of top
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setIsScrolled(true); // Hide
      } else if (currentScrollY <= threshold) {
        setIsScrolled(false); // Show
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleMobileSubmenu = (menuName) => {
    setOpenMobileSubmenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <>
      <header
        className={`fixed w-full top-5 z-50 transition-all duration-700 ease-in-out ${
          isScrolled
            ? "opacity-0 -translate-y-full scale-95 pointer-events-none"
            : "opacity-100 translate-y-0 scale-100 pointer-events-auto"
        }`}
      >
        <nav className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-blue-900/90 shadow-lg backdrop-blur-lg py-2 transition-all duration-500 ease-in-out">
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.map((menu) => (
                <div key={menu.name} className="relative group">
                  {menu.submenus.length > 0 ? (
                    <>
                      <button className="menu-item px-4 py-3 text-white/90 flex items-center transition-all duration-300 hover:text-white">
                        <span>{menu.name}</span>
                        <ChevronDownIcon className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:rotate-180" />
                      </button>
                      <div className="submenu absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2 transition-all duration-300">
                        {menu.submenus.map((item, index) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`submenu-item block px-5 py-3 text-gray-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white transition-all duration-300 ${
                              index === 0
                                ? "rounded-t-xl"
                                : index === menu.submenus.length - 1
                                ? "rounded-b-xl"
                                : ""
                            }`}
                          >
                            <span className="relative z-10">{item.name}</span>
                            <span className="absolute inset-0 bg-purple-100/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={menu.href}
                      className="menu-item px-4 py-3 text-white/90 hover:text-white transition-all duration-300"
                    >
                      {menu.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-white/90 hover:text-white transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-7 h-7 transform transition-all duration-300 rotate-180" />
              ) : (
                <Bars3Icon className="w-7 h-7 transform transition-all duration-300" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 bg-gradient-to-br from-purple-900/95 to-blue-900/95 transform transition-all duration-500 ease-in-out ${
            isMobileMenuOpen
              ? "translate-x-0 opacity-100 scale-100"
              : "translate-x-full opacity-0 scale-95"
          }`}
        >
          <div className="flex flex-col h-full justify-center items-center space-y-8">
            {menuItems.map((menu) => (
              <div key={menu.name} className="w-full max-w-xs text-center">
                {menu.submenus.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleMobileSubmenu(menu.name)}
                      className="mobile-menu-item text-2xl text-white/90 hover:text-white flex justify-center items-center w-full py-3 transition-all duration-300"
                    >
                      <span>{menu.name}</span>
                      <ChevronDownIcon
                        className={`w-6 h-6 ml-2 transform transition-all duration-300 ${
                          openMobileSubmenu === menu.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`space-y-4 transition-all duration-500 ease-in-out overflow-hidden ${
                        openMobileSubmenu === menu.name
                          ? "max-h-96 opacity-100 translate-y-0"
                          : "max-h-0 opacity-0 translate-y-4"
                      }`}
                    >
                      {menu.submenus.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block text-lg text-white/80 hover:text-white py-2 transition-all duration-300 hover:scale-105"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setOpenMobileSubmenu(null);
                          }}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={menu.href}
                    className="mobile-menu-item text-2xl text-white/90 hover:text-white block py-3 transition-all duration-300 hover:scale-105"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {menu.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Global Styles */}
      <style jsx global>{`
        .menu-item {
          position: relative;
          overflow: visible;
        }

        .menu-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(to right, #a855f7, #3b82f6);
          transform: translateX(-50%);
          transition: width 0.3s ease;
        }

        .menu-item:hover::after {
          width: 60%;
        }

        .submenu {
          transform-origin: top center;
          z-index: 10;
        }

        .submenu-item {
          position: relative;
          overflow: hidden;
        }

        .submenu-item::before {
          content: '';
          position: absolute;
          left: -10px;
          top: 50%;
          width: 6px;
          height: 6px;
          background: #9333ea;
          border-radius: 50%;
          transform: translateY(-50%) scale(0);
          transition: transform 0.3s ease;
        }

        .submenu-item:hover::before {
          transform: translateY(-50%) scale(1);
        }

        .mobile-menu-item {
          position: relative;
        }

        .mobile-menu-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(to right, #a855f7, #3b82f6);
          transform: translateX(-50%);
          transition: width 0.3s ease;
        }

        .mobile-menu-item:hover::after {
          width: 40%;
        }

        /* Advanced Scroll Transitions */
        header {
          transform-origin: center top;
          will-change: transform, opacity;
        }

        .mobile-menu {
          transform-origin: right center;
        }
      `}</style>
    </>
  );
};

export default Header;