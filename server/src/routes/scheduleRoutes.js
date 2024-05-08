const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { validateSchedule } = require('../middlewares');
const {
    getScheduleList,
    getSchedule,
    createSchedule,
    updateSchedule,
    deleteSchedule
} = require('../controllers/scheduleController');
//schedule routes

const authMiddleware = require("../middlewares/authMiddleware");
const profileMiddleware = require("../middlewares/profileMiddleware");

const roleMap = require("../utils/roleMap");

router.get('/',
    authMiddleware(roleMap("GET_SCHEDULE_LIST")),  
    profileMiddleware(true),
    catchAsync(getScheduleList));

router.use(authMiddleware(), profileMiddleware(true));

router.get("/:id", authMiddleware(roleMap("GET_SCHEDULE")), catchAsync(getSchedule));

router.post('/', authMiddleware(roleMap("CREATE_SCHEDULE")), validateSchedule, catchAsync(createSchedule));
router.put('/:id', authMiddleware(roleMap("UPDATE_SCHEDULE")), validateSchedule, catchAsync(updateSchedule));
router.delete('/:id', authMiddleware(roleMap("DELETE_SCHEDULE")), catchAsync(deleteSchedule));

module.exports = router;