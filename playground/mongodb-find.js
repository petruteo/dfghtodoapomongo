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

	// db.collection( 'Todos' )
	// 	.find( {
	// 		_id: new ObjectID( '5a7335d37af03340a597ec6b' )
	// 	} )
	// 	.toArray()
	// 	.then( ( docs ) => {
	// 		console.log( 'Todos' );
	// 		console.log( JSON.stringify( docs, undefined, 2 ) );
	//
	// 	}, err => {
	// 		console.log( 'unable to ', err );
	// 	} )
	//
	// db.collection( 'Todos' )
	// 	.count()
	// 	.then( ( count ) => {
	// 		console.log( 'todos count' );
	// 		console.log( count );
	//
	// 	}, err => {
	// 		console.log( 'unable to ', err );
	// 	} )


	db.collection( 'Users' )
		.find( {
			user: "Petru"
		} )
		.toArray()
		.then( ( records ) => {
			console.log( 'recordings with Petru name', JSON.stringify( records, undefined, 4 ) );
		}, ( err ) => {
			console.log( 'o erroare', err );
		} )



	client.close();

} );
