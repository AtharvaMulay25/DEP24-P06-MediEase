const express = require("express");
const router = express.Router();

//controllers
const { signup, login } = require("../controllers/authController.js");
const catchAsync = require('../utils/catchAsync');

router.post("/signup", catchAsync(signup));
router.post("/login", catchAsync(login));

module.exports = router;