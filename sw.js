var cacheName="yi-v20230713dev";self.addEventListener("install",(function(e){e.waitUntil(caches.open(cacheName).then((function(e){return e.addAll(["./"])})))})),self.addEventListener("activate",(function(e){e.waitUntil(caches.keys().then((function(e){return Promise.all(e.filter((function(e){return e.startsWith("yi-")&&e!=cacheName})).map((function(e){return caches.delete(e)})))}))),e.waitUntil(caches.open(cacheName).then((function(e){e.delete("/",{ignoreSearch:!0})})))})),self.addEventListener("fetch",(function(e){e.respondWith(caches.open(cacheName).then((function(t){return t.match(e.request,{ignoreSearch:!0})})).then((function(t){return t||fetch(e.request).then((function(t){return t&&200==t.status?caches.open(cacheName).then((function(n){return n.put(e.request.url,t.clone()),t})):t}))})))})),self.addEventListener("message",(function(e){"skipWaiting"===e.data.action&&self.skipWaiting()}));