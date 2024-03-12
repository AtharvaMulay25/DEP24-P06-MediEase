//prisma client 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// @desc    Get Patient List
// route    GET /api/patient
// @access  Private (Admin) 
const getPatientList = async (req, res, next) => {
    try {
        const patientList = await prisma.patient.findMany({});

        // console.log("patientList : ", patientList);

        return res.status(200).json({
            ok: true,
            data: patientList,
            message: "Patient List retrieved successfully"
        });
    } catch (err) {
        console.log(`Patient List Fetching Error : ${err.message}`);

        return res.status(500).json({
            ok: false,
            data: [],
            message: "Fetching patient list failed, Please try again later"
        });
    }
};

// @desc    Create Patient List Records
// route    POST /api/patient
// @access  Private (Admin) 
const createPatient = async (req, res, next) => {
    try {
        const createdRecord = await prisma.patient.create({
            data: {
                ...req.body
            }
        });

        // console.log(createdRecord);  

        return res.status(200).json({
            ok: true,
            data: createdRecord,
            message: "Patient List record created successfully"
        });
    } catch (err) {
        console.log(`Patient List Creating Error : ${err.message}`);

        return res.status(500).json({
            ok: false,
            data: [],
            message: "Creating patient list failed, Please try again later"
        });
    }
};

// @desc    Update Patient List Record
// route    PUT /api/patient
// @access  Private (Admin) 
const updatePatient = async (req, res, next) => {
    try {
        const { id } = req.body;
        const updatedRecord = await prisma.patient.update({
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
            message: "Patient List record updated successfully"
        });
    } catch (err) {
        console.log(`Patient List Updating Error : ${err.message}`);

        let errMsg = "Updating patient list record failed, Please try again later";
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


// @desc    Delete Patient List Record
// route    DELETE /api/patient
// @access  Private (Admin) 
const deletePatient = async (req, res, next) => {
    try {
        const { id } = req.body;

        const deletedRecord = await prisma.patient.delete({
            where: {
                id: id,
            },
        });

        return res.status(200).json({
            ok: true,
            data: deletedRecord,
            message: "Patient List Record deleted successfully"
        });
    } catch (err) {
        console.log(`Patient List Deletion Error : ${err.message}`);

        let errMsg = "Deleting patient list record failed, Please try again later";
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
    getPatientList,
    createPatient,
    updatePatient, 
    deletePatient
};