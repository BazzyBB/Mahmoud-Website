import React, { useState, useEffect } from "react";

export default function Carousel({ images, title, description, direction, onCarouselInteraction }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(Array(images.length).fill(false));
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  
  // Check if all images are loaded
  useEffect(() => {
    if (imagesLoaded.every(loaded => loaded)) {
      setAllImagesLoaded(true);
    }
  }, [imagesLoaded]);

  // Check if images are already preloaded (from ImagePreloader)
  useEffect(() => {
    const checkPreloaded = () => {
      const allPreloaded = images.every(imageSrc => {
        const img = new Image();
        img.src = imageSrc;
        return img.complete && img.naturalHeight !== 0;
      });
      
      if (allPreloaded) {
        setAllImagesLoaded(true);
        setImagesLoaded(Array(images.length).fill(true));
      }
    };

    // Check immediately
    checkPreloaded();
    
    // Also check after a short delay in case images are still loading
    const timer = setTimeout(checkPreloaded, 100);
    
    return () => clearTimeout(timer);
  }, [images]);
  
  // Handle image load event
  const handleImageLoad = (index) => {
    setImagesLoaded(prev => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };
  
  // Auto-rotate images every 7 seconds - only start when images are loaded
  useEffect(() => {
    if (!allImagesLoaded) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);
    
    return () => clearInterval(interval);
  }, [images.length, allImagesLoaded]);

  // Handle manual navigation
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    if (onCarouselInteraction) {
      onCarouselInteraction('next', title);
    }
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    if (onCarouselInteraction) {
      onCarouselInteraction('prev', title);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    if (onCarouselInteraction) {
      onCarouselInteraction('indicator_click', title);
    }
  };

  return (
    <div className={`carousel-container ${direction}`} role="region" aria-label={`${title} image carousel`}>
      <div className="carousel-content">
        {direction === 'left' ? (
          <>
            <div className="carousel-images" role="img" aria-label={`${title} - Image ${currentIndex + 1} of ${images.length}`}>
              {!allImagesLoaded && (
                <div className="carousel-loading" role="status" aria-live="polite">
                  <div className="spinner" aria-hidden="true"></div>
                  <span className="sr-only">Loading images...</span>
                </div>
              )}
              
              {images.map((image, index) => (
                <React.Fragment key={index}>
                  <div 
                    className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${image})`, display: allImagesLoaded ? 'block' : 'none' }}
                    role="img"
                    aria-label={`${title} - Image ${index + 1}`}
                    aria-hidden={index !== currentIndex}
                  />
                  {/* Preload images */}
                  <img 
                    src={image}
                    alt={`${title} - Professional custom woodworking project image ${index + 1} showing detailed craftsmanship and quality materials`}
                    style={{ display: 'none' }}
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageLoad(index)} // Count errors as loaded too to prevent hang
                  />
                </React.Fragment>
              ))}
              
              {allImagesLoaded && (
                <div className="carousel-controls" role="group" aria-label="Carousel navigation">
                  <button 
                    onClick={goToPrev} 
                    className="carousel-control prev"
                    aria-label="Previous image"
                    disabled={images.length <= 1}
                  >
                    <span aria-hidden="true">&#10094;</span>
                  </button>
                  <div className="carousel-indicators" role="tablist" aria-label="Image selection">
                    {images.map((_, index) => (
                      <button
                        key={index} 
                        className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        role="tab"
                        aria-selected={index === currentIndex}
                        aria-label={`Go to image ${index + 1}`}
                        tabIndex={index === currentIndex ? 0 : -1}
                      />
                    ))}
                  </div>
                  <button 
                    onClick={goToNext} 
                    className="carousel-control next"
                    aria-label="Next image"
                    disabled={images.length <= 1}
                  >
                    <span aria-hidden="true">&#10095;</span>
                  </button>
                </div>
              )}
            </div>
            <div className="carousel-text">
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </>
        ) : (
          <>
            <div className="carousel-text">
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
            <div className="carousel-images" role="img" aria-label={`${title} - Image ${currentIndex + 1} of ${images.length}`}>
              {!allImagesLoaded && (
                <div className="carousel-loading" role="status" aria-live="polite">
                  <div className="spinner" aria-hidden="true"></div>
                  <span className="sr-only">Loading images...</span>
                </div>
              )}
              
              {images.map((image, index) => (
                <React.Fragment key={index}>
                  <div 
                    className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${image})`, display: allImagesLoaded ? 'block' : 'none' }}
                    role="img"
                    aria-label={`${title} - Image ${index + 1}`}
                    aria-hidden={index !== currentIndex}
                  />
                  {/* Preload images */}
                  <img 
                    src={image}
                    alt={`${title} - Professional custom woodworking project image ${index + 1} showing detailed craftsmanship and quality materials`}
                    style={{ display: 'none' }}
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageLoad(index)} // Count errors as loaded too to prevent hang
                  />
                </React.Fragment>
              ))}
              
              {allImagesLoaded && (
                <div className="carousel-controls" role="group" aria-label="Carousel navigation">
                  <button 
                    onClick={goToPrev} 
                    className="carousel-control prev"
                    aria-label="Previous image"
                    disabled={images.length <= 1}
                  >
                    <span aria-hidden="true">&#10094;</span>
                  </button>
                  <div className="carousel-indicators" role="tablist" aria-label="Image selection">
                    {images.map((_, index) => (
                      <button
                        key={index} 
                        className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        role="tab"
                        aria-selected={index === currentIndex}
                        aria-label={`Go to image ${index + 1}`}
                        tabIndex={index === currentIndex ? 0 : -1}
                      />
                    ))}
                  </div>
                  <button 
                    onClick={goToNext} 
                    className="carousel-control next"
                    aria-label="Next image"
                    disabled={images.length <= 1}
                  >
                    <span aria-hidden="true">&#10095;</span>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}