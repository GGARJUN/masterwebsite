"use client";
import React from 'react';
import { Star } from 'lucide-react';

const Button9 = () => {
  return (
    <div className="w-full p-10 bg-white rounded-3xl shadow-2xl">
      <div className="flex flex-col md:flex-row justify-center w-full items-center gap-12">
        {/* Hover Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Hover Effect</h1>
          <button className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 text-white h-12 px-8 rounded-2xl font-medium shadow-md group">
            <span className="relative z-10 flex items-center gap-2">
              <Star className="w-5 h-5" />
              Hover Me
            </span>
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute top-1/2 left-1/2 w-0 h-0 bg-white/30 group-hover:animate-rippleWave" 
                  style={{ transform: 'translate(-50%, -50%)' }}></span>
          </button>
        </div>

        {/* Focus Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Focus Effect</h1>
          <button className="relative bg-gradient-to-r from-green-500 to-teal-500 text-white h-12 px-8 rounded-2xl font-medium shadow-md focus:outline-none focus:ring-4 focus:ring-teal-300 focus:scale-[1.02] transition-transform">
            <span className="relative z-10 flex items-center gap-2">
              <Star className="w-5 h-5" />
              Focus 
            </span>
            <span className="absolute inset-0 bg-white/10 opacity-0 focus:opacity-100 transition-opacity duration-200"></span>
          </button>
        </div>

        {/* Active Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Active Effect</h1>
          <button className="relative bg-gradient-to-r from-red-500 to-pink-500 text-white h-12 px-8 rounded-2xl font-medium shadow-md active:scale-95 transition-transform">
            <span className="relative z-10 flex items-center gap-2">
              <Star className="w-5 h-5" />
              Press 
            </span>
            <span className="absolute inset-0 bg-black/20 opacity-0 active:opacity-100 transition-opacity duration-150"></span>
          </button>
        </div>

        {/* Disabled Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Disabled State</h1>
          <button disabled className="relative bg-gray-200 text-gray-500 h-12 px-8 rounded-2xl font-medium cursor-not-allowed">
            <span className="relative z-10 flex items-center gap-2">
              <Star className="w-5 h-5" />
              Disabled
            </span>
          </button>
        </div>

        {/* Ultra Animated Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Ultra Animated</h1>
          <button className="relative bg-gradient-to-r from-yellow-500 to-orange-500 text-white h-12 px-8 rounded-2xl font-medium shadow-md group">
            <span className="relative z-10 flex items-center gap-2">
              <Star className="w-5 h-5" />
              Animated
            </span>
            <span className="absolute top-0 left-0 w-4 h-4 text-white/50 animate-orbit">
              <Star className="w-4 h-4" />
            </span>
            <span className="absolute bottom-0 right-0 w-4 h-4 text-white/50 animate-orbit" style={{ animationDelay: '-1.5s' }}>
              <Star className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes rippleWave {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.5;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }
        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(10px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(10px) rotate(-360deg);
          }
        }
        .animate-rippleWave {
          animation: rippleWave 0.6s ease-out;
        }
        .animate-orbit {
          animation: orbit 3s linear infinite;
        }
        .group:hover .animate-orbit {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Button9;