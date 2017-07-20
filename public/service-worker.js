/**
 * Name and version number
 */
var CACHE = 'mysiacoin-v1';

/**
 * List of static URLs to cache for offline use
 */
var urls = [
    '/',
    '/manifest.json',
    '/service-worker.js',
    '/js/app.js',
    '/js/app.js.map',
    '/img/hero-min.png',
    '/img/sia.svg',
    '/android-icon-36x36.png',
    '/android-icon-48x48.png',
    '/android-icon-72x72.png',
    '/android-icon-96x96.png',
    '/android-icon-144x144.png',
    '/android-icon-192x192.png',
    '/apple-icon.png',
    '/apple-icon-precomposed.png',
    '/apple-icon-57x57.png',
    '/apple-icon-60x60.png',
    '/apple-icon-72x72.png',
    '/apple-icon-76x76.png',
    '/apple-icon-114x114.png',
    '/apple-icon-120x120.png',
    '/apple-icon-144x144.png',
    '/apple-icon-152x152.png',
    '/apple-icon-180x180.png',
    '/favicon.ico',
    '/favicon-16x16.png',
    '/favicon-32x32.png',
    '/favicon-96x96.png',
    '/ms-icon-70x70.png',
    '/ms-icon-144x144.png',
    '/ms-icon-150x150.png',
    '/ms-icon-310x310.png',
    '//fonts.googleapis.com/css?family=Roboto+Slab',
    '//cdn.rawgit.com/roccstar/sia-coldstorage-json/master/build/sia-coldstorage-json.min.js'
];

/**
 * Service worker install event
 */
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE)
            .then(function (cache) {
                return cache.addAll(urls);
            })
    );
    event.waitUntil(self.skipWaiting());
});

/**
 * Service worker fetch event
 */
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // returned cached response if exists
                // or fetch new response
                return response ?
                    response :
                    fetch(event.request).then(function(resp) {
                        if (resp.status < 400) {
                            // clone response
                            var clone = resp.clone();

                            // open up cache store
                            caches.open(CACHE).then(function(cache) {
                                // cache cloned response
                                cache.put(event.request.url, clone);
                            });
                        }

                        // return original response
                        return resp;
                    });
            })
    );
});

/**
 * Service worker update and housekeeping event
 */
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cache) {
                    if(cache !== CACHE) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
