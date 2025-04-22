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
  const autoplayInterval = 6000;

  // Autoplay
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % cardsData.length);
      }, autoplayInterval);
      return () => clearInterval(timer);
    }
  }, [isPaused]);

  // Scroll handling
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateY(-${currentIndex * 100}vh)`;
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
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > minSwipeDistance;
    const isDownSwipe = distance < -minSwipeDistance;
    if (isUpSwipe) nextSlide();
    if (isDownSwipe) prevSlide();
  };

  return (
    <div
      className="w-full h-screen relative overflow-hidden bg-gray-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="flex flex-col transition-transform duration-1000 ease-in-out"
        style={{ height: `${cardsData.length * 100}vh` }}
      >
        {cardsData.map((card, index) => (
          <div
            key={card.id}
            className={`w-full h-screen flex items-center justify-center relative transition-opacity duration-1000
              ${index === currentIndex ? 'opacity-100' : 'opacity-50'}`}
          >
            <div
              className="relative w-11/12 max-w-5xl h-3/4 rounded-3xl overflow-hidden bg-white/30 backdrop-blur-lg border border-white/20 shadow-2xl"
              style={{
                transform: `translateY(${(index - currentIndex) * 10}px)`,
                boxShadow: index === currentIndex ? '0 20px 40px rgba(0, 0, 0, 0.2)' : '0 10px 20px rgba(0, 0, 0, 0.1)',
              }}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h3
                  className={`text-5xl font-extrabold text-white tracking-tight transition-transform duration-1000 ${
                    index === currentIndex ? 'translate-y-0' : 'translate-y-10'
                  }`}
                >
                  {card.title}
                </h3>
                <p
                  className={`mt-4 text-gray-200 text-lg leading-relaxed transition-transform duration-1000 delay-200 ${
                    index === currentIndex ? 'translate-y-0' : 'translate-y-10'
                  }`}
                >
                  {card.description}
                </p>
                <button
                  className={`mt-6 bg-white/20 text-white px-8 py-3 rounded-full hover:bg-white/30 transition-all duration-300 transform ${
                    index === currentIndex ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'
                  }`}
                >
                  Explore Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-72 transform -translate-y-1/2 bg-white/10 text-black p-3 rounded-full hover:bg-black/20 transition-all duration-300 backdrop-blur-sm"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute left-4 top-96 transform -translate-y-1/2 bg-white/10 text-black p-3 rounded-full hover:bg-black/20 transition-all duration-300 backdrop-blur-sm"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Progress Bar Navigation */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-3">
        {cardsData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-8 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-black scale-y-150' : 'bg-black/30 hover:bg-black/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;