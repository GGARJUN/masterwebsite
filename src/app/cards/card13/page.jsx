"use client";
import React, { useState, useEffect, useRef } from 'react';

const productsData = [
  {
    id: 1,
    title: 'Smartphone Pro X',
    description: '6.7" AMOLED, 128GB, 48MP Camera',
    price: 29999,
    originalPrice: 34999,
    discount: '14% Off',
    rating: 4.5,
    reviews: 1200,
    image: 'https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437077.jpg',
    color: '#0288d1', // Flipkart Blue
  },
  {
    id: 2,
    title: 'Wireless Earbuds',
    description: 'True Wireless, 24H Battery, Noise Cancellation',
    price: 3999,
    originalPrice: 5999,
    discount: '33% Off',
    rating: 4.2,
    reviews: 850,
    image: 'https://img.freepik.com/free-photo/levitating-headphones-displayed-with-neon-lights-background_23-2149817003.jpg',
    color: '#f57c00', // Flipkart Orange
  },
  {
    id: 3,
    title: '4K Smart TV',
    description: '55" LED, HDR10, Smart Apps',
    price: 45999,
    originalPrice: 55999,
    discount: '18% Off',
    rating: 4.7,
    reviews: 2300,
    image: 'https://img.freepik.com/free-photo/modern-tv-screen-home-interior_23-2149306688.jpg',
    color: '#0288d1',
  },
  {
    id: 4,
    title: 'Laptop UltraBook',
    description: '16GB RAM, 512GB SSD, Intel i7',
    price: 79999,
    originalPrice: 99999,
    discount: '20% Off',
    rating: 4.6,
    reviews: 950,
    image: 'https://img.freepik.com/free-photo/laptop-with-blank-screen-white-table_53876-97912.jpg',
    color: '#f57c00',
  },
  {
    id: 5,
    title: 'Smart Watch',
    description: 'AMOLED Display, Heart Rate, GPS',
    price: 7999,
    originalPrice: 9999,
    discount: '20% Off',
    rating: 4.3,
    reviews: 600,
    image: 'https://img.freepik.com/free-photo/smartwatch-fitness-health-tracker-device_23-2149448036.jpg',
    color: '#0288d1',
  },
  {
    id: 6,
    title: 'Gaming Console',
    description: '4K Gaming, 1TB Storage, VR Ready',
    price: 39999,
    originalPrice: 49999,
    discount: '20% Off',
    rating: 4.8,
    reviews: 1800,
    image: 'https://img.freepik.com/free-photo/gaming-console-with-controllers-dark-background_23-2147814060.jpg',
    color: '#f57c00',
  },
  {
    id: 7,
    title: 'Bluetooth Speaker',
    description: 'Portable, 20W, Waterproof',
    price: 2999,
    originalPrice: 3999,
    discount: '25% Off',
    rating: 4.4,
    reviews: 700,
    image: 'https://img.freepik.com/free-photo/portable-bluetooth-speaker-isolated_23-2148703901.jpg',
    color: '#0288d1',
  },
  {
    id: 8,
    title: 'DSLR Camera',
    description: '24MP, 4K Video, Wi-Fi',
    price: 54999,
    originalPrice: 64999,
    discount: '15% Off',
    rating: 4.6,
    reviews: 1100,
    image: 'https://img.freepik.com/free-photo/professional-camera-white-background_23-2147720542.jpg',
    color: '#f57c00',
  },
];

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);
  const cardWidth = 280;
  const gap = 16;
  const autoplayInterval = 5000;

  // Responsive card count
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(4);
    };
    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  // Initialize cardRefs
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, productsData.length);
  }, []);

  // Auto-slide
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + visibleCards) % (productsData.length - visibleCards + 1));
        setDragOffset(0);
      }, autoplayInterval);
      return () => clearInterval(interval);
    }
  }, [isPaused, visibleCards]);

  // Smooth slide transitions
  useEffect(() => {
    if (!carouselRef.current) return;
    const offset = -(currentIndex * (cardWidth + gap)) + dragOffset;
    carouselRef.current.style.transform = `translateX(${offset}px)`;
  }, [currentIndex, dragOffset, visibleCards]);

  // Navigation functions
  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = productsData.length - visibleCards;
      return prev + visibleCards > maxIndex ? maxIndex : prev + visibleCards;
    });
    setDragOffset(0);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - visibleCards < 0 ? 0 : prev - visibleCards));
    setDragOffset(0);
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
    const diff = currentX - dragStart;
    setDragOffset(diff);
  };

  const handleDragEnd = (e) => {
    if (dragStart === null || !carouselRef.current) return;
    const currentX = e.clientX || (e.changedTouches ? e.changedTouches[0].clientX : dragStart);
    const diff = currentX - dragStart;
    carouselRef.current.style.transition = 'transform 0.6s ease-out';

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
    <div className="relative w-full bg-white py-8 px-4 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Top Deals on Electronics</h2>
        <p className="text-gray-500 text-sm mt-1">Grab the best offers before they’re gone!</p>
      </div>

      <style jsx>{`
        .carousel-container {
          max-width: ${cardWidth * visibleCards + gap * (visibleCards - 1)}px;
          overflow: hidden;
          position: relative;
          margin: 0 auto;
        }
        .carousel-track {
          display: flex;
          gap: ${gap}px;
          transition: transform 0.6s ease-out;
        }
        .product-card {
          flex: 0 0 ${cardWidth}px;
          height: 400px;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          border-color: var(--accent-color);
        }
        .product-image {
          transition: transform 0.3s ease;
        }
        .product-card:hover .product-image {
          transform: scale(1.05);
        }
        .rating {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .nav-button {
          transition: all 0.3s ease;
          background: white;
          border: 1px solid #e0e0e0;
        }
        .nav-button:hover {
          background: var(--accent-color);
          border-color: var(--accent-color);
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .nav-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .progress-bar {
          background: var(--accent-color);
          transition: width 0.6s ease-out;
        }
        @media (max-width: 1024px) {
          .carousel-container {
            max-width: ${cardWidth * 2 + gap}px;
          }
        }
        @media (max-width: 640px) {
          .carousel-container {
            max-width: ${cardWidth}px;
          }
        }
      `}</style>

      {/* Carousel Container */}
      <div className="carousel-container">
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
          onMouseEnter={() => setIsPaused(true)}
          
        >
          {productsData.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="product-card"
              style={{ '--accent-color': product.color }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image w-full h-full object-contain"
                />
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  {product.discount}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-gray-800 line-clamp-1">{product.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-1 mt-1">{product.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                </div>
                <div className="rating mt-2">
                  <span className="text-sm font-semibold text-gray-800">{product.rating} ★</span>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>
                <button
                  className="mt-4 w-full py-2 bg-[var(--accent-color)] text-white text-sm font-semibold rounded hover:bg-opacity-90 transition-all"
                  style={{ boxShadow: `0 2px 8px ${product.color}33` }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="nav-button absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full z-10"
          style={{ '--accent-color': '#0288d1' }}
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          disabled={currentIndex >= productsData.length - visibleCards}
          className="nav-button absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full z-10"
          style={{ '--accent-color': '#0288d1' }}
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center mt-6">
        <div className="w-40 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="progress-bar h-full"
            style={{
              width: `${((currentIndex + visibleCards) / productsData.length) * 100}%`,
              '--accent-color': '#0288d1',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;