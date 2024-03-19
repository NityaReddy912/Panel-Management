var nodemailer = require('nodemailer');

function mailTo(Email){
    var transporter = nodemailer.createTransport({
      service: 'Outlook',
      auth: {
        user: 'g.sugurpatinti@zensar.com',
        pass: 'Pasword@987654321'
      }
    });
    
    var mailOptions = {
      from: 'g.sugurpatinti@zensar.com',
      to: Email,
      subject: 'Password Reset',
      html:'<p><a href=\'http://127.0.0.1:3000/reset\'>Click here</a> to reset your password.</p>'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}

module.exports = mailTo;
