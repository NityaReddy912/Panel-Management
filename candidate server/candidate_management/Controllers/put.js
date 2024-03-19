const Candidate = require("../Models/candidates");

const updateCandidate = async (request, response, next) => {
  try {
    console.log(request.params.id);
    Candidate.addCandid.findById(
      request.params.cid,
      function (err, result) {
        if (!result) {
          return response.status(404).json({
            message:
              "Candidate with " +
              request.params.id +
              " not found!",
          });
        }

        console.log(result);

        (result.candidate_name =
          request.body.candidate_name),
          (result.email = request.body.email),
          (result.contact = request.body.contact);
        result.role = request.body.role;
        result.pan = request.body.pan;
        result.it_experience_years =
          request.body.it_experience_years;
        //result.status = request.body.status;

        Object.assign(result, request.body).save(
          (err, result) => {
            if (err) {
              return response.status(500).send(err);
            }
            response.status(200).json({
              message:
                "Sucessfully Updated Candidate Details",
              result,
            });
          },
        );
      },
    );
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};

module.exports = { updateCandidate };
