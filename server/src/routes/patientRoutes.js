const express = require('express');
const router = express.Router();
const {validatePatient} = require('../middlewares');
const catchAsync = require('../utils/catchAsync');
//controllers 
const {
    getPatientList,
    getPatient,
    createPatient,
    updatePatient,
    deletePatient 
} = require('../controllers/patientController.js');

const authMiddleware = require("../middlewares/authMiddleware");
const profileMiddleware = require("../middlewares/profileMiddleware");

const roleMap = require("../utils/roleMap.js");

router.post('/', authMiddleware(roleMap("CREATE_PATIENT")), validatePatient, catchAsync(createPatient));

router.use(profileMiddleware(true));

router.get('/', authMiddleware(roleMap("GET_PATIENT_LIST")), catchAsync(getPatientList));
router.get('/:id', authMiddleware(roleMap("GET_PATIENT")), catchAsync(getPatient));
router.put('/:id', authMiddleware(roleMap("UPDATE_PATIENT")), validatePatient, catchAsync(updatePatient));
router.delete('/:id', authMiddleware(roleMap("DELETE_PATIENT")), catchAsync(deletePatient));

module.exports = router;