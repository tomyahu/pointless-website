import express from "express";
import crypto from "crypto";
import { uid } from "../lib.js";
import { SECRET, session_IDs, MONGODB_URI } from "../config.js";
import { MongoClient } from 'mongodb';

const router = express.Router();

let db_connection
console.log("connecting");
await MongoClient.connect( MONGODB_URI ).then( client => {
	console.log("connected");
	db_connection = client.db();
} )
.catch( err => {
	console.log(err)
} )


router.get( '/', (request, response) => {
	try {
		if( 
			!request.body.user ||
			!request.body.pass
		) {
			return response.status(400).send( {
				message: "Please send the user and password."
			});
		}

		// TODO:
		// If the user is rejected display an error message

		// generate unique id
		let session_id = uid();
		while( session_IDs[session_id] )
			session_id = uid();

		// create user object
		let user = {
			user: request.body.user,
			session_id: session_id,
			last_activity: Date.now(),
		}

		session_IDs[session_id] = user;

		return response.status(200).send({
			message: "Need to check if the user is accepted or rejected",
			userdata : user,
		});

	} catch (error) {
		console.log( error.message );
		response.status(500).send( error.message );
	}
} )


router.post( '/', (request, response) => {
	try {
		if( 
			!request.body.user ||
			!request.body.pass
		) {
			return response.status(400).send( {
				message: "Please send the user and password."
			});
		}

		db_connection.collection( "users" ).findOne({ username: request.body.user }).then( user => {
			if( user ) {
				return response.status(406).send({
					message: "There already exists a user by that name.",
				});
			}

			let user_data = {
				username: request.body.user,
				pass: crypto.createHmac( 'sha256', SECRET ).update( request.body.pass ).digest( 'hex' ),
			}
			db_connection.collection( "users" ).insertOne( user_data );
			
			return response.status(200).send({
				message: "User successfully created",
				userdata : user_data,
			});
		})
	} catch (error) {
		console.log( error.message );
		response.status(500).send( error.message );
	}
} )

export default router;
