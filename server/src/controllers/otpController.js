const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const sendMail = require("../utils/sendMail.js");
const generateOtp = require("../utils/generateOtp.js");
const ExpressError = require("../utils/ExpressError.js");
const { OTP_MAIL_TEMPLATE } = require('../../constants.js');

const sendOtp = async (req, res, next) => {
    const { email, action, role } = req.body;

    if (!email) {
        const error = new ExpressError("Email is required", 400);
        next(error)
        return;
    }

    const userExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (action === "SIGNUP" && userExists) {
        const error = new ExpressError("User already exists, Please Login", 409);
        next(error);
        return ;
    } 

    if (action === "LOGIN" && !userExists) {
        const error = new ExpressError("User does not exists, Please Signup", 404);
        next(error);
        return ;
    }

    if (action === "LOGIN" && userExists.role !== role) {
        const error = new ExpressError("Role does not match", 401);
        next(error);
        return ;
    }

    const { otp, expiry } = generateOtp();

    //setting up otp details in the verification model 
    const otpDetail = await prisma.verification.upsert({
        where: {
            email
        },
        update: {
            otp: otp,
            expiryTime: expiry
        },
        create: {
            email: email,
            otp: otp,
            expiryTime: expiry
        }
    });

    if (!otpDetail) {
        const error = new ExpressError("Error in sending OTP, Please try again later", 500);
        next(error);
        return ;
    }

    const mailTemplate = OTP_MAIL_TEMPLATE(otp);
    const mailOptions = {
        from: "dep2024.p06@gmail.com",
        to: email,
        subject: "Mediease - Signup",
        html: mailTemplate,
        text: ""
    };

    const info = await sendMail(mailOptions);
    if (info) {
        return res.status(200).json({
            ok: true,
            message: "OTP sent successfully",
            data: {
                email: email
            }
        });
    } else {
        const error = new ExpressError("OTP sending failed", 500);
        next(error);
    }
};



const verifyOtp = async (req, res, next) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        const error = new ExpressError("Email and OTP are required", 400);
        next(error);
        return ;
    }
    
    const otpInfo = await prisma.verification.findUnique({
        where: {
            email
        }
    });

    console.log("otpInfo : ", otpInfo)

    if (!otpInfo) {
        const error = new ExpressError("No OTP found. Please try again later", 404);
        next(error);
        return ;
    }
    
    const now = new Date();
    if (otpInfo.expiryTime < now) {
        const error = new ExpressError("OTP expired, Please try again", 400);
        next(error);
        return ;
    }

    if (otpInfo.otp !== otp) {
        const error = new ExpressError("OTP invalid.", 401);
        next(error);
        return ;
    }

    //deleting the verification record for the user email
    const deletedPrisma = await prisma.verification.delete({
        where: {
            email
        }
    });

    return res.status(200).json({
        ok: true,
        message: "OTP verified successfully",
        data: {
            email
        }
    });
};

module.exports = { sendOtp, verifyOtp };