"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon, CubeIcon, ArrowRightIcon, ChartBarIcon, TagIcon, GlobeAltIcon, ShoppingCartIcon, LightBulbIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);
  const headerRef = useRef(null);

  const menuItems = [
    { name: "Home", href: "#", submenus: [] },
    {
      name: "Products",
      submenus: [
        { name: "All Products", href: "/products/all" },
        { name: "New Arrivals", href: "/products/new" },
        { name: "Best Sellers", href: "/products/bestsellers" },
        { name: "Categories", href: "/products/categories" },
      ],
    },
    {
      name: "Solutions",
      submenus: [
        { name: "Marketing", href: "/solutions/marketing" },
        { name: "Analytics", href: "/solutions/analytics" },
        { name: "Commerce", href: "/solutions/commerce" },
        { name: "Insights", href: "/solutions/insights" },
      ],
    },
    { name: "Resources", href: "/resources", submenus: [] },
    { name: "Pricing", href: "/pricing", submenus: [] },
  ];

  const socialMedia = [
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
    },
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: "M16.5 2.5c-1.7 0-3.1 1.4-3.1 3.1v3.3H10V11h3.4v9.2h2.7V11h2.7l.4-2.1h-3.1V6.6c0-.6.4-1.1 1-1.1h2.1V2.5h-2.7z",
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.5.2.9.5 1.2.8.3.3.6.7.8 1.2.2.4.3 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.5-.5.9-.8 1.2-.3.3-.7.6-1.2.8-.4.2-1 .3-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.5-.2-.9-.5-1.2-.8-.3-.3-.6-.7-.8-1.2-.2-.4-.3-1-.4-2.2-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c-.1-1.2.2-1.8.4-2.2.2-.5.5-.9.8-1.2.3-.3.7-.6 1.2-.8.4-.2 1-.3 2.2-.4 1.2-.1 1.6-.1 4.8-.1zm0-2.2C8.7 0 8.3 0 7.1.1 5.8.2 4.8.4 3.9.7c-1 .3-1.8.8-2.6 1.6C.5 3.1 0 4 0 5c-.1 1.2-.1 1.6-.1 4.8s0 3.6.1 4.8c.1 1.2.2 1.8.4 2.2.2.5.5.9.8 1.2.3.3.7.6 1.2.8.4.2 1 .3 2.2.4 1.2.1 1.6.1 4.8.1s3.6 0 4.8-.1c1.2-.1 1.8-.2 2.2-.4.5-.2.9-.5 1.2-.8.3-.3.6-.7.8-1.2.2-.4.3-1 .4-2.2.1-1.2.1-1.6.1-4.8s0-3.6-.1-4.8c-.1-1.2-.2-1.8-.4-2.2-.2-.5-.5-.9-.8-1.2-.3-.3-.7-.6-1.2-.8-.4-.2-1-.3-2.2-.4C15.7 0 15.3 0 12 0z",
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) setOpenMobileSubmenu(null);
  };

  const getIconForItem = (itemName) => {
    const icons = {
      "All Products": <CubeIcon className="w-6 h-6" />,
      "New Arrivals": <ArrowRightIcon className="w-6 h-6" />,
      "Best Sellers": <ChartBarIcon className="w-6 h-6" />,
      Categories: <TagIcon className="w-6 h-6" />,
      Marketing: <GlobeAltIcon className="w-6 h-6" />,
      Analytics: <ChartBarIcon className="w-6 h-6" />,
      Commerce: <ShoppingCartIcon className="w-6 h-6" />,
      Insights: <LightBulbIcon className="w-6 h-6" />,
    };
    return icons[itemName] || <CubeIcon className="w-6 h-6" />;
  };

  return (
    <header
      ref={headerRef}
      className={`fixed w-full top-0 px-4 sm:px-6 lg:px-8 z-50 transition-all duration-500 ease-in-out relative ${
        isScrolled
          ? "bg-gray-900/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-b-3xl"
          : "bg-gradient-to-b from-gray-900/90 to-gray-800/70"
      }`}
    >
      <nav className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] animate-pulse-slow">
              <span className="text-white font-extrabold text-2xl">M</span>
            </div>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 hidden sm:block transition-all duration-300 group-hover:tracking-wider group-hover:scale-105">
              Master Site
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((menu) => (
              <div key={menu.name} className=" group">
                {menu.submenus.length > 0 ? (
                  <>
                    <button className="px-5 py-2 text-white font-semibold flex items-center transition-all duration-300 hover:text-cyan-300">
                      <span>{menu.name}</span>
                      <ChevronDownIcon className="w-5 h-5 ml-2 transform transition-all duration-300 group-hover:rotate-180 group-hover:text-cyan-300" />
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                    </button>
                    <div className="absolute left-0 right-0 top-full mt-2 w-screen bg-gray-900/90 backdrop-blur-xl rounded-xl shadow-[0_15px_50px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-3 transition-all duration-400 ease-out z-10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 max-w-7xl mx-auto">
                        {menu.submenus.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="group/sub flex items-center px-6 py-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 hover:from-cyan-500/30 hover:to-blue-500/30 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(34,211,238,0.3)] animate-fade-in"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="text-cyan-400 group-hover/sub:text-white transition-colors duration-300">
                                {getIconForItem(item.name)}
                              </div>
                              <div>
                                <span className="block text-base font-medium text-white group-hover/sub:text-cyan-200 transition-colors duration-300">
                                  {item.name}
                                </span>
                                <span className="block text-sm text-gray-400 group-hover/sub:text-gray-200 transition-colors duration-300">
                                  Explore {item.name.toLowerCase()}
                                </span>
                              </div>
                            </div>
                            <ArrowRightIcon className="ml-auto w-5 h-5 text-cyan-400 opacity-0 group-hover/sub:opacity-100 transform translate-x-2 group-hover/sub:translate-x-0 transition-all duration-300" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={menu.href}
                    className="px-5 py-2 text-white font-semibold relative transition-all duration-300 hover:text-cyan-300"
                  >
                    <span>{menu.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-white hover:text-cyan-400 transition-all duration-300"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-7 w-7 transform transition-all duration-300 scale-100" />
            ) : (
              <Menu className="h-7 w-7 transform transition-all duration-300 hover:scale-110" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-gray-900/95 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] transform transition-all duration-500 ease-in-out z-40 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-6 pb-4 overflow-y-auto">
            <div className="flex justify-end px-6">
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-white hover:text-cyan-400 transition-all duration-300"
              >
                <X className="h-7 w-7" />
              </button>
            </div>
            <div className="flex flex-col space-y-6 px-6">
              {menuItems.map((menu) => (
                <div key={menu.name} className="w-full">
                  {menu.submenus.length > 0 ? (
                    <>
                      <button
                        onClick={() => toggleMobileSubmenu(menu.name)}
                        className="w-full flex justify-between items-center text-xl text-white font-semibold hover:text-cyan-400 transition-all duration-300"
                      >
                        <span>{menu.name}</span>
                        <ChevronDownIcon
                          className={`w-6 h-6 transform transition-all duration-300 ${
                            openMobileSubmenu === menu.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`mt-3 space-y-3 transition-all duration-500 ease-in-out overflow-hidden ${
                          openMobileSubmenu === menu.name ? "opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        {menu.submenus.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center pl-4 py-2 text-base text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all duration-200 animate-fade-in"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setOpenMobileSubmenu(null);
                            }}
                          >
                            <div className="text-cyan-400 mr-3">{getIconForItem(item.name)}</div>
                            <span>{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={menu.href}
                      className="block text-xl text-white font-semibold hover:text-cyan-400 transition-all duration-300"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setOpenMobileSubmenu(null);
                      }}
                    >
                      {menu.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            {/* Social Media Icons */}
            <div className="mt-auto px-6 py-6 border-t border-gray-700/50">
              <div className="flex space-x-6 justify-center">
                {socialMedia.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Overlay for Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/60 z-30 transition-opacity duration-500"
            onClick={toggleMobileMenu}
          ></div>
        )}

        {/* Custom Animation Styles */}
        <style jsx>{`
          @keyframes pulse-slow {
            0% {
              box-shadow: 0 0 10px rgba(34, 211, 238, 0.3);
            }
            50% {
              box-shadow: 0 0 20px rgba(34, 211, 238, 0.5);
            }
            100% {
              box-shadow: 0 0 10px rgba(34, 211, 238, 0.3);
            }
          }
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
          }
        `}</style>
      </nav>
    </header>
  );
};

export default Header;