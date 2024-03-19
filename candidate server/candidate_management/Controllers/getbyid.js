const Candidate = require("../Models/candidates");

async function getbyid(request, response) {
  try {
    const usersList = await Candidate.addCandid.findById(
      request.params.id,
    );
    console.log(usersList);
    if (usersList === 0) {
      return response
        .status(404)
        .json({ message: "User details not found" });
    }

    response.status(200).json({
      message: "Successfully Fetched the User",
      usersList,
    });
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
}

module.exports = { getbyid };
