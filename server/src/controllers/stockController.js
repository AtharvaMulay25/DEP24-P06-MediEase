/*
This file contains irredundant operations for stock list like update, delete, create*******
Also remove category from stock table
*/

//prisma client 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// @desc    Get Stock List
// route    GET /api/stock
// @access  Private (Admin) 
const getStockList = async(req, res, next) => {
    try {
        const stockList = await prisma.stock.findMany({
            include: {
              Medicine: {
                select: {
                  brandName: true,
                  Category: {
                    select: {
                      categoryName: true,
                    },
                  },
                },
              },
            },
          });
          
          // Restructure the data to have `medicineName` outside the `Medicine` object
          const restructuredStockList = stockList.map(stock => ({
            id: stock.id,
            netQuantity: (stock.inQuantity-stock.outQuantity),
            category: stock.Medicine.Category.categoryName,
            inQuantity: stock.inQuantity,
            outQuantity: stock.outQuantity,
            medicineName: stock.Medicine.brandName // Access `name` from `Medicine` object
          }));
          
        // console.log("restructuredStockList : ", restructuredStockList);
        
        return res.status(200).json({
            ok: true,
            data: restructuredStockList,
            message: "Stock List retrieved successfully"
        });
    } catch (err) {
        console.log(`Stock List Fetching Error : ${err.message}`);
        
        return res.status(500).json({
            ok: false,
            data: [],
            message: "Fetching stock list failed, Please try again later"
        });
    }
};

// @desc    Create Stock List Records
// route    POST /api/stock/create
// @access  Private (Admin) 
const createStockList = async(req, res, next) => {
    try {
        const createdRecord = await prisma.stock.create({
            data: {
                ...req.body
            }
        });
        
        // console.log(createdRecord);  
        
        return res.status(200).json({
            ok: true,
            data: createdRecord,
            message: "Stock List record created successfully"
        });
    } catch (err) {
        console.log(`Stock List Creating Error : ${err.message}`);
        
        return res.status(500).json({
            ok: false,
            data: [],
            message: "Creating stock list failed, Please try again later"
        });
    }
};

// @desc    Update Stock List Record
// route    PUT /api/stock/update
// @access  Private (Admin) 
const updateStockList = async(req, res, next) => {
    try {
        const { id } = req.body;
        const updatedRecord = await prisma.stock.update({
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
            message: "Stock List record updated successfully"
        });
    } catch (err) {
        console.log(`Stock List Updating Error : ${err.message}`);
        
        let errMsg = "Updating stock list record failed, Please try again later";
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


// @desc    Delete Stock List Record
// route    DELETE /api/stock/delete
// @access  Private (Admin) 
const deleteStockList = async(req, res, next) => {
    try {
        const { id } = req.body;
        
        const deletedRecord = await prisma.stock.delete({
            where: {
              id: id,
            },
        });
          
        return res.status(200).json({
            ok: true,
            data: deletedRecord,
            message: "Stock List Record deleted successfully"
        });
    } catch (err) {
        console.log(`Stock List Deletion Error : ${err.message}`);
        
        let errMsg = "Deleting stock list record failed, Please try again later";
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
    getStockList,
    createStockList,
    updateStockList,
    deleteStockList
};