// Clear Service Worker Cache Script
// Chạy script này để xóa cache service worker cũ

console.log('🧹 Clearing Service Worker caches...');

// Unregister all service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
      console.log('SW unregistered:', registration);
    }
  });
}

// Clear all caches
if ('caches' in window) {
  caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        console.log('Deleting cache:', cacheName);
        return caches.delete(cacheName);
      })
    );
  }).then(function() {
    console.log('✅ All caches cleared!');
    console.log('🔄 Please refresh the page manually');
  });
}

// Force reload after clearing
setTimeout(() => {
  window.location.reload(true);
}, 1000);
