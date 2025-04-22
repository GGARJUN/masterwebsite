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
  const cardWidth = 500; // Larger cards for full-screen
  const autoplayInterval = 4000;

  // Autoplay
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % cardsData.length);
      }, autoplayInterval);
      return () => clearInterval(timer);
    }
  }, [isPaused]);

  // Smooth transition
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
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
      className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel Container */}
      <div
        className="relative overflow-hidden perspective-1200 w-full max-w-8xl"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={carouselRef}
          className="flex transition-transform duration-1000 ease-in-out py-5"
          style={{ width: `${cardsData.length * cardWidth}px` }}
        >
          {cardsData.map((card, index) => (
            <div
              key={card.id}
              className={`flex-shrink-0 w-[500px] mx-4 rounded-3xl overflow-hidden transform transition-all duration-700
                ${index === currentIndex ? 'scale-100 opacity-100 z-10' : 'scale-85 opacity-40 blur-sm z-0'}`}
              style={{
                transform: index === currentIndex ? 'rotateY(0deg)' : index < currentIndex ? 'rotateY(20deg)' : 'rotateY(-20deg)',
                boxShadow: index === currentIndex ? '0 0 40px rgba(59, 130, 246, 0.6)' : '0 0 15px rgba(0, 0, 0, 0.4)',
              }}
            >
              <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 h-full">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-80 object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-4xl font-extrabold text-white tracking-tight leading-tight">{card.title}</h3>
                  <p className="mt-3 text-gray-200 text-base leading-relaxed">{card.description}</p>
                  <button className="mt-6 bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-110">
                    Discover More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-blue-500/40 text-white p-5 rounded-full hover:bg-blue-500/60 transition-all duration-300 backdrop-blur-md animate-pulse"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-blue-500/40 text-white p-5 rounded-full hover:bg-blue-500/60 transition-all duration-300 backdrop-blur-md animate-pulse"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-10 flex justify-center space-x-4">
        {cardsData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-blue-500 scale-150' : 'bg-gray-600 hover:bg-blue-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;