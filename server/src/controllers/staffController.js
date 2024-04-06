//prisma client
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const sendMail = require("../utils/sendMail");
const { ACCOUNT_CREATED_MAIL_TEMPLATE } = require("../../constants");
const { v4: uuidv4 } = require("uuid");
const ExpressError = require("../utils/ExpressError");

// @desc    Get Staff List
// route    GET /api/staff
// @access  Private (Admin)
const getStaffList = async (req, res, next) => {
  const staffList = await prisma.staff.findMany({
    where: {
      status: "ACTIVE",
    },
  });
  // console.log("staffList : ", staffList);

  return res.status(200).json({
    ok: true,
    data: staffList,
    message: "Staff List retrieved successfully",
  });
};

// @desc    Create Staff List Records
// route    POST /api/staff
// @access  Private (Admin)
const createStaff = async (req, res, next) => {
  const { name, email, mobileNumber, role, department, gender } = req.body;

  const userRecord = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  let newUserRecord;
  if (!userRecord) {
    //It means account is being created externally by staff/admin/doctor
    // Create user record
    const createdUserRecord = await prisma.user.create({
      data: {
        name,
        email,
        role,
      },
    });
    newUserRecord = createdUserRecord;
    //for the cases:!userRecord  or  userRecord && userRecord.status == "INACTIVE"
    //send mail to user here
    const mailTemplate = ACCOUNT_CREATED_MAIL_TEMPLATE();
    const mailOptions = {
      from: "dep2024.p06@gmail.com",
      to: email,
      subject: "Mediease - Account Created",
      html: mailTemplate,
      text: "",
    };

    const info = await sendMail(mailOptions);
    if (!info) {
      throw new ExpressError("Error in sending mail to the staff", 500);
    }
  }
  if (userRecord && userRecord.role != role && userRecord.status == "ACTIVE") {
    throw new ExpressError("User already exists with a different role", 400);
  } else if (userRecord && userRecord.status == "INACTIVE") {
    if (userRecord.role == "PATIENT") {
      //if earlier its role was patient, then remove that entry from patient table
      //but we can't delete otherwise, it will throw error in case of foreign key constraint
    }
    const restoredUserRecord = await prisma.user.update({
      where: {
        email: userRecord.email,
      },
      data: {
        name,
        email,
        role,
        status: "ACTIVE",
      },
    });
    newUserRecord = restoredUserRecord;
    //for the cases:!userRecord  or  userRecord && userRecord.status == "INACTIVE"
    //send mail to user here
    const mailTemplate = ACCOUNT_CREATED_MAIL_TEMPLATE();
    const mailOptions = {
      from: "dep2024.p06@gmail.com",
      to: email,
      subject: "Mediease - Account Created",
      html: mailTemplate,
      text: "",
    };

    const info = await sendMail(mailOptions);
    if (!info) {
      throw new ExpressError("Error in sending mail to the staff", 500);
    }
  }

  let newStaffRecord;
  const staffRecord = await prisma.staff.findUnique({
    where: {
      email: email,
    },
  });
  if (!staffRecord) {
    // Create staff record
    const createdRecord = await prisma.staff.create({
      data: {
        name,
        email,
        mobileNumber,
        role,
        department,
        gender,
      },
    });
    newStaffRecord = createdRecord;
  }
  if (staffRecord && staffRecord.status == "ACTIVE") {
    throw new ExpressError("Staff already exists", 400);
  } else if (staffRecord && staffRecord.status == "INACTIVE") {
    const restoredStaffRecord = await prisma.staff.update({
      where: {
        email: staffRecord.email,
      },
      data: {
        name,
        email,
        mobileNumber,
        role,
        department,
        status: "ACTIVE",
      },
    });
    newStaffRecord = restoredStaffRecord;
  }

  return res.status(200).json({
    ok: true,
    data: newStaffRecord,
    message: "Staff added successfully",
  });
};

// @desc    Update Staff List Record
// route    PUT /api/staff
// @access  Private (Admin)
const updateStaff = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedRecord = await prisma.staff.update({
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
      message: "Staff details updated successfully",
    });
  } catch (err) {
    console.log(`Staff List Updating Error : ${err.message}`);

    let errMsg = "Updating staff list record failed, Please try again later";
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

// @desc    Delete Staff List Record
// route    DELETE /api/staff
// @access  Private (Admin)
const deleteStaff = async (req, res, next) => {
  try {
    // console.log("req.body : ", req.body);
    const { id } = req.params;

    const staffRecord = await prisma.staff.findUnique({
      where: {
        id: id,
      },
    });

    if (!staffRecord) {
      throw new ExpressError("Staff does not exist", 404);
    }

    const deletedUserRecord = await prisma.user.update({
      where: {
        email: staffRecord.email,
      },
      data: {
        status: "INACTIVE",
      },
    });
    //send mail to user here after deletion
    const deletedRecord = await prisma.staff.update({
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
      message: "Staff List Record deleted successfully",
    });
  } catch (err) {
    console.log(`Staff List Deletion Error : ${err.message}`);

    let errMsg = "Deleting staff list record failed, Please try again later";
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
  getStaffList,
  createStaff,
  updateStaff,
  deleteStaff,
};
