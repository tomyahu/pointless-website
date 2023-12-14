import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import Home from './pages/Home.js';


const App = () => {
	return (
		<Routes>
			<Route path='/register' element={<Register />} />
			<Route path='/' element={<Login />} />
			<Route path='/home' element={<Home />} />
		</Routes>
	)
}

export default App