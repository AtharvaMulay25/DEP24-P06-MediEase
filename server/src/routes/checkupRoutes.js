const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {validateCheckup} = require('../middlewares');
//controllers 
const { 
    getCheckupList, 
    getCheckupDetails,
    getMedicalHistory,
    createCheckup,
    updateCheckup,
    deleteCheckup
} = require('../controllers/checkupController');

const authMiddleware = require("../middlewares/authMiddleware");
const profileMiddleware = require("../middlewares/profileMiddleware");


router.get('/patient/:patientEmail', authMiddleware(["PATIENT"]), profileMiddleware(true), catchAsync(getMedicalHistory));
router.get('/:id', authMiddleware(["DOCTOR", "PARAMEDICAL", "ADMIN", "PATIENT"]), profileMiddleware(true), catchAsync(getCheckupDetails));

const roles = ["DOCTOR", "PARAMEDICAL", "ADMIN"];
router.use(authMiddleware(roles), profileMiddleware(true));
router.get('/', catchAsync(getCheckupList));
router.post('/', validateCheckup, catchAsync(createCheckup));
router.put('/:id', validateCheckup, catchAsync(updateCheckup));
router.delete('/:id', catchAsync(deleteCheckup));

module.exports = router;