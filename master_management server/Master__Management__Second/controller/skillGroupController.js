const SkillGroup = require("../models/skillGroup");

module.exports.getSkillGroupAll = async (req, res) => {
  try {
    const skillGroup = await SkillGroup.find();

    res.status(200).json(skillGroup);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.getSkillGroupById = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res
        .status(404)
        .json({ err: "Please enter the id" });
    }
    const skillGroup = await SkillGroup.findById(id);

    res.status(200).json(skillGroup);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.getSkillGroupBySkillId = async (
  req,
  res,
) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res
        .status(404)
        .json({ err: "Please enter the id" });
    }
    const skillGroup = await SkillGroup.findOne({
      role_id: id,
    });

    res.status(200).json(skillGroup);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.getSearchSkillGroup = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = 3;
  const skillGroupId = req.query.skillGroupId;
  const skillGroupName = req.query.skillGroupName;

  try {
    if (!skillGroupId && !skillGroupName) {
      return res
        .status(404)
        .json({ err: "Please Enter the Search Value" });
    }

    if (skillGroupId && skillGroupName) {
      const totalItems = await SkillGroup.find({
        $and: [
          { skill_group_id: skillGroupId },
          { skill_group_name: skillGroupName },
        ],
      }).countDocuments();

      const skillGroup = await SkillGroup.find({
        $and: [
          { skill_group_id: skillGroupId },
          { skill_group_name: skillGroupName },
        ],
      })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);

      return res.status(200).json({
        message: "Successfully Getting Roles",
        role: skillGroup,
        totalItems,
      });
    }

    if (skillGroupId || skillGroupName) {
      const totalItems = await SkillGroup.find({
        $or: [
          { skill_group_id: skillGroupId },
          { skill_group_name: skillGroupName },
        ],
      }).countDocuments();

      const skillGroup = await SkillGroup.find({
        $or: [
          { role_id: skillGroupId },
          { role_name: skillGroupName },
        ],
      })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);

      // console.log("OR", role);

      return res.status(200).json({
        message: "Successfully Created the Role",
        role: skillGroup,
        totalItems,
      });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.postAddSkillGroup = async (req, res) => {
  const skill_group_id = req.body.skill_group_id;
  const skill_group_name = req.body.skill_group_name;

  try {
    const skillGroup = await SkillGroup.find();

    if (!skill_group_id && !skill_group_name) {
      return res.status(404).json({ err: "Invalid Input" });
    }

    // if (skill_group_id.length !== 4) {
    //   return res
    //     .status(404)
    //     .json({ err: "Please Enter 4 Digit Id" });
    // }

    if (
      skillGroup.find(
        (skillGroup) =>
          skillGroup.skill_group_id === +skill_group_id,
      )
    ) {
      return res
        .status(404)
        .json({ err: "Id already exists" });
    }
    const newSkillGroup = SkillGroup({
      skill_group_id,
      skill_group_name,
      created_by: "darshan",
      updated_by: "",
      is_deleted: false,
      deleted_by: "",
    });

    await newSkillGroup.save();
    res.status(200).json(newSkillGroup);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.updateSkillGroup = async (req, res) => {
  const id = req.params.id;
  const updatedSkillGroup = req.body.skill_group_name;

  try {
    const updateSkillGroup = await SkillGroup.findOne({
      skill_group_id: id,
    });

    updateSkillGroup.skill_group_name = updatedSkillGroup;
    updateSkillGroup.isAction = updateSkill.isAction;

    updateSkillGroup.save();

    res.status(200).json({
      message: "Successfully updated",
      updateSkillGroup,
    });

    // panelLevel.remove();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateSkillGroupIsAction = async (
  req,
  res,
) => {
  const id = req.params.id;

  try {
    const updateSkillGroup = await SkillGroup.findOne({
      skill_group_id: id,
    });

    console.log(updateSkillGroup.skill_group_name);

    updateSkillGroup.skill_group_name =
      updateSkillGroup.skill_group_name;
    updateSkillGroup.isAction = !updateSkillGroup.isAction;

    updateSkillGroup.save();

    res.status(200).json({
      message: "Successfully updated",
      updateSkillGroup,
    });

    // panelLevel.remove();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.deleteSkillGroup = async (req, res) => {
  const id = req.params.id;
  try {
    const skillGroup = await SkillGroup.findById(id);

    skillGroup.remove();

    res
      .status(200)
      .json({ message: "Successfully deleted" });

    // panelLevel.remove();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
