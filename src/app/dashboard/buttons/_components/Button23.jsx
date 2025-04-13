import React from 'react';
import { Sparkles, Eye, Zap, Lock, Rocket } from 'lucide-react';

const Button23 = () => {
  return (
    <div className="w-full p-10 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-lg">
      {/* Inline Keyframes */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }
        @keyframes wave {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes shine {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        .animate-wave {
          animation: wave 1.5s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
        .animate-shine {
          animation: shine 3s linear infinite;
          background-size: 200% auto;
        }
      `}</style>

      <div className="flex flex-col md:flex-row flex-wrap justify-center w-full items-center gap-14">
        {/* Glassmorphic Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-medium text-gray-700">Hover Effect</h1>
          <button
            className="group relative overflow-hidden rounded-xl px-6 py-3 h-12 text-sm font-medium bg-black/90 backdrop-blur-md border border-white/30 text-white shadow-lg hover:bg-white/30 transition-all duration-300"
          >
            <div className="relative z-10 flex items-center justify-center gap-2 group-hover:text-black">
              <span>Hover Me</span>
              <Sparkles className="h-4 w-4 transition-all group-hover:rotate-12" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-wave" />
          </button>
        </div>

        {/* Gradient Shine Button */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-medium text-gray-700">Gradient Shine</h1>
          <button
            className="group relative overflow-hidden rounded-lg px-6 py-3 h-12 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-md"
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>Gradient Shine</span>
              <Eye className="h-4 w-4 transition-all group-hover:scale-110" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/80 to-white/30 opacity-0 group-hover:opacity-100 group-hover:animate-shine" />
          </button>
        </div>

        {/* 3D Press Effect */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-medium text-gray-700">3D Press</h1>
          <button
            className="group relative rounded-md px-6 py-3 h-12 text-sm font-medium bg-emerald-500 text-white shadow-lg hover:shadow-emerald-500/30 active:translate-y-1 active:shadow-none transition-all duration-200"
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>Press Me</span>
              <Zap className="h-4 w-4 transition-transform group-active:scale-125" />
            </div>
            <div className="absolute inset-0 rounded-md border-t-2 border-white/30 pointer-events-none" />
          </button>
        </div>

        {/* Minimal Disabled */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-medium text-gray-700">Minimal Disabled</h1>
          <button
            disabled
            className="relative rounded px-6 py-3 h-12 text-sm font-medium bg-gray-200 text-gray-500 cursor-not-allowed shadow-inner"
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>Disabled</span>
              <Lock className="h-4 w-4" />
            </div>
          </button>
        </div>

        {/* Floating Action */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-medium text-gray-700">Floating Action</h1>
          <button
            className="group relative rounded-full px-6 py-3 h-12 text-sm font-medium bg-purple-600 text-white shadow-xl hover:shadow-purple-600/40 transition-all duration-300 animate-float"
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>Floating</span>
              <Rocket className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-white/20 pointer-events-none" />
          </button>
        </div>



      </div>
    </div>
  );
};

export default Button23;