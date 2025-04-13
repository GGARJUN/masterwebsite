"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const headerRef = useRef(null);
  const canvasRef = useRef(null);

  const menuItems = [
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
    { name: "Support", href: "#", submenus: [] },
    { name: "Pricing", href: "#", submenus: [] },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Particle animation for background
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = 80; // Header height

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      vx: Math.random() * 0.5 - 0.25,
      vy: Math.random() * 0.5 - 0.25,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 80;
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const toggleSubmenu = (menuName) => {
    setOpenSubmenu((prev) => (prev === menuName ? null : menuName));
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setOpenSubmenu(null);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed w-full top-0 z-50 transition-all duration-700 ease-in-out ${
        isScrolled
          ? "bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] h-16"
          : "bg-transparent h-20"
      }`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-50"
      />
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center space-x-3 relative z-10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 ${
                isScrolled
                  ? "bg-gradient-to-br from-blue-500 to-purple-500"
                  : "bg-gradient-to-br from-blue-600 to-purple-600"
              } shadow-[0_0_15px_rgba(59,130,246,0.5)]`}
            >
              <span className="text-xl font-extrabold text-white">M</span>
            </div>
            <span
              className={`text-2xl font-bold bg-clip-text text-transparent transition-all duration-500 group-hover:scale-105 ${
                isScrolled
                  ? "bg-gradient-to-r from-blue-400 to-purple-400"
                  : "bg-gradient-to-r from-white to-gray-300"
              } hidden sm:block`}
            >
              MasterSite
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-3">
            {menuItems.map((menu) => (
              <div
                key={menu.name}
                className="relative group"
                onMouseLeave={() => setOpenSubmenu(null)}
              >
                {menu.submenus.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(menu.name)}
                      onMouseEnter={() => toggleSubmenu(menu.name)}
                      className="relative px-5 py-2 text-white font-medium flex items-center group-hover:text-blue-300 transition-all duration-300 transform group-hover:-translate-y-1"
                      style={{
                        transformStyle: "preserve-3d",
                        perspective: "1000px",
                      }}
                    >
                      <span
                        className="relative z-10"
                        style={{
                          transform: "translateZ(20px)",
                        }}
                      >
                        {menu.name}
                      </span>
                      <svg
                        className={`w-4 h-4 ml-2 transform transition-all duration-300 ${
                          openSubmenu === menu.name ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                      <span
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          transform: "translateZ(-10px)",
                        }}
                      />
                    </button>
                    {openSubmenu === menu.name && (
                      <div
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 bg-gradient-to-br from-blue-900/90 via-purple-900/90 to-pink-900/90 backdrop-blur-lg rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.4)] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 scale-95 group-hover:scale-100 transition-all duration-500 ease-out"
                      >
                        <div className="p-4 space-y-2">
                          {menu.submenus.map((item, index) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={`block px-5 py-3 text-white font-medium relative group/item rounded-xl transition-all duration-300 hover:bg-white/10 hover:pl-7 ${
                                index === 0
                                  ? "rounded-t-xl"
                                  : index === menu.submenus.length - 1
                                  ? "rounded-b-xl"
                                  : ""
                              }`}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setOpenSubmenu(null);
                              }}
                            >
                              <span className="relative z-10 flex items-center">
                                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                                {item.name}
                              </span>
                              <span
                                className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-xl scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"
                              />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={menu.href}
                    className="relative px-5 py-2 text-white font-medium flex items-center group-hover:text-blue-300 transition-all duration-300 transform group-hover:-translate-y-1"
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "1000px",
                    }}
                  >
                    <span
                      className="relative z-10"
                      style={{
                        transform: "translateZ(20px)",
                      }}
                    >
                      {menu.name}
                    </span>
                    <span
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        transform: "translateZ(-10px)",
                      }}
                    />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={handleMobileMenuToggle}
            className="lg:hidden relative p-2 text-white group"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="h-7 w-7 transition-all duration-500 group-hover:scale-110"
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
            <span
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-gradient-to-br from-blue-900/95 via-purple-900/95 to-pink-900/95 backdrop-blur-lg z-40 transition-all duration-700 ease-in-out animate-radialReveal"
            style={{ top: isScrolled ? "64px" : "80px" }}
          >
            <div className="flex flex-col h-full justify-center items-center space-y-8 px-6">
              {menuItems.map((menu) => (
                <div key={menu.name} className="w-full max-w-md">
                  {menu.submenus.length > 0 ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(menu.name)}
                        className="w-full flex justify-center items-center text-2xl text-white font-semibold relative group py-3"
                      >
                        <span
                          className="relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:text-blue-300"
                        >
                          {menu.name}
                        </span>
                        <svg
                          className={`w-6 h-6 ml-3 transform transition-all duration-500 ${
                            openSubmenu === menu.name ? "rotate-180 scale-110" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                        <span
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"
                        />
                      </button>
                      <div
                        className={`mt-4 space-y-4 transition-all duration-700 ease-in-out overflow-hidden ${
                          openSubmenu === menu.name
                            ? "max-h-[400px] opacity-100 translate-y-0"
                            : "max-h-0 opacity-0 translate-y-4"
                        }`}
                      >
                        {menu.submenus.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block text-center text-lg text-white/90 relative group py-3"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setOpenSubmenu(null);
                            }}
                          >
                            <span
                              className="relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:text-blue-300"
                            >
                              {item.name}
                            </span>
                            <span
                              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"
                            />
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={menu.href}
                      className="block text-center text-2xl text-white font-semibold relative group py-3"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span
                        className="relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:text-blue-300"
                      >
                        {menu.name}
                      </span>
                      <span
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"
                      />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>

      <style jsx>{`
        @keyframes radialReveal {
          0% {
            clip-path: circle(0% at 100% 0%);
            opacity: 0;
          }
          100% {
            clip-path: circle(150% at 100% 0%);
            opacity: 1;
          }
        }
        @keyframes aurora {
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
        .animate-radialReveal {
          animation: radialReveal 0.7s ease-out forwards;
        }
        header {
          background-size: 200% 200%;
          animation: aurora 15s ease-in-out infinite;
        }
        .group:hover {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        .group:hover > * {
          transform: translateZ(20px);
        }
      `}</style>
    </header>
  );
};

export default Header;