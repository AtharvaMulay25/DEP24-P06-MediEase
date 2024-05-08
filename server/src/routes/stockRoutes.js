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

const roles = ["DOCTOR", "PARAMEDICAL", "ADMIN"];

router.use(authMiddleware(roles), profileMiddleware(true));

router.get('/', catchAsync(getTotalStock));
router.get('/available', catchAsync(getAvailableStock));
router.get('/available/:checkupId', catchAsync(getUpdatedAvailableStock));
router.get('/out', catchAsync(getOutOfStock));
// router.post('/create', createStockList);
// router.put('/', updateStockList);
// router.delete('/', deleteStockList);

module.exports = router;