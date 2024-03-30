const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");
const ExpressError = require("../utils/ExpressError");
const sendMail = require("../utils/sendMail");
const {ACCOUNT_CREATED_MAIL_TEMPLATE} = require("../../constants");
// @desc    Get Admin List
// route    GET /api/admin
// @access  Private (Admin)
const getAdminList = async (req, res, next) => {
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
};

// @desc    Create Admin Records
// route    POST /api/admin
// @access  Private (Admin)
const createAdmin = async (req, res, next) => {
    console.log(req.body);
    const { name, email } = req.body;

    const adminRecord = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if(adminRecord){
      throw new ExpressError("Admin already exists", 400);
    }
    //Admin account can only be created externally by other admin
      //send mail to user here
      const mailTemplate = ACCOUNT_CREATED_MAIL_TEMPLATE();
      const mailOptions = {
          from: "dep2024.p06@gmail.com",
          to: email,
          subject: "Mediease - Account Created" ,
          html: mailTemplate,
          text: "",
        };

        const info = await sendMail(mailOptions);
        if(!info){
            throw new ExpressError("Error in sending mail to the admin", 500);
        }
    const createdRecord = await prisma.user.create({
      data: {
        name,
        email,
        role: "ADMIN",
      },
    });

    // console.log(createdRecord);

    return res.status(200).json({
      ok: true,
      data: createdRecord,
      message: "Admin added successfully",
    });
  
  
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
