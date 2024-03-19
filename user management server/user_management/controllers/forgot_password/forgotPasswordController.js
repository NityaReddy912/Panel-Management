const User = require('../../models/User');
const mailTo = require('./mailer');

function forgotPassword(req,res,next){
    console.log(req.body);
    User.find({name: req.body.name, email: req.body.email}, (err,result)=>{
        if(err){
            res.status(500).send({err:'Server error'});
            return ;
        }
        if(result.length < 1){
            res.status(404).send({err: 'User not found'});
        }
        else{
            mailTo(req.body.email);
            res.status(200).send({msg : 'Reset Link sent to mail'});
        }
        return next();
    });
}

module.exports = forgotPassword;