const express = require('express'); 
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {validateCategory} = require('../middlewares');
const { getCategory, 
    getCategoryList,
    createCategory,
    updateCategory,
    deleteCategory} = require('../controllers/categoryController');
//category routes
router.get('/', catchAsync(getCategoryList));
router.get('/:id', catchAsync(getCategory));
router.post('/', validateCategory, catchAsync(createCategory));
router.put('/:id', validateCategory, catchAsync(updateCategory));
router.delete('/:id', catchAsync(deleteCategory));

module.exports = router;