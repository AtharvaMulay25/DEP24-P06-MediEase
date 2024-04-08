const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");

const {
    getCheckupStat,
    getTopMedicineStat
} = require("../controllers/dashboardController");

const authMiddleware = require("../middlewares/authMiddleware");
const roles = ["DOCTOR", "PARAMEDICAL", "ADMIN"];

router.use(authMiddleware(roles));

//dashboard routes
router.get("/checkup", catchAsync(getCheckupStat));
router.get("/medicine", catchAsync(getTopMedicineStat));

module.exports = router;
