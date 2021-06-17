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

respondWith( fetch( request ).catch( function ()
{
	return caches.match( request );
} )
);