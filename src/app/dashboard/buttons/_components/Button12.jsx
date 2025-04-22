import React from 'react';
import { ArrowRight } from 'lucide-react';

const Button12 = () => {
  return (
    <div className="w-full p-10 bg-white rounded-3xl shadow-2xl">
      {/* Inline Keyframes */}
      <style jsx global>{`
        @keyframes particleRise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-20px) scale(0.3);
            opacity: 0;
          }
        }
        @keyframes textSlide {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-8px);
          }
        }
        @keyframes burst {
          0% {
            transform: scale(0);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        @keyframes fadePulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
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
        .animate-particleRise {
          animation: particleRise 1s infinite;
        }
        .animate-textSlide {
          animation: textSlide 0.6s ease-in-out;
        }
        .animate-burst {
          animation: burst 0.3s ease-out;
        }
        .animate-fadePulse {
          animation: fadePulse 2s infinite;
        }
        .animate-orbit {
          animation: orbit 3s linear infinite;
        }
        .group:hover .animate-orbit,
        .group:focus .animate-orbit {
          animation-play-state: paused;
        }
        .delay-150 {
          animation-delay: 0.15s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>

<div className="flex flex-col md:flex-row justify-evenly w-full items-center gap-8">
        {/* Hover Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Hover Effect</h1>
          <button
            className="group relative overflow-hidden rounded px-8 py-3 h-12 text-sm font-semibold bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="relative z-10 flex items-center justify-between">
              <span className="transition-all duration-300">Hover Me</span>
              <ArrowRight
                className="h-5 w-5 transition-all duration-300 group-hover:scale-125"
              />
            </div>
            <span className="absolute inset-0 pointer-events-none">
              <span className="absolute w-2 h-2 bg-white/50 rounded-full top-2 left-4 animate-particleRise" />
              <span className="absolute w-2 h-2 bg-white/50 rounded-full top-4 left-10 animate-particleRise delay-150" />
            </span>
          </button>
        </div>

        {/* Focus Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Focus Effect</h1>
          <button
            className="group relative overflow-hidden rounded-lg px-8 py-3 h-12 text-sm font-semibold bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md focus:shadow-xl transition-all duration-300 focus:outline-none"
          >
            <div className="relative z-10 flex items-center justify-between">
              <span className="focus:animate-textSlide">Focus Me</span>
              <ArrowRight
                className="h-5 w-5 transition-all duration-300 group-focus:rotate-90"
              />
            </div>
            <span
              className="absolute inset-0 bg-cyan-800/30 opacity-0 group-focus:opacity-100 transition-opacity duration-400"
            />
          </button>
        </div>

        {/* Active Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Active Effect</h1>
          <button
            className="group relative overflow-hidden rounded-xl px-8 py-3 h-12 text-sm font-semibold bg-gradient-to-br from-emerald-600 to-teal-500 text-white shadow-md transition-all duration-150"
          >
            <div className="relative z-10 flex items-center justify-between">
              <span>Press Me</span>
              <ArrowRight
                className="h-5 w-5 transition-all duration-200 group-active:-translate-x-2"
              />
            </div>
            <span
              className="absolute top-1/2 left-1/2 w-0 h-0 bg-orange-400/50 group-active:animate-burst"
              style={{ transform: 'translate(-50%, -50%)' }}
            />
          </button>
        </div>

        {/* Disabled Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Disabled State</h1>
          <button
            disabled
            className="relative rounded-2xl px-8 py-3 h-12 text-sm font-semibold bg-slate-400 text-slate-600 cursor-not-allowed shadow-md opacity-60"
          >
            <div className="relative z-10 flex items-center justify-between">
              <span>Disabled</span>
              <ArrowRight className="h-5 w-5 text-slate-500" />
            </div>
            <span
              className="absolute inset-0 bg-white/20 animate-fadePulse"
            />
          </button>
        </div>

        {/* Animated Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Animated</h1>
          <button
            className="group relative overflow-hidden rounded-3xl px-8 py-3 h-12 text-sm font-semibold bg-gradient-to-br from-rose-600 to-pink-600 text-white shadow-md"
          >
            <div className="relative z-10 flex items-center justify-between">
              <span>Animated</span>
              <ArrowRight
                className="h-5 w-5 animate-orbit"
              />
            </div>
            <span
              className="absolute inset-0 bg-amber-800/20 animate-fadePulse"
            />
            <span
              className="absolute w-3 h-3 bg-white/40 rounded-full top-1 left-1 animate-orbit delay-150"
            />
            <span
              className="absolute w-3 h-3 bg-white/40 rounded-full bottom-1 right-1 animate-orbit delay-300"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Button12;