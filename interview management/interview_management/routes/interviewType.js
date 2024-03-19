const express = require("express");
const {
  getAllInterviewType,
} = require("../controllers/interviewTypeController");

const router = express.Router();

router.get("/", getAllInterviewType);

module.exports = router;
