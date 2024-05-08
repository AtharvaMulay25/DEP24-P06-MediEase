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

const roleMap = require("../utils/roleMap");

router.use(profileMiddleware(true));

router.get('/',authMiddleware(roleMap("GET_CHECKUP_LIST")), catchAsync(getCheckupList));
router.post('/',authMiddleware(roleMap("CREATE_CHECKUP")), validateCheckup, catchAsync(createCheckup));
router.put('/:id',authMiddleware(roleMap("UPDATE_CHECKUP")), validateCheckup, catchAsync(updateCheckup));
router.delete('/:id',authMiddleware(roleMap("DELETE_CHECKUP")), catchAsync(deleteCheckup));

module.exports = router;