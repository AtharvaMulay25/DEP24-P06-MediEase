//prisma client
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");
const ExpressError = require("../utils/ExpressError");

// @desc    Get Medicine List
// route    GET /api/medicine
// @access  Private (Admin)
const getMedicineList = async (req, res, next) => {
  const medicineList = await prisma.medicine.findMany({
    where: {
      status: "ACTIVE",
    },
    include: {
      Category: true, // Include the category information
    },
  });

  // Extract the required fields from the result and construct the response
  const responseData = medicineList.map((medicine) => ({
    id: medicine.id,
    brandName: medicine.brandName,
    saltName: medicine.saltName,
    categoryName: medicine.Category.categoryName, // Access the categoryName from the category information
  }));

  return res.status(200).json({
    ok: true,
    data: responseData,
    message: "Medicine List retrieved successfully",
  });
};

// @desc    Get a single medicine 
// route    GET /api/medicine/:id
// @access  Private (Admin)
const getMedicine = async (req, res, next) => {
  const {id} = req.params;
  const medicine = await prisma.medicine.findUnique({
    where: {
      id
    },
    include: {
      Category: true, 
    },
  });

  return res.status(200).json({
    ok: true,
    data: medicine,
    message: "Medicine retrieved successfully",
  });
};

//get all the expired medicines
const getExpiredMedicines = async (req, res, next) => {
  const expiredMedicines = await prisma.purchase.findMany({
    where: {
      expiryDate: {
        lte: new Date(),
      },
    },
    include: {
      Medicine: true,
    },
  });

  // Extract the required fields from the result and construct the response
  const responseData = expiredMedicines.map((medicine) => ({
    batchNo: medicine.batchNo,
    brandName: medicine.Medicine.brandName,
    saltName: medicine.Medicine.saltName,
    expiryDate: medicine.expiryDate.toISOString().split("T")[0],
    quantity: medicine.quantity,
  }));

  return res.status(200).json({
    ok: true,
    data: responseData,
    message: "Expired Medicines List fetched successfully",
  });
};

// @desc    Create Medicine List Records
// route    POST /api/medicine
// @access  Private (Admin)
const createMedicineList = async (req, res, next) => {
  // console.log(req.body);
  const { saltName, brandName, categoryId } = req.body;
  // Check if categoryId exists in the database
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
      status: "ACTIVE",
    },
  });

  if (!category) {
    throw new ExpressError("Category does not exist", 404);
  }

  //Finding by brandName *******
  const medicineExists = await prisma.medicine.findFirst({
    where: {
      brandName: brandName,
    },
  });

  let newMedicineRecord;
  if (medicineExists && medicineExists.status === "ACTIVE") {
    throw new ExpressError("Medicine already exists", 400);
  }
  if (medicineExists && medicineExists.status === "INACTIVE") {
    const restoredMedicine = await prisma.medicine.update({
      where: {
        id: medicineExists.id,
      },
      data: {
        saltName: saltName,
        brandName: brandName,
        categoryId: categoryId,
        status: "ACTIVE",
      },
    });
    newMedicineRecord = restoredMedicine;
  }

  if (!medicineExists) {
    // Create medicine record
    const createdRecord = await prisma.medicine.create({
      data: {
        saltName,
        brandName,
        categoryId,
      },
    });
    newMedicineRecord = createdRecord;
  }

  return res.status(200).json({
    ok: true,
    data: newMedicineRecord,
    message: "Medicine List record created successfully",
  });
};

// @desc    Update Medicine List Record
// route    PUT /api/medicine
// @access  Private (Admin)
const updateMedicineList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedRecord = await prisma.medicine.update({
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
      message: "Medicine List record updated successfully",
    });
  } catch (err) {
    console.log(`Medicine List Updating Error : ${err.message}`);

    let errMsg = "Updating medicine list record failed, Please try again later";
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

// @desc    Delete Medicine List Record
// route    DELETE /api/medicine
// @access  Private (Admin)
const deleteMedicineList = async (req, res, next) => {
  try {
    console.log("req.body : ", req.body);
    const { id } = req.params;
    const deletedRecord = await prisma.medicine.update({
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
      message: "Medicine List Record deleted successfully",
    });
  } catch (err) {
    console.log(`Medicine List Deletion Error : ${err.message}`);

    let errMsg = "Deleting medicine list record failed, Please try again later";
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
  getMedicineList,
  getMedicine,
  getExpiredMedicines,
  createMedicineList,
  updateMedicineList,
  deleteMedicineList,
};
