//prisma client 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const {sendMail} = require("../utils/sendMail");
const {ACCOUNT_CREATED_MAIL_TEMPLATE} = require("../../constants");
const ExpressError = require("../utils/ExpressError");
// @desc    Get Patient List
// route    GET /api/patient
// @access  Private (Admin) 
const getPatientList = async (req, res, next) => {
        let patientList = await prisma.patient.findMany({});     
        return res.status(200).json({
            ok: true,
            data: patientList,
            message: "Patient List retrieved successfully"
        });
   
};

// @desc    Create Patient List Records
// route    POST /api/patient
// @access  Private (Admin) 
const createPatient = async (req, res, next) => {
        console.log(req.body);

        const userRecord =  await prisma.user.findUnique({
            where: {
              email: req.body.email,
            },
          });
          
          if(!userRecord){
            //account is being created externally by admin/staff/doctor
              // Create user record
              const createdUserRecord = await prisma.user.create({
                  data: {
                      name: req.body.name,
                      email: req.body.email,
                      role: "PATIENT"
                  }
              })
              const mailTemplate = ACCOUNT_CREATED_MAIL_TEMPLATE();
              const mailOptions = {
                from: "dep2024.p06@gmail.com",
                to: req.body.email,
                subject: "Mediease - Account Created" ,
                html: mailTemplate,
                text: "",
              };
    
              const info = await sendMail(mailOptions);
              if(!info){
                  throw new ExpressError("Error in sending mail to the staff", 500);
              }

          }    
        if(userRecord && userRecord.role !== "PATIENT"){
            throw new ExpressError("User already exists with different role", 400);
        };
        const patientRecord = await prisma.patient.findUnique({
            where: {
                email: req.body.email,
            },
        });
        if(patientRecord){
            throw new ExpressError("Patient already exists", 400);
        }

        const createdRecord = await prisma.patient.create({
            data: {
                ...req.body
            }
        });

        // console.log(createdRecord);  

        return res.status(200).json({
            ok: true,
            data: createdRecord,
            message: "Patient added successfully"
        });
    
};

// @desc    Update Patient List Record
// route    PUT /api/patient
// @access  Private (Admin) 
const updatePatient = async (req, res, next) => {
    try {
        const { id } = req.params;
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
        const { id } = req.params;
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