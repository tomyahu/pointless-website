import express from "express";
import crypto from "crypto";
import { uid } from "../lib.js";
import { SECRET, session_IDs } from "../config.js";

const router = express.Router();

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

		return response.status(200).send({
			message: "Creating user functionality pending",
			userdata : {
				user: request.body.user,
				pass: crypto.createHmac( 'sha256', SECRET ).update( request.body.pass ).digest( 'hex' ),
			},
		});

	} catch (error) {
		console.log( error.message );
		response.status(500).send( error.message );
	}
} )

export default router;
