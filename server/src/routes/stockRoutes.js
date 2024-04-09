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

const authMiddleware = require("../middlewares/authMiddleware");
const roles = ["DOCTOR", "PARAMEDICAL", "ADMIN"];

router.use(authMiddleware(roles));

router.get('/', catchAsync(getTotalStock));
router.get('/available', catchAsync(getAvailableStock));
// router.post('/create', createStockList);
// router.put('/', updateStockList);
// router.delete('/', deleteStockList);

module.exports = router;