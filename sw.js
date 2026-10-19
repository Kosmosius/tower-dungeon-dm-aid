const CACHE_PREFIX='crown-shell:'+new URL(self.registration.scope).pathname+':';
const CACHE=CACHE_PREFIX+'81b20be6dc3be284';
const FILES=["./.nojekyll","./THIRD_PARTY_NOTICES.txt","./apple-touch-icon.png","./asset-manifest.json","./assets/index-Ddq3kus9.css","./assets/index-ls5VwN01.js","./credits.html","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./icon-maskable.svg","./icon.svg","./index.html","./manifest.webmanifest"];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(CACHE_PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==self.location.origin)return;
 event.respondWith(caches.open(CACHE).then(cache=>cache.match(event.request).then(hit=>{
  if(hit)return hit;
  return fetch(event.request).catch(()=>event.request.mode==='navigate'?cache.match(new URL('./index.html',self.location.href).href):Response.error());
 })));
});