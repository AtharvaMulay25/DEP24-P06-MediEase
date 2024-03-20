const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");
const ExpressError = require("../utils/ExpressError");

// @desc    Get Admin List
// route    GET /api/admin
// @access  Private (Admin)
const getAdminList = async (req, res, next) => {
  try {
    const adminList = await prisma.user.findMany({
      where: {
        role: "ADMIN",
      },
    });
    console.log(adminList);

    return res.status(200).json({
      ok: true,
      data: adminList,
      message: "Admin List retrieved successfully",
    });
  } catch (err) {
    console.log(`Admin List Fetching Error : ${err.message}`);

    return res.status(500).json({
      ok: false,
      data: [],
      message: "Fetching Admin List failed, Please try again later",
    });
  }
};

// @desc    Create Admin Records
// route    POST /api/admin
// @access  Private (Admin)
const createAdmin = async (req, res, next) => {
  try {
    console.log(req.body);
    const { adminName, email } = req.body;
    const createdRecord = await prisma.user.create({
      data: {
        adminName,
        email,
        role: "ADMIN",
      },
    });

    // console.log(createdRecord);

    return res.status(200).json({
      ok: true,
      data: createdRecord,
      message: "Admin record created successfully",
    });
  } catch (err) {
    console.log(`Admin Creating Error : ${err.message}`);

    return res.status(500).json({
      ok: false,
      data: [],
      message: `Creating Admin record failed, Please try again later`,
    });
  }
};

// @desc    Update Admin List Record
// route    PUT /api/admin
// @access  Private (Admin)
const updateAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedRecord = await prisma.user.update({
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
      message: "Admin List record updated successfully",
    });
  } catch (err) {
    console.log(`Admin List Updating Error : ${err.message}`);

    const errMsg = "Updating admin list record failed, Please try again later";
    const errCode = 500;

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

// @desc    Delete Admin List Record
// route    DELETE /api/admin
// @access  Private (Admin)
const deleteAdmin = async (req, res, next) => {
  try {
    // console.log("req.body : ", req.body);
    const { id } = req.params;

    const deletedRecord = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      ok: true,
      data: deletedRecord,
      message: "Admin List Record deleted successfully",
    });
  } catch (err) {
    console.log(`Admin List Deletion Error : ${err.message}`);

    const errMsg = "Deleting admin list record failed, Please try again later";
    const errCode = 500;

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
  getAdminList,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
