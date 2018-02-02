// const MongoClient = require( 'mongodb' )
// 	.MongoClient;

const {
	MongoClient,
	ObjectID
} = require( 'mongodb' );



MongoClient.connect( 'mongodb://localhost:27017/TodoApp', ( err, client ) => {
	if ( err ) {
		return console.log( 'Unable to connect to MongoDb server' );
	}
	var db = client.db( 'Todos' );

	console.log( 'Connected to MongoDb server' );

	//deleteMany
	// db.collection( 'Todos' )
	// 	.deleteMany( {
	// 		text: "eat lunch"
	// 	} )
	// 	.then( ( result ) => {
	// 		console.log( result );
	// 	} );

	// deleteOne

	// db.collection( 'Todos' )
	// 	.deleteOne( {
	// 		text: 'eat lunch'
	// 	} )
	// 	.then( ( result ) => {
	// 		console.log( result );
	// 	} )

	//findOneAndDelete

	// db.collection( 'Todos' )
	// 	.findOneAndDelete( {
	// 		completed: false
	// 	} )
	// 	.then( ( result ) => {
	// 		console.log( result );
	// 	} );

	// db.collection( 'Users' )
	// 	.deleteMany( {
	// 		user: "Petru"
	// 	} )
	// 	.then( ( result ) => {
	// 		console.log( result );
	// 	} );

	db.collection( 'Users' )
		.findOneAndDelete( {
			_id: new ObjectID( "5a742e3e360ffe54b99f6e71" )
		} )
		.then( ( result ) => {
			console.log( result, result.value.age );
		} );

	// client.close();

} );
