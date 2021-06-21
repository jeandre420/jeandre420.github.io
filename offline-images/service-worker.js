// JavaScript source code
'use strict';

var version = 1;
var cacheName = 'static-' + version;

self.addEventListener( 'install', function ( event )
{
	event.waitUntil( caches.open( cacheName ).then( function ( cache )
	{
		return cache.addAll( ['index.html', 'packt-logo.png'] );
	} )
	);
} );


self.addEventListener( 'fetch', function ( event )
{
	event.respondWith( new Response(fetch( event.request )).catch( function (error)
	{
		console.log( 'OFFLINE: Showing offline page', error );
		return caches.match( event.request.cache );
	} )
	);
} );

//function installHandler( event )
//{
//	event.waitUntil( caches.open( cacheName ).then( function ( cache )
//	{
//		return cache.addAll( ['index.html', 'packt-logo.png'] );
//	} )
//	);
//}

//function fetchHandler( event )
//{
//	event.respondWith( fetch( event.request ).catch( function ()
//	{
//		return caches.match( event.request );
//		//const cache = event.waitUntil( caches.open( cacheName ) );
//		//const cachedResponse = cache.match( cacheName );
//		//return cachedResponse;
//	} )
//	);
//}