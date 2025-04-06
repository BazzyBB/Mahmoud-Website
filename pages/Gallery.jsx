import React, { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Carousel from "../Components/Carousel"; // Import the Carousel component

// Import Stock.jpg for all carousels
import stockImage from "../Assets/Stock.jpg";
import woodImage from "../Assets/Wood.jpg"

// Use Stock.jpg for all placeholder images
const placeholderImages = {
  luxury: [
    stockImage, 
    woodImage, 
    stockImage, 
    stockImage, 
    stockImage
  ],
  travel: [
    stockImage, 
    stockImage, 
    stockImage, 
    stockImage, 
    stockImage
  ],
  bespoke: [
    stockImage, 
    stockImage, 
    stockImage, 
    stockImage, 
    stockImage
  ],
  heritage: [
    stockImage, 
    stockImage, 
    stockImage, 
    stockImage, 
    stockImage
  ]
};

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleSections, setVisibleSections] = useState([false, false, false, false]);
  
  // Mock data for the carousels - using placeholder images
  const carouselData = [
    {
      title: "Luxury Jewelry Cases",
      description: "Our luxury jewelry cases are handcrafted with premium materials, providing elegant storage solutions for your most precious items. Each piece combines sophisticated design with practical organization to keep your collection safe and beautifully displayed.",
      images: placeholderImages.luxury,
      direction: "left"
    },
    {
      title: "Travel Collection",
      description: "Perfect for the jewelry enthusiast on the go, our travel collection offers compact, secure, and stylish solutions for transporting your treasures. These cases feature specialized compartments and anti-tangle designs to keep everything protected during your journeys.",
      images: placeholderImages.travel,
      direction: "right"
    },
    {
      title: "Bespoke Designs",
      description: "Express your unique style with our bespoke jewelry case service. We work closely with you to create custom-designed pieces that perfectly match your collection and aesthetic preferences. From material selection to interior configuration, every detail is tailored to your specifications.",
      images: placeholderImages.bespoke,
      direction: "left"
    },
    {
      title: "Heritage Collection",
      description: "Our Heritage Collection combines timeless craftsmanship with modern functionality. Inspired by antique jewelry boxes but built with contemporary needs in mind, these cases are designed to become family heirlooms, protecting your treasured pieces for generations to come.",
      images: placeholderImages.heritage,
      direction: "right"
    }
  ];
  
  const sectionRefs = useRef([]);

  // Initialize refs for section observing
  useEffect(() => {
    sectionRefs.current = Array(carouselData.length)
      .fill()
      .map((_, i) => sectionRefs.current[i] || React.createRef());
  }, [carouselData.length]);

  // Simulate loading
  useEffect(() => {
    // Simulate a network request for data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Set up intersection observer for scroll animations
  useEffect(() => {
    if (!isLoading) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const index = parseInt(entry.target.dataset.index);
          
          if (entry.isIntersecting) {
            setVisibleSections(prev => {
              const newVisibility = [...prev];
              newVisibility[index] = true;
              return newVisibility;
            });
          }
        });
      }, options);
      
      // Observe all section refs
      sectionRefs.current.forEach(ref => {
        if (ref.current) {
          observer.observe(ref.current);
        }
      });
      
      return () => {
        sectionRefs.current.forEach(ref => {
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        });
      };
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="van-list-container">
        <h1>Our Jewelry Case Collections</h1>
        <div className="loading-indicator">
          <p>Loading our beautiful collections...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="van-list-container">
        <h1>Our Jewelry Case Collections</h1>
        <div className="error-message">
          <p>We're sorry, but there was an error loading the gallery. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="van-list-container">
      <h1>Our Jewelry Case Collections</h1>

      {carouselData.map((carousel, index) => (
        <div 
          key={index}
          data-index={index}
          ref={sectionRefs.current[index]}
          className={`carousel-section ${carousel.direction === 'right' ? 'right' : ''} ${visibleSections[index] ? 'visible' : ''}`}
        >
          <Carousel 
            images={carousel.images}
            title={carousel.title}
            description={carousel.description}
            direction={carousel.direction}
          />
        </div>
      ))}
    </div>
  );
}