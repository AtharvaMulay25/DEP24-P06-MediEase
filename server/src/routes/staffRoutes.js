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
const profileMiddleware = require("../middlewares/profileMiddleware");

const roles = ["DOCTOR", "PARAMEDICAL", "ADMIN"];

router.use(authMiddleware(roles), profileMiddleware(true));

router.post('/', validateStaff, catchAsync(createStaff));
router.get('/', catchAsync(getStaffList));
router.put('/:id', validateStaff, catchAsync(updateStaff));
router.delete('/:id', catchAsync(deleteStaff));

module.exports = router;