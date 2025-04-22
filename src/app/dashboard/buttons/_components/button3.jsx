"use client";
import React, { useState, useEffect } from 'react';

const Button3 = () => {
  const [buttonStates, setButtonStates] = useState({
    hover: false,
    focus: false,
    active: false,
    animated: false,
    mounted: false // Add mounted state
  });

  useEffect(() => {
    setButtonStates(prev => ({ ...prev, mounted: true }));
  }, []);

  const handleStateChange = (state, value) => {
    setButtonStates(prev => ({ ...prev, [state]: value }));
  };

  return (
    <div className="w-full p-12  rounded-3xl shadow-xl">
      <div className="flex flex-col md:flex-row justify-evenly w-full items-center gap-8">
        
        {/* Quantum Hover Button */}
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-xl font-semibold text-gray-800">Hover Effect</h1>
          <button
            onMouseEnter={() => handleStateChange('hover', true)}
            onMouseLeave={() => handleStateChange('hover', false)}
            className="relative h-12 px-8 rounded-xl font-bold text-white overflow-hidden transition-all duration-500 ease-quint cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-3">
              <span className={`transition-all duration-500 ${buttonStates.hover ? 'rotate-[360deg]' : 'rotate-0'}`}>
                <QuantumIcon />
              </span>
              Hover 
            </span>
            {buttonStates.mounted && (
              <>
                <span 
                  className={`absolute inset-0 bg-[conic-gradient(from_var(--angle),transparent_20%,rgba(255,255,255,0.3)_50%,transparent_80%)] opacity-0 ${buttonStates.hover ? 'opacity-100' : ''}`}
                  style={{ '--angle': buttonStates.hover ? '360deg' : '0deg' }}
                />
                <span className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600" />
              </>
            )}
          </button>
        </div>

        {/* Neural Focus Button */}
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-xl font-semibold text-gray-800">Focus Effect</h1>
          <button
            onFocus={() => handleStateChange('focus', true)}
            onBlur={() => handleStateChange('focus', false)}
            className={`relative h-12 px-8 rounded-xl font-bold text-white transition-all duration-300 cursor-pointer${buttonStates.focus ? 'scale-[1.03]' : ''}`}
          >
            <span className="relative z-10">Focus Me</span>
            <span className={`absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl ${buttonStates.focus ? 'ring-4 ring-cyan-300/50' : ''}`} />
            {buttonStates.mounted && (
              <span className={`absolute inset-0 opacity-0 ${buttonStates.focus ? 'opacity-100' : ''}`}>
                <NeuralNetwork active={buttonStates.focus} mounted={buttonStates.mounted} />
              </span>
            )}
          </button>
        </div>

        {/* Tactile Active Button */}
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-xl font-semibold text-gray-800">Active Effect</h1>
          <button
            onMouseDown={() => handleStateChange('active', true)}
            onMouseUp={() => handleStateChange('active', false)}
            onMouseLeave={() => handleStateChange('active', false)}
            className={`relative h-12 px-8 rounded-xl font-bold text-white transition-transform duration-150 cursor-pointer${buttonStates.active ? 'scale-[0.97]' : ''}`}
          >
            <span className="relative z-10 flex items-center gap-3">
              {buttonStates.active ? 'Engaged' : 'Activate'}
            </span>
            <span className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-500 rounded-xl" />
            <span className={`absolute bottom-0 left-0 h-1 bg-white/50 transition-all duration-300 ease-out ${buttonStates.active ? 'w-full' : 'w-0'}`} />
          </button>
        </div>

        {/* Disabled State */}
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-xl font-semibold text-gray-800">Disabled State
          </h1>
          <button
            disabled
            className="relative h-12 px-8 rounded-xl font-bold text-gray-400 cursor-not-allowed"
          >
            <span className="relative z-10">Disabled</span>
            <span className="absolute inset-0 bg-gray-200 rounded-xl" />
            <span className="absolute inset-0 bg-white/30 rounded-xl" />
          </button>
        </div>

        {/* Animated Button */}
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-xl font-semibold text-gray-800">Animated</h1>
          <button
            onMouseEnter={() => handleStateChange('animated', true)}
            onMouseLeave={() => handleStateChange('animated', true)}
            className="relative h-12 px-8 rounded-xl font-bold text-white overflow-hidden group cursor-pointer"
          >
            <span className="relative z-10">Animated</span>
            <span className="absolute inset-0 bg-gradient-to-br from-rose-600 to-pink-600 rounded-xl" />
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.2)_70%,transparent_100%)] opacity-100 transition-opacity duration-500" />
            {buttonStates.mounted && <PulseWave active={buttonStates.animated} />}
          </button>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        .ease-quint {
          transition-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
        }
        @property --angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }
        @keyframes rotate {
          to { --angle: 360deg; }
        }
      `}</style>
    </div>
  );
};

// Sub-components with alternative designs
const QuantumIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 2a10 10 0 1 0 10 10" 
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-indigo-500" />
      <path d="M12 2a10 10 0 0 1 10 10" 
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-purple-400" />
      <circle cx="12" cy="12" r="3" className="fill-white" />
    </svg>
  );
  
  const NeuralNetwork = ({ active, mounted }) => {
    // Hexagonal grid pattern instead of random lines
    const nodes = [];
    const connections = [];
    
    // Create hexagonal grid positions
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        const offset = y % 2 === 0 ? 10 : 20;
        nodes.push({
          x: offset + x * 20,
          y: 10 + y * 18
        });
      }
    }
  
    // Connect nodes in hexagonal pattern
    nodes.forEach((node, i) => {
      if (i % 5 !== 4) connections.push({ ...node, x2: nodes[i+1].x, y2: nodes[i+1].y });
      if (i < nodes.length - 5) connections.push({ ...node, x2: nodes[i+5].x, y2: nodes[i+5].y });
      if (i % 5 !== 4 && i < nodes.length - 6) {
        connections.push({ ...node, x2: nodes[i+6].x, y2: nodes[i+6].y });
      }
    });
  
    return (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {mounted && connections.map((conn, i) => (
          <line
            key={`conn-${i}`}
            x1={conn.x}
            y1={conn.y}
            x2={conn.x2}
            y2={conn.y2}
            stroke="rgba(255,255,255,0.4)"
            strokeWidth={active ? "0.8" : "0.4"}
            strokeDasharray={active ? "0" : "2 2"}
            style={{ 
              transition: `stroke-width 0.3s ease ${i * 0.05}s, stroke-dasharray 0.5s ease ${i * 0.05}s`
            }}
          />
        ))}
        {mounted && nodes.map((node, i) => (
          <circle
            key={`node-${i}`}
            cx={node.x}
            cy={node.y}
            r={active ? "1.5" : "0.8"}
            fill="rgba(255,255,255,0.8)"
            style={{
              transition: `r 0.3s ease ${i * 0.05}s`
            }}
          />
        ))}
      </svg>
    );
  };
  
  const PulseWave = ({ active }) => (
    <>
      <span className={`absolute inset-0 rounded-xl overflow-hidden ${active ? 'animate-pulse-wave' : ''}`}>
        <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12" 
          style={{ animation: active ? 'shimmer 2s linear infinite' : 'none' }} />
      </span>
      <style jsx>{`
        @keyframes pulse-wave {
          0% { opacity: 0.8; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.1); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(100%) skewX(-12deg); }
        }
      `}</style>
    </>
);

export default Button3;