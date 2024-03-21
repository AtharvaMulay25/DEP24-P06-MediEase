const express = require("express");
const router = express.Router();

//controllers
const {sendMailController} = require("../controllers/mailController.js");
const catchAsync = require('../utils/catchAsync');

router.post("/send", catchAsync(sendMailController));

module.exports = router;