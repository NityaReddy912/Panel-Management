const Candidate = require("../Models/candidates");

const getCandidatesStrict = async (req, res, next) => {
  try {
    const currentPage = req.params.page || 1;

    console.log("Hi");

    const perPage = 10;

    let totalItems = 0;

    dbConstraint = {};

    if (req.body.candidate_name) {
      dbConstraint.candidate_name = req.body.candidate_name;
    }

    if (req.body.email) {
      dbConstraint.email = req.body.email;
    }

    if (req.body.role) {
      dbConstraint.role = req.body.role;
    }

    if (req.body.status) {
      dbConstraint.status = req.body.status;
    }

    console.log(dbConstraint);

    totalItems = await Candidate.addCandid

      .find({ ...dbConstraint })

      .countDocuments();

    let user = await Candidate.addCandid

      .find({ ...dbConstraint })

      .skip((currentPage - 1) * perPage)

      .limit(perPage);

    console.log(totalItems);

    //  if(!req.body.candidate_name && !req.body.email && !req.body.status && !req.body.

    //   role)

    //   return res.status(401).json({ message: "Please enter atleast one field", totalItems : "No"});

    if (user.length === 0) {
      return res.status(404).json({
        message: "Candidate details not found",

        //candidate : user,

        totalItems: 0,
      });
    }

    res.status(200).json({
      message: "Successfully Fetched the User",

      candidate: user,

      totalItems: totalItems,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getCandidatesStrict };
