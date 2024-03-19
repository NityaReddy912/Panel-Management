const Interview = require("../models/interviews");

const Panels_Availability = require("../models/panels_availability");

const Feedbacks = require("../models/feedbacks");

module.exports.addInterview = async function (
  request,
  response,
) {
  const id = request.body.id;

  const panels_availability_id =
    request.body.panels_availability_id;

  const candidate_id = request.body.candidate_id;

  const interview_status_id =
    request.body.interview_status_id;

  try {
    const interviews = await Interview.find();

    if (
      interviews.find(
        (interviews) =>
          (interviews.id === id &&
            interviews.panels_availability_id ===
              panels_availability_id &&
            interviews.candidate_id === candidate_id) ||
          interviews.interview_status_id === i,
      )
    ) {
      return response

        .status(409)

        .json({ err: "Interview cannot be Scheduled" });
    }

    const interviewObject = new Interview({
      id: request.body.id,

      panels_availability_id:
        request.body.panels_availability_id,

      candidate_id: request.body.candidate_id,

      interview_status_id: request.body.interview_status_id,

      type_id: request.body.type_id,

      remark: request.body.remark,

      feedback_id: request.body.feedback_id,

      created_by: request.body.createdby,
    });

    await interviewObject.save();

    response.status(200).json({
      message: "Interview Successfully Scheduled",

      interviewObject,
    });

    // sendMail.mailToCandidate(request.body.email, request.body.date, request.body.time);

    // sendMail.mailToPanel(request.body.panel_email, request.body.date, request.body.time);
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
};

module.exports.getAllScheduledinterviews = async function (
  request,
  response,
) {
  try {
    const interviewsList = await Interview.find();

    if (interviewsList === 0) {
      return response
        .status(404)
        .json({ message: "User details not found" });
    }

    response

      .status(200)

      .json({
        message: "Successfully Fetched the User",
        interviewsList,
      });
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
};

module.exports.Search = async function (req, res) {
  try {
    let dbConstraint1 = {};

    if (req.body.id) {
      dbConstraint1.id = req.body.id;
    }

    let dbConstraint2 = {};

    if (req.body.role_name) {
      dbConstraint2["roles.role_name"] = req.body.role_name;
    }

    let dbConstraint3 = {};

    if (req.body.candidate_name) {
      dbConstraint3["candidate.candidate_name"] =
        req.body.candidate_name;
    }

    let dbConstraint4 = {};

    if (req.body.name) {
      dbConstraint4["users.name"] = req.body.name;
    }

    let dbConstraint5 = {};

    if (req.body.type) {
      dbConstraint5["interview_type.type"] = req.body.type;
    }

    const totalrecords = await Interview.aggregate([
      {
        $lookup: {
          from: "feeback_temp",

          localField: "feedback_id",

          foreignField: "feedback_id",

          as: "feebacks",
        },
      },

      {
        $lookup: {
          from: "candidates",

          localField: "candidate_id",

          foreignField: "id",

          as: "candidate",
        },
      },

      {
        $lookup: {
          from: "interview_types",

          localField: "type_id",

          foreignField: "type_id",

          as: "interview_type",
        },
      },

      {
        $lookup: {
          from: "interview_status",

          localField: "interview_status_id",

          foreignField: "inteview_status_id",

          as: "interview_status",
        },
      },

      {
        $lookup: {
          from: "panels_availabilities",

          localField: "panel_availability_id",

          foreignField: "panel_availability_id",

          as: "panels_availabilities",
        },
      },

      {
        $lookup: {
          from: "panels",

          localField: "panels_availabilities.panel_id",

          foreignField: "id",

          as: "panels",
        },
      },

      {
        $lookup: {
          from: "users",

          localField: "panels.user_id",

          foreignField: "user_id",

          as: "users",
        },
      },

      {
        $lookup: {
          from: "user_roles",

          localField: "users.user_id",

          foreignField: "user_id",

          as: "user_roles",
        },
      },

      {
        $lookup: {
          from: "roles",

          localField: "user_roles.role_id",

          foreignField: "role_id",

          as: "roles",
        },
      },

      {
        $match: {
          ...dbConstraint1,

          ...dbConstraint2,

          ...dbConstraint3,

          ...dbConstraint4,

          ...dbConstraint5,
        },
      },
    ]);

    res

      .status(200)

      .send({
        totalitems: totalrecords.length,
        totalrecords,
      });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
