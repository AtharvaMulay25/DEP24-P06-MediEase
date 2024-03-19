const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const sendMail = require("../utils/sendMail.js");
const generateOtp = require("../utils/generateOtp.js");
const ExpressError = require("../utils/ExpressError.js");

const sendOtp = async(req, res, next) => {
    const { email } = req.body;

    if (!email) {
        const error = new ExpressError("Email is required", 400);
        next(error)
    }

    const { otp, expiry } = generateOtp();
    
    //setting up the otp in the user record
    const user = await prisma.user.update({
        where: {
            email: email
        },
        data: {
            otp,
            expiry
        }
    });

    const mailOptions = {
        from: "dep2024.p06@gmail.com",
        to: email,
        subject: "Mediease - Signup",
        text: `Hi!\nWelcome to Mediease.\nYour OTP is: ${otp}. Please use this OTP to verify your email address. The OTP is valid for 10 minutes.\n\nRegards,\nDEP_P06_2024`,
        html: ""
    };

    const info = sendMail(mailOptions);
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
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (!user) {
        const error = new ExpressError("User not found", 404);
        next(error); 
    }

    const now = new Date();
    if (user.expiry < now) {
        const error = new ExpressError("OTP expired", 401);
        next(error);
    };

    if (user.otp !== otp) {
        const error = new ExpressError("Invalid OTP", 401);
        next(error);
    }

    return res.status(200).json({ 
        ok: true,
        message: "OTP verified successfully",
        data: {
            email: user.email
        } 
    });
};

module.exports = { setOtp, verifyOtp };