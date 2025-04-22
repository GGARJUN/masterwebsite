"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cardsData = [
    {
        id: 1,
        title: 'Quantum Leap',
        description: 'Experience next-gen technology that redefines possibilities',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        color: 'from-indigo-500 to-purple-600'
    },
    {
        id: 2,
        title: 'Neon Dreams',
        description: 'Immerse yourself in vibrant digital landscapes',
        image: 'https://img.freepik.com/premium-photo/business-team-coffee-break-relax-concept_265022-76173.jpg',
        color: 'from-cyan-400 to-blue-600'
    },
    {
        id: 3,
        title: 'Cyber Nexus',
        description: 'Connect to the future with our neural interface',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        color: 'from-emerald-400 to-teal-600'
    },
    {
        id: 4,
        title: 'Hologram Reality',
        description: 'Step into augmented dimensions of existence',
        image: 'https://img.freepik.com/premium-photo/data-center-male-it-technician-running-maintenance-programme-laptop-controls-operational-server-rack-optimal-functioning-modern-hightech-telecommunications-operational-super-computer_861143-2681.jpg',
        color: 'from-pink-500 to-rose-600'
    },
    {
        id: 5,
        title: 'Data Matrix',
        description: 'Navigate the streams of infinite information',
        image: 'https://img.freepik.com/free-photo/people-working-together-medium-shot_52683-99762.jpg',
        color: 'from-amber-400 to-orange-600'
    },
];

const CardCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const carouselRef = useRef(null);

    // Auto-rotate with pause on hover
    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(() => {
                setDirection(1);
                setCurrentIndex((prev) => (prev + 1) % cardsData.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [isHovered]);

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % cardsData.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + cardsData.length) % cardsData.length);
    };

    const goToSlide = (index) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    // 3D tilt effect
    const handleMouseMove = (e) => {
        if (!carouselRef.current || typeof window === 'undefined') return;
        const rect = carouselRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateY = (x - centerX) / 20;
        const rotateX = (centerY - y) / 20;

        carouselRef.current.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
    };

    const handleMouseLeave = () => {
        if (carouselRef.current) {
            carouselRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        }
    };

    // Drag handling
    const handleDragEnd = (e, { offset, velocity }) => {
        const swipe = Math.abs(offset.x) * velocity.x;
        if (swipe < -10000) {
            handleNext();
        } else if (swipe > 10000) {
            handlePrev();
        }
    };

    return (
        <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 to-black overflow-hidden">
            {/* Animated grid background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSI2MCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
            </div>

            <div className="relative h-full flex flex-col items-center justify-center p-4 sm:p-8">
                {/* Main carousel */}
                <div
                    className="relative w-full max-w-6xl h-3/4 flex items-center justify-center"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => {
                        setIsHovered(false);
                        handleMouseLeave();
                    }}
                >
                    <AnimatePresence initial={false} mode="wait">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            ref={carouselRef}
                            className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing"
                            initial={{ x: direction > 0 ? '100%' : '-100%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: direction > 0 ? '-100%' : '100%', opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.1 }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={handleDragEnd}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            {/* Card content */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${cardsData[currentIndex].color} opacity-90`} />
                            <img
                                src={cardsData[currentIndex].image}
                                alt={cardsData[currentIndex].title}
                                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-70"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                            <div className="relative h-full flex flex-col justify-end p-8 sm:p-12 text-white">
                                <motion.h2
                                    className="text-4xl sm:text-6xl font-bold mb-4"
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {cardsData[currentIndex].title}
                                </motion.h2>
                                <motion.p
                                    className="text-lg sm:text-xl max-w-2xl mb-8 text-gray-300"
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    {cardsData[currentIndex].description}
                                </motion.p>
                                <motion.div
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <button className="px-6 py-3 sm:px-8 sm:py-3 bg-white text-black rounded-full font-medium hover:bg-opacity-90 transition-all duration-300 flex items-center gap-2 group">
                                        <span>Explore Now</span>
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation arrows */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-2 sm:left-8 z-10 p-3 rounded-full bg-black/50 backdrop-blur-md hover:bg-white/20 transition-all duration-300"
                    >
                        <svg className="w-6 sm:w-8 h-6 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-2 sm:right-8 z-10 p-3 rounded-full bg-black/50 backdrop-blur-md hover:bg-white/20 transition-all duration-300"
                    >
                        <svg className="w-6 sm:w-8 h-6 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Progress indicators */}
                <div className="flex items-center justify-center mt-8 sm:mt-12 space-x-4">
                    {cardsData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`relative w-12 sm:w-16 h-1 rounded-full overflow-hidden transition-all duration-300 ${currentIndex === index ? 'bg-white' : 'bg-white/30'}`}
                        >
                            {currentIndex === index && (
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-white"
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 5, ease: 'linear' }}
                                    onAnimationComplete={() => {
                                        if (currentIndex === index && !isHovered) {
                                            handleNext();
                                        }
                                    }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardCarousel;