const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");

const {
    getCheckupStat,
    getTopMedicineStat,
} = require("../controllers/dashboardController");

const authMiddleware = require("../middlewares/authMiddleware");
const profileMiddleware = require("../middlewares/profileMiddleware");

const roleMap = require("../utils/roleMap");

router.use(profileMiddleware(true));

//dashboard routes
router.get("/checkup", authMiddleware(roleMap("GET_CHECKUP_STAT")), catchAsync(getCheckupStat));
router.get("/medicine", authMiddleware(roleMap("GET_TOP_MEDICINE_STAT")), catchAsync(getTopMedicineStat));

module.exports = router;
