"use client";
import React, { useState, useEffect, useRef } from 'react';

const testimonialsData = [
  {
    id: 1,
    quote: "We have worked with the guys for the last 5 years. We have always enjoyed their professional and earnest demeanour.",
    author: "Michael Johnson, CEO, Dack Team",
    brands: [
      { id: 1, name: 'Oatly!', image: 'https://img.freepik.com/free-photo/top-view-autumn-travel-with-magnifying-glass_23-2148610371.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740' },
      { id: 2, name: 'Brio', image: 'https://img.freepik.com/free-photo/happy-new-year-2022-3d-render-transparent-psd-file_460848-6846.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740' },
      { id: 3, name: 'Tetra Pak', image: 'https://img.freepik.com/free-photo/beautiful-frame-with-paint-splashes_24972-1812.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740' },
      { id: 4, name: 'Dack Team', image: 'https://img.freepik.com/free-photo/25th-years-anniversary-celebration-3d-render_460848-9098.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740' },
    ],
  },
  {
    id: 2,
    quote: "Their dedication and innovative approach have transformed our business over the past 3 years.",
    author: "Sarah Lee, Director, Oatly!",
    brands: [
      { id: 1, name: 'Oatly!', image: 'https://img.freepik.com/free-photo/top-view-autumn-travel-with-magnifying-glass_23-2148610371.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740' },
      { id: 2, name: 'Brio', image: 'https://img.freepik.com/free-photo/happy-new-year-2022-3d-render-transparent-psd-file_460848-6846.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740' },
      { id: 3, name: 'Tetra Pak', image: 'https://img.freepik.com/free-photo/beautiful-frame-with-paint-splashes_24972-1812.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740' },
    ],
  },
  {
    id: 3,
    quote: "A reliable partner with exceptional service for over 4 years—highly recommend!",
    author: "Anna Eriksson, Manager, Tetra Pak",
    brands: [
      { id: 1, name: 'Tetra Pak', image: 'https://img.freepik.com/free-photo/beautiful-frame-with-paint-splashes_24972-1812.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740' },
      { id: 2, name: 'Brio', image: 'https://img.freepik.com/free-photo/happy-new-year-2022-3d-render-transparent-psd-file_460848-6846.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740' },
      { id: 3, name: 'Dack Team', image: 'https://img.freepik.com/free-photo/25th-years-anniversary-celebration-3d-render_460848-9098.jpg?ga=GA1.1.1013345226.1744017707&semt=ais_hybrid&w=740' },
    ],
  },
];

const TestimonialCarousel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef(null);
  const panelRef = useRef(null);
  const slideWidth = 1200;
  const gap = 20;
  const autoplayInterval = 5000;

  // Initialize refs
  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.style.height = isOpen ? `${panelRef.current.scrollHeight}px` : '0px';
    }
  }, [isOpen]);

  // Autoplay with pause
  useEffect(() => {
    if (!isPaused && isOpen) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
        setDragOffset(0);
      }, autoplayInterval);
      return () => clearInterval(interval);
    }
  }, [isPaused, isOpen]);

  // Smooth slide transitions
  useEffect(() => {
    if (carouselRef.current && isOpen) {
      const offset = -(currentIndex * (slideWidth + gap)) + dragOffset;
      carouselRef.current.style.transform = `translateX(${offset}px)`;
    }
  }, [currentIndex, dragOffset, isOpen]);

  // Navigation functions
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    setDragOffset(0);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
    setDragOffset(0);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setDragOffset(0);
  };

  // Drag support
  const handleDragStart = (e) => {
    if (!isOpen) return;
    setDragStart(e.clientX || e.touches[0].clientX);
    setIsPaused(true);
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'none';
    }
  };

  const handleDragMove = (e) => {
    if (!isOpen || dragStart === null || !carouselRef.current) return;
    const currentX = e.clientX || (e.touches ? e.touches[0].clientX : dragStart);
    const diff = currentX - dragStart;
    setDragOffset(diff);
  };

  const handleDragEnd = (e) => {
    if (!isOpen || dragStart === null || !carouselRef.current) return;
    const currentX = e.clientX || (e.changedTouches ? e.changedTouches[0].clientX : dragStart);
    const diff = currentX - dragStart;
    carouselRef.current.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';

    if (diff < -50) {
      nextSlide();
    } else if (diff > 50) {
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
    <div className="relative w-full bg-gradient-to-br from-gray-100 to-gray-200 py-16 px-4 overflow-hidden">
      {/* Top Button */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          aria-expanded={isOpen}
          aria-controls="testimonial-panel"
        >
          {isOpen ? (
            <>
              <span className="hidden sm:inline">Hide Testimonials</span>
              <span className="sm:hidden">Hide</span>
            </>
          ) : (
            <>
              <span className="hidden sm:inline">View Client Testimonials</span>
              <span className="sm:hidden">Testimonials</span>
            </>
          )}
          <svg 
            className={`w-5 h-5 ml-2 inline transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Brand Logos */}
      <div className="max-w-7xl mx-auto flex justify-center items-center mb-12 flex-wrap gap-8 px-4">
        {testimonialsData[currentIndex].brands.map((brand) => (
          <div 
            key={brand.id} 
            className="w-32 h-16 bg-white flex items-center justify-center rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-2"
          >
            <img 
              src={brand.image} 
              alt={brand.name} 
              className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-500" 
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Testimonial Panel */}
      <div
        ref={panelRef}
        id="testimonial-panel"
        className="max-w-7xl mx-auto overflow-hidden transition-all duration-500 ease-in-out"
        style={{ height: '0px' }}
        aria-hidden={!isOpen}
      >
        <div
          className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white p-10 rounded-2xl shadow-2xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-t-2xl"></div>
          
          <style jsx>{`
            .carousel-track {
              display: flex;
              gap: ${gap}px;
              transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .testimonial-slide {
              flex: 0 0 ${slideWidth}px;
              min-height: 300px;
              opacity: 0.6;
              transition: opacity 0.5s ease, transform 0.5s ease;
              transform: scale(0.95);
            }
            .testimonial-slide.active {
              opacity: 1;
              transform: scale(1);
            }
            .nav-button {
              transition: all 0.3s ease;
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(5px);
              border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .nav-button:hover {
              background: rgba(255, 255, 255, 0.3);
              transform: scale(1.1);
            }
            .nav-dot {
              transition: all 0.3s ease;
              background: rgba(255, 255, 255, 0.3);
            }
            .nav-dot.active {
              background: linear-gradient(to right, #ec4899, #8b5cf6);
              transform: scale(1.3);
            }
            .quote-icon {
              opacity: 0.1;
              filter: drop-shadow(0 0 8px rgba(255,255,255,0.3));
            }
            @media (max-width: 1024px) {
              .carousel-track {
                max-width: 600px;
              }
              .testimonial-slide {
                flex: 0 0 600px;
              }
            }
            @media (max-width: 768px) {
              .carousel-track {
                max-width: 100%;
              }
              .testimonial-slide {
                flex: 0 0 calc(100% - 40px);
                min-height: 250px;
              }
              .nav-button {
                display: none;
              }
            }
          `}</style>

          {/* Decorative quote icon */}
          <div className="quote-icon absolute top-8 left-8 text-8xl font-serif">"</div>

          <div ref={carouselRef} className="carousel-track">
            {testimonialsData.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-slide ${index === currentIndex ? 'active' : ''}`}
                aria-hidden={index !== currentIndex}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1} of ${testimonialsData.length}`}
              >
                <blockquote className="text-2xl md:text-3xl italic text-white/90 leading-relaxed pl-12 pr-8">
                  {testimonial.quote}
                </blockquote>
                <cite className="mt-8 block text-right text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 font-semibold text-lg md:text-xl">
                  — {testimonial.author}
                </cite>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="nav-button absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full z-10"
            aria-label="Previous testimonial"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="nav-button absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full z-10"
            aria-label="Next testimonial"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`nav-dot w-4 h-4 rounded-full ${currentIndex === index ? 'active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-pink-500 opacity-10 blur-3xl"></div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;