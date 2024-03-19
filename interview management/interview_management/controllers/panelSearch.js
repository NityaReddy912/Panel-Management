const Panels = require("../models/panels");

const Panels_Availability = require("../models/panels_availability");

const Users = require("../models/User");

module.exports.panels_availability = async function (
  req,
  res,
) {
  try {
    const panelsAvailabilityObj = new Panels_Availability({
      panel_availability_id: req.body.panel_availability_id,

      panel_id: req.body.panel_id,

      available_date: req.body.available_date,

      start_time: req.body.start_time,

      end_time: req.body.end_time,

      availability_status_id:
        req.body.availability_status_id,

      created_by: req.body.created_by,
    });

    await panelsAvailabilityObj.save();

    res.status(200).json({
      message:
        "Successfully added the Panel Availability details",

      panelsAvailabilityObj,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.addpanel = async function (req, res) {
  try {
    const panelObj = new Panels({
      panel_id: req.body.panel_id,

      user_id: req.body.user_id,

      contact: req.body.contact,

      grade: req.body.grade,

      panel_level: req.body.panel_level,

      remark: req.body.remark,

      is_active: req.body.is_active,

      created_by: req.body.created_by,
    });

    await panelObj.save();

    res.status(200).json({
      message: "Successfully added the Panel details",

      panelObj,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.search = async function (req, response) {
  const dateFrom = req.body.available_from_date;
  const dateTo = req.body.available_to_date;

  try {
    let dbConstraint1 = {};

    if (req.body.available_date) {
      dbConstraint1.available_date = new Date(
        req.body.available_date,
      );
    }

    if (req.body.role) {
      dbConstraint1.role = req.body.role;
    }

    if (req.body.panel_id) {
      dbConstraint1.panel_id = req.body.panel_id;
    }
    // 2023-07-22T00:00:00.000Z
    let dbConstraint3 = {};

    if (req.body.name) {
      dbConstraint3["users.name"] = req.body.name;
    }

    if (req.body.email) {
      dbConstraint3["users.email"] = req.body.email;
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

module.exports.getByInterviewTypeId = async function (
  request,
  response,
) {
  try {
    const interviewtypes = await InterviewType.find({
      type_id: request.params.id,
    });
    if (interviewtypes === 0) {
      return response
        .status(404)
        .json({ message: "InterviewType  not found" });
    }
    response.status(200).json({
      message: "Successfully Fetched the Interview Type",
      interviewtypes,
    });
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
};
