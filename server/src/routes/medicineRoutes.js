const express = require('express'); 
const router = express.Router();
//controllers
const { 
    getMedicineList, 
    getExpiredMedicines,
    deleteMedicineList, 
    updateMedicineList, 
    createMedicineList,
} = require('../controllers/medicineController');

const { validateMedicine} = require('../middlewares');
const catchAsync = require('../utils/catchAsync');
//medicines routes
router.get('/', catchAsync(getMedicineList));
router.get('/expired', catchAsync(getExpiredMedicines));
router.post('/', validateMedicine, catchAsync(createMedicineList));
router.put('/:id', validateMedicine, catchAsync(updateMedicineList));
router.delete('/:id', catchAsync(deleteMedicineList));

module.exports = router;