var mongoose = require( 'mongoose' );

mongoose.Promise = global.Promise;
mongoose.connect( 'mongodb://localhost:27017/TodoApp' );

var Todo = mongoose.model( 'Todo', {
	text: {
		type: String
	},
	completed: {
		type: Boolean
	},
	completedAt: {
		type: Number
	}
} );

var newTodo = new Todo( {
	text: 'cook dinner'
} );

newTodo.save()
	.then( ( doc ) => {
			console.log( 'saved todo: ', doc );

		},
		( e ) => {
			console.log( 'unable to save todo', e );
		} );

var anotherTodo = new Todo( {
	text: "another mission impossible",
	completed: true,
	completedAt: 1006
} );

var anotherTodo.save()
	.then( ( doc ) => {
		console.log( 'saved anotherTodo ', anotherTodo );
	}, ( e ) => {
		console.log( 'error: ', e );
	} );
