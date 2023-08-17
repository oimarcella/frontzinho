// Nome do cache
const CACHE_NAME = 'petpass-cache-v1';

// Arquivos a serem armazenados em cache
const cacheFiles = [
    '/',
    '/index.html',
    '/main.css',
    '/script.js',
    // Adicione outros arquivos do seu aplicativo aqui
];

// Instalação do Service Worker e armazenamento em cache de recursos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(cacheFiles))
    );
});

// Interceptando solicitações e servindo a partir do cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

// Removendo caches antigos durante a ativação
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
});
