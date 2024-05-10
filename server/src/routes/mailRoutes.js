const express = require("express");
const router = express.Router();

//controllers
const {
  approveRequestController,
  rejectRequestController,
  pendingRequestController,
  feedbackSubmitController,
} = require("../controllers/mailController.js");
const catchAsync = require("../utils/catchAsync");

const authMiddleware = require("../middlewares/authMiddleware");
const { validateFeedback } = require("../middlewares.js");

const roleMap = require("../utils/roleMap.js");

//a
router.post(
  "/approve",
  authMiddleware(roleMap("APPROVE_REQUEST_CONTROLLER")), 
  catchAsync(approveRequestController)
);

//a
router.post(
  "/reject",
  authMiddleware(roleMap("REJECT_REQUEST_CONTROLLER")), 
  catchAsync(rejectRequestController)
);

//a
router.post(
  "/pending", 
  authMiddleware(roleMap("PENDING_REQUEST_CONTROLLER")), 
  catchAsync(pendingRequestController)
);

//all
router.post(
  "/feedback",
  authMiddleware(roleMap("FEEDBACK_SUBMIT_CONTROLLER")), 
  validateFeedback,
  catchAsync(feedbackSubmitController)
);
module.exports = router;
