// Bicomex Web Service Worker v2.0
// Advanced caching strategies và performance optimization

const CACHE_NAME = 'bicomex-web-v2';
const STATIC_CACHE = 'bicomex-static-v2';
const DYNAMIC_CACHE = 'bicomex-dynamic-v2';
const API_CACHE = 'bicomex-api-v2';

// Cache expiration times (in milliseconds)
const CACHE_EXPIRATION = {
  static: 7 * 24 * 60 * 60 * 1000, // 7 days
  dynamic: 3 * 24 * 60 * 60 * 1000, // 3 days
  api: 1 * 60 * 60 * 1000, // 1 hour
  images: 30 * 24 * 60 * 60 * 1000 // 30 days
};

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/logo.png'
];

// Static resources for cache-first strategy
const STATIC_RESOURCES = [
  /\.js$/,
  /\.css$/,
  /\.woff2?$/,
  /\.ttf$/,
  /\.otf$/
];

// Dynamic resources for network-first strategy
const DYNAMIC_RESOURCES = [
  /\/api\//,
  /\.json$/
];

// Image resources for stale-while-revalidate
const IMAGE_RESOURCES = [
  /\.jpg$/,
  /\.jpeg$/,
  /\.png$/,
  /\.gif$/,
  /\.webp$/,
  /\.svg$/
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker v2.0');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching critical resources');
        return cache.addAll(CRITICAL_RESOURCES.map(url => 
          new Request(url, { cache: 'reload' })
        ));
      })
      .then(() => {
        console.log('[SW] Service worker installed successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Installation failed:', error);
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker v2.0');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && 
                cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== API_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension requests
  if (url.protocol === 'chrome-extension:') {
    return;
  }
  
  // Skip webpack HMR requests in development
  if (url.pathname.includes('__vite_ping') || 
      url.pathname.includes('@vite/client') ||
      url.pathname.includes('/__vite_dev_assets/')) {
    return;
  }
  
  event.respondWith(getCachedResponse(request));
});

// Get cached response with appropriate strategy
async function getCachedResponse(request) {
  const url = new URL(request.url);
  
  try {
    // Strategy 1: Cache-first for static resources
    if (isStaticResource(url)) {
      return await cacheFirstStrategy(request, STATIC_CACHE);
    }
    
    // Strategy 2: Network-first for API and dynamic content
    if (isDynamicResource(url)) {
      return await networkFirstStrategy(request, DYNAMIC_CACHE);
    }
    
    // Strategy 3: Stale-while-revalidate for images
    if (isImageResource(url)) {
      return await staleWhileRevalidateStrategy(request, STATIC_CACHE);
    }
    
    // Strategy 4: Network-first with cache fallback for HTML
    return await networkFirstStrategy(request, DYNAMIC_CACHE);
    
  } catch (error) {
    console.error('[SW] Fetch error:', error);
    
    // Return offline fallback if available
    if (request.destination === 'document') {
      const cache = await caches.open(STATIC_CACHE);
      return await cache.match('/') || new Response('Offline', { status: 503 });
    }
    
    return new Response('Network error', { status: 503 });
  }
}

// Cache-first strategy
async function cacheFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse && !isExpired(cachedResponse)) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone();
      addTimestamp(responseToCache);
      cache.put(request, responseToCache);
    }
    return networkResponse;
  } catch (error) {
    return cachedResponse || new Response('Offline', { status: 503 });
  }
}

// Network-first strategy
async function networkFirstStrategy(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      const responseToCache = networkResponse.clone();
      addTimestamp(responseToCache);
      cache.put(request, responseToCache);
    }
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    return cachedResponse || new Response('Offline', { status: 503 });
  }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidateStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  // Always try to update in background
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone();
      addTimestamp(responseToCache);
      cache.put(request, responseToCache);
    }
    return networkResponse;
  }).catch(() => {
    // Silently fail background update
  });
  
  // Return cached version immediately if available
  return cachedResponse || fetchPromise;
}

// Helper functions
function isStaticResource(url) {
  return STATIC_RESOURCES.some(pattern => pattern.test(url.pathname));
}

function isDynamicResource(url) {
  return DYNAMIC_RESOURCES.some(pattern => pattern.test(url.pathname));
}

function isImageResource(url) {
  return IMAGE_RESOURCES.some(pattern => pattern.test(url.pathname));
}

function addTimestamp(response) {
  if (response.headers) {
    response.headers.set('sw-cached-at', Date.now().toString());
  }
}

function isExpired(response) {
  const cachedAt = response.headers.get('sw-cached-at');
  if (!cachedAt) return false;
  
  const age = Date.now() - parseInt(cachedAt);
  const url = new URL(response.url);
  
  if (isImageResource(url)) {
    return age > CACHE_EXPIRATION.images;
  } else if (isStaticResource(url)) {
    return age > CACHE_EXPIRATION.static;
  } else if (isDynamicResource(url)) {
    return age > CACHE_EXPIRATION.dynamic;
  }
  
  return age > CACHE_EXPIRATION.dynamic;
}

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('[SW] Background sync triggered');
    event.waitUntil(
      // Handle offline actions when connection is restored
      handleBackgroundSync()
    );
  }
});

async function handleBackgroundSync() {
  // Implementation for handling offline form submissions, etc.
  console.log('[SW] Handling background sync tasks');
}

// Push notification handling (for future use)
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
  // Handle push notifications
});

// Cache cleanup on quota exceeded
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEANUP_CACHE') {
    event.waitUntil(cleanupCache());
  }
});

async function cleanupCache() {
  const cacheNames = await caches.keys();
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();
    
    // Remove expired entries
    for (const request of requests) {
      const response = await cache.match(request);
      if (response && isExpired(response)) {
        await cache.delete(request);
      }
    }
  }
  console.log('[SW] Cache cleanup completed');
}

console.log('[SW] Service worker v2.0 loaded successfully');