import React from 'react';
import { ArrowRight } from 'lucide-react';

const Button11 = () => {
  return (
    <div className="w-full p-10 bg-white rounded-3xl shadow-2xl">
      {/* Inline Keyframes */}
      <style jsx global>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(100%) skewX(-12deg);
          }
        }
        @keyframes borderPulse {
          0%, 100% {
            border-color: rgba(255, 255, 255, 0.3);
          }
          50% {
            border-color: rgba(255, 255, 255, 0.8);
          }
        }
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 0.5;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .animate-shine {
          animation: shine 0.8s ease-out;
        }
        .animate-borderPulse {
          animation: borderPulse 1.5s infinite;
        }
        .animate-ripple {
          animation: ripple 0.4s ease-out;
        }
        .animate-float {
          animation: float 2s infinite;
        }
        .group:hover .animate-shine,
        .group:focus .animate-shine,
        .group:active .animate-shine {
          animation-play-state: running;
        }
      `}</style>

      <div className="flex flex-col md:flex-row justify-center w-full items-center gap-16">
        {/* Hover Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Hover Effect</h1>
          <button
            className="group relative overflow-hidden rounded-2xl px-8 py-3 h-12 text-sm font-semibold transition-all duration-300 bg-white/80 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-blue-100 hover:text-indigo-100 shadow-md hover:shadow-lg"
          >
            <span
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 to-blue-500 transform -translate-x-full group-hover:translate-x-0 group-hover:opacity-100 opacity-0 transition-all duration-300"
            />
            <div className="relative z-10 flex items-center justify-between">
              <span className="transition-all duration-300 group-hover:font-bold">Hover Me</span>
              <ArrowRight
                className="h-5 w-5 transition-all duration-300 group-hover:translate-x-2"
              />
            </div>
            <span
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:animate-shine"
            />
          </button>
        </div>

        {/* Focus Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Focus Effect</h1>
          <button
            className="group relative overflow-hidden rounded-2xl px-8 py-3 h-12 text-sm font-semibold transition-all duration-300 bg-white/80 text-gray-700 focus:bg-gradient-to-r focus:from-green-600 focus:to-teal-600 focus:text-white shadow-md focus:shadow-lg focus:outline-none"
          >
            <span
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-500 to-teal-500 transform -translate-x-full group-focus:translate-x-0 group-focus:opacity-100 opacity-0 transition-all duration-300"
            />
            <div className="relative z-10 flex items-center justify-between">
              <span className="transition-all duration-300 group-focus:font-bold">Focus Me</span>
              <ArrowRight
                className="h-5 w-5 transition-all duration-300 group-focus:-rotate-45 group-focus:translate-x-2"
              />
            </div>
            <span
              className="absolute top among:from-transparent via-white/20 to-transparent transform -translate-x-full group-focus:animate-shine"
            />
          </button>
        </div>

        {/* Active Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Active Effect</h1>
          <button
            className="group relative overflow-hidden rounded-2xl px-8 py-3 h-12 text-sm font-semibold transition-all duration-150 bg-white/80 text-gray-700 active:bg-gradient-to-r active:from-red-600 active:to-pink-600 active:text-white shadow-md active:shadow-sm"
          >
            <span
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-500 to-pink-500 transform -translate-x-full group-active:translate-x-0 group-active:opacity-100 opacity-0 transition-all duration-200"
            />
            <div className="relative z-10 flex items-center justify-between">
              <span className="transition-all duration-300 group-active:font-bold">Press Me</span>
              <ArrowRight
                className="h-5 w-5 transition-all duration-200 group-active:translate-x-2"
              />
            </div>
            <span
              className="absolute top-1/2 left-1/2 w-0 h-0 bg-white/40 group-active:animate-ripple"
              style={{ transform: 'translate(-50%, -50%)' }}
            />
          </button>
        </div>

        {/* Disabled Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Disabled State</h1>
          <button
            disabled
            className="relative rounded-2xl px-8 py-3 h-12 text-sm font-semibold bg-gray-200 text-gray-500 cursor-not-allowed shadow-md opacity-70"
          >
            <div className="relative z-10 flex items-center justify-between">
              <span>Disabled</span>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
            <span
              className="absolute inset-0 border-2 border-gray-400/30 rounded-2xl animate-borderPulse"
            />
          </button>
        </div>

        {/* Animated Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Animated</h1>
          <button
            className="group relative overflow-hidden rounded-2xl px-8 py-3 h-12 text-sm font-semibold bg-white/80 text-gray-700 shadow-md"
          >
            <span
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-500 to-orange-500 transform -translate-x-full opacity-0 animate-float"
            />
            <div className="relative z-10 flex items-center justify-between">
              <span className="transition-all duration-300">Animated</span>
              <ArrowRight
                className="h-5 w-5 transition-all duration-300 animate-float"
              />
            </div>
            <span
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full animate-shine"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Button11;