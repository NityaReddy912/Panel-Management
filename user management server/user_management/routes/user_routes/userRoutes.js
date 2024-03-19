let express = require("express");
let router = express.Router();

const userController = require("../../controllers/user_controller/userController");
const auth = require("../../auth/auth");

router.post("/search/:page", auth, userController.search);
router.post("/addUser", userController.addUser);
router.post("/addrole", auth, userController.addrole);
router.put(
  "/updateUser/:ID",
  auth,
  userController.updateUser,
);
router.put(
  "/updateIsActive/:ID",
  auth,
  userController.updateIsActive,
);

router.get(
  "/getAllUsers",
  auth,
  userController.getAllUsers,
);
router.get("/getbyid/:id", userController.getByID);
router.get("/:id", userController.getById);

module.exports = router;
