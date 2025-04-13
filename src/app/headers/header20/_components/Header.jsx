"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);
  const headerRef = useRef(null);

  const menuItems = [
    { name: "Solutions", href: "#", submenus: [] },
    {
      name: "Products",
      submenus: [
        { name: "Software", href: "#" },
        { name: "Hardware", href: "#" },
        { name: "Services", href: "#" },
        { name: "Bundles", href: "#" },
      ],
    },
    {
      name: "Resources",
      submenus: [
        { name: "Blog", href: "#" },
        { name: "Guides", href: "#" },
        { name: "Webinars", href: "#" },
        { name: "Docs", href: "#" },
      ],
    },
    {
      name: "Company",
      submenus: [
        { name: "About Us", href: "#" },
        { name: "Team", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileSubmenu = (menuName) => {
    setOpenMobileSubmenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <header
      ref={headerRef}
      className={`fixed w-full top-0 px-4 sm:px-6 lg:px-8 z-50 transition-all duration-700 ease-in-out ${
        isScrolled
          ? "bg-gradient-to-r from-red-600/80 via-cyan-600/80 to-blue-600/80 backdrop-blur-md rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.2)] mt-4"
          : "bg-gradient-to-r from-teal-600 via-cyan-600 to-red-600 shadow-md"
      }`}
    >
      <nav className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center space-x-2 group pointer-events-auto">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover:rotate-12">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-extrabold text-white hidden sm:block transition-all duration-500 group-hover:text-white/90 group-hover:tracking-widest group-hover:scale-105">
              MasterSite
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            {menuItems.map((menu) => (
              <div key={menu.name} className="relative group">
                {menu.submenus.length > 0 ? (
                  // Menu with submenus
                  <>
                    <button className="px-5 py-2 text-white font-medium flex items-center relative z-20 transition-all duration-300 group-hover:text-white/90">
                      <span>{menu.name}</span>
                      <ChevronDownIcon className="w-4 h-4 ml-2 transform transition-all duration-300 group-hover:rotate-180" />
                      <span className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out origin-center"></span>
                    </button>
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2 scale-95 group-hover:scale-100 transition-all duration-300 ease-out z-10">
                      <div className="p-4 space-y-2">
                        {menu.submenus.map((item, index) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`block px-4 py-3 relative overflow-hidden group/item transition-all duration-300 hover:bg-gradient-to-r hover:from-teal-500/80 hover:to-blue-500/80 hover:text-white hover:pl-6 ${
                              index === 0
                                ? "rounded-t-xl"
                                : index === menu.submenus.length - 1
                                ? "rounded-b-xl"
                                : ""
                            }`}
                          >
                            <div className="font-semibold relative z-10 flex items-center">
                              <span className="w-2 h-2 bg-teal-400 rounded-full mr-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></span>
                              {item.name}
                            </div>
                            <span className="absolute left-0 top-0 h-full w-1 bg-teal-400 transform scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 origin-bottom"></span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  // Menu without submenus
                  <Link
                    href={menu.href}
                    className="px-5 py-2 text-white font-medium flex items-center relative z-10 transition-all duration-300 group-hover:text-white/90"
                  >
                    <span>{menu.name}</span>
                    <span className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out origin-center"></span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white relative group"
          >
            <svg
              className="h-6 w-6 transition-all duration-500 group-hover:scale-125 group-hover:rotate-90"
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
            <span className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-center"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 bg-gradient-to-br from-teal-600/95 via-cyan-600/95 to-blue-600/95 transform transition-all duration-700 ease-in-out ${
            isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
          style={{ top: isScrolled ? "80px" : "64px" }}
        >
          <div className="flex flex-col h-full justify-center items-center space-y-6 px-4">
            {menuItems.map((menu) => (
              <div key={menu.name} className="w-full max-w-sm">
                {menu.submenus.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleMobileSubmenu(menu.name)}
                      className="text-2xl text-white font-medium w-full flex justify-center items-center relative group"
                    >
                      <span className="relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:text-white/80">
                        {menu.name}
                      </span>
                      <ChevronDownIcon
                        className={`w-6 h-6 ml-3 transform transition-all duration-500 ${
                          openMobileSubmenu === menu.name ? "rotate-180 scale-110" : ""
                        }`}
                      />
                      <span className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-center"></span>
                    </button>
                    <div
                      className={`mt-4 space-y-3 transition-all duration-700 ease-in-out overflow-hidden ${
                        openMobileSubmenu === menu.name
                          ? "max-h-[400px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {menu.submenus.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block text-center text-lg text-white/80 relative group py-2"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setOpenMobileSubmenu(null);
                          }}
                        >
                          <span className="relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:text-white">
                            {item.name}
                          </span>
                          <span className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-center"></span>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={menu.href}
                    className="text-2xl text-white font-medium w-full flex justify-center items-center relative group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:text-white/80">
                      {menu.name}
                    </span>
                    <span className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-center"></span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;