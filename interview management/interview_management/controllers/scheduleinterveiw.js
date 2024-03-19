const Interview = require("../models/interviews");
const Feedback = require("../models/feedbacks");
const Interveiw_Status = require("../models/interview_status");
const sendMail = require("../utils/mail");

async function Schedule_interveiw(req, res) {
  try {
    const interveiwObject = new Interview({
      panel_availability_id: req.body.panel_availability_id,
      candidate_id: req.body.candidate_id,
      type_id: req.body.type_id,
      remark: req.body.remark,
    });
    await interveiwObject.save();
    console.log(interveiwObject);
    sendMail.mailToCandidate(
      req.body.Candidate_Email,
      req.body.Date,
      req.body.Time,
    );
    sendMail.mailToPanel(
      req.body.Panel_Email,
      req.body.Date,
      req.body.Time,
      req.body.name,
      interveiwObject.id,
    );
    res.status(200).json({
      message: "Interveiw Successfully Scheduled",
      interveiwObject,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

async function Add_Feedback_Form(req, res) {
  try {
    const feedbackobj = new Feedback({
      feedback_id: req.params.feedback_id,
      Skills: req.body.Skills,
      created_by: req.body.created_by,
    });
    await feedbackobj.save();
    res.status(200).json({
      message: "Interveiw Successfully Scheduled",
      feedbackobj,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

async function Add_Interveiw_Status(req, res) {
  try {
    const interveiw_status_obj = new Interveiw_Status({
      interveiw_status_id: req.params.interveiw_status_id,
      interview_status: req.body.interview_status,
      created_by: req.body.created_by,
    });
    await interveiw_status_obj.save();
    res.status(200).json({
      message: "Interveiw Successfully Scheduled",
      interveiw_status_obj,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

module.exports = {
  Schedule_interveiw,
  Add_Feedback_Form,
  Add_Interveiw_Status,
};
