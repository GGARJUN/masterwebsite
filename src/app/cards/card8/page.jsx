"use client";
import React, { useState, useEffect, useRef } from 'react';

// Precompute particle data for deterministic rendering
const generateParticles = (count) =>
  Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: 3 + (i % 3),
    angle: (i * 360) / count,
    distance: 50 + (i % 2) * 20,
    hue: 180 + (i % 3) * 30,
    duration: 4 + (i % 3),
  }));

const cardsData = [
  { 
    id: 1, 
    title: 'Quantum Leap', 
    description: 'Experience next-gen technology that redefines possibilities', 
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    color: 'cyan',
    particles: generateParticles(12),
  },
  { 
    id: 2, 
    title: 'Neon Dreams', 
    description: 'Immerse yourself in vibrant digital landscapes', 
    image: 'https://img.freepik.com/premium-photo/business-team-coffee-break-relax-concept_265022-76173.jpg',
    color: 'magenta',
    particles: generateParticles(10),
  },
  { 
    id: 3, 
    title: 'Cyber Nexus', 
    description: 'Connect to the future with our neural interface', 
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    color: 'lime',
    particles: generateParticles(14),
  },
  { 
    id: 4, 
    title: 'Hologram Reality', 
    description: 'Step into augmented dimensions of existence', 
    image: 'https://img.freepik.com/premium-photo/data-center-male-it-technician-running-maintenance-programme-laptop-controls-operational-server-rack-optimal-functioning-modern-hightech-telecommunications-operational-super-computer_861143-2681.jpg',
    color: 'violet',
    particles: generateParticles(11),
  },
  { 
    id: 5, 
    title: 'Data Matrix', 
    description: 'Navigate the streams of infinite information', 
    image: 'https://img.freepik.com/free-photo/people-working-together-medium-shot_52683-99762.jpg',
    color: 'orange',
    particles: generateParticles(13),
  },
];

const CardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const carouselRef = useRef(null);
  const cardWidth = 320;
  const cardHeight = 480;
  const radius = 600; // Radius of the circular carousel
  const transitionDuration = 800; // ms

  // Auto-rotate
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % cardsData.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  // Smooth rotation
  useEffect(() => {
    if (carouselRef.current) {
      const angle = -(currentIndex * 360) / cardsData.length;
      carouselRef.current.style.transform = `rotateY(${angle}deg)`;
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
    setDragStart(e.clientX || e.touches[0].clientX);
    setIsPaused(true);
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'none';
    }
  };

  const handleDragMove = (e) => {
    if (dragStart === null || !carouselRef.current) return;
    const currentX = e.clientX || (e.touches ? e.touches[0].clientX : dragStart);
    const diff = (dragStart - currentX) * 0.2; // Sensitivity adjustment
    const angle = -(currentIndex * 360) / cardsData.length + diff;
    carouselRef.current.style.transform = `rotateY(${angle}deg)`;
  };

  const handleDragEnd = (e) => {
    if (dragStart === null || !carouselRef.current) return;
    const currentX = e.clientX || (e.changedTouches ? e.changedTouches[0].clientX : dragStart);
    const diff = dragStart - currentX;
    carouselRef.current.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    } else {
      const angle = -(currentIndex * 360) / cardsData.length;
      carouselRef.current.style.transform = `rotateY(${angle}deg)`;
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
    const rotateY = (x - centerX) / 15;
    const rotateX = (centerY - y) / 15;

    cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = (cardRef) => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-800 flex items-center justify-center p-4 overflow-hidden">
      {/* Background with subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />

      <style jsx>{`
        .carousel-container {
          perspective: 1200px;
          width: ${cardWidth}px;
          height: ${cardHeight}px;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card {
          position: absolute;
          width: ${cardWidth}px;
          height: ${cardHeight}px;
          transform-style: preserve-3d;
          transition: all 0.5s ease;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }
        .card:hover {
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
        }
        .light-trail {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to right,
            transparent,
            var(--glow-color) 50%,
            transparent
          );
          opacity: 0.3;
          animation: trail 2s infinite linear;
        }
        @keyframes trail {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
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
        .nav-button {
          transition: all 0.3s ease;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }
        .nav-button:hover {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 15px var(--glow-color);
        }
        .nav-button:active {
          transform: scale(0.9);
        }
        .progress-ring {
          stroke: var(--glow-color);
          stroke-dasharray: 283;
          stroke-dashoffset: calc(283 - (283 * var(--progress)) / 100);
          transition: stroke-dashoffset 0.8s ease;
        }
      `}</style>

      {/* Main carousel container */}
      <div className="relative w-full max-w-4xl h-[600px] flex items-center justify-center">
        <div
          ref={carouselRef}
          className="carousel-container relative"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          onMouseEnter={() => setIsPaused(true)}
          
        >
          {cardsData.map((card, index) => {
            const angle = (index * 360) / cardsData.length;
            const isActive = index === currentIndex;
            const zIndex = isActive ? cardsData.length : cardsData.length - Math.abs(index - currentIndex);
            const scale = isActive ? 0.7 : 0.9;
            const opacity = isActive ? 1 : 0.1;
            const cardRef = useRef(null);

            return (
              <div
                key={card.id}
                ref={cardRef}
                className="card"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px) scale(${scale})`,
                  opacity,
                  zIndex,
                  background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))`,
                  border: `1px solid ${card.color}`,
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
                    style={{ filter: 'contrast(1.2)' }}
                  />
                  <div className="light-trail" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                    <p className="text-sm text-gray-300 mt-2">{card.description}</p>
                    <button
                      className="mt-4 px-6 py-2 bg-transparent border border-white/50 text-white rounded-full hover:bg-white/10 transition-all"
                    >
                      Explore
                    </button>
                  </div>
                </div>
                {/* Card-specific particles */}
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
            );
          })}
        </div>

        {/* Navigation controls */}
        <button
          onClick={prevSlide}
          className="nav-button absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full z-50"
          style={{ '--glow-color': cardsData[currentIndex].color }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="nav-button absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full z-50"
          style={{ '--glow-color': cardsData[currentIndex].color }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Progress ring */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
          <svg width="60" height="60" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={cardsData[currentIndex].color}
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset={`${283 - (283 * ((currentIndex + 1) / cardsData.length))}`}
              style={{
                transition: `stroke-dashoffset ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CardCarousel;