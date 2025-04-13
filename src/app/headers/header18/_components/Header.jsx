"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const navItems = [
    {
      name: "Products",
      subItems: [
        {
          name: "Data Connect",
          description: "Gateway solution for entities to integrate into AA ecosystem",
          icon: "📡",
          subItems: [
            { name: "Landing", description: "Credit automation tools for loan underwriting & monitoring", icon: "📊" },
            { name: "Wealth Management", description: "Unlock comprehensive insights with advanced analytics tools", icon: "💼" },
            { name: "Transaction Categorization", description: "Accurately categorize unstructured bank narrations into insights", icon: "🔍" },
          ],
        },
        {
          name: "Finsense",
          description: "Platform for FUs to integrate with Multiple AAs",
          icon: "🌐",
          subItems: [
            { name: "ConnectHub", description: "Gateway for FIPs to connect with the AA network", icon: "🔗" },
          ],
        },
      ],
    },
    { name: "Developers", href: "/developers" },
    { name: "Company", href: "/company" },
    { name: "Contact us", href: "/contact" },
  ];

  const toggleDropdown = (itemName) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  return (
    <header className="w-full text-gray-900 relative">
      {/* Background Gradient with Grid Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/50 to-indigo-50/30 opacity-95">
        <div className="absolute inset-0 bg-grid-white/10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-700 rounded flex items-center justify-center text-white font-bold text-sm shadow-neo-sm">
              F
            </div>
            <span className="text-xl font-bold text-purple-800 group-hover:text-purple-600 transition-colors duration-300">
              Finfactor
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 ">
            {navItems.map((item) => (
              <div key={item.name} className="relative group ">
                {item.subItems ? (
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="flex items-center space-x-1 px-3 py-2 text-[clamp(0.9rem,2vw,1rem)] font-medium text-purple-700 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-purple-50 hover:text-purple-900 transition-all duration-300 focus:outline-none shadow-neo-sm"
                  >
                    <span>{item.name}</span>
                    {openDropdown === item.name ? (
                      <ChevronUp className="h-4 w-4 text-purple-600 transition-transform" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-purple-600 transition-transform" />
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center space-x-1 px-3 py-2 text-[clamp(0.9rem,2vw,1rem)] font-medium text-purple-700 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-purple-50 hover:text-purple-900 transition-all duration-300 shadow-neo-sm"
                  >
                    <span>{item.name}</span>
                  </Link>
                )}

                {item.subItems && openDropdown === item.name && (
                  <div className="absolute left-0 mt-2 w-72 rounded-xl bg-white/90 backdrop-blur-md border border-purple-200/50 shadow-neo-md p-3 animate-fadeScale z-50">
                    {item.subItems.map((subItem, index) => (
                      <div key={subItem.name} className="relative">
                        <div
                          className="p-3 rounded-lg bg-gradient-to-br from-purple-100 to-white/50 hover:bg-purple-200 transition-all duration-300 mb-2 last:mb-0"
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-purple-600 text-lg">{subItem.icon}</span>
                            <h3 className="font-semibold text-purple-800 text-[clamp(0.85rem,1.5vw,1rem)]">
                              {subItem.name}
                            </h3>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{subItem.description}</p>
                        </div>
                        {subItem.subItems && openDropdown === subItem.name && (
                          <div className="absolute left-full top-0 mt-[-10px] w-64 rounded-xl bg-white/90 backdrop-blur-md border border-purple-200/50 shadow-neo-md p-3 animate-slideIn">
                            {subItem.subItems.map((child, childIndex) => (
                              <div
                                key={child.name}
                                className="p-2 rounded-lg bg-purple-50 hover:bg-purple-100 transition-all duration-300 mb-1 last:mb-0"
                              >
                                <div className="flex items-center space-x-2">
                                  <span className="text-purple-600 text-base">{child.icon}</span>
                                  <h4 className="font-medium text-purple-700 text-[clamp(0.8rem,1.2vw,0.9rem)]">
                                    {child.name}
                                  </h4>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{child.description}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu (Not fully implemented in image, assumed accordion style) */}
      <div className="md:hidden">
        <div className="fixed  z-50" onClick={() => setOpenDropdown(null)} />
        {navItems.map((item) => (
          <div key={item.name} className="border-t border-purple-200/50">
            {item.subItems ? (
              <button
                onClick={() => toggleDropdown(item.name)}
                className="w-full flex items-center justify-between px-6 py-4 text-[clamp(1rem,4vw,1.25rem)] font-medium text-purple-700 bg-white/70 backdrop-blur-sm hover:bg-purple-50 transition-all duration-300 focus:outline-none"
              >
                <span>{item.name}</span>
                {openDropdown === item.name ? (
                  <ChevronUp className="h-5 w-5 text-purple-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-purple-600" />
                )}
              </button>
            ) : (
              <Link
                href={item.href}
                className="w-full flex items-center px-6 py-4 text-[clamp(1rem,4vw,1.25rem)] font-medium text-purple-700 bg-white/70 backdrop-blur-sm hover:bg-purple-50 transition-all duration-300"
              >
                {item.name}
              </Link>
            )}

            {item.subItems && openDropdown === item.name && (
              <div className="px-6 pb-4 bg-white/60 backdrop-blur-md animate-slideDown">
                {item.subItems.map((subItem, index) => (
                  <div key={subItem.name} className="mt-2">
                    <div className="p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-all duration-300">
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-600 text-lg">{subItem.icon}</span>
                        <h3 className="font-semibold text-purple-800 text-[clamp(0.9rem,3vw,1.1rem)]">
                          {subItem.name}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{subItem.description}</p>
                    </div>
                    {subItem.subItems && openDropdown === subItem.name && (
                      <div className="pl-6 mt-2 space-y-2">
                        {subItem.subItems.map((child, childIndex) => (
                          <div
                            key={child.name}
                            className="p-2 rounded-lg bg-purple-50/70 hover:bg-purple-100 transition-all duration-300"
                          >
                            <div className="flex items-center space-x-2">
                              <span className="text-purple-600 text-base">{child.icon}</span>
                              <h4 className="font-medium text-purple-700 text-[clamp(0.8rem,2vw,0.9rem)]">
                                {child.name}
                              </h4>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{child.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeScale {
          from { opacity: 0; transform: scale(0.95) translateY(-5px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 500px; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeScale { animation: fadeScale 0.3s ease-out forwards; }
        .animate-slideDown { animation: slideDown 0.4s ease-out forwards; }
        .animate-slideIn { animation: slideIn 0.3s ease-out forwards; }
        .bg-grid-white {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .shadow-neo-sm {
          box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1),
            inset -2px -2px 4px rgba(0, 0, 0, 0.1),
            3px 3px 6px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(255, 255, 255, 0.1);
        }
        .shadow-neo-md {
          box-shadow: inset 4px 4px 8px rgba(255, 255, 255, 0.05),
            inset -4px -4px 8px rgba(0, 0, 0, 0.15),
            6px 6px 12px rgba(0, 0, 0, 0.2), -2px -2px 4px rgba(255, 255, 255, 0.1);
        }
        .hover:shadow-glow:hover {
          box-shadow: 0 0 10px rgba(147, 51, 234, 0.5), 0 0 20px rgba(126, 34, 206, 0.3);
        }
      `}</style>
    </header>
  );
};

export default Header;