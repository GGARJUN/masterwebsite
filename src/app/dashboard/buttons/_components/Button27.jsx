import React from 'react';
import { ArrowRight } from 'lucide-react';

const Button27 = () => {
  return (
    <div className="w-full p-10 bg-white rounded-3xl shadow-2xl">
      {/* Inline Keyframes */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        @keyframes bounceSlide {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(6px);
          }
        }
        @keyframes pressFlash {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }
        @keyframes slowPulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes swirl {
          0% {
            transform: rotate(0deg) translateX(12px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(12px) rotate(-360deg);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s linear infinite;
          background-image: linear-gradient(
            90deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.3) 50%,
            rgba(255,255,255,0) 100%
          );
          background-size: 200% 100%;
        }
        .animate-bounceSlide {
          animation: bounceSlide 0.5s ease-in-out;
        }
        .animate-pressFlash {
          animation: pressFlash 0.4s ease-out;
        }
        .animate-slowPulse {
          animation: slowPulse 2.5s infinite;
        }
        .animate-swirl {
          animation: swirl 4s linear infinite;
        }
      `}</style>

      <div className="flex flex-col md:flex-row justify-center w-full items-center gap-16">
        {/* Hover Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Hover Effect</h1>
          <button className="group relative overflow-hidden rounded px-8 py-3 h-12 text-sm font-semibold bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
            <div className="relative z-10 flex items-center justify-between gap-2">
              <span className="group-hover:animate-bounceSlide transition-all duration-300">Hover </span>
              <ArrowRight className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="absolute inset-0 animate-shimmer" />
          </button>
        </div>

        {/* Focus Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Focus Effect</h1>
          <button className="group relative overflow-hidden rounded-lg px-8 py-3 h-12 text-sm font-semibold bg-teal-600 text-white shadow-md focus:shadow-xl focus:outline-none transition-all duration-300">
            <div className="relative z-10 flex items-center justify-between gap-2">
              <span className="group-focus:animate-bounceSlide">Focus</span>
              <ArrowRight className="h-5 w-5 group-focus:rotate-45 transition-transform duration-300" />
            </div>
            <span className="absolute inset-0 bg-teal-800/20 opacity-0 group-focus:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Active Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Active Effect</h1>
          <button className="group relative overflow-hidden rounded-xl px-8 py-3 h-12 text-sm font-semibold bg-pink-600 text-white shadow-md transition-all duration-150 active:scale-95">
            <div className="relative z-10 flex items-center justify-between gap-2">
              <span>Press</span>
              <ArrowRight className="h-5 w-5 group-active:-translate-x-2 transition-all duration-150" />
            </div>
            <span className="absolute top-1/2 left-1/2 w-10 h-10 bg-pink-300/40 rounded-full group-active:animate-pressFlash" style={{ transform: 'translate(-50%, -50%)' }} />
          </button>
        </div>

        {/* Disabled Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Disabled State</h1>
          <button disabled className="relative rounded-2xl px-8 py-3 h-12 text-sm font-semibold bg-gray-400 text-gray-700 cursor-not-allowed shadow-inner opacity-60">
            <div className="relative z-10 flex items-center justify-between gap-2">
              <span>Disabled</span>
              <ArrowRight className="h-5 w-5 text-gray-600" />
            </div>
            <span className="absolute inset-0 bg-white/20 animate-slowPulse" />
          </button>
        </div>

        {/* Animated Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Animated</h1>
          <button className="group relative overflow-hidden rounded-3xl px-8 py-3 h-12 text-sm font-semibold bg-lime-600 text-white shadow-md">
            <div className="relative z-10 flex items-center justify-between gap-2">
              <span>Animated</span>
              <ArrowRight className="h-5 w-5 animate-swirl" />
            </div>
            <span className="absolute inset-0 bg-lime-800/20 animate-slowPulse" />
            <span className="absolute w-3 h-3 bg-white/40 rounded-full top-2 left-2 animate-swirl" />
            <span className="absolute w-3 h-3 bg-white/40 rounded-full bottom-2 right-2 animate-swirl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Button27;
