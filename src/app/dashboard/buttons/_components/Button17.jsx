import React from 'react';
import { Sparkles, Eye, Zap, Lock, Rocket } from 'lucide-react';

const Button17 = () => {
  return (
    <div className="w-full p-10 bg-white rounded-3xl shadow-2xl">
      {/* Inline Keyframes */}
      <style jsx global>{`
        @keyframes sparkle {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translate(10px, -15px) scale(0.2);
            opacity: 0;
          }
        }
        @keyframes tilt {
          0%, 100% {
            transform: perspective(500px) rotateY(0deg);
          }
          50% {
            transform: perspective(500px) rotateY(10deg);
          }
        }
        @keyframes shatter {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.7;
          }
          100% {
            transform: translate(5px, 5px) scale(0);
            opacity: 0;
          }
        }
        @keyframes glitch {
          0%, 100% {
            transform: skew(0deg);
            opacity: 0.6;
          }
          50% {
            transform: skew(2deg);
            opacity: 0.8;
          }
        }
        @keyframes aura {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
          }
        }
        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(12px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(12px) rotate(-360deg);
          }
        }
        .animate-sparkle {
          animation: sparkle 0.8s infinite;
        }
        .animate-tilt {
          animation: tilt 0.7s ease-in-out;
        }
        .animate-shatter {
          animation: shatter 0.4s ease-out;
        }
        .animate-glitch {
          animation: glitch 1.5s infinite;
        }
        .animate-aura {
          animation: aura 2s infinite;
        }
        .animate-orbit {
          animation: orbit 2.5s linear infinite;
        }
        .group:hover .animate-orbit,
        .group:focus .animate-orbit,
        .group:active .animate-aura {
          animation-play-state: paused;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
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
            className="group relative overflow-hidden rounded px-8 py-3 h-12 text-sm font-semibold bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-2xl transition-all duration-400"
          >
            <div className="relative z-10 flex items-center justify-between">
              <span className="transition-all duration-400 group-hover:font-extrabold">Hover Me</span>
              <Sparkles
                className="h-5 w-5 transition-all duration-400 group-hover:scale-150 group-hover:rotate-12"
              />
            </div>
            <span className="absolute inset-0 pointer-events-none">
              <span className="absolute w-2 h-2 bg-white/60 rounded-full top-1 left-3 animate-sparkle" />
              <span className="absolute w-2 h-2 bg-white/60 rounded-full top-3 left-8 animate-sparkle delay-100" />
              <span className="absolute w-2 h-2 bg-white/60 rounded-full top-2 left-12 animate-sparkle delay-200" />
            </span>
          </button>
        </div>

        {/* Focus Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Focus Effect</h1>
          <button
            className="group relative overflow-hidden rounded-lg px-8 py-3 h-12 text-sm font-semibold bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md focus:shadow-2xl transition-all duration-400 focus:outline-none"
          >
            <div className="relative z-10 flex items-center justify-between focus:animate-tilt">
              <span>Focus Me</span>
              <Eye
                className="h-5 w-5 transition-all duration-400 group-focus:scale-125 group-focus:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              />
            </div>
            <span
              className="absolute inset-0 bg-indigo-900/40 opacity-0 group-focus:opacity-100 transition-opacity duration-500"
            />
          </button>
        </div>

        {/* Active Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Active Effect</h1>
          <button
            className="group relative overflow-hidden rounded-xl px-8 py-3 h-12 text-sm font-semibold bg-gradient-to-br from-emerald-600 to-teal-500 text-white shadow-md transition-all duration-200"
          >
            <div className="relative z-10 flex items-center justify-between">
              <span>Press Me</span>
              <Zap
                className="h-5 w-5 transition-all duration-200 group-active:rotate-180"
              />
            </div>
            <span className="absolute inset-0 pointer-events-none">
              <span
                className="absolute w-4 h-4 bg-white/50 rounded-full top-2 left-6 group-active:animate-shatter"
              />
              <span
                className="absolute w-4 h-4 bg-white/50 rounded-full bottom-2 right-6 group-active:animate-shatter delay-100"
              />
            </span>
          </button>
        </div>

        {/* Disabled Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Disabled State</h1>
          <button
            disabled
            className="relative rounded-2xl px-8 py-3 h-12 text-sm font-semibold bg-stone-400 text-stone-600 cursor-not-allowed shadow-md opacity-70"
          >
            <div className="relative z-10 flex items-center justify-between">
              <span>Disabled</span>
              <Lock
                className="h-5 w-5 text-stone-500 animate-glitch"
              />
            </div>
            <span
              className="absolute inset-0 bg-white/30 animate-glitch"
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
              <Rocket
                className="h-5 w-5 animate-orbit"
              />
            </div>
            <span
              className="absolute inset-0 animate-aura"
            />
            <span
              className="absolute w-3 h-3 bg-white/50 rounded-full top-0 left-0 animate-orbit delay-200"
            />
            <span
              className="absolute w-3 h-3 bg-white/50 rounded-full bottom-0 right-0 animate-orbit delay-300"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Button17;