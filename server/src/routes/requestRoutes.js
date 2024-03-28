const express = require("express");
const router = express.Router();

//controllers
const {getAllRequests, getRequest} = require("../controllers/requestController.js");
const catchAsync = require('../utils/catchAsync');

const authMiddleware = require("../middlewares/authMiddleware.js");
const roles = ["ADMIN"];

router.use(authMiddleware(roles));

router.get("/", catchAsync(getAllRequests));
router.get("/:id", catchAsync(getRequest));

module.exports = router;