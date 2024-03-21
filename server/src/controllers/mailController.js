const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const sendMail = require("../utils/sendMail.js");
const ExpressError = require("../utils/ExpressError.js");
const { OTP_MAIL_TEMPLATE } = require("../../constants.js");

const sendMailController = async (req, res, next) => {
    const {name, email, role, action} = req.body;

    const mailTemplate = OTP_MAIL_TEMPLATE(name, role, action);

    if(action === "APPROVED")
    {
        
    }
    else if(action == "REJECTED")
    {

    }
    else if(action == "PENDING")
    {
    }

};

module.exports = {sendMailController};