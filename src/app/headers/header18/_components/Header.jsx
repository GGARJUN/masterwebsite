"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Menu, X, ShoppingCart, ArrowRight, ChartBar, Tag, Megaphone, BarChart, Store, Lightbulb, Sparkles } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [activeHoverIndex, setActiveHoverIndex] = useState(null);
  const headerRef = useRef(null);

  const navItems = [
    { name: "Home", href: "/" },
    {
      name: "Products",
      href: "#",
      subItems: [
        {
          name: "All Products",
          href: "/",
          icon: ShoppingCart,
          desc: "Browse our entire ",
          image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
          color: "from-purple-600 to-indigo-600"
        },
        {
          name: "New Arrivals",
          href: "/",
          icon: ArrowRight,
          desc: "Discover the latest ",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
          color: "from-cyan-600 to-blue-600"
        },
        {
          name: "Best Sellers",
          href: "/",
          icon: ChartBar,
          desc: "Shop our top picks",
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1399&q=80",
          color: "from-emerald-600 to-teal-600"
        },
        {
          name: "Categories",
          href: "/",
          icon: Tag,
          desc: "Explore by category",
          image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
          color: "from-amber-600 to-orange-600"
        },
      ],
    },
    {
      name: "Solutions",
      href: "#",
      subItems: [
        {
          name: "Marketing",
          href: "/",
          icon: Megaphone,
          desc: "Boost your campaigns",
          image: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
          color: "from-fuchsia-600 to-pink-600"
        },
        {
          name: "Analytics",
          href: "/",
          icon: BarChart,
          desc: "Gain deep insights",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1415&q=80",
          color: "from-violet-600 to-purple-600"
        },
        {
          name: "Commerce",
          href: "/",
          icon: Store,
          desc: "Scale your store",
          image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
          color: "from-sky-600 to-cyan-600"
        },
        {
          name: "Insights",
          href: "/",
          icon: Lightbulb,
          desc: "Unlock business ",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
          color: "from-yellow-500 to-amber-500"
        },
      ],
    },
    { name: "Resources", href: "/resources" },
    { name: "Pricing", href: "/pricing" },
  ];

  const toggleDropdown = (itemName) => {
    setOpenDropdown((prev) => (prev === itemName ? null : itemName));
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setOpenDropdown(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculateDistance = (element) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.sqrt(
      Math.pow(cursorPosition.x - centerX, 2) +
      Math.pow(cursorPosition.y - centerY, 2)
    );
  };

  return (
    <header
      ref={headerRef}
      className={`w-full fixed top-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-gradient-to-b from-gray-900/95 to-gray-900/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] border-b border-gray-800/50"
        : "bg-transparent"
        }`}
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-indigo-900/40 to-cyan-900/30 animate-gradient-flow">
        <div className="absolute inset-0 bg-particle-pattern opacity-30" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 animate-float"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Hover Glow Effect */}
      {activeHoverIndex !== null && (
        <div
          className="absolute pointer-events-none transition-all duration-500 ease-out"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            width: '200px',
            height: '200px',
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle at center, rgba(139, 92, 246, 0.3) 0%, transparent 70%)`,
            opacity: 0.8,
            zIndex: 0,
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo with Holographic Effect */}
          <Link href="/" className="flex items-center space-x-3 group relative">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-[0_0_20px_rgba(168,85,247,0.5)] animate-pulse-slow group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] transition-all duration-300 z-10">
                M
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-600 opacity-70 blur-lg group-hover:opacity-90 group-hover:blur-xl transition-all duration-500 animate-pulse-slow" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-white bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:from-purple-300 group-hover:to-cyan-300 transition-all duration-300 relative  ">
              <span className="relative z-10">Master Site</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 opacity-20 blur-md group-hover:blur-lg transition-all duration-500" />
            </span>
            <Sparkles className="absolute -right-6 -top-2 text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-sparkle" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-2">
            {navItems.map((item, index) => (
              <div
                key={item.name}
                className=" group"
                onMouseEnter={() => setActiveHoverIndex(index)}
                onMouseLeave={() => setActiveHoverIndex(null)}
              >
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`flex items-center px-4 py-2 text-sm font-semibold text-white bg-gray-800/30 backdrop-blur-md rounded-xl hover:bg-gradient-to-r hover:from-purple-500/50 hover:to-cyan-500/50 transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.2)] relative overflow-hidden ${openDropdown === item.name ? 'bg-gradient-to-r from-purple-500/50 to-cyan-500/50' : ''
                        }`}
                      aria-expanded={openDropdown === item.name}
                    >
                      <span className="relative z-10">{item.name}</span>
                      {openDropdown === item.name ? (
                        <ChevronUp className="ml-2 h-4 w-4 text-cyan-400 animate-pulse" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4 text-cyan-400" />
                      )}
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                    {openDropdown === item.name && (
                      <div className="absolute left-0 right-0 top-full mt-2 mx-auto bg-gray-900 backdrop-blur-xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] animate-zoom-in z-50 overflow-hidden border border-gray-800/50">
                        <div className="grid grid-cols-1 gap-8 p-8 max-w-6xl mx-auto">
                          {/* <div className="relative overflow-hidden rounded-xl h-full min-h-[400px]">
                            <div className="grid grid-cols-2 gap-4 h-full animate-fade-in">
                              {item.subItems.slice(0, 4).map((subItem, subIndex) => (
                                <div 
                                  key={subItem.name} 
                                  className={`relative group/image overflow-hidden rounded-lg transition-all duration-500 ${activeHoverIndex === index ? 'transform hover:scale-105' : ''}`}
                                >
                                  <img
                                    src={subItem.image}
                                    alt={`${subItem.name} illustration`}
                                    className="object-cover w-full h-full transition-transform duration-700 group-hover/image:scale-110"
                                    loading="lazy"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent flex items-end p-4">
                                    <div>
                                      <span className="text-white text-sm font-semibold">{subItem.name}</span>
                                      <div className={`h-1 mt-2 bg-gradient-to-r ${subItem.color} rounded-full w-0 group-hover/image:w-full transition-all duration-500`} />
                                    </div>
                                  </div>
                                  <div className={`absolute inset-0 bg-gradient-to-b ${subItem.color} opacity-0 group-hover/image:opacity-20 transition-opacity duration-500`} />
                                </div>
                              ))}
                            </div>
                            </div> */}
                          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                          <div className="grid grid-cols-2 gap-5">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="group/sub flex items-center px-6 py-5 bg-gradient-to-r from-gray-800/50 to-gray-700/50 hover:from-purple-500/40 hover:to-cyan-500/40 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(168,85,247,0.4)] animate-slide-up border border-gray-700/50 hover:border-purple-500/30 relative overflow-hidden"
                                onClick={() => setOpenDropdown(null)}
                              >
                                <div className="absolute inset-0 bg-noise-pattern opacity-10" />
                                <div className="flex items-center space-x-4 relative z-10">
                                  <div className="w-60 h-40">
                                    <img
                                      src={subItem.image}
                                      alt={`${subItem.name} illustration`}
                                      className="object-cover w-full h-full rounded-xl transition-transform duration-700 group-hover/image:scale-110"
                                      loading="lazy"
                                    />
                                  </div>
                                  <div>
                                    <span className="block text-base font-semibold text-white group-hover/sub:text-cyan-200 transition-colors duration-300">
                                      {subItem.name}
                                    </span>
                                    <span className="block text-sm text-gray-400 group-hover/sub:text-gray-200 transition-colors duration-300">
                                      {subItem.desc}
                                    </span>
                                  </div>
                                </div>
                                <ArrowRight className="ml-auto w-5 h-5 text-cyan-400 opacity-0 group-hover/sub:opacity-100 transform translate-x-2 group-hover/sub:translate-x-0 transition-all duration-300 relative z-10" />
                                <div className={`absolute inset-0 bg-gradient-to-r ${subItem.color} opacity-0 group-hover/sub:opacity-10 transition-opacity duration-500`} />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-gray-800/30 backdrop-blur-md rounded-xl hover:bg-gradient-to-r hover:from-purple-500/50 hover:to-cyan-500/50 transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.2)] relative overflow-hidden"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-white rounded-xl bg-gray-800/30 backdrop-blur-md hover:bg-purple-500/50 transition-all duration-300 relative overflow-hidden group"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 relative z-10" />
            ) : (
              <Menu className="h-6 w-6 relative z-10" />
            )}
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-xl z-40 animate-slide-in-right">
          <div className="flex flex-col h-full pt-6 pb-4">
            <div className="flex justify-between items-center px-6 mb-6">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center text-white font-extrabold text-xl shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                  F
                </div>
                <span className="text-xl font-bold text-white">Finfactor</span>
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-white rounded-xl bg-gray-800/30 hover:bg-purple-500/50 transition-all duration-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col space-y-4 px-6 overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="w-full flex items-center justify-between py-3 px-4 text-base font-semibold text-white bg-gray-800/30 backdrop-blur-md rounded-xl hover:bg-purple-500/50 transition-all duration-300"
                      >
                        <span>{item.name}</span>
                        {openDropdown === item.name ? (
                          <ChevronUp className="h-5 w-5 text-cyan-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-cyan-400" />
                        )}
                      </button>
                      {openDropdown === item.name && (
                        <div className="pl-4 pt-2 space-y-2 animate-slide-down">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="flex flex-col py-3 px-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-700/50 hover:from-purple-500/40 hover:to-cyan-500/40 transition-all duration-300 shadow-[0_4px_12px_rgba(168,85,247,0.2)] relative overflow-hidden"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setOpenDropdown(null);
                              }}
                            >
                              <div className="flex items-center space-x-3 mb-3">
                                <div className={`p-1.5 rounded-md bg-gradient-to-br ${subItem.color}`}>
                                  <subItem.icon className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                  <span className="block text-sm font-medium text-white">{subItem.name}</span>
                                  <span className="block text-xs text-gray-400">{subItem.desc}</span>
                                </div>
                              </div>
                              <div className="relative w-full h-24 rounded-lg overflow-hidden">
                                <img
                                  src={subItem.image}
                                  alt={`${subItem.name} illustration`}
                                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
                                <div className={`absolute inset-0 bg-gradient-to-b ${subItem.color} opacity-20`} />
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block py-3 px-4 text-base font-semibold text-white bg-gray-800/30 backdrop-blur-md rounded-xl hover:bg-purple-500/50 transition-all duration-300"
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
      )}

      <style jsx>{`
        @keyframes gradient-flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes pulse-slow {
          0% {
            box-shadow: 0 0 10px rgba(168, 85, 247, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
          }
          100% {
            box-shadow: 0 0 10px rgba(168, 85, 247, 0.3);
          }
        }
        @keyframes sparkle {
          0% {
            opacity: 0;
            transform: translateY(0) rotate(0deg);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes zoom-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-down {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 1000px;
          }
        }
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
        .animate-gradient-flow {
          background-size: 200% 200%;
          animation: gradient-flow 15s ease infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease infinite;
        }
        .animate-sparkle {
          animation: sparkle 1.5s ease infinite;
        }
        .animate-zoom-in {
          animation: zoom-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
        .animate-slide-down {
          animation: slide-down 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
        .bg-particle-pattern {
          background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .bg-noise-pattern {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E");
        }
      `}</style>
    </header>
  );
};

export default Header;