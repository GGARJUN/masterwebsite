"use client";
import React, { useState, useEffect } from "react";

const Button5 = () => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full p-12 rounded-3xl bg-gradient-to-tr from-zinc-50 to-slate-100 shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 items-center justify-center">
        {/* Hover - Celestial Ray */}
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-xl font-semibold text-gray-900">Hover</h1>
          <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative h-12 px-8 rounded-xl font-bold text-white overflow-hidden transition-all duration-500"
          >
            <span className="relative z-10">Hover</span>
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 transition-opacity duration-500" />
            {mounted && (
              <span
                className={`absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.3)_0%,transparent_70%)] transition-opacity duration-500 ${
                  hovered ? "opacity-100 animate-[pulse_1.8s_infinite]" : "opacity-0"
                }`}
              />
            )}
          </button>
        </div>

        {/* Focus - Galactic Aura */}
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-xl font-semibold text-gray-900">Focus</h1>
          <button
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`relative h-12 px-8 rounded-xl font-bold text-white transition-all duration-300 focus:outline-none ${
              focused ? "ring-4 ring-blue-300/40 scale-105" : ""
            }`}
          >
            <span className="relative z-10">Focus</span>
            <span className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-xl" />
            {mounted && (
              <span
                className={`absolute inset-0 transition-opacity duration-500 ${
                  focused ? "opacity-100" : "opacity-0"
                }`}
              >
                <GlowOverlay />
              </span>
            )}
          </button>
        </div>

        {/* Active - Stellar Pulse */}
        <div className="flex flex-col items-center gap-5">
  <h1 className="text-xl font-semibold text-gray-900">Active Effect</h1>
  <button
    onMouseDown={() => setActive(true)}
    onMouseUp={() => setActive(false)}
    onMouseLeave={() => setActive(false)}
    className={`relative h-12 px-8 rounded-2xl font-bold overflow-hidden transition-all duration-300 ${
      active ? "shadow-inner" : "shadow-lg"
    }`}
  >
    <span className="relative z-10 flex items-center gap-2">
      {active ? (
        <>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Activated
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Active
        </>
      )}
    </span>
    
    {/* Base gradient layer */}
    <span className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl" />
    
    {/* Pressure-sensitive fill layer */}
    <span 
      className={`absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-green-400 to-emerald-500 rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] ${
        active ? "h-full" : "h-0"
      }`}
    />
    
    {/* Tactile feedback indicator */}
    <span 
      className={`absolute bottom-0 left-1/2 h-1 bg-white/80 rounded-full transform -translate-x-1/2 transition-all duration-200 ${
        active ? "w-3/4" : "w-0"
      }`}
    />
    
    {/* Micro-interaction highlight */}
    <span 
      className={`absolute top-0 left-0 w-full h-1/2 bg-white/10 rounded-t-2xl transition-opacity duration-300 ${
        active ? "opacity-0" : "opacity-100"
      }`}
    />
  </button>
</div>

        {/* Disabled - Void Zone */}
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-xl font-semibold text-gray-900">Disabled</h1>
          <button
            disabled
            className="relative h-12 px-8 rounded-xl font-bold text-gray-400 cursor-not-allowed"
          >
            <span className="relative z-10">Disabled</span>
            <span className="absolute inset-0 bg-gradient-to-br from-gray-800/80 to-gray-700/80 rounded-xl" />
            <span className="absolute inset-0 bg-gray-900/40 rounded-xl" />
          </button>
        </div>

<div className="flex flex-col items-center gap-5">
  <h1 className="text-xl font-semibold text-gray-900">Animated</h1>
  <button
    onMouseEnter={() => setAnimated(true)}
    onMouseLeave={() => setAnimated(false)}
    className="relative h-12 px-8 rounded-2xl font-bold text-white overflow-hidden group transition-all duration-500"
  >
    <span className="relative z-10 flex items-center gap-2">

      Animated
    </span>
    
    {/* Base gradient */}
    <span className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl" />
    
    {/* Liquid waves */}
    <span className={`absolute -bottom-1 left-0 right-0 h-12 bg-white/20 rounded-full transition-all duration-1000 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] ${
      animated ? "translate-y-[-30px] scale-110" : "translate-y-[10px] scale-100"
    }`} />
    
    {/* Bubble particles */}
    {animated && (
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        {[...Array(8)].map((_, i) => (
          <span 
            key={i}
            className="absolute bg-white/30 rounded-full animate-float"
            style={{
              left: `${10 + (i * 10)}%`,
              bottom: '-10px',
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
    )}
  </button>
</div>
      </div>

      {/* Global Keyframes */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.9;
          }
        }
  @keyframes float {
    0% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translateY(-50px) scale(0.5);
      opacity: 0;
    }
  }
  .animate-float {
    animation: float 1.5s ease-out forwards;
  }
      `}</style>
    </div>
  );
};

// Sub-components for visual effects
const GlowOverlay = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
    <circle cx="50" cy="50" r="30" fill="rgba(255,255,255,0.2)" />
    <circle cx="50" cy="50" r="15" fill="rgba(255,255,255,0.4)" />
  </svg>
);


export default Button5;
