"use client";
import React, { useState, useEffect, useRef } from 'react';

// Precompute particle data for deterministic rendering
const generateParticles = (count) =>
  Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: 2 + (i % 3),
    angle: (i * 360) / count,
    distance: 40 + (i % 2) * 15,
    hue: 160 + (i % 3) * 20,
    duration: 3 + (i % 2) * 1.5,
  }));

const cardsData = [
  {
    id: 1,
    title: 'Discover Nature',
    description: 'Explore breathtaking landscapes and natural wonders.',
    image: 'https://img.freepik.com/premium-photo/business-people-working-office_1048944-30369177.jpg',
    color: '#3b82f6', // Blue
    particles: generateParticles(10),
  },
  {
    id: 2,
    title: 'Tech Innovation',
    description: 'Experience cutting-edge technology solutions.',
    image: 'https://img.freepik.com/premium-photo/business-team-coffee-break-relax-concept_265022-76173.jpg',
    color: '#ec4899', // Pink
    particles: generateParticles(8),
  },
  {
    id: 3,
    title: 'Creative Arts',
    description: 'Unleash your artistic potential with our tools.',
    image: 'https://img.freepik.com/premium-photo/data-center-male-it-technician-running-maintenance-programme-laptop-controls-operational-server-rack-optimal-functioning-modern-hightech-telecommunications-operational-super-computer_861143-2681.jpg',
    color: '#10b981', // Green
    particles: generateParticles(12),
  },
  {
    id: 4,
    title: 'Adventure Travel',
    description: 'Embark on thrilling adventures worldwide.',
    image: 'https://img.freepik.com/premium-photo/low-angle-fish-eye-shot-garden-city-skyscraper-singapore_76964-36271.jpg',
    color: '#f59e0b', // Amber
    particles: generateParticles(9),
  },
  {
    id: 5,
    title: 'Future Cities',
    description: 'Discover smart urban living solutions.',
    image: 'https://img.freepik.com/free-photo/person-doing-day-day-activity-while-waring-string-finger-remember-something-important_23-2151062313.jpg',
    color: '#8b5cf6', // Purple
    particles: generateParticles(11),
  },
  {
    id: 6,
    title: 'Space Exploration',
    description: 'Journey to the stars with our programs.',
    image: 'https://img.freepik.com/free-photo/side-view-handsome-young-caucasian-freelancer-student-sitting-cafe-table-with-open-laptop-pc-holding-mobile-phone-listening-music-earphones-using-online-app-during-breakfast_273609-1947.jpg',
    color: '#ef4444', // Red
    particles: generateParticles(10),
  },
];

const CardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const carouselRef = useRef(null);
  const cardHeight = 400;
  const visibleCards = 3; // Number of cards visible at once
  const autoplayInterval = 4000;

  // Auto-scroll
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % cardsData.length);
      }, autoplayInterval);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  // Smooth vertical scroll
  useEffect(() => {
    if (carouselRef.current) {
      const offset = -currentIndex * cardHeight;
      carouselRef.current.style.transform = `translateY(${offset}px)`;
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

  // Drag support
  const handleDragStart = (e) => {
    setDragStart(e.clientY || e.touches[0].clientY);
    setIsPaused(true);
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'none';
    }
  };

  const handleDragMove = (e) => {
    if (dragStart === null || !carouselRef.current) return;
    const currentY = e.clientY || (e.touches ? e.touches[0].clientY : dragStart);
    const diff = dragStart - currentY;
    const offset = -currentIndex * cardHeight + diff;
    carouselRef.current.style.transform = `translateY(${offset}px)`;
  };

  const handleDragEnd = (e) => {
    if (dragStart === null || !carouselRef.current) return;
    const currentY = e.clientY || (e.changedTouches ? e.changedTouches[0].clientY : dragStart);
    const diff = dragStart - currentY;
    carouselRef.current.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

    if (diff > 60) {
      nextSlide();
    } else if (diff < -60) {
      prevSlide();
    } else {
      carouselRef.current.style.transform = `translateY(${-currentIndex * cardHeight}px)`;
    }

    setDragStart(null);
    setIsPaused(false);
  };

  // Tilt effect on hover
  const handleMouseMove = (e, cardRef) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (centerY - y) / 20;
    const rotateY = (x - centerX) / 20;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = (cardRef) => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-900 flex items-center justify-center p-6 overflow-hidden">
      {/* HUD Background Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1)_0%,transparent_60%)] opacity-50" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJoZXgiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVybkNvbXBvbmVudHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNMTUgMCBoMzBsMTUgMzAuODY2IC0xNSAzMC44NjYgLTMwIDAgLTE1IC0zMC44NjYgMTUgLTMwLjg2NiB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNoZXgpIi8+PC9zdmc+')] opacity-20" />

      <style jsx>{`
        .carousel-container {
          width: 100%;
          max-width: 600px;
          height: ${cardHeight * visibleCards}px;
          overflow: hidden;
          position: relative;
          perspective: 1000px;
        }
        .carousel-track {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .card {
          width: 100%;
          height: ${cardHeight}px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s ease;
          transform-style: preserve-3d;
          position: absolute;
          left: 0;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }
        .card:hover {
          box-shadow: 0 0 40px var(--glow-color), 0 0 10px var(--glow-color);
          z-index: 10;
        }
        .card-content {
          transition: opacity 0.4s, transform 0.4s;
        }
        .particle {
          position: absolute;
          border-radius: 50%;
          animation: orbit var(--duration) infinite linear;
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(var(--distance)) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(var(--distance)) rotate(-360deg); }
        }
        .progress-bar {
          background: linear-gradient(to right, var(--glow-color) 50%, transparent 100%);
          animation: pulse 2s infinite ease-in-out;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .nav-button {
          transition: all 0.3s ease;
        }
        .nav-button:hover {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 15px var(--glow-color);
        }
        .nav-button:active {
          transform: scale(0.95);
        }
        .dot {
          transition: all 0.3s ease;
        }
        .dot:hover {
          transform: scale(1.5);
        }
        .dot.active {
          transform: scale(1.5);
          background: var(--glow-color);
        }
        .hud-counter {
          font-family: 'Courier New', monospace;
          animation: flicker 3s infinite;
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>

      {/* Main carousel container */}
      <div className="carousel-container">
        <div
          ref={carouselRef}
          className="carousel-track"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          onMouseEnter={() => setIsPaused(true)}
          
        >
          {[...cardsData, ...cardsData].map((card, index) => {
            const relativeIndex = index % cardsData.length;
            const isActive = relativeIndex === currentIndex;
            const offsetIndex = (relativeIndex - currentIndex + cardsData.length) % cardsData.length;
            const yPosition = (offsetIndex * cardHeight) + (index >= cardsData.length ? cardHeight * cardsData.length : 0);
            const scale = isActive ? 1 : 0.85;
            const opacity = isActive ? 1 : 0.7;
            const zIndex = isActive ? 10 : 5 - Math.abs(offsetIndex);
            const cardRef = useRef(null);

            return (
              <div
                key={`${card.id}-${index}`}
                ref={cardRef}
                className="card"
                style={{
                  top: `${yPosition}px`,
                  transform: `scale(${scale})`,
                  opacity,
                  zIndex,
                  '--glow-color': card.color,
                }}
                onMouseMove={(e) => handleMouseMove(e, cardRef)}
                onMouseLeave={() => handleMouseLeave(cardRef)}
              >
                <div className="relative w-full h-full">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-2/3 object-cover"
                    style={{ filter: 'brightness(0.8) contrast(1.2)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="card-content absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2" style={{ textShadow: `0 0 10px ${card.color}` }}>
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-300">{card.description}</p>
                    <button
                      className="mt-4 px-6 py-2 bg-transparent border border-white/30 text-white rounded-full hover:bg-white/10 transition-all"
                      style={{ boxShadow: `0 0 10px ${card.color}` }}
                    >
                      Discover
                    </button>
                  </div>
                  {/* Particles */}
                  {card.particles.map((particle) => (
                    <div
                      key={particle.id}
                      className="particle absolute"
                      style={{
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        top: '50%',
                        left: '50%',
                        background: `hsl(${particle.hue}, 100%, 70%)`,
                        boxShadow: `0 0 ${particle.size * 2}px hsl(${particle.hue}, 100%, 70%)`,
                        '--distance': `${particle.distance}px`,
                        '--duration': `${particle.duration}s`,
                        transform: `rotate(${particle.angle}deg) translateX(${particle.distance}px)`,
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* HUD Elements */}
      <div className="absolute top-6 left-6 flex flex-col gap-4">
        <div className="hud-counter text-white text-sm opacity-70">
          SCAN: {String(currentIndex + 1).padStart(2, '0')} / {String(cardsData.length).padStart(2, '0')}
        </div>
        <div className="w-32 h-2 bg-gray-800/50 rounded-full overflow-hidden">
          <div
            className="progress-bar h-full"
            style={{
              width: `${((currentIndex + 1) / cardsData.length) * 100}%`,
              '--glow-color': cardsData[currentIndex].color,
            }}
          />
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        <button
          onClick={prevSlide}
          className="nav-button bg-black/50 text-white p-3 rounded-full"
          style={{ '--glow-color': cardsData[currentIndex].color }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="nav-button bg-black/50 text-white p-3 rounded-full"
          style={{ '--glow-color': cardsData[currentIndex].color }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 9l7 7 7-7" />
          </svg>
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 flex justify-center space-x-2">
        {cardsData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`dot w-2 h-2 rounded-full ${currentIndex === index ? 'active' : 'bg-white/30'}`}
            style={{ '--glow-color': cardsData[currentIndex].color }}
          />
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;