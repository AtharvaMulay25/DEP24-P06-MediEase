const express = require('express');
const router = express.Router();

//controllers 
const { 
    getSupplierList, 
    deleteSupplierList, 
    updateSupplierList, 
    createSupplierList 
} = require('../controllers/supplierController');

router.get('/', getSupplierList);
router.post('/', createSupplierList);
router.put('/', updateSupplierList);
router.delete('/', deleteSupplierList);

module.exports = router;