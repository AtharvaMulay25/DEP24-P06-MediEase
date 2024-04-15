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
    deleteCheckup
} = require('../controllers/checkupController');

const authMiddleware = require("../middlewares/authMiddleware");
const profileMiddleware = require("../middlewares/profileMiddleware");

const roles = ["DOCTOR", "PARAMEDICAL", "ADMIN"];

router.use(authMiddleware(roles), profileMiddleware(true));

router.get('/:id', catchAsync(getCheckupDetails));
router.get('/', catchAsync(getCheckupList));
router.get('/', catchAsync(getMedicalHistory));
router.post('/', validateCheckup, catchAsync(createCheckup));
// router.put('/:id', validateCheckup, catchAsync(updatePurchaseList));
router.delete('/:id', catchAsync(deleteCheckup));

module.exports = router;