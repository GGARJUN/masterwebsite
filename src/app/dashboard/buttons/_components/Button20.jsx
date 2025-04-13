"use client";
import React, { useState, useEffect } from 'react';

const Button20 = () => {
    const [buttonStates, setButtonStates] = useState({
        hover: false,
        focus: false,
        active: false,
        animated: false,
        mounted: false,
    });

    useEffect(() => {
        setButtonStates(prev => ({ ...prev, mounted: true }));
    }, []);

    const handleStateChange = (state, value) => {
        setButtonStates(prev => ({ ...prev, [state]: value }));
    };

    return (
        <div className="w-full p-12 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 items-center justify-center">
                {/* Cosmic Hover Button */}
                <div className="flex flex-col items-center gap-5">
                    <h1 className="text-xl font-semibold text-gray-900 tracking-wide">Hover Effect</h1>
                    <button
                        onMouseEnter={() => handleStateChange('hover', true)}
                        onMouseLeave={() => handleStateChange('hover', false)}
                        className="relative h-12 px-8 rounded-xl font-bold text-gray-100 overflow-hidden transition-all duration-600 ease-quint"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            <span className={`transition-transform duration-600 ${buttonStates.hover ? 'rotate-[360deg]' : 'rotate-0'}`}>
                                <QuantumIcon />
                            </span>
                            Hover
                        </span>
                        {buttonStates.mounted && (
                            <>
                                <span
                                    className={`absolute inset-0 bg-[conic-gradient(from_var(--angle),transparent_10%,rgba(255,255,255,0.4)_40%,transparent_90%)] opacity-0 transition-opacity duration-600 ${buttonStates.hover ? 'opacity-100' : ''}`}
                                    style={{ '--angle': buttonStates.hover ? '360deg' : '0deg' }}
                                />
                                <span className="absolute inset-0 bg-gradient-to-br from-violet-700 via-indigo-600 to-blue-700" />
                                <span className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3)_0%,transparent_70%)] opacity-0 transition-opacity duration-600 ${buttonStates.hover ? 'opacity-100 animate-[sparkle_1.5s_infinite]' : ''}`} />
                            </>
                        )}
                    </button>
                </div>

                {/* Nebula Focus Button */}
                <div className="flex flex-col items-center gap-5">
                    <h1 className="text-xl font-semibold text-gray-900 tracking-wide">Focus Effect</h1>
                    <button
                        onFocus={() => handleStateChange('focus', true)}
                        onBlur={() => handleStateChange('focus', false)}
                        className={`relative h-12 px-8 rounded-xl font-bold text-gray-100 transition-all duration-400 ${buttonStates.focus ? 'scale-[1.04]' : ''}`}
                    >
                        <span className="relative z-10">Focus Me</span>
                        <span className={`absolute inset-0 bg-gradient-to-br from-fuchsia-600 to-purple-600 rounded-xl ${buttonStates.focus ? 'ring-4 ring-fuchsia-300/40' : ''}`} />
                        {buttonStates.mounted && (
                            <span className={`absolute inset-0 opacity-0 ${buttonStates.focus ? 'opacity-100' : ''}`}>
                                <NeuralNetwork active={buttonStates.focus} mounted={buttonStates.mounted} />
                            </span>
                        )}
                    </button>
                </div>

                {/* Pulsar Active Button */}
                <div className="flex flex-col items-center gap-5">
                    <h1 className="text-xl font-semibold text-gray-900 tracking-wide">Active Effect</h1>
                    <button
                        onMouseDown={() => handleStateChange('active', true)}
                        onMouseUp={() => handleStateChange('active', false)}
                        onMouseLeave={() => handleStateChange('active', false)}
                        className={`relative h-12 px-8 rounded-xl font-bold text-gray-100 transition-transform duration-200 ${buttonStates.active ? 'scale-[0.95]' : ''}`}
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            {buttonStates.active ? 'Ignited' : 'Active'}
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-teal-600 rounded-xl" />
                        <span className={`absolute top-0 left-0 h-1 bg-white/40 transition-all duration-400 ease-out ${buttonStates.active ? 'w-full' : 'w-0'}`} />
                    </button>
                </div>

                {/* Disabled Black Hole */}
                <div className="flex flex-col items-center gap-5">
                    <h1 className="text-xl font-semibold text-gray-900 tracking-wide">Disabled</h1>
                    <button
                        disabled
                        className="relative h-12 px-8 rounded-xl font-bold text-gray-500 cursor-not-allowed"
                    >
                        <span className="relative z-10">Disabled</span>
                        <span className="absolute inset-0 bg-gray-800/80 rounded-xl" />
                        <span className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl" />
                    </button>
                </div>

                {/* Aurora Animated Button */}
                <div className="flex flex-col items-center gap-5">
                    <h1 className="text-xl font-semibold text-gray-900 tracking-wide">Animated</h1>
                    <button
                        onMouseEnter={() => handleStateChange('animated', true)}
                        onMouseLeave={() => handleStateChange('animated', true)}
                        className="relative h-12 px-8 rounded-xl font-bold text-gray-100 overflow-hidden group"
                    >
                        <span className="relative z-10">Animated</span>
                        <span className="absolute inset-0 bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 rounded-xl" />
                        <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.25)_60%,transparent_100%)] opacity-100 transition-opacity duration-600" />
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
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
        </div>
    );
};

// Sub-components with cosmic-themed designs
const QuantumIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
            d="M12 2a10 10 0 1 0 10 10"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-violet-400"
        />
        <path
            d="M12 2a10 10 0 0 1 10 10"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-blue-400"
        />
        <circle cx="12" cy="12" r="3" className="fill-gray-100" />
        <circle cx="12" cy="12" r="1" className="fill-violet-300 animate-[ping_2s_infinite]" />
    </svg>
);

const NeuralNetwork = ({ active, mounted }) => {
    const nodes = [];
    const connections = [];

    // Create a star-field-like grid
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            nodes.push({
                x: 10 + j * 15 + (Math.random() * 5 - 2.5),
                y: 10 + i * 15 + (Math.random() * 5 - 2.5),
            });
        }
    }

    // Connect nodes in a constellation-like pattern
    nodes.forEach((node, i) => {
        if (i < nodes.length - 1) {
            connections.push({ ...node, x2: nodes[i + 1].x, y2: nodes[i + 1].y });
        }
        if (i < nodes.length - 6) {
            connections.push({ ...node, x2: nodes[i + 6].x, y2: nodes[i + 6].y });
        }
    });

    return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {mounted &&
                connections.map((conn, i) => (
                    <line
                        key={`conn-${i}`}
                        x1={conn.x}
                        y1={conn.y}
                        x2={conn.x2}
                        y2={conn.y2}
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth={active ? "1" : "0.5"}
                        strokeDasharray={active ? "0" : "3 3"}
                        style={{
                            transition: `stroke-width 0.4s ease ${i * 0.03}s, stroke-dasharray 0.6s ease ${i * 0.03}s`,
                        }}
                    />
                ))}
            {mounted &&
                nodes.map((node, i) => (
                    <circle
                        key={`node-${i}`}
                        cx={node.x}
                        cy={node.y}
                        r={active ? "2" : "1"}
                        fill="rgba(255,255,255,0.9)"
                        style={{
                            transition: `r 0.4s ease ${i * 0.03}s`,
                        }}
                        className={active ? 'animate-[twinkle_1.5s_infinite]' : ''}
                    />
                ))}
        </svg>
    );
};

const PulseWave = ({ active }) => (
    <>
        <span className={`absolute inset-0 rounded-xl overflow-hidden ${active ? 'animate-cosmic-wave' : ''}`}>
            <span
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 transform -skew-x-20"
                style={{ animation: active ? 'cosmic-shimmer 1.8s linear infinite' : 'none' }}
            />
        </span>
        <style jsx>{`
@keyframes sparkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}
@keyframes twinkle {
  0%, 100% { opacity: 0.9; }
  50% { opacity: 0.4; }
}
@keyframes cosmic-wave {
  0% { opacity: 0.7; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.15); }
}
@keyframes cosmic-shimmer {
  0% { transform: translateX(-150%) skewX(-20deg); }
  100% { transform: translateX(150%) skewX(-20deg); }
}
    `}</style>
    </>
);

export default Button20;