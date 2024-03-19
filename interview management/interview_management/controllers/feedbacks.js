const Feedbacks = require("../models/feedbacks");
const Interview = require("../models/interviews");

module.exports.addFeedback = async function (
  request,
  response,
) {
  const feedback_id = request.params.id;

  try {
    const feedbacks = await Feedbacks.find();

    if (
      feedbacks.find(
        (feedbacksObj) =>
          feedbacksObj.feedback_id == feedback_id,
      )
    ) {
      return response
        .status(409)
        .json({ err: "Feedback already Exists" });
    }

    const feedbacksObject = new Feedbacks({
      feedback_id: request.params.id,

      Skills: request.body.Skills,

      created_by: request.body.created_by,
    });

    await feedbacksObject.save();

    response.status(200).json({
      message: "FeedBack Successfully Submitted",

      feedbacksObject,
    });
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
};

module.exports.updateremark = async function (
  req,
  res,
  next,
) {
  try {
    const filter = { id: req.params.id };

    const update = {
      $set: {
        remark: req.body.remark,

        updated_by: req.body.updated_by,
      },
    };

    const result = await Interview.updateOne(
      filter,
      update,
    );

    res
      .status(200)
      .json({ message: "successfully updated the remark" });
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
};

module.exports.searchFeedbackView = async function (
  request,
  res,
) {
  try {
    let dbConstraint = {};

    dbConstraint.id = +request.params.id;

    console.log(dbConstraint);

    const Scheduled_interveiw = await Interview.aggregate([
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
          ...dbConstraint,
        },
      },
    ]);

    let dbConstraint2 = {};

    console.log(Scheduled_interveiw[0].feedback_id);

    dbConstraint2.id = Scheduled_interveiw[0].feedback_id;
    const feedbacks = await Feedbacks.find();
    let feedbackform = await feedbacks.find(
      (feedbacksObj) =>
        feedbacksObj.feedback_id ==
        Scheduled_interveiw[0].feedback_id,
    );

    console.log(dbConstraint2);
    console.log(feedbackform);

    if (!feedbackform) {
      return res

        .status(404)

        .json({
          message: "Feedback  details not found",
        });
    }

    res.status(200).json({
      message:
        "Successfully Fetched the Scheduled Interveiws",

      Interview: Scheduled_interveiw,

      feedbackform: feedbackform,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.searchFeedbackEdit = async function (
  request,
  res,
) {
  try {
    let dbConstraint = {};

    dbConstraint.id = +request.params.id;

    console.log(dbConstraint);

    const Scheduled_interveiw = await Interview.aggregate([
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
          ...dbConstraint,
        },
      },
    ]);

    res.status(200).json({
      message:
        "Successfully Fetched the Scheduled Interveiws",
      Interview: Scheduled_interveiw,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.getAllFeedBackForms = async function (
  request,
  response,
) {
  try {
    const feedbackforms = await Feedbacks.find();

    if (feedbackforms === 0) {
      return response
        .status(404)
        .json({ message: "FeedbackForms not found" });
    }

    response

      .status(200)

      .json({
        message: "Successfully Fetched the User",
        feedbackforms,
      });
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
};

module.exports.getById = async function (
  request,
  response,
) {
  try {
    const feedbackform = await Feedbacks.find({
      id: request.params.id,
    });

    if (feedbackform === 0) {
      return response
        .status(404)
        .json({ message: "Feedback Form  not found" });
    }

    response

      .status(200)

      .json({
        message: "Successfully Fetched the FeedBackForm",
        feedbackform,
      });
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
};
