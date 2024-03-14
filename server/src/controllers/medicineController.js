//prisma client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const {v4 : uuidv4} = require('uuid');
const ExpressError = require('../utils/ExpressError');

// @desc    Get Medicine List
// route    GET /api/medicine/list
// @access  Private (Admin)
const getMedicineList = async(req, res, next) => {
    
        const medicineList = await prisma.medicine.findMany({
            include: {
                Category: true // Include the category information
            }
        });
        
        // Extract the required fields from the result and construct the response
        const responseData = medicineList.map(medicine => ({
            id: medicine.id,
            brandName: medicine.brandName,
            saltName: medicine.saltName,
            categoryName: medicine.Category.categoryName // Access the categoryName from the category information
        }));
        
        return res.status(200).json({
            ok: true,
            data: responseData,
            message: "Medicine List retrieved successfully"
        });
    
};

// @desc    Create Medicine List Records
// route    POST /api/medicine/create
// @access  Private (Admin)
const createMedicineList = async(req, res, next) => {
    
        // console.log(req.body);
        const { saltName, brandName, categoryId} = req.body;
        // Check if categoryId exists in the database
        const category = await prisma.category.findUnique({
            where: {
                id: categoryId
            }
        });

        if (!category) {
            throw new ExpressError("Category does not exist", 404)
        }

        // Create medicine record
        const createdRecord = await prisma.medicine.create({
            data: {
                saltName,
                brandName,
                categoryId
            }
        });  
        
        return res.status(200).json({
            ok: true,
            data: createdRecord,
            message: "Medicine List record created successfully"
        });
    
};


// @desc    Update Medicine List Record
// route    PUT /api/medicine/update
// @access  Private (Admin) 
const updateMedicineList = async(req, res, next) => {
    
    try{
    const { id } = req.params;
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
    }catch(err){
        console.log(`Medicine List Updating Error : ${err.message}`);

        let errMsg = "Updating medicine list record failed, Please try again later";
        let errCode = 500;

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
        const { id } = req.params;        
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
        
        let errMsg = "Deleting medicine list record failed, Please try again later";
        let errCode = 500;

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






module.exports = {
    getMedicineList, 
    createMedicineList, 
    updateMedicineList, 
    deleteMedicineList
};