const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
// const {validateStockList} = require('../middlewares');

//controllers 
const { 
    getStockList, 
    deleteStockList, 
    updateStockList, 
    createStockList 
} = require('../controllers/stockController');

router.get('/', catchAsync(getStockList));
// router.post('/create', createStockList);
// router.put('/', updateStockList);
// router.delete('/', deleteStockList);

module.exports = router;