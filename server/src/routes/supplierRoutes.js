const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {validateSupplier} = require('../middlewares');
//controllers 
const { 
    getSupplierList, 
    getSupplier,
    deleteSupplier,
    createSupplier, 
    updateSupplier
} = require('../controllers/supplierController');

const authMiddleware = require("../middlewares/authMiddleware");
const roles = ["PARAMEDICAL", "ADMIN"];

router.use(authMiddleware(roles));

router.get('/', catchAsync(getSupplierList));
router.get('/:id', catchAsync(getSupplier));
router.post('/', validateSupplier, catchAsync(createSupplier));
router.put('/:id', validateSupplier, catchAsync(updateSupplier));
router.delete('/:id', catchAsync(deleteSupplier));

module.exports = router;