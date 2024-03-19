const InterviewType = require("../models/interview_types");

module.exports.getAllInterviewType = async (req, res) => {
  try {
    const interTypes = await InterviewType.find();

    res.status(200).json(interTypes);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
