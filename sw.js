const CACHE_PREFIX = "dsq-cache";
const CACHE_VERSION = "0.0.3";
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VERSION}`;

const urlsToCache = [
  "./index.html",
  "./src/style.css",
  "./src/common.css",
  "./src/main.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// 清除之前旧的缓存
self.addEventListener("activate", (event) => {
  const whiteList = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (whiteList.indexOf(cacheName) === -1) {
            caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 拦截请求
self.addEventListener("fetch", (event) => {
  const urlObj = new URL(event.request.url);
  if (urlsToCache.includes(urlObj.pathname)) {
    console.log("ff", urlObj.pathname);
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          // event.waitUntil(cache.add(event.request));
          return cachedResponse;
        }
        return fetch(event.request);
      })()
    );
  }
});
