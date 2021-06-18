// JavaScript source code
'use strict';

var version = 1;
var cacheName = 'static-' + version;

self.addEventListener( 'install', installHandler );
self.addEventListener( 'fetch', fetchHandler );

function installHandler( event )
{
	event.waitUntil( caches.open( cacheName ).then( function ( cache )
	{
		return cache.addAll( ['index.html', 'packt-logo.png'] );
	} )
	);
}

function fetchHandler( event )
{
	event.respondWith( (async () => 
	{
		const r = await caches.match( event.request );

		if ( r ) {return r;}
		//const cache = event.waitUntil( caches.open( cacheName ) );
		//const cachedResponse = cache.match( cacheName );
		//return cachedResponse;
	} )()
	);
}