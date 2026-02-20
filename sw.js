// Service Worker básico para forçar a instalação do PWA
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Instalado');
});

self.addEventListener('fetch', (e) => {
    // Apenas intercepta as requisições para passar na validação do PWA
});
