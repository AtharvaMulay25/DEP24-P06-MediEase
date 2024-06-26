/*
This file contains irredundant operations for stock list like update, delete, create*******
Also remove category from stock table
*/

//prisma client
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// @desc    Get Stock List
// route    GET /api/stock
// @access  Private (Admin)
const getTotalStock = async (req, res, next) => {
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
    const restructuredStockList = stockList.map((stock) => ({
      id: stock.id,
      netQuantity: stock.stock,
      category: stock.Medicine.Category.categoryName,
      inQuantity: stock.inQuantity,
      outQuantity: stock.outQuantity,
      medicineName: stock.Medicine.brandName, // Access `name` from `Medicine` object
    }));

    // console.log("restructuredStockList : ", restructuredStockList);

    return res.status(200).json({
      ok: true,
      data: restructuredStockList,
      message: "Stock List fetched successfully",
    });
  } catch (err) {
    console.log(`Stock List Fetching Error : ${err.message}`);

    return res.status(500).json({
      ok: false,
      data: [],
      message: "Fetching Stock List failed, Please try again later",
    });
  }
};
//give positive stock medicines only
const getAvailableStock = async (req, res, next) => {
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
    const restructuredStockList = stockList
      .filter((stock) => stock.stock > 0)
      .map((stock) => ({
        id: stock.id,
        medicineId: stock.medicineId,
        netQuantity: stock.stock,
        category: stock.Medicine.Category.categoryName,
        inQuantity: stock.inQuantity,
        outQuantity: stock.outQuantity,
        medicineName: stock.Medicine.brandName, // Access `name` from `Medicine` object
      }));
    return res.status(200).json({
      ok: true,
      data: restructuredStockList,
      message: "Available Stock List fetched successfully",
    });
  } catch (err) {
    console.log(`Stock List Fetching Error : ${err.message}`);

    return res.status(500).json({
      ok: false,
      data: [],
      message: "Fetching Stock List failed, Please try again later",
    });
  }
};

const getUpdatedAvailableStock = async (req, res, next) => {
  const checkupId = req.params.checkupId;
  console.log("checkupId : ", checkupId);
  const checkupItems = await prisma.checkupMedicine.findMany({
    where: {
      checkupId: checkupId,
    },
  });
  // console.log("checkupItems[] : ", checkupItems);
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
  // console.log("stockList[] : ", stockList);
  const updatedStockList = stockList
    .map((stock) => {
      const checkupItem = checkupItems.find(
        (checkupItem) => checkupItem.medicineId === stock.medicineId
      );
      // console.log("checkupItem : ", checkupItem);
      if (checkupItem) {
        stock.outQuantity -= checkupItem.quantity;
        stock.stock += checkupItem.quantity;
      }
      // console.log("stock : ", stock);
      return {
        id: stock.id,
        medicineId: stock.medicineId,
        netQuantity: stock.stock,
        category: stock.Medicine.Category.categoryName,
        inQuantity: stock.inQuantity,
        outQuantity: stock.outQuantity,
        medicineName: stock.Medicine.brandName,
      }; // Access `name` from `Medicine` object;
    }).filter((stock) => stock.netQuantity > 0);
  
    // console.log("updatedStockList : ", updatedStockList);

  return res.status(200).json({
    ok: true,
    data: updatedStockList,
    message: "Available Stock List fetched successfully",
  });
};

//get out of stock medicines only
const getOutOfStock = async (req, res, next) => {
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
    const restructuredStockList = stockList
      .filter((stock) => stock.stock <= 0)
      .map((stock) => ({
        id: stock.id,
        netQuantity: stock.stock,
        category: stock.Medicine.Category.categoryName,
        inQuantity: stock.inQuantity,
        outQuantity: stock.outQuantity,
        medicineName: stock.Medicine.brandName, // Access `name` from `Medicine` object
      }));

    // console.log("restructuredStockList : ", restructuredStockList);

    return res.status(200).json({
      ok: true,
      data: restructuredStockList,
      message: "Out of Stock List fetched successfully",
    });
  } catch (err) {
    console.log(`Stock List Fetching Error : ${err.message}`);

    return res.status(500).json({
      ok: false,
      data: [],
      message: "Fetching Stock List failed, Please try again later",
    });
  }
};

//will give update option to only admin, if any error occurs.... **********

// @desc    Update Stock List Record
// route    PUT /api/stock/update
// @access  Private (Admin)
const updateStockList = async (req, res, next) => {
  try {
    const { id } = req.body;
    const updatedRecord = await prisma.stock.update({
      where: {
        id,
      },
      data: {
        ...req.body,
      },
    });

    // console.log(updatedRecord);

    return res.status(200).json({
      ok: true,
      data: updatedRecord,
      message: "Stock List record updated successfully",
    });
  } catch (err) {
    console.log(`Stock List Updating Error : ${err.message}`);

    let errMsg = "Updating stock list record failed, Please try again later";
    let errCode = 500;

    //record does not exist
    if (err.code === "P2025") {
      errMsg = "Record does not exist";
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
const deleteStockList = async (req, res, next) => {
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
      message: "Stock List Record deleted successfully",
    });
  } catch (err) {
    console.log(`Stock List Deletion Error : ${err.message}`);

    let errMsg = "Deleting stock list record failed, Please try again later";
    let errCode = 500;

    //record does not exist
    if (err.code === "P2025") {
      errMsg = "Record does not exist";
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
  getTotalStock,
  getAvailableStock,
  getUpdatedAvailableStock,
  getOutOfStock,
  updateStockList,
  deleteStockList,
};
