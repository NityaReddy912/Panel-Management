const User = require('../../models/User');
const sendCredentialstoMail = require('./Mail');
const passwordGenerator = require('./PasswordGenarator');
// const { db } = require('../Models/User_Model');

async function addUser(request, response) {
    const User_ID = request.body.User_ID;
    const User_Name = request.body.User_Name;
    const Email = request.body.Email;
    const Roles = request.body.Roles;
    const Action = request.body.Action;
    try {
        const users = await User.find();
        if (!User_ID || !User_Name || !Email || !Roles || !Action) {
            return response.status(404).json({ err: "Invalid Input" });
        }

        if (users.find((user) => user.User_ID === User_ID)) {
            return response.status(404).json({ err: "User already exists" });
        }
        const userObject = new User({
            User_ID: request.body.User_ID,
            User_Name: request.body.User_Name,
            Email: request.body.Email,
            Roles: request.body.Roles,
            Action: request.body.Action,
            Password: passwordGenerator.password
        });
        await userObject.save();
        response.status(200).json(userObject);
        sendCredentialstoMail.sendCredentialstoMail(request.body.Email, request.body.User_ID, userObject.Password);

        //return response.json(await User.find());
    } catch (err) {
        response.status(500).json({ err: err.message })
    }
}

async function getAllUsers(request, response) {
    try {
        const usersList = await User.find();
        response.status(200).json(usersList);
        //return response.send(usersList);
    } catch (err) {
        response.status(500).json({ err: err.message })
    }
}


async function updateUser(request, response) {
    try {
        console.log(request.params);

        User.findOne({ User_ID: request.params.ID },
            function (err, result) {
                //if (err) throw err;
                if (!result) {
                    // response.json({
                    //     message: 'User with ' + request.params.ID + ' not found!'
                    // })
                    return response.status(404).json({ message: 'User with ' + request.params.ID + ' not found!' });
                }
                    result.User_ID = request.params.ID,
                    result.User_Name = request.body.User_Name,
                    result.Email = request.body.Email,
                    result.Roles = request.body.Roles;
                    result.Action = request.body.Action;

                result.save();
                response.status(200).json({
                    message: "Sucessfully Updated User Details",
                    result
                })
            })
    } catch (err) {
        response.status(500).json({ message: err.message });
    }
    // const UserID= request.params.User_ID;
    // const update_User_Name= request.body.User_Name;
    // const update_Email= request.body.Email;
    // const update_Roles= request.body.Roles;
    // const update_Action= request.body.Action;
    // try{
    //     const updateUser=await User.findOne({
    //         "User_ID":UserID
    //     });
    //     updateUser.User_ID=UserID;
    //     updateUser.User_Name=update_User_Name;
    //     updateUser.Email=update_Email;
    //     updateUser.Roles=update_Roles;
    //     updateUser.Action=update_Action;
    //     updateUser.save();
    //     response.status(200).json({message:"Successfully Updated the User",updateUser});
    // }
    // catch(err){
    //     response.status(500).json({message:err.message});
    // }
}
function getByID(request,response){
    User.find({
        "User_ID": request.params.id
    },
        function (err, result) {
            if (err) { console.log(err); }
            console.log(result);
            response.json(result);
        });
}

function search(req,res,next){
    let dbConstraint = {};
    const currentPage = req.body.page || 1;
    const perPage = 3;

    if(req.body.User_ID){
        dbConstraint.User_ID = req.body.User_ID;
    }
    if(req.body.User_Name){
        dbConstraint.User_Name = req.body.User_Name;
    }
    if(req.body.Email){
        dbConstraint.Email = req.body.Email;
    }
    if(req.body.Roles){
        dbConstraint.Roles = req.body.Roles;
    }
    if(req.body.Action){
        dbConstraint.Action = req.body.Action;
    }
    console.log(dbConstraint);
    User.find({...dbConstraint}, (err,result)=>{
        console.log(result);
        res.json(result);
    }).skip((currentPage - 1) * perPage).limit(perPage);
}

module.exports = { addUser, getAllUsers, updateUser,getByID,  search };