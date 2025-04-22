"use client";
import React, { useState, useEffect, useRef } from 'react';

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
  const [isPaused, setIsPaused] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const carouselRef = useRef(null);
  const cardWidth = 400;

  // Auto-rotate
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % cardsData.length);
      }, 5000);
      return () => clearInterval(interval);
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

  // Drag and touch support
  const handleDragStart = (e) => {
    setDragStart(e.clientX || e.touches[0].clientX);
    setIsPaused(true);
  };

  const handleDragMove = (e) => {
    if (dragStart === null || !carouselRef.current) return;
    const currentX = e.clientX || (e.touches ? e.touches[0].clientX : dragStart);
    const diff = dragStart - currentX;
    carouselRef.current.style.transform = `translateX(-${currentIndex * cardWidth + diff}px)`;
  };

  const handleDragEnd = (e) => {
    if (dragStart === null || !carouselRef.current) return;
    const currentX = e.clientX || (e.changedTouches ? e.changedTouches[0].clientX : dragStart);
    const diff = dragStart - currentX;
    const minSwipeDistance = 100;

    if (diff > minSwipeDistance) {
      nextSlide();
    } else if (diff < -minSwipeDistance) {
      prevSlide();
    } else {
      carouselRef.current.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    setDragStart(null);
    setIsPaused(false);
  };

  // Tilt effect on hover
  const handleMouseMove = (e, cardRef) => {
    if (!cardRef.current || typeof window === 'undefined') return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = (x - centerX) / 15;
    const rotateX = (centerY - y) / 15;

    cardRef.current.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.05)
    `;
  };

  const handleMouseLeave = (cardRef) => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
  };

  return (
    <div
      className="relative w-full h-screen bg-gray-950 overflow-hidden flex items-center justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Cosmic background with particles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.2)_0%,transparent_70%)] animate-pulse" />
      <style jsx>{`
        .particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          animation: float 15s infinite linear;
        }
        @keyframes float {
          0% { transform: translateY(100vh); }
          100% { transform: translateY(-100vh); }
        }
      `}</style>
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animationDelay: `${Math.random() * 10}s`,
            opacity: Math.random() * 0.3 + 0.1,
          }}
        />
      ))}

      {/* Carousel Container */}
      <div className="relative w-full max-w-7xl h-3/4 perspective-1200">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-700 ease-in-out"
          style={{ width: `${cardsData.length * cardWidth}px` }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {cardsData.map((card, index) => {
            const offset = index - currentIndex;
            const isActive = index === currentIndex;
            const cardRef = useRef(null);

            return (
              <div
                key={card.id}
                ref={cardRef}
                className={`flex-shrink-0 w-[400px] h-[500px] mx-4 rounded-2xl overflow-hidden transition-all duration-500 select-none
                  ${isActive ? 'opacity-100 z-20' : 'opacity-70 z-10'}`}
                style={{
                  transform: `translateZ(${Math.abs(offset) * -100}px) rotateY(${offset * 10}deg)`,
                  boxShadow: isActive
                    ? '0 0 40px rgba(147, 51, 234, 0.8), 0 0 15px rgba(255, 255, 255, 0.2)'
                    : '0 0 20px rgba(147, 51, 234, 0.3)',
                }}
                onMouseMove={(e) => handleMouseMove(e, cardRef)}
                onMouseLeave={() => handleMouseLeave(cardRef)}
              >
                <div className={`rounded-2xl relative h-full bg-gradient-to-b ${card.color} bg-opacity-30 backdrop-blur-lg `}>
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full rounded-2xl h-56 object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className={`text-3xl font-bold text-white transition-transform duration-500 ${isActive ? 'translate-y-0' : 'translate-y-4'}`}>
                      {card.title}
                    </h3>
                    <p className={`mt-2 text-gray-300 text-sm transition-transform duration-500 ${isActive ? 'translate-y-0' : 'translate-y-4'}`}>
                      {card.description}
                    </p>
                    <button
                      className={`mt-4 px-6 py-2 bg-transparent border border-white text-white rounded-full hover:bg-white/20 transition-all duration-300 transform
                        ${isActive ? 'translate-y-0 scale-100' : 'translate-y-4 scale-95'}`}
                    >
                      Explore Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className=" -left-20 top-1/2 transform -translate-y-1/2 bg-white/10 text-white p-4 rounded-full hover:bg-white/20 transition-all duration-300 relative overflow-hidden group"
      >
        <span className="absolute inset-0 bg-white/20 scale-0 rounded-full group-hover:scale-150 transition-transform duration-300"></span>
        <svg className="w-6 h-6 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className=" right-20  top-1/2 transform -translate-y-1/2 bg-white/10 text-white p-4 rounded-full hover:bg-white/20 transition-all duration-300 relative overflow-hidden group"
      >
        <span className="absolute inset-0 bg-white/20 scale-0 rounded-full group-hover:scale-150 transition-transform duration-300"></span>
        <svg className="w-6 h-6 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 flex justify-center space-x-4">
        {cardsData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-white scale-150' : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;