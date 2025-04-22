"use client";
import React, { useRef, useEffect, useState } from 'react';

const cardsData = [
  { id: 1, title: 'Discover Nature', description: 'Explore breathtaking landscapes and natural wonders.', image: 'https://img.freepik.com/premium-photo/business-people-working-office_1048944-30369177.jpg' },
  { id: 2, title: 'Tech Innovation', description: 'Experience cutting-edge technology solutions.', image: 'https://img.freepik.com/premium-photo/business-team-coffee-break-relax-concept_265022-76173.jpg' },
  { id: 3, title: 'Creative Arts', description: 'Unleash your artistic potential with our tools.', image: 'https://img.freepik.com/premium-photo/data-center-male-it-technician-running-maintenance-programme-laptop-controls-operational-server-rack-optimal-functioning-modern-hightech-telecommunications-operational-super-computer_861143-2681.jpg' },
  { id: 4, title: 'Adventure Travel', description: 'Embark on thrilling adventures worldwide.', image: 'https://img.freepik.com/premium-photo/low-angle-fish-eye-shot-garden-city-skyscraper-singapore_76964-36271.jpg' },
  { id: 5, title: 'Future Cities', description: 'Discover smart urban living solutions.', image: 'https://img.freepik.com/free-photo/person-doing-day-day-activity-while-waring-string-finger-remember-something-important_23-2151062313.jpg' },
  { id: 6, title: 'Space Exploration', description: 'Journey to the stars with our programs.', image: 'https://img.freepik.com/free-photo/side-view-handsome-young-caucasian-freelancer-student-sitting-cafe-table-with-open-laptop-pc-holding-mobile-phone-listening-music-earphones-using-online-app-during-breakfast_273609-1947.jpg?w=1060&t=st=1709041994~exp=1709042594~hmac=67d37791d13209db401bb22aa8eacdc19489091eb9c26f6ce39255bcab23d5f2' },
];

const RingCardCarousel = () => {
  const ringRef = useRef(null);
  const cardRefs = useRef([]);
  const containerRef = useRef(null);
  const [rotationY, setRotationY] = useState(180);
  const [isDragging, setIsDragging] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [lastX, setLastX] = useState(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const cardAngle = 360 / cardsData.length;
  const cardWidth = 300;
  const zDistance = 500;
  const animationFrameId = useRef(null);

  useEffect(() => {
    const cards = cardRefs.current;
    const ring = ringRef.current;

    // Initial setup
    ring.style.transform = `rotateY(${rotationY}deg)`;
    cards.forEach((card, i) => {
      card.style.transform = `rotateY(${i * -cardAngle}deg) translateZ(-${zDistance}px)`;
      card.style.backgroundImage = `url(${cardsData[i].image})`;
      card.style.backgroundSize = 'cover';
      card.style.backgroundRepeat = 'no-repeat';
      card.style.backfaceVisibility = 'hidden';
      card.style.opacity = '0';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Staggered fade-in
    let delay = 0;
    cards.forEach((card, i) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = `rotateY(${i * -cardAngle}deg) translateZ(-${zDistance}px)`;
      }, delay);
      delay += 100;
    });

    // Auto-rotation
    const autoRotate = () => {
      if (isAutoRotating && !isDragging) {
        setRotationY((prev) => {
          const newRot = (prev + 0.1) % 360;
          ring.style.transform = `rotateY(${newRot}deg)`;
          updateBgPositions(newRot);
          return newRot;
        });
      }
      animationFrameId.current = requestAnimationFrame(autoRotate);
    };
    animationFrameId.current = requestAnimationFrame(autoRotate);

    // Cleanup
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isAutoRotating]);

  useEffect(() => {
    const cards = cardRefs.current;
    const ring = ringRef.current;

    // Hover effects
    const handleMouseEnter = (e) => {
      const current = e.currentTarget;
      cards.forEach((card) => {
        card.style.opacity = card === current ? '1' : '0.5';
        card.style.transform = `scale(${card === current ? 1.1 : 1}) rotateY(${parseInt(card.style.transform.split('rotateY(')[1].split('deg)')[0])}deg) translateZ(-${zDistance}px)`;
      });
    };

    const handleMouseLeave = () => {
      cards.forEach((card) => {
        card.style.opacity = '1';
        card.style.transform = card.style.transform.replace(/scale\([^)]+\)/, 'scale(1)');
      });
    };

    cards.forEach((card) => {
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    // Drag with inertia
    const handleDragStart = (e) => {
      e.preventDefault();
      if (e.touches) e.clientX = e.touches[0].clientX;
      setLastX(e.clientX);
      setIsDragging(true);
      setVelocity(0);
      ring.style.transition = 'none';
      setIsAutoRotating(false);
    };

    const handleDragMove = (e) => {
      if (!isDragging || !lastX) return;
      if (e.touches) e.clientX = e.touches[0].clientX;
      const delta = (e.clientX - lastX) / 5;
      setRotationY((prev) => {
        const newRot = (prev - delta) % 360;
        ring.style.transform = `rotateY(${newRot < 0 ? newRot + 360 : newRot}deg)`;
        updateBgPositions(newRot);
        setVelocity(delta * 0.1); // Calculate velocity
        setLastX(e.clientX);
        return newRot;
      });
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      ring.style.transition = 'transform 0.7s ease-out';
      setIsAutoRotating(true);
      // Inertia effect
      let inertiaRot = rotationY;
      const animateInertia = () => {
        if (Math.abs(velocity) > 0.1) {
          inertiaRot += velocity;
          ring.style.transform = `rotateY(${inertiaRot % 360}deg)`;
          updateBgPositions(inertiaRot % 360);
          requestAnimationFrame(animateInertia);
        } else {
          // Snap to nearest card
          const snapTo = Math.round(inertiaRot / cardAngle) * cardAngle;
          let currentRot = inertiaRot % 360;
          const animateSnap = () => {
            if (Math.abs(currentRot - snapTo) > 0.5) {
              currentRot += (snapTo - currentRot) * 0.1;
              ring.style.transform = `rotateY(${currentRot}deg)`;
              updateBgPositions(currentRot);
              requestAnimationFrame(animateSnap);
            } else {
              setRotationY(snapTo);
              ring.style.transform = `rotateY(${snapTo}deg)`;
              updateBgPositions(snapTo);
            }
          };
          requestAnimationFrame(animateSnap);
        }
      };
      requestAnimationFrame(animateInertia);
    };

    containerRef.current.addEventListener('mousedown', handleDragStart);
    containerRef.current.addEventListener('touchstart', handleDragStart, { passive: true });
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('touchmove', handleDragMove, { passive: true });
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchend', handleDragEnd);

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
      containerRef.current.removeEventListener('mousedown', handleDragStart);
      containerRef.current.removeEventListener('touchstart', handleDragStart);
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [rotationY, isDragging]);

  const getBgPos = (i) => {
    return `${100 - ((rotationY - 180 - i * cardAngle) % 360) / 360 * 500}px 0px`;
  };

  const updateBgPositions = (rot) => {
    cardRefs.current.forEach((card, i) => {
      card.style.backgroundPosition = getBgPos(i);
    });
  };

  return (
    <div className="stage" style={{ width: '100%', height: '100vh', overflow: 'hidden', background: '#000', position: 'relative' }}>
      <div
        ref={containerRef}
        className="container"
        style={{
          perspective: '2000px',
          width: '600px',
          height: '400px',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        onMouseEnter={() => setIsAutoRotating(false)}
        onMouseLeave={() => setIsAutoRotating(true)}
      >
        <div
          ref={ringRef}
          className="ring"
          style={{
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            position: 'absolute',
          }}
        >
          {cardsData.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => (cardRefs.current[i] = el)}
              className="img"
              style={{
                width: `${cardWidth}px`,
                height: '100%',
                position: 'absolute',
                transformStyle: 'preserve-3d',
                userSelect: 'none',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-200">
                <img src={card.image} alt={card.title} className="w-full h-56 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{card.title}</h3>
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed">{card.description}</p>
                  <button className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300">
                    Explore Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RingCardCarousel;