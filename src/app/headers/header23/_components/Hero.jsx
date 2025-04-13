"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  // Parallax effect for background
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className=" relative isolate px-6 pt-20 lg:px-8 min-h-screen flex items-center overflow-hidden bg-black">
      {/* Enhanced Background Blurs */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-purple-400 via-indigo-500 to-blue-400 opacity-25 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] transition-all duration-1000"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        style={{ transform: `translateY(-${scrollY * 0.1}px)` }}
      >
        <div
          style={{
            clipPath:
              "polygon(50% 0%, 75% 25%, 100% 50%, 75% 75%, 50% 100%, 25% 75%, 0% 50%, 25% 25%)",
          }}
          className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[40rem] -translate-x-1/2 bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-400 opacity-20 sm:left-[calc(50%-36rem)] sm:w-[80rem] transition-all duration-1000"
        />
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-3xl py-20 text-center relative z-10 ">
        {/* Announcement Badge */}
        <div className="hidden sm:mb-12 sm:flex sm:justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
            <div className="relative px-4 py-2 text-sm font-medium text-gray-700 bg-white/90 shadow-lg ring-1 ring-gray-900/10 rounded-full transition-all duration-300 group-hover:ring-purple-500/50 group-hover:scale-105">
              Announcing our next round of funding.{" "}
              <Link
                href="/"
                className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
              >
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 via-gray-900 to-purple-900 animate-gradient-x">
          Data to Enrich Your Online Business
        </h1>
        <p className="mt-6 text-lg leading-9 text-gray-600 max-w-2xl mx-auto transition-all duration-500 hover:text-gray-700">
          Unlock the power of advanced analytics and insights to elevate your digital presence. Transform data into actionable strategies with our cutting-edge solutions.
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="relative group inline-flex items-center px-6 py-3 text-sm font-semibold text-white rounded-full overflow-hidden shadow-xl transition-all duration-500"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500 group-hover:scale-110 transition-transform duration-500"></span>
            <span className="relative z-10 flex items-center gap-2">
              Get Started
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
          </Link>
          <Link
            href="/"
            className="relative group inline-flex items-center px-6 py-3 text-sm font-semibold text-gray-900 rounded-full overflow-hidden transition-all duration-500"
          >
            <span className="absolute inset-0 bg-white/90 group-hover:bg-gradient-to-r group-hover:from-indigo-50 group-hover:to-purple-50 transition-all duration-500"></span>
            <span className="relative z-10 flex items-center gap-2 group-hover:text-indigo-700">
              Learn More
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
          </Link>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-indigo-400 rounded-full animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-float delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-float delay-2000"></div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 8s ease infinite;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px);
            opacity: 0.8;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Hero;