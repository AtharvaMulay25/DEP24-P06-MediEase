const express = require('express'); 
const router = express.Router();
const catchAsync = require('../utils/catchAsync');

const { validateStaff } = require('../middlewares');
const { 
    getStaffList,
    createStaff,
    updateStaff,
    deleteStaff
} = require('../controllers/staffController');


router.get('/', catchAsync(getStaffList));
router.post('/', validateStaff, catchAsync(createStaff));
router.put('/:id', validateStaff, catchAsync(updateStaff));
router.delete('/:id', catchAsync(deleteStaff));

module.exports = router;