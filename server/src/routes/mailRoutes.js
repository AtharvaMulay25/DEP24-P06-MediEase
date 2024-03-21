const express = require("express");
const router = express.Router();

//controllers
const {approveRequestController, rejectRequestController, pendingRequestController} = require("../controllers/mailController.js");
const catchAsync = require('../utils/catchAsync');

router.post("/approve", catchAsync(approveRequestController));
router.post("/reject", catchAsync(rejectRequestController));
router.post("/pending", catchAsync(pendingRequestController));

module.exports = router;