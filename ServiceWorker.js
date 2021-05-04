const VERSION = 'v1';

self.addEventListener('install', event => {
    event.waitUntil(precache());
});

self.addEventListener('fetch', event => {
    const request = event.request;

    // si el método es Get no se hace nada y se reterna para que siga la petición a internet
    if (request.method !== 'GET') {
        return;
    }

    // buscar en cache
    event.respondWith(cachedResponse(request));

    //actualizar el cache
    event.waitUntil(updateCache(request));
});

async function precache() {
    const cache = await caches.open(VERSION);

    // recursos
    return cache.addAll([
        // '/',
        // '/index.html',
        // '/assets/index.js',
        // '/assets/MediaPlayer.js',
        // '/assets/style.css',
        // '/assets/BigBuckBunny.mp4',
        // '/assets/plugins/AutoPlay.js',
        // '/assets/plugins/AutoPause.js'
    ]);
}

async function cachedResponse(request) {
    const cache = await caches.open(VERSION);
    const response = await cache.match(request);

    // retorna si lo encontró en cache de lo contrario responde con lo que hya de internet
    return response || fetch(request);
}

async function updateCache(request) {
    const cache = await caches.open(VERSION);
    const response = await fetch(request);

    // return cache.put(request, response);

    // Cache.put when status code is 200 
    // Otherwise return a simple promise 
    return response.status === 200 ?
        cache.put(request, response) :
        new Promise((resolve, reject) => resolve(':D'));

}