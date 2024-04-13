const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {validateCheckup} = require('../middlewares');
//controllers 
const { 
    getCheckupList, 
    getCheckupDetails,
    createCheckup,
    deleteCheckup
} = require('../controllers/checkupController');

const authMiddleware = require("../middlewares/authMiddleware");
const roleMap = require("../utils/roleMap.js");

router.get('/:id', authMiddleware(roleMap("GET_CHECKUP_DETAILS")),  catchAsync(getCheckupDetails));
router.get('/', authMiddleware(roleMap("GET_CHECKUP_LIST")),  catchAsync(getCheckupList));
router.post('/', authMiddleware(roleMap("CREATE_CHECKUP")),  validateCheckup, catchAsync(createCheckup));
// router.put('/:id', validateCheckup, catchAsync(updatePurchaseList));
router.delete('/:id', authMiddleware(roleMap("DELETE_CHECKUP")),  catchAsync(deleteCheckup));

module.exports = router;