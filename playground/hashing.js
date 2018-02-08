const {
	SHA256
} = require( 'crypto-js' );

const bcrypt = require( 'bcryptjs' );

var password = '123abc!';

bcrypt.genSalt( 10, ( err, salt ) => {
	bcrypt.hash( password, salt, ( err, hash ) => {
		console.log( hash );
	} )
} );

// const jwt = require( 'jsonwebtoken' );
//
// var message = "i am nr 3";
// var hash = SHA256( message )
// 	.toString();
//
// console.log( 'message ', message );
// console.log( 'hash ', hash );


var hashedPassword = "$2a$10$hEbK2R6K3urdMbuyz7GJKeGQXz4oYOoEWJvnigD/ar5gLu1U1wyl6";

bcrypt.compare( 'jhj', hashedPassword, ( err, res ) => {
	console.log( res );
} );
