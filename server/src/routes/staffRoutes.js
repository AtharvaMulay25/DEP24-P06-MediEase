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

const authMiddleware = require("../middlewares/authMiddleware");
const roleMap = require("../utils/roleMap.js");

router.get('/', authMiddleware(roleMap("GET_STAFF_LIST")), catchAsync(getStaffList));
router.post('/', authMiddleware(roleMap("CREATE_STAFF")), validateStaff, catchAsync(createStaff));
router.put('/:id', authMiddleware(roleMap("UPDATE_STAFF")), validateStaff, catchAsync(updateStaff));
router.delete('/:id', authMiddleware(roleMap("DELETE_STAFF")), catchAsync(deleteStaff));

module.exports = router;