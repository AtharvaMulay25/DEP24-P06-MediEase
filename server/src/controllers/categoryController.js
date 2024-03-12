//prisma client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const {v4 : uuidv4} = require('uuid')

// @desc    Get Category List
// route    GET /api/medicine/category/list
// @access  Private (Admin)
const getCategoryList = async(req, res, next) => {
    try {
        const categoryList = await prisma.category.findMany({});
        // console.log(categoryList);  
        
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
                categoryName,
                strengthType
            }
        });
        
        // console.log(createdRecord);  
        
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


// @desc    Delete Category List Record
// route    DELETE /api/medicine/category
// @access  Private (Admin) 
const deleteCategory = async(req, res, next) => {
    try {
        console.log("req.body : ", req.body);
        const { id } = req.body;
        
        const deletedRecord = await prisma.category.delete({
            where: {
              id: id,
            },
        });
          
        return res.status(200).json({
            ok: true,
            data: deletedRecord,
            message: "Category List Record deleted successfully"
        });
    } catch (err) {
        console.log(`Category List Deletion Error : ${err.message}`);
        
        let errMsg = "Deleting category list record failed, Please try again later";
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
    getCategoryList, 
    createCategory, 
    deleteCategory
};