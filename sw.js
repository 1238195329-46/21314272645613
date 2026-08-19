const CACHE_NAME = 'balatro-v1';
const FILES = [
    './', './index.html', './love.min.js',
    './module.part1.js', './module.part2.js', './module.part3.js',
    './module.part4.js', './module.part5.js', './module.part6.js',
    './module.part7.js', './game.love'
];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(FILES)));
    self.skipWaiting();
});

self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(keys => 
        Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ));
    self.clients.claim();
});
