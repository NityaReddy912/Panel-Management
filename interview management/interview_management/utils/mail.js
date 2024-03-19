const nodemailer = require("nodemailer");
function mailToCandidate(Email, Date, Time) {
  const transporter = nodemailer.createTransport({
    service: "Outlook",
    auth: {
      user: "dharshankumar.as@zensar.com",
      pass: "&#1Darshan15D",
    },
  });
  const mailBody =
    "Your Interview Has Been Scheduled" +
    "\n Date: " +
    Date +
    "\n Time: " +
    Time +
    "\n Teams Link: ";
  const mailOptions = {
    from: "dharshankumar.as@zensar.com",
    to: Email,
    text: mailBody,
    subject: "Interview Details",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

function mailToPanel(Email, Date, Time, name, feedbackId) {
  const transporter = nodemailer.createTransport({
    service: "Outlook",
    port: 587,
    secure: false,
    auth: {
      user: "dharshankumar.as@zensar.com",
      pass: "&#1Darshan15D",
    },
  });
  const mailBody =
    "Interview Schedule" +
    "\n Candidate Name: " +
    name +
    "\n Date: " +
    Date +
    "\n Time: " +
    Time +
    "\n Teams Link: " +
    "\n Feedback Form: " +
    "Click Here to Give Feedback " +
    `http://localhost:3001/edit-feedback/${feedbackId}`;
  const mailOptions = {
    from: "dharshankumar.as@zensar.com",
    to: Email,
    text: mailBody,
    subject: "Interview Details",
    // html:
    // '<p>Click <a href="http://localhost:3001/edit-feedback/90101">here</a> to Give Feedback</p>',
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = { mailToCandidate, mailToPanel };
