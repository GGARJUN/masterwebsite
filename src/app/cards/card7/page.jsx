"use client";
import React, { useState, useEffect, useRef } from 'react';

// Precompute static data to avoid hydration mismatch
const generateGridItems = () => 
  Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    width: 100 + (i % 5) * 50,
    height: 100 + (i % 5) * 50,
    left: `${(i * 7) % 100}%`,
    top: `${(i * 11) % 100}%`,
    rotate: (i * 17) % 360,
    animationIndex: i % 3,
    animationDuration: 10 + (i % 3) * 5,
  }));

const generateParticles = (count) => 
  Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: 2 + (i % 3),
    left: `${(i * 13) % 100}%`,
    top: `${(i * 17) % 100}%`,
    hue: 200 + (i % 3) * 20,
    duration: 2 + (i % 3),
    offsetX: (i % 2 ? 20 : -20),
    offsetY: (i % 3 ? 50 : -50),
  }));

const cardsData = [
  { 
    id: 1, 
    title: 'Quantum Leap', 
    description: 'Experience next-gen technology that redefines possibilities', 
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    color: 'from-fuchsia-600 to-purple-700',
    particles: generateParticles(25),
  },
  { 
    id: 2, 
    title: 'Neon Dreams', 
    description: 'Immerse yourself in vibrant digital landscapes', 
    image: 'https://img.freepik.com/premium-photo/business-team-coffee-break-relax-concept_265022-76173.jpg',
    color: 'from-cyan-500 to-blue-600',
    particles: generateParticles(18),
  },
  { 
    id: 3, 
    title: 'Cyber Nexus', 
    description: 'Connect to the future with our neural interface', 
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    color: 'from-emerald-500 to-teal-600',
    particles: generateParticles(22),
  },
  { 
    id: 4, 
    title: 'Hologram Reality', 
    description: 'Step into augmented dimensions of existence', 
    image: 'https://img.freepik.com/premium-photo/data-center-male-it-technician-running-maintenance-programme-laptop-controls-operational-server-rack-optimal-functioning-modern-hightech-telecommunications-operational-super-computer_861143-2681.jpg',
    color: 'from-rose-500 to-pink-600',
    particles: generateParticles(20),
  },
  { 
    id: 5, 
    title: 'Data Matrix', 
    description: 'Navigate the streams of infinite information', 
    image: 'https://img.freepik.com/free-photo/people-working-together-medium-shot_52683-99762.jpg',
    color: 'from-amber-500 to-orange-600',
    particles: generateParticles(15),
  },
];

const CardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef(null);
  const cardWidth = 480;
  const cardHeight = 600;
  const perspective = 1200;
  const gridItems = useRef(generateGridItems()).current;

  // Auto-rotation effect
  useEffect(() => {
    if (!isHovered && !isDragging) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % cardsData.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isHovered, isDragging]);

  // Handle card transitions
  useEffect(() => {
    if (!carouselRef.current) return;
    
    const updateCardPositions = () => {
      const cards = carouselRef.current.querySelectorAll('.card');
      cards.forEach((card, index) => {
        const distance = Math.abs(index - currentIndex);
        const isActive = index === currentIndex;
        const zIndex = isActive ? cardsData.length : cardsData.length - distance;
        const zPosition = -distance * 100;
        const xPosition = (index - currentIndex) * cardWidth;
        const scale = 1 - distance * 0.1;
        const opacity = 1 - distance * 0.3;
        const rotationY = (index - currentIndex) * 15;

        card.style.transform = `
          translateX(${xPosition}px)
          translateZ(${zPosition}px)
          scale(${scale})
          rotateY(${rotationY}deg)
        `;
        card.style.opacity = opacity;
        card.style.zIndex = zIndex;
        card.style.filter = isActive ? 'none' : 'blur(2px)';
        card.style.boxShadow = isActive 
          ? '0 0 40px rgba(255, 255, 255, 0.3)' 
          : '0 0 20px rgba(255, 255, 255, 0.1)';
      });
    };

    updateCardPositions();
  }, [currentIndex]);

  // Handle mouse interactions
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    resetCarouselPosition();
  };

  const handleMouseMove = (e) => {
    if (!carouselRef.current || isDragging) return;
    
    const rect = carouselRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = (x - centerX) / 40;
    const rotateX = (centerY - y) / 40;

    carouselRef.current.style.transform = `
      perspective(${perspective}px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;

    // Parallax effects for active card
    const activeCard = carouselRef.current.querySelector(`.card-${currentIndex}`);
    if (activeCard) {
      const img = activeCard.querySelector('.card-image');
      const content = activeCard.querySelector('.card-content');
      if (img && content) {
        img.style.transform = `translateX(${(x - centerX) / 20}px) translateY(${(y - centerY) / 20}px) scale(1.1)`;
        content.style.transform = `translateY(${(y - centerY) / 30}px)`;
      }
    }
  };

  const resetCarouselPosition = () => {
    if (!carouselRef.current) return;
    
    carouselRef.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`;
    
    const activeCard = carouselRef.current.querySelector(`.card-${currentIndex}`);
    if (activeCard) {
      const img = activeCard.querySelector('.card-image');
      const content = activeCard.querySelector('.card-content');
      if (img && content) {
        img.style.transform = 'translateX(0) translateY(0) scale(1.1)';
        content.style.transform = 'translateY(0)';
      }
    }
  };

  // Navigation controls
  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % cardsData.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + cardsData.length) % cardsData.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Touch and drag interactions
  const handleDragStart = (e) => {
    setIsDragging(true);
    setIsHovered(true);
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'none';
    }
  };

  const handleDragMove = (e) => {
    if (!isDragging || !carouselRef.current) return;
    
    const clientX = e.clientX || (e.touches?.[0]?.clientX);
    if (!clientX) return;
    
    const rect = carouselRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const diff = centerX - clientX;
    
    carouselRef.current.style.transform = `
      perspective(${perspective}px)
      translateX(${diff}px)
    `;
  };

  const handleDragEnd = (e) => {
    if (!isDragging) return;
    
    setIsDragging(false);
    setIsHovered(false);
    
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    const clientX = e.clientX || (e.changedTouches?.[0]?.clientX);
    if (!clientX) {
      resetCarouselPosition();
      return;
    }

    const rect = carouselRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const diff = centerX - clientX;

    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    } else {
      resetCarouselPosition();
    }
  };

  return (
    <div
      className="relative w-full min-h-screen bg-gray-900 overflow-hidden flex items-center justify-center p-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {gridItems.map(item => (
          <div
            key={item.id}
            className="absolute border border-white/10"
            style={{
              width: `${item.width}px`,
              height: `${item.height}px`,
              left: item.left,
              top: item.top,
              transform: `rotate(${item.rotate}deg)`,
              animation: `float${item.animationIndex} ${item.animationDuration}s infinite linear`,
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {cardsData[currentIndex].particles.map(particle => (
          <div
            key={particle.id}
            className="particle rounded-full particle-float"
            style={{
              '--size': `${particle.size}px`,
              '--hue': particle.hue,
              '--duration': `${particle.duration}s`,
              '--offsetX': `${particle.offsetX}px`,
              '--offsetY': `${particle.offsetY}px`,
            }}
          />
        ))}
      </div>

      {/* Main carousel container */}
      <div className="relative w-full max-w-6xl h-[600px]">
        {/* Carousel track */}
        <div
          ref={carouselRef}
          className="relative w-full h-full"
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
              className={`card card-${index} absolute rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing`}
              style={{
                width: cardWidth,
                height: cardHeight,
                transformOrigin: 'center center',
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s, filter 0.8s, box-shadow 0.8s',
              }}
            >
              <div className={`relative h-full bg-gradient-to-br ${card.color} bg-opacity-20 border border-white/20 rounded-3xl overflow-hidden`}>
                {/* Image with parallax effect */}
                <div className="card-image absolute inset-0 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    style={{
                      transform: 'scale(1.1)',
                      filter: 'brightness(0.8) contrast(1.1)',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </div>
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                
                {/* Glow effect */}
                <div className={`absolute inset-0 opacity-30 bg-gradient-to-br ${card.color} mix-blend-overlay`} />
                
                {/* Content */}
                <div 
                  className="card-content absolute bottom-0 left-0 right-0 p-8"
                  style={{ transition: 'transform 0.3s ease' }}
                >
                  <h3 
                    className="text-4xl font-bold text-white mb-3"
                    style={{
                      opacity: index === currentIndex ? 1 : 0.7,
                      transform: index === currentIndex ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'opacity 0.5s, transform 0.5s',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p 
                    className="text-lg text-gray-200 mb-6"
                    style={{
                      opacity: index === currentIndex ? 1 : 0.5,
                      transform: index === currentIndex ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'opacity 0.5s, transform 0.5s',
                    }}
                  >
                    {card.description}
                  </p>
                  <button
                    className="px-8 py-3 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-full hover:bg-white/20 transition-all"
                    style={{
                      opacity: index === currentIndex ? 1 : 0,
                      transform: index === currentIndex ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'opacity 0.5s, transform 0.5s, background-color 0.3s',
                    }}
                  >
                    Discover Now
                  </button>
                </div>
                
                {/* Holographic effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/50" style={{ filter: 'blur(10px)' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="nav-button absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-black/50 backdrop-blur-md border-2 border-white/20 text-white p-4 rounded-full z-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextSlide}
          className="nav-button absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-black/50 backdrop-blur-md border-2 border-white/20 text-white p-4 rounded-full z-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Navigation dots */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 flex space-x-3 z-50">
          {cardsData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`dot w-3 h-3 rounded-full transition-all ${
                index === currentIndex 
                  ? 'active bg-white scale-150' 
                  : 'bg-white/30 hover:scale-125'
              }`}
            />
          ))}
        </div>

        {/* Current index indicator */}
        <div className="index-indicator absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12 text-white/50 text-sm font-mono">
          {String(currentIndex + 1).padStart(2, '0')} / {String(cardsData.length).padStart(2, '0')}
        </div>
      </div>

      <style jsx global>{`
        @keyframes float0 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(50px, 50px) rotate(10deg); }
        }
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-50px, -50px) rotate(-10deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(25px, -25px) rotate(5deg); }
        }
        .particle {
          position: absolute;
          width: var(--size);
          height: var(--size);
          border-radius: 50%;
          background: hsl(var(--hue), 100%, 70%);
          box-shadow: 0 0 calc(var(--size) * 2) hsl(var(--hue), 100%, 70%);
          animation: particleFloat var(--duration)s infinite ease-in-out alternate;
        }
        @keyframes particleFloat {
          0% { 
            transform: translate(0, 0); 
            opacity: 0.8; 
          }
          100% { 
            transform: translate(var(--offsetX), var(--offsetY)); 
            opacity: 0; 
          }
        }
        .nav-button {
          transition: all 0.3s ease;
        }
        .nav-button:hover {
          transform: scale(1.1);
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
        .nav-button:active {
          transform: scale(0.9);
        }
      `}</style>
    </div>
  );
};

export default CardCarousel;