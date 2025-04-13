import React from 'react';

const Button8 = () => {
    return (
        <div className="w-full p-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl">
            <div className="flex flex-col md:flex-row justify-center w-full items-center gap-16">
                {/* Hover Button */}
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-lg font-bold text-white tracking-wider">Hover Effect</h1>
                    <button className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white h-12 px-8 rounded-2xl font-medium shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group">
                        <span className="relative z-10">Hover Me</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </button>
                </div>

                {/* Focus Button */}
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-lg font-bold text-white tracking-wider">Focus Effect</h1>
                    <button className="relative bg-gradient-to-r from-teal-500 to-emerald-500 text-white h-12 px-8 rounded-2xl font-medium shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-300 focus:scale-105 transition-all duration-200">
                        <span className="relative z-10">Focus Me</span>
                        <span className="absolute inset-0 border-2 border-transparent focus:border-white rounded-2xl transition-all duration-200"></span>
                    </button>
                </div>

                {/* Active Button */}
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-lg font-bold text-white tracking-wider">Active Effect</h1>
                    <button className="relative bg-gradient-to-r from-pink-500 to-rose-600 text-white h-12 px-8 rounded-2xl font-medium shadow-lg active:scale-95 active:shadow-md transition-transform duration-150">
                        <span className="relative z-10">Press Me</span>
                        <span className="absolute inset-0 bg-black opacity-0 active:opacity-10 transition-opacity duration-150"></span>
                    </button>
                </div>

                {/* Disabled Button */}
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-lg font-bold text-white tracking-wider">Disabled State</h1>
                    <button
                        disabled
                        className="relative bg-gray-700 text-gray-400 h-12 px-8 rounded-2xl font-medium cursor-not-allowed opacity-50"
                    >
                        <span className="relative z-10">Disabled</span>
                    </button>
                </div>

                {/* Animated Button */}
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-lg font-bold text-white tracking-wider">Animated</h1>
                    <button className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-yellow-500 text-white h-12 px-8 rounded-2xl font-medium shadow-lg animate-glow hover:animate-none">
                        <span className="relative z-10">Animated</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
                        <span className="absolute inset-0 border  animate-spin-slow border-white/20 rounded-2xl"></span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Button8;