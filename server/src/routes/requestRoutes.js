const express = require("express");
const router = express.Router();

//controllers
const {getAllRequests, getRequest} = require("../controllers/requestController.js");
const catchAsync = require('../utils/catchAsync');

const authMiddleware = require("../middlewares/authMiddleware");
const roleMap = require("../utils/roleMap.js");

router.get("/", authMiddleware(roleMap("GET_ALL_REQUESTS")), catchAsync(getAllRequests));
router.get("/:id", authMiddleware(roleMap("GET_REQUEST")), catchAsync(getRequest));

module.exports = router;