const expect = require( 'expect' );
const request = require( 'supertest' );

const {
	app
} = require( './../server.js' );
const {
	Todo
} = require( './../todo.js' );

describe( 'POST /todos', () => {
	it( 'should create a new todo', ( done ) => {
		var text = "test todo text";

		request( app )
			.post( '/todos' )
			.send( {
				text
			} )
			.
		expect( 200 )
			.
		expect( ( res ) => {
				expect( res.body.text )
					.toBe( text );
			} )
			.
		end( ( errr, res ) => {
				if ( err ) {
					return done( err );
				}

				Todo.find()
					.then( ( todos ) => expect( todos.lenght )
						.toBe( 1 )
						.expect( todos[ 0 ].text.toBe( text ) ) );
				done();
			} )
			.
		catch( ( e ) => {
			return e
		} );
	} );
} );
