const express = require('express');
const router = express.Router();
const {validatePatient, validateStaff} = require('../middlewares');
const catchAsync = require('../utils/catchAsync');

const {
    getPatientProfile,
    updatePatientProfile,
    deletePatientProfile,
    getStaffProfile,
    updateStaffProfile,
    deleteStaffProfile,
    getAdminProfile,
    updateAdminProfile,
} = require('../controllers/profileController');

const authMiddleware = require("../middlewares/authMiddleware");
const profileMiddleware = require("../middlewares/profileMiddleware");

router.get('/patient/:email', authMiddleware(["PATIENT"]), profileMiddleware(true), catchAsync(getPatientProfile));
router.put('/patient/:email', authMiddleware(["PATIENT"]), profileMiddleware(true), validatePatient, catchAsync(updatePatientProfile));
router.delete('/patient/:email', authMiddleware(["PATIENT"]), profileMiddleware(true), catchAsync(deletePatientProfile));

router.get('/staff/:email', authMiddleware(["DOCTOR", "PARAMEDICAL"]), profileMiddleware(true), catchAsync(getStaffProfile));
router.put('/staff/:email', authMiddleware(["DOCTOR", "PARAMEDICAL"]), profileMiddleware(true), validateStaff, catchAsync(updateStaffProfile));
router.delete('/staff/:email', authMiddleware(["DOCTOR", "PARAMEDICAL"]), profileMiddleware(true), catchAsync(deleteStaffProfile));

router.get('/admin/:email', authMiddleware(["ADMIN"]), profileMiddleware(true), catchAsync(getAdminProfile));
router.put('/admin/:email', authMiddleware(["ADMIN"]), profileMiddleware(true),  catchAsync(updateAdminProfile));

module.exports = router;