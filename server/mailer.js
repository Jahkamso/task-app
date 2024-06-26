const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jahkamsog@gmail.com",
    pass: "iwsekviroapvfmpa", // Make sure this is an application-specific password
  },
});

function sendMagicLinkEmail({email, token}) {
  const mailOptions = {
    from: "jahkamsog@gmail.com",
    to: email,
    subject: "Magic Link email test",
    text: "That was easy!",
    html: `<button style="background-color: black; border-radius: 20px; font-weight: bold;"><a style="color: white; text-decoration: none" href="http://localhost:3001/verify?token=${token}">Login</a></button>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = {
  sendMagicLinkEmail,
};

// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "gmail",
//   port: 587,
//   secure: false, // Use `true` for port 465, `false` for all other ports
//   auth: {
//     user: "jahkamsog@gmail.com",
//     pass: "iwsekviroapvfmpa",
//   },
// });

// async function sendMagicLinkEmail({ email, token }) {
//   try {
//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: "Jahkamsog@gmail.com", // sender address
//     to: email, // list of receivers
//     subject: "Magic Link Verify Email", // Subject line
//     text: "This is a test for the magic link email", // plain text body
//     html: `<a href="http://localhost:3001/verify?token=${token}">Click here to verify</a>`, // html body
//   });

//   console.log("Message sent: %s", info.messageId);
// } catch(error) {
//     console.error()
// }
//   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }

// module.exports = {
//     sendMagicLinkEmail,
// };
