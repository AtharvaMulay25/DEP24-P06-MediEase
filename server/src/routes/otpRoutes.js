const express = require("express");
const router = express.Router();

//controllers
const { sendOtp, verifyOtp } = require("../controllers/otpController.js");
const catchAsync = require('../utils/catchAsync');
const {validateSendOtp, validateVerifyOtp} = require("../middlewares.js")
router.post("/send", validateSendOtp, catchAsync(sendOtp));
router.post("/verify", validateVerifyOtp, catchAsync(verifyOtp));

module.exports = router;