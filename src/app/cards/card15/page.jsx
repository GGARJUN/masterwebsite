"use client";
import React, { useState, useEffect, useRef } from 'react';

const videosData = [
  {
    id: 1,
    title: 'Flower in the Rain',
    previewImage: 'https://img.freepik.com/free-photo/pink-flower-rain-drops_23-2148915288.jpg',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'Beautiful pink flower with rain drops'
  },
  {
    id: 2,
    title: 'Green Grass',
    previewImage: 'https://img.freepik.com/free-photo/rain-drops-grass_23-2148915290.jpg',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    description: 'Fresh green grass with morning dew'
  },
  {
    id: 3,
    title: 'Flower Close-up',
    previewImage: 'https://img.freepik.com/free-photo/close-up-pink-flower-rain-drops_23-2148915289.jpg',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'Macro shot of delicate flower petals'
  },
];

const VideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef(null);
  const videoRefs = useRef([]);
  const containerRef = useRef(null);
  
  // Responsive slide width
  const [slideWidth, setSlideWidth] = useState(800);
  const gap = 20;
  const autoplayInterval = 5000;

  // Set responsive slide width
  useEffect(() => {
    const updateSlideWidth = () => {
      if (containerRef.current) {
        const width = Math.min(800, containerRef.current.offsetWidth - 40);
        setSlideWidth(width);
      }
    };

    updateSlideWidth();
    window.addEventListener('resize', updateSlideWidth);
    return () => window.removeEventListener('resize', updateSlideWidth);
  }, []);

  // Initialize videoRefs
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videosData.length);
  }, []);

  // Autoplay and video control
  useEffect(() => {
    const currentVideo = videoRefs.current[currentIndex];
    
    if (currentVideo) {
      const playPromise = currentVideo.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay was prevented, show play button
            setIsPlaying(false);
          });
      }
    }

    // Pause other videos
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentIndex) {
        video.pause();
      }
    });

    // Autoplay carousel
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % videosData.length);
        setDragOffset(0);
      }, autoplayInterval);
    }

    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  // Smooth slide transitions
  useEffect(() => {
    if (carouselRef.current) {
      const offset = -(currentIndex * (slideWidth + gap)) + dragOffset;
      carouselRef.current.style.transform = `translateX(${offset}px)`;

      // Update video states
      videoRefs.current.forEach((video, index) => {
        if (video) {
          const isActive = index === currentIndex;
          video.style.opacity = isActive ? 1 : 0.6;
          video.style.transform = isActive ? 'scale(1)' : 'scale(0.95)';
          video.style.zIndex = isActive ? 10 : 5;
        }
      });
    }
  }, [currentIndex, dragOffset, slideWidth]);

  // Navigation functions
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % videosData.length);
    setDragOffset(0);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + videosData.length) % videosData.length);
    setDragOffset(0);
  };

  const togglePlay = () => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      if (currentVideo.paused) {
        currentVideo.play().then(() => setIsPlaying(true));
      } else {
        currentVideo.pause();
        setIsPlaying(false);
      }
    }
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
    <div 
      className="relative w-full bg-gradient-to-br from-green-50 to-teal-100 py-16 px-4 overflow-hidden"
      ref={containerRef}
    >
      {/* Raindrop effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2)_0%,transparent_70%)] opacity-30 animate-rain" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-20" />
      </div>

      <style jsx>{`
        .carousel-container {
          max-width: ${slideWidth}px;
          margin: 0 auto;
          overflow: hidden;
          position: relative;
          border-radius: 16px;
          box-shadow: 0 20px 40px -10px rgba(0, 80, 80, 0.2);
        }
        .carousel-track {
          display: flex;
          gap: ${gap}px;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .video-slide {
          flex: 0 0 ${slideWidth}px;
          height: ${slideWidth * 0.6}px;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          overflow: hidden;
          transition: opacity 0.5s ease, transform 0.5s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          position: relative;
        }
        .video-slide video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.5s ease;
        }
        .overlay-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 24px;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%);
          color: white;
          pointer-events: none;
        }
        .play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(5px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          pointer-events: auto;
        }
        .play-button:hover {
          background: rgba(255,255,255,0.3);
          transform: translate(-50%, -50%) scale(1.1);
        }
        .nav-button {
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-button:hover {
          background: rgba(255, 255, 255, 0.5);
          transform: scale(1.1);
        }
        @media (max-width: 1024px) {
          .video-slide {
            height: ${Math.min(slideWidth, 600) * 0.6}px;
          }
        }
        @media (max-width: 640px) {
          .video-slide {
            height: ${Math.min(slideWidth, 400) * 0.7}px;
          }
          .overlay-content {
            padding: 16px;
          }
          .play-button {
            width: 50px;
            height: 50px;
          }
        }
        @keyframes rain {
          0% { background-position: 0 0; }
          100% { background-position: 20px 20px; }
        }
      `}</style>

      {/* Carousel Container */}
      <div
        className="carousel-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        
      >
        <div ref={carouselRef} className="carousel-track">
          {videosData.map((video, index) => (
            <div key={video.id} className="video-slide">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                poster={video.previewImage}
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              <div className="overlay-content">
                <h3 className="text-xl font-bold mb-1">{video.title}</h3>
                <p className="text-sm opacity-80">{video.description}</p>
              </div>
              
              <div 
                className="play-button" 
                onClick={togglePlay}
                style={{ display: isPlaying && index === currentIndex ? 'none' : 'flex' }}
              >
                <svg 
                  className="w-6 h-6 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="nav-button absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full z-10"
          aria-label="Previous video"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="nav-button absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full z-10"
          aria-label="Next video"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {videosData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-teal-600 scale-125' : 'bg-gray-300'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;