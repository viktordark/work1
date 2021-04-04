self.addEventListener('install', function (event){
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open("static")
            .then(function (cache){
                console.log("precaching");
                cache.add('/страницы/index/index.html');
                cache.add('/');
            })
    );
});

self.addEventListener('activate', function (event){
    console.log('[Service Worker] Activating Service Worker ...', event);
    return self.clients.claim();
});

self.addEventListener('fetch', function (event){
    console.log('[Service Worker] Fetching something ....', event);
    event.respondWith(
        caches.match(event.request)
            .then(function (response){
                if (response)
                    return response;
                else
                    return fetch(event.request);
            })
    );
});

self.addEventListener('push', event =>{
    const notification = event.data.text();
    self.registration.showNotification(notification, {});
});
