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

	db.collection( 'Todos' )
		.findOneAndUpdate( {
			_id: new ObjectID( '5a742ad9360ffe54b99f6d24' )
		}, {
			$set: {
				completed: true
			}
		}, {
			returnOriginal: false
		} )
		.then( ( result ) => {
			console.log( result );
		} )

	// client.close();

} );
