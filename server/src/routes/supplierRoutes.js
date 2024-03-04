const express = require('express');
const router = express.Router();

//controllers 
const { 
    getSupplierList, 
    deleteSupplierList, 
    updateSupplierList, 
    createSupplierList 
} = require('../controllers/supplierController');

router.get('/list', getSupplierList);
router.post('/create', createSupplierList);
router.put('/update', updateSupplierList);
router.delete('/delete', deleteSupplierList);

module.exports = router;