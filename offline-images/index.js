// JavaScript source code
'use-strict';

if ( 'serviceWorker' in navigator )
{
	navigator.serviceWorker.register( 'service-worker.js' ).then( function ( serviceWorker )
	{
		printStatus( 'successful' );
	} ).catch( function ( error )
	{
		printStatus( error );
	} );
}
else
{
	printStatus( 'unavailable' );
}

function printStatus( status )
{
	document.getElementById( 'status' ).innerHTML = status;
}