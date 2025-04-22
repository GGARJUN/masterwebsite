"use client";
import React, { useState } from "react";
import SideBar from "./_components/SideBar";

function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative min-h-screen overflow-hidden ">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Blur */}
        <div
          aria-hidden="true"
          className="absolute -top-20 -left-20 transform-gpu blur-3xl sm:-top-40 sm:-left-40"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative aspect-[1155/678] w-[30rem] rotate-[30deg] bg-gradient-to-tr from-indigo-500/20 via-blue-400/20 to-cyan-300/20 sm:w-[50rem] lg:w-[72.1875rem] animate-[float-slow_20s_ease-in-out_infinite]"
          />
        </div>

        {/* Bottom Blur */}
        <div
          aria-hidden="true"
          className="absolute -bottom-20 -right-20 transform-gpu blur-3xl sm:-bottom-40 sm:-right-40"
        >
          <div
            style={{
              clipPath:
                "polygon(50% 0%, 75% 25%, 100% 50%, 75% 75%, 50% 100%, 25% 75%, 0% 50%, 25% 25%)",
            }}
            className="relative aspect-[1155/678] w-[35rem] bg-gradient-to-bl from-purple-500/20 via-pink-400/20 to-rose-300/20 sm:w-[60rem] lg:w-[80rem] animate-[float_15s_ease-in-out_infinite]"
          />
        </div>
      </div>

      {/* Layout Structure */}
      <div className="relative flex">
        {/* Mobile & Tablet Sidebar Toggle Button */}
        <button
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800/80 backdrop-blur-md rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 w-64  backdrop-blur-lg border-r border-gray-700 transform transition-transform duration-300 ease-in-out z-40 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:flex lg:flex-col lg:fixed lg:inset-y-0`}
        >
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <SideBar />
          </div>
        </div>

        {/* Overlay for mobile and tablet when sidebar is open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64 min-h-screen transition-all duration-300">
          <div className="">{children}</div>
        </div>
      </div>

      {/* Custom Tailwind Animation Styles */}
      <style jsx>{`
        @keyframes float-slow {
          0% {
            transform: translateY(0) rotate(30deg);
          }
          50% {
            transform: translateY(-20px) rotate(32deg);
          }
          100% {
            transform: translateY(0) rotate(30deg);
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-30px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default DashboardLayout;