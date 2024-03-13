const express = require('express'); 
const router = express.Router();
//controllers
const { 
    getMedicineList, 
    deleteMedicineList, 
    updateMedicineList, 
    createMedicineList,
    getCategory, 
    getCategoryList,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/medicineController');

//medicines routes
router.get('/list', getMedicineList);
router.post('/create', createMedicineList);
router.put('/update', updateMedicineList);
router.delete('/delete', deleteMedicineList);

//category routes
router.get('/category/list', getCategoryList);
router.get('/category/:id', getCategory);
router.post('/category/create', createCategory);
router.put('/category/update', updateCategory);
router.delete('/category/delete', deleteCategory);

module.exports = router;