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
router.post('/', catchAsync(createStaff));
router.put('/:id', catchAsync(updateStaff));
router.delete('/:id', catchAsync(deleteStaff));

module.exports = router;