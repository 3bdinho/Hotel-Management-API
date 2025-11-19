const nodeMailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

exports.sendMail = async (options) => {
  try {
    //1-Create transporter
    const transporter = nodeMailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD,
      },
    });

    //2-Email options
    const mailOptions = {
      from: "Hotel-system <progahmedelsayed@gmail.com>",
      to: options.email,
      subject: options.subject,
      html: options.html,
    };

    //3-Send mailOptions
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (err) {
    console.error("Email sending error:", err.message);
    throw new Error("Failed to send email");
  }
};
