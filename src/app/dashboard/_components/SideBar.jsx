"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const SideBar = () => {
  const [activeItem, setActiveItem] = useState(null);

  const menu = [
    {
      id: 1,
      name: "Navigation Bar",
      path: "/dashboard/nav-bar",
    },
    {
      id: 2,
      name: "Buttons",
      path: "/dashboard/buttons",
    },
    {
      id: 3,
      name: "Slider",
      path: "/dashboard/nav-bar",
    },
    {
      id: 4,
      name: "Validation Form",
      path: "/dashboard/nav-bar",
    },
  ];

  return (
    <div className="w-64 h-screen fixed left-0 top-0  shadow-xl p-6 py-10 transition-all duration-300">
      {/* Logo Section */}
      <div className="flex flex-col items-center justify-center mb-10">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-400 flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-lg">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 bg-clip-text text-transparent hidden sm:block transition-all duration-300 group-hover:tracking-wider group-hover:scale-105">
            MasterSite
          </span>
        </Link>
        <div className="w-full mt-6 border-t border-gray-200/50 bg-gradient-to-r from-transparent via-gray-300 to-transparent h-px"></div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-4">
        {menu.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            onMouseEnter={() => setActiveItem(item.id)}
            onMouseLeave={() => setActiveItem(null)}
            className={`group relative overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-100 ${
              activeItem === item.id
                ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg"
                : "bg-white/80 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 hover:text-indigo-700"
            }`}
          >
            {/* Background Gradient Effect */}
            <span
              className={`absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 to-blue-500 transform ${
                activeItem === item.id
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-full opacity-0"
              } transition-all duration-300`}
            ></span>

            {/* Content */}
            <div className="relative flex items-center justify-between">
              <span className="z-10 transition-all duration-300 group-hover:font-bold">
                {item.name}
              </span>
              <ArrowRight
                className={`z-10 h-5 w-5 transition-all duration-300 ${
                  activeItem === item.id
                    ? "translate-x-2 -rotate-45"
                    : "group-hover:translate-x-2"
                }`}
              />
            </div>

            {/* Shine Effect */}
            <span
              className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-all duration-500 ${
                activeItem === item.id ? "translate-x-full" : "-translate-x-full"
              }`}
            ></span>
          </Link>
        ))}
      </nav>

      {/* Footer Section */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4"></div>
        <p className="text-xs text-gray-500 text-center font-medium">
          © {new Date().getFullYear()} MasterSite
        </p>
      </div>
    </div>
  );
};

export default SideBar;