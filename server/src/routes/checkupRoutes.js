const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {validateCheckup} = require('../middlewares');
//controllers 
const { 
    getCheckupList, 
    getCheckupDetails,
    createCheckup,
    updateCheckup,
    deleteCheckup
} = require('../controllers/checkupController');

const authMiddleware = require("../middlewares/authMiddleware");
const roles = ["DOCTOR", "PARAMEDICAL", "ADMIN"];

router.use(authMiddleware(roles));

router.get('/:id', catchAsync(getCheckupDetails));
router.get('/', catchAsync(getCheckupList));
router.post('/', validateCheckup, catchAsync(createCheckup));
router.put('/:id', validateCheckup, catchAsync(updateCheckup));
router.delete('/:id', catchAsync(deleteCheckup));

module.exports = router;