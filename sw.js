const CACHE_NAME = 'balatro-v2';
const urlsToCache = [
    './',
    './index.html',
    './love.min.js',
    './module.part1.js',
    './module.part2.js',
    './module.part3.js',
    './module.part4.js',
    './module.part5.js',
    './module.part6.js',
    './module.part7.js',
    './game.love'
];

// Install: Cache all assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache opened');
                return cache.addAll(urlsToCache);
            })
            .catch(err => console.log('Cache failed:', err))
    );
    self.skipWaiting();
});

// Fetch: Serve from cache, fallback to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch new
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Activate: Clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});
