"use client";
import React, { useState, useEffect, useRef } from 'react';

const cardsData = [
  { id: 1, title: 'Cosmic Voyage', description: 'Embark on an interstellar journey to the stars.', image: 'https://img.freepik.com/premium-photo/antelop-lake-nakuru-kenya_564993-1.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740', color: 'from-purple-900 to-indigo-800' },
  { id: 2, title: 'Quantum Tech', description: 'Harness the power of quantum computing.', image: 'https://img.freepik.com/free-photo/man-sits-end-trolltunga-before-mountains_1304-5318.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740', color: 'from-blue-900 to-cyan-800' },
  { id: 3, title: 'Neon Dreams', description: 'Immerse in vibrant digital art experiences.', image: 'https://img.freepik.com/free-photo/vertical-shot-some-beautiful-trees-sun-setting-background_181624-4522.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740', color: 'from-pink-900 to-purple-800' },
  { id: 4, title: 'Eco Future', description: 'Sustainable solutions for a greener planet.', image: 'https://img.freepik.com/free-photo/portrait-macaw-isolated-black-surface_181624-48754.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740', color: 'from-green-900 to-teal-800' },
  { id: 5, title: 'AI Revolution', description: 'Explore the frontiers of artificial intelligence.', image: 'https://img.freepik.com/free-photo/photorealistic-view-tree-nature-with-branches-trunk_23-2151478040.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740', color: 'from-red-900 to-orange-800' },
  { id: 6, title: 'Virtual Realms', description: 'Dive into immersive virtual reality worlds.', image: 'https://img.freepik.com/free-photo/vertical-shot-path-leading-waterfall-blue-cloudy-sky_181624-52369.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740', color: 'from-yellow-900 to-amber-800' },
];

const CardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  const cardWidth = 600; // Width for large, immersive cards
  const autoplayInterval = 5000;

  // Autoplay with pause on hover
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() =>  {
        setCurrentIndex((prev) => (prev + 1) % cardsData.length);
      }, autoplayInterval);
      return () => clearInterval(timer);
    }
  }, [isPaused]);

  // Smooth 3D transform
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      carouselRef.current.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    }
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cardsData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cardsData.length) % cardsData.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Touch support
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-black relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] animate-pulse" />
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 5}s linear infinite`,
            }}
          />
        ))}
      </div>

      {/* Carousel Container */}
      <div
        className="relative overflow-hidden perspective-1000 w-full max-w-7xl"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={carouselRef}
          className="flex py-10"
          style={{ width: `${cardsData.length * cardWidth}px` }}
        >
          {cardsData.map((card, index) => (
            <div
              key={card.id}
              className={`flex-shrink-0 w-[600px] mx-6 rounded-2xl overflow-hidden transform transition-all duration-700 relative
                ${index === currentIndex ? 'scale-100 opacity-100 z-20' : 'scale-90 opacity-50 z-10'}`}
              style={{
                transform: index === currentIndex
                  ? 'rotateY(0deg) translateZ(100px)'
                  : index < currentIndex
                  ? 'rotateY(15deg) translateZ(0px)'
                  : 'rotateY(-15deg) translateZ(0px)',
                boxShadow:
                  index === currentIndex
                    ? '0 0 60px rgba(59, 130, 246, 0.8), 0 0 20px rgba(255, 255, 255, 0.3)'
                    : '0 0 10px rgba(0, 0, 0, 0.5)',
              }}
            >
              <div className={`relative bg-gradient-to-b ${card.color} h-[600px]`}>
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover opacity-80 transition-opacity duration-500 hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                <div className="absolute bottom-12 left-10 right-10">
                  <h3 className="text-5xl font-bold text-white tracking-tight leading-tight drop-shadow-lg">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-gray-200 text-lg leading-relaxed drop-shadow-md">
                    {card.description}
                  </p>
                  <button className="mt-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-10 py-4 rounded-full hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                    Explore Now
                  </button>
                </div>
                {/* Dynamic Glow Effect */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      index === currentIndex
                        ? 'radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, transparent 70%)'
                        : 'none',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-5 rounded-full hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-5 rounded-full hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 flex justify-center space-x-3">
        {cardsData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 scale-125'
                : 'bg-gray-600 hover:bg-blue-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;