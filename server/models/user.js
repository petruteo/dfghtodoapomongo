const mongoose = require( 'mongoose' );
const validator = require( 'validator' );
const jwt = require( 'jsonwebtoken' );
const _ = require( 'lodash' );
const bcrypt = require( 'bcryptjs' );

var UserSchema = new mongoose.Schema( {
	email: {
		type: String,
		require: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	tokens: [ {
		access: {
			type: String,
			require: true
		},
		token: {
			type: String,
			require: true
		}
	} ]

} );

// middleware for hashing password

UserSchema.pre( 'save', function ( next ) {
	var user = this;
	// console.log( 'am ajuns inainte de if' );
	if ( user.isModified( 'password' ) ) {
		//user.password
		// console.log( 'am ajuns DUPA de if' );
		pass = user.password;
		bcrypt.genSalt( 10, ( err, salt ) => {
			bcrypt.hash( pass, salt, ( err, hash ) => {
				user.password = hash;
				// console.log( "*****", hash );
				next();
			} )
		} );
	} else {
		next();
	};

} );

// select only id and mail to return

UserSchema.methods.toJSON = function () {
	var user = this;
	var userObject = user.toObject();

	return _.pick( userObject, [ '_id', 'email' ] );
}

UserSchema.methods.generateAuthToken = function () {
	var user = this;
	var access = 'auth';
	var token = jwt.sign( {
			_id: user._id.toHexString(),
			access
		}, process.env.JWT_SECRET )
		.toString();

	user.tokens.push( {
		access,
		token
	} );
	return user.save()
		.then( () => {
			return token;
		} );
};

UserSchema.methods.removeToken = function ( token ) {
	user = this;
	return user.update( {
		$pull: {
			tokens: {
				token: token
			}
		}
	} );
};

UserSchema.statics.findByToken = function ( token ) {
	var User = this;
	var decoded;

	try {
		decoded = jwt.verify( token, process.env.JWT_SECRET );
	} catch ( e ) {
		// return new Promise( ( resolve, reject ) => {
		// 	reject();
		return Promise.reject( e );
	}



	return User.findOne( {
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'

	} );

};

UserSchema.statics.findByCredentials = function ( email, password ) {
	var user = this;



	return User.findOne( {
			email
		} )
		.then( ( user ) => {

			// console.log( "+++++++++", user );

			// verifies if the user was found  based on email address
			if ( !user ) {
				return Promise.reject();
			};
			// returns promises based on password hash match
			return new Promise( ( resolve, reject ) => {
				console.log( 'compara pass' );
				bcrypt.compare( password, user.password, ( err, res ) => {
					if ( res ) {
						console.log( 'parola e ok, intoarce promise rezolvata - XX' );
						resolve( user );
					} else {
						console.log( 'parola NOT ok, intoarce promise rejectata' );
						reject();
					}
				} );
			} )
		} );

};

var User = mongoose.model( 'User', UserSchema );

module.exports = {
	User
};
