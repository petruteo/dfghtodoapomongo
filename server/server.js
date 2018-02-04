var express = require( 'express' );
var bodyParser = require( 'body-parser' );
const {
	ObjectID
} = require( 'mongodb' );


var {
	mongoose
} = require( './db/mongoose.js' );
var {
	Todo
} = require( './models/todo.js' );
var {
	User
} = require( './models/user.js' );

var app = express();
var port = process.env.PORT || 3000;

app.use( bodyParser.json() );

app.post( '/todos', ( req, res ) => {
	console.log( req.body.text );
	var todo = new Todo( {
		text: req.body.text
	} );
	todo.save()
		.then( ( doc ) => {
			res.send( doc );
		}, ( e ) => {
			res.status( 400 )
				.send( e );
		} );
} );

// app.get( '/todos', ( req, res ) => {
// 	//handle err
// 	// insert in db
// } );

app.get( '/todos/:id', ( req, res ) => {
	var id = req.params.id;
	if ( !ObjectID.isValid( id ) ) {
		console.log( 'todo ID not valid, try again' );
		res.status( 404 )
			.send();
	} else {
		Todo.findById( id )
			.then( ( todo ) => {

					if ( todo === null ) {
						console.log( 'todo inexistent' );
						res.status( 404 )
							.send();
					} else {
						res.send(
							todo
						);
					};
				},
				( e ) => {
					console.log( 'TODO NOT NOT FOUND found, try again' );
					res.status( 404 )
						.send();
				} );
	};


} );

app.listen( port, () => {
	console.log( `listen on ${port}` );
} );

module.exports = {
	app
};
