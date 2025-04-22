"use client";
import React, { useState, useEffect, useRef } from 'react';

// Particle generator with deterministic values
const generateParticles = (count, color) => {
  const hue = parseInt(color.slice(1), 3, 16); // Extract hue from hex color
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: 2 + (i % 3),
    angle: (i * 360) / count,
    distance: 30 + (i % 2) * 15,
    hue: (hue + i * 10) % 360,
    duration: 3 + (i % 3),
  }));
};

const cardsData = [
  {
    id: 1,
    title: 'Quantum Interface',
    description: 'Next-gen neural connectivity for seamless integration',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    color: '#3b82f6',
    particles: 12,
  },
  {
    id: 2,
    title: 'Holographic Display',
    description: 'True 3D projection without glasses',
    image: 'https://img.freepik.com/premium-photo/business-team-coffee-break-relax-concept_265022-76173.jpg',
    color: '#ec4899',
    particles: 10,
  },
  {
    id: 3,
    title: 'Neural Network',
    description: 'AI systems that learn and adapt in real-time',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    color: '#10b981',
    particles: 14,
  },
  {
    id: 4,
    title: 'Bio-Enhancement',
    description: 'Augment your physical capabilities',
    image: 'https://img.freepik.com/premium-photo/data-center-male-it-technician-running-maintenance-programme-laptop-controls-operational-server-rack-optimal-functioning-modern-hightech-telecommunications-operational-super-computer_861143-2681.jpg',
    color: '#f59e0b',
    particles: 11,
  },
  {
    id: 5,
    title: 'Nano-Fabrication',
    description: 'Molecular-scale manufacturing',
    image: 'https://img.freepik.com/free-photo/people-working-together-medium-shot_52683-99762.jpg',
    color: '#8b5cf6',
    particles: 13,
  },
].map(card => ({
  ...card,
  particles: generateParticles(card.particles, card.color)
}));

const CardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);
  const cardWidth = 350;
  const cardHeight = 500;
  const perspective = 1200;
  const autoplayInterval = 5000;

  // Auto-scroll with pause on hover
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentIndex(prev => (prev + 1) % cardsData.length);
      }
    }, autoplayInterval);
    return () => clearInterval(interval);
  }, [isDragging]);

  // Apply 3D transforms
  useEffect(() => {
    if (!carouselRef.current) return;

    const centerIndex = currentIndex;
    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const distance = index - centerIndex;
      const absDistance = Math.abs(distance);
      const z = -absDistance * 100;
      const scale = 1 - absDistance * 0.1;
      const opacity = 1 - absDistance * 0.3;
      const rotationY = distance * 15;

      card.style.transform = `
        translateX(${distance * cardWidth * 0.8}px)
        translateZ(${z}px)
        rotateY(${rotationY}deg)
        scale(${scale})
      `;
      card.style.opacity = opacity;
      card.style.zIndex = cardsData.length - absDistance;
    });
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % cardsData.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + cardsData.length) % cardsData.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Enhanced drag handling with momentum
  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.pageX || e.touches[0].pageX);
    setScrollLeft(carouselRef.current.scrollLeft);
    carouselRef.current.style.cursor = 'grabbing';
    carouselRef.current.style.transition = 'none';
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX || e.touches[0].pageX;
    const walk = (x - startX) * 1.5; // Scroll-fast factor
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    carouselRef.current.style.cursor = 'grab';
    carouselRef.current.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

    const x = e.pageX || (e.changedTouches && e.changedTouches[0].pageX);
    if (!x) return;

    const diff = startX - x;
    const threshold = cardWidth / 3;

    if (diff > threshold) {
      nextSlide();
    } else if (diff < -threshold) {
      prevSlide();
    }
  };

  // 3D hover effect
  const handleMouseMove = (e, card) => {
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (centerY - y) / 20;
    const rotateY = (x - centerX) / 20;

    card.style.transform += ` rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (card) => {
    if (card) {
      card.style.transform = card.style.transform.replace(/rotateX\(.*?deg\) rotateY\(.*?deg\)/, '');
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-900 overflow-hidden flex items-center justify-center p-4">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
      </div>

      {/* Main carousel container */}
      <div className="relative w-full max-w-6xl h-[600px] perspective-1200 overflow-visible">
        {/* Carousel track */}
        <div
          ref={carouselRef}
          className="absolute top-1/2 left-1/2 w-full h-[500px] transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {cardsData.map((card, index) => (
            <div
              key={card.id}
              ref={el => cardRefs.current[index] = el}
              className={`absolute w-[${cardWidth}px] h-[${cardHeight}px] rounded-2xl overflow-hidden cursor-grab transition-all duration-800 ease-out ${
                isDragging ? 'transition-none' : ''
              }`}
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                transformOrigin: 'center center',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: index === currentIndex 
                  ? `0 0 40px ${card.color}80` 
                  : `0 0 20px ${card.color}40`,
              }}
              onMouseMove={(e) => handleMouseMove(e, cardRefs.current[index])}
              onMouseLeave={() => handleMouseLeave(cardRefs.current[index])}
            >
              <div className="relative w-full h-full">
                {/* Image with gradient overlay */}
                <div className="relative w-full h-3/5 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    style={{ filter: 'contrast(1.1) saturate(1.2)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ textShadow: `0 0 10px ${card.color}` }}>
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-300 mb-4">{card.description}</p>
                  <button
                    className="px-6 py-2 bg-transparent border border-white/30 text-white rounded-full hover:bg-white/10 transition-all"
                    style={{ boxShadow: `0 0 15px ${card.color}` }}
                  >
                    Explore
                  </button>
                </div>

                {/* Particles */}
                {card.particles.map(particle => (
                  <div
                    key={particle.id}
                    className="absolute top-1/2 left-1/2 rounded-full"
                    style={{
                      width: `${particle.size}px`,
                      height: `${particle.size}px`,
                      background: `hsl(${particle.hue}, 100%, 70%)`,
                      boxShadow: `0 0 ${particle.size * 2}px hsl(${particle.hue}, 100%, 70%)`,
                      transform: `rotate(${particle.angle}deg) translateX(${particle.distance}px)`,
                      animation: `orbit ${particle.duration}s infinite linear`,
                      opacity: index === currentIndex ? 0.8 : 0.3,
                    }}
                  />
                ))}

                {/* Active card glow */}
                {index === currentIndex && (
                  <div 
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 50px ${card.color}40`,
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-md border border-white/20 text-white p-4 rounded-full z-50 hover:bg-white/10 transition-all"
          style={{ boxShadow: `0 0 15px ${cardsData[currentIndex].color}` }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-md border border-white/20 text-white p-4 rounded-full z-50 hover:bg-white/10 transition-all"
          style={{ boxShadow: `0 0 15px ${cardsData[currentIndex].color}` }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
          <span className="text-sm text-white/70 font-mono">
            {String(currentIndex + 1).padStart(2, '0')}/{String(cardsData.length).padStart(2, '0')}
          </span>
          <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-current"
              style={{
                width: `${((currentIndex + 1) / cardsData.length) * 100}%`,
                color: cardsData[currentIndex].color,
                transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(var(--distance)) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(var(--distance)) rotate(-360deg); }
        }
        .perspective-1200 {
          perspective: 1200px;
        }
      `}</style>
    </div>
  );
};

export default CardCarousel;