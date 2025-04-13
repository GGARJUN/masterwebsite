import React from 'react';

const Button7 = () => {
    return (
        <div className="w-full p-8 bg-gray-100 rounded-2xl shadow-lg">
            <div className="flex flex-col md:flex-row justify-evenly w-full items-center gap-8">
                {/* Hover Button */}
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-lg font-semibold text-gray-800">Hover Effect</h1>
                    <button className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 text-white h-12 px-8 rounded-xl font-medium shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-blue-600 hover:to-cyan-500 group">
                        <span className="relative z-10">Hover Me</span>
                        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                    </button>
                </div>

                {/* Focus Button */}
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-lg font-semibold text-gray-800">Focus Effect</h1>
                    <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white h-12 px-8 rounded-xl font-medium shadow-md transform transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:scale-105">
                        Focus Me
                    </button>
                </div>

                {/* Active Button */}
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-lg font-semibold text-gray-800">Active Effect</h1>
                    <button className="bg-gradient-to-r from-green-500 to-lime-500 text-white h-12 px-8 rounded-xl font-medium shadow-md active:scale-95 active:shadow-sm transition-transform duration-150">
                        Press Me
                    </button>
                </div>

                {/* Disabled Button */}
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-lg font-semibold text-gray-800">Disabled State</h1>
                    <button
                        disabled
                        className="bg-gray-300 text-gray-500 h-12 px-8 rounded-xl font-medium cursor-not-allowed opacity-70"
                    >
                        Disabled
                    </button>
                </div>

                {/* Animated Button */}
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-lg font-semibold text-gray-800">Animated</h1>
                    <button className="relative overflow-hidden bg-gradient-to-r from-pink-500 to-red-500 text-white h-12 px-8 rounded-xl font-medium shadow-md hover:shadow-pink-300/30 animate-bounce hover:animate-none">
                        <span className="relative z-10">Animated</span>
                        <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Button7;