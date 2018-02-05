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


//Todo.remoev({}).then();

//Todo.findOneAndRemove

Todo.findByIdAndRemove( '5a74cb43f70e5758b244ed50' )
	.then( ( deleted ) => {
		console.log( 'deleted: ', deleted );
	}, ( e ) => {
		console.log( 'erroare de stergere' );
	} );
