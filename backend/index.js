import express from "express";
import { PORT } from "./config.js"
import authRoute from "./routes/authRoutes.js"
import sessionRoute from "./routes/sessionRoutes.js"
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: [ 'GET', 'POST', 'PUT', 'DELETE' ],
		allowedHeaders: [ 'Content-Type' ],
	})
);

app.use( '/auth', authRoute );
app.use( '/session', sessionRoute );

app.listen( PORT, () => {
	console.log( "listening to port "+ PORT )
}, );


