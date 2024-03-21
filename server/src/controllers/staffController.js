//prisma client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const { v4: uuidv4 } = require('uuid');
const ExpressError = require('../utils/ExpressError');

// @desc    Get Staff List
// route    GET /api/staff
// @access  Private (Admin)
const getStaffList = async (req, res, next) => {
    const staffList = await prisma.staff.findMany({});
    console.log("staffList : ", staffList);

    return res.status(200).json({
        ok: true,
        data: responseData,
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