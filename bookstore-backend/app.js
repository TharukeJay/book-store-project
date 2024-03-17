const express = require("express");
const app = express();
// const io = require('socket.io')(http);
const bodyparser = require("body-parser");
const dotenv = require('dotenv').config({ path: "./api/config/.env" })
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser())

const authRoutes = require("./api/routes/routes");
app.use("/api", authRoutes);

module.exports = app;
