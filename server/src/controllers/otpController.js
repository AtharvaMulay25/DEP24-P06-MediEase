const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const sendMail = require("../utils/sendMail.js");
const generateOtp = require("../utils/generateOtp.js");
const ExpressError = require("../utils/ExpressError.js");
const { OTP_MAIL_TEMPLATE } = require("../../constants.js");

const sendOtp = async (req, res, next) => {
  const { email, action, role } = req.body;

  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (action === "SIGNUP" && userExists) {
    throw new ExpressError("User already exists, Please Login", 409);
  }

  if (action === "LOGIN" && !userExists) {
    throw new ExpressError("User does not exists, Please Signup", 404);
  }

  if (action === "LOGIN" && userExists.role !== role) {
    throw new ExpressError("Role does not match", 401);
  }

  const { otp, expiry } = generateOtp();

  //setting up otp details in the verification model
  const otpDetail = await prisma.verification.upsert({
    where: {
      email,
    },
    update: {
      otp: otp,
      expiryTime: expiry,
    },
    create: {
      email: email,
      otp: otp,
      expiryTime: expiry,
    },
  });

  if (!otpDetail) {
    throw new ExpressError("Error in sending OTP, Please try again later", 500);
  }

  const mailTemplate = OTP_MAIL_TEMPLATE(otp);
  const mailOptions = {
    from: "dep2024.p06@gmail.com",
    to: email,
    subject: "Mediease - Signup",
    html: mailTemplate,
    text: "",
  };

  const info = await sendMail(mailOptions);
  if (info) {
    return res.status(200).json({
      ok: true,
      message: "OTP sent successfully",
      data: {
        email: email,
      },
    });
  } else {
    throw new ExpressError("OTP sending failed", 500);
  }
};

const verifyOtp = async (req, res, next) => {
  const { email, otp } = req.body;

  const otpInfo = await prisma.verification.findUnique({
    where: {
      email,
    },
  });

  console.log("otpInfo : ", otpInfo);

  if (!otpInfo) {
    throw new ExpressError("No OTP found. Please try again later", 404);
  }

  const now = new Date();
  if (otpInfo.expiryTime < now) {
    throw new ExpressError("OTP expired, Please try again", 400);
  }

  if (otpInfo.otp !== otp) {
    throw new ExpressError("OTP invalid.", 401);
  }

  //deleting the verification record for the user email
  const deletedPrisma = await prisma.verification.delete({
    where: {
      email,
    },
  });

  return res.status(200).json({
    ok: true,
    message: "OTP verified successfully",
    data: {
      email,
    },
  });
};

module.exports = { sendOtp, verifyOtp };
