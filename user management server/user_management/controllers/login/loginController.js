const User = require("../../models/User");
const User_Roles = require("../../models/user_roles");
const Roles = require("../../models/roles");
const jwt = require("jsonwebtoken");
const hasher = require("../hash/hash");

async function login(req, res, next) {
  console.log(req.body);
  const email_regex = new RegExp(
    "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
  );
  var dbConstraint = {};
  if (
    req.body.password.length > 0 &&
    req.body.name.length > 0
  ) {
    if (email_regex.test(req.body.name)) {
      dbConstraint.email = req.body.name;
    } else {
      dbConstraint.user_id = req.body.name;
    }

    let roleid;

    User.find({ ...dbConstraint }, (error, result) => {
      if (result.length > 0) {
        // console.log(result);
        if (error) {
          res.status(500).send({ err: "Error from DB" });
          return next();
        }
        if (result[0].is_active) {
          if (
            hasher.checkPassword(
              req.body.password,
              result[0].password,
            )
          ) {
            User_Roles.find(
              { user_id: result[0].user_id },
              function (err, data) {
                roleid = data[0].role_id;
                console.log(result[0]);

                const token = jwt.sign(
                  {
                    user_id: result[0].user_id,
                    email: result[0].email,
                    role_id: roleid,
                    name: result[0].name,
                  },
                  "panel_management",
                  {
                    expiresIn: 60 * 60,
                  },
                );
                result[0].Token = token;
                result[0].save();
                User_Roles.find(
                  {
                    user_id: result[0].user_id,
                  },
                  function (err, data) {
                    roleid = result[0].role_id;
                    res.status(200).send({
                      msg: "Login successful !",
                      user: {
                        name: result[0].name,
                        user_id: result[0].user_id,
                        role_id: data[0].role_id,
                      },
                      token,
                    });
                    return next();
                  },
                );
              },
            );
          } else {
            res
              .status(401)
              .send({ err: "Incorrect Credentials" });
            return next();
          }
        } else {
          res.status(403).send({ err: "User is Inactive" });
          return next();
        }
      } else {
        res.status(404).send({ err: "User not Found" });
      }
    });
  } else {
    res.status(401).send({ err: "Invalid Credentials" });
    return next();
  }
}

module.exports = { login };
