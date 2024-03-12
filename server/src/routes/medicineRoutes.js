const express = require('express'); 
const router = express.Router();
//controllers
const { 
    getMedicineList, 
    deleteMedicineList, 
    updateMedicineList, 
    createMedicineList, 
} = require('../controllers/medicineController');

router.get('/', getMedicineList);
router.post('/', createMedicineList);
router.put('/', updateMedicineList);
router.delete('/', deleteMedicineList);

module.exports = router;