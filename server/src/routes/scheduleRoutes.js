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

const authMiddleware = require("../middlewares/authMiddleware.js");
const roles = ["PATIENT", "DOCTOR", "PARAMEDICAL", "ADMIN"];

router.use(authMiddleware(roles));

//schedule routes
router.get('/', catchAsync(getScheduleList));
router.post('/', catchAsync(createSchedule));
router.put('/:id', catchAsync(updateSchedule));
router.delete('/:id', catchAsync(deleteSchedule));

module.exports = router;