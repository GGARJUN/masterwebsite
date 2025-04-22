"use client";
import React, { useState } from 'react';
import { ArrowRight, Zap, Eye, Lock, Sparkles } from 'lucide-react';

const Button21 = () => {
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
    setTimeout(() => setStates(s => ({...s, ripple: {...s.ripple, active: false}, active: false})), 500);
  };

  return (
    <div className="w-full p-12  shadow-inner">
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes ripple {
          0% { transform: scale(0); opacity: 0.5; }
          100% { transform: scale(3); opacity: 0; }
        }
        @keyframes neon {
          0%, 100% { filter: brightness(100%); }
          50% { filter: brightness(150%); }
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        .animate-float { animation: float 2.5s ease-in-out infinite; }
        .animate-pulse { animation: pulse 1.5s ease-in-out infinite; }
        .animate-neon { animation: neon 1.5s ease-in-out infinite; }
        .animate-glitch { animation: glitch 0.3s linear infinite; }
      `}</style>

<div className="flex flex-col md:flex-row justify-evenly w-full items-center gap-8">
        {/* Hover Button - Neon Border Effect */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-sm font-medium text-gray-400 tracking-wider">HOVER EFFECT</h2>
          <button
            onMouseEnter={() => setStates({...states, hover: true})}
            onMouseLeave={() => setStates({...states, hover: false})}
            className={`
              relative h-12 px-6 font-semibold text-white 
              transition-all duration-300 ease-out
              outline-none
              ${states.hover ? 'shadow-[0_0_15px_#22d3ee]' : 'shadow-[0_0_5px_#22d3ee]'}
            `}
            style={{
              background: '#1e293b',
              border: states.hover ? '2px solid #22d3ee' : '2px solid #0ea5e9',
            }}
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>Hover Me</span>
              <ArrowRight className={`w-4 h-4 transition-transform ${states.hover ? 'translate-x-2' : ''}`} />
            </div>
            <div className={`
              absolute inset-0 bg-[#22d3ee]/10 
              transition-opacity duration-300
              ${states.hover ? 'opacity-100' : 'opacity-0'}
            `}/>
          </button>
        </div>

        {/* Focus Button - Expand Effect */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-sm font-medium text-gray-400 tracking-wider">FOCUS EFFECT</h2>
          <button
            onFocus={() => setStates({...states, focus: true})}
            onBlur={() => setStates({...states, focus: false})}
            className={`
              relative h-12 px-6 font-semibold text-white 
              transition-all duration-200 ease-out
              outline-none
              ${states.focus ? 'scale-105' : ''}
            `}
            style={{
              background: '#2d3748',
              border: '2px solid #8b5cf6',
              boxShadow: states.focus ? '0 0 20px rgba(139, 92, 246, 0.5)' : 'none'
            }}
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>Focus Me</span>
              <Eye className={`w-4 h-4 transition-transform ${states.focus ? 'rotate-12' : ''}`} />
            </div>
            <div className={`
              absolute inset-0 bg-[#8b5cf6]/20 
              opacity-0 transition-opacity duration-300
              ${states.focus ? 'opacity-100' : ''}
            `}/>
          </button>
        </div>

        {/* Active Button - Ripple Effect */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-sm font-medium text-gray-400 tracking-wider">ACTIVE EFFECT</h2>
          <button
            onMouseDown={handleRipple}
            className={`
              relative h-12 px-6 font-semibold text-white 
              overflow-hidden transition-transform duration-100
              outline-none
              ${states.active ? 'scale-90' : ''}
            `}
            style={{
              background: '#1e293b',
              border: '2px solid #10b981',
              boxShadow: '0 0 10px rgba(16, 185, 129, 0.3)'
            }}
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>Press Me</span>
              <Zap className={`w-4 h-4 transition-transform ${states.active ? 'scale-110' : ''}`} />
            </div>
            {states.ripple.active && (
              <span 
                className="absolute rounded-full bg-[#10b981]/50 animate-ripple"
                style={{
                  left: states.ripple.x,
                  top: states.ripple.y,
                  width: '20px',
                  height: '20px',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            )}
            <div className={`
              absolute inset-0 bg-[#10b981]/30 
              opacity-0 transition-opacity
              ${states.active ? 'opacity-100' : ''}
            `}/>
          </button>
        </div>

        {/* Disabled Button - Glitch Effect */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-sm font-medium text-gray-400 tracking-wider">DISABLED STATE</h2>
          <button
            disabled
            className={`
              h-12 px-6 font-semibold text-gray-600 
              bg-gray-900 cursor-not-allowed
              relative overflow-hidden border-2 border-gray-700
              animate-glitch
            `}
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>Disabled</span>
              <Lock className="w-4 h-4 animate-pulse" />
            </div>
            <div className="absolute inset-0 bg-gray-800/50"/>
          </button>
        </div>

        {/* Animated Button - Neon Pulse Effect */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-sm font-medium text-gray-400 tracking-wider">ANIMATED</h2>
          <button
            className={`
              relative h-12 px-6 font-semibold text-white 
              shadow-lg overflow-hidden border-2 border-[#f43f5e]
              animate-neon
            `}
            style={{
              background: '#1e293b',
            }}
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>Animated</span>
              <Sparkles className="w-4 h-4 animate-float" />
            </div>
            <div className={`
              absolute inset-0 bg-[#f43f5e]/20 
              opacity-0 hover:opacity-100 
              transition-opacity duration-500
            `}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Button21;