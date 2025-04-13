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
      const threshold = windowHeight * 0.05;

      if (currentScrollY > lastScrollY && currentScrollY > 60) {
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
  const toggleMobileSubmenu = (menuName) => {
    setOpenMobileSubmenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <>
      <header
        className={`fixed w-full top-4 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "opacity-0 -translate-y-full scale-95 pointer-events-none"
            : "opacity-100 translate-y-0 scale-100 pointer-events-auto"
        }`}
      >
        <nav className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-teal-600/90 via-purple-600/90 to-indigo-600/90 shadow-md backdrop-blur-md py-3 transition-all duration-400 ease-in-out">
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-2">
              {menuItems.map((menu) => (
                <div key={menu.name} className="relative group">
                  {menu.submenus.length > 0 ? (
                    <>
                      <button className="menu-item px-4 py-2 text-white/95 flex items-center transition-all duration-200 hover:text-white hover:bg-white/10 rounded-lg">
                        <span>{menu.name}</span>
                        <ChevronDownIcon className="w-4 h-4 ml-1.5 transform transition-transform duration-200 group-hover:rotate-180" />
                      </button>
                      <div className="submenu absolute left-0 mt-1 w-56 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-1 transition-all duration-200">
                        {menu.submenus.map((item, index) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-teal-400 hover:to-purple-400 hover:text-white transition-all duration-200 ${
                              index === 0
                                ? "rounded-t-lg"
                                : index === menu.submenus.length - 1
                                ? "rounded-b-lg"
                                : ""
                            }`}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={menu.href}
                      className="menu-item px-4 py-2 text-white/95 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
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
              className="lg:hidden p-2 text-white/95 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6 transform transition-all duration-200" />
              ) : (
                <Bars3Icon className="w-6 h-6 transform transition-all duration-200" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 bg-gradient-to-br from-teal-700/95 to-indigo-700/95 transform transition-all duration-400 ease-in-out ${
            isMobileMenuOpen
              ? "translate-x-0 opacity-100 scale-100"
              : "translate-x-full opacity-0 scale-95"
          }`}
        >
          <div className="flex flex-col h-full justify-center items-center space-y-6">
            {menuItems.map((menu) => (
              <div key={menu.name} className="w-full max-w-sm text-center">
                {menu.submenus.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleMobileSubmenu(menu.name)}
                      className="mobile-menu-item text-xl text-white/95 hover:text-white flex justify-center items-center w-full py-2 transition-all duration-200 hover:bg-white/10 rounded-lg"
                    >
                      <span>{menu.name}</span>
                      <ChevronDownIcon
                        className={`w-5 h-5 ml-2 transform transition-all duration-200 ${
                          openMobileSubmenu === menu.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`space-y-2 transition-all duration-400 ease-in-out overflow-hidden ${
                        openMobileSubmenu === menu.name
                          ? "max-h-96 opacity-100 translate-y-0"
                          : "max-h-0 opacity-0 translate-y-2"
                      }`}
                    >
                      {menu.submenus.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block text-base text-white/90 hover:text-white py-2 hover:bg-white/10 rounded-lg transition-all duration-200"
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
                    className="mobile-menu-item text-xl text-white/95 hover:text-white block py-2 hover:bg-white/10 rounded-lg transition-all duration-200"
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
        }

        .menu-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(to right, #14b8a6, #a855f7);
          transform: translateX(-50%);
          transition: width 0.2s ease;
        }

        .menu-item:hover::after {
          width: 50%;
        }

        .submenu {
          transform-origin: top center;
          z-index: 10;
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
          background: linear-gradient(to right, #14b8a6, #a855f7);
          transform: translateX(-50%);
          transition: width 0.2s ease;
        }

        .mobile-menu-item:hover::after {
          width: 30%;
        }

        header {
          transform-origin: center top;
          will-change: transform, opacity;
        }
      `}</style>
    </>
  );
};

export default Header;