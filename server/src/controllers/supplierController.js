//prisma client 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// @desc    Get Supplier List
// route    GET /api/supplier/list
// @access  Private (Admin) 
const getSupplierList = async(req, res, next) => {
        const supplierList = await prisma.supplier.findMany({});
        
        // console.log(supplierList);  
        
        return res.status(200).json({
            ok: true,
            data: supplierList,
            message: "Supplier List retrieved successfully"
        });
    
};

// @desc    Create Supplier List Records
// route    POST /api/supplier/create
// @access  Private (Admin) 
const createSupplier = async(req, res, next) => {
        const { name, mobileNumber, email = '', city = '', state, address1, address2 = '', pinCode ='' } = req.body;
        const createdRecord = await prisma.supplier.create({
            data: {
                name,
                mobileNumber,
                email,
                city,
                state,
                address: `${address1} ${address2}`,
                pinCode
            }
        });
        
        // console.log(createdRecord);  
        
        return res.status(200).json({
            ok: true,
            data: createdRecord,
            message: "Supplier Added successfully"
        });
   
};

// @desc    Update Supplier List Record
// route    PUT /api/supplier/update
// @access  Private (Admin) 
const updateSupplier = async(req, res, next) => {
    try {
        const {id} = req.params;        
        const updatedRecord = await prisma.supplier.update({
            where: {
                id,
            },
            data: {
                ...req.body  //may give error here concat address
            },
        });

        // console.log(updatedRecord);  
        
        return res.status(200).json({
            ok: true,
            data: updatedRecord,
            message: "Supplier List record updated successfully"
        });
    } catch (err) {
        console.log(`Supplier List Updating Error : ${err.message}`);
        
        let errMsg = "Updating Supplier list record failed, Please try again later";
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


// @desc    Delete Supplier List Record
// route    DELETE /api/supplier/delete
// @access  Private (Admin) 
const deleteSupplier = async(req, res, next) => {
    try {
        const {id} = req.params;        
        const deletedRecord = await prisma.supplier.delete({
            where: {
              id: id,
            },
        });
          
        return res.status(200).json({
            ok: true,
            data: deletedRecord,
            message: "Supplier List Record deleted successfully"
        });
    } catch (err) {
        console.log(`Supplier List Deletion Error : ${err.message}`);
        
        let errMsg = "Deleting Supplier list record failed, Please try again later";
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
    getSupplierList, 
    createSupplier,
    updateSupplier,
    deleteSupplier
};