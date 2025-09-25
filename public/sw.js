// LiveWood Studio Service Worker
// Version 1.0.0

const CACHE_NAME = 'livewood-studio-v1.0.0';
const STATIC_CACHE = 'livewood-static-v1';
const DYNAMIC_CACHE = 'livewood-dynamic-v1';

// Files to cache immediately (critical resources)
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/index.css',
  '/index.jsx',
  '/Assets/Logo.jpg',
  '/Assets/Background.jpg',
  '/sitemap.xml',
  '/robots.txt'
];

// Files to cache dynamically (pages visited by user)
const DYNAMIC_ASSETS = [
  '/AboutUs',
  '/Gallery', 
  '/ContactUs'
];

// Install Event - Cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached successfully');
        return self.skipWaiting(); // Activate immediately
      })
      .catch((error) => {
        console.error('Service Worker: Error caching static assets', error);
      })
  );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete old cache versions
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated successfully');
        return self.clients.claim(); // Take control of all pages
      })
  );
});

// Fetch Event - Serve cached content when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Only handle requests from your domain
  if (url.origin !== location.origin) {
    return;
  }

  // Strategy: Cache First with Network Fallback
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache', request.url);
          return cachedResponse;
        }
        
        // Otherwise fetch from network
        console.log('Service Worker: Fetching from network', request.url);
        return fetch(request)
          .then((networkResponse) => {
            // Only cache successful responses
            if (networkResponse && networkResponse.status === 200) {
              // Clone the response (can only be used once)
              const responseClone = networkResponse.clone();
              
              // Determine which cache to use
              const cacheName = STATIC_ASSETS.includes(url.pathname) ? STATIC_CACHE : DYNAMIC_CACHE;
              
              // Cache the response for future use
              caches.open(cacheName)
                .then((cache) => {
                  cache.put(request, responseClone);
                });
            }
            
            return networkResponse;
          })
          .catch((error) => {
            console.error('Service Worker: Network fetch failed', error);
            
            // Return offline page for navigation requests
            if (request.mode === 'navigate') {
              return caches.match('/') || new Response(
                `<!DOCTYPE html>
                <html>
                <head>
                  <title>LiveWood Studio - Offline</title>
                  <style>
                    body { 
                      font-family: Arial, sans-serif; 
                      text-align: center; 
                      padding: 50px;
                      background-color: #fff7ed;
                      color: #161616;
                    }
                    h1 { color: #8B5A2B; }
                  </style>
                </head>
                <body>
                  <h1>LiveWood Studio</h1>
                  <h2>You're Currently Offline</h2>
                  <p>Please check your internet connection and try again.</p>
                  <p>Call us at (469) 888-1330 for immediate assistance.</p>
                </body>
                </html>`,
                { 
                  headers: { 'Content-Type': 'text/html' }
                }
              );
            }
            
            // For other requests, just fail
            throw error;
          });
      })
  );
});

// Background Sync (for when connection is restored)
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered');
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Add any background sync logic here
      Promise.resolve()
    );
  }
});

// Push notifications (for future use)
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push message received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update from LiveWood Studio',
    icon: '/Assets/Logo.jpg',
    badge: '/Assets/Logo.jpg',
    tag: 'livewood-notification',
    requireInteraction: true
  };
  
  event.waitUntil(
    self.registration.showNotification('LiveWood Studio', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('https://livewoodstudio.com')
  );
});

// Message handling (communication with main thread)
self.addEventListener('message', (event) => {
  console.log('Service Worker: Message received', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Error handling
self.addEventListener('error', (event) => {
  console.error('Service Worker: Error occurred', event.error);
});

// Unhandled promise rejection
self.addEventListener('unhandledrejection', (event) => {
  console.error('Service Worker: Unhandled promise rejection', event.reason);
  event.preventDefault();
});

console.log('Service Worker: Script loaded successfully');
