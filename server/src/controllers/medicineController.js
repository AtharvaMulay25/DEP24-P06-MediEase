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
        // console.log(medicineList);  
        
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
        // console.log(req.body);
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
        
        // console.log(createdRecord);  
        
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


// @desc    Update Medicine List Record
// route    PUT /api/medicine/update
// @access  Private (Admin) 
const updateMedicineList = async(req, res, next) => {
    try {
        const { id } = req.body;
        const updatedRecord = await prisma.medicine.update({
            where: {
                id,
            },
            data: {
                ...req.body
            },
        });

        // console.log(updatedRecord);  
        
        return res.status(200).json({
            ok: true,
            data: updatedRecord,
            message: "Medicine List record updated successfully"
        });
    } catch (err) {
        console.log(`Medicine List Updating Error : ${err.message}`);
        
        const errMsg = "Updating medicine list record failed, Please try again later";
        const errCode = 500;

        //record does not exist
        if (err.code === 'P2025') {
            errMsg = "Record does not exist"
            errCode = 404;
        }

        return res.status(errCode).json({
            ok: false,
            data: [],
            message: errMsg,
        });
    }
};


// @desc    Delete Medicine List Record
// route    DELETE /api/medicine/delete
// @access  Private (Admin) 
const deleteMedicineList = async(req, res, next) => {
    try {
        console.log("req.body : ", req.body);
        const { id } = req.body;
        
        const deletedRecord = await prisma.medicine.delete({
            where: {
              id: id,
            },
        });
          
        return res.status(200).json({
            ok: true,
            data: deletedRecord,
            message: "Medicine List Record deleted successfully"
        });
    } catch (err) {
        console.log(`Medicine List Deletion Error : ${err.message}`);
        
        const errMsg = "Deleting medicine list record failed, Please try again later";
        const errCode = 500;

        //record does not exist
        if (err.code === 'P2025') {
            errMsg = "Record does not exist"
            errCode = 404;
        }

        return res.status(errCode).json({
            ok: false,
            data: [],
            message: errMsg,
        });
    }
};


// @desc    Get Category List
// route    GET /api/medicine/category/list
// @access  Private (Admin)
const getCategoryList = async(req, res, next) => {
    try {
        const categoryList = await prisma.category.findMany({});
        console.log(categoryList);  
        
        return res.status(200).json({
            ok: true,
            data: categoryList,
            message: "Category List retrieved successfully"
        });
    } catch (err) {
        console.log(`Category List Fetching Error : ${err.message}`);
        
        return res.status(500).json({
            ok: false,
            data: [],
            message: "Fetching Category list failed, Please try again later"
        });
    }
}

// @desc    Create Category Records
// route    POST /api/medicine/category/create
// @access  Private (Admin)
const createCategory = async(req, res, next) => {
    try {
        console.log(req.body);
        const { categoryName, strengthType } = req.body;
        const createdRecord = await prisma.category.create({
            data: {
                id: uuidv4(),
                categoryName,
                strengthType
            }
        });
        
        console.log(createdRecord);  
        
        return res.status(200).json({
            ok: true,
            data: createdRecord,
            message: "Category record created successfully"
        });
    } catch (err) {
        console.log(`Category Creating Error : ${err.message}`);
        
        return res.status(500).json({
            ok: false,
            data: [],
            message: `Creating Category record failed, Please try again later`
        });
    }
};



module.exports = {getMedicineList, createMedicineList, getCategoryList, createCategory, updateMedicineList, deleteMedicineList};