const express = require('express');
const router = express.Router();

//controllers 
const { 
    getPurchaseList, 
    deletePurchaseList, 
    updatePurchaseList, 
    createPurchaseList 
} = require('../controllers/purchaseController');

router.get('/list', getPurchaseList);
router.post('/create', createPurchaseList);
router.put('/update', updatePurchaseList);
router.delete('/delete', deletePurchaseList);

module.exports = router;