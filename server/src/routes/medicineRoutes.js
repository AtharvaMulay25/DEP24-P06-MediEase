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
const profileMiddleware = require("../middlewares/profileMiddleware");

const roleMap = require("../utils/roleMap");

router.use(authMiddleware([], false), profileMiddleware(true));
//medicines routes

router.get('/', authMiddleware(roleMap("GET_MEDICINE_LIST")), catchAsync(getMedicineList));
router.get('/expired', authMiddleware(roleMap("GET_EXPIRED_MEDICINES")), catchAsync(getExpiredMedicines));
router.get('/:id', authMiddleware(roleMap("GET_MEDICINE")), catchAsync(getMedicine));
router.post('/', authMiddleware(roleMap("CREATE_MEDICINE_LIST")), validateMedicine, catchAsync(createMedicineList));
router.put('/:id', authMiddleware(roleMap("UPDATE_MEDICINE_LIST")), validateMedicine, catchAsync(updateMedicineList));
router.delete('/:id', authMiddleware(roleMap("DELETE_MEDICINE_LIST")), catchAsync(deleteMedicineList));

module.exports = router;