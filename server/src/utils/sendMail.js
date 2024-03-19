const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const sendMail = async({ from, to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });

    console.log("Email message sent: %s", info.messageId);
    return info;
  } catch (err) {
    console.log(`ERROR (send-email): ${err}`);
    return null;
  }
};

module.exports = sendMail;