const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {validatePurchaseList} = require('../middlewares');
//controllers 
const { 
    getPurchaseList, 
    deletePurchaseList, 
    updatePurchaseList, 
    createPurchaseList,
    getPurchaseDetails
} = require('../controllers/purchaseController');

const authMiddleware = require("../middlewares/authMiddleware");
const roleMap = require("../utils/roleMap.js");

router.get('/:id', authMiddleware(roleMap("GET_PURCHASE_DETAILS")), catchAsync(getPurchaseDetails));
router.get('/', authMiddleware(roleMap("GET_PURCHASE_LIST")), catchAsync(getPurchaseList));
router.post('/', authMiddleware(roleMap("CREATE_PURCHASE_LIST")), validatePurchaseList, catchAsync(createPurchaseList));
router.put('/:id', authMiddleware(roleMap("UPDATE_PURCHASE_LIST")), validatePurchaseList, catchAsync(updatePurchaseList));
router.delete('/:id', authMiddleware(roleMap("DELETE_PURCHASE_LIST")), catchAsync(deletePurchaseList));

module.exports = router;