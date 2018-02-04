const {
	mongoose
} = require( './../server/db/mongoose.js' );
const {
	ObjectID
} = require( 'mongodb' );
const {
	Todo
} = require( './../server/models/todo.js' );

const {
	User
} = require( './../server/models/user.js' );

console.log( typeof ( User ) );

// var id = '5a755427d68a597a480d1d89';
//
// if ( !ObjectID.isValid( id ) ) {
// 	console.log( 'id not valid' );
// }
//
// Todo.find( {
// 		_id: id
// 	} )
// 	.then( ( todos ) => {
// 		console.log( 'Todos are: ', todos );
// 	} );
//
// Todo.findOne( {
// 		_id: id
// 	} )
// 	.then( ( todo ) => {
// 		console.log( 'Todo is: ', todo );
// 	} );
//
// Todo.findById( id )
// 	.then( ( todo ) => {
// 		if ( !todo ) {
// 			console.log( 'id not found' );
// 		}
// 		console.log( 'Todo by id: ', todo );
// 	} )
// 	.catch( ( e ) => {
// 		console.log( e );
// 	} );

//5a74cb43f70e5758b244ed51

User.findById( '5a74cb43f70e5758b244ed51' )
	.then( ( user ) => {
		console.log( 'userul e: ', JSON.stringify( user, undefined, 2 ) );
	} )
	.catch( ( e ) => {
		console.log( 'eroare' )
	} );

console.log( 'final' );
