// Bicomex Web Advanced Service Worker v2.0
// Enhanced caching strategies and performance optimization

const CACHE_VERSION = 'v2.0.0';
const CACHE_NAME = `bicomex-cache-${CACHE_VERSION}`;
const RUNTIME_CACHE = `bicomex-runtime-${CACHE_VERSION}`;
const IMAGE_CACHE = `bicomex-images-${CACHE_VERSION}`;
const API_CACHE = `bicomex-api-${CACHE_VERSION}`;

// Cache strategies configuration
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only'
};

// Cache configurations for different resource types
const CACHE_CONFIG = {
  // Static assets - Cache First (lâu dài)
  static: {
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
    maxEntries: 200
  },
  // Dynamic content - Stale While Revalidate
  dynamic: {
    strategy: CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    maxEntries: 100
  },
  // Images - Cache First với compression
  images: {
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    maxEntries: 500
  },
  // API responses - Network First
  api: {
    strategy: CACHE_STRATEGIES.NETWORK_FIRST,
    maxAge: 5 * 60 * 1000, // 5 minutes
    maxEntries: 50
  }
};

// Static files to precache
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/logo.png'
];

// Install event - Precache static assets
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Precaching static assets');
      return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { cache: 'reload' })));
    }).then(() => {
      console.log('[SW] Static assets precached successfully');
      return self.skipWaiting();
    }).catch(error => {
      console.error('[SW] Precaching failed:', error);
    })
  );
});

// Activate event - Clean old caches
self.adrentListener('activate', event => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    Promise.all([
      // Clean old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME && 
                cacheName !== RUNTIME_CACHE && 
                cacheName !== IMAGE_CACHE && 
                cacheName !== API_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all clients
      self.clients.claim()
    ]).then(() => {
      console.log('[SW] Service worker activated successfully');
    })
  );
});

// Enhanced fetch handler with intelligent caching
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests (unless from known CDNs)
  if (url.origin !== location.origin && !isTrustedCDN(url.origin)) {
    return;
  }

  event.respondWith(handleFetchRequest(request));
});

// Main fetch handler
async function handleFetchRequest(request) {
  const url = new URL(request.url);
  
  try {
    // Route requests to appropriate cache strategy
    if (isStaticAsset(url)) {
      return await cacheFirst(request, CACHE_NAME, CACHE_CONFIG.static);
    } else if (isImage(url)) {
      return await cacheFirstWithCompression(request, IMAGE_CACHE, CACHE_CONFIG.images);
    } else if (isAPIRequest(url)) {
      return await networkFirst(request, API_CACHE, CACHE_CONFIG.api);
    } else if (isHTML(url)) {
      return await staleWhileRevalidate(request, RUNTIME_CACHE, CACHE_CONFIG.dynamic);
    } else {
      return await staleWhileRevalidate(request, RUNTIME_CACHE, CACHE_CONFIG.dynamic);
    }
  } catch (error) {
    console.error('[SW] Fetch failed:', error);
    return await handleFetchError(request, error);
  }
}

// Cache-First strategy
async function cacheFirst(request, cacheName, config) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse && !isExpired(cachedResponse, config.maxAge)) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
      await cleanupCache(cache, config.maxEntries);
    }
    return networkResponse;
  } catch (error) {
    if (cachedResponse) {
      return cachedResponse; // Return stale cache as fallback
    }
    throw error;
  }
}

// Network-First strategy
async function networkFirst(request, cacheName, config) {
  const cache = await caches.open(cacheName);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
      await cleanupCache(cache, config.maxEntries);
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    if (cachedResponse && !isExpired(cachedResponse, config.maxAge)) {
      return cachedResponse;
    }
    throw error;
  }
}

// Stale-While-Revalidate strategy
async function staleWhileRevalidate(request, cacheName, config) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  // Always try to fetch from network in background
  const networkPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
      cleanupCache(cache, config.maxEntries);
    }
    return networkResponse;
  }).catch(() => {
    // Network failed, no action needed if we have cache
  });
  
  // Return cache immediately if available and not expired
  if (cachedResponse && !isExpired(cachedResponse, config.maxAge)) {
    return cachedResponse;
  }
  
  // Wait for network if no cache or cache expired
  return await networkPromise;
}

// Cache-First with image compression
async function cacheFirstWithCompression(request, cacheName, config) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse && !isExpired(cachedResponse, config.maxAge)) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
      await cleanupCache(cache, config.maxEntries);
      return networkResponse;
    }
    return networkResponse;
  } catch (error) {
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Utility functions
function isStaticAsset(url) {
  return /\.(js|css|woff2?|ttf|eot)$/i.test(url.pathname);
}

function isImage(url) {
  return /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(url.pathname);
}

function isAPIRequest(url) {
  return url.pathname.startsWith('/api/') || 
         url.hostname.includes('api.') ||
         url.pathname.includes('/graphql');
}

function isHTML(url) {
  return url.pathname.endsWith('.html') || 
         (!url.pathname.includes('.') && url.pathname.endsWith('/'));
}

function isTrustedCDN(origin) {
  const trustedDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'cdn.jsdelivr.net',
    'unpkg.com',
    'bizweb.dktcdn.net',
    'images.unsplash.com'
  ];
  return trustedDomains.some(domain => origin.includes(domain));
}

function isExpired(response, maxAge) {
  const dateHeader = response.headers.get('date');
  if (!dateHeader) return false;
  
  const responseDate = new Date(dateHeader);
  const now = new Date();
  
  return (now.getTime() - responseDate.getTime()) > maxAge;
}

async function cleanupCache(cache, maxEntries) {
  const keys = await cache.keys();
  if (keys.length > maxEntries) {
    // Remove oldest entries
    const entriesToDelete = keys.slice(0, keys.length - maxEntries);
    await Promise.all(entriesToDelete.map(key => cache.delete(key)));
  }
}

// Error handling
async function handleFetchError(request, error) {
  console.error('[SW] Fetch error:', error);
  
  // Try to return any cached version
  const caches_to_try = [CACHE_NAME, RUNTIME_CACHE, IMAGE_CACHE, API_CACHE];
  
  for (const cacheName of caches_to_try) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
  }
  
  throw error;
}

// Background sync for analytics
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  console.log('[SW] Performing background sync');
}

// Push notifications (if needed)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/logo.png',
        badge: '/favicon.ico'
      })
    );
  }
});

console.log('[SW] Advanced service worker loaded successfully');
