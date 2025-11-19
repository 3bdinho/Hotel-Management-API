// const nodeMailer = require("nodemailer");

// exports.sendMail = async (options) => {
//   try {
//     //1-Create transporter
//     const transporter = nodeMailer.createTransport({
//       host: "sandbox.smtp.mailtrap.io", //process.env.MAIL_HOST,
//       port: 2525, //process.env.MAIL_PORT,
//       secure: false, //process.env.MAIL_PORT === 465,
//       auth: {
//         user: "0b183ab12d6502", //process.env.USERNAME,
//         pass: "7042a84ee44002", //process.env.PASSWORD,
//       },
//     });

//     //2-Email options
//     const mailOptions = {
//       from: "Hotel-system <0b183ab12d6502@inbox.mailtrap.io>",
//       to: "receiver@mailtrap.io", //options.to,
//       subject: "Booking Test", //options.subject,
//       html: "<p>This is a test email</p>", //options.html,
//     };

//     //3-Send mailOptions
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully!", info);
//   } catch (err) {
//     console.error("Email sending error:", err.message);
//   }
// };

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
