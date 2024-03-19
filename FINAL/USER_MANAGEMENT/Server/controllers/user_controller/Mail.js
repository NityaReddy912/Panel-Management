var nodemailer = require('nodemailer');

function sendCredentialstoMail(Email,User_ID,Password) {
  var transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
      user: 'g.sugurpatinti@zensar.com',
      pass: 'Login@123456789'
    }
  });
  var mailOptions = {
    from: 'g.sugurpatinti@zensar.com',
    to: Email,
    text: 'User ID : '+User_ID+'\n Email : '+Email+'\n Password : '+Password,
    subject: 'Sample Mail'
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports={sendCredentialstoMail}