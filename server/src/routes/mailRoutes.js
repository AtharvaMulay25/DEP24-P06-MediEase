const express = require("express");
const router = express.Router();

//controllers
const {approveRequestController, rejectRequestController, pendingRequestController} = require("../controllers/mailController.js");
const catchAsync = require('../utils/catchAsync');

const authMiddleware = require("../middlewares/authMiddleware");

const roles = ["ADMIN"];

router.post("/approve", authMiddleware(roles), catchAsync(approveRequestController));
router.post("/reject", authMiddleware(roles), catchAsync(rejectRequestController));
router.post("/pending", catchAsync(pendingRequestController));

module.exports = router;