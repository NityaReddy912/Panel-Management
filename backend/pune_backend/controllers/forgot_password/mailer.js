var nodemailer = require('nodemailer');

function mailTo(Email){
    var transporter = nodemailer.createTransport({
      service: 'Outlook',
      auth: {
        user: 'likith.sarapu@outlook.com',
        pass: 'Likith@2001'
      }
    });
    
    var mailOptions = {
      from: 'likith.sarapu@outlook.com',
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
