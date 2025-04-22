"use client";
import React, { useState, useRef, useEffect } from 'react';

const SplitSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideshowLeftRef = useRef(null);
  const slideshowRightRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0",
      text: "Canyon"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
      text: "Desert"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
      text: "Erosion"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1470114716159-e389f8712fda",
      text: "Shape"
    }
  ];

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);

    // Sync left slideshow
    if (slideshowLeftRef.current) {
      slideshowLeftRef.current.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      slideshowLeftRef.current.style.transform = `translateY(${-index * 100}%)`;
    }

    // Sync right slideshow (reversed)
    const rightIndex = slides.length - 1 - index;
    if (slideshowRightRef.current) {
      slideshowRightRef.current.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      slideshowRightRef.current.style.transform = `translateY(${-rightIndex * 100}%)`;
    }

    // Sync text
    if (textRef.current) {
      textRef.current.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      textRef.current.style.transform = `translateY(${-index * 100}%)`;
    }

    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (isTransitioning) return;

    if (e.deltaY > 0) {
      // Scroll down - go to next slide
      goToSlide((currentSlide + 1) % slides.length);
    } else if (e.deltaY < 0) {
      // Scroll up - go to previous slide
      goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }
  };

  useEffect(() => {
    // Initialize positions
    goToSlide(0);

    // Add wheel event listener
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  // Update wheel handler when currentSlide changes
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.removeEventListener('wheel', handleWheel);
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
  }, [currentSlide]);

  return (
    <div className="split-slideshow" ref={containerRef}>
      <style jsx>{`
        .split-slideshow {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: #110101;
          font-family: 'Roboto', sans-serif;
          user-select: none;
          touch-action: none;
        }

        .slideshow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }

        .slideshow-left {
          z-index: 2;
        }

        .slideshow-right {
          left: 50%;
          width: 50vw;
          pointer-events: none;
          z-index: 1;
        }

        .slider {
          width: 100%;
          height: 100%;
        }

        .item {
          height: 100vh;
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .item img {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          object-fit: cover;
        }

        .slideshow-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 100;
          font-size: 80px;
          width: 100vw;
          text-align: center;
          color: #fff;
          font-family: 'Roboto Condensed', sans-serif;
          font-weight: 100;
          pointer-events: none;
          text-transform: uppercase;
          letter-spacing: 20px;
          line-height: 0.8;
          height: 100%;
        }

        .slideshow-text .item {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }

        @media (max-width: 767px) {
          .slideshow-text {
            font-size: 40px;
            letter-spacing: 10px;
          }
        }

        .dots {
          position: fixed;
          z-index: 100;
          width: 40px;
          height: auto;
          top: 50%;
          right: 20px;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
        }

        .dot {
          width: 20px;
          height: 2px;
          background: rgba(255, 255, 255, 0.6);
          transition: all 0.3s ease-in-out;
          cursor: pointer;
        }

        .dot.active {
          width: 40px;
          background: rgba(255, 255, 255, 1);
        }

        .dot:hover:not(.active) {
          width: 30px;
          background: rgba(255, 255, 255, 0.8);
        }
      `}</style>

      {/* Left Slideshow */}
      <div className="slideshow slideshow-left">
        <div className="slider" ref={slideshowLeftRef}>
          {slides.map((slide) => (
            <div key={slide.id} className="item">
              <img src={slide.image} alt={slide.text} />
            </div>
          ))}
        </div>
      </div>

      {/* Right Slideshow (reversed) */}
      <div className="slideshow slideshow-right">
        <div className="slider" ref={slideshowRightRef}>
          {[...slides].reverse().map((slide) => (
            <div key={slide.id} className="item">
              <img src={slide.image} alt={slide.text} />
            </div>
          ))}
        </div>
      </div>

      {/* Text */}
      <div className="slideshow-text" ref={textRef}>
        {slides.map((slide) => (
          <div key={slide.id} className="item">{slide.text}</div>
        ))}
      </div>

      {/* Dots Navigation */}
      <div className="dots">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default SplitSlideshow;