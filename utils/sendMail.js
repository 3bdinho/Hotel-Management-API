const nodeMailer = require("nodemailer");

exports.sendEmail = async (options) => {
  try {
    //1-Create email transporter

    const transporter = nodeMailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: process.env.MAIL_PORT == 465, // true لو 465
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    //2-Define mail options
    const mailOptions = {
      from: `"Hotel App" <Hotel@business.com>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    //3-Email sending
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!", info.messageId);
  } catch (err) {
    console.error("Email sending error:", err);
  }
};
