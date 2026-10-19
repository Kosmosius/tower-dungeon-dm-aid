const CACHE_PREFIX='crown-shell:'+new URL(self.registration.scope).pathname+':';
const CACHE=CACHE_PREFIX+'13fb18313d92d13e';
const FILES=["./.nojekyll","./DOWNLOAD_README.txt","./THIRD_PARTY_NOTICES.txt","./apple-touch-icon.png","./asset-manifest.json","./assets/index-By7xWW9q.js","./assets/index-Ddq3kus9.css","./credits.html","./default.crownpack.json","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./icon-maskable.svg","./icon.svg","./index.html","./manifest.webmanifest"];
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