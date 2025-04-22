import React from 'react';

const Button4 = () => {
    return (
        <div className="w-full p-12  rounded-3xl shadow-2xl">
      <div className="flex flex-col md:flex-row justify-evenly w-full items-center gap-8">
                {/* Hover Button */}
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-lg font-bold text-gray-800 tracking-wider">Hover Effect</h1>
                    <button className="relative cursor-pointer overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 text-white h-12 px-8 rounded-2xl font-medium shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group">
                        <span className="relative z-10">Hover Me</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                        <span className="absolute inset-0 border border-transparent group-hover:border-white/20 rounded-2xl transition-all duration-300"></span>
                    </button>
                </div>

                {/* Focus Button */}
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-lg font-bold text-gray-800 tracking-wider">Focus Effect</h1>
                    <button className="relative cursor-pointer bg-gradient-to-br from-blue-600 to-cyan-500 text-white h-12 px-8 rounded-2xl font-medium shadow-md focus:outline-none focus:ring-4 focus:ring-green-300 focus:scale-105 transition-all duration-200">
                        <span className="relative z-10">Focus Me</span>
                        <span className="absolute inset-0 border-2 border-transparent focus:border-white rounded-2xl transition-all duration-200"></span>
                        <span className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 focus:opacity-10 transition-opacity duration-300"></span>
                    </button>
                </div>

                {/* Active Button */}
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-lg font-bold text-gray-800 tracking-wider">Active Effect</h1>
                    <button className="relative cursor-pointer bg-gradient-to-r from-green-500 to-teal-500 text-white h-12 px-8 rounded-2xl font-medium shadow-md active:scale-95 active:shadow-sm transition-transform duration-150">
                        <span className="relative z-10">Press Me</span>
                        <span className="absolute inset-0 bg-black opacity-0 active:opacity-10 transition-opacity duration-150"></span>
                        <span className="absolute inset-0 border border-transparent active:border-white/20 rounded-2xl transition-all duration-150"></span>
                    </button>
                </div>

                {/* Disabled Button */}
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-lg font-bold text-gray-800 tracking-wider">Disabled State</h1>
                    <button
                        disabled
                        className="relative bg-gray-200 text-gray-500 h-12 px-8 rounded-2xl font-medium cursor-not-allowed"
                    >
                        <span className="relative z-10">Disabled</span>
                        <span className="absolute inset-0 border border-transparent rounded-2xl opacity-50"></span>
                    </button>
                </div>

                {/* Animated Button */}
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-lg font-bold text-gray-800 tracking-wider">Animated</h1>
                    <button className="relative cursor-pointer overflow-hidden bg-gradient-to-br from-rose-600 to-pink-600 text-white h-12 px-8 rounded-2xl font-medium shadow-md animate-glow hover:animate-none">
                        <span className="relative z-10">Animated</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
                        <span className="absolute inset-0 border  animate-spin-slow border-white/20 rounded-2xl"></span>
                        <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 hover:opacity-50 transition-opacity duration-300"></span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Button4;