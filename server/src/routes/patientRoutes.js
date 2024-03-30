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

router.get('/', catchAsync(getPatientList));
router.post('/', validatePatient, catchAsync(createPatient));
router.put('/:id', validatePatient, catchAsync(updatePatient));
router.delete('/:id', catchAsync(deletePatient));

module.exports = router;