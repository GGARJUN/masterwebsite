"use client";
import React, { useState, useEffect, useRef } from 'react';

const CardCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const carouselRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  const cards = [
    {
      id: 1,
      title: "Quantum Leap",
      description: "Experience next-gen technology with our quantum computing solutions",
      color: "#00f0ff",
      icon: "⚛️",
      particles: 50
    },
    {
      id: 2,
      title: "Neural Networks",
      description: "AI-powered solutions for your business needs",
      color: "#ff00aa",
      icon: "🧠",
      particles: 60
    },
    {
      id: 3,
      title: "Cyber Security",
      description: "Protect your assets with military-grade encryption",
      color: "#aa00ff",
      icon: "🔒",
      particles: 40
    },
    {
      id: 4,
      title: "Virtual Reality",
      description: "Immerse yourself in new digital worlds",
      color: "#00ff88",
      icon: "👓",
      particles: 70
    },
    {
      id: 5,
      title: "Blockchain",
      description: "Decentralized solutions for modern problems",
      color: "#ffcc00",
      icon: "⛓️",
      particles: 55
    }
  ];

  // Particle system
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const activeCard = cards[activeIndex];
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    particlesRef.current = Array.from({ length: activeCard.particles }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 2 - 1,
      speedY: Math.random() * 2 - 1,
      color: activeCard.color,
      opacity: Math.random() * 0.5 + 0.1
    }));

    // Animation loop
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around screen edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      });

      // Connect particles with lines
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `${activeCard.color}${Math.floor((1 - distance/150) * 50).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [activeIndex]);

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % cards.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Calculate card positions in 3D space
  const getCardStyle = (index) => {
    const angle = (index / cards.length) * Math.PI * 2;
    const radius = 600;
    const activeAngle = (activeIndex / cards.length) * -Math.PI * 2;
    
    const x = Math.cos(angle + activeAngle) * radius;
    const z = Math.sin(angle + activeAngle) * radius - 500;
    const scale = 1 - Math.abs(z) / 2000;
    const opacity = 1 - Math.abs(z) / 1000;
    const rotationY = (angle + activeAngle) * (180 / Math.PI);
    
    // Add mouse parallax effect
    const parallaxX = mousePosition.x * 50 * (1 - scale);
    const parallaxY = mousePosition.y * 30 * (1 - scale);
    
    return {
      transform: `
        translateX(calc(50% + ${x + parallaxX}px))
        translateY(${parallaxY}px)
        translateZ(${z}px)
        rotateY(${rotationY}deg)
        scale(${scale})
      `,
      opacity: Math.max(0.2, opacity),
      zIndex: Math.floor(scale * 100),
      filter: `blur(${(1 - scale) * 3}px)`,
      '--card-color': cards[index].color
    };
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Particle canvas */}
      <canvas 
        ref={particleCanvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      
      {/* Glow effect */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${cards[activeIndex].color} 0%, transparent 70%)`,
          mixBlendMode: 'screen'
        }}
      />
      
      {/* Carousel container */}
      <div 
        ref={carouselRef}
        className="absolute inset-0 flex items-center justify-center perspective-2000 transform-style-preserve-3d"
      >
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="absolute w-80 h-96 transition-transform duration-1000 ease-out"
            style={getCardStyle(index)}
            onClick={() => setActiveIndex(index)}
          >
            <div className="relative w-full h-full bg-gray-800 bg-opacity-50 border border-gray-700 rounded-2xl overflow-hidden transform-style-preserve-3d transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-opacity-70 group">
              {/* Card glow border */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: `0 0 30px 5px ${card.color}`,
                  mixBlendMode: 'plus-lighter'
                }}
              />
              
              {/* Card content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
                <div 
                  className="text-6xl mb-6 transition-transform duration-500 group-hover:scale-125"
                  style={{ filter: `drop-shadow(0 0 10px ${card.color})` }}
                >
                  {card.icon}
                </div>
                <h3 
                  className="text-2xl font-bold text-white mb-3 transition-all duration-300 group-hover:text-transparent bg-clip-text"
                  style={{ backgroundImage: `linear-gradient(to right, ${card.color}, white)` }}
                >
                  {card.title}
                </h3>
                <p className="text-gray-300 mb-6">{card.description}</p>
                <button 
                  className="px-6 py-2 rounded-full bg-transparent border border-gray-600 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 hover:border-transparent"
                  style={{ boxShadow: `0 0 15px ${card.color}` }}
                >
                  Learn More
                </button>
              </div>
              
              {/* Circuit pattern */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div 
                    key={i}
                    className="absolute h-px bg-white rounded-full"
                    style={{
                      width: `${Math.random() * 100 + 50}%`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      transform: `rotate(${Math.random() * 360}deg)`,
                      background: `linear-gradient(to right, transparent, ${card.color}, transparent)`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation dots */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3 z-50">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex ? 'scale-150' : 'scale-100'}`}
            style={{
              backgroundColor: index === activeIndex ? cards[activeIndex].color : 'rgba(255,255,255,0.3)',
              boxShadow: index === activeIndex ? `0 0 10px ${cards[activeIndex].color}` : 'none'
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Active card indicator */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-white text-lg font-mono tracking-widest z-50">
        <span className="opacity-50">0{activeIndex + 1}</span>
        <span className="mx-2 opacity-30">/</span>
        <span className="opacity-30">0{cards.length}</span>
      </div>
      
      {/* Custom styles */}
      <style jsx global>{`
        html, body {
          overflow: hidden;
        }
        .perspective-2000 {
          perspective: 2000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};

export default CardCarousel;