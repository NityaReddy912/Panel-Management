const Panels_Availability = require("../../models/panels_availabilities");

module.exports.getInterviewById = async (req, res) => {
  const id = req.params.id;
  try {
    const interview = await Panels_Availability.findById(
      id,
    );

    res.status(200).json(interview);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.updateInterviewPanel = async (req, res) => {
  const id = req.params.id;
  try {
    const interview = await Panels_Availability.updateOne(
      { _id: id },
      {
        $set: {
          availability_status_id: "ASI2",
        },
      },
    );

    res.status(200).json(interview);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.getInterviewSearch = async function (
  req,
  response,
) {
  console.log(req.query);
  const panel_id = req.query.panel_id;
  const name = req.query.name;
  const email = req.query.email;
  const availability_status = req.query.availability_status;
  const type = req.query.type;

  try {
    let dbConstraint1 = {};

    // if (req.body.role) {
    //   dbConstraint1.role = req.body.role;
    // }

    if (panel_id) {
      dbConstraint1["panels.user_id"] = panel_id;
    }
    console.log(panel_id, dbConstraint1);
    // 2023-07-22T00:00:00.000Z
    let dbConstraint3 = {};

    if (name) {
      dbConstraint3["users.name"] = name;
    }
    if (panel_id) {
      dbConstraint3["users.user_id"] = panel_id;
    }

    if (email) {
      dbConstraint3["users.email"] = email;
    }
    let dbConstraint4 = {};
    if (availability_status) {
      dbConstraint4[
        "availability_status.availability_status"
      ] = availability_status;
    }
    let dbConstraint5 = {};
    if (type) {
      dbConstraint5["interview_types.type"] = type;
    }

    const totalrecords =
      await Panels_Availability.aggregate([
        {
          $lookup: {
            from: "panels",
            localField: "panel_id",
            foreignField: "id",
            as: "panels",
          },
        },
        {
          $lookup: {
            from: "interview_types",
            localField: "panels.type_id",
            foreignField: "type_id",
            as: "interview_types",
          },
        },

        {
          $lookup: {
            from: "panels_availability_statuses",
            localField: "availability_status_id",
            foreignField: "availability_status_id",
            as: "availability_status",
          },
        },

        {
          $lookup: {
            from: "panels_skills",
            localField: "panels.id",
            foreignField: "id",
            as: "panels_Skills",
          },
        },
        {
          $lookup: {
            from: "skills",
            localField: "panels_Skills.skill_id",
            foreignField: "skill_id",
            as: "Skills",
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
            ...dbConstraint3,
            ...dbConstraint4,
            ...dbConstraint5,
          },
        },
      ]);
    response.status(200).send({
      totalitems: totalrecords.length,
      totalrecords,
    });
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
};
