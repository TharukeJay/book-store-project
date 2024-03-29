import http from 'http';
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from  'cookie-parser';


import authRoutes from "./api/routes/AuthRoutes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: "*" }));
app.use(cookieParser());

server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});


// Load environment variables from .env file
dotenv.config();

app.use("/api/auth", authRoutes);

