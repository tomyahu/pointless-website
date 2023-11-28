import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js';
import Home from './pages/Home.js';


const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Login />} />
			<Route path='/home' element={<Home />} />
		</Routes>
	)
}

export default App