// JavaScript source code
var version = 2;
var cacheName = 'static-' + version;

self.addEventListener( 'install', installHandler );
self.addEventListener( 'fetch', fetchHandler );

function installHandler( event )
{
	event.waitUntil( caches.open( cacheName ).then( function ( cache )
	{
		return cache.addAll( ['index.html', 'style-2.css'] );
	} ) );
}

function fetchHandler( event )
{
	event.respondWith( caches.match( event.request ).then( function ( cached )
	{
		var networked = fetch( event.request ).then( fetchedFromNetwork, unableToResolve ).catch( unableToResolve );

		return cached || networked;

		function fetchedFromNetwork( response )
		{
			var cacheCopy = response.clone();

			caches.open( cacheName ).then( function add( cache )
			{
				cache.put( event.request, cacheCopy );
			} );

			return response;
		}

		function unableToResolve()
		{
			return new Response( '<h1>Service Unavailable</h1>', {
				status: 503,
				statusText: 'Service Unavailable',
				headers: new Headers( {'Content-Type': 'text/html'} )
			});
		}
	} ));
	//if ( /index/.test( event.request.url ) || /style-2/.test( event.request.url ) )
	//{
	//}
}