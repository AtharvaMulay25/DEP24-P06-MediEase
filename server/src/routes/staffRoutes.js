const express = require('express'); 
const router = express.Router();
//controllers
const { 
    getStaffList,
    createStaff,
    updateStaff,
    deleteStaff
} = require('../controllers/staffController');

// const {  } = require('../middlewares');
const catchAsync = require('../utils/catchAsync');
//medicines routes
router.get('/', catchAsync(getStaffList));
router.post('/', validateMedicine, catchAsync(createStaff));
router.put('/:id', validateMedicine, catchAsync(updateStaff));
router.delete('/:id', catchAsync(deleteStaff));

module.exports = router;