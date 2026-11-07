import { useEffect, useRef } from 'react';
import { createPageViewTracker, isPrivateAnalyticsVisit } from '../utils/analytics';
import { useLocation } from 'react-router-dom';

// Run route tracking once at the application root, not in every event consumer.
export function usePageViewTracking() {
  const { pathname, search, hash } = useLocation();
  const tracker = useRef(null);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.gtag) return;
    tracker.current ||= createPageViewTracker((...args) => window.gtag(...args));
    tracker.current(window.location, document.title);
  }, [pathname, search, hash]);
}

// Components use event helpers without registering another page view.
export const useAnalytics = () => {
  const location = useLocation();

  // Function to track custom events
  const trackEvent = (eventName, parameters = {}) => {
    if (typeof window !== 'undefined' && window.gtag && !isPrivateAnalyticsVisit(window.location)) {
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
