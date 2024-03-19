const User = require("../../models/User");
const Roles = require("../../models/roles");
const User_Roles = require("../../models/user_roles");
const sendCredentialstoMail = require("./Mail");
const passwordGenerator = require("./PasswordGenarator");
const hasher = require("../hash/hash");
const validator = require("validator");
const activemail = require("../user_controller/ActiveMail");
const { response } = require("../../app");
async function addUser(request, response) {
  const User_ID = request.body.user_id;
  const User_Name = request.body.name;
  const Email = request.body.email;
  try {
    const users = await User.find();
    if (!User_ID || !User_Name || !Email) {
      return response
        .status(404)
        .json({ err: "Invalid Input" });
    }

    if (users.find((user) => user.user_id === User_ID)) {
      return response

        .status(401)

        .json({ err: "User ID already exists" });
    }

    if (users.find((user) => user.name === User_Name)) {
      return response

        .status(402)

        .json({ err: "User Name already exists" });
    }

    if (users.find((user) => user.email === Email)) {
      return response

        .status(403)

        .json({ err: "User Email already exists" });
    }

    const originalPassword = passwordGenerator.password;
    const userObject = new User({
      user_id: request.body.user_id,
      name: request.body.name,
      email: request.body.email,
      is_active: request.body.is_active,
      password: hasher.encrpytPassword(originalPassword),
      created_by: request.body.created_by,
      created_on: new Date(),
    });
    await userObject.save();
    const user_rolesObject = new User_Roles({
      user_id: request.body.user_id,
      role_id: request.body.role_id,
      is_active: request.body.is_active,
      created_by: request.body.created_by,
      created_on: new Date(),
    });
    await user_rolesObject.save();
    response.status(200).json({
      message: "Successfully Added User Details",
      userObject,
    });
    if (request.body.is_active === true) {
      sendCredentialstoMail.sendCredentialstoMail(
        request.body.email,
        request.body.user_id,
        originalPassword,
      );
    }
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
}

async function addrole(request, response) {
  try {
    const roleObject = new Roles({
      role_id: request.body.role_id,
      role_name: request.body.role_name,
      created_by: request.body.created_by,
      created_on: new Date(),
    });
    await roleObject.save();
    response.status(200).json({
      message: "Successfully Added Role Details",
      roleObject,
    });
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
}

async function getAllUsers(request, response) {
  try {
    const usersList = await User.find();
    if (usersList === 0) {
      return response
        .status(404)
        .json({ message: "User details not found" });
    }
    response.status(200).json({
      message: "Successfully Fetched the User",
      usersList,
    });
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
}

async function updateUser(request, response) {
  try {
    if (!validator.isEmail(request.body.email)) {
      return response
        .status(403)
        .json({ message: "Please Enter Valid Email" });
    }
    const filter = { user_id: request.params.ID };
    const updateUserDoc = {
      $set: {
        name: request.body.name,
        email: request.body.email,
        is_active: request.body.is_active,
        updated_by: request.body.updated_by,
        updated_on: new Date(),
      },
    };
    const updateUser_RolesDoc = {
      $set: {
        role_id: request.body.role_id,
        is_active: request.body.is_active,
        updated_by: request.body.updated_by,
        updated_on: new Date(),
      },
    };
    const result = await User.updateOne(
      filter,
      updateUserDoc,
    );
    const result2 = await User_Roles.updateOne(
      filter,
      updateUser_RolesDoc,
    );
    response.status(200).json({
      message: "Successfully updated the User",
      result,
      result2,
    });
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
}

async function getById(req, res) {
  const id = req.params.id;
  try {
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

async function getByID(req, response) {
  try {
    let dbConstraint1 = {};
    dbConstraint1.user_id = req.params.id;
    let dbConstraint2 = {};
    dbConstraint2["user_roles.user_id"] = req.params.id;
    let dbConstraint3 = {};
    if (req.body.role_id) {
      dbConstraint3["roles.role_id"] = req.body.role_id;
    }
    if (req.body.role_name) {
      dbConstraint3["roles.role_name"] = req.body.role_name;
    }
    const user = await User.aggregate([
      {
        $lookup: {
          from: "user_roles",
          localField: "user_id",
          foreignField: "user_id",
          as: "user_roles",
        },
      },

      {
        $lookup: {
          from: "roles",
          localField: "user_roles.role_id",
          foreignField: "role_id",
          as: "roles",
        },
      },

      {
        $match: {
          ...dbConstraint1,
          ...dbConstraint2,
          ...dbConstraint3,
        },
      },
    ]);
    response.status(200).send({ user: user });
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
}

async function search(req, response) {
  try {
    let currentPage = req.params.page || 1;
    let perPage = 10;
    let dbConstraint1 = {};
    if (req.body.user_id) {
      dbConstraint1.user_id = req.body.user_id;
    }
    if (req.body.name) {
      dbConstraint1.name = req.body.name;
    }
    if (req.body.email) {
      dbConstraint1.email = req.body.email;
    }
    if (req.body.is_active != null) {
      dbConstraint1.is_active = req.body.is_active;
    }
    let dbConstraint2 = {};
    if (req.body.user_id) {
      dbConstraint2["user_roles.user_id"] =
        req.body.user_id;
    }
    if (req.body.role_id) {
      dbConstraint2["user_roles.role_id"] =
        req.body.role_id;
    }
    if (req.body.is_active) {
      dbConstraint2["user_roles.is_active"] =
        req.body.is_active;
    }
    let dbConstraint3 = {};
    if (req.body.role_id) {
      dbConstraint3["roles.role_id"] = req.body.role_id;
    }
    if (req.body.role_name) {
      dbConstraint3["roles.role_name"] = req.body.role_name;
    }
    const totalrecords = await User.aggregate([
      {
        $lookup: {
          from: "user_roles",
          localField: "user_id",
          foreignField: "user_id",
          as: "user_roles",
        },
      },
      {
        $lookup: {
          from: "roles",
          localField: "user_roles.role_id",
          foreignField: "role_id",
          as: "roles",
        },
      },
      {
        $match: {
          ...dbConstraint1,
          ...dbConstraint2,
          ...dbConstraint3,
        },
      },
    ]);
    const user = await User.aggregate([
      {
        $lookup: {
          from: "user_roles",
          localField: "user_id",
          foreignField: "user_id",
          as: "user_roles",
        },
      },
      // {$unwind:"$user_roles"},
      {
        $lookup: {
          from: "roles",
          localField: "user_roles.role_id",
          foreignField: "role_id",
          as: "roles",
        },
      },
      // {$unwind:"$roles"},
      {
        $match: {
          ...dbConstraint1,
          ...dbConstraint2,
          ...dbConstraint3,
        },
      },
    ])
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    response.status(200).send({
      totalitems: totalrecords.length,
      user: user,
    });
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
}

async function updateIsActive(request, response) {
  try {
    const filter = { user_id: request.params.ID };
    const updateUserDoc = {
      $set: {
        is_active: request.body.is_active,
        updated_by: request.body.updated_by,
        updated_on: new Date(),
      },
    };
    const updateUser_RolesDoc = {
      $set: {
        is_active: request.body.is_active,
        updated_by: request.body.updated_by,
        updated_on: new Date(),
      },
    };
    const result = await User.updateOne(
      filter,
      updateUserDoc,
    );
    const result2 = await User_Roles.updateOne(
      filter,
      updateUser_RolesDoc,
    );
    if (request.body.is_active === true) {
      const user = await User.find({
        user_id: request.params.ID,
      });
      console.log(user);
      activemail.sendActivemail(
        request.params.ID,
        user[0].email,
      );
    }
    response.status(200).json({
      message: "Successfully updated the User",
      result,
      result2,
    });
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
}

module.exports = {
  addUser,
  getAllUsers,
  updateUser,
  getByID,
  getById,
  search,
  updateIsActive,
  addrole,
};
