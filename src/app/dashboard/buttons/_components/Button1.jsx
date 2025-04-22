import React from 'react';

const Button1 = () => {
  return (
    <div className="w-full p-12 shadow-lg">
      <style jsx global>{`
        @keyframes hologram {
          0%, 100% { opacity: 0.7; transform: skew(0deg); }
          50% { opacity: 1; transform: skew(2deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 10px rgba(100, 200, 255, 0.3); }
          50% { box-shadow: 0 0 20px rgba(100, 200, 255, 0.5); }
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -2px); }
          60% { transform: translate(-2px, 0); }
          80% { transform: translate(2px, 0); }
          100% { transform: translate(0); }
        }
        @keyframes wave {
          0% { background-position: 0 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .hologram::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #64b5f6, transparent);
          animation: hologram 2s ease-in-out infinite;
        }
        .glow-overlay::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, rgba(255, 255, 255, 0.3), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .glow-overlay:hover::after {
          opacity: 1;
        }
        .wave-bg {
          background: linear-gradient(90deg, #ff8a80, #ffbcaf, #ff8a80, #ffbcaf);
          background-size: 200% auto;
          animation: wave 4s linear infinite;
        }
      `}</style>

      <div className="flex flex-col md:flex-row justify-evenly w-full  items-center gap-8">
        {/* Hover Button - Holographic Effect */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-sm font-mono text-blue-600 tracking-widest">HOVER EFFECT</h1>
          <button className="relative  cursor-pointer h-12 px-8 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 font-mono text-sm border border-blue-300 hologram glow-overlay transform transition-all duration-400 hover:shadow-[0_0_15px_rgba(100,181,246,0.4)] hover:-translate-y-1 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200">
            <span className="relative z-10">Hover Me</span>
            <span className="absolute inset-0 bg-blue-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></span>
          </button>
        </div>

        {/* Focus Button - Neon Pulse Effect */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-sm font-mono text-indigo-600 tracking-widest">FOCUS EFFECT</h1>
          <button className="relative  cursor-pointer h-12 px-8 bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-600 font-mono text-sm border border-indigo-300 transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:scale-105 focus:bg-gradient-to-r focus:from-indigo-100 focus:to-indigo-200">
            <span className="relative z-10">Focus Me</span>
            <span className="absolute inset-0 bg-indigo-200/30 opacity-0 focus:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>

        {/* Active Button - Kinetic Push Effect */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-sm font-mono text-teal-600 tracking-widest">ACTIVE EFFECT</h1>
          <button className="relative cursor-pointer  h-12 px-8 bg-gradient-to-r from-teal-50 to-teal-100 text-teal-600 font-mono text-sm border border-teal-300 transform transition-all duration-150 active:scale-95 active:shadow-inner active:bg-gradient-to-r active:from-teal-100 active:to-teal-200">
            <span className="relative z-10">Press Me</span>
            <span className="absolute inset-0 bg-teal-200/40 opacity-0 active:opacity-100 transition-opacity duration-150"></span>
          </button>
        </div>

        {/* Disabled Button - Glitch Effect */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-sm font-mono text-gray-500 tracking-widest">DISABLED STATE</h1>
          <button
            disabled
            className="relative  h-12 px-8 bg-gray-100 text-gray-400 font-mono text-sm border border-gray-300 cursor-not-allowed opacity-90 "
          >
            <span className="relative z-10">Disable</span>
            <span className="absolute inset-0 bg-gray-200/50 animate-flicker"></span>
          </button>
        </div>

        {/* Animated Button - Wave Effect */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-sm font-mono text-pink-600 tracking-widest">ANIMATED</h1>
          <button className="relative  cursor-pointer h-12 px-8 wave-bg text-white font-mono text-sm border border-pink-300 shadow-md hover:shadow-pink-200/40 glow-overlay">
            <span className="relative z-10">Animated</span>
            <span className="absolute inset-0 bg-pink-300/30 opacity-0 hover:opacity-100 transition-opacity duration-400"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Button1;