const OTP_EXPIRY_TIME = 10;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173"; // Set a default value if CLIENT_URL is not defined
const OTP_MAIL_TEMPLATE = (otp) => {
  return `<h2>Hi!</h2><h1>Welcome to <span style="color:blue;">Mediease</span>.</h1><p>Your OTP is: <strong>${otp}</strong>.</p><p>Please use this OTP to verify your email address.</p><p>The OTP is valid for <strong>10 minutes</strong>.<br></p>Regards,<h4>DEP_P06_2024</h4>`;
};
const PENDING_MAIL_TEMPLATE_USER = () => {
  return `<h2>Hello <span style="color:blue;">Mediease</span> User,</h2><p>Your information has been sent for verification to the administration.</p><p>You will be notified once your role is verified.</p><br></p>Regards,<h4>DEP_P06_2024</h4>`;
};
const PENDING_MAIL_TEMPLATE_ADMIN = (email, name, role) => {
  return `<h1><span style="color:blue;">Mediease</span></h1><p> User <b>${name}</b> with ID  <b>${email}</b> has requested approval for <b>${role}</b>. Check at <b><a href="${CLIENT_URL}/requests">${CLIENT_URL}/requests</a></b> </p><br></p>Regards,<h4>DEP_P06_2024</h4>`;
};
const APPROVED_MAIL_TEMPLATE = (role) => {
  return `<h2>Hello <span style="color:blue;">Mediease</span> User,</h2><p>You are <b>approved</b> for your designated role <b>${role}</b>. Complete your profile now!</p><br></p>Regards,<h4>DEP_P06_2024</h4>`;
};
const REJECTED_MAIL_TEMPLATE = (role) => {
  return `<h2>Hello <span style="color:blue;">Mediease</span> User,</h2><p>You are <b>rejected</b> from your applied role <b>${role}</b>.</p><br></p>Regards,<h4>DEP_P06_2024</h4>`;
};

const ACCOUNT_CREATED_MAIL_TEMPLATE = () => {
  return `<h2>Hello <span style="color:blue;">Mediease</span> User,</h2><p>Your account has been created successfully on Mediease.</p><p>Login at <b><a href="${CLIENT_URL}/signin">${CLIENT_URL}/signin</a></b></p><br></p>Regards,<h4>DEP_P06_2024</h4>`;
};

const ACCOUNT_DELETED_MAIL_TEMPLATE = () => {
  return `<h2>Hello <span style="color:blue;">Mediease</span> User,</h2><p>Your account has been deleted by MediEase Admin.</p><br></p>Regards,<h4>DEP_P06_2024</h4>`;
};
const FEEDBACK_SUBMIT_TEMPLATE = (name, email, role, subject, message) => {
  return `<h2>Hello <span style="color:blue;">Mediease</span> ADMIN,</h2><p>The following user ${name} (${email}) with role <b>${role}</b> has send the following feedback.<br><h2>Subject: ${subject}</h2>Message: ${message}`;
};
module.exports = {
  OTP_EXPIRY_TIME,
  OTP_MAIL_TEMPLATE,
  PENDING_MAIL_TEMPLATE_USER,
  PENDING_MAIL_TEMPLATE_ADMIN,
  APPROVED_MAIL_TEMPLATE,
  REJECTED_MAIL_TEMPLATE,
  ACCOUNT_CREATED_MAIL_TEMPLATE,
  ACCOUNT_DELETED_MAIL_TEMPLATE,
  FEEDBACK_SUBMIT_TEMPLATE,
};
