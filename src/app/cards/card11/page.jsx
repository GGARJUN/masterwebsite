"use client";
import React, { useState, useEffect, useRef } from 'react';

// Particle generator with deterministic values
const generateParticles = (count, color) => {
  const hue = parseInt(color.slice(1), 16) % 360; // Extract hue from hex color
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: 3 + (i % 2),
    angle: (i * 360) / count,
    distance: 50 + (i % 3) * 10,
    hue: (hue + i * 15) % 360,
    duration: 2.5 + (i % 2) * 1,
    arc: i % 2 ? 45 : -45, // Arc direction for particle trails
  }));
};

const cardsData = [
  {
    id: 1,
    title: 'Quantum Interface',
    description: 'Next-gen neural connectivity for seamless integration',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    color: '#ff6b6b', // Neon Red
    particles: 10,
  },
  {
    id: 2,
    title: 'Holographic Display',
    description: 'True 3D projection without glasses',
    image: 'https://img.freepik.com/premium-photo/business-team-coffee-break-relax-concept_265022-76173.jpg',
    color: '#4ecdc4', // Neon Cyan
    particles: 8,
  },
  {
    id: 3,
    title: 'Neural Network',
    description: 'AI systems that learn and adapt in real-time',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    color: '#ffce44', // Neon Yellow
    particles: 12,
  },
  {
    id: 4,
    title: 'Bio-Enhancement',
    description: 'Augment your physical capabilities',
    image: 'https://img.freepik.com/premium-photo/data-center-male-it-technician-running-maintenance-programme-laptop-controls-operational-server-rack-optimal-functioning-modern-hightech-telecommunications-operational-super-computer_861143-2681.jpg',
    color: '#a56eff', // Neon Purple
    particles: 9,
  },
  {
    id: 5,
    title: 'Nano-Fabrication',
    description: 'Molecular-scale manufacturing',
    image: 'https://img.freepik.com/free-photo/people-working-together-medium-shot_52683-99762.jpg',
    color: '#45b7d1', // Neon Blue
    particles: 11,
  },
].map(card => ({
  ...card,
  particles: generateParticles(card.particles, card.color),
}));

const CardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);
  const cardWidth = 320;
  const cardHeight = 480;
  const radius = 500; // Radius of the helical orbit
  const autoplayInterval = 4000;

  // Auto-rotate
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % cardsData.length);
      }, autoplayInterval);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  // Apply helical transforms
  useEffect(() => {
    if (!carouselRef.current) return;
    const angleStep = 360 / cardsData.length;
    const heightStep = cardHeight / cardsData.length;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const angle = (index - currentIndex) * angleStep;
      const yOffset = (index - currentIndex) * heightStep;
      const x = Math.sin((angle * Math.PI) / 180) * radius;
      const z = Math.cos((angle * Math.PI) / 180) * radius;
      const isActive = index === currentIndex;
      const scale = isActive ? 1.1 : 0.9;
      const opacity = isActive ? 1 : 0.7;
      const zIndex = isActive ? cardsData.length : cardsData.length - Math.abs(index - currentIndex);

      card.style.transform = `
        translateX(${x}px)
        translateY(${yOffset}px)
        translateZ(${z}px)
        rotateY(${-angle}deg)
        scale(${scale})
      `;
      card.style.opacity = opacity;
      card.style.zIndex = zIndex;
    });
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

  // Drag support with momentum
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
    const diff = (dragStart - currentX) * 0.3; // Adjusted sensitivity
    const angle = -(currentIndex * (360 / cardsData.length)) + diff;
    carouselRef.current.style.transform = `rotateY(${angle}deg)`;
  };

  const handleDragEnd = (e) => {
    if (dragStart === null || !carouselRef.current) return;
    const currentX = e.clientX || (e.changedTouches ? e.changedTouches[0].clientX : dragStart);
    const diff = dragStart - currentX;
    carouselRef.current.style.transition = 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';

    if (diff > 60) {
      nextSlide();
    } else if (diff < -60) {
      prevSlide();
    } else {
      carouselRef.current.style.transform = `rotateY(${-currentIndex * (360 / cardsData.length)}deg)`;
    }

    setDragStart(null);
    setIsPaused(false);
  };

  // Hover tilt effect
  const handleMouseMove = (e, card) => {
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (centerY - y) / 15;
    const rotateY = (x - centerX) / 15;

    card.style.transform += ` rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.15)`;
  };

  const handleMouseLeave = (card) => {
    if (card) {
      card.style.transform = card.style.transform.replace(/rotateX\(.*?deg\) rotateY\(.*?deg\) scale\(.*?\)/, '');
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-black flex items-center justify-center p-6 overflow-hidden">
      {/* Neon wave background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] opacity-50" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJ3YXZlIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjIwMCIgcGF0dGVybkNvbXBvbmVudHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNMCwwIEwxMCwxMCBDMzAsMzAsNzAsLTEwLDEwMCw1MCBDMTMwLDExMCwxNzAsMTUwLDIwMCwxMzAgQzIzMCwxMTAsMjcwLDcwLDMwMCwxMzAgQzMzMCwxOTAsMzcwLDIzMCw0MDAsMjEwIEw0MDAsMjAwIEwwLDIwMCBaIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCN3YXZlKSIvPjwvc3ZnPg==')] opacity-20 animate-wave" />

      <style jsx>{`
        .carousel-container {
          perspective: 1200px;
          width: ${cardWidth}px;
          height: ${cardHeight}px;
          transform-style: preserve-3d;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card {
          position: absolute;
          width: ${cardWidth}px;
          height: ${cardHeight}px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
          border: 2px solid var(--glow-color);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.5s ease;
          transform-style: preserve-3d;
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
        }
        .particle {
          position: absolute;
          border-radius: 50%;
          animation: arc-orbit var(--duration) infinite ease-in-out;
        }
        @keyframes arc-orbit {
          0% { transform: rotate(0deg) translateX(var(--distance)) rotate(0deg); }
          50% { transform: rotate(var(--arc)) translateX(var(--distance)) rotate(-var(--arc)); }
          100% { transform: rotate(0deg) translateX(var(--distance)) rotate(0deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes wave {
          0% { background-position: 0 0; }
          100% { background-position: 100px 200px; }
        }
        .nav-button {
          transition: all 0.3s ease;
          border: 2px solid var(--glow-color);
        }
        .nav-button:hover {
          transform: scale(1.2);
          background: var(--glow-color);
          box-shadow: 0 0 20px var(--glow-color);
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
        .dot {
          transition: all 0.3s ease;
        }
        .dot:hover {
          transform: scale(1.5);
        }
        .dot.active {
          background: var(--glow-color);
          transform: scale(1.5);
        }
      `}</style>

      {/* Main carousel container */}
      <div className="relative w-full max-w-4xl h-[600px] flex items-center justify-center">
        <div
          ref={carouselRef}
          className="carousel-container"

          
        >
          {cardsData.map((card, index) => {
            const isActive = index === currentIndex;
            const cardRef = useRef(null);
            cardRefs.current[index] = cardRef.current;

            return (
              <div
                key={card.id}
                ref={cardRef}
                className="card"
                style={{
                  '--glow-color': card.color,
                }}

              >
                <div className="relative w-full h-full">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-2/3 object-cover"
                    style={{ filter: 'contrast(1.2) saturate(1.3)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3
                      className="text-2xl font-bold text-white"
                      style={{ textShadow: `0 0 10px ${card.color}` }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-300 mt-2">{card.description}</p>
                    <button
                      className="mt-4 px-6 py-2 bg-transparent border border-white/50 text-white rounded-full hover:bg-white/20 transition-all"
                      style={{ boxShadow: `0 0 15px ${card.color}` }}
                    >
                      Explore
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
                        '--arc': `${particle.arc}deg`,
                        opacity: isActive ? 0.9 : 0.4,
                      }}
                    />
                  ))}
                  {/* Holographic overlay */}
                  {isActive && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at center, ${card.color}20 0%, transparent 70%)`,
                        animation: 'pulse 2s infinite',
                      }}
                    />
                  )}
                </div>
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

        {/* Progress bar and dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-50">
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="progress-bar h-full"
              style={{
                width: `${((currentIndex + 1) / cardsData.length) * 100}%`,
                '--glow-color': cardsData[currentIndex].color,
              }}
            />
          </div>
          <div className="flex gap-2">
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
      </div>
    </div>
  );
};

export default CardCarousel;