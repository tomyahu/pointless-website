import './App.css';

const LoginForm = () => {
	return (
		<form>
			<div>
				<label for="username">Username </label>
				<input name="username" type="text"></input>
			</div>

			<div>
				<label for="pass">Password </label>
				<input name="pass" type="password"></input>
			</div>

			<input type="submit" value="Send"></input>
		</form>
	)
}


const App = () => {
	return (
		<div className="App">
			<h1>Login</h1>
			<LoginForm />
		</div>
	);
}

export default App;
