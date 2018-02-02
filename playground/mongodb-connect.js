// const MongoClient = require( 'mongodb' )
// 	.MongoClient;

const {
	MongoClient,
	ObjectID
} = require( 'mongodb' );

var obj = new ObjectID();

console.log( obj );

MongoClient.connect( 'mongodb://localhost:27017/TodoApp', ( err, client ) => {
	if ( err ) {
		return console.log( 'Unable to connect to MongoDb server' );
	}
	var db = client.db( 'Todos' );

	console.log( 'Connected to MongoDb server' );

	// db.collection( 'Todos' )
	// 	.insertOne( {
	// 		text: "second something to do",
	// 		completed: true
	//
	// 	}, ( err, result ) => {
	// 		if ( err ) {
	// 			console.log( 'Unable to insert todo', err );
	// 		}
	// 		console.log( JSON.stringify( result.ops, undefined, 2 ) );
	// 	} )

	// db.collection( 'Users' )
	// 	.insertOne( {
	// 		user: "Petru",
	// 		age: 38,
	// 		location: "Bucharest"
	// 	}, ( err, result ) => {
	// 		if ( err ) {
	// 			console.log( 'unable to connect to DB, users collection' );
	// 		}
	// 		// console.log( typeof ( result ), result );
	// 		console.log( JSON.stringify( result.ops, undefined, 2 ) );
	// 		console.log( result.ops[ 0 ]._id.getTimestamp() );
	// 	} )

	client.close();

} );
