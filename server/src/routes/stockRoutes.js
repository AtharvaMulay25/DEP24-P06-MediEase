const express = require('express');
const router = express.Router();

//controllers 
const { 
    getStockList, 
    deleteStockList, 
    updateStockList, 
    createStockList 
} = require('../controllers/stockController');

router.get('/', getStockList);
router.post('/', createStockList);
router.put('/', updateStockList);
router.delete('/', deleteStockList);

module.exports = router;