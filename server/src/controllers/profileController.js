//prisma client
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const sendMail = require("../utils/sendMail");
const { ACCOUNT_CREATED_MAIL_TEMPLATE, ACCOUNT_DELETED_MAIL_TEMPLATE} = require("../../constants");
const ExpressError = require("../utils/ExpressError");

// @desc    Get Patient Profile
// route    GET /api/profile/patient/:email
// @access  Private (Admin)
const getPatientProfile = async (req, res, next) => {
  const patientProfile = await prisma.patient.findUnique({
    where: {
      email: req.params?.email,
    },
  });
  return res.status(200).json({
    ok: true,
    data: patientProfile,
    message: "Patient Profile retrieved successfully",
  });
};

// @desc    Update Patient Profile
// route    PUT /api/profile/patient/:email
// @access  Private (Admin)
const updatePatientProfile = async (req, res, next) => {
	const patientProfile = await prisma.patient.update({
		where: {
			email: req.params?.email,
		},
		data: req.body,
	});
	return res.status(200).json({
		ok: true,
		data: patientProfile,
		message: "Patient Profile updated successfully",
	});
}

// @desc    Delete Patient Profile
// route    DELETE /api/profile/patient/:email
// @access  Private (Admin)
const deletePatientProfile = async (req, res, next) => {}


// @desc    Get Staff Profile
// route    GET /api/profile/staff/:email
// @access  Private (Admin)
const getStaffProfile = async (req, res, next) => {
  const staffProfile = await prisma.staff.findUnique({
    where: {
      email: req.params?.email,
    },
  });
  return res.status(200).json({
    ok: true,
    data: staffProfile,
    message: "Staff Profile retrieved successfully",
  });
};

// @desc    Update Staff Profile
// route    PUT /api/profile/staff/:email
// @access  Private (Admin)
const updateStaffProfile = async (req, res, next) => {
	const staffProfile = await prisma.staff.update({
		where: {
			email: req.params?.email,
		},
		data: req.body,
	});
	return res.status(200).json({
		ok: true,
		data: staffProfile,
		message: "Staff Profile updated successfully",
	});
}

// @desc    Delete Staff Profile
// route    DELETE /api/profile/staff/:email
// @access  Private (Admin)
const deleteStaffProfile = async (req, res, next) => {}

// @desc    Get Admin Profile
// route    GET /api/profile/admin/:email
// @access  Private (Admin)
const getAdminProfile = async (req, res, next) => {
	const adminProfile = await prisma.admin.findUnique({
		where: {
			email: req.params?.email,
		},
	});
	return res.status(200).json({
		ok: true,
		data: adminProfile,
		message: "Admin Profile retrieved successfully",
	});
}

// @desc    Update Admin Profile
// route    PUT /api/profile/admin/:email
// @access  Private (Admin)
const updateAdminProfile = async (req, res, next) => {
	const adminProfile = await prisma.admin.update({
		where: {
			email: req.params?.email,
		},
		data: req.body,
	});
	return res.status(200).json({
		ok: true,
		data: adminProfile,
		message: "Admin Profile updated successfully",
	});
}


module.exports = {
	getPatientProfile,
	updatePatientProfile,
	deletePatientProfile,
	getStaffProfile,
	updateStaffProfile,
	deleteStaffProfile,
	getAdminProfile,
	updateAdminProfile,
};

