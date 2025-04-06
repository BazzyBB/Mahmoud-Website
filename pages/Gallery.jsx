import React, { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Carousel from "../Components/Carousel"; // Import the Carousel component

// Import Stock.jpg for all carousels
import stockImage from "../Assets/Stock.jpg";

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleSections, setVisibleSections] = useState(Array(8).fill(false));
  
  // Placeholder images - all using Stock.jpg
  const placeholderImages = Array(5).fill(stockImage);
  
  // Mock data for the 8 carousels
  const carouselData = [
    {
      title: "Luxury Jewelry Cases",
      description: "Our luxury jewelry cases are handcrafted with premium materials, providing elegant storage solutions for your most precious items. Each piece combines sophisticated design with practical organization to keep your collection safe and beautifully displayed.",
      images: placeholderImages,
      direction: "left"
    },
    {
      title: "Travel Collection",
      description: "Perfect for the jewelry enthusiast on the go, our travel collection offers compact, secure, and stylish solutions for transporting your treasures. These cases feature specialized compartments and anti-tangle designs to keep everything protected during your journeys.",
      images: placeholderImages,
      direction: "right"
    },
    {
      title: "Bespoke Designs",
      description: "Express your unique style with our bespoke jewelry case service. We work closely with you to create custom-designed pieces that perfectly match your collection and aesthetic preferences. From material selection to interior configuration, every detail is tailored to your specifications.",
      images: placeholderImages,
      direction: "left"
    },
    {
      title: "Heritage Collection",
      description: "Our Heritage Collection combines timeless craftsmanship with modern functionality. Inspired by antique jewelry boxes but built with contemporary needs in mind, these cases are designed to become family heirlooms, protecting your treasured pieces for generations to come.",
      images: placeholderImages,
      direction: "right"
    },
    {
      title: "Modern Minimalist Series",
      description: "Clean lines and sleek finishes define our Modern Minimalist Series. These contemporary jewelry cases blend seamlessly with modern decor while providing exceptional organization and protection for your precious items. Perfect for those who appreciate understated elegance.",
      images: placeholderImages,
      direction: "left"
    },
    {
      title: "Vintage-Inspired Collection",
      description: "Our Vintage-Inspired Collection pays homage to classic jewelry box designs with modern functionality. Featuring ornate detailing, quality craftsmanship, and luxurious materials, these cases evoke the elegance of bygone eras while meeting the needs of today's jewelry collectors.",
      images: placeholderImages,
      direction: "right"
    },
    {
      title: "Executive Edition",
      description: "The Executive Edition offers sophisticated organization for fine jewelry and watches. Featuring premium leather exteriors, precision engineering, and discreet security features, these cases are designed for the discerning collector who demands the highest quality.",
      images: placeholderImages,
      direction: "left"
    },
    {
      title: "Artisan Series",
      description: "Each piece in our Artisan Series is a unique work of art crafted by master woodworkers. Featuring exotic woods, hand-carved details, and custom inlays, these limited-edition jewelry cases become cherished collectibles that showcase and protect your treasures with equal beauty.",
      images: placeholderImages,
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
        threshold: 0.15
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
          className={`carousel-section ${carousel.direction === 'right' ? 'right' : ''} ${visibleSections[index] ? 'visible' : ''} full-viewport`}
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