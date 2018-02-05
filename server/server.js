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

//******************************
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

//******************************
app.get( '/todos/', ( req, res ) => {
	console.log( 'print all as no ID was provided' );
	Todo.find( {} )
		.then( ( all ) => {
			res.send( all );
		}, ( e ) => {
			console.log( 'db error' );
			res.status( 404 )
				.send();
		} )
} );

//******************************
app.get( '/todos/:id', ( req, res ) => {
	var id = req.params.id;
	console.log( "asta e id-ul", id );
	if ( id === null ) {
		res.send( {
			"all": "imediat"
		} );
	};
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

//******************************
app.delete( '/todos/:id', ( req, res ) => {
	//validate the ID
	var id = req.params.id;

	// console.log( 'id-ul este', obj );

	if ( !ObjectID.isValid( id ) ) {
		console.log( 'id not valid', id );
		return res.status( 404 )
			.send();
	};

	//check if id in db
	Todo.findByIdAndRemove( id )
		.then( ( item ) => {
			if ( item !== null ) {
				console.log( 'item deleted: ', item );
				res.send( item );
			} else {
				console.log( 'object with ID not found, try again' );
				res.status( 404 )
					.send();
			};


		}, ( e ) => {
			console.log( 'object with ID not found, try again' );
			res.status( 404 )
				.send();
		} );

}, ( e ) => {
	'content was not deteled by error:',
	e
} );

//******************************

app.listen( port, () => {
	console.log( `listen on ${port}` );
} );

module.exports = {
	app
};
