const {
	SHA256
} = require( 'crypto-js' );

const jwt = require( 'jsonwebtoken' );

var message = "i am nr 3";
var hash = SHA256( message )
	.toString();

console.log( 'message ', message );
console.log( 'hash ', hash );
