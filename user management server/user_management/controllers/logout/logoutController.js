const User = require('../../models/User');

function logout(req,res,next){
    User.find({user_id:req.body.user_id}, (err, result)=>{
        console.log(result[0]);
        result[0].Token = "";
        result[0].save((err, result)=>{
            if(err){
                return res.status(500).send({err: "error from server"});
            }
            res.status(200).send({msg: "logged out seccessfully"});
        });
    })
}

module.exports = logout;