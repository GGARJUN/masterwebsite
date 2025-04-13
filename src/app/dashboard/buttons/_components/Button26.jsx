import React from 'react';
import { ArrowRight } from 'lucide-react';

const Button26 = () => {
  return (
    <div className="w-full p-10 bg-white rounded-3xl shadow-2xl">
      {/* Inline Keyframes */}
      <style jsx global>{`
        @keyframes pulseExpand {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.4;
          }
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
        }
        @keyframes fadeInOut {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes waveFlow {
          0% {
            transform: translateX(-10px);
          }
          100% {
            transform: translateX(10px);
          }
        }
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 0.6;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @keyframes spinCircle {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .animate-pulseExpand {
          animation: pulseExpand 1.5s infinite;
        }
        .animate-fadeInOut {
          animation: fadeInOut 2s ease-in-out infinite;
        }
        .animate-waveFlow {
          animation: waveFlow 1s ease-in-out infinite alternate;
        }
        .animate-ripple {
          animation: ripple 0.6s ease-out;
        }
        .animate-spinCircle {
          animation: spinCircle 3s linear infinite;
        }
      `}</style>

      <div className="flex flex-col md:flex-row justify-center w-full items-center gap-16">
        {/* Hover Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Hover Effect</h1>
          <button
            className="group relative overflow-hidden rounded-xl px-8 py-3 h-12 text-sm font-semibold bg-purple-600 text-white shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="relative z-10 flex items-center justify-between">
              <span className="transition-transform duration-300 group-hover:translate-x-2">Hover Me</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
            </div>
            <span className="absolute inset-0 bg-white/20 animate-pulseExpand" />
          </button>
        </div>

        {/* Focus Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Focus Effect</h1>
          <button
            className="group relative overflow-hidden rounded-xl px-8 py-3 h-12 text-sm font-semibold bg-cyan-600 text-white shadow-md focus:shadow-xl transition-all duration-300 focus:outline-none"
          >
            <div className="relative z-10 flex items-center justify-between">
              <span className="transition-opacity duration-300 group-focus:opacity-70">Focus Me</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-focus:-rotate-45" />
            </div>
            <span className="absolute inset-0 bg-cyan-800/30 animate-fadeInOut" />
          </button>
        </div>

        {/* Active Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Active Effect</h1>
          <button
            className="group relative overflow-hidden rounded-xl px-8 py-3 h-12 text-sm font-semibold bg-orange-600 text-white shadow-md active:scale-95 transition-all duration-150"
          >
            <div className="relative z-10 flex items-center justify-between">
              <span className="transition-transform duration-200 group-active:-translate-y-1">Press Me</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-active:scale-75" />
            </div>
            <span className="absolute inset-0 bg-orange-800/30 animate-ripple" />
          </button>
        </div>

        {/* Disabled Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Disabled State</h1>
          <button
            disabled
            className="relative rounded-xl px-8 py-3 h-12 text-sm font-semibold bg-slate-400 text-slate-600 cursor-not-allowed shadow-md opacity-60"
          >
            <div className="relative z-10 flex items-center justify-between">
              <span className="transition-opacity duration-300">Disabled</span>
              <ArrowRight className="h-5 w-5 text-slate-500" />
            </div>
            <span className="absolute inset-0 bg-slate-300/30 animate-waveFlow" />
          </button>
        </div>

        {/* Animated Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-bold text-gray-800 tracking-wider">Animated</h1>
          <button
            className="group relative overflow-hidden rounded-xl px-8 py-3 h-12 text-sm font-semibold bg-amber-600 text-white shadow-md"
          >
            <div className="relative z-10 flex items-center justify-between">
              <span className="transition-transform duration-300 group-hover:rotate-2">Animated</span>
              <ArrowRight className="h-5 w-5 animate-spinCircle" />
            </div>
            <span className="absolute inset-0 bg-amber-800/30 animate-spinCircle" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Button26;