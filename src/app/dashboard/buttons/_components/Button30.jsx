import React from 'react';
import { ArrowRight } from 'lucide-react';

const Button30 = () => {
  return (
    <div className="w-full p-10 bg-white rounded-3xl shadow-2xl">
      {/* Inline Keyframes */}
      <style jsx global>{`
        @keyframes wave {
          0% {
            transform: translateY(100%);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100%);
            opacity: 0;
          }
        }
        @keyframes flip {
          0%, 100% {
            transform: perspective(800px) rotateX(0deg);
          }
          50% {
            transform: perspective(800px) rotateX(10deg);
          }
        }
        @keyframes shockwave {
          0% {
            transform: scale(0);
            opacity: 0.7;
            clip-path: ellipse(50% 20% at 50% 50%);
          }
          100% {
            transform: scale(3);
            opacity: 0;
            clip-path: ellipse(50% 100% at 50% 50%);
          }
        }
        @keyframes flicker {
          0%, 100% {
            opacity: 0.4;
            transform: translateY(0);
          }
          50% {
            opacity: 0.6;
            transform: translateY(-2px);
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
            clip-path: circle(50% at 50% 50%);
          }
          50% {
            transform: scale(1.2);
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.7);
            clip-path: circle(60% at 50% 50%);
          }
        }
        @keyframes beam {
          0% {
            transform: translateY(15px) rotate(0deg);
            opacity: 0.5;
          }
          100% {
            transform: translateY(-15px) rotate(360deg);
            opacity: 0.8;
          }
        }
        .animate-wave {
          animation: wave 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-flip {
          animation: flip 0.9s ease-in-out;
        }
        .animate-shockwave {
          animation: shockwave 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-flicker {
          animation: flicker 1.4s infinite;
        }

        .animate-beam {
          animation: beam 1.8s linear infinite;
        }
        .group:hover .animate-wave,
        .group:focus .animate-wave,
        .group:active .animate-shockwave {
          animation-play-state: running;
        }
        .group:hover .animate-beam,
        .group:focus .animate-beam,
        .group:active .animate-pulse {
          animation-play-state: paused;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>

      <div className="flex flex-col md:flex-row justify-evenly w-full items-center gap-8">
        {/* Hover Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Hover Effect</h1>
          <button
            className="group relative overflow-hidden rounded-2xl px-8 py-3 h-12 text-sm font-semibold bg-indigo-600 text-white shadow-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.8)] transition-all duration-600"
          >
            <span
              className="absolute inset-0 w-full h-full bg-gradient-to-t from-indigo-500 to-blue-500 transform translate-y-full group-hover:translate-y-0 group-hover:opacity-100 opacity-0 transition-all duration-500 backdrop-blur-[2px]"
            />
            <div className="relative z-10 flex items-center justify-between">
              <span className="transition-all duration-600 group-hover:font-extrabold group-hover:-translate-y-1">Hover Me</span>
              <ArrowRight
                className="h-5 w-5 transition-all duration-600 group-hover:-translate-y-2 group-hover:scale-125 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
              />
            </div>
            <span className="absolute inset-0 pointer-events-none">
              <span
                className="absolute w-3 h-3 bg-white/70 rounded-full bottom-0 left-4 group-hover:animate-wave"
              />
              <span
                className="absolute w-3 h-3 bg-white/70 rounded-full bottom-0 left-8 group-hover:animate-wave delay-100"
              />
            </span>
          </button>
        </div>

        {/* Focus Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Focus Effect</h1>
          <button
            className="group relative overflow-hidden rounded-2xl px-8 py-3 h-12 text-sm font-semibold bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg focus:shadow-[0_0_30px_rgba(16,185,129,0.8)] transition-all duration-700 focus:outline-none"
          >
            <span
              className="absolute inset-0 w-full h-full bg-gradient-to-t from-green-500 to-teal-500 transform translate-y-full group-focus:translate-y-0 group-focus:opacity-100 opacity-0 transition-all duration-600 backdrop-blur-[3px]"
            />
            <div className="relative z-10 flex items-center justify-between focus:animate-flip">
              <span className="transition-all duration-700 group-focus:tracking-wider">Focus Me</span>
              <ArrowRight
                className="h-5 w-5 transition-all duration-700 group-focus:-translate-y-2 group-focus:rotate-90 group-focus:drop-shadow-[0_0_12px_rgba(255,255,255,1)]"
              />
            </div>
            <span
              className="absolute bottom-0 left-0 w-full h-0 bg-white/30 transform group-focus:h-full group-focus:animate-wave"
            />
          </button>
        </div>

        {/* Active Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Active Effect</h1>
          <button
            className="group relative overflow-hidden rounded-2xl px-8 py-3 h-12 text-sm font-semibold bg-gradient-to-br from-emerald-600 to-teal-500 text-white shadow-lg transition-all duration-300"
          >
            <span
              className="absolute inset-0 w-full h-full bg-gradient-to-t from-red-500 to-pink-500 transform translate-y-full group-active:translate-y-0 group-active:opacity-100 opacity-0 transition-all duration-400"
            />
            <div className="relative z-10 flex items-center justify-between">
              <span className="transition-all duration-400 group-active:font-extrabold group-active:-translate-y-1">Press Me</span>
              <ArrowRight
                className="h-5 w-5 transition-all duration-400 group-active:-translate-y-2 group-active:scale-150 group-active:drop-shadow-[0_0_15px_rgba(255,255,255,1)]"
              />
            </div>
            <span
              className="absolute bottom-0 left-1/2 w-0 h-0 bg-white/50 transform group-active:animate-shockwave"
              style={{ transform: 'translate(-50%, 0)' }}
            />
            <span
              className="absolute bottom-0 left-1/4 w-4 h-4 bg-white/50 rounded-full group-active:animate-shockwave delay-100"
            />
          </button>
        </div>

        {/* Disabled Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Disabled State</h1>
          <button
            disabled
            className="relative rounded-2xl px-8 py-3 h-12 text-sm font-semibold bg-gray-200 text-gray-500 cursor-not-allowed shadow-lg opacity-65"
          >
            <div className="relative z-10 flex items-center justify-between">
              <span>Disabled</span>
              <ArrowRight
                className="h-5 w-5 text-gray-400 animate-flicker"
              />
            </div>
            <span
              className="absolute inset-0 bg-gray-300/40 animate-flicker backdrop-blur-[1px]"
            />
          </button>
        </div>

        {/* Animated Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Animated</h1>
          <button
            className="group relative overflow-hidden rounded-2xl px-8 py-3 h-12 text-sm font-semibold bg-gradient-to-br from-rose-600 to-pink-600 text-white shadow-lg"
          >
            <div className="relative z-10 flex items-center justify-between animate-pulse">
              <span className="transition-all duration-800">Animated</span>

            </div>
            <span
              className="absolute inset-0 bg-gradient-to-br from-rose-600 to-pink-600 animate-pulse"
            />
            <span
              className="absolute w-4 h-4 bg-white/60 rounded-full bottom-0 left-2 animate-beam delay-100"
            />
            <span
              className="absolute w-4 h-4 bg-white/60 rounded-full bottom-0 right-2 animate-beam delay-200"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Button30;