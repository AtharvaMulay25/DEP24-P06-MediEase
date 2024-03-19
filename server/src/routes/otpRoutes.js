const express = require("express");
const router = express.Router();

//controllers
const { sendOtp, verifyOtp } = require("../controllers/otpController.js");

router.post("/send", sendOtp);
router.post("/verify", verifyOtp);

module.exports = router;