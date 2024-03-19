const User = require('../../models/User');
const sendCredentialstoMail = require('./Mail');
const passwordGenerator = require('./PasswordGenarator');
const hasher = require('../hash/hash');

async function addUser(request, response) {
    const User_ID = request.body.User_ID;
    const User_Name = request.body.User_Name;
    const Email = request.body.Email;
    const Roles = request.body.Roles;
    const Action = request.body.Action;
    try {
        const users = await User.find();
        //console.log(users);
        if (!User_ID || !User_Name || !Email || !Roles) {
            return response.status(404).json({ err: "Invalid Input" });
        }

        if (users.find((user) => user.User_ID === User_ID)) {
            return response.status(409).json({ err: "User already exists" });
        }

        const originalPassword = passwordGenerator.password;
        const userObject = new User({
            User_ID: request.body.User_ID,
            User_Name: request.body.User_Name,
            Email: request.body.Email,
            Roles: request.body.Roles,
            Action: request.body.Action,
            Password: hasher.encrpytPassword(originalPassword)
        });
        await userObject.save();
        response.status(200).json({
            message: "Successfully Added User Details",
            userObject
        })
        sendCredentialstoMail.sendCredentialstoMail(request.body.Email, request.body.User_ID, originalPassword);

        //return response.json(await User.find());
    } catch (err) {
        response.status(500).json({ err: err.message })
    }
}

async function getAllUsers(request, response) {
    try {
        const usersList = await User.find();
        //response.status(200).json(usersList);
        //return response.send(usersList);
        if (usersList === 0) {
            return response.status(404).json({ message: 'User details not found' });
        }
        response.status(200).json({ message: "Successfully Fetched the User", usersList });
    } catch (err) {
        response.status(500).json({ err: err.message })
    }
}


async function updateUser(request, response) {
    try {
        User.findOne({ User_ID: request.params.ID },
            function (err, result) {
                //if (err) throw err;
                if (!result) {
                    return response.status(404).json({ message: 'User with ' + request.params.ID + ' not found!' });
                }
                result.User_ID = request.params.ID,
                    result.User_Name = request.body.User_Name,
                    result.Email = request.body.Email,
                    result.Roles = request.body.Roles;
                result.Action = request.body.Action;

                Object.assign(result, request.body).save((err, result) => {
                    if (err) response.send(err);
                    response.status(200).json({ message: 'Sucessfully Updated User Details', result });
                });
            })
    } catch (err) {
        response.status(500).json({ message: err.message });
    }
}
async function getByID(request, response) {
    try {
        const usersList = await User.find({
            "User_ID": request.params.id
        });
        if (usersList === 0) {
            return response.status(404).json({ message: 'User details not found' });
        }
        response.status(200).json({ message: "Successfully Fetched the User", usersList });
    } catch (err) {
        response.status(500).json({ err: err.message })
    }
}

async function search(req, res, next) {
    try{
        let dbConstraint = {};
        const currentPage = req.params.page || 1;
        const perPage = 3;
        let totalItems=0;
        if (req.body.User_ID) {
            dbConstraint.User_ID = req.body.User_ID;
        }
        if (req.body.User_Name) {
            dbConstraint.User_Name = req.body.User_Name;
        }
        if (req.body.Email) {
            dbConstraint.Email = req.body.Email;
        }
        if (req.body.Roles) {
            dbConstraint.Roles = req.body.Roles;
        }
        if (req.body.Action != null) {
            dbConstraint.Action = req.body.Action;
        }
        console.log(dbConstraint);
        totalItems = await User.find({ ...dbConstraint }).countDocuments();
        let user=await User.find({ ...dbConstraint }).skip((currentPage - 1) * perPage).limit(perPage);
        // console.log(user);
        if (user.length === 0) {
            return res.status(404).json({ message: 'User details not found' , totalItems:0});
        }
        res.status(200).json({ message: "Successfully Fetched the User", user: user, totalItems: totalItems });
    }
    catch(err){
        res.status(500).json({ err: err.message });
    }
}

async function updateIsActive(request,response){
    try {
        User.findOne({ User_ID: request.params.ID },
            function (err, result) {
                if (!result) {
                    return response.status(404).json({ message: 'User with ' + request.params.ID + ' not found!' });
                }
                result.User_ID = request.params.ID,
                    result.User_Name = result.User_Name,
                    result.Email = result.Email,
                    result.Roles = result.Roles;
                    result.Action = !result.Action;
                Object.assign(result, request.body).save((err, res) => {
                    if (err) response.send(err);
                    response.status(200).json({ message: 'Sucessfully Updated User Details', res });
                });
            })
    } catch (err) {
        response.status(500).json({ message: err.message });
    }
}

module.exports = { addUser, getAllUsers, updateUser, getByID, search, updateIsActive };