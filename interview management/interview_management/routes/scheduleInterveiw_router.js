const express = require("express");

const {
  Schedule_interveiw,
  Add_Feedback_Form,
  Add_Interveiw_Status,
} = require("../controllers/scheduleinterveiw");

const router = express.Router();

router.post("/", Schedule_interveiw);
router.get("/addfeedback/:feedback_id", Add_Feedback_Form);
router.get(
  "/addinterveiwstatus/:interveiw_status_id",
  Add_Interveiw_Status,
);

module.exports = router;
