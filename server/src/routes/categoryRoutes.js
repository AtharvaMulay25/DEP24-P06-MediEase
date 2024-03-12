const express = require('express'); 
const router = express.Router();

//controllers
const { 
    getCategoryList,
    createCategory,
    deleteCategory
} = require('../controllers/categoryController');

router.get('/', getCategoryList);
router.post('/', createCategory);
router.delete('/', deleteCategory);

module.exports = router;