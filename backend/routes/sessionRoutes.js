import express from "express";
import { session_IDs } from "../config.js";

const router = express.Router();

router.get( '/', (request, response) => {
	try {
		if( 
			!request.body.session_id
		) {
			return response.status(400).send( {
				message: "Please send the session id."
			});
		}

		let session_id = request.body.session_id;
		let sessiondata = session_IDs[ session_id ];
		if( sessiondata && sessiondata.user ) {
			sessiondata[ 'last_activity' ] = Date.now();

			return response.status(200).send(
				sessiondata,
			);
		
		} else {
			return response.status(404).send( {
				message: "Invalid or expired session ID.",
			});
		}

	} catch (error) {
		console.log( error.message );
		response.status(500).send( error.message );
	}
} )

export default router;
