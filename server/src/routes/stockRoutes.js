const express = require('express');
const router = express.Router();

//controllers 
const { 
    getStockList, 
    deleteStockList, 
    updateStockList, 
    createStockList 
} = require('../controllers/stockController');

router.get('/list', getStockList);
router.post('/create', createStockList);
router.put('/update', updateStockList);
router.delete('/delete', deleteStockList);

module.exports = router;