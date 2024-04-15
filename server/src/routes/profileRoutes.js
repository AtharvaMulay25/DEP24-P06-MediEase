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

router.get('/patient/:email', authMiddleware(["PATIENT"]), catchAsync(getPatientProfile));
router.put('/patient/:email', authMiddleware(["PATIENT"]), validatePatient, catchAsync(updatePatientProfile));
router.delete('/patient/:email', authMiddleware(["PATIENT"]), catchAsync(deletePatientProfile));

router.get('/staff/:email', authMiddleware(["DOCTOR", "PARAMEDICAL"]), catchAsync(getStaffProfile));
router.put('/staff/:email', authMiddleware(["DOCTOR", "PARAMEDICAL"]), validateStaff, catchAsync(updateStaffProfile));
router.delete('/staff/:email', authMiddleware(["DOCTOR", "PARAMEDICAL"]), catchAsync(deleteStaffProfile));

router.get('/admin/:email', authMiddleware(["ADMIN"]), catchAsync(getAdminProfile));
router.put('/admin/:email', authMiddleware(["ADMIN"]), catchAsync(updateAdminProfile));

module.exports = router;