//prisma client
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ExpressError = require("../utils/ExpressError");
// @desc    Get Supplier List
// route    GET /api/supplier/list
// @access  Private (Admin)
const getSupplierList = async (req, res, next) => {
  const supplierList = await prisma.supplier.findMany({
    where: {
      status: "ACTIVE",
    },
  });

  // console.log(supplierList);

  return res.status(200).json({
    ok: true,
    data: supplierList,
    message: "Supplier List retrieved successfully",
  });
};

// @desc    Create Supplier List Records
// route    POST /api/supplier/create
// @access  Private (Admin)
const createSupplier = async (req, res, next) => {
  const { address1, address2 = "" } = req.body;

  const supplierExists = await prisma.supplier.findUnique({
    where: {
      mobileNumber: req?.body?.mobileNumber,
    },
  });
  let newSupplierRecord ;
  if (supplierExists && supplierExists.status === "ACTIVE") {
    throw new ExpressError("Supplier already exists", 400);
  }
  if (supplierExists && supplierExists.status === "INACTIVE") {
    const restoredSupplier = await prisma.supplier.update({
      where: {
        id: supplierExists.id,
      },
      data: {
        name: req?.body?.name,
        mobileNumber: req?.body?.mobileNumber,
        email: req?.body?.email,
        city: req?.body?.city,
        state: req?.body?.state,
        address: `${address1} ${address2}`,
        pinCode: req?.body?.pinCode,
        status: "ACTIVE",
      },
    });
    newSupplierRecord = restoredSupplier;
  }

  if(!supplierExists)
  {
    const createdRecord = await prisma.supplier.create({
      data: {
        name: req?.body?.name,
        mobileNumber: req?.body?.mobileNumber,
        email: req?.body?.email,
        city: req?.body?.city,
        state: req?.body?.state,
        address: `${address1} ${address2}`,
        pinCode: req?.body?.pinCode,
      },
    });
    newSupplierRecord = createdRecord;
  }

  // console.log(createdRecord);

  return res.status(200).json({
    ok: true,
    data: newSupplierRecord,
    message: "Supplier Added successfully",
  });
};

// @desc    Update Supplier List Record
// route    PUT /api/supplier/update
// @access  Private (Admin)
const updateSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedRecord = await prisma.supplier.update({
      where: {
        id,
      },
      data: {
        ...req.body, //may give error here concat address
      },
    });

    // console.log(updatedRecord);

    return res.status(200).json({
      ok: true,
      data: updatedRecord,
      message: "Supplier List record updated successfully",
    });
  } catch (err) {
    console.log(`Supplier List Updating Error : ${err.message}`);

    let errMsg = "Updating Supplier list record failed, Please try again later";
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

// @desc    Delete Supplier List Record
// route    DELETE /api/supplier/delete
// @access  Private (Admin)
const deleteSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    //change status to inactive
    const deletedRecord = await prisma.supplier.update({
      where: {
        id: id,
      },
      data: {
        status: "INACTIVE",
      },
    });

    return res.status(200).json({
      ok: true,
      data: deletedRecord,
      message: "Supplier List Record deleted successfully",
    });
  } catch (err) {
    console.log(`Supplier List Deletion Error : ${err.message}`);

    let errMsg = "Deleting Supplier list record failed, Please try again later";
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
  getSupplierList,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
