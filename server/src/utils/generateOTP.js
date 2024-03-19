const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date();

    expiry.setMinutes(expiry.getMinutes() + 10);
    return { otp, expiry };
};

module.exports = generateOtp;