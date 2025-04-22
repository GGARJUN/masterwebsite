"use client";
import React, { useState } from 'react';

const Button10 = () => {
  const [activeButton, setActiveButton] = useState(null);

  return (
    <div className="w-full p-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-2xl">
      <style jsx global>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateY(-50px) scale(0.5); opacity: 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 rgba(255, 255, 255, 0.3); }
          50% { box-shadow: 0 0 15px rgba(255, 255, 255, 0.6); }
        }
        @keyframes liquidRipple {
          0% { transform: scale(0); opacity: 0.6; }
          100% { transform: scale(3); opacity: 0; }
        }
        @keyframes pressDown {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(0.96); }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(15px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(15px) rotate(-360deg); }
        }

                @keyframes rippleEffect {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
        .animate-rippleEffect {
          animation: rippleEffect 0.6s ease-out;
        }
                  @keyframes glowBorder {
          0% {
            box-shadow: 0 0 5px rgba(251, 113, 133, 0.5), 0 0 10px rgba(251, 113, 133, 0.3);
          }
          50% {
            box-shadow: 0 0 10px rgba(251, 113, 133, 0.7), 0 0 20px rgba(251, 113, 133, 0.5);
          }
          100% {
            box-shadow: 0 0 5px rgba(251, 113, 133, 0.5), 0 0 10px rgba(251, 113, 133, 0.3);
          }
        }
        .animate-glowBorder {
          animation: glowBorder 1.5s ease-in-out infinite;
        }
      `}</style>

<div className="flex flex-col md:flex-row justify-evenly w-full items-center gap-8">
        
        {/* Hover Button - Floating Particles */}
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-xl font-semibold text-gray-800">Hover Effect</h1>
          <button 
            className="cursor-pointer relative h-12 px-8 rounded-xl font-bold text-white bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg group overflow-hidden transition-all duration-500"
            onMouseEnter={() => setActiveButton('hover')}
            onMouseLeave={() => setActiveButton(null)}
          >
            <span className="relative z-10">Hover Me</span>
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            {activeButton === 'hover' && (
              <>
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i}
                    className="absolute w-2 h-2 bg-white/50 rounded-full animate-floatUp"
                    style={{
                      left: `${10 + (i * 15)}%`,
                      bottom: '10%',
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </>
            )}
          </button>
        </div>

        {/* Focus Button - Pulse Glow */}
        <div className="flex flex-col items-center gap-6">
      <h1 className="text-xl font-semibold text-gray-800">Focus Effect</h1>
      <button
        className="cursor-pointer relative h-12 px-8 rounded-lg font-bold text-white bg-gradient-to-br from-blue-600 to-cyan-500 shadow-md focus:outline-none transition-all duration-300 hover:shadow-lg hover:scale-105"
        onFocus={() => setActiveButton("focus")}
        onBlur={() => setActiveButton(null)}
      >
        <span className="relative z-10">Focus Me</span>
        {activeButton === "focus" && (
          <span className="absolute inset-0 rounded-lg border-2 border-blue-300/50 animate-glowBorder" />
        )}
      </button>
    </div>

        {/* Active Button - Liquid Ripple */}
        <div className="flex flex-col items-center gap-6">
      <h1 className="text-xl font-semibold text-gray-800">Active Effect</h1>
      <button
        className="cursor-pointer relative h-12 px-8 rounded-lg font-bold text-white bg-gradient-to-br from-emerald-600 to-teal-500 border-2 border-purple-400/50 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg active:scale-95"
        onMouseDown={() => setActiveButton("active")}
        onMouseUp={() => setActiveButton(null)}
        onTouchStart={() => setActiveButton("active")}
        onTouchEnd={() => setActiveButton(null)}
      >
        <span className="relative z-10">Click Me</span>
        {activeButton === "active" && (
          <span
            className="absolute top-1/2 left-1/2 w-6 h-6 bg-indigo-300/50 rounded-full animate-rippleEffect"
            style={{ transform: "translate(-50%, -50%)" }}
          />
        )}
      </button>
    </div>

        {/* Disabled Button */}
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-xl font-semibold text-gray-800">Disabled</h1>
          <button 
            disabled
            className="relative h-12 px-8 rounded-xl font-bold text-gray-500 bg-gray-300 shadow-inner cursor-not-allowed"
          >
            <span className="relative z-10">Disabled</span>
            <span className="absolute inset-0 bg-white/30 rounded-xl"></span>
          </button>
        </div>

        {/* Animated Button - Orbiting Particles */}
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-xl font-semibold text-gray-800">Animated</h1>
          <button 
            className="cursor-pointer relative h-12 px-8 rounded-xl font-bold text-white bg-gradient-to-br from-rose-600 to-pink-600 shadow-lg group"
          >
            <span className="relative z-10">Animated</span>
            <span className="absolute top-1/2 left-1/2 w-3 h-3 bg-white/40 rounded-full animate-orbit"></span>
            <span className="absolute top-1/2 left-1/2 w-3 h-3 bg-white/40 rounded-full animate-orbit" style={{ animationDelay: '-1s' }}></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Button10;