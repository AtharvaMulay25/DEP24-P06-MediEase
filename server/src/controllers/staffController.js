//prisma client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const sendMail = require('../utils/sendMail');
const {ACCOUNT_CREATED_MAIL_TEMPLATE} = require('../../constants');
const { v4: uuidv4 } = require('uuid');
const ExpressError = require('../utils/ExpressError');

// @desc    Get Staff List
// route    GET /api/staff
// @access  Private (Admin)
const getStaffList = async (req, res, next) => {
    const staffList = await prisma.staff.findMany({});
    // console.log("staffList : ", staffList);

    return res.status(200).json({
        ok: true,
        data: staffList,
        message: "Staff List retrieved successfully"
    });
};

// @desc    Create Staff List Records
// route    POST /api/staff
// @access  Private (Admin)
const createStaff = async (req, res, next) => {
    const { 
        name, 
        email, 
        mobileNumber,
        role,
        department,
        gender
    } = req.body;

    const userRecord =  await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if(!userRecord){
        //It means account is being created externally by staff/admin/doctor
          // Create user record
          const createdUserRecord = await prisma.user.create({
              data: {
                  name,
                  email,
                  role
              }
          })
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
              throw new ExpressError("Error in sending mail to the staff", 500);
          }

      }
    if(userRecord && userRecord.role !== "PARAMEDICAL" && userRecord.role !== "DOCTOR"){
        throw new ExpressError("User already exists with different role", 400);
    };
    const staffRecord = await prisma.staff.findUnique({
        where: {
            email: email
        }
    });
    if(staffRecord) {
        throw new ExpressError("Staff already exists", 400);
    }
    // Create staff record
    const createdRecord = await prisma.staff.create({
        data: {
            name, 
            email, 
            mobileNumber,
            role,
            department,
            gender
        }
    });

    return res.status(200).json({
        ok: true,
        data: createdRecord,
        message: "Staff added successfully"
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
                ...req.body
            },
        });

        // console.log(updatedRecord);  

        return res.status(200).json({
            ok: true,
            data: updatedRecord,
            message: "Staff details updated successfully"
        });
    } catch (err) {
        console.log(`Staff List Updating Error : ${err.message}`);

        let errMsg = "Updating staff list record failed, Please try again later";
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

// @desc    Delete Staff List Record
// route    DELETE /api/staff
// @access  Private (Admin) 
const deleteStaff = async (req, res, next) => {
    try {
        // console.log("req.body : ", req.body);
        const { id } = req.params;
        const deletedRecord = await prisma.staff.delete({
            where: {
                id: id,
            },
        });

        return res.status(200).json({
            ok: true,
            data: deletedRecord,
            message: "Staff List Record deleted successfully"
        });
    } catch (err) {
        console.log(`Staff List Deletion Error : ${err.message}`);

        let errMsg = "Deleting staff list record failed, Please try again later";
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
    getStaffList,
    createStaff,
    updateStaff,
    deleteStaff
};