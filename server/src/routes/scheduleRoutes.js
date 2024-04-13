const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { validateSchedule } = require('../middlewares');
const {
    getScheduleList,
    createSchedule,
    updateSchedule,
    deleteSchedule
} = require('../controllers/scheduleController');
//schedule routes

const authMiddleware = require("../middlewares/authMiddleware");
const roleMap = require("../utils/roleMap.js");

router.get('/',
    authMiddleware(roleMap("GET_SCHEDULE_LIST")),
    catchAsync(getScheduleList));

router.post('/', authMiddleware(roleMap("CREATE_SCHEDULE")), validateSchedule, catchAsync(createSchedule));
router.put('/:id', authMiddleware(roleMap("UPDATE_SCHEDULE")), validateSchedule, catchAsync(updateSchedule));
router.delete('/:id', authMiddleware(roleMap("DELETE_SCHEDULE")), catchAsync(deleteSchedule));

module.exports = router;