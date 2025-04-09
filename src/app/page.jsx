"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation Items
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Components", path: "/" },
    { name: "Pricing", path: "/" },
    { name: "Docs", path: "/" },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Navigation Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 shadow-lg py-2 backdrop-blur-md"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-400 flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-lg">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-700 to-blue-600 bg-clip-text text-transparent hidden sm:block transition-all duration-300 group-hover:tracking-wider">
              Master Site
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="relative text-sm font-medium text-gray-700 transition-all duration-300 hover:text-indigo-600 group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Navigation */}
          <div
            className={`absolute top-full left-0 right-0 bg-white shadow-xl md:hidden transition-all duration-300 overflow-hidden ${
              isMobileMenuOpen ? "max-h-96 py-4" : "max-h-0 py-0"
            }`}
          >
            <div className="flex flex-col items-center gap-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-24 lg:px-8 min-h-screen flex items-center overflow-hidden">
        {/* Enhanced Background Blurs */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-500 via-blue-400 to-cyan-300 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] transition-all duration-1000"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(50% 0%, 75% 25%, 100% 50%, 75% 75%, 50% 100%, 25% 75%, 0% 50%, 25% 25%)",
            }}
            className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[40rem] -translate-x-1/2 bg-gradient-to-bl from-purple-500 via-pink-400 to-rose-300 opacity-20 sm:left-[calc(50%-36rem)] sm:w-[80rem] transition-all duration-1000"
          />
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-3xl py-20 text-center relative z-10">
          {/* Announcement Badge */}
          <div className="hidden sm:mb-10 sm:flex sm:justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full blur opacity-25 group-hover:opacity-75 transition-all duration-300"></div>
              <div className="relative rounded-full px-4 py-2 text-sm font-medium text-gray-700 bg-white/95 shadow-md ring-1 ring-gray-900/10 group-hover:ring-indigo-500/50 transition-all duration-300">
                Announcing our next round of funding.{' '}
                <Link href="/" className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Read more <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight  sm:text-7xl bg-gradient-to-r from-indigo-900 via-gray-900 to-blue-900 bg-clip-text text-transparent">
            UI Components
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Elevate your projects with our premium collection of modern, responsive UI components designed for seamless integration and stunning performance.
          </p>

          {/* CTA Button */}
          <div className="mt-12 flex items-center justify-center gap-x-6">
            <Link
              href="/dashboard"
              className="relative group inline-flex items-center px-6 py-3 text-sm font-semibold text-white rounded-full overflow-hidden shadow-lg transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 group-hover:scale-110 transition-transform duration-300"></span>
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}