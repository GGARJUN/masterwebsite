"use client";
import React, { useState } from 'react';
import { ArrowRight, Zap, Eye, Lock, Sparkles } from 'lucide-react';

const Button24 = () => {
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
    <div className="w-full p-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-inner">
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes ripple {
          0% { transform: scale(0); opacity: 0.4; }
          100% { transform: scale(4); opacity: 0; }
        }
        @keyframes shine {
          to { background-position: 200% center; }
        }
        @keyframes border-dance {
          0% { background-position: 0 0, 100% 100%, 0 100%, 100% 0; }
          100% { background-position: 100% 0, 0 100%, 0 0, 100% 100%; }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse { animation: pulse 2s ease-in-out infinite; }
        .animate-shine { 
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          background-size: 200% auto;
          animation: shine 2s linear infinite;
        }
      `}</style>

<div className="flex flex-col md:flex-row justify-evenly w-full items-center gap-8">
        {/* Primary Button with Hover Elevation */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-sm font-medium text-gray-600 tracking-wider">HOVER EFFECT</h2>
          <button
            onMouseEnter={() => setStates({...states, hover: true})}
            onMouseLeave={() => setStates({...states, hover: false})}
            className={`
              relative h-12 px-6 rounded-xl font-medium text-white 
              transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
              ${states.hover ? 'shadow-xl -translate-y-1' : 'shadow-lg'}
            `}
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              boxShadow: states.hover 
                ? '0 15px 30px -5px rgba(99, 102, 241, 0.4)' 
                : '0 8px 20px -5px rgba(99, 102, 241, 0.3)'
            }}
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>Elevate</span>
              <ArrowRight className={`w-4 h-4 transition-transform ${states.hover ? 'translate-x-1' : ''}`} />
            </div>
            <div className={`
              absolute inset-0 rounded-xl bg-white/10 opacity-0 
              transition-opacity duration-300
              ${states.hover ? 'opacity-100' : ''}
            `}/>
          </button>
        </div>

        {/* Focus Button with Glow */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-sm font-medium text-gray-600 tracking-wider">FOCUS EFFECT</h2>
          <button
            onFocus={() => setStates({...states, focus: true})}
            onBlur={() => setStates({...states, focus: false})}
            className={`
              relative h-12 px-6 rounded-xl font-medium text-white 
              transition-all duration-200 ease-out
              ${states.focus ? 'ring-4 ring-blue-300/50 scale-[1.02]' : ''}
            `}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
              boxShadow: '0 8px 20px -5px rgba(59, 130, 246, 0.3)'
            }}
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>Illuminate</span>
              <Eye className={`w-4 h-4 transition-transform ${states.focus ? 'scale-110' : ''}`} />
            </div>
            <div className={`
              absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-white/0 
              opacity-0 transition-opacity duration-300
              ${states.focus ? 'opacity-100' : ''}
            `}/>
          </button>
        </div>

        {/* Active Button with Ripple */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-sm font-medium text-gray-600 tracking-wider">ACTIVE EFFECT</h2>
          <button
            onMouseDown={handleRipple}
            className={`
              relative h-12 px-6 rounded-xl font-medium text-white 
              overflow-hidden transition-transform duration-100
              ${states.active ? 'scale-95' : ''}
            `}
            style={{
              background: 'linear-gradient(135deg, #10b981, #34d399)',
              boxShadow: '0 8px 20px -5px rgba(16, 185, 129, 0.3)'
            }}
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>Ripple</span>
              <Zap className={`w-4 h-4 transition-transform ${states.active ? 'scale-125' : ''}`} />
            </div>
            {states.ripple.active && (
              <span 
                className="absolute rounded-full bg-white/40 animate-ripple"
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
              absolute inset-0 bg-black/10 opacity-0 transition-opacity
              ${states.active ? 'opacity-100' : ''}
            `}/>
          </button>
        </div>

        {/* Disabled Button */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-sm font-medium text-gray-600 tracking-wider">DISABLED STATE</h2>
          <button
            disabled
            className={`
              h-12 px-6 rounded-xl font-medium shadow-inner 
              bg-gray-200 text-gray-500 cursor-not-allowed
              relative overflow-hidden
            `}
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>Disabled</span>
              <Lock className="w-4 h-4 animate-pulse" />
            </div>
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]"/>
          </button>
        </div>

        {/* Animated Button */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-sm font-medium text-gray-600 tracking-wider">ANIMATED</h2>
          <button
            className={`
              relative h-12 px-6 rounded-xl font-medium text-white 
              shadow-lg overflow-hidden bg-gradient-to-br from-rose-600 to-pink-600
            `}

          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>Shimmer</span>
              <Sparkles className="w-4 h-4 animate-float" />
            </div>
            <div className="absolute inset-0 animate-shine"/>
            <div className={`
              absolute bottom-0 left-0 right-0 h-1 bg-white/30 
              origin-left scale-x-0 group-hover:scale-x-100 
              transition-transform duration-500 ease-out
            `}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Button24;