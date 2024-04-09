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
const roles = ["DOCTOR", "PARAMEDICAL", "ADMIN"];

router.use(authMiddleware(roles));

router.get('/', catchAsync(getPatientList));
router.get('/:id', catchAsync(getPatient));
router.post('/', validatePatient, catchAsync(createPatient));
router.put('/:id', validatePatient, catchAsync(updatePatient));
router.delete('/:id', catchAsync(deletePatient));

module.exports = router;