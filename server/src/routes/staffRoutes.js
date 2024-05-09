const express = require('express'); 
const router = express.Router();
const catchAsync = require('../utils/catchAsync');

const { validateStaff } = require('../middlewares');
const { 
    getStaffList,
    getStaff,
    createStaff,
    updateStaff,
    deleteStaff
} = require('../controllers/staffController');

const authMiddleware = require("../middlewares/authMiddleware");
const profileMiddleware = require("../middlewares/profileMiddleware");

const roleMap = require("../utils/roleMap");

router.use(authMiddleware([], false), profileMiddleware(true));

router.get('/', authMiddleware(roleMap("GET_STAFF_LIST")),  catchAsync(getStaffList));
router.get('/:id', authMiddleware(roleMap("GET_STAFF")),  catchAsync(getStaff));
router.post('/', authMiddleware(roleMap("CREATE_STAFF")),  validateStaff, catchAsync(createStaff));
router.put('/:id', authMiddleware(roleMap("UPDATE_STAFF")),  validateStaff, catchAsync(updateStaff));
router.delete('/:id', authMiddleware(roleMap("DELETE_STAFF")),  catchAsync(deleteStaff));

module.exports = router;