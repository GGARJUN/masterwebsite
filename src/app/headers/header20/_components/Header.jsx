"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon, XMarkIcon, Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Link from "next/link";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { 
      name: "Home", 
      href: "#", 
      submenus: [],
      icon: "🏠"
    },
    {
      name: "Products",
      submenus: [
        { name: "All Products", href: "/", icon: "📦" },
        { name: "New Arrivals", href: "/", icon: "🆕" },
        { name: "Best Sellers", href: "/", icon: "🔥" },
        { name: "Categories", href: "/", icon: "🗂️" },
      ],
      icon: "🛍️"
    },
    {
      name: "Solutions",
      submenus: [
        { name: "Marketing", href: "/", icon: "📢" },
        { name: "Analytics", href: "/", icon: "📊" },
        { name: "Commerce", href: "/", icon: "💳" },
        { name: "Insights", href: "/", icon: "🔍" },
      ],
      icon: "💡"
    },
    { 
      name: "Resources", 
      href: "#", 
      submenus: [],
      icon: "📚"
    },
    { 
      name: "Pricing", 
      href: "#", 
      submenus: [],
      icon: "💲"
    },
  ];

  const socialIcons = [
    { icon: <FaFacebook className="w-5 h-5" />, href: "#" },
    { icon: <FaTwitter className="w-5 h-5" />, href: "#" },
    { icon: <FaInstagram className="w-5 h-5" />, href: "#" },
    { icon: <FaLinkedin className="w-5 h-5" />, href: "#" },
    { icon: <FaYoutube className="w-5 h-5" />, href: "#" },
  ];

  const toggleMobileSubmenu = (menuName) => {
    setOpenMobileSubmenu((prev) => (prev === menuName ? null : menuName));
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setTimeout(() => {
        document.getElementById("search-input")?.focus();
      }, 100);
    }
  };

  return (
    <>
      {/* Top Bar with Social Icons and Contact Info */}
      <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-violet-600 text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="tel:+1234567890" className="hover:text-cyan-300 transition-colors duration-300 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +1 (234) 567-890
            </a>
            <a href="mailto:info@mastersite.com" className="hover:text-cyan-300 transition-colors duration-300 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              info@mastersite.com
            </a>
          </div>
          
          <div className="flex items-center space-x-3">
            {socialIcons.map((social, index) => (
              <a 
                key={index} 
                href={social.href} 
                className="text-white hover:text-cyan-300 transition-colors duration-300 transform hover:scale-125"
                aria-label={`Social media link ${index}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        ref={headerRef}
        className={`fixed w-full top-8 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-pink-600/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] border-b border-white/10"
            : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-xl"
        }`}
      >
        <nav className="max-w-7xl mx-auto">
          {/* Search Bar that slides down */}
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
            searchOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          }`}>
            <div className="px-4 py-3 bg-white/10 backdrop-blur-md flex items-center">
              <input
                id="search-input"
                type="text"
                placeholder="Search anything..."
                className="flex-1 bg-transparent border-b border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-cyan-300 py-2 px-3 transition-colors duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="ml-3 p-2 text-white hover:text-cyan-300 transition-colors duration-300">
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between h-16 px-4">
            {/* Logo with 3D effect */}
            <Link 
              href="/" 
              className="flex items-center space-x-2 group pointer-events-auto relative"
            >
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-extrabold text-white hidden sm:block bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200 transition-all duration-500 group-hover:scale-105 group-hover:tracking-wider group-hover:text-shadow-lg">
                MasterSite
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.map((menu) => (
                <div 
                  key={menu.name} 
                  className="relative group"
                >
                  {menu.submenus.length > 0 ? (
                    <>
                      <button 
                        className="px-5 py-2 text-white font-medium flex items-center relative z-20 transition-all duration-300 hover:scale-105 active:scale-95"
                      >
                        <span className="mr-1">{menu.icon}</span>
                        <span>{menu.name}</span>
                        <ChevronDownIcon className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:rotate-180" />
                      </button>
                      
                      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-white/20 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2 transition-all duration-300 ease-out">
                        <div className="p-2 space-y-1">
                          {menu.submenus.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block px-4 py-3 relative overflow-hidden group/item text-gray-800 hover:text-white rounded-xl transition-colors duration-300"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover/item:opacity-100 -z-10 transition-opacity duration-300" />
                              <div className="font-semibold relative z-10 flex items-center">
                                <span className="mr-2">{item.icon}</span>
                                {item.name}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={menu.href}
                      className="px-5 py-2 text-white font-medium flex items-center relative transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      <span className="mr-1">{menu.icon}</span>
                      <span>{menu.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleSearch}
                className="p-2 text-white hover:text-cyan-300 transition-colors duration-300 relative group"
                aria-label="Search"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
                <span className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" />
              </button>
              
              <Link 
                href="/account" 
                className="p-2 text-white hover:text-cyan-300 transition-colors duration-300 relative group hidden md:block"
                aria-label="Account"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" />
              </Link>
              
              <Link 
                href="/cart" 
                className="p-2 text-white hover:text-cyan-300 transition-colors duration-300 relative group"
                aria-label="Cart"
              >
                <div className="relative">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-cyan-400 text-xs text-white font-bold rounded-full h-5 w-5 flex items-center justify-center">3</span>
                </div>
                <span className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-white relative group"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6 transition-transform duration-500 rotate-90 scale-110" />
                ) : (
                  <Bars3Icon className="h-6 w-6 transition-transform duration-500 group-hover:rotate-90 group-hover:scale-110" />
                )}
                <span className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden fixed inset-0 bg-gradient-to-br from-indigo-600/95 via-purple-600/95 to-pink-600/95 backdrop-blur-2xl z-40 transition-all duration-500 ease-in-out overflow-y-auto ${
              isMobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-full pointer-events-none"
            }`}
            style={{ top: isScrolled ? "136px" : "120px" }}
          >
            <div className="flex flex-col h-full justify-center items-center space-y-8 px-4 py-10">
              {menuItems.map((menu) => (
                <div key={menu.name} className="w-full max-w-sm">
                  {menu.submenus.length > 0 ? (
                    <>
                      <button
                        onClick={() => toggleMobileSubmenu(menu.name)}
                        className="text-3xl text-white font-medium w-full flex justify-between items-center p-4 rounded-xl bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <div className="flex items-center">
                          <span className="mr-3">{menu.icon}</span>
                          <span>{menu.name}</span>
                        </div>
                        <ChevronDownIcon className={`w-6 h-6 transition-transform duration-300 ${
                          openMobileSubmenu === menu.name ? "rotate-180" : ""
                        }`} />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openMobileSubmenu === menu.name ? "max-h-[500px]" : "max-h-0"
                        }`}
                      >
                        <div className="pl-6 pt-2 space-y-2">
                          {menu.submenus.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block text-2xl text-white/80 hover:text-white p-3 rounded-lg bg-white/5 backdrop-blur-sm transition-colors duration-300"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setOpenMobileSubmenu(null);
                              }}
                            >
                              <div className="flex items-center">
                                <span className="mr-3">{item.icon}</span>
                                {item.name}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={menu.href}
                      className="text-3xl text-white font-medium w-full flex items-center p-4 rounded-xl bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mr-3">{menu.icon}</span>
                      {menu.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile Social Icons */}
              <div className="flex items-center space-x-6 pt-6">
                {socialIcons.map((social, index) => (
                  <a 
                    key={index} 
                    href={social.href} 
                    className="text-white hover:text-cyan-300 transition-colors duration-300 transform hover:scale-125 text-2xl"
                    aria-label={`Social media link ${index}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;