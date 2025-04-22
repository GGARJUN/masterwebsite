"use client";
import React, { useState, useRef } from 'react';
import { ArrowRight, Zap, Eye, Lock, Sparkles } from 'lucide-react';

const Button15 = () => {
  const [states, setStates] = useState({
    hover: false,
    focus: false,
    active: false,
    ripple: { x: 0, y: 0, active: false }
  });
  const buttonsRef = useRef([]);

  const handleRipple = (e, index) => {
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
    
    // Create particle explosion
    createParticles(e.currentTarget, e.clientX, e.clientY);
    
    setTimeout(() => setStates(s => ({...s, ripple: {...s.ripple, active: false}, active: false})), 600);
  };

  const createParticles = (button, x, y) => {
    const particleCount = 12;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'cyber-particle';
      particle.style.left = `${x - button.getBoundingClientRect().left}px`;
      particle.style.top = `${y - button.getBoundingClientRect().top}px`;
      particle.style.backgroundColor = `hsl(${Math.random() * 60 + 180}, 80%, 60%)`;
      button.appendChild(particle);
      
      setTimeout(() => {
        particle.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`;
        particle.style.opacity = '0';
        setTimeout(() => particle.remove(), 1000);
      }, 10);
    }
  };

  return (
    <div className="w-full p-12 bg-gradient-to-br from-gray-100 via-gray-100 to-gray-100 shadow-cyber">
      <style jsx global>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
          20%, 22%, 24%, 55% { opacity: 0.3; }
        }
        @keyframes ripple {
          0% { transform: scale(0); opacity: 0.8; }
          100% { transform: scale(3); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(236, 72, 153, 0); }
        }
        @keyframes glitch {
          0% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
          20% { clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%); }
          40% { clip-path: polygon(0 30%, 100% 30%, 100% 40%, 0 40%); }
          60% { clip-path: polygon(0 50%, 100% 50%, 100% 60%, 0 60%); }
          80% { clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%); }
          100% { clip-path: polygon(0 90%, 100% 90%, 100% 100%, 0 100%); }
        }
        @keyframes particle {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)); opacity: 0; }
        }
        @keyframes hologram {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.3; }
        }
        @keyframes matrix {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
        
        .animate-scanline {
          animation: scanline 1.5s linear infinite;
        }
        .animate-flicker {
          animation: flicker 3s linear infinite;
        }
        .animate-pulse-outline {
          animation: pulse 2s infinite;
        }
        .animate-glitch {
          animation: glitch 0.5s linear infinite;
        }
        .animate-hologram {
          animation: hologram 2s ease-in-out infinite;
        }
        .animate-matrix {
          animation: matrix 10s linear infinite;
        }
        
        .cyber-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 10;
          animation: particle 1s ease-out forwards;
        }
        
        .shadow-cyber {
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.2);
        }
        
        .matrix-bg {
          background-image: 
            linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>

<div className="flex flex-col md:flex-row justify-evenly w-full items-center gap-8">
        {/* Holographic Scan Button */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-xs font-mono text-cyan-300 tracking-widest hover:text-cyan-400 transition-colors">HOVER EFFECT</h2>
          <button
            onMouseEnter={() => setStates({...states, hover: true})}
            onMouseLeave={() => setStates({...states, hover: false})}
            className={`
              relative h-14 px-8 font-mono font-medium text-cyan-300
              transition-all duration-300 ease-out
              border-t-2 border-b-2 ${states.hover ? 'border-cyan-300' : 'border-cyan-800'}
              bg-gray-900/80 hover:bg-gray-900
              group
            `}
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              <span className="group-hover:text-cyan-400 transition-colors">Hover Me</span>
              <ArrowRight className={`w-3 h-3 transition-all ${states.hover ? 'translate-x-3' : ''}`} />
            </div>
            {states.hover && (
              <>
                <div className="absolute inset-0 bg-cyan-400/5 animate-scanline pointer-events-none">
                  <div className="h-[1px] w-full bg-cyan-400/40" />
                </div>
                <div className="absolute inset-0 border-l-2 border-r-2 border-cyan-400/30 pointer-events-none" />
              </>
            )}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none" />
          </button>
        </div>

        {/* Digital Flicker Terminal */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-xs font-mono text-purple-300 tracking-widest hover:text-purple-400 transition-colors">Focus Effect</h2>
          <button
            onFocus={() => setStates({...states, focus: true})}
            onBlur={() => setStates({...states, focus: false})}
            className={`
              relative h-14 px-8 font-mono font-medium text-purple-300
              transition-all duration-200 ease-out
              border ${states.focus ? 'border-purple-300 animate-flicker' : 'border-purple-800'}
              bg-gray-900/80 hover:bg-gray-900
              matrix-bg animate-matrix
            `}
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              <span className={states.focus ? 'text-purple-400' : ''}>FOCUS ME</span>
              <Eye className={`w-3 h-3 transition-all ${states.focus ? 'scale-150' : ''}`} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-purple-400/10 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none" />
          </button>
        </div>

        {/* Quantum Pulse Activator */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-xs font-mono text-emerald-300 tracking-widest hover:text-emerald-400 transition-colors">Active Effect</h2>
          <button
            onMouseDown={(e) => handleRipple(e, 2)}
            className={`
              relative h-14 px-8 font-mono font-medium text-emerald-300
              overflow-hidden transition-transform duration-100
              border ${states.active ? 'border-emerald-300 scale-95' : 'border-emerald-800'}
              bg-gray-900/80 hover:bg-gray-900
            `}
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              <span className={states.active ? 'text-emerald-400' : ''}>Press Me</span>
              <Zap className={`w-3 h-3 transition-transform ${states.active ? 'scale-150 rotate-45' : ''}`} />
            </div>
            {states.ripple.active && (
              <span 
                className="absolute rounded-full bg-emerald-400/30 animate-ripple pointer-events-none"
                style={{
                  left: states.ripple.x,
                  top: states.ripple.y,
                  width: '15px',
                  height: '15px',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            )}
            <div className="absolute inset-0 bg-emerald-400/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </button>
        </div>

        {/* System Corrupt Error */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-xs font-mono text-gray-500 tracking-widest">Disabled State</h2>
          <button
            disabled
            className={`
              h-14 px-8 font-mono font-medium text-gray-500
              relative overflow-hidden border border-gray-700
              bg-gray-900/80 cursor-not-allowed
              
            `}
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              <span>Disabled</span>
              <Lock className="w-3 h-3" />
            </div>
            <div className="absolute inset-0 bg-red-400/5 pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none" />
          </button>
        </div>

        {/* Neon Core Reactor */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-xs font-mono text-pink-300 tracking-widest hover:text-pink-400 transition-colors">Animated</h2>
          <button
            className={`
              relative h-14 px-8 font-mono font-medium text-pink-300
              border border-pink-300 bg-gray-900/80
              hover:bg-gray-900 hover:text-pink-400
            
              transition-all duration-300
            `}
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              <span>Animated</span>
              <Sparkles className="w-3 h-3" />
            </div>
            <div className="absolute inset-0 bg-pink-400/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-400/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Button15;