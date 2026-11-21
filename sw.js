/**
 * THE MENTALIST - SERVICE WORKER
 * Cache-first strategy for core shell, network-first for dynamic external integrations.
 */

const CACHE_NAME = 'mentalist-v1.3.0-final';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './config/flutterwave.config.js',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/logo-shield.png',
  './assets/images/mentalist_avatar.jpg',
  './css/theme.css',
  './css/layout.css',
  './css/interrogation.css',
  './css/wallet.css',
  './css/gym.css',
  './css/radar.css',
  './css/empire.css',
  './js/app.js',
  './js/audio.js',
  './js/storage.js',
  './js/pwa.js',
  './js/economy.js',
  './js/payment.js',
  './js/bonds.js',
  './js/stateMachine.js',
  './js/escalation.js',
  './js/scenarios.js',
  './js/interrogationEngine.js',
  './js/yard.js',
  './js/cbtGym.js',
  './js/probabilityGym.js',
  './js/radarChart.js',
  './js/empire.js',
  './js/dossiers.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline shell v1.1.0');
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn('[ServiceWorker] Cache pre-fill partial warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing obsolete cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Always let Flutterwave API and external checkout calls pass directly through network
  if (event.request.url.includes('flutterwave.com')) {
    return;
  }

  // Network-First for local assets to ensure live updates, falling back to cache offline
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          event.request.method === 'GET' &&
          event.request.url.startsWith(self.location.origin)
        ) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
