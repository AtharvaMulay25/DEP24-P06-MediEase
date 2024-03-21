const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");
const ExpressError = require("../utils/ExpressError");

// @desc    Get Schedule List
// route    GET /api/schedule
// @access  Private (Admin)
const getScheduleList = async (req, res, next) => {
  try {
    const scheduleList = await prisma.schedule.findMany({});
    // console.log(scheduleList);

    return res.status(200).json({
      ok: true,
      data: scheduleList,
      message: "Schedule List retrieved successfully",
    });
  } catch (err) {
    console.log(`Schedule List Fetching Error : ${err.message}`);

    return res.status(500).json({
      ok: false,
      data: [],
      message: "Fetching Schedule List failed, Please try again later",
    });
  }
};

// @desc    Create Schedule Records
// route    POST /api/schedule
// @access  Private (Admin)
const createSchedule = async (req, res, next) => {
  try {
    console.log(req.body);
    const { staffId, day, shift } = req.body;
    const createdRecord = await prisma.schedule.create({
      data: {
        staffId,
        day,
        shift,
      },
    });

    // console.log(createdRecord);

    return res.status(200).json({
      ok: true,
      data: createdRecord,
      message: "Schedule record created successfully",
    });
  } catch (err) {
    console.log(`Schedule Creating Error : ${err.message}`);

    return res.status(500).json({
      ok: false,
      data: [],
      message: `Creating Schedule record failed, Please try again later`,
    });
  }
};

// @desc    Update Schedule List Record
// route    PUT /api/schedule
// @access  Private (Admin)
const updateSchedule = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedRecord = await prisma.schedule.update({
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
      message: "Schedule List record updated successfully",
    });
  } catch (err) {
    console.log(`Schedule List Updating Error : ${err.message}`);

    const errMsg =
      "Updating schedule list record failed, Please try again later";
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

// @desc    Delete Schedule List Record
// route    DELETE /api/schedule
// @access  Private (Admin)
const deleteSchedule = async (req, res, next) => {
  try {
    // console.log("req.body : ", req.body);
    const { id } = req.params;

    const deletedRecord = await prisma.schedule.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      ok: true,
      data: deletedRecord,
      message: "Schedule List Record deleted successfully",
    });
  } catch (err) {
    console.log(`Schedule List Deletion Error : ${err.message}`);

    const errMsg =
      "Deleting schedule list record failed, Please try again later";
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
  getScheduleList,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
