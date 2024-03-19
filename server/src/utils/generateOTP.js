const { OTP_EXPIRY_TIME } = require("../../constants.js");

const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date();

    expiry.setMinutes(expiry.getMinutes() + OTP_EXPIRY_TIME);
    return { otp, expiry };
};

module.exports = generateOtp;