"use client";
import React, { useState, useEffect, useRef } from 'react';

const cardsData = [
  { id: 1, title: 'Discover Nature', description: 'Explore breathtaking landscapes and natural wonders.', image: 'https://img.freepik.com/premium-photo/business-people-working-office_1048944-30369177.jpg' },
  { id: 2, title: 'Tech Innovation', description: 'Experience cutting-edge technology solutions.', image: 'https://img.freepik.com/premium-photo/business-team-coffee-break-relax-concept_265022-76173.jpg' },
  { id: 3, title: 'Creative Arts', description: 'Unleash your artistic potential with our tools.', image: 'https://img.freepik.com/premium-photo/data-center-male-it-technician-running-maintenance-programme-laptop-controls-operational-server-rack-optimal-functioning-modern-hightech-telecommunications-operational-super-computer_861143-2681.jpg' },
  { id: 4, title: 'Adventure Travel', description: 'Embark on thrilling adventures worldwide.', image: 'https://img.freepik.com/premium-photo/low-angle-fish-eye-shot-garden-city-skyscraper-singapore_76964-36271.jpg' },
  { id: 5, title: 'Future Cities', description: 'Discover smart urban living solutions.', image: 'https://img.freepik.com/free-photo/person-doing-day-day-activity-while-waring-string-finger-remember-something-important_23-2151062313.jpg' },
  { id: 6, title: 'Space Exploration', description: 'Journey to the stars with our programs.', image: 'https://img.freepik.com/free-photo/side-view-handsome-young-caucasian-freelancer-student-sitting-cafe-table-with-open-laptop-pc-holding-mobile-phone-listening-music-earphones-using-online-app-during-breakfast_273609-1947.jpg?w=1060&t=st=1709041994~exp=1709042594~hmac=67d37791d13209db401bb22aa8eacdc19489091eb9c26f6ce39255bcab23d5f2' },
];

const CardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCards, setVisibleCards] = useState(3);
  const carouselRef = useRef(null);
  const cardWidth = 320;
  const autoplayInterval = 3000;

  // Responsive visible cards
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    };
    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  // Autoplay
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => 
          prev + 1 >= cardsData.length - visibleCards + 1 ? 0 : prev + 1
        );
      }, autoplayInterval);
      return () => clearInterval(timer);
    }
  }, [isPaused, visibleCards]);

  // Smooth transition
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + 1 >= cardsData.length - visibleCards + 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? cardsData.length - visibleCards : prev - 1));
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
      className="w-full max-w-7xl mx-auto py-12 relative "
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel Container */}
      <div 
        className="relative overflow-hidden px-4"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={carouselRef}
          className="flex transition-transform duration-700 ease-in-out"
          style={{ width: `${cardsData.length * cardWidth}px` }}
        >
          {cardsData.map((card, index) => (
            <div
              key={card.id}
              className={`flex-shrink-0 w-[300px] mx-2  rounded-xl bg-gray-200 overflow-hidden transform transition-all duration-500
                ${Math.abs(currentIndex - index) <= visibleCards ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`}
            >
              <div className="relative">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{card.title}</h3>
              </div>
              <div className="p-6 ">
                <p className="text-gray-600 leading-relaxed">{card.description}</p>
                <button className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300">
                  Explore Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-900/70 text-white p-3 rounded-full hover:bg-gray-900 transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-900/70 text-white p-3 rounded-full hover:bg-gray-900 transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-6 space-x-3">
        {Array.from({ length: cardsData.length - visibleCards + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-indigo-600 scale-125' : 'bg-gray-300  hover:bg-indigo-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;