const express = require("express");

const {
  getInterviewSearch,
  getInterviewById,
} = require("../../controllers/InterviewController/Interview");

const router = express.Router();

router.get("/panel-id/:id", getInterviewById);
router.get("/search", getInterviewSearch);

module.exports = router;
