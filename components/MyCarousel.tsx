// components/Carousel.tsx
"use client"
import React, { useEffect, useState } from 'react';

type CarouselProps = {
    slides: { src: string; link?: string }[];
    autoPlay?: boolean; // to determine if auto-rotation should be active
    interval?: number;  //  to specify the rotation interval (in milliseconds)
  };
  
  const Carousel: React.FC<CarouselProps> = ({ slides, autoPlay = false, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (autoPlay) {
        const timer = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, interval);
  
        // Cleanup on unmount
        return () => clearInterval(timer);
      }
    }, [autoPlay, interval, slides.length]);
  
    const goNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };
  
    const goPrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };
  
    const currentSlide = slides[currentIndex];

  return (
    <div className="carousel-container">
      <button className="carousel-button" onClick={goPrev}>Previous</button>
      
      <div className="slide-container">
        {currentSlide.link ? (
          <a href={currentSlide.link}>
            <img src={currentSlide.src} alt={`Slide ${currentIndex}`} className="carousel-image" />
          </a>
        ) : (
          <img src={currentSlide.src} alt={`Slide ${currentIndex}`} className="carousel-image" />
        )}
        
        <div className="dots">
          {slides.map((_, idx) => (
            <span key={idx} className={`dot ${idx === currentIndex ? 'active' : ''}`} onClick={() => setCurrentIndex(idx)}></span>
          ))}
        </div>
      </div>
      
      <button className="carousel-button" onClick={goNext}>Next</button>


      <style jsx>{`
        .carousel-container {
          display: flex;
          align-items: center;
          width: 100%;
          position: relative;
        }
        .slide-container {
          flex-grow: 1;
          position: relative;
        }
        .carousel-image {
          width: 100%;
          max-height: 600px;
          object-fit: contain;
        }
        .carousel-button {
          background-color: rgba(0, 0, 0, 0.6);
          color: white;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .carousel-button:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }
        .carousel-button:focus {
          outline: none;
        }
        .dots {
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.4);
          margin: 0 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .dot.active {
          background-color: rgba(0, 0, 0, 0.8);
        }
        .dot:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
      `}</style>
    </div>
  );
};

export default Carousel;
