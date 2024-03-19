const User = require('../../models/User.js');

const resetpassword = (req, res, next) => {
    // Find the user by their email address
    User.find({ Email: req.body.Email}, (error, user) => {
        if (error) {
            res.status(500).send({ err: 'Error finding user' });
            return next();
        }

        if (!user) {
            res.status(404).send({ err: 'User not found' });
            return next();
        }

        // Update the user's password
        user[0].Password = req.body.Password;

        user[0].save((er, result) => {
            if (er) {
                res.status(500).send({ err: 'Error resetting password' });
                return next();
            }
            else{
                res.status(201).send({ msg: 'Password reset successfully', data: result });
                return next();
            }
        });
    });
};


module.exports = resetpassword;