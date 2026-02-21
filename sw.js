const CACHE_NAME = 'etiquetadora-v3';

self.addEventListener('install', (e) => {
    self.skipWaiting(); // Força a instalação da nova versão imediatamente
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                './',
                './index.html',
                './manifest.json',
                './icon.png'
            ]);
        })
    );
});

self.addEventListener('activate', (e) => {
    // Apaga as memórias das versões antigas (v1 e v2)
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', (e) => {
    // Tenta pegar da internet primeiro (para ver se tem atualização). 
    // Se estiver sem internet, puxa do cache offline.
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
