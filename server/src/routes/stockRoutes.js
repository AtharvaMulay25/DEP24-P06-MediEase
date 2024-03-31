const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
// const {validateStockList} = require('../middlewares');

//controllers 
const { 
    getTotalStock, 
    getAvailableStock,
    updateStockList, 
} = require('../controllers/stockController');

router.get('/', catchAsync(getTotalStock));
router.get('/available', catchAsync(getAvailableStock));
// router.post('/create', createStockList);
// router.put('/', updateStockList);
// router.delete('/', deleteStockList);

module.exports = router;