import React, { useEffect, useState } from 'react';

// Import all gallery images
import ds1 from "@assets/DS1.JPG";
import ds2 from "@assets/DS2.JPG";
import ds3 from "@assets/DS3.JPG";
import ds4 from "@assets/DS4.JPG";
import ds5 from "@assets/DS5.JPG";

import ed1 from "@assets/ED1.JPG";
import ed2 from "@assets/ED2.JPG";
import ed3 from "@assets/ED3.JPG";
import ed4 from "@assets/ED4.JPG";
import ed5 from "@assets/ED5.JPG";
import ed6 from "@assets/ED6.JPG";

import js1 from "@assets/JS1.JPG";
import js2 from "@assets/JS2.JPG";
import js3 from "@assets/JS3.JPG";
import js4 from "@assets/JS4.JPG";
import js5 from "@assets/JS5.JPG";

import ob1 from "@assets/OB1.JPG";
import ob2 from "@assets/OB2.JPG";
import ob3 from "@assets/OB3.JPG";
import ob4 from "@assets/OB4.JPG";

import om1 from "@assets/OM1.JPG";
import om2 from "@assets/OM2.jpeg";
import om3 from "@assets/OM3.JPG";
import om4 from "@assets/OM4.jpeg";

import sf1 from "@assets/SF1.JPG";
import sf2 from "@assets/SF2.JPG";
import sf3 from "@assets/SF3.JPG";
import sf4 from "@assets/SF4.JPG";

const ImagePreloader = () => {
  const [preloadStatus, setPreloadStatus] = useState({
    loaded: 0,
    total: 0,
    isComplete: false,
    hasError: false
  });

  useEffect(() => {
    // All gallery images array
    const allImages = [
      // Diamond Setting Bench images
      ds1, ds2, ds3, ds4, ds5,
      // Live-Edge Dining Table images
      ed1, ed2, ed3, ed4, ed5, ed6,
      // Custom Cabinet System images
      js1, js2, js3, js4, js5,
      // Geometric Block Table images
      ob1, ob2, ob3, ob4,
      // Mixed Hardwood Epoxy Table images
      om1, om2, om3, om4,
      // Retail Display Table images
      sf1, sf2, sf3, sf4
    ];

    setPreloadStatus(prev => ({ ...prev, total: allImages.length }));

    let loadedCount = 0;
    let hasError = false;

    const preloadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        
        img.onload = () => {
          loadedCount++;
          setPreloadStatus(prev => ({
            ...prev,
            loaded: loadedCount,
            isComplete: loadedCount === allImages.length,
            hasError: hasError
          }));
          resolve();
        };
        
        img.onerror = () => {
          console.warn(`Failed to preload image: ${src}`);
          hasError = true;
          loadedCount++;
          setPreloadStatus(prev => ({
            ...prev,
            loaded: loadedCount,
            isComplete: loadedCount === allImages.length,
            hasError: true
          }));
          resolve();
        };
        
        img.src = src;
      });
    };

    // Start preloading all images
    const preloadAllImages = async () => {
      try {
        // Preload images in batches to avoid overwhelming the browser
        const batchSize = 5;
        for (let i = 0; i < allImages.length; i += batchSize) {
          const batch = allImages.slice(i, i + batchSize);
          await Promise.all(batch.map(preloadImage));
          
          // Small delay between batches to prevent blocking the main thread
          if (i + batchSize < allImages.length) {
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        }
      } catch (error) {
        console.warn('Error during image preloading:', error);
        setPreloadStatus(prev => ({ ...prev, hasError: true }));
      }
    };

    // Start preloading after a short delay to let the page load first
    const timeoutId = setTimeout(preloadAllImages, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // This component doesn't render anything visible
  // It just preloads images in the background
  return null;
};

export default ImagePreloader;
