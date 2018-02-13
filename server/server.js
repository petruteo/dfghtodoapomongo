require( './config/config.js' );

const _ = require( 'lodash' );
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const {
	ObjectID
} = require( 'mongodb' );
const bcrypt = require( 'bcryptjs' );


var {
	mongoose
} = require( './db/mongoose.js' );
var {
	Todo
} = require( './models/todo.js' );
var {
	User
} = require( './models/user.js' );

var {
	authenticate
} = require( './middleware/authenticate.js' );

var app = express();
var port = process.env.PORT;

app.use( bodyParser.json() );

//******************************
app.post( '/todos', authenticate, ( req, res ) => {
	console.log( req.body.text );
	var todo = new Todo( {
		text: req.body.text,
		_creator: req.user._id
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
app.get( '/todos/', authenticate, ( req, res ) => {
	console.log( 'print all as no ID was provided' );
	Todo.find( {
			_creator: req.user._id
		} )
		.then( ( all ) => {
			res.send( all );
		}, ( e ) => {
			console.log( 'db error' );
			res.status( 400 )
				.send();
		} )
} );

//******************************
app.get( '/todos/:id', authenticate, ( req, res ) => {
	var id = req.params.id;
	// console.log( "asta e id-ul", id );
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
		Todo.findOne( {
				_id: id,
				_creator: req.user._id
			} )
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
app.delete( '/todos/:id', authenticate, ( req, res ) => {
	//validate the ID
	var id = req.params.id;

	// console.log( 'id-ul este', obj );

	if ( !ObjectID.isValid( id ) ) {
		console.log( 'id not valid', id );
		return res.status( 404 )
			.send();
	};

	//check if id in db
	Todo.findOneAndRemove( {
			_id: id,
			_creator: req.user._id
		} )
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
app.patch( '/todos/:id', authenticate, ( req, res ) => {
	var id = req.params.id;
	var body = _.pick( req.body, [ 'text', 'completed' ] );
	if ( !ObjectID.isValid( id ) ) {
		console.log( 'id not valid', id );
		return res.status( 404 )
			.send();
	};

	if ( _.isBoolean( body.completed ) && body.completed ) {
		body.completedAt = new Date()
			.getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	};

	Todo.findOneAndUpdate( {
			_id: id,
			_creator: req.body._id
		}, {
			$set: body
		}, {
			new: true
		} )
		.then( ( result ) => {
			if ( !result ) {
				return res.status( 404 )
					.send();
			}
			res.send( result );
		} )
		.catch( ( e ) => {
			res.status( 404 )
				.send();
		} )


} );

//******************************
app.post( '/users', ( req, res ) => {
	var body = _.pick( req.body, [ 'email', 'password' ] );

	var user = new User( body );


	user.save()
		.then( ( user ) => {
			console.log( 'user salvat' );
			return user.generateAuthToken();
		} )
		.then( ( token ) => {
			res.header( 'x-auth', token )
				.send( user );
		} )
		.catch( ( e ) => {
			res.status( 400 )
				.send();
		} );


} );


//******************************




app.get( '/users/me', authenticate, ( req, res ) => {
	res.send( req.user );
} );


//******************************
app.post( '/users/login', ( req, res ) => {
	userMail = req.body.email;
	userPass = req.body.password;
	// console.log( userMail, userPass );

	User.findByCredentials( userMail, userPass )
		.then( ( user ) => {
			return user.generateAuthToken()
				.then( ( token ) => {
					res.header( 'x-auth', token )
						.send( user );
				} );

			// res.send( user );
		} )
		.catch( ( e ) => {
			res.status( 400 )
				.send();
		} );



} );

//******************************

app.delete( '/users/me/token', authenticate, ( req, res ) => {
	req.user.removeToken( req.token )
		.then( () => {
			res.status( 200 )
				.send();
		}, () => {
			res.status( 400 )
				.send()
		} );
} );



//******************************

app.listen( port, () => {
	console.log( `listen on ${port}` );
} );

module.exports = {
	app
};
