const express = require('express'); 
const router = express.Router();
//controllers
const { 
    getMedicineList, 
    deleteMedicineList, 
    updateMedicineList, 
    createMedicineList, 
    getCategoryList,
    createCategory
} = require('../controllers/medicineController');

router.get('/list', getMedicineList);
router.post('/create', createMedicineList);
router.put('/update', updateMedicineList);
router.delete('/delete', deleteMedicineList);
router.get('/category/list', getCategoryList);
router.post('/category/create', createCategory);

module.exports = router;