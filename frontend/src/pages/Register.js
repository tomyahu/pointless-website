import { useState } from 'react';
import axios from 'axios';
import '../css/global.css';
import '../css/login.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const RegisterForm = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [password_confirmation, setPasswordConfirmation] = useState("");
	const [error_msg, setErrorMsg] = useState("");

	function checkPassword() {
		return password == password_confirmation;
	}

	async function register() {
		if( username == "" )
			return setErrorMsg( "No username given." );

		if( password == "" )
			return setErrorMsg( "No password given." );

		if( ! checkPassword() )
			return setErrorMsg( "Passwords are not the same." );

		const data = {
			user: username,
			pass: password
		}

		axios.post( "http://localhost:5555/auth/register", data)
		.then( (response) => {
			
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
		})

		.catch( (error) => {
			console.log(error);
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

			<div>
				<label htmlFor="pass">Confirm Password </label>
				<input name="pass_confirm" type="password" onChange={(event) => { setPasswordConfirmation(event.target.value) }} />
			</div>

			<button type="submit" onClick={register}>Send</button>
		</div>
	)
}


const Register = () => {
	return (
		<div className="Login">
			<h1>Register</h1>
			<RegisterForm />
		</div>
	);
}

export default Register;
