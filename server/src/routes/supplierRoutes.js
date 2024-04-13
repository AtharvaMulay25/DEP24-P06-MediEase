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

const authMiddleware = require("../middlewares/authMiddleware");
const roleMap = require("../utils/roleMap.js");

router.get('/', authMiddleware(roleMap("GET_SUPPLIER_LIST")), catchAsync(getSupplierList));
router.post('/', authMiddleware(roleMap("CREATE_SUPPLIER")), validateSupplier, catchAsync(createSupplier));
router.put('/:id', authMiddleware(roleMap("UPDATE_SUPPLIER")), validateSupplier, catchAsync(updateSupplier));
router.delete('/:id', authMiddleware(roleMap("DELETE_SUPPLIER")), catchAsync(deleteSupplier));

module.exports = router;