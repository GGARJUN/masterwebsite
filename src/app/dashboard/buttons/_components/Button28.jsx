import React from 'react';

const Button28 = () => {
  return (
    <div className="w-full p-8 bg-gray-100 rounded-2xl shadow-lg ring-1 ring-gray-200/50">
      {/* Inline Keyframes */}
      <style jsx global>{`
        @keyframes burst {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.8;
            filter: blur(0px);
          }
          100% {
            transform: translate(0, -10px) scale(0.2);
            opacity: 0;
            filter: blur(4px);
          }
        }
        @keyframes shimmer {
          0%, 100% {
            transform: perspective(700px) rotateX(0deg);
            filter: brightness(1);
          }
          50% {
            transform: perspective(700px) rotateX(8deg);
            filter: brightness(1.4);
          }
        }
        @keyframes pulse {
          0% {
            transform: scale(0);
            opacity: 0.7;
            clip-path: circle(0% at 50% 50%);
          }
          100% {
            transform: scale(2);
            opacity: 0;
            clip-path: circle(100% at 50% 50%);
          }
        }
        @keyframes flicker {
          0%, 100% {
            opacity: 0.5;
            transform: skew(0deg);
          }
          50% {
            opacity: 0.7;
            transform: skew(1deg);
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
            transform: scale(1.1);
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.7);
          }
        }
        .animate-burst {
          animation: burst 0.7s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-shimmer {
          animation: shimmer 0.8s ease-in-out;
        }
        .animate-pulse {
          animation: pulse 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-flicker {
          animation: flicker 1.5s infinite;
        }
        .animate-morph {
          animation: morph 2.2s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
        .group:hover .animate-burst,
        .group:focus .animate-shimmer,
        .group:active .animate-pulse {
          animation-play-state: running;
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
          <h1 className="text-lg font-semibold text-gray-800">Hover Effect</h1>
          <button
            className="group relative overflow-hidden h-12 px-8 rounded-xl text-sm font-medium bg-purple-700 text-white shadow-md hover:shadow-[0_0_20px_rgba(168,85,247,0.7)] transition-all duration-500 backdrop-blur-[2px]"
          >
            <span className="relative z-10 transition-all duration-500 group-hover:-translate-y-1 group-hover:font-bold">
              Hover Me
            </span>
            <span className="absolute inset-0 pointer-events-none">
              <span
                className="absolute w-2 h-2 bg-white/60 rounded-full bottom-2 left-4 group-hover:animate-burst"
              />
              <span
                className="absolute w-2 h-2 bg-white/60 rounded-full bottom-3 left-8 group-hover:animate-burst delay-100"
              />
              <span
                className="absolute w-2 h-2 bg-white/60 rounded-full bottom-2 left-12 group-hover:animate-burst delay-200"
              />
            </span>
            <span
              className="absolute inset-0 bg-purple-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-600"
            />
          </button>
        </div>

        {/* Focus Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-semibold text-gray-800">Focus Effect</h1>
          <button
            className="group relative overflow-hidden h-12 px-8 rounded-xl text-sm font-medium bg-teal-600 text-white shadow-md focus:shadow-[0_0_20px_rgba(13,148,136,0.7)] transition-all duration-600 focus:outline-none"
          >
            <span className="relative z-10 transition-all duration-600 group-focus:tracking-wider focus:animate-shimmer">
              Focus Me
            </span>
            <span
              className="absolute inset-0 bg-teal-800/50 opacity-0 group-focus:opacity-100 transition-opacity duration-700 backdrop-blur-[3px]"
            />
          </button>
        </div>

        {/* Active Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-semibold text-gray-800">Active Effect</h1>
          <button
            className="group relative overflow-hidden h-12 px-8 rounded-xl text-sm font-medium bg-fuchsia-600 text-white shadow-md active:shadow-sm transition-all duration-300"
          >
            <span className="relative z-10 transition-all duration-300 group-active:font-extrabold group-active:-translate-y-1">
              Press Me
            </span>
            <span
              className="absolute top-1/2 left-1/2 w-0 h-0 bg-white/50 transform group-active:animate-pulse"
              style={{ transform: 'translate(-50%, -50%)' }}
            />
            <span
              className="absolute inset-0 bg-fuchsia-800/40 opacity-0 group-active:opacity-100 transition-opacity duration-400"
            />
          </button>
        </div>

        {/* Disabled Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-semibold text-gray-800">Disabled State</h1>
          <button
            disabled
            className="relative h-12 px-8 rounded-xl text-sm font-medium bg-slate-400 text-slate-600 cursor-not-allowed opacity-70 shadow-md"
          >
            <span className="relative z-10">Disabled</span>
            <span
              className="absolute inset-0 bg-white/30 animate-flicker backdrop-blur-[1px]"
            />
          </button>
        </div>

        {/* Animated Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-semibold text-gray-800">Animated</h1>
          <button
            className="group relative overflow-hidden h-12 px-8 rounded-xl text-sm font-medium bg-amber-600 text-white shadow-md animate-morph"
          >
            <span className="relative z-10 transition-all duration-700 group-hover:font-bold">
              Animated
            </span>
            <span
              className="absolute inset-0 bg-amber-800/50 animate-morph"
            />
            <span
              className="absolute w-3 h-3 bg-white/60 rounded-full bottom-0 left-3 animate-burst delay-100"
            />
            <span
              className="absolute w-3 h-3 bg-white/60 rounded-full bottom-0 right-3 animate-burst delay-200"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Button28;