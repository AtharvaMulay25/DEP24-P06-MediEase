const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const sendMail = require("../utils/sendMail.js");
const generateOtp = require("../utils/generateOtp.js");
const ExpressError = require("../utils/ExpressError.js");

//email to otp map 
const otpEmailMap = new Map();

const sendOtp = async (req, res, next) => {
    const { email, action } = req.body;

    if (!email) {
        const error = new ExpressError("Email is required", 400);
        next(error)
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
        }
    }

    const { otp, expiry } = generateOtp();

    otpEmailMap.set(email, { otp, expiry });

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

module.exports = { sendOtp, verifyOtp };