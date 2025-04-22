"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDownIcon, XMarkIcon, Bars3Icon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDesktopSubmenu, setOpenDesktopSubmenu] = useState(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const headerRef = useRef(null);
  const submenuTimers = useRef({});

  const menuItems = [
    { 
      name: "Home", 
      href: "#", 
      submenus: [],
      highlight: true 
    },
    {
      name: "Products",
      href: "#",
      submenus: [
        { 
          name: "All Products", 
          href: "/", 
          description: "Explore our complete product catalog",
          icon: "📦"
        },
        { 
          name: "New Arrivals", 
          href: "/", 
          description: "Discover our latest innovations",
          icon: "✨"
        },
        { 
          name: "Best Sellers", 
          href: "/", 
          description: "Top-rated by our customers",
          icon: "🔥"
        },
        { 
          name: "Categories", 
          href: "/", 
          description: "Browse by product categories",
          icon: "🗂️"
        },
      ],
      megaMenu: true
    },
    {
      name: "Solutions",
      href: "#",
      submenus: [
        { 
          name: "Marketing", 
          href: "/", 
          description: "Boost your marketing efforts",
          icon: "📢"
        },
        { 
          name: "Analytics", 
          href: "/", 
          description: "Data-driven insights",
          icon: "📊"
        },
        { 
          name: "Commerce", 
          href: "/", 
          description: "E-commerce solutions",
          icon: "🛒"
        },
        { 
          name: "Insights", 
          href: "/", 
          description: "Business intelligence tools",
          icon: "🔍"
        },
      ],
      columns: 2
    },
    { 
      name: "Resources", 
      href: "#", 
      submenus: [],
      highlight: true 
    },
    { 
      name: "Pricing", 
      href: "#", 
      submenus: [],
      cta: true 
    },
  ];

  // Component mount effect
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Enhanced scroll behavior with debounce
  const handleScroll = useCallback(() => {
    if (!isMounted) return;

    const currentScrollY = window.scrollY;
    const threshold = window.innerHeight * 0.1;
    const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';

    if (scrollDirection === 'down' && currentScrollY > 100) {
      setIsScrolled(true);
    } else if (currentScrollY <= threshold || scrollDirection === 'up') {
      setIsScrolled(false);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY, isMounted]);

  // Scroll event listener with debounce
  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 100);
    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, [handleScroll]);

  // Debounce function
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  // Close dropdowns on outside click with improved detection
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        closeAllMenus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Keyboard navigation and accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeAllMenus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closeAllMenus = () => {
    setOpenDesktopSubmenu(null);
    setOpenMobileSubmenu(null);
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => {
      if (!prev) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return !prev;
    });
  };

  const handleDesktopSubmenuHover = (menuName, action) => {
    clearTimeout(submenuTimers.current[menuName]);
    
    if (action === 'enter') {
      submenuTimers.current[menuName] = setTimeout(() => {
        setOpenDesktopSubmenu(menuName);
      }, 100);
    } else {
      submenuTimers.current[menuName] = setTimeout(() => {
        setOpenDesktopSubmenu(null);
      }, 200); // Increased delay for smoother transition
    }
  };

  const toggleMobileSubmenu = (menuName) => {
    setOpenMobileSubmenu(prev => (prev === menuName ? null : menuName));
  };

  const renderDesktopSubmenu = (menu) => {
    if (!menu.submenus.length) return null;

    const isMegaMenu = menu.megaMenu;
    const columns = menu.columns || 1;

    return (
      <div 
        className={`absolute left-1/2 -translate-x-1/2 w-full max-w-4xl bg-slate-800/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700/30 overflow-hidden transition-all duration-300 ease-out ${
          openDesktopSubmenu === menu.name 
            ? 'opacity-100 translate-y-0 pointer-events-auto visible' 
            : 'opacity-0 -translate-y-2 pointer-events-none invisible'
        }`}
        style={{
          width: isMegaMenu ? '40rem' : `${columns * 14}rem`,
          transitionProperty: 'opacity, transform, visibility',
          willChange: 'transform, opacity, visibility'
        }}
      >
        <div 
          className={`grid ${isMegaMenu ? 'grid-cols-2 gap-x-6 gap-y-2' : `grid-cols-${columns} gap-2`} p-3`}
        >
          {menu.submenus.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group relative p-4 rounded-lg hover:bg-slate-700/50 transition-all duration-300 flex items-start space-x-4"
              onFocus={() => setOpenDesktopSubmenu(menu.name)}
              onMouseEnter={() => setOpenDesktopSubmenu(menu.name)}
            >
              <span className="text-2xl mt-1 text-slate-300 group-hover:text-white transition-colors duration-300">{item.icon}</span>
              <div className="flex-1">
                <h3 className="text-slate-100 font-medium text-base group-hover:text-white transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-slate-400 text-sm mt-1 line-clamp-2 group-hover:text-slate-200 transition-colors duration-300">
                  {item.description}
                </p>
              </div>
              <ArrowRightIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-300" />
            </Link>
          ))}
        </div>
        {isMegaMenu && (
          <div className="border-t border-slate-700/30 bg-slate-800/50 p-4">
            <div className="flex items-center justify-between">
              <p className="text-slate-400 text-sm">
                Need help choosing the right product?
              </p>
              <Link 
                href="/contact" 
                className="px-4 py-2 bg-slate-600 rounded-md text-white font-medium hover:bg-slate-500 transition-colors duration-300"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed w-full top-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'opacity-0 -translate-y-full shadow-none'
            : 'opacity-100 translate-y-0 bg-gradient-to-r from-blue-500/50 via-purple-500 to-pink-500/80 backdrop-blur-lg shadow-lg'
        }`}
        style={{
          willChange: 'transform, opacity',
          transitionProperty: 'transform, opacity, background-color, box-shadow'
        }}
      >
        <nav 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between h-18">
            {/* Logo with animated effect */}
            <Link 
              href="/" 
              className="flex items-center space-x-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 rounded-md"
              aria-label="Home"
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-slate-600 flex items-center justify-center transform transition-all duration-700 group-hover:scale-110">
                  <span className="text-white font-extrabold text-2xl">M</span>
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-slate-400/50 group-hover:animate-ping-slow opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none"></div>
              </div>
              <span className="text-2xl font-bold text-slate-100 group-hover:text-white transition-colors duration-300 hidden sm:block">
                Master Site
              </span>
            </Link>

            {/* Desktop Menu - Fixed hover glitch */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.map((menu) => (
                <div 
                  key={menu.name} 
                  className="relative"
                  // onMouseEnter={() => handleDesktopSubmenuHover(menu.name, 'enter')}
                  // onMouseLeave={() => handleDesktopSubmenuHover(menu.name, 'leave')}
                  onFocus={() => handleDesktopSubmenuHover(menu.name, 'enter')}
                  onBlur={() => handleDesktopSubmenuHover(menu.name, 'leave')}
                >
                  {menu.submenus.length > 0 ? (
                    <>
                      <button
                        onMouseEnter={() => handleDesktopSubmenuHover(menu.name, 'enter')}
                        className={`flex items-center px-5 py-3 text-sm font-medium transition-colors duration-300 relative ${
                          openDesktopSubmenu === menu.name 
                            ? 'text-white bg-slate-700/30 rounded-lg' 
                            : 'text-slate-200 hover:text-white hover:bg-slate-700/30 rounded-lg'
                        } ${
                          menu.highlight ? 'hover:bg-slate-700/30' : ''
                        } ${
                          menu.cta ? 'bg-slate-600 text-white rounded-lg px-6 hover:bg-slate-500 hover:shadow-lg hover:shadow-slate-500/20' : ''
                        }`}
                        aria-haspopup="true"
                        aria-expanded={openDesktopSubmenu === menu.name}
                      >
                        <span>{menu.name}</span>
                        {menu.submenus.length > 0 && (
                          <ChevronDownIcon
                            className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                              openDesktopSubmenu === menu.name ? 'rotate-180' : ''
                            }`}
                          />
                        )}
                        {menu.highlight && (
                          <span className="absolute -top-1 -right-1 w-2 h-2 bg-slate-400 rounded-full animate-pulse"></span>
                        )}
                      </button>
                      {renderDesktopSubmenu(menu)}
                    </>
                  ) : (
                    <Link
                      href={menu.href}
                      className={`px-5 py-3 text-sm font-medium transition-colors duration-300 relative ${
                        menu.highlight ? 'hover:bg-slate-700/30 rounded-lg' : ''
                      } ${
                        menu.cta ? 'bg-slate-600 text-white rounded-lg px-6 hover:bg-slate-500 hover:shadow-lg hover:shadow-slate-500/20' : 'text-slate-200 hover:text-white hover:bg-slate-700/30 rounded-lg'
                      }`}
                    >
                      {menu.name}
                      {menu.highlight && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-slate-400 rounded-full animate-pulse"></span>
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md text-slate-200 hover:text-white hover:bg-slate-700/50 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="relative w-7 h-7">
                <Bars3Icon 
                  className={`absolute w-7 h-7 transition-all duration-500 ${
                    isMobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                  }`}
                />
                <XMarkIcon 
                  className={`absolute w-7 h-7 transition-all duration-500 ${
                    isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 bg-slate-800/95 transition-all duration-700 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] ${
            isMobileMenuOpen 
              ? 'opacity-100 translate-x-0 pointer-events-auto' 
              : 'opacity-0 translate-x-full pointer-events-none'
          }`}
          style={{
            zIndex: 40,
            willChange: 'transform, opacity',
            transitionProperty: 'transform, opacity'
          }}
        >
          <div className="flex flex-col h-full justify-start pt-24 pb-12 items-center space-y-2 px-6 overflow-y-auto">
            {menuItems.map((menu, index) => (
              <div 
                key={menu.name} 
                className="w-full max-w-md text-center"
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms'
                }}
              >
                {menu.submenus.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleMobileSubmenu(menu.name)}
                      className={`w-full flex justify-between items-center text-left px-6 py-4 text-xl font-medium transition-colors duration-300 rounded-xl ${
                        openMobileSubmenu === menu.name
                          ? 'bg-slate-700/50 text-white'
                          : 'text-slate-200 hover:text-white hover:bg-slate-700/30'
                      }`}
                      aria-expanded={openMobileSubmenu === menu.name}
                    >
                      <span>{menu.name}</span>
                      <ChevronDownIcon
                        className={`w-5 h-5 ml-4 transition-transform duration-300 ${
                          openMobileSubmenu === menu.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`px-2 transition-all duration-500 ease-in-out overflow-hidden ${
                        openMobileSubmenu === menu.name 
                          ? 'max-h-[500px] opacity-100 mt-2' 
                          : 'max-h-0 opacity-0'
                      }`}
                      style={{
                        transitionProperty: 'max-height, opacity, margin-top'
                      }}
                    >
                      <div className="bg-slate-700/20 rounded-lg p-2 space-y-1">
                        {menu.submenus.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block text-left px-4 py-3 text-slate-200 text-base font-medium rounded-md transition-all duration-300 hover:text-white hover:bg-slate-600/30 hover:pl-6"
                            onClick={closeAllMenus}
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-xl text-slate-300">{item.icon}</span>
                              <div className="flex-1">
                                <div className="font-medium">{item.name}</div>
                                <div className="text-sm text-slate-400 mt-1 line-clamp-1">
                                  {item.description}
                                </div>
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
                    className={`block w-full px-6 py-4 text-xl font-medium transition-colors duration-300 rounded-xl ${
                      menu.cta 
                        ? 'bg-slate-600 text-white hover:bg-slate-500 hover:shadow-lg hover:shadow-slate-500/20' 
                        : 'text-slate-200 hover:text-white hover:bg-slate-700/30'
                    }`}
                    onClick={closeAllMenus}
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
        @keyframes ping-slow {
          0% {
            transform: scale(0.95);
            opacity: 0.8;
          }
          70%, 100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }

        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Enhanced focus styles */
        *:focus-visible {
          outline: 2px solid #94a3b8;
          outline-offset: 2px;
        }

        /* Custom scrollbar for mobile menu */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(71, 85, 105, 0.3);
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: rgba(148, 163, 184, 0.5);
          border-radius: 3px;
        }

        /* Reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
          
          .transition-all,
          .transition-colors,
          .transition-transform {
            transition: none !important;
          }
          
          [class*="animate-"] {
            animation: none !important;
          }
        }

        /* Optimize for high contrast */
        @media (prefers-contrast: high) {
          .bg-slate-800\/95,
          .bg-slate-700\/50,
          .bg-slate-700\/30,
          .bg-slate-600\/30 {
            background-color: #1e293b !important;
            border-color: #475569 !important;
          }
          
          .text-slate-200,
          .text-slate-100 {
            color: #ffffff !important;
          }
          
          .text-slate-400 {
            color: #d1d5db !important;
          }
        }
      `}</style>
    </>
  );
};

export default Header;