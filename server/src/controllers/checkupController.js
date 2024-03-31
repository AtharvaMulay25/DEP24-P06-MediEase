const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ExpressError = require("../utils/ExpressError");

// @desc    Get Checkup Details
// route    GET /api/checkup/:id
// @access  Private (Admin)
const getCheckupDetails = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  console.log("inside");
  const checkup = await prisma.checkup.findUnique({
    where: {
      id: id,
    },
    include: {
      Patient: {
        select: {
          name: true,
        },
      },
      Staff: {
        select: {
          name: true,
        },
      },
      Doctor: {
        select: {
          name: true,
        },
      },
      CheckupMedicine: {
        include: {
          Medicine: {
            select: {
              brandName: true,
            },
          },
        },
      },
    },
  });

  if (!checkup) {
    throw new ExpressError("Prescription does not exist", 404);
  }

  const restructuredCheckup = {
    id: checkup?.id,
    patientName: checkup.Patient?.name,
    doctorName: checkup.Doctor?.name,
    staffName: checkup.Staff?.name,
    date: checkup.date.toISOString().split("T")[0],
    diagnosis: checkup?.diagnosis,
    symptoms: checkup?.symptoms,
    temperature: checkup?.temperature,
    bloodPressure: checkup?.bloodPressure,
    pulseRate: checkup?.pulseRate,
    spO2: checkup.spO2,
    checkupMedicines: checkup.CheckupMedicine.map((medicine) => ({
      id: medicine?.id,
      brandName: medicine.Medicine?.brandName,
      dosage: medicine?.dosage,
      frequency: medicine?.frequency,
    })),
  };
  console.log("restructuredCheckup : ", restructuredCheckup);
  return res.status(200).json({
    ok: true,
    data: restructuredCheckup,
    message: "Prescription Details retrieved successfully",
  });
};

// @desc    Get Checkup List
// route    GET /api/checkup
// @access  Private (Admin)

const getCheckupList = async (req, res, next) => {
  const checkupList = await prisma.checkup.findMany({
    include: {
      Patient: {
        select: {
          name: true,
        },
      },
      Staff: {
        select: {
          name: true,
        },
      },
      Doctor: {
        select: {
          name: true,
        },
      },
    },
  });

  // console.log("checkupList : ", checkupList);

  const restructuredCheckupList = checkupList.map((checkup) => ({
    id: checkup?.id,
    patientName: checkup.Patient?.name,
    doctorName: checkup.Doctor?.name,
    staffName: checkup.Staff?.name,
    date: checkup.date.toISOString().split("T")[0],
    diagnosis: checkup?.diagnosis,
    symptoms: checkup?.symptoms,
  }));

  return res.status(200).json({
    ok: true,
    data: restructuredCheckupList,
    message: "Prescription List retrieved successfully",
  });
};

// @desc    Create Checkup Records
// route    POST /api/checkup
// @access  Private (Admin)

const createCheckup = async (req, res, next) => {
  const {
    patientId,
    doctorId,
    staffEmail,
    date,
    diagnosis,
    symptoms,
    temperature,
    bloodPressure,
    pulseRate,
    spO2,
    checkupMedicines,
  } = req.body;
  console.log("req.body : ", req.body);
  const patient = await prisma.patient.findUnique({
    where: {
      id: patientId,
    },
  });
  if (!patient) {
    throw new ExpressError("Patient does not exist", 404);
  }
  if (doctorId) {
    const doctor = await prisma.staff.findUnique({
      where: {
        id: doctorId,
        role: "DOCTOR",
      },
    });

    if (!doctor) {
      throw new ExpressError("Doctor does not exist", 404);
    }
  }

  const staff = await prisma.staff.findUnique({
    where: {
      email: staffEmail,
    },
  });

  if (!staff) {
    throw new ExpressError("Logged in Staff does not exist", 404);
  }

  //handle validations on each medicine item in checkupMedicines
  for (const [idx, medicine] of checkupMedicines.entries()) {
    const medicineRecord = await prisma.medicine.findUnique({
      where: {
        id: medicine.medicineId,
      },
    });
    if (!medicineRecord) {
      throw new ExpressError(
        `Medicine with ID ${medicine.medicineId} does not exist in ITEM ${
          idx + 1
        }`,
        404
      );
    }
  }
  
  // for (const [idx, medicine] of checkupMedicines.entries()) {
  //   const medicineRecord = await prisma.medicine.findUnique({
  //     where: {
  //       id: medicine.medicineId,
  //     },
  //   });
  //   const updateStock = await prisma.stock.update({
  //     where: {
  //       medicineId: medicine.medicineId,
  //     },
  //     data: {
  //       outQuantity: {
  //         increment: parseInt(medicine.quantity),
  //       },
  //       stock: {
  //         decrement: parseInt(medicine.quantity),
  //       }
  //     },
  //   });
  //   if(!updateStock){
  //     throw new ExpressError(
  //       `Stock not updated for medicine ${medicineRecord.brandName} with ID ${medicine.medicineId} in ITEM ${
  //         idx + 1
  //       }`,
  //       404
  //     );
  //   }
  // }

  const createdCheckup = await prisma.checkup.create({
    data: {
      patientId,
      doctorId,
      staffId: staff.id,
      date: date + "T00:00:00Z",
      diagnosis,
      symptoms,
      temperature: parseFloat(temperature),
      bloodPressure,
      pulseRate: parseInt(pulseRate),
      spO2: parseFloat(spO2),
      CheckupMedicine: {
        create: checkupMedicines,
      },
    },
  });

  // console.log(createdCheckup);

  return res.status(200).json({
    ok: true,
    data: createdCheckup,
    message: "Prescription added successfully",
  });
};

// @desc    Delete Checkup Record
// route    DELETE /api/checkup
// @access  Private (Admin)
const deleteCheckup = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedRecords = await prisma.checkupMedicine.deleteMany({
      where: {
        checkupId: id,
      },
    });

    const deletedCheckup = await prisma.checkup.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      ok: true,
      data: deletedRecords,
      message: "Prescription Record deleted successfully",
    });
  } catch (err) {
    console.log(`Prescription List Deletion Error : ${err.message}`);

    let errMsg =
      "Deleting Prescription list record failed, Please try again later";
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
  getCheckupDetails,
  getCheckupList,
  createCheckup,
  deleteCheckup,
};
