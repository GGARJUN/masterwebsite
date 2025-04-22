"use client";
import React, { useState } from 'react';

const Button2 = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full p-12 rounded-2xl shadow-inner">
      <div className="flex flex-col md:flex-row justify-evenly w-full items-center gap-8">
        {/* 3D Hover Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-medium text-gray-700">Hover Effect</h1>
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative h-12 px-8 rounded-lg font-semibold text-white transition-all duration-300 ease-out  cursor-pointer ${
              isHovered ? 'translate-y-[-4px] shadow-lg' : 'shadow-md'
            }`}
            style={{
              background: 'linear-gradient(145deg, #6366f1, #4f46e5)',
              boxShadow: isHovered
                ? '0 10px 20px -5px rgba(79, 70, 229, 0.4)'
                : '0 4px 12px -2px rgba(79, 70, 229, 0.3)'
            }}
          >
            <span className="relative z-10">Hover Me</span>
            <span
              className={`absolute inset-0 rounded-lg bg-white/10 opacity-0 transition-opacity ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </button>
        </div>

        {/* Focus Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-medium text-gray-700">Focus Effect</h1>
          <button
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`relative h-12 px-8 rounded-lg font-semibold text-white transition-all duration-200  cursor-pointer ${
              isFocused ? 'ring-4 ring-blue-300 scale-[1.02]' : ''
            }`}
            style={{
              background: 'linear-gradient(145deg, #3b82f6, #2563eb)',
              boxShadow: '0 4px 12px -2px rgba(59, 130, 246, 0.3)'
            }}
          >
            Focus Me
          </button>
        </div>

        {/* Active Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-medium text-gray-700">Active Effect</h1>
          <button
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            onMouseLeave={() => setIsActive(false)}
            className={`relative h-12 px-8 rounded-lg font-semibold text-white transition-transform duration-100  cursor-pointer ${
              isActive ? 'scale-95 shadow-inner' : 'shadow-md'
            }`}
            style={{
              background: 'linear-gradient(145deg, #10b981, #059669)',
              boxShadow: isActive
                ? 'inset 0 2px 8px rgba(0,0,0,0.2)'
                : '0 4px 12px -2px rgba(16, 185, 129, 0.3)'
            }}
          >
            Press Me
          </button>
        </div>

        {/* Disabled Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-medium text-gray-700">Disabled State</h1>
          <button
            disabled
            className="h-12 px-8 rounded-lg font-semibold bg-gray-200 text-gray-500 cursor-not-allowed shadow-inner"
          >
            Disabled
          </button>
        </div>

        {/* Animated Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-medium text-gray-700">Animated</h1>
          <button
            className="relative h-12 px-8 rounded-lg font-semibold text-white shadow-md overflow-hidden group cursor-pointer "
            style={{
              background: 'linear-gradient(145deg, #ec4899, #db2777)'
            }}
          >
            <span className="relative z-10">Animated</span>
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute inset-0 animate-pulse-slow opacity-20">
              <span className="absolute top-0 left-0 h-full w-1/2 bg-white/30 skew-x-[-20deg] animate-shimmer" />
            </span>
          </button>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
        .animate-shimmer {
          animation: shimmer 2.5s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Button2;