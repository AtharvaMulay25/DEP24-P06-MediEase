const express = require('express'); 
const router = express.Router();
//controllers
const { 
    getMedicineList, 
    getMedicine,
    getExpiredMedicines,
    deleteMedicineList, 
    updateMedicineList, 
    createMedicineList,
} = require('../controllers/medicineController');

const { validateMedicine} = require('../middlewares');
const catchAsync = require('../utils/catchAsync');

const authMiddleware = require("../middlewares/authMiddleware");
const roles = ["DOCTOR", "PARAMEDICAL", "ADMIN"];

router.use(authMiddleware(roles));
//medicines routes
router.get('/', catchAsync(getMedicineList));
router.get('/:id', catchAsync(getMedicine));
router.get('/expired', catchAsync(getExpiredMedicines));
router.post('/', validateMedicine, catchAsync(createMedicineList));
router.put('/:id', validateMedicine, catchAsync(updateMedicineList));
router.delete('/:id', catchAsync(deleteMedicineList));

module.exports = router;