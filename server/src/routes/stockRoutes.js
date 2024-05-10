const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
// const {validateStockList} = require('../middlewares');

//controllers 
const { 
    getTotalStock, 
    getAvailableStock,
    getOutOfStock,
    getUpdatedAvailableStock,
    updateStockList, 
} = require('../controllers/stockController');

const authMiddleware = require("../middlewares/authMiddleware");
const profileMiddleware = require("../middlewares/profileMiddleware");

const roleMap = require("../utils/roleMap");

router.use(authMiddleware([], false), profileMiddleware(true));

router.get('/', authMiddleware(roleMap("GET_TOTAL_STOCK")), catchAsync(getTotalStock));
router.get('/available', authMiddleware(roleMap("GET_AVAILABLE_STOCK")), catchAsync(getAvailableStock));
router.get('/available/:checkupId', catchAsync(getUpdatedAvailableStock));
router.get('/out', authMiddleware(roleMap("GET_OUT_OF_STOCK")), catchAsync(getOutOfStock));
// router.post('/create', createStockList);
// router.put('/', updateStockList);
// router.delete('/', deleteStockList);

module.exports = router;