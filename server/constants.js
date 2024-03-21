const OTP_EXPIRY_TIME = 10; 
const OTP_MAIL_TEMPLATE = (otp) => {
    return `<h2>Hi!</h2><h1>Welcome to <span style="color:blue;">Mediease</span>.</h1><p>Your OTP is: <strong>${otp}</strong>.</p><p>Please use this OTP to verify your email address.</p><p>The OTP is valid for <strong>10 minutes</strong>.<br></p>Regards,<h4>DEP_P06_2024</h4>`
};

module.exports = {
    OTP_EXPIRY_TIME,
    OTP_MAIL_TEMPLATE
}