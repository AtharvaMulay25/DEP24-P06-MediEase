const express = require('express');
const router = express.Router();
const {validatePatient, validateStaff, validateUser} = require('../middlewares');
const catchAsync = require('../utils/catchAsync');

const {
    getPatientProfile,
    updatePatientProfile,
    deletePatientProfile,
    getStaffProfile,
    getStaffSchedule,
    updateStaffProfile,
    deleteStaffProfile,
    getAdminProfile,
    updateAdminProfile,
    deleteAdminProfile,
} = require('../controllers/profileController');

const authMiddleware = require("../middlewares/authMiddleware");
const profileMiddleware = require("../middlewares/profileMiddleware");

const roleMap = require("../utils/roleMap");

//p
router.get('/patient/:email', authMiddleware(roleMap("GET_PATIENT_PROFILE")), profileMiddleware(true), catchAsync(getPatientProfile));
router.put('/patient/:email', authMiddleware(roleMap("UPDATE_PATIENT_PROFILE")), profileMiddleware(true), validatePatient, catchAsync(updatePatientProfile));
router.delete('/patient/:email', authMiddleware(roleMap("DELETE_PATIENT_PROFILE")), profileMiddleware(true), catchAsync(deletePatientProfile));

//d, pr
router.get('/staff/schedule/:email', authMiddleware(roleMap("GET_STAFF_SCHEDULE")), profileMiddleware(true), catchAsync(getStaffSchedule));
router.get('/staff/:email', authMiddleware(roleMap("GET_STAFF_PROFILE")), profileMiddleware(true), catchAsync(getStaffProfile));
router.put('/staff/:email', authMiddleware(roleMap("UPDATE_STAFF_PROFILE")), profileMiddleware(true), validateStaff, catchAsync(updateStaffProfile));
router.delete('/staff/:email', authMiddleware(roleMap("DELETE_STAFF_PROFILE")), profileMiddleware(true), catchAsync(deleteStaffProfile));

//a
router.get('/admin/:email', authMiddleware(roleMap("GET_ADMIN_PROFILE")), profileMiddleware(true), catchAsync(getAdminProfile));
router.put('/admin/:email', authMiddleware(roleMap("UPDATE_ADMIN_PROFILE")), profileMiddleware(true), validateUser, catchAsync(updateAdminProfile));
router.delete('/admin/:email', authMiddleware(roleMap("DELETE_ADMIN_PROFILE")), profileMiddleware(true), catchAsync(deleteAdminProfile));

module.exports = router;