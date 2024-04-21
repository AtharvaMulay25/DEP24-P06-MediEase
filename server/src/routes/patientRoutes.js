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

const roles = ["DOCTOR", "PARAMEDICAL", "ADMIN"];

router.post('/', authMiddleware(["PATIENT", "DOCTOR", "PARAMEDICAL", "ADMIN"]), validatePatient, catchAsync(createPatient));

router.use(authMiddleware(roles), profileMiddleware(true));
router.get('/', catchAsync(getPatientList));
router.get('/:id', catchAsync(getPatient));
router.put('/:id', validatePatient, catchAsync(updatePatient));
router.delete('/:id', catchAsync(deletePatient));

module.exports = router;