/*
THIS PURCHASE TABLE NEEDS TO BE UPDATED AND THEN ALL ITS ROUTES**
*/
//prisma client 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// @desc    Get Purchase List
// route    GET /api/purchase/list
// @access  Private (Admin) 
const getPurchaseList = async(req, res, next) => {
    try {
        const purchaseList = await prisma.purchase.findMany({
            include: {
            //   Medicine: {
            //     select: {
            //       name: true
            //     }
            //   },
              Supplier: {
                select: {
                  name: true
                }
              }
            }
          });
          
          // Restructure the data to have `medicineName` and `supplierName` outside the `Medicine` and `Supplier` object
          const restructuredPurchaseList = purchaseList.map(purchase => ({
            id: purchase.id,
            // medicineName: purchase.Medicine.name, // Access `name` from `Medicine` object
            supplierName: purchase.Supplier.name, // Access `name` from `Supplier` object
            // quantity: purchase.quantity,
            totalAmount: purchase.amount,
            purchaseDate: purchase.purchaseDate
          }));
        
        console.log(restructuredPurchaseList);  
        
        return res.status(200).json({
            ok: true,
            data: restructuredPurchaseList,
            message: "Puchase List retrieved successfully"
        });
    } catch (err) {
        console.log(`Purchase List Fetching Error : ${err.message}`);
        
        return res.status(500).json({
            ok: false,
            data: [],
            message: "Fetching purchase list failed, Please try again later"
        });
    }
};

// @desc    Create Purchase List Records
// route    POST /api/purchase/create
// @access  Private (Admin) 
const createPurchaseList = async(req, res, next) => {
    try {
        const createdRecord = await prisma.purchase.create({
            data: {
                ...req.body
            }
        });
        
        console.log(createdRecord);  
        
        return res.status(200).json({
            ok: true,
            data: createdRecord,
            message: "Puchase List record created successfully"
        });
    } catch (err) {
        console.log(`Purchase List Creating Error : ${err.message}`);
        
        return res.status(500).json({
            ok: false,
            data: [],
            message: "Creating purchase list failed, Please try again later"
        });
    }
};

// @desc    Update Purchase List Record
// route    PUT /api/purchase/update
// @access  Private (Admin) 
const updatePurchaseList = async(req, res, next) => {
    try {
        const { id } = req.body;
        const updatedRecord = await prisma.purchase.update({
            where: {
                id,
            },
            data: {
                ...req.body
            },
        });

        console.log(updatedRecord);  
        
        return res.status(200).json({
            ok: true,
            data: updatedRecord,
            message: "Puchase List record updated successfully"
        });
    } catch (err) {
        console.log(`Purchase List Updating Error : ${err.message}`);
        
        const errMsg = "Updating purchase list record failed, Please try again later";
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


// @desc    Delete Purchase List Record
// route    DELETE /api/purchase/delete
// @access  Private (Admin) 
const deletePurchaseList = async(req, res, next) => {
    try {
        const { id } = req.body;
        
        const deletedRecord = await prisma.purchase.delete({
            where: {
              id: id,
            },
        });
          
        return res.status(200).json({
            ok: true,
            data: deletedRecord,
            message: "Puchase List Record deleted successfully"
        });
    } catch (err) {
        console.log(`Purchase List Deletion Error : ${err.message}`);
        
        const errMsg = "Deleting purchase list record failed, Please try again later";
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


module.exports = {
    getPurchaseList,
    createPurchaseList,
    updatePurchaseList,
    deletePurchaseList
};