import express from "express";
import { PORT } from "./config.js"
import authRoute from "./routes/authRoutes.js"

const app = express();

app.use(express.json());

app.use( '/auth', authRoute );

app.listen( PORT, () => {
	console.log( "listening to port "+ PORT )
}, );


