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
const roles = ["PATIENT", "DOCTOR", "PARAMEDICAL", "ADMIN"];

router.use(authMiddleware(roles));

router.get('/', catchAsync(getScheduleList));
router.post('/',validateSchedule, catchAsync(createSchedule));
router.put('/:id',validateSchedule, catchAsync(updateSchedule));
router.delete('/:id', catchAsync(deleteSchedule));

module.exports = router;