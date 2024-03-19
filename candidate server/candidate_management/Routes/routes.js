const express = require("express");
const router = express.Router();

const getallController = require("../Controllers/getall");
const postController = require("../Controllers/post");
const putController = require("../Controllers/put");
const searchController = require("../Controllers/search");
const getbyid = require("../Controllers/getbyid");
const auth = require("../middleware/auth");

router.post(
  "/addCandidate",
  auth,
  postController.postAddCandidate,
);
router.get("/all", auth, getallController.getAllCandidates);
router.post("/postmultiple", postController.postMultiple);
router.post(
  "/search/:page",
  auth,
  searchController.getCandidatesStrict,
);
router.put(
  "/updateCandidate/:cid",
  auth,
  putController.updateCandidate,
);
router.get("/getbyid/:id", getbyid.getbyid);

module.exports = router;
