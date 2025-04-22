"use client";
import React, { useState, useEffect, useRef } from 'react';

const cardsData = [
  { id: 1, title: 'Discover Nature', description: 'Explore breathtaking landscapes and natural wonders.', image: 'https://img.freepik.com/premium-photo/business-people-working-office_1048944-30369177.jpg' },
  { id: 2, title: 'Tech Innovation', description: 'Experience cutting-edge technology solutions.', image: 'https://img.freepik.com/premium-photo/business-team-coffee-break-relax-concept_265022-76173.jpg' },
  { id: 3, title: 'Creative Arts', description: 'Unleash your artistic potential with our tools.', image: 'https://img.freepik.com/premium-photo/data-center-male-it-technician-running-maintenance-programme-laptop-controls-operational-server-rack-optimal-functioning-modern-hightech-telecommunications-operational-super-computer_861143-2681.jpg' },
  { id: 4, title: 'Adventure Travel', description: 'Embark on thrilling adventures worldwide.', image: 'https://img.freepik.com/premium-photo/low-angle-fish-eye-shot-garden-city-skyscraper-singapore_76964-36271.jpg' },
  { id: 5, title: 'Future Cities', description: 'Discover smart urban living solutions.', image: 'https://img.freepik.com/free-photo/person-doing-day-day-activity-while-waring-string-finger-remember-something-important_23-2151062313.jpg' },
  { id: 6, title: 'Space Exploration', description: 'Journey to the stars with our programs.', image: 'https://img.freepik.com/free-photo/side-view-handsome-young-caucasian-freelancer-student-sitting-cafe-table-with-open-laptop-pc-holding-mobile-phone-listening-music-earphones-using-online-app-during-breakfast_273609-1947.jpg' },
];

const CardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  const radius = 600; // Radius of the circular carousel
  const autoplayInterval = 5000;

  // Autoplay
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % cardsData.length);
      }, autoplayInterval);
      return () => clearInterval(timer);
    }
  }, [isPaused]);

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
      className="w-full h-screen relative overflow-hidden bg-black flex items-center justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Particle Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2)_0%,transparent_70%)] animate-pulse" />

      {/* Carousel Container */}
      <div ref={carouselRef} className="relative w-full h-full perspective-1500">
        {cardsData.map((card, index) => {
          const angle = (index - currentIndex) * (360 / cardsData.length);
          const isActive = index === currentIndex;
          const z = Math.cos((angle * Math.PI) / 180) * radius;
          const x = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <div
              key={card.id}
              className={`absolute top-1/2 left-1/2 w-80 h-[450px] rounded-2xl overflow-hidden transform transition-all duration-1000
                ${isActive ? 'scale-110 opacity-100 z-20' : 'scale-75 opacity-60 z-10'}`}
              style={{
                transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${angle}deg)`,
                boxShadow: isActive
                  ? '0 0 50px rgba(59, 130, 246, 0.8), 0 0 20px rgba(255, 255, 255, 0.3)'
                  : '0 0 20px rgba(59, 130, 246, 0.3)',
              }}
            >
              <div className="relative h-full bg-gradient-to-b from-blue-900/50 to-gray-900/80 backdrop-blur-md border border-blue-500/30">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-56 object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4">
                  <h3 className="text-2xl font-bold text-white tracking-wide">{card.title}</h3>
                  <p className="mt-2 text-blue-200 text-sm leading-relaxed">{card.description}</p>
                  <button
                    className="mt-4 bg-transparent border-2 border-blue-500 text-blue-300 px-6 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105"
                  >
                    Explore Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-transparent border-2 border-blue-500/50 text-blue-300 p-4 rounded-full hover:bg-blue-500/20 transition-all duration-300"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-transparent border-2 border-blue-500/50 text-blue-300 p-4 rounded-full hover:bg-blue-500/20 transition-all duration-300"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 flex justify-center space-x-3">
        {cardsData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-blue-400 scale-150' : 'bg-blue-700/50 hover:bg-blue-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;