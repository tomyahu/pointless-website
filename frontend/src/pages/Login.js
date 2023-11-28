import { useState } from 'react';
import axios from 'axios';
import '../css/login.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const LoginForm = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

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
			console.log(error);
		})
	}

	return (
		<div>
			<div>
				<label htmlFor="username">Username </label>
				<input name="username" type="text" onChange={(event) => { setUsername(event.target.value) }} />
			</div>

			<div>
				<label htmlFor="pass">Password </label>
				<input name="pass" type="password" onChange={(event) => { setPassword(event.target.value) }} />
			</div>

			<button type="submit" onClick={login}>Send</button>
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
