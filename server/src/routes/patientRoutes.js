const express = require('express');
const router = express.Router();

//controllers 
const {
    getPatientList,
    createPatient,
    updatePatient,
    deletePatient 
} = require('../controllers/patientController.js');

router.get('/', getPatientList);
router.post('/', createPatient);
router.put('/', updatePatient);
router.delete('/', deletePatient);

module.exports = router;