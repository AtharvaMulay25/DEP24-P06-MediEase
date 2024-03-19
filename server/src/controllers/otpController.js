const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const sendMail = require("../utils/sendMail.js");
const generateOtp = require("../utils/generateOtp.js");
const ExpressError = require("../utils/ExpressError.js");

const sendOtp = async (req, res, next) => {
    const { email, action } = req.body;

    if (!email) {
        const error = new ExpressError("Email is required", 400);
        next(error)
        return;
    }

    if (action === "SIGNUP") {
        const userExists = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (userExists) {
            const error = new ExpressError("User already exists", 400);
            next(error);
            return;
        }
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

    const mailOptions = {
        from: "dep2024.p06@gmail.com",
        to: email,
        subject: "Mediease - Signup",
        html: `<h2>Hi!</h2>\n<h1>Welcome to <span style="color:blue;">Mediease</span>.</h1>\nYour OTP is: <strong>${otp}</strong>. Please use this OTP to verify your email address. The OTP is valid for <strong>10 minutes</strong>.<h4>Regards,\nDEP_P06_2024</h4>`,
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