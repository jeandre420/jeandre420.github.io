// JavaScript source code
'use strict';

var cacheName = 'dependencies-cache';

self.addEventListener( 'install', function ( event )
{
	event.waitUntil( caches.open( cacheName )
		.then( function ( cache )
		{
			return cache.addAll( [
				'./index.html',
				//'./style.css',
				//'./index.js',
				//'./game.js',
				'./apple-logo.png',
				'./google-logo.png',
				'./adobe-logo.png',
				'./facebook-logo.png',
				'./amazon-logo.png'
			] );
		} )
		.then( function ()
		{
			return self.skipWaiting();
		} )
	);
} );

self.addEventListener( 'fetch', function ( event )
{
	event.respondWith( caches.match( event.request )
		.then( function ( response )
		{
			if ( response )
			{
				console.log( 'Fetching from the cache: ', event.request.url );
				return response;
			}
			else
			{
				console.log( 'Fetching from server: ', event.request.url );
			}

			return fetch( event.request );
		} )
	);
} );

self.addEventListener( 'activate', function ( event )
{
	console.log( 'Activating the service worker!' );
	event.waitUntil( self.clients.claim() );
} );