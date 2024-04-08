const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

//TODO: Change the origin to deployed frontend URL
app.use(cors({
    origin: "*",
    credentials: true
}));

module.exports = app;