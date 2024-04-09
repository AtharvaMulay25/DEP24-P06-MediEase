const express = require("express");
const router = express.Router();

//controllers
const { signup, login, logout } = require("../controllers/authController.js");
const { validateUser } = require("../middlewares");
const catchAsync = require('../utils/catchAsync');

router.post("/signup", validateUser, catchAsync(signup));
router.post("/login", catchAsync(login));
router.get("/logout", catchAsync(logout));

module.exports = router;