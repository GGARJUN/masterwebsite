"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon, Bars3Icon, ArrowRightIcon, HomeIcon, CubeIcon, StarIcon, ChartBarIcon, TagIcon, MegaphoneIcon, ShoppingCartIcon, LightBulbIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const headerRef = useRef(null);
  const timeoutRef = useRef(null);

  const menuItems = [
    { 
      name: "Home", 
      href: "/", 
      submenus: [], 
      icon: HomeIcon,
      color: "from-amber-500 to-yellow-600"
    },
    {
      name: "Products",
      href: "#",
      submenus: [
        { 
          name: "All Products", 
          href: "/", 
          desc: "Explore our full range of innovative tech", 
          icon: CubeIcon, 
          image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
        },
        { 
          name: "New Arrivals", 
          href: "/", 
          desc: "Discover cutting-edge releases", 
          icon: ArrowRightIcon, 
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop" 
        },
        { 
          name: "Best Sellers", 
          href: "/", 
          desc: "Shop our most popular items", 
          icon: CubeIcon, 
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop" 
        },
        { 
          name: "Categories", 
          href: "/", 
          desc: "Browse by product type", 
          icon: TagIcon, 
          image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1974&auto=format&fit=crop" 
        },
      ],
      icon: CubeIcon,
      color: "from-emerald-500 to-teal-600"
    },
    {
      name: "Solutions",
      href: "#",
      submenus: [
        { 
          name: "Marketing", 
          href: "/", 
          desc: "Amplify your brand's reach", 
          icon: MegaphoneIcon, 
          image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop" 
        },
        { 
          name: "Analytics", 
          href: "/", 
          desc: "Unlock data-driven insights", 
          icon: CubeIcon, 
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" 
        },
        { 
          name: "Commerce", 
          href: "/", 
          desc: "Streamline your e-commerce", 
          icon: ShoppingCartIcon, 
          image: "https://images.unsplash.com/photo-1555529669-a6386500c1f3?q=80&w=1932&auto=format&fit=crop" 
        },
        { 
          name: "Insights", 
          href: "/", 
          desc: "Gain actionable intelligence", 
          icon: LightBulbIcon, 
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop" 
        },
      ],
      icon: LightBulbIcon,
      color: "from-blue-500 to-indigo-600"
    },
    { 
      name: "Resources", 
      href: "/resources", 
      submenus: [], 
      icon: StarIcon,
      color: "from-purple-500 to-pink-600"
    },
    { 
      name: "Pricing", 
      href: "/pricing", 
      submenus: [], 
      icon: ChartBarIcon,
      color: "from-rose-500 to-red-600"
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenSubmenu(null);
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenSubmenu(null);
  };

  const toggleSubmenu = (menuName) => {
    setOpenSubmenu(openSubmenu === menuName ? null : menuName);
  };

  const handleMouseEnter = (menuName, color) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenSubmenu(menuName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenSubmenu(null);
    }, 500);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed w-full z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-gray-900/90 backdrop-blur-md shadow-lg py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 via-gray-900/50 to-gray-800/50 opacity-80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-all duration-300">
                  M
                </div>
                <StarIcon className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-twinkle" />
              </div>
              <span className="text-2xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
                Master Site
              </span>
            </Link>

            <nav className="hidden lg:flex items-center space-x-3">
              {menuItems.map((menu) => (
                <div
                  key={menu.name}
                  className=" group"
                  onMouseEnter={() => menu.submenus.length > 0 && handleMouseEnter(menu.name, menu.color)}
                  onMouseLeave={handleMouseLeave}
                >
                  {menu.submenus.length > 0 ? (
                    <>
                      <button
                        className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                          openSubmenu === menu.name
                            ? `bg-gradient-to-r ${menu.color} text-white`
                            : "text-gray-200 hover:text-white hover:bg-gray-700/30"
                        }`}
                        aria-expanded={openSubmenu === menu.name}
                      >
                        <menu.icon className="w-4 h-4 mr-2 text-gray-300 group-hover:text-white" />
                        <span>{menu.name}</span>
                        <ChevronDownIcon
                          className={`w-3 h-3 ml-2 transition-transform duration-300 ${
                            openSubmenu === menu.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openSubmenu === menu.name && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 mt-3 w-96 bg-gray-800/95 backdrop-blur-lg rounded-xl shadow-2xl animate-slide-down z-50">
                          <div className="p-6 space-y-4">
                            {menu.submenus.map((item, index) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center p-3 rounded-lg hover:bg-gray-700/50 transition-all duration-300 group/item"
                                style={{ animationDelay: `${index * 0.1}s` }}
                                onClick={() => setOpenSubmenu(null)}
                              >
                                <div className="p-2 bg-gray-900/50 rounded-md group-hover/item:bg-gradient-to-br group-hover/item:from-blue-500/50 group-hover/item:to-teal-500/50">
                                  <item.icon className="w-5 h-5 text-gray-300 group-hover/item:text-white" />
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-white group-hover/item:text-blue-300">{item.name}</p>
                                  <p className="text-xs text-gray-400 group-hover/item:text-gray-200">{item.desc}</p>
                                </div>
                                <ArrowRightIcon className="ml-auto w-4 h-4 text-blue-400 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={menu.href}
                      className={`flex items-center px-4 py-2 text-sm font-medium text-gray-200 hover:text-white rounded-md transition-all duration-300 ${
                        isScrolled ? "hover:bg-gray-700/30" : "hover:bg-gray-800/20"
                      }`}
                    >
                      <menu.icon className="w-4 h-4 mr-2 text-gray-300 group-hover:text-white" />
                      <span>{menu.name}</span>
                    </Link>
                  )}
                </div>
              ))}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 rounded-md opacity-0 group-hover:opacity-100 blur-sm transition-all duration-300" />
                <button className="relative px-5 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white text-sm font-medium rounded-md hover:scale-105 transition-all duration-300">
                  Get Started
                </button>
              </div>
            </nav>

            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-200 rounded-md hover:bg-gray-700/30 transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`lg:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-lg z-40 transition-all duration-500 ${
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
        }`}
      >
        <div className="flex flex-col h-full pt-16 pb-8 px-4 overflow-y-auto">
          <div className="space-y-2">
            {menuItems.map((menu) => (
              <div key={menu.name} className="w-full">
                {menu.submenus.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(menu.name)}
                      className={`flex items-center justify-between w-full px-4 py-3 text-base font-medium text-white rounded-md transition-all duration-300 ${
                        openSubmenu === menu.name 
                          ? `bg-gradient-to-r ${menu.color}` 
                          : "bg-gray-800/50 hover:bg-gray-700/50"
                      }`}
                    >
                      <div className="flex items-center">
                        <menu.icon className="w-5 h-5 mr-3 text-gray-300" />
                        <span>{menu.name}</span>
                      </div>
                      {openSubmenu === menu.name ? (
                        <ChevronUpIcon className="h-4 w-4 text-blue-400" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4 text-blue-400" />
                      )}
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        openSubmenu === menu.name ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pl-4 pt-2 space-y-2">
                        {menu.submenus.map((item, index) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-3 rounded-md bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300"
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onClick={() => {
                              toggleMobileMenu();
                              setOpenSubmenu(null);
                            }}
                          >
                            <div className="flex items-center space-x-3">
                              <item.icon className="w-5 h-5 text-gray-300" />
                              <div>
                                <p className="text-sm font-medium text-white">{item.name}</p>
                                <p className="text-xs text-gray-400">{item.desc}</p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={menu.href}
                    className="flex items-center px-4 py-3 text-base font-medium text-white rounded-md bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300"
                    onClick={toggleMobileMenu}
                  >
                    <menu.icon className="w-5 h-5 mr-3 text-gray-300" />
                    <span>{menu.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-700/50">
            <button className="w-full px-5 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white text-base font-medium rounded-md hover:scale-105 transition-all duration-300">
              Get Started
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes twinkle {
          0% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0.3; transform: scale(0.8); }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
        .animate-twinkle {
          animation: twinkle 1.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Header;