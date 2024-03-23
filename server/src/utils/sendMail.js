const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
  tls: {
    ciphers: "SSLv3",
  }
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

    console.log("to = ", to);
    console.log("from = ", from);

    console.log("Email message sent: %s", info.messageId);
    return info;
  } catch (err) {
    console.log(`ERROR (send-email): ${err}`);
    return null;
  }
};

module.exports = sendMail;