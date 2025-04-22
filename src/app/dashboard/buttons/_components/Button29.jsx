import React from 'react';
import { Sparkles, Eye, Zap, Lock, Rocket } from 'lucide-react';

const Button29 = () => {
  return (
    <div className="w-full p-10 bg-white rounded-3xl shadow-2xl">
      {/* Inline Keyframes */}
      <style jsx global>{`
        @keyframes trail {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.9;
            filter: blur(0px);
          }
          100% {
            transform: translate(15px, -20px) scale(0.1);
            opacity: 0;
            filter: blur(5px);
          }
        }
        @keyframes hologram {
          0%, 100% {
            transform: perspective(600px) rotateX(0deg);
            filter: brightness(1);
          }
          50% {
            transform: perspective(600px) rotateX(15deg);
            filter: brightness(1.5);
          }
        }
        @keyframes shockwave {
          0% {
            transform: scale(0);
            opacity: 0.8;
            clip-path: circle(0% at 50% 50%);
          }
          100% {
            transform: scale(2);
            opacity: 0;
            clip-path: circle(100% at 50% 50%);
          }
        }
        @keyframes static {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.5;
          }
          50% {
            transform: translate(2px, -1px);
            opacity: 0.7;
          }
        }
        @keyframes morph {
          0%, 100% {
            clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
            transform: scale(1);
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
          }
          50% {
            clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
            transform: scale(1.15);
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.7);
          }
        }
        @keyframes beam {
          0% {
            transform: rotate(0deg) translateX(15px) rotate(0deg);
            opacity: 0.6;
          }
          100% {
            transform: rotate(360deg) translateX(15px) rotate(-360deg);
            opacity: 0.8;
          }
        }
        .animate-trail {
          animation: trail 0.7s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-hologram {
          animation: hologram 0.8s ease-in-out;
        }
        .animate-shockwave {
          animation: shockwave 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-static {
          animation: static 1.2s infinite;
        }
        .animate-morph {
          animation: morph 2.5s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-beam {
          animation: beam 2s linear infinite;
        }
        .group:hover .animate-beam,
        .group:focus .animate-beam,
        .group:active .animate-morph {
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
            className="group relative overflow-hidden rounded px-8 py-3 h-12 text-sm font-semibold bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-[0_0_25px_rgba(16,185,129,0.7)] transition-all duration-500"
          >
            <div className="relative z-10 flex items-center justify-between">
              <span className="transition-all duration-500 group-hover:tracking-wider">Hover Me</span>
              <Sparkles
                className="h-5 w-5 transition-all duration-500 group-hover:scale-175 group-hover:-rotate-30 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
              />
            </div>
            <span className="absolute inset-0 pointer-events-none backdrop-blur-[2px]">
              <span className="absolute w-3 h-3 bg-emerald-300/70 rounded-full top-1 left-2 animate-trail" />
              <span className="absolute w-3 h-3 bg-emerald-300/70 rounded-full top-3 left-6 animate-trail delay-100" />
              <span className="absolute w-3 h-3 bg-emerald-300/70 rounded-full top-2 left-10 animate-trail delay-200" />
            </span>
          </button>
        </div>

        {/* Focus Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Focus Effect</h1>
          <button
            className="group relative overflow-hidden rounded-lg px-8 py-3 h-12 text-sm font-semibold bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg focus:shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-all duration-600 focus:outline-none"
          >
            <div className="relative z-10 flex items-center justify-between focus:animate-hologram">
              <span className="transition-all duration-600 group-focus:font-extrabold">Focus Me</span>
              <Eye
                className="h-5 w-5 transition-all duration-600 group-focus:scale-150 group-focus:drop-shadow-[0_0_12px_rgba(255,255,255,1)] group-focus:-translate-x-1"
              />
            </div>
            <span
              className="absolute inset-0 bg-blue-950/50 opacity-0 group-focus:opacity-100 transition-opacity duration-700 backdrop-blur-[3px]"
            />
          </button>
        </div>

        {/* Active Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Active Effect</h1>
          <button
            className="group relative overflow-hidden rounded-xl px-8 py-3 h-12 text-sm font-semibold bg-gradient-to-br from-emerald-600 to-teal-500 text-white shadow-lg transition-all duration-300"
          >
            <div className="relative z-10 flex items-center justify-between">
              <span className="transition-all duration-300 group-active:tracking-tighter">Press Me</span>
              <Zap
                className="h-5 w-5 transition-all duration-300 group-active:scale-200 group-active:drop-shadow-[0_0_15px_rgba(255,255,255,1)]"
              />
            </div>
            <span
              className="absolute top-1/2 left-1/2 w-0 h-0 bg-rose-400/60 group-active:animate-shockwave"
              style={{ transform: 'translate(-50%, -50%)' }}
            />
            <span
              className="absolute w-4 h-4 bg-white/60 rounded-full top-1 left-8 group-active:animate-shockwave delay-100"
            />
          </button>
        </div>

        {/* Disabled Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Disabled State</h1>
          <button
            disabled
            className="relative rounded-2xl px-8 py-3 h-12 text-sm font-semibold bg-gray-700 text-gray-300 cursor-not-allowed shadow-lg opacity-75"
          >
            <div className="relative z-10 flex items-center justify-between">
              <span>Disabled</span>
              <Lock
                className="h-5 w-5 text-gray-400 animate-static"
              />
            </div>
            <span
              className="absolute inset-0 bg-gray-900/40 animate-static backdrop-blur-[1px]"
            />
          </button>
        </div>

        {/* Animated Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Animated</h1>
          <button
            className="group relative overflow-hidden rounded-3xl px-8 py-3 h-12 text-sm font-semibold bg-gradient-to-br from-rose-600 to-pink-600 text-white shadow-lg"
          >
            <div className="relative z-10 flex items-center justify-between animate-morph">
              <span className="transition-all duration-700">Animated</span>
              <Rocket
                className="h-5 w-5 animate-beam"
              />
            </div>
            <span
              className="absolute inset-0 animate-morph"
            />
            <span
              className="absolute w-4 h-4 bg-purple-300/70 rounded-full top-0 left-0 animate-beam delay-200"
            />
            <span
              className="absolute w-4 h-4 bg-purple-300/70 rounded-full bottom-0 right-0 animate-beam delay-300"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Button29;