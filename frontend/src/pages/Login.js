import { useState } from 'react';
import axios from 'axios';
import '../css/global.css';
import '../css/login.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const LoginForm = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error_msg, setErrorMsg] = useState("");

	async function login() {
		const data = {
			user: username,
			pass: password
		}

		axios.post( "http://localhost:5555/auth", data)
		.then( (response) => {
			const cookies = new Cookies();
			cookies.set('session_id', response.data.session_id, { path: '/' });
			navigate('/home');
			console.log('home')
		})

		.catch( (error) => {
			switch( error.response.status ) {
				case 401:
					setErrorMsg("Wrong user or password.")
					break;
				default:
					console.log(error);
			}
		})
	}

	return (
		<div>
			{ error_msg ?
				<div>
					<p className='wrong'>{error_msg}</p>
				</div>
			: <></>}
			<div>
				<label htmlFor="username">Username </label>
				<input name="username" type="text" onChange={(event) => { setUsername(event.target.value) }} />
			</div>

			<div>
				<label htmlFor="pass">Password </label>
				<input name="pass" type="password" onChange={(event) => { setPassword(event.target.value) }} />
			</div>

			<button type="submit" onClick={login}>Send</button>

			<div>
				<Link to={'register'}>Don't have and account???? Register now!!</Link>
			</div>

		</div>
	)
}


const Login = () => {
	return (
		<div className="Login">
			<h1>Login</h1>
			<LoginForm />
		</div>
	);
}

export default Login;
