import React from 'react';

const Button19 = () => {
  return (
    <div className="w-full p-8 bg-gradient-to-br from-gray-950 to-gray-900 shadow-2xl">
      <style jsx global>{`
        @keyframes hologram {
          0%, 100% { opacity: 0.7; transform: skew(0deg); }
          50% { opacity: 1; transform: skew(2deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 10px rgba(0, 255, 204, 0.5); }
          50% { box-shadow: 0 0 20px rgba(0, 255, 204, 0.8); }
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-3px, 3px); }
          40% { transform: translate(3px, -3px); }
          60% { transform: translate(-3px, 0); }
          80% { transform: translate(3px, 0); }
          100% { transform: translate(0); }
        }
        @keyframes wave {
          0% { background-position: 0 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .hologram::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00ffcc, transparent);
          animation: hologram 2s ease-in-out infinite;
        }
        .glow-overlay::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .glow-overlay:hover::after {
          opacity: 1;
        }
        .wave-bg {
          background: linear-gradient(90deg, #ff0066, #ff6699, #ff0066, #ff6699);
          background-size: 200% auto;
          animation: wave 4s linear infinite;
        }
      `}</style>

      <div className="flex flex-col md:flex-row justify-evenly w-full items-center gap-10">
        {/* Hover Button - Holographic Effect */}
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-sm font-mono text-cyan-400 tracking-widest">HOVER EFFECT</h1>
          <button className="relative h-12 px-8 bg-gradient-to-r from-cyan-900/50 to-teal-900/50 text-cyan-200 font-mono text-sm border border-cyan-500/50 hologram glow-overlay transform transition-all duration-400 hover:shadow-[0_0_25px_rgba(0,255,204,0.7)] hover:-translate-y-1 hover:bg-gradient-to-r hover:from-cyan-800/70 hover:to-teal-800/70">
            <span className="relative z-10">Hologram</span>
            <span className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></span>
          </button>
        </div>

        {/* Focus Button - Neon Pulse Effect */}
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-sm font-mono text-cyan-400 tracking-widest">FOCUS EFFECT</h1>
          <button className="relative h-12 px-8 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 text-purple-200 font-mono text-sm border border-purple-500/50 transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-400/50 focus:scale-105 focus:bg-gradient-to-r focus:from-purple-800/70 focus:to-indigo-800/70">
            <span className="relative z-10">Neon</span>
            <span className="absolute inset-0 bg-purple-500/20 opacity-0 focus:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>

        {/* Active Button - Kinetic Push Effect */}
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-sm font-mono text-cyan-400 tracking-widest">ACTIVE EFFECT</h1>
          <button className="relative h-12 px-8 bg-gradient-to-r from-emerald-900/50 to-green-900/50 text-emerald-200 font-mono text-sm border border-emerald-500/50 transform transition-all duration-150 active:scale-90 active:shadow-inner active:bg-gradient-to-r active:from-emerald-800/70 active:to-green-800/70">
            <span className="relative z-10">Kinetic</span>
            <span className="absolute inset-0 bg-emerald-500/30 opacity-0 active:opacity-100 transition-opacity duration-150"></span>
          </button>
        </div>

        {/* Disabled Button - Glitch Effect */}
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-sm font-mono text-cyan-400 tracking-widest">DISABLED STATE</h1>
          <button
            disabled
            className="relative h-12 px-8 bg-gray-900/50 text-gray-500 font-mono text-sm border border-gray-700/50 cursor-not-allowed opacity-75"
          >
            <span className="relative z-10">Offline</span>
            <span className="absolute inset-0 bg-gray-700/50 animate-flicker"></span>
          </button>
        </div>

        {/* Animated Button - Wave Effect */}
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-sm font-mono text-cyan-400 tracking-widest">ANIMATED</h1>
          <button className="relative h-12 px-8 wave-bg text-rose-200 font-mono text-sm border border-rose-500/50 shadow-lg hover:shadow-rose-400/30 glow-overlay">
            <span className="relative z-10">Wave</span>
            <span className="absolute inset-0 bg-rose-500/20 opacity-0 hover:opacity-100 transition-opacity duration-400"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Button19;