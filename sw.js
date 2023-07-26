var cacheName = 'yi-v20230726';
self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(cacheName).then(function(cache){
			return cache.addAll(['./']);
		})
	);
});

self.addEventListener('activate', function(event){
	event.waitUntil(
		var keys = caches.keys;
		console.log('caches.keys：', keys);
		caches.keys().then(function(keyList){
			return Promise.all(
				keyList.filter(function(key
				    console.log('key:', key);
					return key.startsWith('yi-') && key != cacheName;
				}).map(function(key){
					return caches.delete(key);
				})
			);
		})
	);
	event.waitUntil(
		caches.open(cacheName)
		.then(function(cache){
			//delete the cached default page (./) from the browser's local cache
			cache.delete('./',{ignoreSearch: true});
		})
	);		
});

self.addEventListener("fetch", function(event) {
	event.respondWith(
		caches.open(cacheName)
		.then(function(cache){return cache.match(event.request, {ignoreSearch: true});})
		.then(function(resp){
			if(resp) return resp;
			return fetch(event.request).then(function(response){
				if(response && response.status == 200) {
					return caches.open(cacheName).then(function(cache){
						cache.put(event.request.url, response.clone());
						return response;
					});
				} else
					return response;
			});
		})
	);
});

self.addEventListener('message', function(event){
	if(event.data.action === 'skipWaiting') {
		self.skipWaiting();
	}
});

