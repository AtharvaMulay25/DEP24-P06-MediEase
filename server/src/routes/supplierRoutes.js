const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {validateSupplier} = require('../middlewares');
//controllers 
const { 
    getSupplierList, 
    deleteSupplier,
    createSupplier, 
    updateSupplier
} = require('../controllers/supplierController');

router.get('/', catchAsync(getSupplierList));
router.post('/', validateSupplier, catchAsync(createSupplier));
router.put('/:id', validateSupplier, catchAsync(updateSupplier));
router.delete('/:id', catchAsync(deleteSupplier));

module.exports = router;