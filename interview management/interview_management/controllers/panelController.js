const Interview = require("../models/interviews");

module.exports.getInterviewSearch = async (req, res) => {
  try {
    Interview.find()
      .populate("panel_availability_id")
      .then((p) => console.log(p))
      .catch((error) => console.log(error));
  } catch (err) {}
};
