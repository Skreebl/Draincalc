const CACHE_NAME = 'boraregar-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Встановлення та кешування файлів
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Перехоплення запитів (віддача з кешу, якщо немає мережі)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Повертаємо файл з кешу, або завантажуємо з інтернету
        return response || fetch(event.request);
      })
  );
});
