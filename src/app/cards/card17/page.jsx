"use client";
import React, { useState, useEffect, useRef } from 'react';

// Circuit pattern generator for card edges
const generateCircuitPatterns = (count, color) => {
  const hue = parseInt(color.slice(1), 16) % 360;
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: 2 + (i % 2),
    offset: (i * 100) / count,
    hue: (hue + i * 10) % 360,
    duration: 3 + (i % 2) * 1,
  }));
};

const cardsData = [
  {
    id: 1,
    title: 'Discover Nature',
    description: 'Explore breathtaking landscapes and natural wonders.',
    image: 'https://img.freepik.com/premium-photo/business-people-working-office_1048944-30369177.jpg',
    color: '#10b981', // Neon Emerald
    circuits: 8,
  },
  {
    id: 2,
    title: 'Tech Innovation',
    description: 'Experience cutting-edge technology solutions.',
    image: 'https://img.freepik.com/premium-photo/business-team-coffee-break-relax-concept_265022-76173.jpg',
    color: '#3b82f6', // Neon Blue
    circuits: 8,
  },
  {
    id: 3,
    title: 'Creative Arts',
    description: 'Unleash your artistic potential with our tools.',
    image: 'https://img.freepik.com/premium-photo/data-center-male-it-technician-running-maintenance-programme-laptop-controls-operational-server-rack-optimal-functioning-modern-hightech-telecommunications-operational-super-computer_861143-2681.jpg',
    color: '#a855f7', // Neon Purple
    circuits: 8,
  },
  {
    id: 4,
    title: 'Adventure Travel',
    description: 'Embark on thrilling adventures worldwide.',
    image: 'https://img.freepik.com/premium-photo/low-angle-fish-eye-shot-garden-city-skyscraper-singapore_76964-36271.jpg',
    color: '#f59e0b', // Neon Amber
    circuits: 8,
  },
  {
    id: 5,
    title: 'Future Cities',
    description: 'Discover smart urban living solutions.',
    image: 'https://img.freepik.com/free-photo/person-doing-day-day-activity-while-waring-string-finger-remember-something-important_23-2151062313.jpg',
    color: '#06b6d4', // Neon Cyan
    circuits: 8,
  },
  {
    id: 6,
    title: 'Space Exploration',
    description: 'Journey to the stars with our programs.',
    image: 'https://img.freepik.com/free-photo/side-view-handsome-young-caucasian-freelancer-student-sitting-cafe-table-with-open-laptop-pc-holding-mobile-phone-listening-music-earphones-using-online-app-during-breakfast_273609-1947.jpg',
    color: '#ec4899', // Neon Pink
    circuits: 8,
  },
].map(card => ({
  ...card,
  circuits: generateCircuitPatterns(card.circuits, card.color),
}));

const AdvancedCardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);
  const cardWidth = 450;
  const gap = 20;
  const autoplayInterval = 6000;

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
      const interval = setInterval(() => {
        setCurrentIndex((prev) =>
          prev + 1 >= cardsData.length - visibleCards + 1 ? 0 : prev + 1
        );
        setDragOffset(0);
      }, autoplayInterval);
      return () => clearInterval(interval);
    }
  }, [isPaused, visibleCards]);

  // Smooth transition with 3D effect
  useEffect(() => {
    if (!carouselRef.current) return;
    const offset = -(currentIndex * (cardWidth + gap)) + dragOffset;
    carouselRef.current.style.transform = `translateX(${offset}px)`;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const isActive = Math.abs(currentIndex - index) < visibleCards;
      const zIndex = isActive ? 10 : 5;
      const opacity = isActive ? 1 : 0.4;
      const scale = isActive ? 1 : 0.9;
      card.style.opacity = opacity;
      card.style.zIndex = zIndex;
      card.style.transform = `scale(${scale})`;
    });
  }, [currentIndex, dragOffset, visibleCards]);

  // Drag handlers
  const handleDragStart = (e) => {
    setDragStart(e.clientX || e.touches[0].clientX);
    setIsPaused(true);
    if (carouselRef.current) carouselRef.current.style.transition = 'none';
  };

  const handleDragMove = (e) => {
    if (dragStart === null || !carouselRef.current) return;
    const currentX = e.clientX || (e.touches ? e.touches[0].clientX : dragStart);
    const diff = (currentX - dragStart) * 1.2; // Increased sensitivity
    setDragOffset(diff);
  };

  const handleDragEnd = (e) => {
    if (dragStart === null || !carouselRef.current) return;
    const currentX = e.clientX || (e.changedTouches ? e.changedTouches[0].clientX : dragStart);
    const diff = currentX - dragStart;
    carouselRef.current.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';

    if (diff < -80) {
      setCurrentIndex((prev) => (prev + 1 >= cardsData.length - visibleCards + 1 ? 0 : prev + 1));
    } else if (diff > 80) {
      setCurrentIndex((prev) => (prev - 1 < 0 ? cardsData.length - visibleCards : prev - 1));
    }
    setDragOffset(0);
    setDragStart(null);
    setIsPaused(false);
  };

  // Touch handlers
  const handleTouchStart = (e) => handleDragStart(e);
  const handleTouchMove = (e) => handleDragMove(e);
  const handleTouchEnd = (e) => handleDragEnd(e);

  return (
    <div className="relative w-full min-h-screen bg-black flex items-center justify-center p-8 overflow-hidden">
      {/* Digital rain background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJyYWluIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjIwIiBmaWxsPSJyZ2JhKDEwLDI1NSwxMDAsMC4wNSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsMCkiLz48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxNSIgZmlsbD0icmdiYSgxMCwyNTUsMTAwLDAuMDMpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMCwxMCkiLz48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxMCIgZmlsbD0icmdiYSgxMCwyNTUsMTAwLDAuMDIpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMCwyMCkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcmFpbikiLz48L3N2Zz4=')] opacity-30 animate-rain" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,255,100,0.1)_0%,transparent_70%)] opacity-50" />

      <style jsx>{`
        .carousel-container {
          max-width: 1400px;
          width: 100%;
          height: 600px;
          overflow: hidden;
          position: relative;
          perspective: 1200px;
        }
        .carousel-track {
          display: flex;
          gap: ${gap}px;
          transition: transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .card {
          flex: 0 0 ${cardWidth}px;
          height: 600px;
          background: rgba(10, 10, 20, 0.3);
          border: 2px solid var(--glow-color);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.5s ease;
          transform-style: preserve-3d;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
          position: relative;
        }
        .card.active {
          opacity: 1;
          z-index: 10;
          transform: translateZ(50px) scale(1.05);
        }
        .card:not(.active) {
          opacity: 0.4;
          pointer-events: none;
        }
        .card:hover {
          transform: translateY(-20px) translateZ(100px) scale(1.1);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), 0 0 40px var(--glow-color);
          animation: pulse 2s infinite;
        }
        .card-inner {
          transition: transform 0.3s ease;
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
        }
        .card:hover .card-inner {
          transform: perspective(1200px) rotateX(5deg) rotateY(-5deg) scale(1.1);
        }
        .circuit {
          position: absolute;
          width: 100%;
          height: 2px;
          background: var(--glow-color);
          opacity: 0.6;
          animation: circuit-flow var(--duration) infinite linear;
          box-shadow: 0 0 10px var(--glow-color);
        }
        @keyframes circuit-flow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        @keyframes rain {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        .nav-orb {
          transition: all 0.3s ease;
          background: radial-gradient(circle, var(--glow-color) 20%, transparent 70%);
          border: none;
          box-shadow: 0 0 15px var(--glow-color);
        }
        .nav-orb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 25px var(--glow-color);
        }
        .nav-orb:active {
          transform: scale(0.9);
          animation: ripple 0.5s ease-out;
        }
        @keyframes ripple {
          0% { box-shadow: 0 0 0 0 var(--glow-color); }
          100% { box-shadow: 0 0 0 20px transparent; }
        }
        .progress-bar {
          background: var(--glow-color);
          animation: glow 2s infinite ease-in-out;
          transition: width 0.8s ease;
        }
        @keyframes glow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        .counter {
          font-family: 'Orbitron', sans-serif;
          letter-spacing: 2px;
          animation: glitch 4s infinite;
          color: var(--glow-color);
          text-shadow: 0 0 10px var(--glow-color);
        }
        @keyframes glitch {
          0%, 100% { transform: translate(0, 0); opacity: 1; }
          2% { transform: translate(2px, -2px); opacity: 0.8; }
          4% { transform: translate(-2px, 2px); opacity: 0.9; }
        }
        .ar-overlay {
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(10, 255, 100, 0.05) 50%,
            transparent 100%
          );
          animation: scan 3s infinite linear;
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @media (max-width: 640px) {
          .carousel-container {
            max-width: 320px;
          }
          .card {
            flex: 0 0 320px;
            height: 500px;
          }
        }
        @media (max-width: 1024px) {
          .carousel-container {
            max-width: 900px;
          }
          .card {
            flex: 0 0 400px;
            height: 550px;
          }
        }
      `}</style>

      <div
        className="carousel-container mx-auto relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
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
          style={{ width: `${cardsData.length * (cardWidth + gap)}px` }}
        >
          {cardsData.map((card, index) => {
            const isActive = Math.abs(currentIndex - index) < visibleCards;
            return (
              <div
                key={card.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`card ${isActive ? 'active' : ''}`}
                style={{ '--glow-color': card.color }}
              >
                <div
                  className="card-inner relative"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (centerY - y) / 20;
                    const rotateY = (x - centerX) / 20;
                    e.currentTarget.style.transform = `
                      perspective(1200px)
                      rotateX(${rotateX}deg)
                      rotateY(${rotateY}deg)
                      scale(1.1)
                    `;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'perspective(1200px) scale(1)';
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-3/5 object-cover"
                    style={{ filter: 'contrast(1.2) saturate(1.3) brightness(0.9)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <h3
                      className="text-3xl font-bold text-white"
                      style={{ textShadow: `0 0 12px ${card.color}` }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-300 mt-3">{card.description}</p>
                    <button
                      className="mt-6 px-8 py-3 bg-transparent border-2 border-[var(--glow-color)] text-white rounded-full hover:bg-[var(--glow-color)] hover:text-black transition-all duration-300"
                      style={{ boxShadow: `0 0 15px ${card.color}` }}
                    >
                      Explore Now
                    </button>
                  </div>
                  {/* Circuit patterns */}
                  {isActive &&
                    card.circuits.map((circuit) => (
                      <div
                        key={circuit.id}
                        className="circuit"
                        style={{
                          top: `${circuit.offset}%`,
                          '--duration': `${circuit.duration}s`,
                          boxShadow: `0 0 8px hsl(${circuit.hue}, 100%, 70%)`,
                        }}
                      />
                    ))}
                  {/* AR overlay */}
                  {isActive && (
                    <div className="ar-overlay absolute inset-0 pointer-events-none" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation orbs */}
        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              prev - 1 < 0 ? cardsData.length - visibleCards : prev - 1
            )
          }
          className="nav-orb absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full z-50"
          style={{ '--glow-color': cardsData[currentIndex].color }}
        >
          <svg className="w-6 h-6 m-auto" fill="none" stroke="white" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              prev + 1 >= cardsData.length - visibleCards + 1 ? 0 : prev + 1
            )
          }
          className="nav-orb absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full z-50"
          style={{ '--glow-color': cardsData[currentIndex].color }}
        >
          <svg className="w-6 h-6 m-auto" fill="none" stroke="white" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Progress indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 z-50">
          <span className="counter text-lg">
            {String(currentIndex + 1).padStart(2, '0')}/{String(cardsData.length).padStart(2, '0')}
          </span>
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
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

export default AdvancedCardCarousel;