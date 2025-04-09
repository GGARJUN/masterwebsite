"use client";
import Link from "next/link";
import React, { useState } from "react";

const Buttons = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const navbar = [
    {
      id: 1,
      name: "Button - 1",
      path: "/headers/header1",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full p-10 bg-gradient-to-r from-black-50 to-white/60 min-h-screen">
      {navbar.map((item) => (
        <div
          key={item.id}
          className="group relative flex flex-col justify-center items-center h-48 w-full bg-white/20 border border-neutral-400 rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
          onMouseEnter={() => setHoveredId(item.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Background Gradient Effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-blue-500/10 to-cyan-500/10 transform transition-all duration-500 ${
              hoveredId === item.id ? "opacity-100 scale-110" : "opacity-0 scale-100"
            }`}
          ></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6 p-6">
            <h1
              className={`font-bold text-xl transition-all duration-300 ${
                hoveredId === item.id
                  ? "text-indigo-600 scale-105"
                  : "text-gray-900"
              }`}
            >
              {item.name}
            </h1>
            <Link href={item.path}>
              <button
                className="relative px-8 py-2 rounded-full text-white font-medium overflow-hidden transition-all duration-300 group-hover:shadow-lg"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 transform transition-all duration-300 group-hover:scale-110"></span>
                <span className="relative z-10 flex items-center gap-2">
                  View
                  <span
                    className={`inline-block transition-all duration-300 ${
                      hoveredId === item.id ? "translate-x-1" : "translate-x-0"
                    }`}
                  >
                    →
                  </span>
                </span>
                {/* Shine Effect */}
                <span
                  className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 transition-all duration-500 ${
                    hoveredId === item.id ? "translate-x-full" : "-translate-x-full"
                  }`}
                ></span>
              </button>
            </Link>
          </div>

          {/* Border Animation */}
          <div
            className={`absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-300 ${
              hoveredId === item.id
                ? "border-indigo-500/50 shadow-inner"
                : "border-gray-200/50"
            }`}
          ></div>

          {/* Corner Decorations */}
          <div
            className={`absolute top-2 left-2 w-2 h-2 bg-indigo-500 rounded-full transition-all duration-300 ${
              hoveredId === item.id ? "opacity-100" : "opacity-0"
            }`}
          ></div>
          <div
            className={`absolute bottom-2 right-2 w-2 h-2 bg-blue-500 rounded-full transition-all duration-300 ${
              hoveredId === item.id ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Buttons;
