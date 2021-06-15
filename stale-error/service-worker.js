var version = 1;
var cacheName = 'stale- ' + version;

self.addEventListener( 'install', function ( event )
{
	self.skipWaiting();
} );

self.addEventListener( 'activate', function ( event )
{
	if ( self.clients && clients.claim )
	{
		clients.claim();
	}
} );

self.addEventListener( 'fetch', function ( event )
{
	// fetch response from network.
	event.respondWith( fetch( event.request ).then( function ( response )
	{
		caches.open( cacheName ).then( function ( cache )
		{
			// If we receive an error response, return stale version from cache.
			if ( response.status >= 500 )
			{
				cache.match( event.request ).then( function ( response )
				{
					// return stale version from cache.
					return response;
				} ) // If we don't find the stale version we return the network respons
				.catch( function ()
				{
					return response;
				} );
			} // If response was successfull we update the cached version.
			else
			{
				cache.put( event.request, response.clone() );
				return response;
			}
		} );
	} ) );
} );

// Allows key/value pairs to be added to the current cache object. 
// The put() method overrides any key / value pair previously stored in the cache that matches the request.
fetch( url ).then( function ( response )
{
	return cache.put( url, response );
} );