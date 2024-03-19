const Candidate = require("../Models/candidates");

const getAllCandidates = (req, res, next) => {
  // console.log("Hi");

  Candidate.addCandid.find({}, function (err, result) {
    res.status(200).json(result);
  });
};

module.exports = { getAllCandidates };
