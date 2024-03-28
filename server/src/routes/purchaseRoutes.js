const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {validatePurchaseList} = require('../middlewares');
//controllers 
const { 
    getPurchaseList, 
    deletePurchaseList, 
    updatePurchaseList, 
    createPurchaseList 
} = require('../controllers/purchaseController');

const authMiddleware = require("../middlewares/authMiddleware.js");
const roles = ["PARAMEDICAL", "ADMIN"];

router.use(authMiddleware(roles));

router.get('/', catchAsync(getPurchaseList));
router.post('/', validatePurchaseList, catchAsync(createPurchaseList));
router.put('/:id', validatePurchaseList, catchAsync(updatePurchaseList));
router.delete('/:id', catchAsync(deletePurchaseList));

module.exports = router;