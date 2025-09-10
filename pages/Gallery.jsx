import React, { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Carousel from "../Components/Carousel"; // Import the Carousel component

// Import Diamond Setting Bench images
import ds1 from "../Assets/DS1.JPG";
import ds2 from "../Assets/DS2.JPG";
import ds3 from "../Assets/DS3.JPG";
import ds4 from "../Assets/DS4.JPG";
import ds5 from "../Assets/DS5.JPG";

// Import Live-Edge Dining Table images
import ed1 from "../Assets/ED1.JPG";
import ed2 from "../Assets/ED2.JPG";
import ed3 from "../Assets/ED3.JPG";
import ed4 from "../Assets/ED4.JPG";
import ed5 from "../Assets/ED5.JPG";
import ed6 from "../Assets/ED6.JPG";

// Import Jewelry Display Case System images
import js1 from "../Assets/JS1.JPG";
import js2 from "../Assets/JS2.JPG";
import js3 from "../Assets/JS3.JPG";
import js4 from "../Assets/JS4.JPG";
import js5 from "../Assets/JS5.JPG";

// Import Geometric Block Table images
import ob1 from "../Assets/OB1.JPG";
import ob2 from "../Assets/OB2.JPG";
import ob3 from "../Assets/OB3.JPG";
import ob4 from "../Assets/OB4.JPG";

// Import Mixed Hardwood Epoxy Table images
import om1 from "../Assets/OM1.JPG";
import om2 from "../Assets/OM2.jpeg";
import om3 from "../Assets/OM3.JPG";
import om4 from "../Assets/OM4.jpeg";

// Import Retail Display Table images
import sf1 from "../Assets/SF1.JPG";
import sf2 from "../Assets/SF2.JPG";
import sf3 from "../Assets/SF3.JPG";
import sf4 from "../Assets/SF4.JPG";

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleSections, setVisibleSections] = useState(Array(6).fill(false));
  
  // Diamond Setting Bench images
  const diamondSettingImages = [ds1, ds2, ds3, ds4, ds5];
  
  // Live-Edge Dining Table images
  const liveEdgeTableImages = [ed1, ed2, ed3, ed4, ed5, ed6];
  
  // Jewelry Display Case System images
  const jewelryDisplayImages = [js1, js2, js3, js4, js5];
  
  // Geometric Block Table images
  const geometricBlockImages = [ob1, ob2, ob3, ob4];
  
  // Mixed Hardwood Epoxy Table images
  const mixedHardwoodImages = [om1, om2, om3, om4];
  
  // Retail Display Table images
  const retailDisplayImages = [sf1, sf2, sf3, sf4];
  
  // Mock data for the 8 carousels
  const carouselData = [
    {
      title: "Diamond Setting Bench – Built for Precision and Comfort",
      description: "Our custom Diamond Setting Bench is designed with the professional jeweler in mind, combining strength, beauty, and functionality into the ultimate workstation. Handcrafted from 2\" thick solid walnut, stacked for unmatched durability and elegance, this bench provides a sturdy foundation that will last for generations. The centerpiece of this bench is its ergonomic design, with a recessed stainless steel catch tray to secure diamonds, gemstones, and precious filings. The layout includes custom-fitted spaces for essential machines, ensuring your tools are always within reach and neatly organized. For maximum comfort, the bench is built on an adjustable height base, allowing you to work at the perfect level whether sitting or standing. The thoughtful cut-out design supports a natural posture, reducing strain during long hours of precision work. To keep your workspace clean and efficient, the bench integrates a GoldVault dust collection system, recovering valuable materials while maintaining a safe, dust-free environment. Drawers and shelving provide practical storage, keeping your tools organized and your bench uncluttered.",
      images: diamondSettingImages,
      direction: "left"
    },
    {
      title: "Custom Live-Edge Dining Table - American Black Walnut with Metallic Epoxy River",
      description: "This striking dining table showcases the natural beauty of premium American black walnut, expertly crafted to highlight the wood's rich grain patterns and warm honey tones. The centerpiece feature is a dramatic epoxy river that flows through the length of the table, created with metallic black and gold epoxy that catches and reflects light beautifully, creating an almost liquid metal appearance. The live-edge design preserves the organic contours of the original wood, while the sleek epoxy inlay provides a modern contrast that bridges rustic charm with contemporary elegance. The entire surface is protected with a crystal-clear finish that enhances the wood's natural depth and ensures the metallic elements maintain their lustrous shine. Supported by a robust trestle-style base crafted from matching walnut, this table combines both form and function with its sturdy construction and timeless design. The warm walnut perfectly complements the cool metallic accents, creating a sophisticated piece that serves as both functional furniture and artistic statement.",
      images: liveEdgeTableImages,
      direction: "right"
    },
    {
      title: "Custom Jewelry Display Case System - Oak Veneer with Cotton White Finish",
      description: "This sophisticated retail display system combines the natural warmth of oak with clean, contemporary design to create an elegant showcase for fine jewelry. The cases feature oak veneered plywood construction with beautiful white oak tops finished in a refined cotton white that provides a neutral backdrop to highlight precious pieces. Each case is topped with crystal-clear 3/8\" tempered glass for optimal durability and security, while custom-integrated LED lighting creates perfect illumination that brings out the brilliance and sparkle of displayed jewelry. The lighting system is professionally designed to minimize shadows and provide even, flattering light distribution across the entire display surface. The modular system includes ten 4-foot linear display cases that can be configured to suit any retail space, complemented by two tower units for vertical display options and a 5-foot display table for featured pieces or larger collections. The cohesive design creates a premium shopping experience while maximizing display flexibility. The cotton white finish provides a timeless, sophisticated aesthetic that complements any jewelry collection while the oak construction ensures lasting durability in a commercial environment. The clean lines and professional presentation elevate the perceived value of displayed merchandise.",
      images: jewelryDisplayImages,
      direction: "left"
    },
    {
      title: "Custom Geometric Block Table - Oak with Metallic Black Epoxy",
      description: "This striking contemporary table showcases innovative design through its unique geometric construction of individual 2-inch oak blocks, each carefully positioned and bonded with metallic black epoxy that creates bold linear patterns throughout the surface. The result is a mesmerizing brick-like weave pattern that transforms traditional woodworking into modern art. Each oak block is precision-cut and finished with a sophisticated cotton white finish that highlights the wood's natural grain while providing a clean, contemporary aesthetic. The metallic black epoxy flowing between each block creates dramatic contrast lines that catch and reflect light, adding depth and visual movement to the surface. The geometric pattern creates an almost textile-like appearance, reminiscent of a woven basket or herringbone design, while maintaining the strength and durability of solid wood construction. The interplay between the warm, neutral oak and the bold metallic epoxy lines creates a sophisticated piece that serves as both functional furniture and sculptural statement. Supported by a classic trestle-style base crafted from matching oak with the same cotton white finish, this coffee table combines traditional joinery techniques with cutting-edge design concepts. The substantial construction ensures stability while the unique surface treatment makes it a true conversation piece.",
      images: geometricBlockImages,
      direction: "right"
    },
    {
      title: "Custom Mixed Hardwood Epoxy Table - Multi-Species Mosaic Design",
      description: "This stunning coffee table showcases the artistry of combining six distinct North American hardwoods in a captivating mosaic pattern, all unified within a crystal-clear epoxy matrix. The intricate design features carefully selected pieces of walnut, cherry, maple, white oak, red oak, and mahogany, each contributing its unique color, grain pattern, and character to create a rich tapestry of natural beauty. The varied wood species create a spectacular range of tones from the deep chocolate browns of walnut to the warm honey hues of maple, the rich burgundy of cherry, the golden tones of both oak varieties, and the reddish-brown elegance of mahogany. Each piece is precisely cut and arranged to form an organic, puzzle-like pattern that celebrates the diversity of hardwood species while maintaining visual harmony. The entire surface is encapsulated in premium epoxy resin that not only protects the wood but creates a perfectly smooth, glass-like finish that enhances the natural colors and grain patterns. The epoxy acts as both a protective barrier and a unifying element, allowing each wood species to shine while creating a cohesive whole. Supported by robust legs crafted from the same mixed hardwoods, this table extends the artistic concept throughout its entire structure. The substantial construction ensures durability while the unique surface treatment makes it a true centerpiece that showcases the natural beauty and variety of North American hardwoods.",
      images: mixedHardwoodImages,
      direction: "left"
    },
    {
      title: "Custom Retail Display Table - White Oak with Cotton White Finish",
      description: "This sophisticated retail display table combines minimalist design with premium craftsmanship to create an ideal showcase for high-end merchandise. Constructed from beautiful white oak and finished in an elegant cotton white that highlights the wood's natural grain while maintaining a clean, contemporary aesthetic that complements any retail environment. The design features a distinctive tiered construction with horizontal slat detailing that creates visual interest while maintaining the clean lines essential for product display. The upper display surface provides an elevated platform perfect for featuring jewelry, accessories, or other premium items, while the lower tier offers additional display space or storage functionality. The sleek black metal legs provide a striking contrast to the light oak construction, creating a modern industrial accent that elevates the overall design. This mixed-material approach combines the warmth of natural wood with the sophistication of contemporary metal work, resulting in a piece that feels both approachable and upscale. The cotton white finish ensures that displayed products remain the focal point while the quality construction projects an image of craftsmanship and attention to detail that reflects positively on the merchandise. The open design allows for easy access and optimal viewing angles from multiple directions.",
      images: retailDisplayImages,
      direction: "right"
    },
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
      <div className="gallery-container">
        <h1>Our Collections</h1>
        <div className="loading-indicator">
          <p>Loading our beautiful collections...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gallery-container">
        <h1>Our Collections</h1>
        <div className="error-message">
          <p>We're sorry, but there was an error loading the gallery. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <h1>Our Collections</h1>

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