const express = require('express');
const router = express.Router();
const {validatePatient} = require('../middlewares');
const catchAsync = require('../utils/catchAsync');
//controllers 
const {
    getPatientList,
    createPatient,
    updatePatient,
    deletePatient 
} = require('../controllers/patientController.js');

const authMiddleware = require("../middlewares/authMiddleware");
const roleMap = require("../utils/roleMap.js");

router.get('/', authMiddleware(roleMap("GET_PATIENT_LIST")), catchAsync(getPatientList));
router.post('/', authMiddleware(roleMap("CREATE_PATIENT")), validatePatient, catchAsync(createPatient));
router.put('/:id', authMiddleware(roleMap("UPDATE_PATIENT")), validatePatient, catchAsync(updatePatient));
router.delete('/:id', authMiddleware(roleMap("DELETE_PATIENT")), catchAsync(deletePatient));

module.exports = router;