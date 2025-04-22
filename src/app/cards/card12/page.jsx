"use client";
import React, { useState, useEffect, useRef } from 'react';

const cardsData = [
  {
    id: 1,
    title: 'Discover Nature',
    description: 'Explore breathtaking landscapes and natural wonders.',
    image: 'https://img.freepik.com/premium-photo/business-people-working-office_1048944-30369177.jpg',
    color: '#10b981', // Emerald
  },
  {
    id: 2,
    title: 'Tech Innovation',
    description: 'Experience cutting-edge technology solutions.',
    image: 'https://img.freepik.com/premium-photo/business-team-coffee-break-relax-concept_265022-76173.jpg',
    color: '#3b82f6', // Blue
  },
  {
    id: 3,
    title: 'Creative Arts',
    description: 'Unleash your artistic potential with our tools.',
    image: 'https://img.freepik.com/premium-photo/data-center-male-it-technician-running-maintenance-programme-laptop-controls-operational-server-rack-optimal-functioning-modern-hightech-telecommunications-operational-super-computer_861143-2681.jpg',
    color: '#a855f7', // Purple
  },
  {
    id: 4,
    title: 'Adventure Travel',
    description: 'Embark on thrilling adventures worldwide.',
    image: 'https://img.freepik.com/premium-photo/low-angle-fish-eye-shot-garden-city-skyscraper-singapore_76964-36271.jpg',
    color: '#f59e0b', // Amber
  },
  {
    id: 5,
    title: 'Future Cities',
    description: 'Discover smart urban living solutions.',
    image: 'https://img.freepik.com/free-photo/person-doing-day-day-activity-while-waring-string-finger-remember-something-important_23-2151062313.jpg',
    color: '#06b6d4', // Cyan
  },
  {
    id: 6,
    title: 'Space Exploration',
    description: 'Journey to the stars with our programs.',
    image: 'https://img.freepik.com/free-photo/side-view-handsome-young-caucasian-freelancer-student-sitting-cafe-table-with-open-laptop-pc-holding-mobile-phone-listening-music-earphones-using-online-app-during-breakfast_273609-1947.jpg',
    color: '#ec4899', // Pink
  },
];

const CardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);
  const cardWidth = 400;
  const gap = 16;
  const autoplayInterval = 5000;

  // Initialize cardRefs
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, cardsData.length);
  }, []);

  // Auto-slide
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % cardsData.length);
        setDragOffset(0);
      }, autoplayInterval);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  // Smooth slide transitions
  useEffect(() => {
    if (!carouselRef.current) return;
    const offset = -(currentIndex * (cardWidth + gap)) + dragOffset;
    carouselRef.current.style.transform = `translateX(${offset}px)`;
  }, [currentIndex, dragOffset]);

  // Navigation functions
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cardsData.length);
    setDragOffset(0);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cardsData.length) % cardsData.length);
    setDragOffset(0);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setDragOffset(0);
  };

  // Drag support
  const handleDragStart = (e) => {
    setDragStart(e.clientX || e.touches[0].clientX);
    setIsPaused(true);
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'none';
    }
  };

  const handleDragMove = (e) => {
    if (dragStart === null || !carouselRef.current) return;
    const currentX = e.clientX || (e.touches ? e.touches[0].clientX : dragStart);
    const diff = currentX - dragStart;
    setDragOffset(diff);
  };

  const handleDragEnd = (e) => {
    if (dragStart === null || !carouselRef.current) return;
    const currentX = e.clientX || (e.changedTouches ? e.changedTouches[0].clientX : dragStart);
    const diff = currentX - dragStart;
    carouselRef.current.style.transition = 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';

    if (diff < -60) {
      nextSlide();
    } else if (diff > 60) {
      prevSlide();
    } else {
      setDragOffset(0);
    }

    setDragStart(null);
    setIsPaused(false);
  };

  // Touch swipe support
  const handleTouchStart = (e) => {
    handleDragStart(e);
  };

  const handleTouchMove = (e) => {
    handleDragMove(e);
  };

  const handleTouchEnd = (e) => {
    handleDragEnd(e);
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-950 flex items-center justify-center p-6 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] opacity-50" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJkb3QiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVybkNvbXBvbmVudHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNkb3QpIi8+PC9zdmc+')] opacity-20" />

      <style jsx>{`
        .carousel-container {
          width: ${cardWidth}px;
          height: 500px;
          overflow: hidden;
          position: relative;
        }
        .carousel-track {
          display: flex;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          gap: ${gap}px;
        }
        .card {
          flex: 0 0 ${cardWidth}px;
          height: 500px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.5s ease;
          transform: translateY(0);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        .card.active {
          opacity: 1;
          z-index: 10;
        }
        .card:not(.active) {
          opacity: 0.3;
          pointer-events: none;
        }
        .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px var(--glow-color);
        }
        .card-content {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s ease;
        }
        .card:hover .card-content {
          opacity: 1;
          transform: translateY(0);
        }
        .light-trail {
          position: absolute;
          background: var(--glow-color);
          animation: trail 2s infinite ease-in-out;
          opacity: 0.5;
        }
        @keyframes trail {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { transform: translateX(0); opacity: 0.7; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        .nav-button {
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .nav-button:hover {
          background: var(--glow-color);
          box-shadow: 0 0 15px var(--glow-color);
          transform: scale(1.1);
        }
        .nav-button:active {
          transform: scale(0.95);
        }
        .progress-bar {
          background: var(--glow-color);
          animation: glow 2s infinite ease-in-out;
        }
        @keyframes glow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        .counter {
          font-family: 'Courier New', monospace;
          animation: flicker 3s infinite;
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @media (max-width: 640px) {
          .carousel-container {
            width: 300px;
          }
          .card {
            flex: 0 0 300px;
          }
        }
      `}</style>

      {/* Main carousel container */}
      <div className="carousel-container mx-auto">
        <div
          ref={carouselRef}
          className="carousel-track"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          
        >
          {cardsData.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`card ${index === currentIndex ? 'active' : ''}`}
              style={{ '--glow-color': card.color }}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-2/3 object-cover"
                style={{ filter: 'contrast(1.1) saturate(1.2)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="card-content absolute bottom-6 left-6 right-6">
                <h3
                  className="text-2xl font-bold text-white"
                  style={{ textShadow: `0 0 8px ${card.color}` }}
                >
                  {card.title}
                </h3>
                <p className="text-sm text-gray-300 mt-2">{card.description}</p>
                <button
                  className="mt-4 px-6 py-2 bg-transparent border border-white/30 text-white rounded-full hover:bg-white/10 transition-all"
                  style={{ boxShadow: `0 0 10px ${card.color}` }}
                >
                  Learn More
                </button>
              </div>
              {/* Light trails */}
              {index === currentIndex && (
                <>
                  <div
                    className="light-trail h-1 w-1/2 top-0 left-0"
                    style={{ boxShadow: `0 0 10px ${card.color}` }}
                  />
                  <div
                    className="light-trail h-1 w-1/2 bottom-0 right-0"
                    style={{ boxShadow: `0 0 10px ${card.color}` }}
                  />
                </>
              )}
            </div>
          ))}
        </div>

        {/* Navigation controls */}
        <button
          onClick={prevSlide}
          className="nav-button absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-md text-white p-3 rounded-full z-50"
          style={{ '--glow-color': cardsData[currentIndex].color }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="nav-button absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-md text-white p-3 rounded-full z-50"
          style={{ '--glow-color': cardsData[currentIndex].color }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
          <span className="counter text-white/70 text-sm">
            {String(currentIndex + 1).padStart(2, '0')}/{String(cardsData.length).padStart(2, '0')}
          </span>
          <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="progress-bar h-full"
              style={{
                width: `${((currentIndex + 1) / cardsData.length) * 100}%`,
                '--glow-color': cardsData[currentIndex].color,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCarousel;