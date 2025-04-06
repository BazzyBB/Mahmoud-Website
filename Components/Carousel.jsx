import React, { useState, useEffect } from "react";

export default function Carousel({ images, title, description, direction }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(Array(images.length).fill(false));
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  
  // Check if all images are loaded
  useEffect(() => {
    if (imagesLoaded.every(loaded => loaded)) {
      setAllImagesLoaded(true);
    }
  }, [imagesLoaded]);
  
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
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className={`carousel-container ${direction}`}>
      <div className="carousel-content">
        {direction === 'left' ? (
          <>
            <div className="carousel-images">
              {!allImagesLoaded && (
                <div className="carousel-loading">
                  <div className="spinner"></div>
                </div>
              )}
              
              {images.map((image, index) => (
                <React.Fragment key={index}>
                  <div 
                    className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${image})`, display: allImagesLoaded ? 'block' : 'none' }}
                  />
                  {/* Preload images */}
                  <img 
                    src={image}
                    alt=""
                    style={{ display: 'none' }}
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageLoad(index)} // Count errors as loaded too to prevent hang
                  />
                </React.Fragment>
              ))}
              
              {allImagesLoaded && (
                <div className="carousel-controls">
                  <button onClick={goToPrev} className="carousel-control prev">&#10094;</button>
                  <div className="carousel-indicators">
                    {images.map((_, index) => (
                      <span 
                        key={index} 
                        className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                      />
                    ))}
                  </div>
                  <button onClick={goToNext} className="carousel-control next">&#10095;</button>
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
            <div className="carousel-images">
              {!allImagesLoaded && (
                <div className="carousel-loading">
                  <div className="spinner"></div>
                </div>
              )}
              
              {images.map((image, index) => (
                <React.Fragment key={index}>
                  <div 
                    className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${image})`, display: allImagesLoaded ? 'block' : 'none' }}
                  />
                  {/* Preload images */}
                  <img 
                    src={image}
                    alt=""
                    style={{ display: 'none' }}
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageLoad(index)} // Count errors as loaded too to prevent hang
                  />
                </React.Fragment>
              ))}
              
              {allImagesLoaded && (
                <div className="carousel-controls">
                  <button onClick={goToPrev} className="carousel-control prev">&#10094;</button>
                  <div className="carousel-indicators">
                    {images.map((_, index) => (
                      <span 
                        key={index} 
                        className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                      />
                    ))}
                  </div>
                  <button onClick={goToNext} className="carousel-control next">&#10095;</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}