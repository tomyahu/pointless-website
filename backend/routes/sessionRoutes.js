import express from "express";
import { session_IDs } from "../config";

const router = express.Router();

router.get( '/', (request, response) => {
	try {
		if( 
			!request.body.user ||
			!request.body.session_id
		) {
			return response.status(400).send( {
				message: "Please send the user and session id."
			});
		}

		let session_id = request.body.session_IDs;
		let user = request.body.user;
		if( session_IDs[ session_id ] && session_IDs[ session_IDs ][ 'user' ] == user ) {
			return response.status(200).send(
				session_IDs[ session_id ],
			);
		
		} else {
			return response.status(401).send( {
				message: "Unauthorized access.",
			});
		}

	} catch (error) {
		console.log( error.message );
		response.status(500).send( error.message );
	}
} )

export default router;
