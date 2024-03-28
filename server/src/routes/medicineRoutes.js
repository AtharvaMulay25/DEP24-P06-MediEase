const express = require('express'); 
const router = express.Router();
//controllers
const { 
    getMedicineList, 
    deleteMedicineList, 
    updateMedicineList, 
    createMedicineList,
} = require('../controllers/medicineController');

const { validateMedicine, validateCategory } = require('../middlewares');
const catchAsync = require('../utils/catchAsync');

const authMiddleware = require("../middlewares/authMiddleware.js");
const roles = ["DOCTOR", "PARAMEDICAL", "ADMIN"];

router.use(authMiddleware(roles));

//medicines routes
router.get('/', catchAsync(getMedicineList));
router.post('/', validateMedicine, catchAsync(createMedicineList));
router.put('/:id', validateMedicine, catchAsync(updateMedicineList));
router.delete('/:id', catchAsync(deleteMedicineList));

module.exports = router;