import React from 'react'

const Button6 = () => {
    return (
        <div className="w-full p-8 bg-gray-50 rounded-xl">
      <div className="flex flex-col md:flex-row justify-evenly w-full items-center gap-8">
                {/* Hover Button */}
                <div className="flex flex-col items-center gap-5">
                    <h1 className="text-lg font-medium text-gray-700">Hover Effect</h1>
                    <button className="cursor-pointer relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-600 text-white h-12 px-8  font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-indigo-600 hover:to-blue-500 group">
                        <span className="relative z-10">Hover Me</span>
                        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                    </button>
                </div>

                {/* Focus Button */}
                <div className="flex flex-col items-center gap-5">
                    <h1 className="text-lg font-medium text-gray-700">Focus Effect</h1>
                    <button className="cursor-pointer bg-gradient-to-br from-blue-600 to-cyan-500 text-white h-12 px-8  font-medium shadow-lg transform transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:scale-105">
                        Focus Me
                    </button>
                </div>

                {/* Active Button */}
                <div className="flex flex-col items-center gap-5">
                    <h1 className="text-lg font-medium text-gray-700">Active Effect</h1>
                    <button className="bg-gradient-to-br from-emerald-600 to-teal-500 text-white cursor-pointer h-12 px-8  font-medium shadow-lg active:scale-95 active:shadow-md transition-transform duration-150">
                        Press Me
                    </button>
                </div>

                {/* Disabled Button */}
                <div className="flex flex-col items-center gap-5">
                    <h1 className="text-lg font-medium text-gray-700">Disabled State</h1>
                    <button
                        disabled
                        className="bg-gray-300 text-gray-500 h-12 px-8  font-medium cursor-not-allowed opacity-75"
                    >
                        Disabled
                    </button>
                </div>

                {/* Animated Button */}
                <div className="flex flex-col items-center gap-5">
                    <h1 className="text-lg font-medium text-gray-700">Animated</h1>
                    <button className="relative overflow-hidden cursor-pointer bg-gradient-to-br from-rose-600 to-pink-600 text-white h-12 px-8 font-medium shadow-lg hover:shadow-rose-300/30 animate-pulse hover:animate-none">
                        <span className="relative z-10">Animated</span>
                        <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Button6
