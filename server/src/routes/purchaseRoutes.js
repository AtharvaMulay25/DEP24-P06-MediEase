const express = require('express');
const router = express.Router();

//controllers 
const { 
    getPurchaseList, 
    deletePurchaseList, 
    updatePurchaseList, 
    createPurchaseList 
} = require('../controllers/purchaseController');

router.get('/', getPurchaseList);
router.post('/', createPurchaseList);
router.put('/', updatePurchaseList);
router.delete('/', deletePurchaseList);

module.exports = router;