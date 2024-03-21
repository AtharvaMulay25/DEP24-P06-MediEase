const OTP_EXPIRY_TIME = 10; 
const OTP_MAIL_TEMPLATE = (otp) => {
    return `<h2>Hi!</h2><h1>Welcome to <span style="color:blue;">Mediease</span>.</h1><p>Your OTP is: <strong>${otp}</strong>.</p><p>Please use this OTP to verify your email address.</p><p>The OTP is valid for <strong>10 minutes</strong>.<br></p>Regards,<h4>DEP_P06_2024</h4>`
};
const PENDING_MAIL_TEMPLATE_USER = () => {
    return `<h1>Welcome to <span style="color:blue;">Mediease</span>.</h1><p>Your information has been sent for verification to the administration.</p>`
}
const PENDING_MAIL_TEMPLATE_ADMIN = (email, name, role) => {
    return `<h1><span style="color:blue;">Mediease</span></h1><p> User ${name} with ID ${email} has requested approval for ${role}. Check at ${process.env.CLIENT_URL}/requests </p>`
}
const APPROVED_MAIL_TEMPLATE = (role) => {
    return `<h1>Welcome to <span style="color:blue;">Mediease</span>.</h1><p>You are approved for your designated role ${role}. Complete your profile now!</p>`
}
const REJECTED_MAIL_TEMPLATE = (role) => {
    return `<h1>Welcome to <span style="color:blue;">Mediease</span>.</h1><p>You are rejected from your applied role ${role}.</p>`
}
module.exports = {
    OTP_EXPIRY_TIME,
    OTP_MAIL_TEMPLATE
}