import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics tracking hook
export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if gtag is available (Google Analytics is loaded)
    if (typeof window !== 'undefined' && window.gtag) {
      // Track page view
      window.gtag('config', 'G-N51YDHY9Q0', {
        page_path: location.pathname + location.search,
        page_title: document.title,
        page_location: window.location.href
      });
    }
  }, [location]);

  // Function to track custom events
  const trackEvent = (eventName, parameters = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  };

  // Function to track button clicks
  const trackButtonClick = (buttonName, page = '') => {
    trackEvent('button_click', {
      button_name: buttonName,
      page: page || location.pathname
    });
  };

  // Function to track form submissions
  const trackFormSubmission = (formName, success = true) => {
    trackEvent('form_submission', {
      form_name: formName,
      success: success,
      page: location.pathname
    });
  };

  // Function to track carousel interactions
  const trackCarouselInteraction = (action, carouselName) => {
    trackEvent('carousel_interaction', {
      action: action, // 'next', 'prev', 'indicator_click'
      carousel_name: carouselName,
      page: location.pathname
    });
  };

  // Function to track page engagement
  const trackPageEngagement = (timeOnPage) => {
    trackEvent('page_engagement', {
      time_on_page: timeOnPage,
      page: location.pathname
    });
  };

  // Function to track scroll depth
  const trackScrollDepth = (depth) => {
    trackEvent('scroll_depth', {
      depth: depth,
      page: location.pathname
    });
  };


  // Function to track image views
  const trackImageView = (imageName, carouselName) => {
    trackEvent('image_view', {
      image_name: imageName,
      carousel_name: carouselName,
      page: location.pathname
    });
  };

  return {
    trackEvent,
    trackButtonClick,
    trackFormSubmission,
    trackCarouselInteraction,
    trackPageEngagement,
    trackScrollDepth,
    trackImageView
  };
};
