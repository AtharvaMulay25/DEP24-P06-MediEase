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
        BigInt.prototype.toJSON = function () {
            return this.toString();
          };

        const purchaseList = await prisma.purchaseList.findMany({
            include: {
              Purchase: true, 
              Supplier: {
                select: {
                  name: true
                }
              }
            }
          });
          
          const restructuredPurchaseList = purchaseList.map(purchase => ({
            id: purchase.id,
            supplierName: purchase.Supplier.name, 
            purchaseDate: purchase.purchaseDate.toISOString().split('T')[0],
            invoiceNo: purchase.invoiceNo, 
            details: purchase.Details,
            // purchaseItems: purchase.Purchase
          }));
        
        console.log(restructuredPurchaseList);  
        
        return res.status(200).json({
            ok: true,
            data: restructuredPurchaseList,
            message: "Puchase List retrieved successfully"
        });
    
};

// @desc    Create Purchase List Records
// route    POST /api/purchase/create
// @access  Private (Admin) 
const createPurchaseList = async(req, res, next) => {
        const {purchaseDate, invoiceNo, supplierId, purchaseDetails, purchaseItems} = req.body;
        // const {} = purchaseListEntry;
        // console.log(purchaseListEntry)
        console.log(purchaseItems)
        
        const supplier = await prisma.supplier.findUnique({
            where: {
                id: supplierId
            }
        });

        if (!supplier) {
            return res.status(404).json({
                ok: false,
                message: `Supplier with id ${supplierId} not found`
            });
        }

        
        const createdRecord = await prisma.purchaseList.create({
                data: {
                    purchaseDate,
                    invoiceNo,
                    supplierId,
                    Details: purchaseDetails,           //change Details name to details in schema*******
                    Purchase: {
                        create: purchaseItems.map(item => ({
                            medicineId: item.medicineId,
                            quantity: item.quantity,
                            batchNo: BigInt(item.batchNo) || 0,
                            mfgDate: item.mfgDate,
                            expiryDate: item.expiryDate, 
                        }))
                    }
                }
            });
        console.log("createRecord ", createdRecord);
        return res.status(200).json({
            ok: true,
            data: createdRecord,
            message: "Puchase List record created successfully"
        });
    
};

// @desc    Update Purchase List Record
// route    PUT /api/purchase/update
// @access  Private (Admin) 
const updatePurchaseList = async(req, res, next) => {
    try {
        const {id} = req.params;        
        const updatedRecord = await prisma.purchase.update({
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
            message: "Puchase List record updated successfully"
        });
    } catch (err) {
        console.log(`Purchase List Updating Error : ${err.message}`);
        
        let errMsg = "Updating purchase list record failed, Please try again later";
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


// @desc    Delete Purchase List Record
// route    DELETE /api/purchase/delete
// @access  Private (Admin) 
const deletePurchaseList = async(req, res, next) => {
    try {
        console.log("req.body : ", req.body);
        const {id} = req.params;        
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
        
        let errMsg = "Deleting purchase list record failed, Please try again later";
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
    getPurchaseList,
    createPurchaseList,
    updatePurchaseList,
    deletePurchaseList
};