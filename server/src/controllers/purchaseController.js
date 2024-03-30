/*
THIS PURCHASE TABLE NEEDS TO BE UPDATED AND THEN ALL ITS ROUTES**
*/
//prisma client
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ExpressError = require("../utils/ExpressError");

// @desc    Get Purchase Details
// route    GET /api/purchase/:id
// @access  Private (Admin)
const getPurchaseDetails = async (req, res, next) => {
    
    const { id } = req.params;
    const purchaseDetails = await prisma.purchaseList.findUnique({
        where: {
            id: id,
        },
        include: {
            Purchase: {
                include: {
                    Medicine: {
                        select: {
                            brandName: true,
                        },
                    },
                },
            },
            Supplier: {
                select: {
                    name: true,
                },
            },
        },
    });

    if (!purchaseDetails) {
        throw new ExpressError("Purchase Details does not exist", 404);
    }

    const restructuredPurchaseDetails = {
        supplierName: purchaseDetails.Supplier.name,
        purchaseDate: purchaseDetails.purchaseDate.toISOString().split("T")[0],
        invoiceNo: purchaseDetails.invoiceNo,
        details: purchaseDetails.Details,
        medicines: purchaseDetails.Purchase.map((purchase) => ({
            name: purchase.Medicine.brandName,
            batchNo: purchase.batchNo.toString(),
            mfgDate: purchase.mfgDate ? purchase.mfgDate.toISOString().split("T")[0] : "",
            expDate: purchase.expiryDate.toISOString().split("T")[0],
            totalQuantity: purchase.quantity,
        })),
    };


    return res.status(200).json({
        ok: true,
        data: restructuredPurchaseDetails,
        message: "Puchase Details retrieved successfully",
    });
};



// @desc    Get Purchase List
// route    GET /api/purchase/list
// @access  Private (Admin)
const getPurchaseList = async (req, res, next) => {
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };

  const purchaseList = await prisma.purchaseList.findMany({
    include: {
      Purchase: true,
      Supplier: {
        select: {
          name: true,
        },
      },
    },
  });

  const restructuredPurchaseList = purchaseList.map((purchase) => ({
    id: purchase.id,
    supplierName: purchase.Supplier.name,
    purchaseDate: purchase.purchaseDate.toISOString().split("T")[0],
    invoiceNo: purchase.invoiceNo,
    details: purchase.Details,
    // purchaseItems: purchase.Purchase
  }));

  console.log(restructuredPurchaseList);

  return res.status(200).json({
    ok: true,
    data: restructuredPurchaseList,
    message: "Puchase List retrieved successfully",
  });
};

// @desc    Create Purchase List Records
// route    POST /api/purchase/create
// @access  Private (Admin)
const createPurchaseList = async (req, res, next) => {
  const {
    purchaseDate,
    invoiceNo,
    supplierId,
    purchaseDetails,
    purchaseItems,
  } = req.body;
  // const {} = purchaseListEntry;
  console.log(purchaseDate)
//   console.log(purchaseItems);

  const supplier = await prisma.supplier.findUnique({
    where: {
      id: supplierId,
    },
  });

  if (!supplier) {
    throw new ExpressError("Supplier does not exist", 404);
  }

  const invoiceNoRecord = await prisma.purchaseList.findUnique({
    where: {
      invoiceNo,
    },
  });

  if (invoiceNoRecord) {
    throw new ExpressError("Invoice No already exists", 400);
  }

  //handling validations on each purchase item
  for (const [idx, purchase] of purchaseItems.entries()) {
    const medicineRecord = await prisma.medicine.findUnique({
      where: {
        id: purchase.medicineId,
      },
    });
    if (!medicineRecord) {
      throw new ExpressError(
        `Medicine with ID ${purchase.medicineId} does not exist in ITEM ${idx}`,
        404
      );
    }

    const batchNoRecord = await prisma.purchase.findUnique({
      where: {
        batchNo: BigInt(purchase.batchNo) || 0,
      },
    });
    if (batchNoRecord) {
      throw new ExpressError(
        `Batch No ${purchase.batchNo} already exists in ITEM ${idx}`,
        400
      );
    }

    if (purchase.expiryDate <= purchase.mfgDate) {
      throw new ExpressError(
        `Expiry Date cannot be less than Manufacturing Date in ITEM ${idx}`,
        400
      );
    }
    if (purchase.mfgDate >= purchaseDate || purchase.expiryDate >= purchaseDate) {
        throw new ExpressError(
            `Mfg. Date or Exp. Date cannot be greater than Purchase Date in ITEM ${idx}`,
            400
        );
    }
  }

  const createdRecord = await prisma.purchaseList.create({
    data: {
      purchaseDate: purchaseDate + "T00:00:00Z",
      invoiceNo,
      supplierId,
      Details: purchaseDetails, //change Details name to details in schema*******
      Purchase: {
        create: purchaseItems.map((item) => {
          const newItem = {
            medicineId: item.medicineId,
            quantity: item.quantity,
            batchNo: BigInt(item.batchNo) || 0,
            expiryDate: item.expiryDate + "T00:00:00Z",
          };
          if (item.mfgDate) {
            newItem.mfgDate = item.mfgDate + "T00:00:00Z";
          }
          return newItem;
        }),
      },
    },
  });
  console.log("createRecord ", createdRecord);
  return res.status(200).json({
    ok: true,
    data: createdRecord,
    message: "Puchase List record created successfully",
  });
};

// @desc    Update Purchase List Record
// route    PUT /api/purchase/update
// @access  Private (Admin)
const updatePurchaseList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedRecord = await prisma.purchase.update({
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
      message: "Puchase List record updated successfully",
    });
  } catch (err) {
    console.log(`Purchase List Updating Error : ${err.message}`);

    let errMsg = "Updating purchase list record failed, Please try again later";
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

// @desc    Delete Purchase List Record
// route    DELETE /api/purchase/delete
// @access  Private (Admin)
const deletePurchaseList = async (req, res, next) => {
  try {
    console.log("req.body : ", req.body);
    const { id } = req.params;
    const deletedRecord = await prisma.purchase.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      ok: true,
      data: deletedRecord,
      message: "Puchase List Record deleted successfully",
    });
  } catch (err) {
    console.log(`Purchase List Deletion Error : ${err.message}`);

    let errMsg = "Deleting purchase list record failed, Please try again later";
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
  getPurchaseList,
  createPurchaseList,
  updatePurchaseList,
  deletePurchaseList,
  getPurchaseDetails
};
