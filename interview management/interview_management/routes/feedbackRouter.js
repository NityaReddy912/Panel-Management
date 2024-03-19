const express = require("express");
const {
  addFeedback,
  searchFeedbackView,
  getAllFeedBackForms,
  updateremark,
  searchFeedbackEdit,
} = require("../controllers/feedbacks");
const router = express.Router();
router.post("/addfeedback/:id", addFeedback);
router.post("/getallfeedback", getAllFeedBackForms);
router.put("/updateremark/:id", updateremark);
router.get("/searchFeedback/:id", searchFeedbackView);
router.get("/searchFeedbackEdit/:id", searchFeedbackEdit);
module.exports = router;
