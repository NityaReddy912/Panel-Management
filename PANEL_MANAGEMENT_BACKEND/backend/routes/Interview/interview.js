const express = require("express");

const {
  getInterviewSearch,
  getInterviewById,
  updateInterviewPanel,
} = require("../../controllers/InterviewController/Interview");

const router = express.Router();

router.get("/panel-id/:id", getInterviewById);
router.get("/search", getInterviewSearch);
router.put("/update/:id", updateInterviewPanel);

module.exports = router;
