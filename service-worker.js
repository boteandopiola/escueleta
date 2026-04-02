const CACHE_NAME = "notas-app-v2"; // cambiar la versión para actualizar no olvidar

const urlsToCache = [
  "./",
  "./index.html"
];

self.addEventListener("install", event => {
  self.skipWaiting(); // fuerza instalación inmediata

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache); //  borra cachés viejos
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
