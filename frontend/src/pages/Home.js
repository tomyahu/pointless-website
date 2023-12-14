import { useEffect, useState } from 'react';
import '../css/global.css';
import '../css/home.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';

const Home = () => {
	const navigate = useNavigate();
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
			navigate( '/' );
			console.log( error );
		})

	}, [session_id])

	function logout() {
		axios.post( "http://localhost:5555/auth/logout", 
			{
				"session_id": session_id,
			}
		)
		.then( ( response ) => {
			cookies.remove( 'session_id' )
			navigate( '/' );
		})
		.catch( ( error ) => {
			console.log( error );
		} )
	}


	return (
		<>
			<div className='navbar'>
				<span className='navbar-left'>
					<h1 className='logo'> 123</h1>
				</span>
				<span className='navbar-right'>
					<span>{username}</span>
					<button onClick={logout}>Logout</button>
				</span>
			</div>
			<div className="Home">
				<h1>Home</h1>

				<p><b>Username: </b>{username}</p>
				<p><b>Last Activity: </b>{new Date(last_activity).toString() }</p>
			</div>
		</>
	);
}

export default Home;