const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const hasher = require('../hash/hash');

function login(req,res,next){
    console.log(req.body);
    const email_regex = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
    var dbConstraint = {};
    if(req.body.Password.length > 0 && req.body.User_Name.length>0){
        if(email_regex.test(req.body.User_Name)){
            dbConstraint.Email = req.body.User_Name;
        }
        else{
            dbConstraint.User_ID = req.body.User_Name;
        }
        User.find({...dbConstraint} , (error, result)=>{
            if(result.length > 0){
                // console.log(result);
                if(error){
                    res.status(500).send({err:'Error from DB'});
                    return next();
                }
                if(result[0].Action)
                {    if(hasher.checkPassword(req.body.Password  , result[0].Password )){
                        const token = jwt.sign(
                            {User_Id: result[0].User_Id, Email:result[0].Email},
                            "panel_management",
                        );
                        res.status(200).send({msg:'Login successful !', user:{User_Name:result[0].User_Name, User_ID:result[0].User_ID, Roles:result[0].Roles} , token});
                        return next();
                    }
                    else{
                        res.status(401).send({err:'Incorrect Credentials'});
                        return next();
                    }
                }
                else{
                    res.status(403).send({err: 'User is Inactive'});
                    return next();
                }
            }
            else{
                res.status(404).send({err:'User not Found'});
            }
        });
    }
    else{

        res.status(401).send({err:'Invalid Credentials'});
        return next();
    }
}

module.exports = {login};