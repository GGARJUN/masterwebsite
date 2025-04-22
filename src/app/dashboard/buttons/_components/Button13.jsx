"use client";
import React, { useState } from 'react';
import { ArrowRight, Zap, Eye, Lock, Sparkles } from 'lucide-react';

const Button13 = () => {
  const [states, setStates] = useState({
    hover: false,
    focus: false,
    active: false,
    ripple: { x: 0, y: 0, active: false }
  });

  const handleRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setStates({
      ...states,
      ripple: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      },
      active: true
    });
    setTimeout(() => setStates(s => ({ ...s, ripple: { ...s.ripple, active: false }, active: false })), 600);
  };

  return (
    <div className="w-full p-12  shadow-2xl">
      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes circuit {
          0% { background-position: 0 0; }
          100% { background-position: 100px 100px; }
        }
        @keyframes ripple {
          0% { transform: scale(0); opacity: 0.6; }
          100% { transform: scale(3.5); opacity: 0; }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes matrix {
          0% { transform: translateY(0); }
          100% { transform: translateY(20px); opacity: 0; }
        }
        .animate-scan::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00ffcc, transparent);
          animation: scan 2s linear infinite;
        }
        .animate-circuit {
          background: linear-gradient(45deg, rgba(0, 255, 204, 0.1) 25%, transparent 25%, transparent 50%, rgba(0, 255, 204, 0.1) 50%, rgba(0, 255, 204, 0.1) 75%, transparent 75%, transparent);
          background-size: 100px 100px;
          animation: circuit 10s linear infinite;
        }
        .animate-flicker { animation: flicker 3s ease-in-out infinite; }
        .animate-matrix::after {
          content: '101010';
          position: absolute;
          font-size: 10px;
          color: #00ffcc;
          opacity: 0.3;
          animation: matrix 2s linear infinite;
        }
      `}</style>

<div className="flex flex-col md:flex-row justify-evenly w-full items-center gap-8">
        {/* Hover Button - Scanline Effect */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-xs font-mono text-cyan-400 tracking-widest">HOVER EFFECT</h2>
          <button
            onMouseEnter={() => setStates({ ...states, hover: true })}
            onMouseLeave={() => setStates({ ...states, hover: false })}
            className={`
              relative h-14 px-8 font-mono text-cyan-300 text-sm 
              transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
              outline-none
              ${states.hover ? 'shadow-[0_0_25px_#00ffcc]' : 'shadow-[0_0_10px_#00ffcc]'}
              animate-scan
            `}
            style={{
              background: 'rgba(0, 20, 30, 0.9)',
              border: states.hover ? '1px solid #00ffcc' : '1px solid #006666',
            }}
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              <span>Hover Me</span>
              <ArrowRight className={`w-5 h-5 transition-transform ${states.hover ? 'translate-x-3 rotate-12' : ''}`} />
            </div>
            <div className={`
              absolute inset-0 bg-gradient-to-b from-[#00ffcc]/20 to-transparent
              transition-opacity duration-400
              ${states.hover ? 'opacity-100' : 'opacity-0'}
            `}/>
          </button>
        </div>

        {/* Focus Button - Circuit Pattern Effect */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-xs font-mono text-cyan-400 tracking-widest">FOCUS EFFECT</h2>
          <button
            onFocus={() => setStates({ ...states, focus: true })}
            onBlur={() => setStates({ ...states, focus: false })}
            className={`
              relative h-14 px-8 font-mono text-purple-300 text-sm 
              transition-all duration-300 ease-out
              outline-none animate-circuit
              ${states.focus ? 'scale-[1.06]' : ''}
            `}
            style={{
              background: 'rgba(10, 10, 30, 0.9)',
              border: '1px solid #7c3aed',
              boxShadow: states.focus ? '0 0 30px rgba(124, 58, 237, 0.6)' : '0 0 15px rgba(124, 58, 237, 0.3)',
            }}
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              <span>Focus Me</span>
              <Eye className={`w-5 h-5 transition-transform ${states.focus ? 'scale-125' : ''}`} />
            </div>
            <div className={`
              absolute inset-0 bg-[#7c3aed]/15
              opacity-0 transition-opacity duration-300
              ${states.focus ? 'opacity-100' : ''}
            `}/>
          </button>
        </div>

        {/* Active Button - Ripple Pulse Effect */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-xs font-mono text-cyan-400 tracking-widest">ACTIVE EFFECT</h2>
          <button
            onMouseDown={handleRipple}
            className={`
              relative h-14 px-8 font-mono text-emerald-300 text-sm 
              overflow-hidden transition-transform duration-150
              outline-none
              ${states.active ? 'scale-[0.92]' : ''}
            `}
            style={{
              background: 'rgba(0, 20, 20, 0.9)',
              border: '1px solid #10b981',
              boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)',
            }}
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              <span>Press Me</span>
              <Zap className={`w-5 h-5 transition-transform ${states.active ? 'rotate-45' : ''}`} />
            </div>
            {states.ripple.active && (
              <span
                className="absolute rounded-full bg-[#10b981]/60 animate-ripple"
                style={{
                  left: states.ripple.x,
                  top: states.ripple.y,
                  width: '24px',
                  height: '24px',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            )}
            <div className={`
              absolute inset-0 bg-[#10b981]/25
              opacity-0 transition-opacity duration-150
              ${states.active ? 'opacity-100' : ''}
            `}/>
          </button>
        </div>

        {/* Disabled Button - Flicker Effect */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-xs font-mono text-cyan-400 tracking-widest">DISABLED STATE</h2>
          <button
            disabled
            className={`
              h-14 px-8 font-mono text-gray-500 text-sm 
              bg-gray-950/80 cursor-not-allowed
              relative overflow-hidden border-1 border-gray-800
              animate-flicker
            `}
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              <span>Disabled</span>
              <Lock className="w-5 h-5 animate-pulse" />
            </div>
            <div className="absolute inset-0 bg-gray-900/70 animate-matrix" />
          </button>
        </div>

        {/* Animated Button - Matrix Rain Effect */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-xs font-mono text-cyan-400 tracking-widest">ANIMATED</h2>
          <button
            className={`
              relative h-14 px-8 font-mono text-rose-300 text-sm 
              shadow-xl overflow-hidden border-1 border-[#f43f5e]
            `}
            style={{
              background: 'rgba(20, 0, 20, 0.9)',
            }}
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              <span>Animated</span>
              <Sparkles className="w-5 h-5 animate-float" />
            </div>
            <div className={`
              absolute inset-0 bg-[#f43f5e]/15
              opacity-0 hover:opacity-100
              transition-opacity duration-600
            `}/>
            <div className="absolute inset-0 animate-matrix" style={{ fontFamily: 'monospace', fontSize: '10px', color: '#f43f5e', opacity: 0.2 }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Button13;