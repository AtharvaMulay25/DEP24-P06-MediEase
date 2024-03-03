

const express = require("express");
const cors = require("cors");   
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cors());

module.exports = app;