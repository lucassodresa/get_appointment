require('dotenv').config();
const nodemailer = require('nodemailer');
const { isArray } = require('./types');

const { SMTP_HOST, SMTP_PORT, SMTP_EMAIL, SMTP_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASSWORD
  }
});

const sendMail = async (to, subject, message) => {
  try {
    const mailOptions = {
      from: `"GetAppointment" <${SMTP_EMAIL}>`,
      to: isArray(to) ? to.join(',') : to,
      subject: subject,
      html: message
    };
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`Error: ${err}`);
  }
};

module.exports = { sendMail };
