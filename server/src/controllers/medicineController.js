//prisma client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const {v4 : uuidv4} = require('uuid')

// @desc    Get Medicine List
// route    GET /api/medicine/list
// @access  Private (Admin)
const getMedicineList = async(req, res, next) => {
    try {
        const medicineList = await prisma.medicine.findMany({});
        console.log(medicineList);  
        
        return res.status(200).json({
            ok: true,
            data: medicineList,
            message: "Medicine List retrieved successfully"
        });
    } catch (err) {
        console.log(`Medicine List Fetching Error : ${err.message}`);
        
        return res.status(500).json({
            ok: false,
            data: [],
            message: "Fetching Medicine list failed, Please try again later"
        });
    }
};

// @desc    Create Medicine List Records
// route    POST /api/medicine/create
// @access  Private (Admin)
const createMedicineList = async(req, res, next) => {
    try {
        console.log(req.body);
        const { name, genericName, brandName, category , strength} = req.body;
        const createdRecord = await prisma.medicine.create({
            data: {
                id: uuidv4(),
                name,
                genericName,
                brandName,
                category,
                strength
            }
        });
        
        console.log(createdRecord);  
        
        return res.status(200).json({
            ok: true,
            data: createdRecord,
            message: "Medicine List record created successfully"
        });
    } catch (err) {
        console.log(`Medicine List Creating Error : ${err.message}`);
        
        return res.status(500).json({
            ok: false,
            data: [],
            message: `Creating Medicine list record failed, Please try again later`
        });
    }
};

module.exports = {getMedicineList, createMedicineList};