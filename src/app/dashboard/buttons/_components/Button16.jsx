"use client";
import React from 'react';
import { Sparkles, Eye, Hand, Lock, Rocket } from 'lucide-react';

const Button16 = () => {
    return (
        <div className="w-full p-10 bg-white rounded-3xl shadow-2xl">
            <div className="flex flex-col md:flex-row justify-center w-full items-center gap-12">
                {/* Hover Button */}
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-lg font-bold text-gray-800 tracking-wider">Hover Effect</h1>
                    <button className="relative overflow-hidden bg-purple-600 text-white h-12 px-8 rounded-2xl font-medium shadow-md group">
                        <span className="relative z-10 flex items-center gap-2">
                            <Sparkles className="w-5 h-5" />
                            Hover Me
                        </span>
                        <span className="absolute inset-0 bg-purple-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                        <span className="absolute inset-0 pointer-events-none">
                            <span className="absolute w-2 h-2 bg-white/50 rounded-full top-2 left-4 animate-particleRise"></span>
                            <span className="absolute w-2 h-2 bg-white/50 rounded-full top-4 left-8 animate-particleRise delay-200"></span>
                        </span>
                    </button>
                </div>

                {/* Focus Button */}
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-lg font-bold text-gray-800 tracking-wider">Focus Effect</h1>
                    <button className="relative bg-emerald-600 text-white h-12 px-8 rounded-2xl font-medium shadow-md focus:outline-none group">
                        <span className="relative z-10 flex items-center gap-2 transition-transform duration-300 group-focus:translate-x-2">
                            <Eye className="w-5 h-5" />
                            Focus
                        </span>
                        <span className="absolute inset-0 bg-emerald-800/20 opacity-0 group-focus:opacity-100 transition-opacity duration-300"></span>
                        <span className="absolute inset-0 border-2 border-transparent group-focus:animate-borderPulse"></span>
                    </button>
                </div>

                {/* Active Button */}
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-lg font-bold text-gray-800 tracking-wider">Active Effect</h1>
                    <button className="relative bg-red-600 text-white h-12 px-8 rounded-2xl font-medium shadow-md focus:border-2">
                        <span className="relative z-10 flex items-center gap-2">
                            <Hand className="w-5 h-5" />
                            Press
                        </span>
                        <span className="absolute inset-0 bg-red-800/30 opacity-0 active:animate-flash"></span>
                    </button>
                </div>

                {/* Disabled Button */}
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-lg font-bold text-gray-800 tracking-wider">Disabled State</h1>
                    <button disabled className="relative bg-gray-300 text-gray-500 h-12 px-8 rounded-2xl font-medium cursor-not-allowed">
                        <span className="relative z-10 flex items-center gap-2">
                            <Lock className="w-5 h-5" />
                            Disabled
                        </span>
                    </button>
                </div>

                {/* Ultra Animated Button */}
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-lg font-bold text-gray-800 tracking-wider">Ultra Animated</h1>
                    <button className="relative bg-orange-600 text-white h-12 px-8 rounded-2xl font-medium shadow-md group">
                        <span className="relative z-10 flex items-center gap-2">
                            <Rocket className="w-5 h-5" />
                            Animated
                        </span>
                        <span className="absolute inset-0 animate-pulseWave bg-orange-800/20"></span>
                        <span className="absolute inset-0 animate-spinFrame border-2 border-orange-300/50 rounded-2xl"></span>
                        <span className="absolute w-3 h-3 bg-white/40 rounded-full top-1 left-1 animate-orbitParticle"></span>
                        <span className="absolute w-3 h-3 bg-white/40 rounded-full bottom-1 right-1 animate-orbitParticle delay-500"></span>
                    </button>
                </div>
            </div>

            {/* Global Styles */}
            <style jsx global>{`
        @keyframes particleRise {
          0% {
            transform: translateY(0);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-40px);
            opacity: 0;
          }
        }
        @keyframes borderPulse {
          0%, 100% {
            border-color: rgba(255, 255, 255, 0.3);
          }
          50% {
            border-color: rgba(255, 255, 255, 0.8);
          }
        }
        @keyframes flash {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        @keyframes pulseWave {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }
        @keyframes spinFrame {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes orbitParticle {
          0% {
            transform: rotate(0deg) translateX(12px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(12px) rotate(-360deg);
          }
        }
        .animate-particleRise {
          animation: particleRise 1.5s infinite;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .animate-borderPulse {
          animation: borderPulse 1s infinite;
        }
        .animate-flash {
          animation: flash 0.3s ease-out;
        }
        .animate-pulseWave {
          animation: pulseWave 2s infinite;
        }
        .animate-spinFrame {
          animation: spinFrame 5s linear infinite;
        }
        .animate-orbitParticle {
          animation: orbitParticle 2s linear infinite;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .group:hover .animate-spinFrame,
        .group:hover .animate-orbitParticle {
          animation-play-state: paused;
        }
      `}</style>
        </div>
    );
};

export default Button16;