var nodemailer = require("nodemailer");

function sendCredentialstoMail(Email, User_ID, Password) {
  var transporter = nodemailer.createTransport({
    service: "Outlook",
    auth: {
      user: "g.sugurpatinti@zensar.com",
      pass: "Pasword@987654321",
    },
  });
  var mailOptions = {
    from: "g.sugurpatinti@zensar.com",
    to: Email,
    text:
      "Your account has been created successfully for Panel Management." +
      "\nYour User ID : " +
      User_ID +
      "\nYour Email : " +
      Email +
      "\nYour Password : " +
      Password +
      "\nPlease login using these credentials." +
      "\nYou can change your password once after logging in." +
      "\n" +
      "http://localhost:3000/",
    subject: "Login Credentials For Panel Management",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = { sendCredentialstoMail };
