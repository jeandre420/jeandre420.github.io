// JavaScript source code.

var version = 2;
var cacheName = 'static-' + version;
var cached;

self.addEventListener( 'install', installHandler );
self.addEventListener( 'fetch', fetchHandler );

function installHandler( event )
{
	event.waitUntil( caches.open( cacheName ).then( function ( cache )
	{
		cached = cache.addAll( ['index.html', 'style-2.css'] );
		return cached;
	} ) );
}

function fetchHandler( event )
{
	//if ( /index/.test( event.request.url ) || /style-2/.test( event.request.url ) )
	//{
	//	return event.respondWith( caches.match( cached ));
	//}

	var request = event.request,
		isRequestMethodGET = request.method === 'GET';

	if ( request.mode === 'navigate' || isRequestMethodGET )
	{
		event.respondWith( fetch( request ).catch( function ( error )
		{
			console.log( 'OFFLINE: Returning offline page.', error );
			return caches.match( request );
		} ) );
	}
	else
	{
		event.respondWith( caches.match( request ).then( function ( response )
		{
			return response || fetch( request );
		} ) );
	}

	//	.then( function ( cached )
	//{
	//	var networked = fetch( event.request ).then( fetchedFromNetwork, unableToResolve );

	//	return cached || networked;

	//	function fetchedFromNetwork( response )
	//	{
	//		var cacheCopy = response.clone();

	//		caches.open( cacheName ).then( function add( cache )
	//		{
	//			cache.put( event.request, cacheCopy );
	//		} );

	//		return response;
	//	}

	//	function unableToResolve()
	//	{
	//		return caches.match( event.request );
	//		//return new Response( '<h1>Service Unavailable</h1>', {
	//		//	status: 503,
	//		//	statusText: 'Service Unavailable',
	//		//	headers: new Headers( {'Content-Type': 'text/html'} )
	//		//});
	//	}
	//} ));
}