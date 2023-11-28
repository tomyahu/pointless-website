import { useEffect, useState } from 'react';
import '../css/home.css';
import Cookies from 'universal-cookie';
import axios from 'axios';

const Home = () => {
	const cookies = new Cookies();
	const session_id = cookies.get('session_id', { path: '/' });
	
	const [username, setUsername] = useState("");
	const [last_activity, setLastActivity] = useState(0);

	useEffect(() => {
		axios.post( "http://localhost:5555/session", 
			{
				"session_id": session_id,
			}
		)
		.then( ( response ) => {
			setUsername( response.data.user );
			setLastActivity( response.data.last_activity );
		})
		.catch( ( error ) => {
			console.log( error )
		})

	}, [session_id])




	return (
		<div className="Home">
			<h1>Home</h1>

			<p><b>Username: </b>{username}</p>
			<p><b>Last Activity: </b>{new Date(last_activity).toString() }</p>
		</div>
	);
}

export default Home;